import {TimeIntervals} from "../../../util/MomentTwoPointO";
import {TimeIntervals} from "../../../util/MomentTwoPointO";
import {TimeIntervals} from "../../../util/MomentTwoPointO";
<!-- Parent Component for the picker cards -->
<template lang="pug">
    v-container(fluid='', grid-list-md='', :dark="darkening" )
        v-layout(row wrap, :dark="darkening")
            v-flex(xs12 v-if="!heatmap")
                v-layout(justify-center, align-center)
                    v-label {{strings.timeSlotInfo}}
            v-flex(xs12)
                v-slider(v-model="v_model_interval" :tick-labels='TimeIntervals.map((v) => v + " min")', always-dirty, min='0', v-bind:max='TimeIntervals.length - 1', thumb-label, thumb-size='30', ticks='always', label="Interval", :dark="darkening")
                    template(slot='thumb-label', slot-scope='props', :dark="darkening")
                        span {{ TimeIntervals[props.value] }}
            v-flex(xs12, v-if="!heatmap")
                v-data-iterator(:items='timeSlotPickerCardData', :disable-initial-sort='true', :total-items=-1 :expand='true' content-tag='v-layout' row='', wrap='')
                    v-flex(slot='item', slot-scope='props', xs12, sm6, md4, lg2).timeslotcardwrapper
                        c-polltimeslotpickercard(@change="updateVModel" v-model="pickedTimeSlotsArray[props.index]" v-bind:fromTo="props.item.fromTo" v-bind:interval="interval" v-bind:availableTimeslots="props.item.availableTimeslots", :darkening="darkening", :backgroundColorFreeTimeSlots="backgroundColorFreeTimeSlots", :backgroundColorBlockedTimeSlots="backgroundColorBlockedTimeSlots", :updateEvent="updateEvent", :indexCard="props.index")
            v-flex(xs12, v-else)
                v-data-iterator(:items='timeSlotPickerCardData', :disable-initial-sort='true', :total-items=-1 :expand='true' content-tag='v-layout' row='', wrap='')
                    v-flex(slot='item', slot-scope='props', xs12, sm6, md4, lg2).timeslotcardwrapper
                        c-polltimeslotpickercardheatmap(@change="updateVModel" v-model="pickedTimeSlotsArray[props.index]" v-bind:fromTo="props.item.fromTo" v-bind:interval="interval" v-bind:availableTimeslots="props.item.availableTimeslots", :darkening="darkening", :backgroundColorFreeTimeSlots="backgroundColorFreeTimeSlots", :backgroundColorBlockedTimeSlots="backgroundColorBlockedTimeSlots", :colorHeatmap="heatmapColorSlots[props.index]", :participantsSlots="participantsSlots[props.index]", :updateEvent="updateEvent")

</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {TimeInterval} from "../../../util/MomentTwoPointO";
    import {
        FromTo, FromToArray
    } from "../../../util/TimeSlotUtils";
    import {Model, Prop, Watch} from "vue-property-decorator";
    import CPollTimeSlotPickerCard from "./CPollTimeSlotPickerCard.vue"
    import {AppStore, ClassStateField, StateModule} from "../../../store/AppStore";
    import CPollTimeSlotsPickerCardHeatmap from "./CPollTimeSlotPickerCardHeatmap.vue"
    import * as moment from "moment";
    import {serverBus} from "../../../main";
    import {VueStateField} from "../../../store/State";

    export interface IMouseEvent {
        type : string,
        layerX : number,
        layerY : number,
        target : {
            scrollHeight : number
        },
    }

    export interface participateTimeslots {
        participants : Array<string>,
        timeslot : FromTo
    }

    @Component({
        components : {
            "c-polltimeslotpickercard" : CPollTimeSlotPickerCard,
            "c-polltimeslotpickercardheatmap" : CPollTimeSlotsPickerCardHeatmap
        }
    })
    export default class CPollTable extends Vue{

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @Prop(FromToArray)
        availableTimeslots : FromToArray;

        @Prop() resetInput : boolean;

        @Prop() darkening : boolean;

        @Prop() givenTimeSlots : FromToArray;

        @Prop() heatmap : boolean;

        @Prop() updateEvent : boolean;

        @Prop() colorsHeatmap : Array<string>;
        heatmapColorSlots : Array<any> = [];

        @Prop() participants : Array<participateTimeslots>;
        participantsSlots : Array<any> = [];

        @VueStateField(StateModule.POLLCREATION)
        timeslot_min_duration : string;

        TimeIntervals = TimeInterval;

        backgroundColorFreeTimeSlots : string = "#FFFFFF";
        backgroundColorBlockedTimeSlots : string = "#e9e9e9";

        pickedTimeSlotsArray : FromToArray[] = [];
        v_model_interval : number = 2;
        interval : TimeInterval = 15;

        @Model("change", {type : FromToArray, default : function (){return new FromToArray()}})
        pickedTimeSlots : FromToArray;

        /**
         * method to update the v-model when you put in a v-model in the parent, like <CPollTable v-model="array">
         */
        updateVModel(){
            this.pickedTimeSlots.clear();
            for(const arr of this.pickedTimeSlotsArray){
                if(arr) for(const v of arr.value){
                    if(v) this.pickedTimeSlots.push(v.clone())
                }
            }

            this.$emit("change", this.pickedTimeSlots);
            serverBus.$emit("updateTimeSlots");
        }

        /**
         * generates the time limit of a card
         */
        get timeSlotPickerCardData(){
            const fromToMinMaxForCards = this.availableTimeslots.getArraysPerDay().map( value => {
                return {
                    fromTo : value.minMax(),
                    availableTimeslots : value
                }});

            const fromToMinMax = new FromToArray(fromToMinMaxForCards.map(v => FromTo.fromObject({
                from : v.fromTo.from.clone().day(1).month(1).year(1),
                to   : v.fromTo.to.clone().day(1).month(1).year(1)
            }))).minMax();

            for(const v of fromToMinMaxForCards){
                v.fromTo.from.roundToFullMin().hour(fromToMinMax.from.hour()).minute(fromToMinMax.from.minute());
                v.fromTo.to.roundToFullMin().hour(fromToMinMax.to.hour()).minute(fromToMinMax.to.minute());
            }

            return fromToMinMaxForCards;
        };

        /**
         * once the dark attribute from the parent change, we want to adjust the color of free and blocked time slots here and in all childs
         * @private
         */
        @Watch("darkening")
        __changeColor(){
            if(this.darkening) {
                this.backgroundColorFreeTimeSlots = "#666666";
                this.backgroundColorBlockedTimeSlots = "#000000"
            }
            else {
                this.backgroundColorFreeTimeSlots = "#FFFFFF";
                this.backgroundColorBlockedTimeSlots = "#999999"
            }
        }

        /**
         * update the intervals when the selector changed
         */
        @Watch("v_model_interval")
        __watch_vmodel_interval(index : number){
            this.interval = TimeInterval[index];
        }

        /**
         * once the picked timeslots change, we want to put in the store
         * @private
         */
        @Watch("pickedTimeSlotsArray")
        __checkArray(){
            AppStore.commit('setTimeSlots', this.pickedTimeSlotsArray);
            serverBus.$emit("updateTimeSlots");
        }

        /**
         * when the available time slots change, we reset the picked time slots, because this solution is easy.
         * @private
         */
        @Watch("availableTimeslots")
        __deleteTimeSlots(){
            //serverBus.$emit('adjustPickedTimeSlots');
            this.pickedTimeSlotsArray = [];
            if(this.darkening) {
                this.backgroundColorFreeTimeSlots = "#666666";
                this.backgroundColorBlockedTimeSlots = "#000000"
            }
            else {
                this.backgroundColorFreeTimeSlots = "#FFFFFF";
                this.backgroundColorBlockedTimeSlots = "#999999"
            }
            this.prepareGivenTimeSlots();
        }

        /**
         * if the color change then update the heatmap
         * @private
         */
        @Watch("colorsHeatmap")
        __watchHeatMap(){
            this.prepareGivenTimeSlots();
        }

        /**
         * if given time slots change update the picked time slots
         * @private
         */
        @Watch("givenTimeSlots")
        __watchGivenTimeSlots(){
            this.prepareGivenTimeSlots();
        }

        /**
         * method to put given timeslots in picked time slots array
         */
        prepareGivenTimeSlots(){
            if(!this.heatmap){
                let datesArrayBottom = [];
                let datesArrayTop = [];
                this.pickedTimeSlotsArray = [];
                let datesFromTo : FromToArray = new FromToArray();
                let minHours : any = 24;
                let minMinutes : any = 60;
                let maxHours : any = 0;
                let maxMinutes : any = 0;

                //search for the max time and min time in all available Timeslots
                for(let i = 0; i < this.availableTimeslots.length; i++) {
                    let newMinHours = this.availableTimeslots.value[i].from.toDate().getHours();
                    let newMinMinutes = this.availableTimeslots.value[i].from.toDate().getMinutes();
                    let newMaxHours = this.availableTimeslots.value[i].to.toDate().getHours();
                    let newMaxMinutes = this.availableTimeslots.value[i].to.toDate().getMinutes();
                    if(newMinHours*60+newMinMinutes < minHours*60+minMinutes){
                        minMinutes = newMinMinutes;
                        minHours = newMinHours;
                    }
                    if(newMaxHours*60+newMaxMinutes >= maxHours*60+maxMinutes){
                        maxMinutes = newMaxMinutes;
                        maxHours = newMaxHours;
                    }
                }
                //set the top and bottom of the displayed dates where we later decide if a timeslot is in this day
                for(let i = 0; i < this.availableTimeslots.length; i++){
                    datesArrayTop.push(new Date(this.availableTimeslots.value[i].from.toDate().setHours(maxHours,maxMinutes,59)));
                    datesArrayBottom.push(new Date(this.availableTimeslots.value[i].from.toDate().setHours(minHours,minMinutes,0)))
                }
                //get the bottom time of every displayed date, will be like date 0:00:00
                let uniqueArrayBottom = datesArrayBottom
                    .map(function (date) { return date.getTime() })
                    .filter(function (date, i, array) {
                        return array.indexOf(date) === i;
                    })
                    .map(function (time) { return new Date(time); }).sort(function (a, b) {
                        return a.getTime() - b.getTime();
                    });
                //get the top time of every displayed date, will be like date 23:59:59
                let uniqueArrayTop = [] = datesArrayTop
                    .map(function (date) { return date.getTime() })
                    .filter(function (date, i, array) {
                        return array.indexOf(date) === i;
                    })
                    .map(function (time) { return new Date(time); }).sort(function (a, b) {
                        return a.getTime() - b.getTime();
                    });
                //now add all dates to the right format and save it in picked dates
                for (let i = 0; i < uniqueArrayTop.length; i++){
                    for (let j = 0; j < this.givenTimeSlots.length; j++){
                        //if the given timeslot is between the displayed date then push it into the from to array of this day
                        if(new Date(uniqueArrayBottom[i]).getTime() <= this.givenTimeSlots.value[j].from.toDate().getTime() && new Date(uniqueArrayTop[i]).getTime() >= this.givenTimeSlots.value[j].to.toDate().getTime()){
                            datesFromTo.push(this.givenTimeSlots.value[j]);
                            //if the timeslot end is between the displaed dates then add the bottom and end of the timeslot to the picked timeslot array
                        }else if((new Date(uniqueArrayBottom[i]).getTime() <= this.givenTimeSlots.value[j].to.toDate().getTime())
                            && (new Date(uniqueArrayTop[i]).getTime() >= this.givenTimeSlots.value[j].to.toDate().getTime())){
                            let newTimeSlot : FromTo = new FromTo(moment(new Date(uniqueArrayBottom[i])), moment(this.givenTimeSlots.value[j].to.toDate()));
                            let newTimeSlotMin = (newTimeSlot.to.toDate().getTime() - newTimeSlot.from.toDate().getTime()) / 1000 / 60;
                            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]) - 0.9999;
                            if(newTimeSlotMin >= meetingLengthMin){
                                datesFromTo.push(newTimeSlot);
                            }
                            //if the timeslot start is between the displaed dates then add the start of a given timeslot and the bottom of displayed dates
                        }else if((new Date(uniqueArrayBottom[i]).getTime() <= this.givenTimeSlots.value[j].from.toDate().getTime())
                            && (new Date(uniqueArrayTop[i]).getTime() >= this.givenTimeSlots.value[j].from.toDate().getTime())){
                            let newTimeSlot : FromTo = new FromTo(moment(this.givenTimeSlots.value[j].from.toDate()), moment(new Date(uniqueArrayTop[i])));
                            let newTimeSlotMin = (newTimeSlot.to.toDate().getTime() - newTimeSlot.from.toDate().getTime()) / 1000 / 60;
                            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]) - 0.9999;
                            if(newTimeSlotMin >= meetingLengthMin){
                                datesFromTo.push(newTimeSlot);
                            }
                            //if the timeslot start nor end is between the displayed dates then add the bottom and top of the displayed dates
                        }else if((new Date(uniqueArrayBottom[i]).getTime() >= this.givenTimeSlots.value[j].from.toDate().getTime())
                            && (new Date(uniqueArrayTop[i]).getTime() <= this.givenTimeSlots.value[j].to.toDate().getTime())){
                            let newTimeSlot : FromTo = new FromTo(moment(new Date(uniqueArrayBottom[i])), moment(new Date(uniqueArrayTop[i])));
                            let newTimeSlotMin = (newTimeSlot.to.toDate().getTime() - newTimeSlot.from.toDate().getTime()) / 1000 / 60;
                            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]) - 0.9999;
                            if(newTimeSlotMin >= meetingLengthMin){
                                datesFromTo.push(newTimeSlot);
                            }
                        }
                    }
                    this.pickedTimeSlotsArray.push(datesFromTo);
                    datesFromTo = new FromToArray();
                }
            }else{
                this.heatMapPrep();
            }
        }

        /**
         * method do something similar als prepGivenTimeslots and also adds colors and strings for the heatmap
         */
        heatMapPrep(){
            let datesArrayBottom = [];
            let datesArrayTop = [];
            this.heatmapColorSlots = [];
            this.participantsSlots = [];
            this.pickedTimeSlotsArray = [];
            let datesFromTo : FromToArray = new FromToArray();
            //prepare the displayed dates to decide later, which timeslot match to a displayed date
            //sometimes the available timeslots does not match the participate Timeslots so we have to adjust the available timeslots to the correct value
            if (typeof AppStore.state.participateTimeSlots.value !== 'undefined'){
                for (let i = 0; i < AppStore.state.participateTimeSlots.value.length; i++){
                    datesArrayTop.push(new Date(AppStore.state.participateTimeSlots.value[i].from.toDate().setHours(23,59,59)));
                    datesArrayBottom.push(new Date(AppStore.state.participateTimeSlots.value[i].from.toDate().setHours(0,0,0)))
                }
                this.availableTimeslots = AppStore.state.participateTimeSlots;
            }else{
                for(let i = 0; i < this.availableTimeslots.length; i++){
                    datesArrayTop.push(new Date(this.availableTimeslots.value[i].from.toDate().setHours(23,59,59)));
                    datesArrayBottom.push(new Date(this.availableTimeslots.value[i].from.toDate().setHours(0,0,0)))
                }
            }
            //get the bottom time of every displayed date, will be like date 0:00:00
            let uniqueArrayBottom = datesArrayBottom
                .map(function (date) { return date.getTime() })
                .filter(function (date, i, array) {
                    return array.indexOf(date) === i;
                })
                .map(function (time) { return new Date(time); }).sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
            //get the top time of every displayed date, will be like date 23:59:59
            let uniqueArrayTop = [] = datesArrayTop
                .map(function (date) { return date.getTime() })
                .filter(function (date, i, array) {
                    return array.indexOf(date) === i;
                })
                .map(function (time) { return new Date(time); }).sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
            //now add all dates to the right format and save it in picked dates
            //also add the right color to a timeslot
            for (let i = 0; i < uniqueArrayTop.length; i++){
                this.heatmapColorSlots[i] = [];
                for (let j = 0; j < this.givenTimeSlots.length; j++){
                    if(new Date(uniqueArrayBottom[i]).getTime() <= this.givenTimeSlots.value[j].to.toDate().getTime() && new Date(uniqueArrayTop[i]).getTime() >= this.givenTimeSlots.value[j].to.toDate().getTime()){
                        datesFromTo.push(this.givenTimeSlots.value[j]);
                        this.heatmapColorSlots[i].push(this.colorsHeatmap[j]);
                    }
                }
                this.pickedTimeSlotsArray.push(datesFromTo);
                datesFromTo = new FromToArray();
            }
            //put the right names on the right place from the timeslots
            for(let i = 0; i < this.pickedTimeSlotsArray.length; i++){
                this.participantsSlots[i] = [];
                for(let j = 0; j < this.pickedTimeSlotsArray[i].length; j++){
                    for(let k = 0; k < this.participants.length; k++){
                        if(this.participants[k].timeslot === this.pickedTimeSlotsArray[i].value[j]){
                            this.participantsSlots[i][j] = this.participants[k].participants
                        }
                    }
                }
            }
            //put out empty arrays
            for(let i = 0; i < this.participantsSlots.length; i++){
                if(this.participantsSlots[i].length === 0) {
                    this.participantsSlots.splice(i, 1);
                    i = -1;
                }
            }
        }

        /**
         * method to reset all picked time slots
         * @private
         */
        @Watch("resetInput")
        __resetTheInput(){
            this.pickedTimeSlotsArray = [];
            serverBus.$emit("updateTimeSlots");
        }

        mounted(){
            //serverbus to delete a certain time slot from the picked time slot array. Will be selected in the child
            serverBus.$on('deleteTimeSlot', (deleteTimeSlot) => {
                let index = -1;
                for(let i = 0; i < this.pickedTimeSlotsArray.length; i++){
                    if(typeof this.pickedTimeSlotsArray[i] !== "undefined"){
                        index = this.pickedTimeSlotsArray[i].value.findIndex((element) => {
                            return element === deleteTimeSlot
                        });
                    }
                    if(index !== -1) {
                        this.pickedTimeSlotsArray[i].value.splice(index, 1);
                        this.updateVModel();
                        AppStore.commit('setTimeSlots', this.pickedTimeSlotsArray);
                    }
                }
            });
            //serverbus to edit a timeslot by splicing the old and a new one which will generated in a child component
            serverBus.$on('editTimeSlot', (result) => {
                let index = -1;
                for(let i = 0; i < this.pickedTimeSlotsArray.length; i++){
                    if(typeof this.pickedTimeSlotsArray[i] !== "undefined"){
                        index = this.pickedTimeSlotsArray[i].value.findIndex((element) => {
                            return element === result.old
                        });
                    }
                    if(index !== -1) {
                        this.pickedTimeSlotsArray[i].value.splice(index, 1);
                        this.pickedTimeSlotsArray[i].value.push(result.new);
                        this.updateVModel();
                        AppStore.commit('setTimeSlots', this.pickedTimeSlotsArray);
                    }
                }
            });
            //trick because a lost update from the properties
            serverBus.$on('updatedParticipatedTimeSlots', (result) => {
                this.prepareGivenTimeSlots();
            });
            //not implemented yet. Just a small playing around to not delete all picked timeslots when the available dates change.
            //it should be quite similar to the prepare timeslot function
            serverBus.$on('adjustPickedTimeSlots', (res) => {
                console.log('available timeslots');
                console.log(this.availableTimeslots);
                console.log('pickedTimeSlotsFirst');
                console.log(this.pickedTimeSlotsArray);
                let index = 0;
                let tempPicks : FromToArray[] = [];
                for (let i = 0; i < this.pickedTimeSlotsArray.length; i++){
                    try {
                        index = this.availableTimeslots.value.findIndex((element) => {
                            if (typeof this.pickedTimeSlotsArray[i] !== 'undefined'){
                                if (this.pickedTimeSlotsArray[i].length !== 0) return element.from.format("DD.MM.YY") === this.pickedTimeSlotsArray[i].value[0].from.format("DD.MM.YY")
                            }
                        });
                        if (index !== -1){
                            if (typeof this.pickedTimeSlotsArray[i] !== 'undefined'){
                                if (this.pickedTimeSlotsArray[i].length !== 0){
                                    console.log('here');
                                    console.log(this.pickedTimeSlotsArray[i]);
                                    tempPicks.push(this.pickedTimeSlotsArray[i])
                                }
                            }
                        }
                    }catch (e) {
                        console.log(e);
                        console.log(this.pickedTimeSlotsArray)
                    }
                }
                this.pickedTimeSlotsArray = tempPicks.slice(0);
            });
            //put a new Timeslot into the pickedTimeSlot array
            serverBus.$on('newTimeSlots', () => {
                AppStore.commit('setTimeSlots', this.pickedTimeSlotsArray);
            })
        }
    }
</script>

<style lang="scss">

    .timeslotcardwrapper{
        padding: 1px !important;
    }
</style>
