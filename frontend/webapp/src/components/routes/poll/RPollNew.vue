<!-- Component  show a stepper for creating a poll. First step is basic information, second are the timeslots and third is a confirmation-->

<template lang="pug">
    v-layout#root(fill-height='true', row, wrap, v-bind:class="{ filtering : creationDone }")
        v-flex.xs12
            v-stepper(v-model="steps.stepper", alt-labels, :dark="darkeningGeneral")
                v-stepper-header
                    v-layout(ref="stepperOptions")
                        v-stepper-step( :complete="steps.stepper > 1" step="1")
                            span() {{strings.createGeneral}}
                        v-divider
                        v-stepper-step( :complete="steps.stepper > 2" step="2")
                            span() {{strings.createAddDates}}
                        v-divider
                        v-stepper-step( step="3")
                            span() {{strings.createConfirm}}
                v-stepper-items
                    v-stepper-content(step="1")
                        PollNewGeneral
                        v-flex.xs12
                            v-layout(align-end justify-end)
                                v-btn(@click="reset" flat, :disabled="disableElements") {{strings.createButtonReset}}
                                v-btn(@click="next", :disabled="disableElements") {{strings.createButtonForward}}
                                    v-icon(right) navigate_next
                            v-layout(align-end justify-end)
                                label.errorMessage(v-if='errorStepOne') {{strings.creationErrorMessage}}

                    v-stepper-content(step="2")
                        v-container.fluid.grid-list-xl
                            v-layout(row='', wrap='')
                                v-flex(xs12 sm6 md3 order-md1 order-sm1)
                                    v-label {{strings.createCalendar}}
                                v-flex(xs12 sm6 md3 order-md2 order-sm2)
                                    v-btn(onclick="document.getElementById('getFile').click()") {{strings.uploadFile}}
                                    <input type='file' id='getFile' style="display:none" accept='.txt, .ics' v-on:change="addDates.onFilePicked($event, pollData.timeslot_min_duration)">

                            v-layout.wrap
                                v-flex(xs12 sm6 md3 order-md1 order-sm1)
                                    v-flex.xs12
                                        v-date-picker(v-model="steps.ADD_DATES.picker.date" full-width)

                                v-flex(v-if="hasSelectedDates" xs12 sm6 md3 order-md2 order-sm2)
                                    v-list(two-line)
                                        template(v-for="(item, index) in steps.ADD_DATES.selectable")
                                            v-list-tile(
                                            avatar
                                            ripple
                                            :key="index"
                                            @click="steps.ADD_DATES.activeTab = index"
                                            )
                                                v-list-tile-avatar
                                                    v-icon date_range
                                                v-list-tile-content
                                                    v-list-tile-title {{ item.moment.format("dddd") }}
                                                    v-list-tile-sub-title {{ item.moment.format("DD. MMMM YYYY") }}
                                                v-list-tile-action
                                                    v-btn(icon ripple @click="steps.ADD_DATES.selectable.splice(index , 1)")
                                                        v-icon(color="red") delete
                                            v-divider(v-if="index + 1 < steps.ADD_DATES.selectable.length")
                                v-flex(xs12 sm6 md3 order-md3 order-sm3)
                                    v-select.elementWidth(:items="pollData.select_timeArray" :label="strings.createBegin" v-model="pollData.select_begin" :dark="darkeningGeneral")
                                v-flex(xs12 sm6 md3 order-md4 order-sm4)
                                    v-select.elementWidth(:items="pollData.select_timeArray" :label="strings.createEnd" v-model="pollData.select_end" :error-messages="pollData.rulesTimeSelectEnd()" :dark="darkeningGeneral")
                            v-layout(row='', wrap='')
                                v-btn(@click="resetInput = !resetInput") {{strings.buttonInputReset}}
                            v-layout(row='', wrap='', v-show="dateTrick")
                                c-polltable(v-bind:availableTimeslots="datesTableMoment", v-bind:resetInput="resetInput", :darkening="darkeningGeneral", :givenTimeSlots="appStore.state.givenTimeSlots", :updateEvent="updateTrigger")

                        v-flex.xs12
                            v-layout(align-end justify-end)
                                v-btn(@click="reset" flat) {{strings.createButtonReset}}
                                v-btn(@click="next") {{strings.createButtonForward}}
                                    v-icon(right) navigate_next
                            v-layout(align-end justify-end)
                                label.errorMessage(v-if='errorStepTwo') {{strings.creationErrorMessageTimeSlots}}


                    v-stepper-content(step="3")
                        PollCreationConfirmation
                        v-flex.xs12
                            v-layout(align-end justify-end)
                                v-btn(@click="reset" flat, :disabled="disableElements") {{strings.createButtonReset}}
                                v-btn(@click="create()", :disabled="disableElements") {{strings.creationCreate}}
                                    v-icon(right) navigate_next
                                v-layout(align-end justify-end)
                                    label.errorMessage(v-if='errorStepOne') {{strings.creationErrorUsername}}
                                v-dialog(v-model="creationDone", persistent='')
                                    PollConfirmationShareScreen

</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";
    import * as moment from "moment";
    import {Watch} from "vue-property-decorator";
    import PollNewGeneral from "../../general/poll/PollNewGeneral.vue";
    import PollCreationConfirmation from "../../general/poll/PollCreationConfirmation.vue";
    import PollConfirmationShareScreen from "../../general/poll/PollConfirmationShareScreen.vue";
    import {pollNewData} from "../../../logic/pollNewData";
    import {AppStore, ClassStateField, StateModule} from "../../../store/AppStore";
    import * as meetz from "../../../../node_modules/meetznow-api-client";
    import {VueStateField} from "../../../store/State";
    import {FromTo, FromToArray} from "../../../util/TimeSlotUtils";
    import {AddUserCalendarDates} from '../../../logic/AddUserCalendarDates';
    import {serverBus} from "../../../main";

    export interface IAddDatesSelected {
        moment : moment.Moment
        date : any
    }


    export interface IAddDates {
        picker : {
            date : string
        }
        activeTab : number
        selected : IAddDatesSelected
        selectable : IAddDatesSelected[]
    }

    const AddDates_EMPTY : IAddDates = Object.freeze({
        picker : {
            date : ""
        },
        activeTab : null,
        selected : null,
        selectable : []
    });

    export interface ISteps {
        stepper : number,
        ADD_DATES : IAddDates
    }
    @Component({
        components: {
            PollConfirmationShareScreen, PollCreationConfirmation, PollNewGeneral}
    })
    export default class RPollNew extends Vue {

        @VueStateField(StateModule.GENERAL)
        resetInput : boolean;

        appStore : any = AppStore;

        dateTrick : boolean = false;

        @ClassStateField(StateModule.POLLCREATION)
        datesTableMoment: FromToArray = AppStore.state.timeSlotDates;

        @VueStateField(StateModule.GENERAL)
        dataProtection : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @VueStateField(StateModule.GENERAL)
        showError : boolean;

        @ClassStateField(StateModule.POLLCREATION)
        userNameCreation : string;

        errorStepOne : boolean = false;
        errorStepTwo : boolean = false;

        pollData = new pollNewData();

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.USER, "id")
        userID : string;

        @VueStateField(StateModule.USER)
        loggedIn : boolean;

        @VueStateField(StateModule.USER)
        userName : string;

        @ClassStateField(StateModule.POLLPARTICIPATE)
        givenTimeSlots : FromToArray = AppStore.state.givenTimeSlots;

        addDates = new AddUserCalendarDates();

        creationDone : boolean = false;

        firstNext : boolean = true;

        @VueStateField(StateModule.POLLPARTICIPATE)
        pollEditing : boolean;

        updateTrigger : boolean = false;

        steps : ISteps = {
            stepper : 1,
            ADD_DATES : Object.assign({}, AddDates_EMPTY),
        };

        get hasSelectedDates(){
            return this.steps.ADD_DATES.selectable.length > 0;
        }

        /**
         * method put you to the first step
         */
        reset(){
            if(this.steps.stepper !== 1){
                this.steps.stepper--;
                this.errorStepOne = false;
                serverBus.$emit("updateTimeSlots");
            }
        }

        /**
         * method send you to the next step of a stepper and validate the first step
         */
        next(){
            if(this.pollData.validateForm() && (!(this.steps.stepper === 2) || !(AppStore.state.timeSlotsCreated.length === 0))){
                this.steps.stepper ++;
                this.errorStepOne = false;
                this.errorStepTwo = false;
                if(this.steps.stepper === 3)this.dataProtection = true;
                if(this.firstNext && !this.pollData.reapeatingPoll){
                    for(let i = 0; i < this.datesTableMoment.length; i++){
                        this.steps.ADD_DATES.selectable.splice(i,1);
                        i = -1;
                    }
                    this.firstNext = false;
                }
                this.updateTrigger = true;
                serverBus.$emit("updateTimeSlots");
            }
            else {
                this.errorStepOne = true;
                this.errorStepTwo = true;
            }
        }

        /**
         * method create the poll and send it to the backend. After that a conformation pop up is shown
         */
        async create(){
            if(this.userID !== null || this.userNameCreation !== ''){
                let preparedData = this.setCreatingData();
                try{
                    let poll_id;
                    if(!this.pollEditing){
                        poll_id = await new meetz.CreatePollCall({payload : {
                                user_id: this.userID,
                                creator_name: this.userNameCreation,
                                title: this.pollData.title,
                                start_date_poll: preparedData.startTime,
                                end_date_poll:  preparedData.endTime,
                                displayed_dates: preparedData.displayedDate,
                                exposing: this.pollData.exposing,
                                location: this.pollData.location,
                                timeslot_min_duration: parseInt(this.pollData.timeslot_min_duration.split(':')[0])*60 + parseInt(this.pollData.timeslot_min_duration.split(':')[1]),
                                password: this.pollData.password,
                                cal_timesteps: preparedData.timesteps,
                                theme: this.pollData.theme,
                                color_nav: this.pollData.color_header,
                                color_content: '',
                                color_buttons: '',
                                logo: this.pollData.logo,
                                timeslots: AppStore.state.timeSlotsCreated,
                                participants: this.pollData.email_list
                            }}).get();
                    }else{
                        poll_id = await new meetz.SavePollCall({payload : {
                                poll_id : this.pollData.id,
                                poll: {
                                    title: this.pollData.title,
                                    start_date_poll: preparedData.startTime,
                                    end_date_poll:  preparedData.endTime,
                                    displayed_dates: preparedData.displayedDate,
                                    exposing: this.pollData.exposing,
                                    location: this.pollData.location,
                                    timeslot_min_duration: parseInt(this.pollData.timeslot_min_duration.split(':')[0])*60 + parseInt(this.pollData.timeslot_min_duration.split(':')[1]),
                                    hash: this.pollData.password,
                                    cal_timesteps: preparedData.timesteps,
                                    theme: this.pollData.theme,
                                    color_nav: this.pollData.color_header,
                                    color_content: '',
                                    color_buttons: '',
                                    logo: this.pollData.logo,
                                    timeslots: AppStore.state.timeSlotsCreated,
                                }
                            }}).get();
                    }
                    this.setAfterCreatingData(poll_id)
                }catch (e) {
                    this.error = e.message;
                    let self = this;
                    setTimeout(function(){
                        self.error = '';
                        self.disableElements = false;
                    }, this.timeout);
                }
            }else{
                this.errorStepOne = true
            }
        }

        /**
         * before you send the data to the backend you have to initialize all variables correct in this method
         */
        setCreatingData(){
            if(this.userID === null) this.userID = undefined;
            if(this.pollData.password === '') this.pollData.password = undefined;
            if(this.userNameCreation === '') this.userNameCreation = this.userName;
            this.disableElements = true;
            let timesteps = 0;
            if(this.pollData.cal_timesteps.split(':')[0] === '1')timesteps = 60;
            else timesteps = parseInt(this.pollData.cal_timesteps.split(':')[1]);
            let startTime = new Date(moment(this.pollData.start_date_poll_date).toDate().toUTCString());
            startTime = new Date(startTime.setHours(parseInt(this.pollData.select_begin.split(':')[0], parseInt(this.pollData.select_begin.split(':')[1]))));
            startTime = new Date(startTime.setMinutes(parseInt(this.pollData.select_begin.split(':')[1])));
            let endTime = new Date(moment(this.pollData.end_date_poll_date).toDate().toUTCString());
            endTime = new Date(endTime.setHours(parseInt(this.pollData.select_end.split(':')[0])));
            endTime = new Date(endTime.setMinutes(parseInt(this.pollData.select_end.split(':')[1])));
            let displayedDate = [];
            for(let i = 0; i < this.datesTableMoment.length; i++){
                displayedDate.push(new Date(this.datesTableMoment.value[i].from.toDate().setHours(parseInt(this.pollData.select_begin.split(':')[0]),parseInt(this.pollData.select_begin.split(':')[1]),0)));
            }
            let uniqueDisplayedDates = displayedDate
                .map(function (date) { return date.getTime() })
                .filter(function (date, i, array) {
                    return array.indexOf(date) === i;
                })
                .map(function (time) { return new Date(time); }).sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
            return {startTime: startTime, endTime: endTime, timesteps: timesteps, displayedDate: uniqueDisplayedDates}
        }

        /**
         * after the poll was created from the backend the wrap up has to be done in this method
         */
        setAfterCreatingData(poll_id){
            this.pollData.sharableLink = window.location.host + "/app/#/poll/participate/" + poll_id.payload.poll_id;
            if(!this.loggedIn) localStorage.setItem(poll_id.payload.poll_id, poll_id.payload.creator_id);
            this.disableElements = false;
            this.creationDone = true;
            this.disableElements = false;
            this.dataProtection = false;
            this.steps.ADD_DATES.selectable = [];
            this.datesTableMoment = AppStore.state.timeSlotDates;
        }

        /**
         * watch the date picker dates. If the dates are already selected the date will be filtered
         * @private
         */
        @Watch("steps.ADD_DATES.picker.date")
        __watch_pickerDate(){
            if(this.steps.ADD_DATES.picker.date === "") return;

            const selectedMoment =  moment(this.steps.ADD_DATES.picker.date);

            if(!selectedMoment.isValid()){
                throw "[MEETZNOW|RPollNew.vue] Not a valid moment " + this.steps.ADD_DATES.picker.date;
            }

            selectedMoment.startOf("day");

            const filterdDates = this.steps.ADD_DATES.selectable.map((value, index) =>  { return {date : value.date, index : index}}).filter(value => value.date === this.steps.ADD_DATES.picker.date);

            if(filterdDates.length === 1){
                this.steps.ADD_DATES.activeTab = filterdDates[0].index;
                return;
            } else if (filterdDates.length !== 0){
                throw "[MEETZNOW|RPollNew.vue] Date already exists " + this.steps.ADD_DATES.picker.date;
            }

            //Dates should be after the today
            let today = new Date();
            today = new Date(today.setHours(0,0,0));
            if(selectedMoment.toDate().getTime() >= today.getTime() - 86400){
                this.steps.ADD_DATES.activeTab = this.steps.ADD_DATES.selectable.push({
                    moment : selectedMoment,
                    date : this.steps.ADD_DATES.picker.date
                }) - 1;
                //AppStore.commit('changeSingleTimeSlotDate', {date: selectedMoment.toDate(), begin: this.pollData.select_begin, end: this.pollData.select_end});
                //this.datesTableMoment = AppStore.state.timeSlotDates;
                this.steps.ADD_DATES.selectable.sort(function (a,b) {
                    return  new Date(a.date).getTime() - new Date(b.date).getTime()
                });
            }
            else{
                this.error = this.strings.creationErrorDate;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                    self.disableElements = false;
                }, this.timeout);
            }
        }

        /**
         * once a date has changed the date should be added to the store
         * @private
         */
        @Watch("steps.ADD_DATES.selectable")
        __check_dates(){
            AppStore.commit('changeTimeSlotDates', {dates: this.steps.ADD_DATES.selectable, begin: this.pollData.select_begin, end: this.pollData.select_end});
            this.datesTableMoment = AppStore.state.timeSlotDates;
            //AppStore.commit('changeSingleTimeSlotDateDelete', this.steps.ADD_DATES.selectable);
            //this.datesTableMoment = AppStore.state.timeSlotDates;
            this.dateTrick = true;
        }

        @Watch("pollData.select_begin")
        __changeBegin(){
            AppStore.commit('changeTimeSlotDates', {dates: this.steps.ADD_DATES.selectable, begin: this.pollData.select_begin, end: this.pollData.select_end});
            this.datesTableMoment = AppStore.state.timeSlotDates;
            //AppStore.commit('changeTimeSlotTime', {start: this.pollData.select_begin, end: this.pollData.select_end});
            //this.datesTableMoment = AppStore.state.timeSlotDates;
        }

        @Watch("pollData.select_end")
        __changeEnd(){
            AppStore.commit('changeTimeSlotDates', {dates: this.steps.ADD_DATES.selectable, begin: this.pollData.select_begin, end: this.pollData.select_end});
            this.datesTableMoment = AppStore.state.timeSlotDates;
            //AppStore.commit('changeTimeSlotTime', {start: this.pollData.select_begin, end: this.pollData.select_end});
            //this.datesTableMoment = AppStore.state.timeSlotDates;
        }

        @Watch("datesTableMoment")
        __checker(){
            this.datesTableMoment = AppStore.state.timeSlotDates;
        }

        /**
         * if you want to reapeat a poll this method set the dates
         * @private
         */
        @Watch("pollData.reapeatingPoll")
        __addADD_Dates(){
            if(this.pollData.reapeatingPoll){
                this.steps.ADD_DATES.selectable = [];
                for(let i = 0; i < AppStore.state.timeSlotDates.length; i++){
                    this.steps.ADD_DATES.activeTab = this.steps.ADD_DATES.selectable.push({
                        moment :  moment(new Date(AppStore.state.timeSlotDates.value[i].from.toDate())),
                        date : new Date(AppStore.state.timeSlotDates.value[i].from.toDate())
                    }) - 1;
                }
                this.givenTimeSlots = AppStore.state.givenTimeSlots;
                this.dateTrick = true;
            }
        }

        beforeDestroy(){
            AppStore.commit('changeTimeSlotDates', {dates: [], begin: this.pollData.select_begin, end: this.pollData.select_end});
            this.datesTableMoment = AppStore.state.timeSlotDates;
            AppStore.commit('resetGivenTimeSlots');
            this.givenTimeSlots = AppStore.state.givenTimeSlots;
            for(let i = 0; i < this.pollData.email_list.length; i++){
                AppStore.commit('deleteEmail', i);
            }
            for(let i = 0; i < this.steps.ADD_DATES.selectable.length; i++){
                this.steps.ADD_DATES.selectable.splice(i,1);
                i = -1;
            }
            this.pollData.id = "-";
            this.pollEditing = false;
        }

        mounted(){
            serverBus.$on('updateTimeSlotDates', () => {
                this.datesTableMoment = AppStore.state.timeSlotDates;
            });
            AppStore.commit('changeTimeSlotDates', {dates: [], begin: this.pollData.select_begin, end: this.pollData.select_end});
            this.datesTableMoment = AppStore.state.timeSlotDates;
            AppStore.commit('resetGivenTimeSlots');
            this.givenTimeSlots = AppStore.state.givenTimeSlots;
            for(let i = 0; i < this.pollData.email_list.length; i++){
                AppStore.commit('deleteEmail', i);
            }
            for(let i = 0; i < this.steps.ADD_DATES.selectable.length; i++){
                this.steps.ADD_DATES.selectable.splice(i,1);
                i = -1;
            }
        }
    }

</script>

<style scoped>
    #root{
        height: 100vh;
        width: 100%;
    }
    .filtering{
        filter: blur(5px);
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
</style>
