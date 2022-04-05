<template>
    <div class="SendPassword">
        <div class="row align-items-center">
            <div class="col-4"></div>
            <div class="col-4 text-center">
                <h1>Meetz Now</h1>
                <br/><br/><br/>
                <div class="col text-center">
                    Wir haben dir eine Mail zum Zurücksetzen deines Passwortes gesendet!
                </div>
                <br/><br/><br/>
                <div class="col text-center">
                    <router-link to="/">Zurück zur Startseite</router-link>
                </div>
                <br/><br/><br/><br/>
                <div class="row align-items-center">
                    <div class="col-2"></div>
                    <div class="col-8 text-center" style="border-bottom: solid gray">
                        <span id="registerLink">kostenlos <router-link to="./Registrieren">Registrieren</router-link></span>
                    </div>
                    <div class="col-2"></div>
                </div>

            </div>
            <div class="col-4"></div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from './Footer'
export default {
  name: 'SendPassword',
  components: {Footer}
}
</script>

<style scoped>
    .SendPassword{
        margin-top: 100px;
        margin-left: 50px;
    }
</style>
