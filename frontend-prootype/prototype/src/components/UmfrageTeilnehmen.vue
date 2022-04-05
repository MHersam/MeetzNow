<template>
    <div id="umfrageTeilnehmen">
        <div v-if="passwordKorrekt">
            <div id="name">
                <input v-model="name" placeholder="Name" id="nameID"/>
            </div>
            <div>
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
            <CommentManager id="comments" :user="user"></CommentManager>
            <div>
                <button type="button" class="btn btn-primary" ref="button1" id="buttonOne" @click="saveInformation">Speichern</button>
                <button type="button" class="btn btn-primary" ref="button2" id="buttonReset" @click="resetColor">Zurücksetzten</button>
            </div>
        </div>
        <div v-else>
            <h3 id="headerCheck">Bitte geben Sie das Passwort zur Umfrage ein:</h3>
            <input v-model="password" placeholder="Passwort" type="password" class="form-control" id="form"/>
            <button type="button" class="btn btn-primary" id="buttonSave" @click="checkPassword">Abschicken</button>
            <span v-show="firstTry" id="firstTry">Passwort ist nicht korrekt</span>
        </div>
    </div>
</template>

<script>
import DatumTablle from './DatumTabelle'
import CommentManager from './CommentManager'
import {serverBus} from '../main'
export default {
  name: 'UmfrageTeilnehmen',
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
      passwordKorrekt: true,
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
    /**
       * method will fill some example data
       */
    fillData: function () {
      // here in the json variable should be the data that is received from the backend, now it is example data
      var json = JSON.parse(localStorage.getItem('jsonData'))
      for (var i = 0; i < json.timeslots.length; i++) {
        this.participateDates[i] = []
        for (var j = 0; j < json.timeslots[i].length; j++) {
          this.participateDates[i].push(json.timeslots[i][j])
        }
      }
      this.singleDates = []
      for (i = 0; i < json.dates.length; i++) {
        this.singleDates.push(new Date(json.dates[i]))
      }
      this.selectedStart = json.startTime
      this.selectedEnd = json.endTime
      this.selectedSteps = json.timeSteps
      if (!(json.password === '')) {
        this.passwordKorrekt = false
      }
      this.pollPassword = json.password
    },
    /**
       * this function will save all data that is put in the form, time slots, name and will set a cookie
       */
    saveInformation: function () {
      this.$refs.dateTable.saveTimeSlots()
      for (var i = 0; i < this.userResult.length; i++) {
        console.log('day: ' + i)
        for (var j = 0; j < this.userResult[i].length; j++) {
          console.log(this.userResult[i][j].start)
          console.log(this.userResult[i][j].end)
        }
      }
      // TODO add more necessary data?
      var jsonData = {timeslots: this.userResult,
        dates: this.singleDates,
        startTime: this.selectedStart,
        endTime: this.selectedEnd,
        timeSteps: this.selectedSteps,
        userName: this.name}
      // with the previosly object, we will convert it to an json string
      var data = JSON.stringify(jsonData)
      // TODO send the json string to the backend, probably convert it back to an json object and then send it
      localStorage.setItem('jsonUser', data)
      // var jsonObject = JSON.parse(localStorage.getItem('jsonUser'))
      // the cookie key is umfrage + umfrageID + user + userID
      this.$cookies.set('umfrage_' + this.id + '_user_' + this.user.id, 'GH1.1.1689020474.1484362313', Infinity)
      this.$router.push('/UmfrageListe/')
      this.$router.replace('/UmfrageListe/')
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
    },
    /**
       * this function check the password it is correct, if not a text will be showed that it is not correct
       */
    checkPassword: function () {
      // TODO let the backend do the checking
      if (this.pollPassword === this.password) this.passwordKorrekt = true
      this.firstTry = true
    },
    /**
       * this function check if a cookie is set. When it is set the timeslots of the users will be shown and the name as well
       */
    checkCookie: function () {
      if (this.$cookies.isKey('umfrage_' + this.id + '_user_' + this.user.id)) {
        // TODO get the backend data
        var jsonObject = JSON.parse(localStorage.getItem('jsonUser'))
        this.name = jsonObject.userName
        try {
          this.$refs.dateTable.setUserTimeSlot(jsonObject.timeslots)
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  beforeMount () {
    this.fillData()
    this.checkCookie()
  },
  mounted () {
    this.checkCookie()
  },
  computed: {
  },
  created () {
    serverBus.$on('changeResult', (result) => {
      this.userResult = result
    })
  },
  updated () {
    this.checkCookie()
  }
}
</script>

<style scoped>
    #umfrageTeilnehmen{
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
    #headerCheck{
        margin-top: 50px;
    }
    #form{
        margin-top: 10px;
        width: 150px;
    }
    #buttonSave{
        position: fixed;
        top: 94px;
        left: 175px;
    }
    #firstTry{
        position: fixed;
        top: 94px;
        left: 285px;
    }
</style>
