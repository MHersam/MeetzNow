<template>
    <div class="signUp">
        <div class="row align-items-center">
            <div class="col-2"></div>
            <div class="col-8 text-center">
                <h1>Meetz Now</h1>
                <label class="text-center">Jetzt kostenlos registieren</label>
                <div class="row align-items-center">
                    <div class="col-6 text-left">
                        Vorname, Nachname
                        <input width="100%" class="form-control" v-model="inputVal" />
                    </div>
                    <div class="col-6 text-left">
                        Benutzername
                        <input width="100%" class="form-control" v-model="inputVal" />
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-6 text-left">
                        E-Mail-Adresse
                        <input width="100%" class="form-control" v-model="inputVal" />
                    </div>
                    <div class="col-6 text-left">
                        Passwort
                        <input width="100%" class="form-control" v-model="inputVal" />
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-6 text-left">
                        Geschlecht wählen
                        <br/>
                        <input id="female" type="radio" name="check" onclick="onlyOne(this)">weiblich
                        <input id="male" type="radio" name="check" onclick="onlyOne(this)">männlich
                    </div>
                    <div class="col-6 text-left">
                        Passwort bestätigen
                        <input width="100%" class="form-control" v-model="inputVal" />
                    </div>
                </div>
                <div class="row align-items-center">
                    <div class="col-2"></div>
                    <div class="col-8 text-center">
                        <button v-on:click="signUp">Registrieren</button>
                    </div>
                    <div class="col-2"></div>
                </div>
                <div class="row align-items-center">
                    <div class="col-2"></div>
                    <div class="col-8 text-center" style="border-bottom: solid gray">
                        <span>Du hast bereits ein Benutzerkonto? <router-link to="./Anmeldung">Jetzt einloggen</router-link></span>
                    </div>
                    <div class="col-2"></div>
                </div>
            </div>
            <div class="col-2"></div>
        </div>
        <Footer />
    </div>
</template>

<script>
import firebase from 'firebase'
import Footer from './Footer'
export default {
  name: 'signUp',
  components: {Footer},
  data: function () {
    return {
      email: '',
      password: ''

    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('Home')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>
    .signUp {
        margin-top: 100px;
        margin-left: 50px;
    }
    input {
        margin: 10px 0;
        padding: 15px;
    }
    button {
        margin-top: 10px;
        width: 30%;
        cursor: pointer;
    }
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
    }
</style>
