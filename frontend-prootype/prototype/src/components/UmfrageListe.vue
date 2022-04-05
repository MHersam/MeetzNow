<template>
    <div class="umfrageliste">
        <vue-tabs>
            <v-tab title="Umfrage Erstellt">
                <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle">
                    <table class="table table-bordered" id="table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thema</th>
                            <th>Start Datum</th>
                            <th>End Datum</th>
                            <th>Ort</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="umfrage in umfrageErstellt" v-bind:key="umfrage" class="rows" @click="toUmfrageErstellerSicht(umfrage.id)">
                            <td>{{umfrage.id}}</td>
                            <td>{{umfrage.thema}}</td>
                            <td>{{umfrage.dateStart.toDateString()}}</td>
                            <td>{{umfrage.dateEnd.toDateString()}}</td>
                            <td>{{umfrage.place}}</td>
                        </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
            </v-tab>

            <v-tab title="Umfrage Teilgenommen">
                <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle">
                    <table class="table table-bordered" id="table2">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thema</th>
                            <th>Start Datum</th>
                            <th>End Datum</th>
                            <th>Ort</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="umfrage in umfrageTeilgenommen" v-bind:key="umfrage" class="rows" @click="toUmfrageTeilnehmen(umfrage.id)">
                            <td class="tableLinkText"><router-link class="tableLinkText" v-bind:to="'/umfrageTeilnehmen/'+umfrage.id">{{umfrage.id}}</router-link></td>
                            <td>{{umfrage.thema}}</td>
                            <td>{{umfrage.dateStart.toLocaleDateString()}}</td>
                            <td>{{umfrage.dateEnd.toLocaleDateString()}}</td>
                            <td>{{umfrage.place}}</td>
                        </tr>
                        </tbody>
                    </table>
                </VuePerfectScrollbar>
            </v-tab>
        </vue-tabs>
        </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {VueTabs, VTab} from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
export default {
  name: 'UmfrageListe',
  components: {
    VuePerfectScrollbar,
    VueTabs,
    VTab
  },
  data: function () {
    return {
      umfrageTeilgenommen: [],
      umfrageErstellt: [],
      settings: {
        maxScrollbarLength: 1000
      }
    }
  },
  methods: {
    fillUmfrageTeilgenommen: function () {
      // TODO we need to wait until we get the data from the Backend
      // we will fill the data in umfrageTeilgenommen
      // for now we put in some example data
      this.umfrageTeilgenommen.push({id: 0, thema: 'example one', dateStart: new Date('June 2, 2018'), dateEnd: new Date('June 7, 2018'), place: 'Stuttgart'})
      this.umfrageTeilgenommen.push({id: 1, thema: 'example two', dateStart: new Date('June 3, 2018'), dateEnd: new Date('June 8, 2018'), place: 'Stuttgart'})
    },
    fillUmfrageErstellt: function () {
      this.umfrageErstellt.push({id: 2, thema: 'example three', dateStart: new Date('June 10, 2018'), dateEnd: new Date('June 11, 2018'), place: 'Stuttgart'})
      this.umfrageErstellt.push({id: 3, thema: 'example four', dateStart: new Date('June 1, 2018'), dateEnd: new Date('June 2, 2018'), place: 'Stuttgart'})
    },
    toUmfrageTeilnehmen: function (id) {
      this.$router.push('/umfrageTeilnehmen/' + id)
      this.$router.replace('/umfrageTeilnehmen/' + id)
    },
    toUmfrageErstellerSicht: function (id) {
      this.$router.push('/umfrageErstellerSicht/' + id)
      this.$router.replace('/umfrageErstellerSicht/' + id)
    }
  },
  beforeMount () {
    this.fillUmfrageErstellt()
    this.fillUmfrageTeilgenommen()
  }
}
</script>

<style scoped>
    .umfrageliste{
        margin-top: 50px;
    }
    #table{
        width: 90%;
        margin-top: 25px;
        margin-left: 25px;
        margin-right: 25px;
    }
    #table2{
        width: 90%;
        margin-top: 25px;
        margin-left: 25px;
        margin-right: 25px;
    }
    .rows{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .rows:hover{
        background-color: #777777;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .tableLinkText{
        text-decoration: none;
        color: black;
        text-decoration-color: black;
    }
    .tableLinkText:hover{
        text-decoration: none;
        color: black;
        text-decoration-color: black;
    }
    .scroll-area {
        position: relative;
        width: 1720px;
        height: 600px;
    }
</style>
