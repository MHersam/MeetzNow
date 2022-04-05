<template>
    <div class="anmeldung">
        <div class="row align-items-center">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h1>Meetz Now</h1>
                <label>Join us to plan the perfect meeting.</label>
                <div class="row text-center">
                    <div class="col-5">Manuell anmelden</div>
                    <div class="col-1"></div>
                    <div class="col-5">Mit Social Accounts anmelden</div>
                </div>
                <div class="row text-center">
                    <div class="col-5">
                        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                            <input type="text" v-model="email" placeholder="Email" ref="emailField" v-on:keyup.enter="login">
                        </div>
                        <div v-if="showFormAlert">
                            <div class="error" v-if="!$v.email.required">Feld darf nicht leer sein</div>
                            <div class="error" v-if="!$v.email.email">Kein gültiges Email-Format</div>
                        </div>
                        <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                            <input type="password" v-model="password" placeholder="Passwort" ref="passwordField" v-on:keyup.enter="login">
                        </div>
                        <div v-if="showFormAlert">
                            <div class="error" v-if="!$v.password.required">Feld darf nicht leer sein</div>
                            <div class="error" v-if="!$v.password.minLength">Passwort muss mindestens 6 Zeichen lang sein.</div>
                        </div>
                        <button v-on:click="login">Anmelden</button>
                        <span id="forgotPWLink">Benötigen Sie Hilfe? <router-link to="./ForgotPassword">Passwort vergessen</router-link>.</span>
                        <span id="registerLink">Mit E-Mail-Adresse <router-link to="./Registrieren">Registrieren</router-link>.</span>
                    </div>
                    <div class="col-1">
                        <img src="../assets/LoginPageTrenner.png" align="center" class="separator">
                    </div>
                    <div class="col-5">
                        <div id="firebaseui-auth-container" class="auth-container"></div>
                    </div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
        <Footer />
    </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { required, email, minLength } from 'vuelidate/lib/validators'
import LoginService from '@/services/LoginService'
import Footer from './Footer'
var ui
export default {
  name: 'auth',
  components: {Footer},
  data () {
    return {
      userName: '',
      user: {},
      email: '',
      password: '',
      showFormAlert: false
    }
  },
  mounted () {
    // initialization for the firebaseui container
    var uiConfig = {
      // signInSuccessUrl: '/#/AuthSuccess',
      signInSuccessUrl: '/',
      signInOptions: [
        // the different social logins we're supporting, more can be added or removed here
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
      ]
    }
    // for single page application ui needs to be reset if it already exists, otherwise it won't render the firebaseui
    // container a second time eg. after logout
    if (ui) {
      ui.reset()
    } else {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
  methods: {
    login: async function () {
      if (this.showFormAlert) { this.showFormAlert = false }
      this.userName = this.$refs.emailField.value
      // validates the input against the defined rules in 'validations:'
      this.$v.$touch()
      // invalid will be true after touch was called and an input field has bad input, and false if input is fine
      if (!this.$v.$invalid) {
        // TODO: actual authentication with database, check if the entered information matches an existing account

        // experimental
        try {
          // TODO: hash and salt password before transmitting
          const response = await LoginService.validateCredentials(this.email, this.password)
          console.log('first name: ' + response.data[0].firstName)
          console.log('last name: ' + response.data[0].lastName)
        } catch (error) {
          console.log('express server unreachable!')
        }

        // emit event to get the entered email into the header to display it there
        this.$bus.$emit('loggedIn', this.$refs.emailField.value)
        // this.$router.push('/AuthSuccess')
        this.$router.push('/')
      } else {
        this.showFormAlert = true
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>

<style scoped>
    .anmeldung{
        margin-top: 100px;
        margin-left: 50px;
    }
    .auth-container {
        min-width: 100%;
        margin-left: 0px;
    }
    #forgotPWLink{
        margin-top: 20px;
    }
    #registerLink{

    }
    .error {
        margin-top: 0px;
        text-align: left;
        color: red;
    }
    .form-group{
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .separator {
        width: 2px;
        height: 70%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    input {
        margin-top: 20px;
        width: 90%;
        padding: 15px;
        min-width: 100%;
    }
    button {
        margin-top: 20px;
        width: 50%;
        padding: 15px;
        min-width: 100%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 4px;
        font-size: 11px;
    }
</style>
