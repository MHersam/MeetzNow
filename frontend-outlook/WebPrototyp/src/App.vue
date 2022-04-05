<template>
  <div id="app">
    <nav class="panel">
      <b-tabs v-model="activeTab">
        <b-tab-item label="Übersicht">
          <button v-on:click="callRest">CallAuthrorize</button> <br/>
          <a :href="loginURL" v-if="loginURL">Hier klicken zum freigeben von: <br/> {{loginURL}}</a>
        </b-tab-item>
        <b-tab-item label="Teilnehmen">

        </b-tab-item>
        <b-tab-item label="Umfrage erstellen">

        </b-tab-item>
      </b-tabs>
    </nav>
  </div>
</template>

<script>
var authHelper = require('./helpers/auth')

export default {
  name: 'App',
  data () {
    return {
      activeTab: 0,
      token: 'Hello',
      loginURL: ''
    }
  },
  methods:
      {
        callRest () {
          this.token = 'Function Call'
          this.loginURL = authHelper.getAuthUrl()
        }
      }
}
</script>

<style>
  #content-header {
    background: #2a8dd4;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    overflow: hidden;
  }

  #content-main {
    background: #fff;
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }

  .panel {
    padding: 15px;
  }
</style>
