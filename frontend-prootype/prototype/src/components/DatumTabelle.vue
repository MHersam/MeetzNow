<template xmlns:v-el="http://www.w3.org/1999/xhtml">
    <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle">
            <table class="table table-bordered" ref="timeTable">
                <thead class="tableRow">
                <tr ref="tableFirstRow">
                    <td :style="'background-color: ' + colorTableTime">Zeit</td>
                    <td v-for="date in dates" v-bind:key="date" :style="'background-color: ' + colorTableTime">{{date}}</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(t, indexRow) in time" v-bind:key="indexRow" ref="tableRowData" v-bind:time="time">
                    <td class="tableRow" ref="tableTimeCell" :style="'background-color: ' + colorTableTime">{{t}}</td>
                    <td v-for="(date, indexColoum) in dates" v-bind:key="indexColoum" class="tableData" ref="tableContent" :style="'background-color: ' + colorTableCells"
                        @mouseup="mouseUp"
                        @mousedown="mouseDown(indexRow, indexColoum, $event)"
                        @mousemove="mouseOver(indexRow, indexColoum, $event)"
                        draggable="false"></td>
                </tr>
                </tbody>
            </table>
    </VuePerfectScrollbar>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {serverBus} from '../main'

export default {
  name: 'DatumTablle',
  components: {
    VuePerfectScrollbar
  },
  props: {
    startTime: '',
    endTime: '',
    timeSteps: '',
    dates: [],
    // in result are all timeslots from every single day in the poll is saved. Eg result[0] is referenced to the first day of the poll, result[0][0] is referenced to the first day, first timeslot of the day
    // there is an object {start: '', end: ''} saved
    result: [],
    // variable for checking if the 'participate' mode is on
    participate: false,
    // variable for the 'participate' mode, the parent component give the data in a 2 dimensional array where the first index references to the day and the secound to the timeslots where is an object saved like in results
    dateTimeSlot: [],
    // in tableCells are top, left, width and height from all table cells saved
    tableCells: [],
    // in this variable are the tableCells indices from all selected user timeslots saved
    tableCellsIndex: [],
    // in this variable are all timeslots from all users saved in a 3 dimensional array, where the first index is for the user, the secound for the day and the third for the timeslot objects
    userTimeSlots: [],
    // in this variable are all users saved, received from the parent
    users: [],
    // varibale to check if we are in the creator view, note that also participate have to be set in this mode
    erstellerSicht: false,
    colorTableTime: '',
    colorTableCells: '',
    tableTop: ''
  },
  data: function () {
    return {
      // here is saved all times, shown left of the table
      time: [],
      // here is saved, the dates and in the first place of the array 'Zeit'
      headerTableData: [],
      // for the vue perfect scrollbar you need settings
      settings: {
        maxScrollbarLength: 1000
      },
      // in this variable is the background color for the default table cell saved
      colorC: '#be2626',
      // active show if a mousebutton is still clicked, it is true for mousedown and false for mouseup
      active: false,
      // helping object for putting an object for our timeslots
      timeRange: {
        start: '',
        end: ''
      },
      // in the 'participate' mode we only want specific cells selectable, with this variable we achive that. The listener for a table cell is disabled if the listenerBool is false at the same index
      listenerBool: [],
      // helping variable to check if a username in the userlist was already clicked
      usersShowColor: [],
      widthCell: '',
      mouseY: '',
      leftCell: ''
    }
  },
  methods: {
    /**
       * method fill time Array
       * @param start start time, first element
       * @param end, end time, last element
       * @param steps, steps between each timecell
       */
    setTime: function (start, end, steps) {
      this.time = []
      let startHour = parseInt(start.split(':')[0], 10)
      let startMinutes = parseInt(start.split(':')[1], 10)
      let endHour = parseInt(end.split(':')[0], 10)
      let endMinutes = parseInt(end.split(':')[1], 10)
      if (endHour < startHour) {
        // console.log('if')
        startHour = parseInt(end.split(':')[0], 10)
        // console.log(startHour)
        endHour = parseInt(start.split(':')[0], 10)
        // console.log(endHour)
        startMinutes = parseInt(end.split(':')[1], 10)
        // console.log(startMinutes)
        endMinutes = parseInt(start.split(':')[1], 10)
        // console.log(endMinutes)
      } else if (endMinutes < startMinutes && endHour === startHour) {
        // console.log('if2')
        startHour = parseInt(end.split(':')[0], 10)
        // console.log(startHour)
        endHour = parseInt(start.split(':')[0], 10)
        // console.log(endHour)
        startMinutes = parseInt(end.split(':')[1], 10)
        // console.log(startMinutes)
        endMinutes = parseInt(start.split(':')[1], 10)
        // console.log(endMinutes)
      }
      var hourDiff = endHour - startHour
      var step
      var minutesDiff = (endMinutes - startMinutes)
      if (minutesDiff < 0)minutesDiff = minutesDiff + 60
      if (endMinutes < startMinutes)hourDiff = hourDiff - 1
      // hourDiff = hourDiff % 24
      if (hourDiff > 24)hourDiff = hourDiff - 24
      if (parseInt(steps.split(':')[0], 10) === 1) step = 60
      else step = parseInt(steps.split(':')[1], 10)
      // console.log(hourDiff + ' ' + minutesDiff)
      for (var i = 0; i < ((hourDiff * 60 + minutesDiff) / step) + 1; i++) {
        if (startMinutes === 0) this.time.push(startHour + ':' + startMinutes + '0')
        else this.time.push(startHour + ':' + startMinutes)
        startMinutes += step
        if (startMinutes % 60 === 0) startHour++
        if (startMinutes % 60 === 0) startMinutes = 0
      }
    },
    /**
       * method to fill the header from timetable in the way of (Zeit, date1, date2, date3, ...)
       * @param dateArr
       */
    fillTableHeader: function (dateArr) {
      this.headerTableData = []
      this.headerTableData.push('Zeit')
      for (var i = 0; i < dateArr.length; i++) {
        this.headerTableData.push(dateArr[i].toLocaleDateString())
      }
    },
    /**
       * method switch the color of a timetable cell
       * @param indexRow
       * @param indexColoum
       */
    mouseOver: function (indexRow, indexColoum, event) {
      /* if (this.participate) {
        if (this.listenerBool[indexRow * this.dates.length + indexColoum]) {
          if (this.active) this.$refs.tableContent[indexRow * this.dates.length + indexColoum].style.backgroundColor = this.colorC
        }
      } else {
        if (this.active) this.$refs.tableContent[indexRow * this.dates.length + indexColoum].style.backgroundColor = this.colorC
      } */
      if (this.active) {
        this.widthCell = this.$refs.tableContent[indexRow * this.dates.length + indexColoum].offsetWidth
        this.mouseY = event.clientY - this.tableTop
        this.leftCell = this.$refs.tableContent[indexRow * this.dates.length + indexColoum].offsetLeft
        console.log(this.mouseY)
      }
    },
    /**
       * method enable the hover coloring in timetable
       * @param indexRow
       * @param indexColoum
       */
    mouseDown: function (indexRow, indexColoum, event) {
      /* if (this.participate) {
        if (this.listenerBool[indexRow * this.dates.length + indexColoum]) {
          this.colorC = this.getBackgroundColorTd(this.$refs.tableContent[indexRow * this.dates.length + indexColoum])
          if (this.colorC === '#fff812') this.colorC = '#F25FFF'
          else this.colorC = '#FFF812'
          this.$refs.tableContent[indexRow * this.dates.length + indexColoum].style.backgroundColor = this.colorC
          this.active = true
        }
      } else {
        this.colorC = this.getBackgroundColorTd(this.$refs.tableContent[indexRow * this.dates.length + indexColoum])
        if (this.colorC === '#be2626') this.colorC = '#F25FFF'
        else this.colorC = '#be2626'
        this.$refs.tableContent[indexRow * this.dates.length + indexColoum].style.backgroundColor = this.colorC
        this.active = true
      } */
      // TODO check if the mouseY is correct after the tableTop data is received
      this.active = true
      this.widthCell = this.$refs.tableContent[indexRow * this.dates.length + indexColoum].offsetWidth
      console.log(this.$refs.tableFirstRow.offsetTop)
      this.mouseY = event.pageY - this.tableTop
      this.leftCell = this.$refs.tableContent[indexRow * this.dates.length + indexColoum].offsetLeft
      console.log(this.mouseY)
    },
    /**
       * method will disable the hover coloring
       */
    mouseUp: function () {
      this.active = false
    },
    /**
       * method to compute rgb to hex
       * @param c
       * @returns {string}
       */
    rgbToHex: function (c) {
      var hex = Number(c).toString(16)
      if (hex.length < 2) {
        hex = '0' + hex
      }
      return hex
    },
    /**
       * method to get full hex color from every component of rgb
       * @param r
       * @param g
       * @param b
       * @returns {string}
       */
    fullColorHex: function (r, g, b) {
      var red = this.rgbToHex(r)
      var green = this.rgbToHex(g)
      var blue = this.rgbToHex(b)
      return '#' + red + green + blue
    },
    /**
       * method to return the hex color of a timetable cell
       * @param td
       * @returns {*|string}
       */
    getBackgroundColorTd: function (td) {
      var cellBC = td.style.backgroundColor.toLocaleString()
      var cut1 = cellBC.split('(')[1]
      var cut2 = cut1.split(')')[0]
      var rgb = cut2.split(',')
      var hexColor = this.fullColorHex(rgb[0], rgb[1], rgb[2])
      return hexColor
    },
    /**
       * method to destroy the old table and create a new one when an attribute change
       */
    newTable: function () {
      this.colorC = '#be2626'
      try {
        // save this in variable self
        var self = this
        // delete all rows from the table
        for (var i = 0; i <= self.time.length; i++) {
          self.$refs.timeTable.deleteRow(0)
        }
        // delete the date cell array
        self.$refs.tableContent.splice(0, self.$refs.tableContent.length)
        // delete the time cell array
        self.$refs.tableTimeCell.splice(0, self.time.length)
        // set new time
        self.setTime(this.startTime, this.endTime, this.timeSteps)
        // build new table, starting with first row that has time and dates
        var header = self.$refs.timeTable.createTHead()
        var row = header.insertRow(0)
        row.classList.add('tableData')
        var cell1 = row.insertCell(0)
        cell1.className = 'tableRow'
        cell1.style.backgroundColor = self.colorTableTime
        // first cell of the first row is always Zeit
        cell1.innerHTML = 'Zeit'
        var cells = []
        // add the following dates
        for (i = 1; i <= self.dates.length; i++) {
          cells[i - 1] = row.insertCell(i)
          cells[i - 1].classList.add('tableData')
          cells[i - 1].style.backgroundColor = self.colorTableTime
          cells[i - 1].innerHTML = self.dates[i - 1]
        }
        // save the time in cellsTime[]
        var cellsTime = []
        // save the empty cells which should only have listeners
        var cellsContent = []
        // init here the cells
        for (i = 1; i <= self.time.length; i++) {
          row = self.$refs.timeTable.insertRow(i)
          row.setAttribute('class', 'tableData')
          row.classList.add('tableData')
          row.setAttribute('ref', 'tableRowData')
          cellsTime[i - 1] = row.insertCell(0)
          cellsTime[i - 1].innerHTML = self.time[i - 1]
          cellsTime[i - 1].setAttribute('class', 'tableData')
          cellsTime[i - 1].classList.add('tableData')
          cellsTime[i - 1].setAttribute('ref', 'tableTimeCell')
          cellsTime[i - 1].style.backgroundColor = self.colorTableTime
          for (var j = 1; j <= self.dates.length; j++) {
            cellsContent[self.dates.length * (i - 1) + (j - 1)] = row.insertCell(j)
            cellsContent[self.dates.length * (i - 1) + (j - 1)].setAttribute('ref', 'tableContent')
            cellsContent[self.dates.length * (i - 1) + (j - 1)].style.backgroundColor = self.colorTableCells
            self.$refs.tableContent.push(cellsContent[self.dates.length * (i - 1) + (j - 1)])
            cellsContent[self.dates.length * (i - 1) + (j - 1)].setAttribute('class', 'tableData')
            cellsContent[self.dates.length * (i - 1) + (j - 1)].classList.add('tableData')
            cellsContent[self.dates.length * (i - 1) + (j - 1)].setAttribute('draggable', false)
            cellsContent[self.dates.length * (i - 1) + (j - 1)].addEventListener('mousedown', self.mouseDown.bind(self, i - 1, j - 1), false)
            cellsContent[self.dates.length * (i - 1) + (j - 1)].addEventListener('mouseup', self.mouseUp, false)
            cellsContent[self.dates.length * (i - 1) + (j - 1)].addEventListener('mousemove', self.mouseOver.bind(self, i - 1, j - 1), false)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
       * method to save all timeslots, isn´t tested yet so no guarentee that it will work
       */
    saveTimeSlots: function () {
      // TODO rewrite this method after the timeSlot function is implented
      try {
        this.result = []
        // save length of timearray
        var length = this.dates.length
        // save all selectable cells in data
        var data = this.$refs.tableContent
        // temporary start and end variable to push into the result array
        var start
        var end
        // i will iterate over all dates
        for (var i = 0; i < this.dates.length; i++) {
          // init result
          this.result[i] = []
          // j will iterate over the time left on the table
          for (var j = 0; j < this.time.length; j++) {
            // check if the cell is selected
            if (this.getBackgroundColorTd(data[length * j + i]) === '#f25fff') {
              // save start and end time
              start = this.time[j]
              end = this.time[j]
              // k will iterate over the following cells from the start to check if they are in the range
              for (var k = j + 1; k < this.time.length; k++) {
                // check if the next cell of the before selected cell is still in the range
                if (this.getBackgroundColorTd(data[length * k + i]) === '#f25fff') {
                  end = this.time[k]
                  // if we are at the end of the time then push the end time in the timeslots and leave the for loop, to avoid array out of bounds
                  if (k === this.time.length - 1) {
                    j = k + 1
                    this.result[i].push({start: start, end: end})
                    break
                  }
                } else {
                  j = k
                  this.result[i].push({start: start, end: end})
                  break
                }
              }
            }
          }
        }
        serverBus.$emit('changeResult', this.result)
      } catch (e) {

      }
    },
    /**
       * method will prepare the table for the 'teilnehmen' modus, it will color the table with the timeslots given by a user and remove the listeners for cell that should´t be selectable
       */
    prepareTeilnahme: function () {
      // TODO after the new timeslot methods are implented, this method has to be change. For now it depends on the table cells color, but it should depend on the timeslots.
      // TODO to realize that you can put the same listeners in the timeslots and disable the listeners for the table cells. So only the timeslots are clickable.
      try {
        if (this.participate) {
          var timeStart = ''
          var timeEnd = ''
          // i will iterate over the dates
          for (var i = 0; i < this.dateTimeSlot.length; i++) {
            // j will iterate over the saved timeslots
            for (var j = 0; j < this.dateTimeSlot[i].length; j++) {
              timeStart = this.dateTimeSlot[i][j].start
              // console.log(this.dateTimeSlot[i][j].start)
              timeEnd = this.dateTimeSlot[i][j].end
              // k will iterate over all times left on the table
              for (var k = 0; k < this.time.length; k++) {
                // check if the starttime from a slot equals a time cell
                if (this.time[k] === timeStart) {
                  // color the cell that should be selectable by the participant
                  this.$refs.tableContent[this.dateTimeSlot.length * k + i].style.backgroundColor = '#FFF812'
                  this.listenerBool[this.dateTimeSlot.length * k + i] = true
                  // increase k to check next cell
                  k++
                  // check if we are not out of bounds
                  if (k >= this.time.length) break
                  // color the following cells as long as we are not at the end
                  while (this.time[k] !== timeEnd) {
                    this.$refs.tableContent[this.dateTimeSlot.length * k + i].style.backgroundColor = '#FFF812'
                    this.listenerBool[this.dateTimeSlot.length * k + i] = true
                    k++
                  }
                  // check if we are not out of bounds
                  if (k >= this.time.length) break
                  // if we are at the end then add last cell
                  if (this.time[k] === timeEnd) {
                    this.$refs.tableContent[this.dateTimeSlot.length * k + i].style.backgroundColor = '#FFF812'
                    this.listenerBool[this.dateTimeSlot.length * k + i] = true
                  }
                }
              }
            }
          }
          this.colorC = '#FFF812'
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
       * function to reset the selected table cells in the 'teilnehmen' mode
       */
    resetColors: function () {
      for (var i = 0; i < this.listenerBool.length; i++) {
        if (this.listenerBool[i]) this.$refs.tableContent[i].style.backgroundColor = '#FFF812'
      }
    },
    /**
       * this function fill the tableCellsIndex property and send it to the parent. This property contains the timeslots indices from all users
       * The users are received from the parent component
       */
    fillUserTimeCellsIndex: function () {
      try {
        if (this.participate) {
          var timeStart = ''
          var timeEnd = ''
          // i will iterate over the users
          for (var i = 0; i < this.userTimeSlots.length; i++) {
            this.tableCellsIndex[i] = []
            // j will iterate over the dates
            for (var j = 0; j < this.userTimeSlots[i].length; j++) {
              // k will iterate over all time slots
              for (var k = 0; k < this.userTimeSlots[i][j].length; k++) {
                timeStart = this.userTimeSlots[i][j][k].start
                timeEnd = this.userTimeSlots[i][j][k].end
                // l will iterate over all times left in the table
                for (var l = 0; l < this.time.length; l++) {
                  // check if the starttime from a slot equals a time cell
                  if (this.time[l] === timeStart) {
                    // save the table cell index for a specific user
                    this.tableCellsIndex[i].push(this.dates.length * l + j)
                    // increase k to check next cell
                    l++
                    // check if we are not out of bounds
                    if (l >= this.time.length) break
                    // put the table cell index for a selected time slot in tableCellsIndex
                    while (this.time[l] !== timeEnd) {
                      this.tableCellsIndex[i].push(this.dates.length * l + j)
                      l++
                    }
                    // check if we are not out of bounds
                    if (l >= this.time.length) break
                    // if we are at the end then add last cell
                    if (this.time[l] === timeEnd) {
                      this.tableCellsIndex[i].push(this.dates.length * l + j)
                    }
                  }
                }
              }
            }
          }
          serverBus.$emit('tableCellsIndex', this.tableCellsIndex)
        }
      } catch (e) {
        console.log(e)
      }
    },
    /**
       * trick to remove the listeners for the 'teilnehmen' mode
       */
    prepareListener: function () {
      for (var i = 0; i < this.$refs.tableContent.length; i++) {
        this.listenerBool.push(false)
      }
    },
    /**
       * trick to remove the listeners for the 'erstellerSicht' mode
       */
    removeAllListener: function () {
      if (this.erstellerSicht) {
        this.listenerBool = []
        for (var i = 0; i < this.$refs.tableContent.length; i++) {
          this.listenerBool.push(false)
        }
      }
    },
    /**
       * this function send all the left, top, width and hight attribute from all tablecells to the parent component
       */
    getTableCells: function () {
      for (var i = 0; i < this.$refs.tableContent.length; i++) {
        this.tableCells.push({width: this.$refs.tableContent[i].offsetWidth, height: this.$refs.tableContent[i].offsetHeight, top: this.$refs.tableContent[i].offsetTop, left: this.$refs.tableContent[i].offsetLeft})
      }
      serverBus.$emit('tableCells', this.tableCells)
    },
    /**
       * once you click on a name on the list, the timeslots from this name will be showed. If you click again, his timeslots will disappear
       * @param userID
       */
    viewUserTimeSlots: function (userID) {
      var left = 5 * userID
      var wrapper = document.createElement('div')
      var divs = []
      var position = 0
      // initialize all divs needed
      for (var j = 0; j < this.tableCellsIndex[userID].length; j++) {
        divs.push(document.createElement('div'))
      }
      // invert the variable that show if a user has already clicked on the name
      this.usersShowColor[userID] = !this.usersShowColor[userID]
      // in this if a linestrip for a user is set, considering which timeslots a user have
      if (this.usersShowColor[userID]) {
        for (j = 0; j < this.tableCellsIndex[userID].length; j++) {
          divs[position].style.position = 'absolute'
          divs[position].style.backgroundColor = this.users[userID].color
          divs[position].style.top = this.tableCells[this.tableCellsIndex[userID][j]].top + 'px'
          divs[position].style.left = this.tableCells[this.tableCellsIndex[userID][j]].left + (left % this.tableCells[this.tableCellsIndex[userID][j]].width) + 'px'
          divs[position].style.width = '5px'
          divs[position].style.height = this.tableCells[this.tableCellsIndex[userID][j]].height + 'px'
          wrapper.appendChild(divs[position])
          position++
        }
        this.$refs.tableContent[this.tableCellsIndex[userID][this.tableCellsIndex[userID].length - 1]].innerHTML += wrapper.innerHTML
      } else {
        for (j = 0; j < this.tableCellsIndex[userID].length; j++) {
          divs[position].style.position = 'absolute'
          divs[position].style.backgroundColor = this.users[userID].color
          divs[position].style.top = this.tableCells[this.tableCellsIndex[userID][j]].top + 'px'
          divs[position].style.left = this.tableCells[this.tableCellsIndex[userID][j]].left + (left % this.tableCells[this.tableCellsIndex[userID][j]].width) + 'px'
          divs[position].style.width = '5px'
          divs[position].style.height = this.tableCells[this.tableCellsIndex[userID][j]].height + 'px'
          wrapper.appendChild(divs[position])
          position++
        }
        this.$refs.tableContent[this.tableCellsIndex[userID][this.tableCellsIndex[userID].length - 1]].innerHTML = this.$refs.tableContent[this.tableCellsIndex[userID][this.tableCellsIndex[userID].length - 1]].innerHTML.replace(wrapper.innerHTML, '')
      }
    },
    /**
       * this function initialize the userShowColor field with false, this variable is need to check if a user has clicked on a name of the list and then the timeslots will be shown at the table
       */
    initializeUsersShowColor: function () {
      for (var i = 0; i < this.users.length; i++) {
        this.usersShowColor.push(false)
      }
    },
    /**
       * this function will show the distrubution from all user selected timeslots. The more users have selected a timeslot, the more white the timeslot gets
       * this function is triggered in the parent component
       */
    showUserDistribution: function () {
      var wrapper = []
      var divs = []
      var position = 0
      // initialize all divs
      for (var i = 0; i < this.users.length; i++) {
        wrapper[i] = document.createElement('div')
        for (var j = 0; j < this.tableCellsIndex[i].length; j++) {
          divs.push(document.createElement('div'))
        }
      }
      // generate whats inside every div, considering what a user have for timeslots
      for (i = 0; i < this.users.length; i++) {
        for (j = 0; j < this.tableCellsIndex[i].length; j++) {
          divs[position].style.position = 'absolute'
          divs[position].style.backgroundColor = '#000000'
          divs[position].style.top = this.tableCells[this.tableCellsIndex[i][j]].top + 'px'
          divs[position].style.left = this.tableCells[this.tableCellsIndex[i][j]].left - 3 + 'px'
          divs[position].style.width = this.tableCells[this.tableCellsIndex[i][j]].width + 'px'
          divs[position].style.height = this.tableCells[this.tableCellsIndex[i][j]].height + 'px'
          divs[position].style.opacity = '0.1'
          wrapper[i].appendChild(divs[position])
          position++
        }
        this.$refs.tableContent[this.tableCellsIndex[i][this.tableCellsIndex[i].length - 1]].innerHTML += wrapper[i].innerHTML
      }
    },
    /**
       * function set the user time slots when a cookie is set in the 'teilnehmen' mode
       * @param result
       */
    setUserTimeSlot: function (result) {
      var timeStart = ''
      var timeEnd = ''
      try {
        // i will iterate over the dates
        for (var i = 0; i < result.length; i++) {
          // j will iterate over the saved timeslots
          for (var j = 0; j < result[i].length; j++) {
            timeStart = result[i][j].start
            timeEnd = result[i][j].end
            // k will iterate over all times left on the table
            for (var k = 0; k < this.time.length; k++) {
              // check if the starttime from a slot equals a time cell
              if (this.time[k] === timeStart) {
                // color the cell that should be selectable by the participant
                this.$refs.tableContent[result.length * k + i].style.backgroundColor = '#f25fff'
                this.listenerBool[result.length * k + i] = true
                // increase k to check next cell
                k++
                // check if we are not out of bounds
                if (k >= this.time.length) break
                // color the following cells as long as we are not at the end
                while (this.time[k] !== timeEnd) {
                  this.$refs.tableContent[result.length * k + i].style.backgroundColor = '#f25fff'
                  this.listenerBool[result.length * k + i] = true
                  k++
                }
                // check if we are not out of bounds
                if (k >= this.time.length) break
                // if we are at the end then add last cell
                if (this.time[k] === timeEnd) {
                  this.$refs.tableContent[result.length * k + i].style.backgroundColor = '#f25fff'
                  this.listenerBool[result.length * k + i] = true
                }
              }
            }
          }
        }
        this.colorC = '#FFF812'
      } catch (e) {
        console.log(e)
      }
    },
    /**
       * this function create a timeslot and also merge timeslots if they are covered
       */
    createTimeSlot: function (cellIndex) {
      // TODO in general it is up to you how to solve this function but I will give a recommendation how I would do it
      // TODO I would set in data a div[] array. Then for each cell a div in div[] is needed.
      // TODO A div will get the width of the table cell, the left of the table cell and the height of mouseY. Also a backgroundcolor and border will be needed.
      // TODO eveytime a mouseevent is triggered this function should create a div and put it in div[], also the old one should be put out of the array
      // TODO you can consider calling this function in the mouseEvents.
      // TODO you might want to check out the showUserDistribution function to know how to write a div into the tableCells
    },
    /**
       * this function will delete a timeslot
       */
    deleteTimeSlot: function () {
      // TODO as in createTimeSlot it is up to you, it all depends how a timeslot is saved.
    },
    /**
       * this function will edit a Timeslot. In a popup the data date, and time is reveived.
       */
    editTimeSlot: function () {
      // TODO implement this function
    }
  },
  beforeMount () {
    this.setTime(this.startTime, this.endTime, this.timeSteps)
    this.fillTableHeader(this.dates)
    this.prepareTeilnahme()
    this.prepareListener()
    this.initializeUsersShowColor()
  },
  mounted () {
    this.setTime(this.startTime, this.endTime, this.timeSteps)
    this.fillTableHeader(this.dates)
    this.prepareTeilnahme()
    this.removeAllListener()
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
    }
  }
}

</script>

<style scoped>
    #datumTabelle{
        margin-top: 75px;
        margin-left: 50px;
        width: 500px;
    }
    .tableData{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #999999;
    }
    .scroll-area {
        position: relative;
        width: 98%;
        margin-left: 1%;
        height: 500px;
    }
    .tableRow{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: #999999;
        width: 50px;
    }
</style>
