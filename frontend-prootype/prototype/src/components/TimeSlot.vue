<template xmlns:v-el="http://www.w3.org/1999/xhtml">
    <div>
    </div>
</template>
<script>
import {DateTableFunctions} from '../functions/DateTableFunctions'
import {createATimeSlot, setTimeTimeSlot, mergeTimeSlots} from '../functions/TimeSlotFunctions'
import {serverBus} from '../main'

export default {
  name: 'TimeSlot',
  components: {
  },
  props: {
    timeT: [],
    timeSlotCounterT: '',
    timeSlotDivsT: [],
    tableContentT: '',
    scrollbarT: '',
    datesT: [],
    mouseDownProp: 0,
    mouseOverProp: 0,
    mouseUpProp: ''
  },
  data: function () {
    return {
      activeT: false,
      tempTopT: 0,
      dateTableFunctionT: '',
      dayIndexT: '',
      positionDivT: '',
      timeSlotFunctionsT: ''
    }
  },
  methods: {
    initDateTableFunctions: function () {
      this.dateTableFunctionT = new DateTableFunctions()
    },
    mouseOverTimeSlot: function (pos, event) {
      if (this.activeT) {
        this.createTimeSlotT(pos, this.tableContentT[pos].offsetWidth, this.tableContentT[pos].offsetLeft, event.clientY - this.scrollbarT.$el.offsetTop + this.scrollbarT.$el.scrollTop + window.scrollY)
      }
    },
    mouseDownTimeSlot: function (pos, event) {
      console.log('mouseDown')
      this.activeT = true
      this.tempTopT = event.clientY - this.scrollbarT.$el.offsetTop + this.scrollbarT.$el.scrollTop + window.scrollY
      this.dayIndexT = (pos) % this.datesT.length
      for (let i = 0; i < this.timeSlotDivsT.length; i++) {
        this.timeSlotDivsT[i].style.pointerEvents = 'none'
      }
      console.log('mouseDown')
    },
    mouseUpTimeSlot: function () {
      this.activeT = false
      for (let i = 0; i < this.timeSlotDivsT.length; i++) {
        this.timeSlotDivsT[i].style.pointerEvents = 'inherit'
      }
      this.timeSlotCounterT = mergeTimeSlots(this.timeSlotDivsT, this.timeSlotDivsT[this.timeSlotCounterT], this.$refs.tableContentT, this.$refs.tableHeader, this.dragT, this.timeSlotCounterT, this.timeT)
    },
    createTimeSlotT: function (pos, width, left, top) {
      if (this.dayIndexT === pos % this.datesT.length) {
        try {
          serverBus.$emit('removeChild', this.timeSlotDivsT[this.timeSlotCounterT])
        } catch (e) {
        }
        this.timeSlotDivsT[this.timeSlotCounterT] = createATimeSlot(this.tempTopT, top, width, left, this.dragT, this.timeSlotCounterT, this.timeT, this.$refs.tableContentT)
        this.timeSlotDivsT[this.timeSlotCounterT].addEventListener('contextmenu', function (e) {
          e.preventDefault()
        }, false)
        serverBus.$emit('appendChild', this.timeSlotDivsT)
      }
    },
    allowDropT: function (ev) {
      ev.preventDefault()
    },
    dragT: function (pos, ev) {
      this.positionDivT = pos
      ev.dataTransfer.setData('text', ev.target.id)
      for (let i = 0; i < this.timeSlotDivsT.length; i++) {
        this.timeSlotDivsT[i].style.pointerEvents = 'none'
      }
    },
    dropT: function (pos, event) {
      this.timeSlotDivsT[this.positionDivT].style.top = event.clientY - this.scrollbarT.$el.offsetTop + this.scrollbarT.$el.scrollTop + window.scrollY + 'px'
      this.timeSlotDivsT[this.positionDivT].style.left = this.tableContentT[pos].offsetLeft + 'px'
      // check if we are out of the table
      if ((this.timeSlotDivsT[this.positionDivT].offsetTop + this.timeSlotDivsT[this.positionDivT].offsetHeight) > (this.timeT.length) * this.tableContentT[pos].offsetHeight) {
        let difference = (this.timeSlotDivsT[this.positionDivT].offsetTop + this.timeSlotDivsT[this.positionDivT].offsetHeight) - (this.timeT.length) * this.tableContentT[pos].offsetHeight
        this.timeSlotDivsT[this.positionDivT].style.top = this.timeSlotDivsT[this.positionDivT].offsetTop - difference + 'px'
      }
      this.timeSlotDivsT[this.positionDivT].innerHTML = setTimeTimeSlot(this.timeSlotDivsT[this.positionDivT].offsetTop, this.timeSlotDivsT[this.positionDivT].offsetTop + this.timeSlotDivsT[this.positionDivT].offsetHeight, this.timeT, this.tableContentT[0].offsetHeight)
      event.preventDefault()
      for (let i = 0; i < this.timeSlotDivsT.length; i++) {
        this.timeSlotDivsT[i].style.pointerEvents = 'inherit'
      }
    }
  },
  beforeMount () {
    this.initDateTableFunctions()
  },
  mounted () {
  },
  watch: {
    mouseDownProp: function () {
      console.log('mousedown watch')
      this.mouseDownTimeSlot(this.mouseDownProp)
    },
    mouseOverProp: function () {
      console.log('mouseOver watch')
      this.mouseOverTimeSlot(this.mouseOverProp)
    },
    mouseUpProp: function () {
      console.log('mouseUp watch')
      this.mouseUpTimeSlot()
    }
  }
}

</script>

<style scoped>
</style>
