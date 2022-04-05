<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <label style="color: blue">{{label}}</label>
            </div>
            <div class="w-100"></div>
            <div class="col">
                <vue-rangedate-picker @selected="onDateSelected"
                                      :months="months"
                                      :shortDays="shortDays"
                                      :captions="captions"
                                      righttoleft="true"
                                      presetRanges="disabled"></vue-rangedate-picker>
            </div>
        </div>
    </div>
</template>

<script>
import VueRangedatePicker from 'vue-rangedate-picker'
import {serverBus} from '../main'
import {shortDays, months} from '../functions/DateConstants'

export default {
  name: 'durationPollCalendar',
  components: {
    VueRangedatePicker
  },
  props: {
    label: ''
  },
  data () {
    return {
      months: months,
      shortDays: shortDays,
      captions: {
        'title': 'Wähle ein Zeitraum',
        'ok_button': 'OK'
      },
      selectedDate: {
        start: '',
        end: ''
      }
    }
  },
  methods: {
    /**
             * method set the selected daterange to the global variable from the calendar Picker
             */
    onDateSelected: function (daterange) {
      this.selectedDate = daterange
    }
  },
  watch: {
    selectedDate (date) {
      serverBus.$emit('pollDuration', date)
    }
  }
}
</script>

<style scoped>

</style>
