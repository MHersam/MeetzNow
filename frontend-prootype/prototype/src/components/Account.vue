<template>
    <div class = "account">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3" align="center" >Profilbild</div>
            <div class="col-3">Hintergrundbild</div>
            <div class="col-3"></div>
        </div>
        <div class="row">
            <div class="col-3"><h2>Mein Account</h2></div>
            <div class="col-3"><img :src="userProfilePicture" id="profilePicture" v-if="userProfilePicture!=''"></div>
            <!-- TODO get background picture from backend -->
            <div class="col-1" align="left"><img id="backgroundpicture"></div>
            <div class="col-3"></div>
        </div>
        <br/>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3" align="center">
                <!-- TODO button does not work yet -->
                <button type="button" class="btn btn-primary">Profilbild ändern</button>
            </div>
            <div class="col-1" align="left">
                <!-- TODO button does not work yet -->
                <button type="button" class="btn btn-primary">Hintergrundbild ändern</button>
            </div>
            <div class="col-3"></div>
        </div>
        <br/>
        <div class="row">
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">Vorname Nachname</div>
            <div class="col-3" align="center" style="border-bottom: solid gray">{{userName}}</div>
            <div class="col-1"></div>
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">Benutzername</div>
            <!-- TODO get user name from backend -->
            <div class="col-3" align="center" style="border-bottom: solid gray"></div>
        </div>

        <div class="row">
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">E-Mail-Adresse</div>
            <div class="col-3" align="center" style="border-bottom: solid gray">{{userMail}}</div>
            <div class="col-1"></div>
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">Geschlecht</div>
            <div class="col-3" align="center" style="border-bottom: solid gray">
                <input id="female" type="radio" name="check" onclick="onlyOne(this)">weiblich
                <input id="male" type="radio" name="check" onclick="onlyOne(this)">männlich
            </div>
        </div>

        <div class="row">
            <!-- TODO get data from backend -->
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">Unternehmen</div>
            <div class="col-3" align="center" style="border-bottom: solid gray"></div>
            <div class="col-1"></div>
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">(Hoch-)Schule</div>
            <div class="col-3" align="center" style="border-bottom: solid gray"></div>
        </div>

        <div class="row">
            <!-- TODO get data from backend -->
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">Geburtsdatum</div>
            <div class="col-3" align="center" style="border-bottom: solid gray"></div>
            <div class="col-1"></div>
            <div class="col-2" align="center" style="border-bottom: solid gray; color: blue">Land</div>
            <div class="col-3" align="center" style="border-bottom: solid gray"></div>
        </div>
        <br/><br/><br/>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-2">
                <router-link class="links" ref="logout" v-if="loggedIn" @click.native="logout" to="/">Ausloggen</router-link>
            </div>
            <div class="col-2">
                <!-- TODO does not work yet. If clicked all fields should be editable. Also fields "altes Passwort" and "neues Passwort" should get visible -->
                <router-link class="links" to="/Account">Account bearbeiten</router-link>
            </div>
            <div class="col-2">
                <!-- TODO does not work yet either -->
                <router-link class="links" to="/Account">Account löschen</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Account',
  data: function () {
    return {
      userName: '',
      // this var contains all the information about the user, we get from firebase after social login
      user: {},
      // link to profile picture
      userProfilePicture: '',
      // flag to track the current login status, true if logged in, false if not
      loggedIn: false,
      userMail: ''
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
        vm.userMail = vm.user.email
      }
    })
    // listener, triggered, when user logged in with email+pw
    this.$bus.$on('loggedIn', (message) => { this.userName = message; this.user = {}; this.loggedIn = true })
  },
  change: {
    onlyOne: function (checkbox) {
      var checkboxes = document.getElementsByName('check')
      checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
      })
    }
  },
  methods: {
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

<style scoped>
    body{
        width: 100%;
        height: 100%;
    }
    .account{
        margin-top: 100px;
        margin-left: 50px;
    }
    #profilePicture{
        margin-right: auto;
        margin-left: auto;
        width: 100px;
        border-radius: 50%;
        display: block;
        margin-top: 20px;
        border: 2px solid gray;
    }
    #backgroundpicture{
        margin-right: auto;
        margin-left: auto;
        width: 100px;
        border-radius: 50%;
        display: block;
        margin-top: 20px;
        border: 2px solid gray;
    }
</style>
