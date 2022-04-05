<template>
    <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle">
        <table class="table table-bordered" ref="tableSort">
            <thead id="tableHead">
            <tr>
                <th @click="sortTable(0)">ID</th>
                <th @click="sortTable(1)">Thema</th>
                <th @click="sortTable(2)">Start Datum</th>
                <th @click="sortTable(3)">End Datum</th>
                <th @click="sortTable(4)">Ort</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="poll in pollData" v-bind:key="poll" class="rows" @click="toPoll(poll.id, created)">
                <td>{{poll.id}}</td>
                <td>{{poll.thema}}</td>
                <td>{{poll.dateStart.toDateString()}}</td>
                <td>{{poll.dateEnd.toDateString()}}</td>
                <td>{{poll.place}}</td>
            </tr>
            </tbody>
        </table>
    </VuePerfectScrollbar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {sortTheTable} from '../functions/PollListFunctions'

export default {
  name: 'PollListTable',
  components: {
    VuePerfectScrollbar
  },
  props: {
    pollData: [],
    created: false
  },
  data: function () {
    return {
      settings: {
        maxScrollbarLength: 1000
      }
    }
  },
  methods: {
    toPoll: function (id, created) {
      if (created) {
        this.$router.push('/umfrageErstellerSicht/' + id)
        this.$router.replace('/umfrageErstellerSicht/' + id)
      } else {
        this.$router.push('/umfrageTeilnehmen/' + id)
        this.$router.replace('/umfrageTeilnehmen/' + id)
      }
    },
    sortTable: function (n) {
      sortTheTable(n, this.$refs.tableSort)
    }
  }
}
</script>

<style scoped>
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
    #tableHead{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
