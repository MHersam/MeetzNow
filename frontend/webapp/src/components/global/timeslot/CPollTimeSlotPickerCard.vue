<!--- Component show a single time slot picker card -->
<template lang="pug">
    v-card( v-resize="recalculateHeights", :dark="darkening").daypicker
        v-card-title.daypickerHeaderRef(primary-title ref="daypickerheader", :dark="darkening").day
            h3.mb-0 {{ fromTo.from.format("MMMM Do YYYY") }}
        v-list(dense='', :dark="darkening", :style="'background-color: ' + backgroundColorBlockedTimeSlots")
            .daypickeroverlay
                .mouseinteractionlayer(
                @mousedown="mouseDownEvent($event)",
                @mouseup="mouseUpEvent($event)",
                @mouseenter="mouseOverEvent($event)",
                @mouseleave="mouseOverEvent($event)",
                @mousemove="mouseMoveEvent($event)",
                :dark="darkening",
                ref="interactionLayer",
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
                :color="backgroundColorFreeTimeSlots"
                )

                c-timeslotoverlaytouch(
                v-if="touch"
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:timeSlots="availableTimeslots"
                :color="backgroundColorFreeTimeSlots"
                :availableTimeslots="availableTimeslots"
                :darkening="darkening"
                :colorFreeTimeSlots="backgroundColorFreeTimeSlots"
                :zIndexTouch="1050"
                )

                c-timeslotoverlay(
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:timeSlots="pickedTimeSlots"
                color='#AFD8FF'
                )

                c-timeslotoverlaypickedtimeslot(
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:pickedTimeSlots="pickedTimeSlots"
                :availableTimeslots="availableTimeslots"
                color='#AFD8FF'
                :zIndex="zIndex"
                :darkening="darkening"
                :resizeMoment="resizeMoment"
                )

                c-timeslotoverlay(
                v-if="drawingTimeslot !== null"
                v-bind:style = "{ 'margin-top' : headerHeight + 'px'}"
                v-bind:momentDiv="momentDiv"
                v-bind:timeSlots="drawingTimeslotAsFromToArray"
                v-bind:color ="isDrawingTimeslotValid ? '#AFD8FF' : '#ED736D'"
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
    import CTimeSlotOverlayPickedTimeSlot from "./CTimeSlotOverlayPickedTimeSlot.vue"
    import {serverBus} from "../../../main";
    import CTimeSlotOverlayTouch from "./CTimeSlotOverlayTouch.vue";

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
            "c-timeslotoverlaypickedtimeslot" : CTimeSlotOverlayPickedTimeSlot,
            "c-timeslotoverlaytouch" : CTimeSlotOverlayTouch,
        }
    })
    export default class CPollTimeSlotPickerCard extends Vue{

        @Prop(FromTo)       fromTo : FromTo;
        @Prop(Number)       interval : TimeInterval;
        @Prop(FromToArray)  availableTimeslots : FromToArray;
        @Prop() darkening : boolean;
        @Prop() backgroundColorFreeTimeSlots : string;
        @Prop() backgroundColorBlockedTimeSlots : string;
        @Prop() updateEvent : boolean;
        @Prop() indexCard : number;

        @Model("change", {type : FromToArray, default : function (){return new FromToArray()}})
        pickedTimeSlots : FromToArray;

        @VueStateField(StateModule.POLLCREATION)
        timeslot_min_duration : string;

        displayedTimes = [];
        headerHeight = 0;

        zIndex : number = 1050;
        zIndexTouch : number = 0;

        resizeMoment : any = moment(new Date());

        touch : boolean = false;

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

        /**
         * Watcher to solve the update problem of the cards
         * @private
         */
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
            if(!this.touch){
                this.timeIndicator.moment = value;
                this.timeIndicator.text = value.format("HH:mm");
                this.timeIndicator.marginTop = this.momentDiv.getPositionFor(value) - 10;
            }
        }

        //MOUSE --------------------------------------------------------------------------------------------------------

        drawingTimeslot : FromTo = null;

        mouseDownEvent(event : IMouseEvent){
            if(!this.touch){
                if(this.drawingTimeslot || !this.isIndicatorOverAvailableTimeslot) return;
                const start = this.momentDiv.getMomentFor(event.layerY);

                this.drawingTimeslot = FromTo.fromObject({
                    from : start.clone(),
                    to : start.clone()
                });
                this.zIndex = 0;
            }
        }

        mouseUpEvent(event : IMouseEvent){
            if(!this.touch){
                if(!this.drawingTimeslot) return;

                if(this.isDrawingTimeslotValid){
                    this.pickedTimeSlots.pushAndMerge(this.drawingTimeslot);
                    this.$emit("change", this.pickedTimeSlots)
                }

                this.drawingTimeslot = null;
                this.zIndex = 1050;
            }
        }

        private drawingBackwards = false;
        mouseMoveEvent(event : IMouseEvent){
            if(!this.touch){
                this.resizeMoment = this.momentDiv.getMomentFor(event.layerY);
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
        }

        mouseOverEvent(event : IMouseEvent){
            if(!this.touch){
                this.isIndicatorShown = event.type === "mouseenter";
                this.drawingTimeslot = null;
            }
        }

        //MISC ---------------------------------------------------------------------------------------------------------

        $refs!: {
            timeslotselector : any;
            daypickerheader : any;
            interactionLayer : any;
        };
        recalculateHeights(){
            this.momentDiv.height = (this.$el.getElementsByClassName('timeslotselectorRef')[0] as Element).clientHeight;
            this.headerHeight = (this.$el.getElementsByClassName('daypickerHeaderRef')[0] as Element).clientHeight;
        }

        mounted(){
            //adjust z-index which is needed in the child
            serverBus.$on('zIndex', (zIndex) => {
                this.zIndex = 0;
            });
            //adjust z-index which is needed in the child
            serverBus.$on('zIndexReset', (result) => {
                this.zIndex = 1050;
            });
            //in the last editing of a timeslot we want to merge it with others
            serverBus.$on('editTimeSlotMerge', (result) => {
                let index = this.pickedTimeSlots.value.findIndex((element) => {
                    return element === result.old
                });
                if(index !== -1) {
                    this.pickedTimeSlots.value.splice(index, 1);
                    this.pickedTimeSlots.pushAndMerge(result.new);
                    serverBus.$emit('update');
                    serverBus.$emit('newTimeSlots');
                }
            });
            //when you add a timeslot in the touch mode then this serverbus is triggered
            serverBus.$on('editTimeSlotMergeTouch', (newTimeSlot) => {
                this.pickedTimeSlots.pushAndMerge(newTimeSlot);
                serverBus.$emit('update');
                serverBus.$emit('newTimeSlots');
            });
            //trick to solve the lost update problem of the cards
            serverBus.$on('updateTimeSlots', (result) => {
                let vm = this;
                setTimeout(function () {
                    vm.createCardForInterval();
                }, 1000)
            });
            //check if we are on a mobile device
            if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) this.touch = true;
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
