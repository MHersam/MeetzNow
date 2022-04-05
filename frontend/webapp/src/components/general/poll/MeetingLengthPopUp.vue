<!-- Component opens a popup where you can select a custom meeting length -->

<template>
    <v-layout row justify-center>
        <v-dialog v-model="pollData.dialog" persistent>
            <v-card justify-center :dark="darkeningGeneral">
                <v-card-title class="headline justify-center">
                    <v-layout row wrap justify-center>
                        {{strings.meetingSetTime}}
                    </v-layout>
                </v-card-title>
                <v-card-text justify-center :dark="darkeningGeneral">
                    <v-layout row wrap justify-center>
                        <v-time-picker v-model="pollData.timeslot_min_duration" format="24hr" justify-center :dark="darkeningGeneral"></v-time-picker>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="close()" :dark="darkeningGeneral">{{strings.meetingSetButton}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {AppStore, ClassStateField, StateModule} from "../../../store/AppStore";
    import {pollNewData} from "../../../logic/pollNewData";

    @Component
    export default class MeetingLengthPopUp extends Vue{
        pollData = new pollNewData();

        @ClassStateField(StateModule.GENERAL)
        strings : any;

        /**
         * method close the pop up and set the meeting length time
         */
        public close(){
            this.pollData.dialog = false;
            this.pollData.timeslot_min_duration.toString();
            AppStore.commit('addMeetingTime', this.pollData.timeslot_min_duration.toString());
            this.pollData.meeting_length_Array = AppStore.state.meetingArray;
        }

        @ClassStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;
    }
</script>

<style scoped>
</style>
