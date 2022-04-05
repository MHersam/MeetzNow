<template>
    <div id="header">
        <Slideout menu="#menu" panel="#panel" :toggleSelectors="['.toggle-button']" @on-open="open">
            <nav id="menu">
                <div><img :src="userProfilePicture" id="profilePicture" v-if="userProfilePicture!=''"></div>
                <div class="center">Willkommen {{userName}}!</div>
                <div class="center-fontsize" @click="change1" style="border-bottom: solid gray">
                    <router-link class="links" @click="change1" to="/">Home</router-link>
                </div>
                <div class="center-fontsize" @click="change2" style="border-bottom: solid gray">
                    <router-link class="links" @click="change2" to="/UmfrageErstellen">Neue Umfrage erstellen</router-link>
                </div>
                <div class="center-fontsize" @click="change3" style="border-bottom: solid gray">
                    <router-link class="links" @click="change3" to="/UmfrageListe">Laufende Umfragen</router-link>
                </div>
                <div class="center-fontsize" @click="change3" style="border-bottom: solid gray">
                    <router-link class="links" @click="change3" to="/UmfrageListe">Vergangene Umfragen</router-link>
                </div>
                <div class="center-fontsize" @click="change3" style="border-bottom: solid gray">
                    <router-link class="links" @click="change3" v-if="loggedIn" to="/Account">Mein Account</router-link>
                    <router-link class="links" @click="change3" v-if="!loggedIn" to="/Anmeldung">Mein Account</router-link>
                </div>
                <div class="center-fontsize" @click="change3">
                    <router-link class="links" ref="logout" v-if="loggedIn" @click.native="logout" to="/">Ausloggen</router-link>
                    <router-link class="links" @click="change3" v-if="!loggedIn" to="/Anmeldung">Anmelden</router-link>
                </div>
            </nav>
            <main id="panel">
                <header>
                    <div>
                        <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
                            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                                <ul class="navbar-nav mr-auto">
                                    <button class="toggle-button" id="button" ref="btn">☰</button>
                                    <li class="nav-item active">
                                        <a class="nav-link"><router-link class="links" to="/">Terminplaner</router-link> <span class="sr-only">(current)</span></a>
                                    </li>
                                </ul>
                                <ul class="nav navbar-nav navbar-right">
                                    <li>
                                        <a class="nav-link"><router-link class="links" to="/Anmeldung" v-if="!loggedIn">Gast</router-link> <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="https://example.com" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</a>
                                        <div class="dropdown-menu" aria-labelledby="dropdown01">
                                            <router-link class="links" to="/" ref="logout" v-if="loggedIn" @click.native="logout">Abmelden</router-link>
                                            <router-link class="links" to="/Anmeldung" v-else ref="login">Anmelden</router-link>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div>
                        <router-view />
                    </div>

                </header>
            </main>

        </Slideout>
    </div>
</template>

<script>
import Slideout from 'vue-slideout'
import firebase from 'firebase'

export default {
  name: 'app',
  components: {
    Slideout
  },
  data: function () {
    return {
      arrayFrom: [false, false, false],
      userName: '',
      // this var contains all the information about the user, we get from firebase after social login
      user: {},
      // link to profile picture
      userProfilePicture: '',
      // flag to track the current login status, true if logged in, false if not
      loggedIn: false
    }
  },

  watch: {
    $route (to, from) {
      if (this.arrayFrom[0] || this.arrayFrom[1] || this.arrayFrom[2]) {
        this.$refs.btn.click()
        this.arrayFrom[0] = false
        this.arrayFrom[1] = false
        this.arrayFrom[2] = false
      }
    }
  },
  created () {
    var vm = this
    // listener, triggered, when the user successfully logged in via social login
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // apply user values we get from firebase to local vars
        vm.user = user
        vm.userName = vm.user.displayName
        vm.loggedIn = true
        vm.userProfilePicture = vm.user.photoURL
      }
    })
    // listener, triggered, when user logged in with email+pw
    this.$bus.$on('loggedIn', (message) => { this.userName = message; this.user = {}; this.loggedIn = true })
  },
  methods: {
    change1: function () {
      console.log('change1')
      this.arrayFrom[0] = true
    },
    change2: function () {
      this.arrayFrom[1] = true
    },
    change3: function () {
      this.arrayFrom[2] = true
    },
    logout: function () {
      // reset all user vars
      this.user = {}
      this.userName = ''
      firebase.auth().signOut()
      this.loggedIn = false
      this.userProfilePicture = ''
    }
  }
}
</script>

<style>
    body {
        width: 100%;
        height: 100%;
    }
    #header{
        width: 100%;
        height: 100%;
    }

    .slideout-menu {
        position: fixed;
        bottom: 0;
        width: 256px;
        height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        z-index: 0;
        display: none;
        background-color: transparent;
        color: black;
    }

    .slideout-menu-left {
        left: 0;
    }

    .slideout-menu-right {
        right: 0;
    }

    .slideout-panel {
        background-color: transparent;
        color: black;
        position: relative;
        z-index: 1;
        will-change: auto;
        min-height: 100vh;
    }

    .slideout-open,
    .slideout-open body,
    .slideout-open .slideout-panel {
        overflow: hidden;
    }

    .slideout-open .slideout-menu {
        display: block;
    }
    #button{
        color: white;
        background-color: #3c4451;
        border: none;
    }
    #profilePicture{
        margin-right: auto;
        margin-left: auto;
        width: 60px;
        border-radius: 50%;
        display: block;
        margin-top: 20px;
    }
    .links{
        text-decoration: none;
        text-decoration-color: #999999;
        color: #999999;
    }
    .links:hover{
        text-decoration: none;
        text-decoration-color: #999999;
        color: #999999;
    }
    .center-fontsize{
        text-align: center;
        font-size: 125%;
        line-height: 2.5;
    }
    .center{
        text-align: center;
        line-height: 2.5;
    }
</style>
