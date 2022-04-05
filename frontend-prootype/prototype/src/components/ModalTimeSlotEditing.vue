<template>
    <modal id="modal" name="editor" :resizable="true" :draggable="true" :adaptive="true" :scrollable="true" :width="350" :height="350"
           @before-open="beforeOpen" :modalStart="modalStart" :modalEnd="modalEnd" @before-close="beforeClose" :clickToClose="false">
        <div class="container" style="padding-top: 15px">
            <div class="row">
                <div class = col-3>
                    <label>Startzeit: </label>
                </div>
                <div class="col-9">
                    <input class="form-control" type="time" required :min="minTime" :max="maxTime" :value="modalStart" ref="InputStart"/>
                </div>
            </div>
            <div class="row" style="padding-top: 15px">
                <div class="col-3">
                    <label>Endzeit: </label>
                </div>
                <div class="col-9">
                    <input class="form-control" type="time" required :min="minTime" :max="maxTime" :value="modalEnd" ref="InputEnd"/>
                </div>
            </div>
            <div class="row" style="padding-top: 15px">
                <div class="col-3">
                    <label>Datum: </label>
                </div>
                <div class="col-9">
                    <select class="form-control" v-model="date">
                        <option v-for="dt in dates" v-bind:key="dt">{{dt}}</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col" style="padding-top: 15px">
                <button id="modalCloseButton" type="button" class="btn btn-primary" @click="hide" style="width: 98%; margin-left: 1%;">Speichern</button>
            </div>
        </div>
    </modal>
</template>

<script>

import {serverBus} from '../main'
import {getComparableTime} from '../functions/TimeSlotFunctions'

export default {
  name: 'ModalTimeSlotEditing',
  props: {
  },
  data () {
    return {
      modalStart: '',
      modalEnd: '',
      dates: [],
      date: '',
      minTime: '',
      maxTime: '',
      pos: 0,
      participate: false
    }
  },
  methods: {
    show (modalStart, modalEnd, dates, date, time, pos, participate) {
      if (parseInt(modalStart.split(':')[0]) < 10) this.modalStart = '0' + modalStart
      else this.modalStart = modalStart
      if (parseInt(modalEnd.split(':')[0]) < 10) this.modalEnd = '0' + modalEnd
      else this.modalEnd = modalEnd
      if (parseInt(time[0].split(':')[0]) < 10) this.minTime = '0' + time[0]
      else this.minTime = time[0]
      if (parseInt(time[time.length - 1].split(':')[0]) < 10) this.maxTime = '0' + time[time.length - 1]
      else this.maxTime = time[time.length - 1]
      this.dates = dates
      this.date = date
      this.pos = pos
      this.participate = participate
      this.$modal.show('editor')
    },
    hide () {
      if (getComparableTime(this.minTime) <= getComparableTime(this.$refs.InputStart.value) && getComparableTime(this.maxTime) >= getComparableTime(this.$refs.InputEnd.value) &&
          getComparableTime(this.$refs.InputStart.value) < getComparableTime(this.$refs.InputEnd.value)) {
        let result
        if (!this.participate) result = {start: this.$refs.InputStart.value, end: this.$refs.InputEnd.value, date: this.date, pos: this.pos}
        else result = {start: this.$refs.InputStart.value, end: this.$refs.InputEnd.value, date: this.date.split(' ')[0], pos: this.pos}
        serverBus.$emit('modalResult', result)
        this.$modal.hide('editor')
      }
    },
    beforeOpen (event) {
    },
    beforeClose (event) {
    }
  },
  watch: {
    date: function () {
      if (this.participate) {
        console.log('changed')
        this.minTime = this.date.split(' ')[1].split('-')[0]
        console.log(this.minTime)
        this.maxTime = this.date.split(' ')[1].split('-')[1]
      }
    }
  }
}
</script>

<style scoped>

</style>
