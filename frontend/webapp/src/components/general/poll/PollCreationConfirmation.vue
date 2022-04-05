<!-- Component show the selected data on the third step of creating a poll -->

<template>
    <v-layout row wrap>
        <v-flex>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmTimeSlotBegin}}{{pollData.select_begin}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmTimeSlotEnd}}{{pollData.select_end}}</v-label>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="spaceTop">
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmTimeSteps}}{{pollData.cal_timesteps}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmMeetingLength}}{{pollData.timeslot_min_duration}}</v-label>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="spaceTop">
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmTitle}}{{pollData.title}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmPlace}}{{pollData.location}}</v-label>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="spaceTop">
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmStartDate}}{{pollData.start_date_poll_date}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmEndDate}}{{pollData.end_date_poll_date}}</v-label>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="spaceTop">
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-label :dark="darkeningGeneral">{{strings.creationConfirmTheme}}{{pollData.theme}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-label :dark="darkeningGeneral" v-for="(participant, index) in pollData.email_list" :key="index">{{strings.creationConfirmParticipant}}{{index + ': '}}{{participant}} <br /></v-label>
                </v-flex>
            </v-layout>
            <v-layout row wrap class="spaceTop">
                <v-flex xs12 sm6 md3 order-md1 order-sm1 v-if="!loggedIn">
                    <v-form>
                        <v-text-field class="elementWidth" v-model="pollData.userNameCreation" :label="strings.signUpUsername" :rules="pollData.rulesUserName"></v-text-field>
                    </v-form>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-text-field class="elementWidth" autocomplete="new-password" :placeholder="strings.creationConfirmPasswordPlacehoder" v-model="pollData.password" :dark="darkeningGeneral" prepend-icon="lock" :label="strings.creationConfirmPassword" :append-icon="showPassword ? 'visibility_off' : 'visibility'" :type="showPassword ? 'text' : 'password'" v-on:click:append="showPassword = !showPassword" validate-on-blur></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-checkbox
                            v-model="pollData.exposing"
                            :label="this.strings.creationConfirmCheckbox"
                    ></v-checkbox>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../../store/AppStore";
    import {pollNewData} from "../../../logic/pollNewData";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {VueStateField} from "../../../store/State";
    
    @Component
    export default class PollCreationConfirmation extends Vue{
        pollData = new pollNewData();

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.USER, "id")
        userID : string;

        showPassword : boolean = false;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.USER)
        loggedIn : boolean;
    }
</script>

<style scoped>
    .spaceTop{
        margin-top: 20px;
    }
    .elementWidth{
        width: 98%;
    }
</style>
