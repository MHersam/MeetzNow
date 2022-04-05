<template>
    <div class="container-fluid" id="pollParticipate">
        <div class="row">
            <div class="col-4">
                <div class="row">
                    <div class="col">
                        <input class="form-control" v-model="name" placeholder="Name" id="nameID"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col" style="padding-top: 5px;">
                        <button type="button" class="btn btn-primary" @click="safe">Speichern</button>
                    </div>
                    <div class="col" style="padding-top: 5px;">
                        <button type="button" class="btn btn-primary">Zurücksetzten</button>
                    </div>
                </div>
                <div class="row">
                    <PollInformation :information="pollInformation"></PollInformation>
                </div>
            </div>
            <div class="col-8" ref="divTable">
                <DateTable :startTime="startTime"
                           :endTime="endTime"
                           :timeSteps="timeSteps"
                           :dates="dates"
                           id="table"
                           :colorTableCells="colorContent"
                           :colorTableTime="colorEdge"
                           :ref="dateTable"
                            :tableTop="tableTop"
                            :participate="true"
                            :timeSlots="timeSlots"
                            :tableLeft="tableLeft"
                            style="height: 400px"></DateTable>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <CommentManager :user="user"></CommentManager>
            </div>
        </div>
    </div>
</template>

<script>
import DateTable from './DateTable'
import CommentManager from './CommentManager'
import PollInformation from './PollInformation'
import {fillPollInformation} from '../functions/dataFillerFunctions'
import {serverBus} from '../main'

export default {
  name: 'PollParticipate',
  components: {
    PollInformation,
    DateTable,
    CommentManager
  },
  data () {
    return {
      id: this.$route.params.id,
      user: {
        id: 0,
        name: 'Patrick Koss'
      },
      startTime: '',
      endTime: '',
      timeSteps: '',
      dates: [],
      colorContent: '',
      pollInformation: {
        required: true,
        type: Object
      },
      colorEdge: '',
      name: '',
      tableTop: 0,
      timeSlots: '',
      timeSlotsUser: [],
      tableLeft: 0
    }
  },
  methods: {
    fillInformation: function () {
      this.pollInformation = fillPollInformation(this.id)
      let info = JSON.parse(localStorage.getItem('pollData'))
      this.startTime = info.startTime
      this.endTime = info.endTime
      this.dates = info.dates
      this.colorContent = info.colorContent
      this.colorEdge = info.colorEdge
      this.timeSteps = info.timeSteps
      this.timeSlots = info.timeSlots
    },
    getTableTop: function () {
      this.tableTop = this.$refs.divTable.offsetTop
      this.tableLeft = this.$refs.divTable.offsetLeft
    },
    safe: function () {
      // safeThePoll(this.startTime, this.endTime, this.timeSteps, this.meetingLength, this.place, this.theme, this.style,
      // this.dates, this.colorEdge, this.colorContent, this.durationDate, this.timeSlots)
    }
  },
  beforeMount () {
    this.fillInformation()
  },
  mounted () {
    this.getTableTop()
    serverBus.$on('timeSlots', (timeSlots) => {
      this.timeSlotsUser = timeSlots
    })
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
    #pollParticipate{
        padding-top: 65px;
    }
</style>
