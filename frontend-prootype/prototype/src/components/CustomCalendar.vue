<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <label><b>Wähle Termine für die Umfrage:</b></label>
            </div>
            <div class="w-100"></div>
            <div class="col-3">
                <div v-on:click="viewSelection">
                    <calendar-range
                            :initialView="6"
                            :selection="selectDate"
                            :locale="EN"
                            :events="dateRange"></calendar-range>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {calendarRange} from 'vue-calendar-picker'
import {serverBus} from '../main'
import {SingleDates} from '../functions/dateSelectLogic'

export default {
  name: 'CostumCalendar',
  components: {
    calendarRange: calendarRange
  },
  data: function () {
    return {
      selectDate: {start: new Date(), end: new Date()},
      dateRange: [],
      newDates: []
    }
  },
  methods: {
    /**
         * this function is called when the calendar is clicked, it colores the calender with the selected date
         */
    viewSelection: function () {
      let singleDates = new SingleDates(this.dateRange, this.newDates)
      singleDates.merging(singleDates.dateRange, this.selectDate.start, this.selectDate.end)
      this.newDates = singleDates.singleDates(singleDates.dateRange, singleDates.newDates)
      serverBus.$emit('dates', this.newDates)
    }
  }
}
</script>

<style scoped>

</style>
