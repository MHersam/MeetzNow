<template>
    <div class="container-fluid" id="PollList">
        <vue-tabs>
            <v-tab title="Umfrage Erstellt">
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-4">
                                <button style="border-right: thick solid black" type="button" class="btn btn-link">Gesamtübersicht</button>
                            </div>
                            <div class="col-4">
                                <button style="border-right: thick solid black" type="button" class="btn btn-link">von dir erstellt</button>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-link">teilgenommen</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="padding-top: 50px">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-3">
                                <label>Aktueller Monat:</label>
                            </div>
                            <div class="col-3">
                                {{new Date().toDateString()}}
                            </div>
                        </div>
                        <div class="row">
                            <calendar-range
                                    :initialView="6"
                                    :selection="selectDate"
                                    :locale="en"
                                    :events="dateRangeCreated"></calendar-range>
                        </div>
                    </div>
                    <div class="col-8">
                        <PollListTable :pollData="pollCreated" :created="true"></PollListTable>
                    </div>
                </div>
            </v-tab>

            <v-tab title="Umfrage Teilgenommen">
                <div class="row">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-4">
                                <button style="border-right: thick solid black" type="button" class="btn btn-link">Gesamtübersicht</button>
                            </div>
                            <div class="col-4">
                                <button style="border-right: thick solid black" type="button" class="btn btn-link">von dir erstellt</button>
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-link">teilgenommen</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="padding-top: 50px">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-3">
                                <label>Aktueller Monat:</label>
                            </div>
                            <div class="col-3">
                                {{new Date().toDateString()}}
                            </div>
                        </div>
                        <div class="row">
                            <calendar-range
                                    :initialView="6"
                                    :selection="selectDate"
                                    :locale="en"
                                    :events="dateRangeParticipated"></calendar-range>
                        </div>
                    </div>
                    <div class="col-8">
                        <PollListTable :pollData="pollParticipated" :created="false"></PollListTable>
                    </div>
                </div>
            </v-tab>
        </vue-tabs>
    </div>
</template>

<script>
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import PollListTable from './PollListTable'
import {fillPollListParticipated, fillPollListCreated, fillCalendarPollListCreated, fillCalendarPollListParticipated} from '../functions/dataFillerFunctions'
import {calendarRange} from 'vue-calendar-picker'

export default {
  name: 'PollList',
  components: {
    VueTabs,
    VTab,
    PollListTable,
    calendarRange: calendarRange
  },
  data () {
    return {
      pollCreated: [],
      pollParticipated: [],
      selectDate: {start: new Date(), end: new Date()},
      dateRangeCreated: [],
      dateRangeParticipated: []
    }
  },
  methods: {
    fillData: function () {
      this.pollCreated = fillPollListCreated()
      this.pollParticipated = fillPollListParticipated()
      this.dateRangeCreated = fillCalendarPollListCreated()
      this.dateRangeParticipated = fillCalendarPollListParticipated()
    }
  },
  beforeMount () {
    this.fillData()
  }
}
</script>

<style scoped>
    #PollList{
        padding-top: 50px;
    }
</style>
