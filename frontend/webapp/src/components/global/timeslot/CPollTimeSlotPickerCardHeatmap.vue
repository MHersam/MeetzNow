<!-- component show a single day card in the heatmap mode -->
<template lang="pug">
    v-card( v-resize="recalculateHeights", :dark="darkening").daypicker
        v-card-title.daypickerHeaderRef(primary-title ref="daypickerheader", :dark="darkening").day
            h3.mb-0 {{ fromTo.from.format("MMMM Do YYYY") }}
        v-list(dense='', :dark="darkening", :style="'background-color: ' + backgroundColorBlockedTimeSlots")
            .daypickeroverlay
                .mouseinteractionlayer(
                @mouseenter="mouseOverEvent($event)",
                @mouseleave="mouseOverEvent($event)",
                @mousemove="mouseMoveEvent($event)",
                :dark="darkening",
                v-bind:style = "{ 'margin-top' : headerHeight + 'px', height : momentDiv.height + 'px'}"
                )

                .timeindicator(v-bind:style = "{ 'margin-top' : timeIndicator.marginTop + 'px', 'visibility' : timeIndicator.visibility}", :dark="darkening")
                    .timedivider.timedividerleft(v-bind:style="{'background-color': indicatorColor}")
                    .timedividertext
                        p(v-bind:style="{color: indicatorColor}") {{ timeIndicator.text }}
                    .timedivider.timedividerright(v-bind:style="{'background-color': indicatorColor}")

                c-timeslotoverlay(
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:timeSlots="availableTimeslots"
                :color="backgroundColorFreeTimeSlots",
                )

                c-timeslotoverlayheatmap(
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:timeSlots="pickedTimeSlots"
                :colorHeatmap='colorHeatmap'
                )

                c-timeslotoverlayparticipants(
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:timeSlots="pickedTimeSlots"
                color='#FF00FF',
                :participantsSlots="participantsSlots"
                )

                .times.timeslotselectorRef(ref="timeslotselector")
                    v-list-tile(v-for="(value, index) in displayedTimes" :key="`times-${index}`")
                        v-list-tile-action() {{ value }}
                        #divi(v-bind:class="{ diviDark: darkening, diviLight: !darkening }")
                        v-list-tile-content

</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import * as moment from 'moment';
    import {
        FromTo, FromToArray, MomentDiv,
    } from "../../../util/TimeSlotUtils";
    import {Model, Prop, Watch} from "vue-property-decorator";
    import {AdjustToIntervalDirection, TimeInterval} from "../../../util/MomentTwoPointO";
    import CTimeSlotOverlay from "./CTimeSlotOverlay.vue";
    import {StateModule} from "../../../store/AppStore";
    import {VueStateField} from "../../../store/State";
    import CTimeSlotOverlayHeatmap from "./CTimeSlotOverlayHeatmap.vue";
    import CTimeSlotOverlayParticipants from "./CTimeSlotOverlayParticipants.vue";

    const SNAPPING_DISTANCE = 7;

    export interface IMouseEvent {
        type : string,
        layerX : number,
        layerY : number,
        target : {
            scrollHeight : number
        }
    }

    @Component({
        components : {
            "c-timeslotoverlay" : CTimeSlotOverlay,
            "c-timeslotoverlayheatmap" : CTimeSlotOverlayHeatmap,
            "c-timeslotoverlayparticipants" : CTimeSlotOverlayParticipants
        }
    })
    export default class CPollTimeSlotPickerCardHeatmap extends Vue{

        @Prop(FromTo)       fromTo : FromTo;
        @Prop(Number)       interval : TimeInterval;
        @Prop(FromToArray)  availableTimeslots : FromToArray;
        @Prop() darkening : boolean;
        @Prop() backgroundColorFreeTimeSlots : string;
        @Prop() backgroundColorBlockedTimeSlots : string;
        @Prop() colorHeatmap : Array<string>;
        @Prop() participantsSlots : Array<any>;
        @Prop() updateEvent : boolean;

        @Model("change", {type : FromToArray, default : function (){return new FromToArray()}})
        pickedTimeSlots : FromToArray;

        @VueStateField(StateModule.POLLCREATION)
        timeslot_min_duration : string;

        displayedTimes = [];
        headerHeight = 0;

        splittetPickedTimeSlots : FromToArray[] = [];

        momentDiv : MomentDiv = new MomentDiv(
            FromTo.fromObject({
                from : moment("2019-1-1 10:22:30"),
                to : moment("2019-1-1 14:22:30"),
            }),
            0
        );

        timeIndicator = {
            moment : this.momentDiv.fromTo.from,
            text : "NULL",
            marginTop : 0,
            visibility: "hidden"
        };

        //COMPUTED -----------------------------------------------------------------------------------------------------

        set isIndicatorShown (value){
            value ? this.timeIndicator.visibility = "visible" : this.timeIndicator.visibility = "hidden";
        }

        get isIndicatorShown (){
            return this.timeIndicator.visibility === "visible";
        }

        get isIndicatorOverAvailableTimeslot(){
            return this.isIndicatorShown && this.availableTimeslots.contains(this.timeIndicator.moment)
        }

        get indicatorColor(){
            return this.isIndicatorOverAvailableTimeslot ? "#0B4F6C" : "#421817"
        }

        get isDrawingTimeslotValid(){
            //check if the meeting length is fulfilled
            let drawingTimeSlotLength = (this.drawingTimeslot.to.toDate().getTime() - this.drawingTimeslot.from.toDate().getTime()) / 1000 / 60;
            let meetingLengthMin = parseInt(this.timeslot_min_duration.split(':')[0]) * 60 + parseInt(this.timeslot_min_duration.split(':')[1]);
            if(this.drawingTimeslot === null) return true;
            if(!this.isIndicatorOverAvailableTimeslot || drawingTimeSlotLength < meetingLengthMin) return false;
            const overAvailable = this.availableTimeslots.matchingFirst(this.drawingTimeslot.from);
            return overAvailable.contains(this.drawingTimeslot.to);
        }

        get drawingTimeslotAsFromToArray(){
            return new FromToArray([this.drawingTimeslot])
        }

        //LIFECYCLE HOOKS ----------------------------------------------------------------------------------------------

        created(){
            this.createCardForInterval();
        }

        updated(){
            this.recalculateHeights();
        }

        //WATCHER ------------------------------------------------------------------------------------------------------

        @Watch("interval")
        __watch_interval(){
            this.createCardForInterval();
        }

        @Watch("availableTimeslots")
        __watch_availbleTimeslots(){
            this.createCardForInterval();
        }

        @Watch("backgroundColorFreeTimeSlots")
        __watch_backgroundFree(){
            this.createCardForInterval();
        }

        @Watch("backgroundColorBlockedTimeSlots")
        __watch_backgroundBlocked(){
            this.createCardForInterval();
        }

        @Watch("darkening")
        __watch_darkening(){
            this.createCardForInterval();
        }

        @Watch("pickedTimeSlots")
        __watch_pickedTimeslots(){
            this.createCardForInterval();
        }

        @Watch("fromTo")
        __watch_fromTo(){
            this.createCardForInterval();
        }

        @Watch("timeslot_min_duration")
        __watch_meeting(){
            this.createCardForInterval();
        }

        @Watch("updateEvent")
        __watch_update(){
            this.createCardForInterval();
        }

        createCardForInterval(){
            let from = this.fromTo.from.clone();
            let to   = this.fromTo.to.clone();

            // https://youtrack.jetbrains.com/issue/WEB-34056
            // noinspection TypeScriptUnresolvedFunction
            from.adjustToTimeInterval(this.interval, AdjustToIntervalDirection.down);
            // noinspection TypeScriptUnresolvedFunction
            to.adjustToTimeInterval(this.interval, AdjustToIntervalDirection.up);

            const displayedTimes = [];
            const startTime = from.clone().add((this.interval * 60) / 2, "s");

            while (startTime.isBefore(to)) {
                displayedTimes.push(startTime.format("HH:mm"));
                startTime.add(this.interval, "m");
            }

            this.momentDiv.fromTo.from  = from;
            this.momentDiv.fromTo.to    = to;
            this.displayedTimes         = displayedTimes;
        }

        setTimeIndicator(value : moment.Moment){
            this.timeIndicator.moment = value;
            this.timeIndicator.text = value.format("HH:mm");
            this.timeIndicator.marginTop = this.momentDiv.getPositionFor(value) - 10;
        }

        //MOUSE --------------------------------------------------------------------------------------------------------

        public handler(event){
            event.preventDefault()
        }

        drawingTimeslot : FromTo = null;

        mouseDownEvent(event : IMouseEvent){
            if(this.drawingTimeslot || !this.isIndicatorOverAvailableTimeslot) return;

            const start = this.momentDiv.getMomentFor(event.layerY);

            this.drawingTimeslot = FromTo.fromObject({
                from : start.clone(),
                to : start.clone()
            });
        }

        mouseUpEvent(event : IMouseEvent){
            if(!this.drawingTimeslot) return;

            if(this.isDrawingTimeslotValid){
                this.pickedTimeSlots.pushAndMerge(this.drawingTimeslot);
                this.$emit("change", this.pickedTimeSlots)
            }

            this.drawingTimeslot = null;
        }

        private drawingBackwards = false;
        mouseMoveEvent(event : IMouseEvent){
            if(!this.isIndicatorShown) return;

            const newMoment = this.momentDiv.getMomentFor(event.layerY);
            const overAvailable = this.availableTimeslots.matchingFirst(newMoment);

            if(overAvailable &&  this.momentDiv.getPositionFor(overAvailable.to) - event.layerY < SNAPPING_DISTANCE)
                this.setTimeIndicator(overAvailable.to.clone());
            else if(overAvailable &&  event.layerY - this.momentDiv.getPositionFor(overAvailable.from) < SNAPPING_DISTANCE)
                this.setTimeIndicator(overAvailable.from.clone());
            else
                this.setTimeIndicator(newMoment);

            if(!this.drawingTimeslot) return;

            if(this.drawingTimeslot.from.isAfter(this.timeIndicator.moment)) {
                if(!this.drawingBackwards){
                    this.drawingTimeslot.to = this.drawingTimeslot.from.clone();
                    this.drawingBackwards = true;
                }
                this.drawingTimeslot.from = this.timeIndicator.moment.clone();

            } else if(this.drawingTimeslot.from.isBefore(this.timeIndicator.moment)){
                this.drawingBackwards = false;
                this.drawingTimeslot.to = this.timeIndicator.moment;
            }
        }

        mouseOverEvent(event : IMouseEvent){
            this.isIndicatorShown = event.type === "mouseenter";
            this.drawingTimeslot = null;
        }

        //MISC ---------------------------------------------------------------------------------------------------------

        recalculateHeights(){
            this.momentDiv.height = (this.$el.getElementsByClassName('timeslotselectorRef')[0] as Element).clientHeight;
            this.headerHeight = (this.$el.getElementsByClassName('daypickerHeaderRef')[0] as Element).clientHeight;
        }
    }

</script>

<style scoped lang="scss">
    .daypicker{
        .day{
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .v-divider{
            width: 100%;
        }

        .v-list{
            padding: 0;
            background-color: #e9e9e9;
        }

        .daypickeroverlay{
            .mouseinteractionlayer{
                cursor: none;
                z-index: 1030;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
            }

            .times {
                hr {
                    background-color: rgba(0,0,0,0);
                }
            }

            .timeindicator{
                z-index: 1010 ;
                position: absolute;
                width: 100%;

                .timedivider{
                    position: absolute;
                    width: 40%;
                    top: 10px;
                    height: 1px;
                    background-color: red;
                }

                .timedividerleft{
                    left: 0;
                }
                .timedividertext{
                    position: absolute;
                    text-align: center;
                    width: 100%;
                    color: red;
                }
                .timedividerright{
                    right :0;
                }
            }
        }
    }
    #divi{
        width: 100%;
        height: 2px;
        margin-top: 3px;
    }
    .diviDark{
        background-color: #ffffff;
    }
    .diviLight{
        background-color: black;
    }
</style>
