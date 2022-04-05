import {pollDataFillerFunctions} from "./pollDataFillerFunctions";
import {ClassStateField, StateModule, AppStore} from "../store/AppStore";
import * as moment from "moment";
import validator from '../../node_modules/validator';
// @ts-ignore
import * as meetz from "../../node_modules/meetznow-api-client"
import {post} from '../../node_modules/request'
import {serverBus} from "../main";
let request = require('request');

const DATE_FORMAT = "ddd DD. MMMM YYYY";

/**
 * class to wrap all data necessary to create a poll
 */
export class pollNewData{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.POLLCREATION)
    creator : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    title : string = this.strings.creationStandardTitle;

    @ClassStateField(StateModule.POLLCREATION)
    displayed_dates : Array<Date> = [];

    @ClassStateField(StateModule.POLLCREATION)
    exposing : boolean = false;

    @ClassStateField(StateModule.POLLCREATION)
    location : string = 'Stuttgart';

    @ClassStateField(StateModule.POLLCREATION)
    timeslot_min_duration : string = this.strings.creationStandardMeetingLength;

    @ClassStateField(StateModule.POLLCREATION)
    password : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    passwordConfirm : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    cal_timesteps : any = this.strings.creationStandardTimeSteps;

    @ClassStateField(StateModule.POLLCREATION)
    color_header : string = "#66ffff";

    @ClassStateField(StateModule.POLLCREATION)
    color_content : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    color_buttons : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    color_text : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    logo : string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIAAAAKICAIAAACHSRZaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA2zSURBVHhe7dcxAQAADMOg+TfducgFLrgBAACQEDAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAEtsD9S7Spuq5RpkAAAAASUVORK5CYII=';

    @ClassStateField(StateModule.POLLCREATION)
    timeslots : any;

    @ClassStateField(StateModule.POLLCREATION)
    email_list : Array<any> = AppStore.state.email_list;

    select_timeArray : Array<string> = [];

    @ClassStateField(StateModule.POLLCREATION)
    select_begin : string = this.strings.creationStandardTimeSlotBegin;

    @ClassStateField(StateModule.POLLCREATION)
    select_end : string = this.strings.creationStandardTimeSlotEnd;

    theme_Array : Array<string> = [];

    @ClassStateField(StateModule.POLLCREATION)
    theme : string = this.strings.themeLight;

    @ClassStateField(StateModule.POLLCREATION)
    sharableLink : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    meetingArray : Array<any> = AppStore.state.meetingArray;

    timesteps_Array : Array<string> = [];

    meeting_length_Array : Array<string> = [];

    @ClassStateField(StateModule.POLLCREATION)
    userNameCreation : string = '';

    @ClassStateField(StateModule.POLLCREATION)
    dialog : boolean = false;

    @ClassStateField(StateModule.GENERAL)
    loadData : boolean;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.GENERAL)
    showError : boolean;

    @ClassStateField(StateModule.POLLCREATION)
    dialogMap : boolean = false;

    @ClassStateField(StateModule.POLLCREATION)
    reapeatingPoll : boolean = false;

    DATE_FORMAT : any = "ddd DD. MMMM YYYY";

    BasicData : any = Object.freeze({
        menu : false,
        formatted : '',
        day : ''
    });

    start_date_poll : any = Object.assign({}, this.BasicData);

    end_date_poll : any = Object.assign({}, this.BasicData);

    @ClassStateField(StateModule.POLLCREATION)
    cal_start : any = moment(new Date()).format(this.DATE_FORMAT);

    @ClassStateField(StateModule.POLLCREATION)
    cal_end : any = moment(new Date()).format(this.DATE_FORMAT);

    @ClassStateField(StateModule.POLLCREATION)
    start_date_poll_date : any = moment(new Date()).format(this.DATE_FORMAT);

    @ClassStateField(StateModule.POLLCREATION)
    end_date_poll_date : any = moment(new Date()).format(this.DATE_FORMAT);

    @ClassStateField(StateModule.POLLCREATION)
    latitude : any;

    @ClassStateField(StateModule.POLLCREATION)
    longitude : any;

    email : string = '';

    poll : any = new pollDataFillerFunctions();

    @ClassStateField(StateModule.POLLINFORMATION, "password")
    passwordRepeating : string;

    /**
     * method to check if selection start time of a time slot is before the end of the selection time
     */
    public rulesTimeSelectEnd(){
        let startTime = parseInt(this.select_begin.split(':')[0])*60 + parseInt(this.select_begin.split(':')[1]);
        let endTime = parseInt(this.select_end.split(':')[0])*60 + parseInt(this.select_end.split(':')[1]);
        return (endTime > startTime) ? '' : this.strings.creationTimeEndError
    }

    /**
     * rules for displaying that the start date for voting should be not before today
     */
    rulesDatesStart : any = [
        (v) => ((new Date(this.start_date_poll_date)).getTime() >= (new Date(moment(new Date()).format(this.DATE_FORMAT))).getTime()) || this.strings.creationDateStartError
    ];

    /**
     * the title of a poll shouldn´t be empty
     */
    rulesTitle : any = [
        (v) => !!v || this.strings.ruleFieldNotEmpty
    ];

    rulesUserName : any = [
        (v) => !!v || this.strings.ruleFieldNotEmpty
    ];
    /**
     * rules for the location. It shouldn´t be empty
     */
    public rulesLocation(){
        return (this.location !== '') ? '' : this.strings.ruleFieldNotEmpty
    }

    /**
     * rule that the end date for voting should be after the starting date to vote.
     */
    public rulesDateEnd(){
        return ((new Date(this.start_date_poll_date)).getTime() <= (new Date(this.end_date_poll_date)).getTime()) ? '' : this.strings.creationDateEndError
    }

    @ClassStateField(StateModule.GENERAL)
    id : string;

    vm = null;

    constructor(){
        this.select_timeArray = this.poll.fillSelectionTime();
        this.meeting_length_Array = this.poll.fillMeetingArray();
        AppStore.commit('fillMeetingArray', this.poll.fillMeetingArray());
        this.timesteps_Array = this.poll.fillTimeStepArray();
        this.theme_Array = this.poll.fillThemeArray();
        if(this.id !== '-'){
            this.getPollForRepeat()
        }
    }

    /**
     * this method set the data for repeating a poll
     */
    async getPollForRepeat(){
        this.loadData = true;
        this.disableElements = true;
        try {
            let poll = await new meetz.GetPollCall({payload : {
                    poll_id : this.id
                }}).get();
            this.setUpPollForRepeating(poll)
        }catch (e) {
            try {
                let poll = await new meetz.SendPollPasswordCall({payload : {
                        poll_id : this.id,
                        password: this.passwordRepeating
                    }}).get();
                this.setUpPollForRepeating(poll)
            }catch (e) {
                this.error = e.message;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                }, this.timeout);
            }
        }
    }

    setUpPollForRepeating(poll){
        let pollRes = poll.payload.poll;
        this.reapeatingPoll = true;
        const closeAtMomentStart = moment(poll.payload.poll.start_date_poll);
        const closeAtMomentEnd = moment(poll.payload.poll.end_date_poll);
        this.timeslot_min_duration = Math.floor(pollRes.timeslot_min_duration / 60).toString() + ":" + (pollRes.timeslot_min_duration % 60).toString();
        if((pollRes.timeslot_min_duration % 60).toString() == "0") this.timeslot_min_duration += "0";
        this.title = poll.payload.poll.title;
        this.start_date_poll_date =  closeAtMomentStart.format(DATE_FORMAT);
        this.end_date_poll_date =  closeAtMomentEnd.format(DATE_FORMAT);
        this.location = poll.payload.poll.location;
        this.theme = poll.payload.poll.theme;
        this.color_header = poll.payload.poll.color_nav;
        this.logo = poll.payload.poll.logo;
        this.exposing = poll.payload.poll.exposing;
        AppStore.commit('setRepeatingTimeSlotDates', {dates: poll.payload.poll.displayed_dates, begin: poll.payload.poll.start_date_poll, end: poll.payload.poll.end_date_poll});
        AppStore.commit('setGivenTimeSlots', poll.payload.poll.timeslots);
        /*for(let i = 0; i < pollRes.participants.length; i++){
            AppStore.commit('addEmail', pollRes.participants[i]);
        }*/
        serverBus.$emit("updateTimeSlots");
        this.loadData = false;
        this.disableElements = false;
    }

    public validate(){
        if(true) return false;
        return true
    }

    /**
     * method add email addresses to the email field
     */
    public emailButton(){
        if(validator.isEmail(this.email)){
            AppStore.commit('addEmail', this.email);
            this.email = '';
        }
    }

    /**
     * method check if the email has valid form
     */
    public rulesEmail(){
        if(!validator.isEmail(this.email)){
            if(this.email === ''){
                return ''
            } else{
                return this.strings.creationEmailError
            }
        }
    }

    /**
     * method open the meeting length pop up
     */
    public setTime(){
        this.dialog = true;
    }

    /**
     * method validate the first step of creating a poll
     */
    public validateForm(){
        let startTime = parseInt(this.select_begin.split(':')[0])*60 + parseInt(this.select_begin.split(':')[1]);
        let endTime = parseInt(this.select_end.split(':')[0])*60 + parseInt(this.select_end.split(':')[1]);
        if(startTime > endTime) return false;
        if((new Date(this.start_date_poll_date)).getTime() < (new Date(moment(new Date()).format(this.DATE_FORMAT))).getTime()) return false;
        if((new Date(this.start_date_poll_date)).getTime() > (new Date(this.end_date_poll_date)).getTime()) return false;
        if(this.title === '') return false;
        if(this.location === '' || this.location === null) return false;
        return true;
    }


    /**
     * once a email is in the emaillist component this method will delete the email which - button is pressed
     * @param email
     */
    public deleteEmail(email){
        let index = this.email_list.findIndex((element) => {
            return element === email
        });
        AppStore.commit('deleteEmail', index);
    }
}
