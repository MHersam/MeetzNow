<!-- Component show a confirmation pop up that you have successfully sign up-->

<template>
    <v-card :dark="darkeningGeneral">
        <v-card-text :dark="darkeningGeneral">
            <v-layout row wrap xs12 justify-center>
                <v-flex justify-center>
                    <v-layout row wrap justify-center>
                        <h1>{{this.strings.signUpSuccessful}}</h1>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../store/AppStore";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {VueStateField} from "../../store/State";
    @Component
    export default class CContent extends Vue{

        @VueStateField(StateModule.GENERAL)
        strings : any;

        interval : any;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        /**
         * method do the routing to home screen
         */
        goToHome(){
            this.$router.push('/');
            this.$router.replace('/')
        }

        /**
         * method show the screen 3 seconds and then route to the home screen
         */
        mounted(){
            this.interval = setInterval(function () {
                this.goToHome();
            }.bind(this), 3000);
        }

        /**
         * reset the interval to it is not sending you to the home screen
         */
        beforeDestroy(){
            clearInterval(this.interval);
        }

    }
</script>

<style scoped>
    .link:hover{
        text-decoration: underline;
    }
</style>
