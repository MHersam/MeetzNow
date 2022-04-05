<!-- Component show a simple home screen where you can navigate to different sites of the app -->

<template>
    <v-layout justify-center text-xs-center id="root">
        <v-flex>
            <v-card :dark="darkeningGeneral">
                <v-card-text :dark="darkeningGeneral">
                    <v-container grid-list-md>
                        <v-layout wrap row style="margin-top: 50px; margin-bottom:50px;">
                            <v-flex xs12 sm6 md4 order-sm1 order-md1>
                                <v-layout row wrap align-center justify-center>
                                    <v-icon align-center justify-center large @click="goToNewPoll()">event</v-icon>
                                    <v-icon align-center justify-center small @click="goToNewPoll()">add</v-icon>
                                </v-layout>
                                <v-layout row wrap align-center justify-center>
                                    <v-btn flat @click="goToNewPoll()">{{strings.homePollNew}}</v-btn>
                                </v-layout>
                            </v-flex>

                            <v-flex xs12 sm6 md4 order-sm2 order-md2>
                                <v-layout row wrap align-center justify-center>
                                    <v-icon large align-center justify-center @click="goToList()">list</v-icon>
                                </v-layout>
                                <v-layout row wrap align-center justify-center>
                                    <v-btn flat @click="goToList()">{{strings.homePollOverview}}</v-btn>
                                </v-layout>
                            </v-flex>

                            <v-flex xs12 sm6 md4 order-sm3 order-md3>
                                <v-layout row wrap align-center justify-center>
                                    <v-icon large align-center justify-center @click="goToAccount()">person</v-icon>
                                </v-layout>
                                <v-layout row wrap align-center justify-center>
                                    <v-btn flat @click="goToAccount()">{{strings.homePollAccount}}</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>




<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {ClassStateField, StateModule} from "../../store/AppStore";
    import {StringsUtil} from "../../util/StringsUtil";
    import {VueStateField} from "../../store/State";
    
    @Component
    export default class RHome extends Vue {
        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        /**
         * method route you to the creating poll screen
         */
        goToNewPoll(){
            this.$router.push('/poll/new');
            this.$router.replace('/poll/new/')
        }

        /**
         * method route you to the poll list screen
         */
        goToList(){
            this.$router.push('/poll/liste/');
            this.$router.replace('/poll/liste/')
        }

        /**
         * method route you to the account screen
         */
        goToAccount(){
            this.$router.push('/Account/');
            this.$router.replace('/Account/')
        }
    }
</script>

<style scoped>
    #root{
        min-height: 100vh;
        height: 100%;
    }
</style>
