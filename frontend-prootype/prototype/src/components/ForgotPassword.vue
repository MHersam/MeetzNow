<template>
    <div class="ForgotPassword">
        <div class="row align-items-center">
            <div class="col-4"></div>
            <div class="col-4 text-center">
                <h1>Meetz Now</h1>
                <div class="col text-center">Passwort vergessen?</div>
                <br/>
                <div class="col text-center">Geb deine E-Mail-Adresse an, um dein Passwort zurückzusetzen!</div>
                <br/>
                <div class="row align-items-center" style="border-bottom: solid gray; padding-bottom: 5px">
                    <div class="col-3 text-center">E-Mail</div>
                    <div class="col-9 text-center">
                        <input class="form-control" v-model="inputVal" />
                    </div>
                </div>

                <br/><br/>
                <div class="col text-center">
                    <router-link id="absenden" to="/SendPassword">Absenden</router-link>
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
  name: 'ForgotPassword',
  components: {Footer}
}
</script>

<style scoped>
    .ForgotPassword{
        margin-top: 100px;
        margin-left: 50px;
    }
</style>
