<!-- Component show all child components for participating in a poll. It shows the header, the timeslots, the color template and the comments -->

<!--suppress ALL -->
<template>
    <v-layout justify-center text-xs-center id="root">
        <v-flex>
            <v-card :dark="darkeningParticipate">
                <v-card-text :dark="darkeningParticipate" v-show="!loadData && !passowordNeeded && !dialogParticipating">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <PollInfromation :id="this.$route.params.id"></PollInfromation>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap align-content-center justify-center v-show="!pollInfo.creator">
                        <v-btn @click="dialogParticipating = true">{{strings.buttonPollParticipate}}</v-btn>
                    </v-layout>
                    <v-layout row wrap v-show="pollInfo.exposing || pollInfo.creator">
                        <v-flex xs9 class="pageSize">
                            <CPollTable v-bind:availableTimeslots="participateTimeSlots" :darkening="darkeningParticipate" :givenTimeSlots="bestTimeSlotsFromTo" :heatmap="true" :colorsHeatmap="colorsBestTimeSlots" :participants="participantsArray"></CPollTable>
                        </v-flex>
                        <v-flex xs3>
                            <v-layout row wrap>
                                <ColorVisualisationPollParticipate :participantTotal="pollInfo.participants"></ColorVisualisationPollParticipate>
                            </v-layout>
                            <v-layout row wrap style="margin-top: 15px">
                                <v-flex>
                                    <v-layout row wrap v-show="participantNames.length > 0">
                                        <v-label>{{strings.participants}}</v-label>
                                    </v-layout>
                                    <v-layout row wrap v-for="(participant, index) in participantNames" :key="index" style="margin-top: 5px">
                                        <v-label>{{(index + 1) + ". " + participant}} <br/></v-label>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap v-for="(timeSlot, index) in bestTimeSlots" :key="index" style="margin-left: 20px" v-show="pollInfo.exposing || pollInfo.creator" class="topBetweenElements">
                        <v-label v-if="index < 3 || ((timeSlot.distribution / pollInfo.participants) >= 0.75)">{{(index+1)}}.{{strings.bestTimeSlotText}} {{timeSlot.start}} - {{timeSlot.end}} {{strings.withTimeSlot}} {{timeSlot.distribution}} {{strings.participantsTimeSlots}}</v-label>
                    </v-layout>
                    <v-layout row wrap class="commentsWidth topBetweenElements">
                        <CommentManager :id="this.$route.params.id"></CommentManager>
                    </v-layout>
                    <v-layout row wrap class="commentsWidth">
                        <FooterPollParticipate :creator="pollParticipate.creator" :idPoll="this.$route.params.id"></FooterPollParticipate>
                    </v-layout>
                </v-card-text>
                <v-card-text v-show="loadData" id="root">
                    <v-layout row wrap>
                        <v-label :dark="darkeningParticipate">{{strings.loading}}</v-label><br>
                        <v-progress-linear :indeterminate="true"></v-progress-linear>
                    </v-layout>
                </v-card-text>
                <v-card-text v-show="!loadData && passowordNeeded" id="root">
                    <v-layout row wrap>
                        <v-flex xs12 sm6 md4 order-sm1 order-md1><v-text-field v-model="password" :label="this.strings.loginPassword" prepend-icon='lock' name='password' :append-icon="showPassword ? 'visibility_off' : 'visibility'" :type="showPassword ? 'text' : 'password'" v-on:click:append='showPassword = !showPassword' validate-on-blur v-on:keyup.enter="passwordCheck"></v-text-field></v-flex>
                        <v-flex xs12 sm6 md4 order-sm2 order-md2><v-btn @click="passwordCheck()">{{this.strings.passwordForgotSend}}</v-btn></v-flex>
                    </v-layout>
                </v-card-text>
                <v-card-text v-show="dialogParticipating">
                    <PollParticipatePopUpButton :id="this.$route.params.id" :name="pollParticipate.username" :loggedIn="loggedIn" v-if="!pollParticipate.creator"></PollParticipatePopUpButton>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'

    import {PollInformationData} from "../../../logic/PollInformationData";
    import {Author} from "../../../logic/Author";
    import {PollParticipateData} from "../../../logic/PollParticipateData";

    import PollInfromation from "../../general/poll/PollInfromation.vue";
    import CommentManager from "../../general/poll/comments/CommentManager.vue";
    import PollParticipatePopUpButton from "../../general/poll/PollParticipatePopUpButton.vue";
    import FooterPollParticipate from "../../general/poll/FooterPollParticipate.vue";
    import ColorVisualisationPollParticipate from "./../../general/poll/ColorVisualisationPollParticipate.vue"
    import {ClassStateField, StateModule, AppStore} from "../../../store/AppStore";
    import {VueStateField} from "../../../store/State";
    import {Watch} from "vue-property-decorator";
    import * as meetz from "../../../../node_modules/meetznow-api-client";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import * as moment from "moment";
    import {heatmapColorsDark, heatmapColorsLight} from "../../../util/ColorUtils";
    import CPollTable from "../../global/timeslot/CPollTable.vue";
    import {FromTo, FromToArray} from "../../../util/TimeSlotUtils";

    @Component({
        components : {
            CPollTable,
            ColorVisualisationPollParticipate,
            FooterPollParticipate,
            PollParticipatePopUpButton,
            CommentManager,
            PollInfromation
        }
    })
    export default class RPollParticipate extends Vue{
        heatmapColors = heatmapColorsDark;

        colorsBestTimeSlots : Array<string> = [];

        participantNames : Array<string> = [];

        @ClassStateField(StateModule.POLLPARTICIPATE)
        participateTimeSlots : FromToArray = AppStore.state.participateTimeSlots;

        @VueStateField(StateModule.USER)
        loggedIn : boolean;

        @VueStateField(StateModule.POLLPARTICIPATE)
        dialogParticipating : boolean;

        @ClassStateField(StateModule.POLLPARTICIPATE)
        userEx : any = AppStore.state.userEx;

        pollParticipate = new PollParticipateData();

        showPassword : boolean = false;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @VueStateField(StateModule.GENERAL)
        showError : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        loadData : boolean;

        @VueStateField(StateModule.POLLINFORMATION)
        password : string;

        @VueStateField(StateModule.POLLPARTICIPATE)
        passowordNeeded : boolean;

        @VueStateField(StateModule.POLLPARTICIPATE)
        blockParticipate : boolean;

        pollInfo = new PollInformationData()

        bestTimeSlots : Array<any> = [];

        @ClassStateField(StateModule.POLLPARTICIPATE)
        bestTimeSlotsFromTo : FromToArray = AppStore.state.heatMapDates;

        @ClassStateField(StateModule.POLLPARTICIPATE)
        participantsArray : Array<any>  = AppStore.state.participantArray;

        created(){
            this.disableElements = false;
        }

        mounted(){
            let self = this;
            setTimeout(function () {
                self.bestTimeSlot();
            }, 500)
        }

        async bestTimeSlot(){
            this.bestTimeSlots = [];
            try {
                let data = await new meetz.FindBestTimeslotsCall({payload : {
                        poll_id: this.$route.params.id
                    }}).get();
                this.participantNames = [];
                new Map(JSON.parse(data.payload.data)).forEach(this.mapMapToTimeSlots);
                this.bestTimeSlots.sort(function (a, b) {
                    return b.distribution - a.distribution;
                }).filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                });
                for(let i = 0; i < this.bestTimeSlots.length - 1; i++){
                    if(this.bestTimeSlots[i].start === this.bestTimeSlots[i + 1].start &&
                        this.bestTimeSlots[i].end === this.bestTimeSlots[i + 1].end){
                        this.bestTimeSlots.splice(i + 1, 1);
                    }
                }
                this.colorsBestTimeSlots = [];
                let tempFromTo : FromToArray = new FromToArray([]);
                let tempTimeSlots = this.bestTimeSlots.slice(0);
                tempTimeSlots.sort(function (a, b) {
                    return a.distribution - b.distribution;
                });
                let tempParticipants : Array<any> = [];
                for (let i = 0; i < this.bestTimeSlots.length; i++){
                    tempFromTo.push(FromTo.fromObject({from: moment(tempTimeSlots[i].begin, "YYYY-M-D H:MM"), to: moment(tempTimeSlots[i].finish, "YYYY-M-D H:MM")}));
                    tempParticipants.push({participants: tempTimeSlots[i].participants, timeslot: tempFromTo.value[i]});
                    if(tempTimeSlots[i].distribution === Math.floor(1*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[0])
                    else if(tempTimeSlots[i].distribution < Math.floor(1*this.pollInfo.participants) && tempTimeSlots[i].distribution >= Math.floor(0.95*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[1])
                    else if(tempTimeSlots[i].distribution < Math.floor(0.95*this.pollInfo.participants) && tempTimeSlots[i].distribution >= Math.floor(0.8*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[2])
                    else if(tempTimeSlots[i].distribution < Math.floor(0.8*this.pollInfo.participants) && tempTimeSlots[i].distribution >= Math.floor(0.65*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[3])
                    else if(tempTimeSlots[i].distribution < Math.floor(0.65*this.pollInfo.participants) && tempTimeSlots[i].distribution >= Math.floor(0.5*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[4])
                    else if(tempTimeSlots[i].distribution < Math.floor(0.5*this.pollInfo.participants) && tempTimeSlots[i].distribution >= Math.floor(0.25*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[5])
                    else if(tempTimeSlots[i].distribution < Math.floor(0.25*this.pollInfo.participants) && tempTimeSlots[i].distribution >= Math.floor(0.01*this.pollInfo.participants)) this.colorsBestTimeSlots.push(this.heatmapColors[6])
                    else if(tempTimeSlots[i].distribution < Math.floor(0.01*this.pollInfo.participants))this.colorsBestTimeSlots.push('')
                }
                let uniqueArray = this.participantNames.filter(function(item, pos, self) {
                    return self.indexOf(item) == pos;
                })
                this.participantNames = uniqueArray.slice(0);
                AppStore.commit('setHeatMap', tempFromTo);
                this.bestTimeSlotsFromTo = AppStore.state.heatMapDates;
                AppStore.commit('setParticipants', tempParticipants);
                this.participantsArray = AppStore.state.participantArray;
                if(this.bestTimeSlots.length !== 0){
                    this.pollInfo.time = this.bestTimeSlots[0].start.split(" ")[1] + " - " + this.bestTimeSlots[0].end.split(" ")[1];
                    this.pollInfo.date = this.bestTimeSlots[0].start.split(" ")[0];
                }
            }catch (e) {
                this.pollInfo.setError(e);
            }
        }

        /**
         * this method maps the map to a array of objects
         */
        mapMapToTimeSlots(value, key, map) {
            if(value.names.length !== 0){
                this.bestTimeSlots.push({start: moment(key.start_date).format("DD.MM.YY HH:mm"), end: moment(key.end_date).format("DD.MM.YY HH:mm"), distribution: value.names.length, begin: new Date(key.start_date), finish: new Date(key.end_date), participants: value.names});
                for(let i = 0; i < value.names.length; i++){
                    this.participantNames.push(value.names[i]);
                }
            }
        }

        /**
         * method to check if the typed in is correct with the poll password
         */
        passwordCheck(){
            this.pollInfo.getPoll(this.$route.params.id)
        }

        @Watch("dialogParticipating")
        __watchDialog(){
            if(!this.dialogParticipating){
                let self = this;
                setTimeout(function () {
                    self.bestTimeSlot();
                }, 1000)
            }
        }

        @Watch("passowordNeeded")
        __watchPasswordActualisation(){
            this.bestTimeSlot();
        }

        /**
         * fill the participate timeslots
         */
        @Watch("participateTimeSlots")
        __changeParticipateDates(){
            this.participateTimeSlots = AppStore.state.participateTimeSlots;
            if(this.darkeningParticipate) this.heatmapColors = heatmapColorsDark
            else this.heatmapColors = heatmapColorsLight;
        }

        @Watch("bestTimeSlotsFromTo")
        __changeBestTimeSlots(){
            this.bestTimeSlotsFromTo = AppStore.state.heatMapDates;
            if(this.darkeningParticipate) this.heatmapColors = heatmapColorsDark
            else this.heatmapColors = heatmapColorsLight;
        }

        @Watch("darkeningParticipate")
        __watch_dark(){
            if(this.darkeningParticipate) this.heatmapColors = heatmapColorsDark
            else this.heatmapColors = heatmapColorsLight;
        }

        beforeDestroy(){
            AppStore.commit('resetGivenTimeSlots');
            AppStore.commit('resetTimeSlotDates');
        }
    }
</script>

<style scoped>
    .commentsWidth{
        width: 100%
    }
    .pageSize{
        height: 100%;
        width: 100%;
    }
    .opacity{
        opacity: 0.98
    }
    #root{
        min-height: 100vh;
        height: 100%;
        width: 100vw;
    }
    .topBetweenElements{
        margin-top: 10px;
    }
</style>
