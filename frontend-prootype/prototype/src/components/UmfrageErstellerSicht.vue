<template>
    <div id="umfrageTeilnehmen">
        <div>
            <DatumTablle :startTime="selectedStart"
                         :endTime="selectedEnd"
                         :timeSteps="selectedSteps"
                         :dates="singleDates"
                         ref="dateTable"
                         :participate="participate"
                         :dateTimeSlot="participateDates"
                         id="table"
                         :tableCells="tableCells"
                         :result="result"
                         :userTimeSlots="userTimeSlots"
                         :tableCellsIndex="tableCellsIndex"
                         :users="users"
                         :erstellerSicht="true"></DatumTablle>
        </div>
        <CommentManager id="comments" :user="user"></CommentManager>
        <button type="button" class="btn btn-primary" id="buttonPopUp" @click="show">Link Teilen</button>
        <div id="userList">
            <ul>
                <li v-for="(user, index) in users" v-bind:key="user.id" :style="'color: ' + user.color" @click="viewTimeSlot(index)">{{user.name}}</li>
            </ul>
        </div>
        <modal id="modal" name="hello-world">
            <h3>Hier ist der teilbare Link:</h3>
            <h3>{{link}}</h3>
            <button id="modalCloseButton" type="button" class="btn btn-primary" @click="hide">Schließen</button>
        </modal>
    </div>
</template>

<script>

import DatumTablle from './DatumTabelle'
import CommentManager from './CommentManager'
import {serverBus} from '../main'
import {getColorArray} from '../functions/ColorUtil'
import {shareLink} from '../functions/Links'

export default {
  name: 'UmfrageErstellerSicht',
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
      // here are all users saved, that have already participated in the poll
      users: [],
      // in this array are all tableCells attributes (top, left, width, height) from the child component saved
      tableCells: [],
      // helping variable for the child component dateTable
      result: [],
      // here will be all usertimeslots saved. In the first dimension is the user, beginning with index 0 and in the next two dimensions are his timeslots for each day of the poll
      userTimeSlots: [],
      // here are the indices saved from a user selected cells. In the first dimension is the user and in the secound all his cell indices
      tableCellsIndex: [],
      // in link is the shareable link to the poll saved
      link: '',
      // array to save user colors
      userColors: []
    }
  },
  methods: {
    /**
     * method fill the data from the poll in where a user should participate
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
      this.link = shareLink + this.id
    },
    /**
       * this function fills the users array with all user that participated in the poll
       */
    fillUsers: function () {
      // TODO get the users from the Backend and dont make example user
      this.users.push({id: 0, name: 'Patrick Koss', color: this.userColors[0]})
      this.users.push({id: 1, name: 'Alexander Keck', color: this.userColors[1]})
      this.users.push({id: 2, name: 'Malte Meiners', color: this.userColors[2]})
      this.users.push({id: 3, name: 'Michael Hersam', color: this.userColors[3]})
      this.users.push({id: 4, name: 'Lion Wagner', color: this.userColors[4]})
      // in data we should put the users received from the backend
      var dataUsers = JSON.stringify(this.users)
      localStorage.setItem('users', dataUsers)
      var users = JSON.parse(localStorage.getItem('users'))
      this.users = []
      for (var i = 0; i < users.length; i++) {
        this.users.push(users[i])
      }
    },
    /**
       * this function fill the userTimeSlot array. In the first dimension there should be the users beginning from index 0, in the secound dimension should be the day, beginning from 0
     * in the third dimension should be all timeslots saved in an object for this day
       */
    fillUserTimeSlots: function () {
      // TODO once the backend is set up, fill the correct data
      // for now each user has random days and random timeslots
      var randomDay = Math.floor(Math.random() * this.participateDates.length)
      var randomTimeslot = Math.floor(Math.random() * this.participateDates[randomDay].length)
      for (var i = 0; i < this.users.length; i++) {
        this.userTimeSlots[i] = []
        for (var j = 0; j < this.participateDates.length; j++) { this.userTimeSlots[i][j] = [] }
      }
      for (i = 0; i < this.users.length; i++) {
        this.userTimeSlots[i][randomDay].push({start: this.participateDates[randomDay][randomTimeslot].start, end: this.participateDates[randomDay][randomTimeslot].end})
        randomDay = Math.floor(Math.random() * this.participateDates.length)
        randomTimeslot = Math.floor(Math.random() * this.participateDates[randomDay].length)
      }
    },
    /**
       * helping function, that triggers the viewUserTimeSlot function in the child component
       * @param index
       */
    viewTimeSlot: function (index) {
      try {
        this.$refs.dateTable.viewUserTimeSlots(index)
      } catch (e) {
        console.log(e)
      }
    },
    /**
       * this function show the popup
       */
    show () {
      this.$modal.show('hello-world')
    },
    /**
       * this function hide the popup, either by clicking the document or the close button in the pop up
       */
    hide () {
      this.$modal.hide('hello-world')
    },
    /**
       * this function will fill the user color list. So every user has a own color which can be viewed in the table.
       * To have a clear seperation of the backgroundcolor of the table, the function use the luminance equalation
       */
    fillColor: function () {
      this.userColors = getColorArray()
    }
  },
  beforeMount () {
    this.fillColor()
    this.fillData()
    this.fillUsers()
    this.fillUserTimeSlots()
  },
  mounted () {
    this.$refs.dateTable.getTableCells()
    this.$refs.dateTable.fillUserTimeCellsIndex()
    this.$refs.dateTable.showUserDistribution()
  },
  computed: {
  },
  created () {
    serverBus.$on('tableCells', (tableCells) => {
      this.tableCells = tableCells
    })
    serverBus.$on('tableCellsIndex', (tableCellsIndex) => {
      this.tableCellsIndex = tableCellsIndex
    })
  }
}
</script>

<style scoped>
    #umfrageTeilnehmen{
        margin-top: 50px;
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
    #userList{
        position: fixed;
        top: 150px;
        left: 25px;
        overflow: scroll;
        width: 250px;
        height: 730px;
    }
    #buttonPopUp{
        position: fixed;
        top: 100px;
        left: 25px;
        width: 250px;
        height: 35px;
    }
    #modalCloseButton{
        margin-left: 15px;
        margin-top: 175px;
        width: 95%;
        height: 35px;
    }
</style>
