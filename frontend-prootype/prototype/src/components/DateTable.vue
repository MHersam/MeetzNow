<template xmlns:v-el="http://www.w3.org/1999/xhtml">
    <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle" ref="scrollbar">
        <table class="table table-bordered" ref="timeTable">
            <thead class="tableRow" ref="tableHeader" @contextmenu.prevent="$refs.ctxMenu.open" @contextmenu="handler($event)">
            <tr ref="tableFirstRow">
                <td :style="'background-color: ' + colorTableTime">Zeit</td>
                <td v-for="date in dates" v-bind:key="date" :style="'background-color: ' + colorTableTime">{{date}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(t, indexRow) in time" v-bind:key="indexRow" ref="tableRowData" v-bind:time="time">
                <td class="tableRow" ref="tableTimeCell" :style="'background-color: ' + colorTableTime">{{t}}</td>
                <td v-for="(date, indexColoum) in dates" v-bind:key="indexColoum" class="tableData" ref="tableContent" :style="'background-color: ' + colorTableCells"
                    @mousedown="mouseDown(indexRow * dates.length + indexColoum, $event)"
                    @mousemove="mouseOver(indexRow * dates.length + indexColoum, $event)"
                    draggable="true"></td>
            </tr>
            </tbody>
        </table>
        <context-menu id="context-menu" ref="ctxMenu">
            <li @click="show" class="ctxMenuSubPoints">Bearbeiten</li>
            <li @click="deleteTheTimeSlot" class="ctxMenuSubPoints">Löschen</li>
        </context-menu>
        <ModalTimeSlotEditing ref="modalEditing"
                                :modalStart="modalStart"
                                :modalEnd="modalEnd"></ModalTimeSlotEditing>
        <!--TODO make it work not it says unavaible -->
        <!--<TimeSlot :timeT="time"
                    :timeSlotCounterT="timeSlotCounter"
                    :timeSlotDivsT="timeSlotDivs"
                    :tableContentT="tableContent"
                    :scrollbarT="scrollbar"
                    :datesT="dates"
                    :ref="timeSlotComponent"></TimeSlot>-->
    </VuePerfectScrollbar>
</template>
<script>
import resize from 'vue-resize-directive'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {setTime} from '../functions/dataFillerFunctions'
import {DateTableFunctions} from '../functions/DateTableFunctions'
import {
  createATimeSlot,
  setDocumentListener,
  setTimeTimeSlot,
  mergeTimeSlots,
  deleteTimeSlot,
  checkMouseUnderTimeSlot,
  saveTimeSlot, convertTimeToCoordinates, getIndexArray,
  handleWindowResize,
  fillDayIndexDiv, getPositionInTimeSlot
} from '../functions/TimeSlotFunctions'
import contextMenu from 'vue-context-menu'
import {serverBus} from '../main'
import TimeSlot from './TimeSlot'
import ModalTimeSlotEditing from './ModalTimeSlotEditing'

export default {
  name: 'DateTable',
  directives: {
    resize
  },
  components: {
    ModalTimeSlotEditing,
    TimeSlot,
    VuePerfectScrollbar,
    contextMenu
  },
  props: {
    startTime: '',
    endTime: '',
    timeSteps: '',
    dates: [],
    colorTableTime: '',
    colorTableCells: '',
    tableTop: '',
    participate: false,
    timeSlots: '',
    tableLeft: 0
  },
  data: function () {
    return {
      // here is saved all times, shown left of the table
      time: [],
      // for the vue perfect scrollbar you need settings
      settings: {
        maxScrollbarLength: 1000
      },
      // active show if a mousebutton is still clicked, it is true for mousedown and false for mouseup
      active: false,
      tempTop: 0,
      dateTableFunction: '',
      dayIndex: '',
      timeSlotDivs: [],
      positionDiv: '',
      timeSlotFunctions: '',
      timeSlotDiv: '',
      timeSlotsParticipated: [],
      modalStart: '',
      modalEnd: '',
      lastCreatedDiv: '',
      dayIndexDiv: [],
      divUnderMouse: false,
      divUnderMousePosition: 0
    }
  },
  methods: {
    handler: function (event) {
      if (checkMouseUnderTimeSlot(event, this.$refs.scrollbar, this.timeSlotDivs, this.tableTop, this.tableLeft).bool) this.divUnderMouse = true
      this.divUnderMousePosition = checkMouseUnderTimeSlot(event, this.$refs.scrollbar, this.timeSlotDivs, this.tableTop, this.tableLeft).pos
      event.preventDefault()
    },
    deleteTheTimeSlot: function (event) {
      if (this.divUnderMouse) deleteTimeSlot(event, this.$refs.scrollbar, this.timeSlotDivs, this.tableTop, this.tableLeft, this.divUnderMousePosition)
    },
    show (event) {
      if (this.divUnderMouse) {
        this.modalStart = this.timeSlotDivs[this.divUnderMousePosition].innerHTML.split('-')[0]
        this.modalEnd = this.timeSlotDivs[this.divUnderMousePosition].innerHTML.split('-')[1]
        let index = this.$refs.tableContent.findIndex((element) => {
          return element.offsetLeft === this.timeSlotDivs[this.divUnderMousePosition].offsetLeft
        })
        if (!this.participate) this.$refs.modalEditing.show(this.modalStart, this.modalEnd, this.dates, this.dates[index], this.time, this.divUnderMousePosition)
        else {
          let selectionArray = []
          for (let i = 0; i < this.timeSlotsParticipated.length; i++) {
            selectionArray.push(this.dates[this.timeSlots[i].dayIndex].toString() + ' ' + this.timeSlotsParticipated[i].innerHTML)
          }
          this.$refs.modalEditing.show(this.modalStart, this.modalEnd, selectionArray, selectionArray[getPositionInTimeSlot(this.timeSlotsParticipated, this.timeSlotDivs[this.divUnderMousePosition])], this.time, this.divUnderMousePosition, true)
        }
      }
    },
    fillData: function () {
      this.time = setTime(this.startTime, this.endTime, this.timeSteps)
      this.dateTableFunction = new DateTableFunctions()
    },
    prepareTimeSlotStuff: function () {
      if (!this.participate) {
        for (let i = 0; i < this.$refs.tableContent.length - this.dates.length; i++) {
          this.$refs.tableContent[i].addEventListener('drop', this.drop.bind(this, i), false)
          this.$refs.tableContent[i].addEventListener('dragover', this.allowDrop, false)
        }
      }
      for (let i = 0; i < this.timeSlotDivs.length; i++) {
        this.timeSlotDivs[i].parentNode.removeChild(this.timeSlotDivs[i])
      }
      this.timeSlotDivs = []
      // add listener to listen if a div is resized
      setDocumentListener(document, this.timeSlotDivs, this.time.length, this.$refs.tableContent, this.time, this.timeSlotsParticipated, this.participate)
    },
    mouseOverParticipate: function (pos, event) {
      if (this.active) {
        this.createTimeSlot(pos, this.$refs.tableContent[pos].offsetWidth, this.$refs.tableContent[this.timeSlots[pos].dayIndex].offsetLeft, event.clientY - this.tableTop + this.$refs.scrollbar.$el.scrollTop + window.scrollY)
      }
    },
    mouseOver: function (pos, event) {
      if (!this.participate) {
        if (this.active) {
          this.createTimeSlot(pos, this.$refs.tableContent[pos].offsetWidth, this.$refs.tableContent[pos].offsetLeft, event.clientY - this.tableTop + this.$refs.scrollbar.$el.scrollTop + window.scrollY)
        }
      }
    },
    mouseDownParticipate: function (pos, event) {
      this.active = true
      this.tempTop = event.clientY - this.tableTop + this.$refs.scrollbar.$el.scrollTop + window.scrollY
      this.dayIndex = this.timeSlots[pos].dayIndex
      for (let i = 0; i < this.timeSlotDivs.length; i++) {
        this.timeSlotDivs[i].style.pointerEvents = 'none'
      }
    },
    mouseDown: function (pos, event) {
      if (!this.participate) {
        this.active = true
        this.tempTop = event.clientY - this.tableTop + this.$refs.scrollbar.$el.scrollTop + window.scrollY
        this.dayIndex = (pos) % this.dates.length
        for (let i = 0; i < this.timeSlotDivs.length; i++) {
          this.timeSlotDivs[i].style.pointerEvents = 'none'
        }
      }
    },
    mouseUp: function () {
      if (this.active) {
        this.active = false
        for (let i = 0; i < this.timeSlotDivs.length; i++) {
          this.timeSlotDivs[i].style.pointerEvents = 'inherit'
        }
        this.lastCreatedDiv = ''
        mergeTimeSlots(this.timeSlotDivs, this.timeSlotDivs[this.timeSlotDivs.length - 1], this.$refs.tableContent, this.$refs.tableHeader, this.drag, this.time, true, this.timeSlotsParticipated, this.participate)
      }
    },
    createTimeSlot: function (pos, width, left, top) {
      if (this.participate) {
        try {
          this.timeSlotDivs[getIndexArray(this.timeSlotDivs, this.lastCreatedDiv)].parentNode.removeChild(this.timeSlotDivs[getIndexArray(this.timeSlotDivs, this.lastCreatedDiv)])
          this.timeSlotDivs.splice(getIndexArray(this.timeSlotDivs, this.lastCreatedDiv), 1)
        } catch (e) {
        }
        this.timeSlotDivs.push(createATimeSlot(this.tempTop, top, width, left, this.drag, this.timeSlotDivs.length, this.time, this.$refs.tableContent, false, this.timeSlotsParticipated))
        this.$refs.tableHeader.appendChild(this.timeSlotDivs[this.timeSlotDivs.length - 1])
        this.lastCreatedDiv = this.$refs.tableHeader.lastChild
      } else {
        if (this.dayIndex === pos % this.dates.length) {
          try {
            this.timeSlotDivs[getIndexArray(this.timeSlotDivs, this.lastCreatedDiv)].parentNode.removeChild(this.timeSlotDivs[getIndexArray(this.timeSlotDivs, this.lastCreatedDiv)])
            this.timeSlotDivs.splice(getIndexArray(this.timeSlotDivs, this.lastCreatedDiv), 1)
          } catch (e) {
          }
          this.timeSlotDivs.push(createATimeSlot(this.tempTop, top, width, left, this.drag, this.timeSlotDivs.length, this.time, this.$refs.tableContent, false, this.timeSlotsParticipated))
          this.$refs.tableHeader.appendChild(this.timeSlotDivs[this.timeSlotDivs.length - 1])
          this.lastCreatedDiv = this.$refs.tableHeader.lastChild
        }
      }
    },
    allowDrop: function (ev) {
      ev.preventDefault()
    },
    drag: function (pos, ev) {
      let callback = checkMouseUnderTimeSlot(ev, this.$refs.scrollbar, this.timeSlotDivs, this.tableTop, this.tableLeft)
      this.positionDiv = callback.pos
      ev.dataTransfer.setData('text', ev.target.id)
      for (let i = 0; i < this.timeSlotDivs.length; i++) {
        this.timeSlotDivs[i].style.pointerEvents = 'none'
      }
    },
    drop: function (pos, event) {
      this.timeSlotDivs[this.positionDiv].style.top = event.clientY - this.tableTop + this.$refs.scrollbar.$el.scrollTop + window.scrollY + 'px'
      if (this.participate) {
        this.timeSlotDivs[this.positionDiv].style.left = this.$refs.tableContent[this.timeSlots[pos].dayIndex].offsetLeft + 'px'
      } else {
        this.timeSlotDivs[this.positionDiv].style.left = this.$refs.tableContent[pos].offsetLeft + 'px'
      }
      // check if we are out of the table
      if ((this.timeSlotDivs[this.positionDiv].offsetTop + this.timeSlotDivs[this.positionDiv].offsetHeight) > (this.time.length + 1) * this.$refs.tableContent[pos].offsetHeight) {
        let difference = (this.timeSlotDivs[this.positionDiv].offsetTop + this.timeSlotDivs[this.positionDiv].offsetHeight) - (this.time.length + 1) * this.$refs.tableContent[pos].offsetHeight
        this.timeSlotDivs[this.positionDiv].style.top = this.timeSlotDivs[this.positionDiv].offsetTop - difference + 'px'
      }
      if (this.participate) {
        for (let j = 0; j < this.timeSlotsParticipated.length; j++) {
          if (this.timeSlotDivs[this.positionDiv].offsetTop + this.timeSlotDivs[this.positionDiv].offsetHeight > this.timeSlotsParticipated[j].offsetTop + this.timeSlotsParticipated[j].offsetHeight &&
              this.timeSlotDivs[this.positionDiv].offsetTop > this.timeSlotsParticipated[j].offsetTop && this.timeSlotDivs[this.positionDiv].offsetLeft === this.timeSlotsParticipated[j].offsetLeft) {
            this.timeSlotDivs[this.positionDiv].style.height = this.timeSlotDivs[this.positionDiv].offsetHeight - ((this.timeSlotDivs[this.positionDiv].offsetTop + this.timeSlotDivs[this.positionDiv].offsetHeight) - (this.timeSlotsParticipated[j].offsetTop + this.timeSlotsParticipated[j].offsetHeight)) + 'px'
          }
        }
      }
      this.timeSlotDivs[this.positionDiv].innerHTML = setTimeTimeSlot(this.timeSlotDivs[this.positionDiv].offsetTop, this.timeSlotDivs[this.positionDiv].offsetTop + this.timeSlotDivs[this.positionDiv].offsetHeight, this.time, this.$refs.tableContent[0].offsetHeight)
      event.preventDefault()
      for (let i = 0; i < this.timeSlotDivs.length; i++) {
        this.timeSlotDivs[i].style.pointerEvents = 'inherit'
      }
      mergeTimeSlots(this.timeSlotDivs, this.timeSlotDivs[this.positionDiv], this.$refs.tableContent, this.$refs.tableHeader, this.drag, this.time, false, this.timeSlotsParticipated, this.participate)
    },
    deleteOldTable: function () {
      for (let i = 0; i <= this.time.length; i++) {
        this.$refs.timeTable.deleteRow(0)
      }
      this.$refs.tableContent.splice(0, this.$refs.tableContent.length)
      this.$refs.tableTimeCell.splice(0, this.time.length)
    },
    createTableHeader: function () {
      this.time = setTime(this.startTime, this.endTime, this.timeSteps)
      let header = this.$refs.timeTable.createTHead()
      header.setAttribute('ref', 'tableHeader')
      let row = header.insertRow(0)
      row.classList.add('tableData')
      this.dateTableFunction.setTimeCell(row, this.colorTableTime)
      let cells = []
      for (let i = 1; i <= this.dates.length; i++) {
        cells[i - 1] = this.dateTableFunction.setDateCells(row, this.dates, this.colorTableTime, i)
      }
    },
    createTableBody: function () {
      let row
      // save the time in cellsTime[]
      let cellsTime = []
      // save the empty cells which should only have listeners
      let cellsContent = []
      let mouseDown
      let mouseOver
      // init here the cells
      for (let i = 1; i <= this.time.length; i++) {
        row = this.dateTableFunction.setTableRowData(this.$refs.timeTable, i)
        cellsTime[i - 1] = this.dateTableFunction.setTimeCellContent(row, this.time, this.colorTableTime, i)
        for (let j = 1; j <= this.dates.length; j++) {
          mouseDown = this.mouseDown.bind(this, this.dates.length * (i - 1) + (j - 1))
          mouseOver = this.mouseOver.bind(this, this.dates.length * (i - 1) + (j - 1))
          cellsContent[this.dates.length * (i - 1) + (j - 1)] = this.dateTableFunction.setCellsContent(row, this.colorTableCells, mouseDown, this.mouseUp, mouseOver, this.dates.length * (i - 1) + (j - 1), j)
          if (i > this.time.length - 1) {
            cellsContent[this.dates.length * (i - 1) + (j - 1)].removeEventListener('mousedown', mouseDown, false)
            cellsContent[this.dates.length * (i - 1) + (j - 1)].removeEventListener('mousemove', mouseOver, false)
          }
          this.$refs.tableContent.push(cellsContent[this.dates.length * (i - 1) + (j - 1)])
        }
      }
    },
    newTable: function () {
      this.deleteOldTable()
      this.createTableHeader()
      this.createTableBody()
      this.prepareTimeSlotStuff()
    },
    safe: function () {
      serverBus.$emit('timeSlots', saveTimeSlot(this.timeSlotDivs, this.$refs.tableContent, this.dates))
    },
    putTimeSlotParticipated: function () {
      if (this.participate) {
        let timeSlotDiv
        for (let i = 0; i < this.timeSlots.length; i++) {
          timeSlotDiv = createATimeSlot(this.timeSlots[i].top, this.timeSlots[i].top + this.timeSlots[i].height, this.$refs.tableContent[0].offsetWidth, this.$refs.tableContent[this.timeSlots[i].dayIndex].offsetLeft, this.drag, i, this.time, this.$refs.tableContent, true, this.timeSlotsParticipated)
          timeSlotDiv.addEventListener('dragover', this.allowDrop, false)
          timeSlotDiv.addEventListener('drop', this.drop.bind(this, i), false)
          timeSlotDiv.addEventListener('dragover', this.allowDrop, false)
          timeSlotDiv.addEventListener('mousedown', this.mouseDownParticipate.bind(this, i), false)
          timeSlotDiv.addEventListener('mousemove', this.mouseOverParticipate.bind(this, i), false)
          timeSlotDiv.addEventListener('mouseleave', this.mouseUp, false)
          this.timeSlotsParticipated.push(timeSlotDiv)
          this.$refs.tableHeader.appendChild(timeSlotDiv)
        }
      }
    },
    resizeWindow: function () {
      handleWindowResize(this.dates, this.timeSlotDivs, this.$refs.tableContent, this.dayIndexDiv, this.timeSlotsParticipated, this.timeSlots, this.participate)
    }
  },
  beforeMount () {
    this.fillData()
    this.dateTableFunction.documentEventListenerInitialization(document, this.mouseUp)
  },
  mounted () {
    this.newTable()
    this.prepareTimeSlotStuff()
    this.putTimeSlotParticipated()
    serverBus.$on('removeChild', (child) => {
      try {
        this.$refs.tableHeader.removeChild(child)
      } catch (e) {
      }
    })
    serverBus.$on('appendChild', (child) => {
      try {
        this.$refs.tableHeader.appendChild(child)
      } catch (e) {
      }
      // console.log(this.$refs.tableHeader.innerHTML)
    })
    serverBus.$on('sizeDivChanged', (i) => {
      mergeTimeSlots(this.timeSlotDivs, this.timeSlotDivs[i], this.$refs.tableContent, this.$refs.tableHeader, this.drag, this.time, false, this.timeSlotsParticipated, this.participate)
    })
    serverBus.$on('modalResult', (result) => {
      let callback = convertTimeToCoordinates(result.start, result.end, this.time, this.$refs.tableContent, this.dates)
      this.timeSlotDivs[result.pos].style.top = callback.top + 'px'
      this.timeSlotDivs[result.pos].style.height = callback.height + 'px'
      this.timeSlotDivs[result.pos].style.left = this.$refs.tableContent[getIndexArray(this.dates, result.date)].offsetLeft + 'px'
      mergeTimeSlots(this.timeSlotDivs, this.timeSlotDivs[result.pos], this.$refs.tableContent, this.$refs.tableHeader, this.drag, this.time, false, this.timeSlotsParticipated, this.participate)
    })
    this.$nextTick(function () {
      window.addEventListener('resize', this.resizeWindow)
    })
    serverBus.$on('saveDayIndexDiv', () => {
      fillDayIndexDiv(this.dayIndexDiv, this.timeSlotDivs, this.$refs.tableContent, this.dates)
    })
  },
  watch: {
    startTime: function () {
      this.newTable()
    },
    dates: function () {
      this.newTable()
    },
    endTime: function () {
      this.newTable()
    },
    timeSteps: function () {
      this.newTable()
    },
    colorTableTime: function () {
      this.newTable()
    },
    colorTableCells: function () {
      this.newTable()
    },
    timeSlotDivs: function () {
      this.safe()
      this.dayIndexDiv = fillDayIndexDiv(this.dayIndexDiv, this.timeSlotDivs, this.$refs.tableContent, this.dates)
    }
  },
  beforeDestroy () {
    this.prepareTimeSlotStuff()
    window.removeEventListener('resize', this.resizeWindow)
  }
}

</script>

<style scoped>
    .tableData{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .scroll-area {
        position: relative;
        width: 98%;
        margin-left: 1%;
    }
    .tableRow{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        width: 50px;
    }
    .ctxMenuSubPoints{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .ctxMenuSubPoints:hover{
        background-color: #999999;
    }
</style>
