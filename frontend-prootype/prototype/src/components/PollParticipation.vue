<template>
    <div class="container-fluid" id="PollParticipation">
        <div class="row" v-if="passwordCorrect">
            <div class="col-4" id="name">
                <input v-model="name" placeholder="Name" id="nameID"/>
            </div>
            <div class="col-4">
                <DatumTablle :startTime="selectedStart"
                             :endTime="selectedEnd"
                             :timeSteps="selectedSteps"
                             :dates="singleDates"
                             ref="dateTable"
                             :participate="participate"
                             :dateTimeSlot="participateDates"
                             id="table"
                             :result="userResult"></DatumTablle>
            </div>
            <div class="col-4">
                <CommentManager id="comments" :user="user"></CommentManager>
                <button type="button" class="btn btn-primary" ref="button1" id="buttonOne" @click="externalMethods.saveInformation()">Speichern</button>
                <button type="button" class="btn btn-primary" ref="button2" id="buttonReset" @click="resetColor">Zurücksetzten</button>
            </div>
        </div>
        <div class="row" v-else>
            <h3 id="headerCheck">Bitte geben Sie das Passwort zur Umfrage ein:</h3>
            <input v-model="password" placeholder="Passwort" type="password" class="form-control" id="form"/>
            <button type="button" class="btn btn-primary" id="buttonSave" @click="externalMethods.checkPassword()">Abschicken</button>
            <span v-show="firstTry" id="firstTry">Passwort ist nicht korrekt</span>
        </div>
    </div>
</template>

<script>
import DatumTablle from './DatumTabelle'
import CommentManager from './CommentManager'
import {serverBus} from '../main'
import {checkPassword, checkCookie, saveInformation, fillPollParticipationData} from '../functions/PollParticipationFunctions'

export default {
  name: 'PollParticipation',
  components: {
    CommentManager,
    DatumTablle
  },
  data: function () {
    return {
      // starttime of the poll, note that it is overwritten in the fillData function
      selectedStart: '8:00',
      // endtime of the poll
      selectedEnd: '14:00',
      // steps of the poll
      selectedSteps: '0:30',
      // all dates of the poll, where a user can select its timeslots
      singleDates: [
        new Date(),
        new Date()
      ],
      // in this variable are days and timeslots in a two dimensional array saved
      participateDates: [],
      // helping object, for a timeslot
      timeRange: {
        start: '',
        end: ''
      },
      // this variable set the participate mode
      participate: true,
      // here is the id from the poll saved, received from the clicked poll in UmfrageListe
      // TODO change it in the way that it also works if just the link is type in, for now id is only set when the poll was clicked in umfrageListe
      id: this.$route.params.id,
      // here should be set the user, important for the comment system
      user: {
        id: 0,
        name: 'Patrick Koss'
      },
      // variable to set if a password is needed
      passwordCorrect: true,
      // here is the typed in password save
      password: '',
      // here is the password saved, that is received from the poll
      pollPassword: '',
      // variable that will show a text, that the typed password is incorrect, when you type in the wrong password for the first time
      firstTry: false,
      userResult: []
    }
  },
  methods: {
    externalMethods: function () {
      this.saveInformation = saveInformation()
      this.passwordCorrect = checkPassword()
      this.$cookies = checkCookie()
      this.time = fillPollParticipationData()
    },
    /**
     * once you set the timeslot there is a reset button, that reset the input in the table
     */
    resetColor: function () {
      try {
        this.$refs.dateTable.resetColors()
      } catch (e) {
        console.log(e)
      }
    }
  },
  beforeMount () {
    this.fillPollParticipationData()
    this.externalMethods().checkCookie()
  },
  mounted () {
    this.externalMethods().checkCookie()
  },
  created () {
    serverBus.$on('changeResult', (result) => {
      this.userResult = result
    })
  },
  updated () {
    this.externalMethods().checkCookie()
  }
}
</script>

<style scoped>
    #PollParticipation{
        margin-top: 50px;
    }
    #name{
        position: fixed;
        top: 100px;
        left: 50px;
    }
    #table{
        position: fixed;
        top: 100px;
        left: 300px;
        width: 33%;
        height: 850px;
    }
    #comments{
        position: fixed;
        top: 90px;
        left: 950px;
        width: 33%;
    }
    #buttonOne{
        position: fixed;
        top: 150px;
        left: 50px;
    }
    #buttonReset{
        position: fixed;
        top: 150px;
        left: 150px;
    }
    #buttonSave{
        position: fixed;
        top: 94px;
        left: 175px;
    }
    #headerCheck{
        margin-top: 50px;
    }
    #form{
        margin-top: 10px;
        width: 150px;
    }
    #firstTry{
        position: fixed;
        top: 94px;
        left: 285px;
    }
</style>
