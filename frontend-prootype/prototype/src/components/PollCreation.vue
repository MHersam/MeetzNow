<template>
    <div class="container-fluid" id="pollCreation">
        <div class="row" style="padding-bottom: 15px">
            <div class="col-3">
                <CustomCalendar></CustomCalendar>
            </div>
            <div class="col-9">
                <div class="row">
                    <div class="col-3">
                        <div class="col">
                            <CustomSelection :label="'Beginn'" :data="selectionTime" v-model="startTime"></CustomSelection>
                        </div>
                        <div class="w-100"></div>
                        <div class="col">
                            <CustomSelection :label="'Ende'" :data="selectionTime" v-model="endTime"></CustomSelection>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="col">
                            <CustomInputField v-model="place" :label="'Ort'"></CustomInputField>
                        </div>
                        <div class="w-100"></div>
                        <div class="col">
                            <CustomInputField v-model="theme" :label="'Thema'"></CustomInputField>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="col">
                            <CustomInputField v-model="participant" :label="'Teilnehmer hinzufügen'" :placeholder="'E-Mail Adresse'"></CustomInputField>
                        </div>
                        <div class="w-100"></div>
                        <div class="col">
                            <CustomSelection :label="'Theme'" :data="styleArray" v-model="style"></CustomSelection>
                        </div>
                    </div>
                    <div class="col-3">
                        <DragAndDropPicture :title="'Hintergrundbild auswählen'"></DragAndDropPicture>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div class="col">
                            <CustomSelection :label="'Zeitsteps'" :data="timeStepsTime" v-model="timeSteps"></CustomSelection>
                        </div>
                        <div class="w-100"></div>
                        <div class="col">
                            <CustomSelection :label="'Termindauer'" :data="meetingTime" v-model="meetingLength"></CustomSelection>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="col">
                            <CustomColorPickerForm :label="'Randfarbe der Tabelle'" v-model="colorEdge" :colorValue="colorEdge"></CustomColorPickerForm>
                        </div>
                        <div class="w-100"></div>
                        <div class="col">
                            <CustomColorPickerForm :label="'Inhaltsfarbe der Tabelle'" v-model="colorContent" :colorValue="colorContent"></CustomColorPickerForm>
                        </div>
                    </div>
                    <div class="col-3">
                        <duration-poll-calendar :label="'Dauer der Umfrage'" v-model="durationDate"></duration-poll-calendar>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-3" align="middle">
                <br/>
                <label style="color: blue">Markiere</label> die Zeitslots, die du zur Verfügung stellen möchtest!
            </div>
            <div class="col-9" ref="divTable">
                <DateTable :startTime="startTime"
                         :endTime="endTime"
                         :timeSteps="timeSteps"
                         :dates="dates"
                         id="table"
                         :colorTableCells="colorContent"
                         :colorTableTime="colorEdge"
                         :ref="dateTable"
                         :tableTop="tableTop"
                         :tableLeft="tableLeft" style="height: 500px;"></DateTable>
            </div>
        </div>
        <div class="row" style="padding-top: 10px">
            <div class="col" style="padding-bottom: 10px">
                <button style="width: 100%" type="button" class="btn btn-primary" @click="savePoll">Umfrage Speichern</button>
            </div>
        </div>
    </div>
</template>

<script>
import {colorEdge, colorContent} from '../functions/ColorUtil'
import CustomCalendar from './CustomCalendar'
import CustomInputField from './CustomInputField'
import CustomSelection from './CustomSelection'
import DragAndDropPicture from './DragAndDropPicture'
import DurationPollCalendar from './durationPollCalendar'
import {serverBus} from '../main'
import CustomColorPickerForm from './CustomColorPickerForm'
import DatumTablle from './DatumTabelle'
import {fillSelectionTime, fillMeetingArray} from '../functions/dataFillerFunctions'
import DateTable from './DateTable'
import {safeThePoll} from '../functions/PollCreationFunctions'

export default {
  name: 'PollCreation',
  components: {
    DateTable,
    CustomColorPickerForm,
    DatumTablle,
    DurationPollCalendar,
    DragAndDropPicture,
    CustomSelection,
    CustomInputField,
    CustomCalendar},
  data () {
    return {
      startTime: '8:00',
      endTime: '18:00',
      timeSteps: '0:30',
      meetingLength: '1:00',
      place: '',
      theme: '',
      style: 'Light',
      participant: '',
      selectionTime: [],
      meetingTime: [],
      timeStepsTime: ['0:15', '0:30', '1:00'],
      styleArray: ['Light', 'Dark', 'Personal'],
      dates: [new Date().toLocaleDateString()],
      colorEdge: colorEdge,
      colorContent: colorContent,
      test: 'hello',
      durationDate: {start: new Date(), end: new Date()},
      tableTop: '',
      timeSlots: [],
      tableLeft: 0
    }
  },
  methods: {
    fillAllData: function () {
      this.selectionTime = fillSelectionTime()
      this.meetingTime = fillMeetingArray()
    },
    savePoll: function () {
      safeThePoll(this.startTime, this.endTime, this.timeSteps, this.meetingLength, this.place, this.theme, this.style,
        this.dates, this.colorEdge, this.colorContent, this.durationDate, this.timeSlots)
    },
    getTableTop: function () {
      this.tableTop = this.$refs.divTable.offsetTop
      this.tableLeft = this.$refs.divTable.offsetLeft
    }
  },
  beforeMount () {
    this.fillAllData()
  },
  mounted () {
    serverBus.$on('dates', (dates) => {
      this.dates = dates
    })
    serverBus.$on('pollDuration', (dates) => {
      this.durationDate = dates
    })
    serverBus.$on('timeSlots', (timeSlots) => {
      this.timeSlots = timeSlots
    })
    this.getTableTop()
    this.$nextTick(function () {
      window.addEventListener('resize', this.getTableTop)
    })
  },
  updated () {
    this.getTableTop()
  }
}
</script>

<style scoped>
    #pollCreation{
        padding-top: 58px;
    }
</style>
