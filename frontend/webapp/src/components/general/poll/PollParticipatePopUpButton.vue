<!-- Component show the participating screen -->

<template>
    <v-layout row wrap>
        <v-flex>
            <v-layout row wrap v-show="errorVoteStart" align-center align-content-center justify-center>
                <p style="color: red">{{strings.popUpStartError}}</p>
            </v-layout>
            <v-layout row wrap v-show="errorVoteEnd" align-center align-content-center justify-center>
                <p style="color: red">{{strings.popUpEndError}}</p>
            </v-layout>
            <v-layout row wrap class="layoutPopUp">
                <v-flex xs12 sm12 md12 order-sm1 order-md1>
                    <p class="text-md-left text-sm-left">{{strings.popUpLabel}}</p>
                </v-flex>
                <v-flex xs12 sm12 md5 xl6 order-sm1 order-md1>
                    <v-tooltip bottom>
                        <MapsPlaces slot="activator" class="elementWidth lining" v-model="home"></MapsPlaces>
                        <span>{{strings.popTipAddress}}</span>
                    </v-tooltip>
                </v-flex>
                <v-flex xs12 sm12 md5 xl5 order-sm1 order-md1>
                    <v-text-field v-model="place"
                                  :label="strings.popUpLabelDestination"
                                  disabled
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm4 md2 xl1 order-sm2>
                    <v-btn :dark="darkeningParticipate" v-on:click="calculateTravelingTime()" :disabled="disableElements" style="float: left;">{{strings.popUpCalculate}}</v-btn>
                </v-flex>
                <v-flex xs12 sm8 md10 order-sm2 v-if="travelTime !== ''">
                    <v-label v-if="travelTime"><p class="text-md-left text-sm-left text-xs-left">{{strings.popUpArrivingTime}} {{travelTime}}</p></v-label>
                </v-flex>
            </v-layout>
            <v-layout v-show="!loggedIn" style="margin-left: 25px" row wrap :dark="darkeningParticipate" align-start justify-start >
                <v-flex xs12 sm6 md3>
                    <v-form>
                        <v-text-field
                                v-model="name"
                                :label=strings.popLabelName
                                required
                                :dark="darkeningParticipate"
                                :rules="pollButton.rulesName"
                        ></v-text-field>
                    </v-form>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout justify-center style="padding-top: 10px">
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-label> {{strings.popUpCalendarText}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-btn onclick="document.getElementById('getFile').click()">{{strings.uploadFile}}
                        <input type='file' id='getFile' style="display:none" accept='.txt, .ics' v-on:change="addDates.onFilePickedParticipant($event, timeslot_min_duration)">
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap style="margin-top: -175px">
                <v-flex xs6>
                    <v-layout row wrap>
                        <p class="popUpText" :dark="darkeningParticipate">{{strings.popUpText}}</p>
                    </v-layout>
                    <v-layout row wrap>
                        <v-label>{{strings.popUpTimeSlotMinDuration + timeslot_min_duration + 'h'}}</v-label>
                    </v-layout>
                </v-flex>
                <v-flex xs6 style="padding-top: 190px">
                    <v-btn @click="resetInput = !resetInput">
                        {{strings.buttonInputReset}}
                    </v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap :dark="darkeningParticipate">
                <v-flex>
                    <c-polltable v-bind:availableTimeslots="participateTimeSlots" :resetInput="resetInput" :darkening="darkeningParticipate" :givenTimeSlots="appStore.state.givenTimeSlots" :updateEvent="dialogParticipating"></c-polltable>
                </v-flex>
            </v-layout>
            <v-layout row wrap align-center align-content-center justify-center class="layoutPopUp">
                <v-btn :dark="darkeningParticipate" @click="resetVariables()" :disabled="disableElements">{{strings.buttonAbort}}</v-btn>
                <v-btn :dark="darkeningParticipate" @click="participate()" :disabled="disableElements || errorVoteStart || errorVoteEnd" v-if="!blockParticipate">{{strings.buttonSend}}</v-btn>
                <v-btn :dark="darkeningParticipate" @click="participate()" :disabled="disableElements || errorVoteStart || errorVoteEnd" v-if="blockParticipate">{{strings.buttonEditing}}</v-btn>
            </v-layout>
            <v-layout align-center align-content-center justify-center>
                <label class="errorMessage" v-if='errorStepOne'>
                    {{strings.creationErrorMessage}}
                </label>
            </v-layout>
            <v-layout align-center align-content-center justify-center>
                <label class="errorMessage" v-if='errorStepTwo'>
                    {{strings.creationErrorMessageTimeSlots}}
                </label>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";
    import {AppStore, ClassStateField, StateModule} from "../../../store/AppStore";
    import * as meetz from "../../../../node_modules/meetznow-api-client";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {PollParticipateButtonData} from "../../../logic/PollParticipateButtonData";
    import {VueStateField} from "../../../store/State";
    import {Author} from "../../../logic/Author";
    import {pollNewData} from "../../../logic/pollNewData";
    import {FromTo, FromToArray} from "../../../util/TimeSlotUtils";
    import {Comment} from "../../../logic/Comment";
    import {AddUserCalendarDates} from "../../../logic/AddUserCalendarDates";
    import MapsPlaces from "./MapsPlaces.vue";

    @Component({
        components: {
            MapsPlaces,
        }
    })
    export default class CContent extends Vue{
        @Prop() loggedIn : boolean;
        @Prop() id : string;

        resetInput : boolean = false;

        appStore : any = AppStore;

        @VueStateField(StateModule.POLLPARTICIPATE)
        dialogParticipating : boolean;

        @VueStateField(StateModule.POLLPARTICIPATE)
        writeComment : boolean;

        @ClassStateField(StateModule.POLLPARTICIPATE)
        participateTimeSlots : FromToArray = AppStore.state.participateTimeSlots;

        @ClassStateField(StateModule.POLLPARTICIPATE)
        givenTimeSlots : FromToArray = AppStore.state.givenTimeSlots;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @VueStateField(StateModule.GENERAL)
        dataProtection : boolean;

        @VueStateField(StateModule.POLLPARTICIPATE)
        username : string;

        @VueStateField(StateModule.POLLPARTICIPATE)
        travelTime : string;

        @VueStateField(StateModule.POLLINFORMATION)
        place : string;

        @VueStateField(StateModule.POLLINFORMATION)
        password : string;

        @VueStateField(StateModule.USER, "id")
        userID : string;

        name : string = '';

        home : string = '';

        addDates = new AddUserCalendarDates();

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        errorStepOne : boolean = false;
        errorStepTwo : boolean = false;

        pollButton = new PollParticipateButtonData();

        @ClassStateField(StateModule.POLLPARTICIPATE)
        userEx : any = AppStore.state.userEx;

        @VueStateField(StateModule.POLLINFORMATION)
        participants : number;

        @VueStateField(StateModule.POLLPARTICIPATE)
        blockParticipate : boolean;

        @VueStateField(StateModule.POLLCREATION)
        timeslot_min_duration : string;

        errorVoteStart : boolean = false;
        errorVoteEnd : boolean = false;

        @Prop() dates : Array<any>;

        /**
         * here the data to participate is sent to the backend
         */
        async participate(){
            if(!(this.name === '') || this.loggedIn && (!(AppStore.state.timeSlotsCreated.length === 0))){
                this.errorStepOne = false;
                this.errorStepTwo = false;
                this.dialogParticipating = false;
                if(this.userID === '' || this.userID === null) this.userID = undefined;
                if(this.loggedIn){
                    let token = localStorage.getItem('securityToken');
                    try {
                        // @ts-ignore
                        let data = await new meetz.UserInfoCall({token: token, payload : {
                                user_id: this.userID
                            }}).get();
                        this.username = data.payload.user.username;
                    }catch (e) {
                        this.showError(e)
                    }
                }else{
                    this.username = this.name;
                }
                try {
                    if(!this.blockParticipate){
                        this.participateFirstTime();
                    }else{
                        this.participateEditing();
                    }
                }catch (e) {
                    this.showError(e)
                }
                this.dataProtection = false;
            }else {
                this.errorStepOne = true;
                this.errorStepTwo = true;
            }
        }

        async participateEditing(){
            let updatedParticipant = await new meetz.UpdateParticipantCall({payload : {
                    participant_id: AppStore.state.userEx.id,
                    participant: {
                        name: this.username,
                        timeslots: AppStore.state.timeSlotsCreated,
                    }
                }}).get();
            this.getPoll(AppStore.state.userEx.id)
        }

        async participateFirstTime(){
            let participantID =  await new meetz.ParticipateInPollCall({payload : {
                    poll_id: this.id,
                    user_id: this.userID,
                    name: this.username,
                    timeslots: AppStore.state.timeSlotsCreated
                }}).get();
            if(!this.loggedIn) localStorage.setItem(''+ this.id, participantID.payload.participant_id);
            if(this.userID === undefined) this.userID = null;
            this.getPoll(participantID.payload.participant_id)
        }

        async getPoll(participantID){
            try{
                let poll = await new meetz.GetPollCall({payload : {
                        poll_id : this.id
                    }}).get();
                this.fillDataAfterParticipating(poll, participantID);
            }catch (e) {
                try {
                    // @ts-ignore
                    let poll = await new meetz.SendPollPasswordCall({payload : {
                            poll_id : this.id,
                            password : this.password
                        }}).get();
                    this.fillDataAfterParticipating(poll, participantID);
                }catch (e) {
                    this.showError(e)
                }
            }
        }

        /**
         * method set the error message which will be shown in the snackbar in the App.vue
         */
        showError(e){
            this.error = e.message;
            let self = this;
            setTimeout(function(){
                self.error = '';
                self.disableElements = false;
            }, this.timeout);
        }

        /**
         * after we receive data from the backend after we have participated, we need to update the shown data, like comments, participant number and set the author for writing comments
         */
        fillDataAfterParticipating(poll, participantID){
            this.blockParticipate = true;
            AppStore.commit('setUserEx', new Author(participantID, this.username));
            let comments = [];
            this.participants = 0;
            for (let i = 0; i < poll.payload.poll.participants.length; i++){
                this.participants ++;
                for (let j = 0; j < poll.payload.poll.participants[i].comments.length; j++){
                    let author = new Author(poll.payload.poll.participants[i]._id, poll.payload.poll.participants[i].name);
                    comments.push(new Comment(poll.payload.poll.participants[i].comments[j]._id, poll.payload.poll.participants[i].comments[j].text, false, poll.payload.poll.participants[i].comments[j].last_changed, author))
                }
            }
            this.participants --;
            AppStore.commit('addAllComment', comments);
            this.writeComment = true;
            this.error = this.strings.popUpConfirmation;
            let self = this;
            setTimeout(function(){
                self.error = '';
                self.disableElements = false;
            }, this.timeout);
            this.writeComment = true;
        }

        /**
         * method close the pop up and reset the error message
         */
        resetVariables(){
            this.dialogParticipating = false;
            this.errorStepOne = false;
        }

        /**
         * this method calculate the travel time to the location where the meeting should take place
         */
        calculateTravelingTime(){
            this.pollButton.getDistance(this.place, this.home)
        }

        /**
         * fill the participate timeslots
         */
        @Watch("participateTimeSlots")
        __changeParticipateDates(){
            this.participateTimeSlots = AppStore.state.participateTimeSlots;
        }

        @Watch("givenTimeSlots")
        __changeGivenTimeSlots(){
            this.givenTimeSlots = AppStore.state.givenTimeSlots;
        }

        /**
         * show data protection advice
         */
        @Watch("dialogParticipating")
        __showDataMessage(){
            if(this.dialogParticipating === true) {
                this.dataProtection = true;
                AppStore.commit('setTimeSlots', [])
            }
        }

        /**
         * you should only participate in the poll at the voting start day at 0:00:00 to the voting end day at 23:59:00
         * @private
         */
        @Watch("pollButton.start_date_poll")
        __setRightTimeFrame(){
            let newStartDate = new Date(this.pollButton.start_date_poll);
            newStartDate = new Date(newStartDate.setHours(0,0,0));
            let newEndDate = new Date(this.pollButton.end_date_poll);
            newEndDate = new Date(newEndDate.setHours(23,59,0));

            if(newStartDate.getTime() > new Date().getTime()) this.errorVoteStart = true;
            if(newEndDate.getTime() < new Date().getTime()) this.errorVoteEnd = true;
        }

        beforeDestroy(){
            AppStore.commit('resetGivenTimeSlots');
        }

    }
</script>
<style scoped>
    .layoutPopUp{
        padding-top: 25px;
        padding-left: 25px;
    }
    .popUpText{
        color: blue;
        margin-top: 200px;
        padding-left: 25px;
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
    .elementWidth{
        width: 95%;
    }
    .lining{
        padding-top: 2px
    }
</style>
