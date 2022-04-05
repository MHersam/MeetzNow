<template>
    <div id="shareLinkInterface">
        <h3 class="headerShare">Sie haben erfolgreich eine Umfrage erstellet. Wollen Sie ein Passwort hinzufügen?</h3>
        <input v-model="password" placeholder="Passwort" type="password" class="form-control" id="form"/>
        <button type="button" class="btn btn-primary" id="buttonSave" @click="savePassword">Hinzufügen</button>
        <h3 class="headerShare">Der Teilbare Link ist: http://localhost:8081/#/umfrageTeilnehmen/{{id}}</h3>
        <!---here we have to put in the right id, once the backend is completed-->
        <h3 class="headerShare">Falls Sie kein Passwort hinzufügen wollen, möchten Sie Ihre Umfrage <router-link to="/umfrageErstellerSicht/2" id="link">einsehen?</router-link></h3>
    </div>
</template>

<script>
export default {
  name: 'ShareLinkInterface',
  data: function () {
    return {
      password: '',
      id: ''
    }
  },
  methods: {
    getUmfrageID: function () {
      // TODO after the backend is available, we have to call it and get the the highest index of a poll and put it in id
      this.id = 0
    },
    savePassword: function () {
      var umfrage = JSON.parse(localStorage.getItem('jsonData'))
      var jsonData = {timeslots: umfrage.timeslots,
        dates: umfrage.dates,
        startTime: umfrage.startTime,
        endTime: umfrage.endTime,
        timeSteps: umfrage.timeSteps,
        theme: umfrage.theme,
        place: umfrage.place,
        logo: umfrage.logo,
        backgroundPicture: umfrage.backgroundPicture,
        colorBorder: umfrage.colorBorder,
        colorsBackground: umfrage.colorsBackground,
        selectedTheme: umfrage.selectedTheme,
        pollStart: umfrage.pollStart,
        pollEnd: umfrage.pollEnd,
        password: this.password}
      var data = JSON.stringify(jsonData)
      // TODO send the json string to the backend, probably convert it back to an json object and then send it
      localStorage.setItem('jsonData', data)
      // TODO put in the right ID
      this.$router.push('/umfrageErstellerSicht/2')
      this.$router.replace('/umfrageErstellerSicht/2')
    }
  },
  beforeMount () {
    this.getUmfrageID()
  }
}
</script>

<style scoped>
#shareLinkInterface{
    margin-top: 50px;
    position: absolute;
}
    #link{
        text-decoration: none;
        text-decoration-color: red;
        color: red;
    }
    #link:hover{
        text-decoration: none;
        text-decoration-color: red;
        color: red;
    }
    .headerShare{
        margin-top: 25px;
    }
    #form{
        margin-top: 25px;
        width: 200px;
    }
    #buttonSave{
        position: fixed;
        top: 134px;
        left: 225px;
    }
</style>
