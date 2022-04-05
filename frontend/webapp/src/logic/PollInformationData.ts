import {AppStore, ClassStateField, StateModule} from "../store/AppStore";
import * as meetz from "../../node_modules/meetznow-api-client";
import {Comment} from "./Comment";
import {Author} from "./Author";
import * as moment from "moment";
import {FromToArray} from "../util/TimeSlotUtils";

/**
 * this class wrap all poll information data
 */
export class PollInformationData{

    DATE_FORMAT : any = "ddd DD. MMMM YYYY";

    @ClassStateField(StateModule.POLLINFORMATION)
    date : any = '---';

    @ClassStateField(StateModule.POLLINFORMATION)
    event : string = '---';

    @ClassStateField(StateModule.POLLINFORMATION)
    time: string = '---';

    @ClassStateField(StateModule.POLLINFORMATION)
    place : string = '---';

    @ClassStateField(StateModule.POLLINFORMATION)
    password : string;

    @ClassStateField(StateModule.POLLINFORMATION)
    participants : number = 0;

    @ClassStateField(StateModule.POLLINFORMATION)
    creatorName : string = '---';

    @ClassStateField(StateModule.POLLINFORMATION)
    theme : string = '---';

    @ClassStateField(StateModule.POLLINFORMATION)
    logo : string = "https://www.w3schools.com/images/w3schools_green.jpg";

    @ClassStateField(StateModule.POLLINFORMATION)
    headerColor : string = "cornflowerblue";

    @ClassStateField(StateModule.POLLINFORMATION)
    exposing : boolean = false;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.GENERAL)
    showError : boolean;

    @ClassStateField(StateModule.GENERAL)
    loadData : boolean;

    @ClassStateField(StateModule.GENERAL)
    darkeningParticipate : boolean;

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.COMMENTMANAGER)
    comments : Array<Comment> = AppStore.state.comments;

    @ClassStateField(StateModule.USER, "id")
    userID : string;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    creator : boolean;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    userEx : any = AppStore.state.userEx;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    writeComment : boolean;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    passowordNeeded : boolean;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    participateTimeSlots : FromToArray = AppStore.state.participateTimeSlots;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    blockParticipate : boolean;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    start_date_poll : any;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    end_date_poll : any;

    @ClassStateField(StateModule.USER)
    loggedIn : boolean;

    @ClassStateField(StateModule.POLLCREATION)
    timeslot_min_duration : string;

    constructor(){
    }

    /**
     * method request the right poll from the backend and fill the variables that should be displayed
     * @param id
     */
    async getPoll(id){
        if(!this.passowordNeeded){
            this.loadData = true;
            try {
                let poll = await new meetz.GetPollCall({payload : {
                        poll_id : id
                    }}).get();
                this.createTheInfo(id, poll);
            }catch (e) {
                this.passowordNeeded = true;
                this.loadData = false;
                this.setError(e);
            }
        }else{
            this.loadData = true;
            try {
                // @ts-ignore
                let poll = await new meetz.SendPollPasswordCall({payload : {
                        poll_id : id,
                        password : this.password
                    }}).get();
                this.passowordNeeded = false;
                this.createTheInfo(id, poll);
            }catch (e) {
                this.setError(e);
            }
        }
    }

    /**
     * method set up the data for showing the error in the App.vue
     * @param e
     */
    setError(e){
        this.error = e.message;
        this.loadData = false;
        let self = this;
        setTimeout(function(){
            self.error = '';
            self.disableElements = false;
        }, this.timeout);
    }

    /**
     * method set up the poll info after making the getPoll backend call
     * @param id
     * @param poll
     */
    async createTheInfo(id, poll){
        AppStore.commit('setParticipateTimeSlots', poll.payload.poll.timeslots);
        this.setUpHeaderData(poll);
        this.setUpAuthor(poll, id);
        this.setUpComments(poll);
        this.loadData = false;
    }

    /**
     * method set up the data, which is showed in the header of participating in a poll
     * @param poll
     */
    setUpHeaderData(poll){
        this.event = poll.payload.poll.title;
        this.date = moment(poll.payload.poll.start_date_poll).format(this.DATE_FORMAT);
        this.place = poll.payload.poll.location;
        this.theme = poll.payload.poll.title;
        this.headerColor = poll.payload.poll.color_nav;
        this.exposing = poll.payload.poll.exposing;
        this.start_date_poll = poll.payload.poll.start_date_poll;
        this.end_date_poll = poll.payload.poll.end_date_poll;
        this.timeslot_min_duration = Math.floor(poll.payload.poll.timeslot_min_duration / 60).toString() + ":" + (poll.payload.poll.timeslot_min_duration % 60).toString();
        if((poll.payload.poll.timeslot_min_duration % 60).toString() == "0") this.timeslot_min_duration += "0";
        if(typeof poll.payload.poll.theme !== 'undefined'){
            this.darkeningParticipate = poll.payload.poll.theme.toLowerCase() !== this.strings.themeLight.toLowerCase();
        }
        this.logo = poll.payload.poll.logo;
        if(this.loggedIn){
            this.creator = poll.payload.poll.participants[0].user_id === this.userID;
        }else{
            let user = localStorage.getItem(poll.payload.poll.creator.poll_id);
            this.creator = poll.payload.poll.creator._id === user;
        }
        this.creatorName = poll.payload.poll.participants[0].name;
    }

    /**
     * method sets up the Author for creating and editing the comments directing to himself
     * @param poll
     * @param id
     */
    async setUpAuthor(poll, id) {
        let data = this.setUpPollCreatorAuthor(poll);
        let participateId = localStorage.getItem('' + id);
        if (this.loggedIn) {
            this.setUpLoggedInAuthor(poll, data)
        } else {
            this.setUpUnloggedAuthor(poll, participateId);
        }
    }

    /**
     * method sets up all comments and put them in the store
     * @param poll
     */
    setUpComments(poll){
        let comments = [];
        if(typeof poll.payload.poll.participants !== 'undefined'){
            for (let i = 0; i < poll.payload.poll.participants.length; i++){
                this.participants ++;
                for (let j = 0; j < poll.payload.poll.participants[i].comments.length; j++){
                    let author = new Author(poll.payload.poll.participants[i]._id, poll.payload.poll.participants[i].name);
                    comments.push(new Comment(poll.payload.poll.participants[i].comments[j]._id, poll.payload.poll.participants[i].comments[j].text, false, poll.payload.poll.participants[i].comments[j].last_changed, author))
                }
            }
            this.participants --;
        }
        AppStore.commit('addAllComment', comments);
    }


    /**
     * method sets the Author for comment system when the author is the creator of the poll
     * @param poll
     */
    async setUpPollCreatorAuthor(poll) {
        let data;
        if (this.creator === true && this.loggedIn) {
            let token = localStorage.getItem('securityToken');
            // @ts-ignore
            data = await new meetz.UserInfoCall({
                token: token, payload: {
                    user_id: this.userID
                }
            }).get();
            AppStore.commit('setUserEx', new Author(poll.payload.poll.participants[0]._id, poll.payload.poll.participants[0].name));
            AppStore.commit('setGivenTimeSlots', poll.payload.poll.participants[0].timeslots);
            this.writeComment = true;
        }
        return data
    }

    /**
     * method sets up the author for comment system when the author has participated in the poll
     * @param poll
     * @param data
     */
    setUpLoggedInAuthor(poll, data){
        let index = poll.payload.poll.participants.findIndex((element) => {
            // @ts-ignore
            return element.user_id === this.userID
        });
        if (index !== -1) {
            AppStore.commit('setUserEx', new Author(poll.payload.poll.participants[index]._id, poll.payload.poll.participants[index].name));
            AppStore.commit('setGivenTimeSlots', poll.payload.poll.participants[index].timeslots);
            this.writeComment = true;
            this.blockParticipate = true;
        }
    }


    /**
     * method sets up the author for comment system when the author has participated in the poll and the author is not logged in
     * @param poll
     * @param participateId
     */
    setUpUnloggedAuthor(poll, participateId){
        let index = poll.payload.poll.participants.findIndex((element) => {
            return element._id === participateId
        });
        if (index !== -1) {
            AppStore.commit('setUserEx', new Author(participateId, poll.payload.poll.participants[index].name));
            AppStore.commit('setGivenTimeSlots', poll.payload.poll.participants[index].timeslots);
            this.blockParticipate = !this.loggedIn;
            this.writeComment = true;
        }
    }
}
