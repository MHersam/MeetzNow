import Vuex from "vuex";
import {UserState} from "./states/UserState";
import Vue from "vue";
import {GeneralState} from "./states/GeneralState";
import {AppState} from "./states/AppState";
import {PollListState} from "./states/PollListState";
import {PollInformationState} from "./states/PollInformationState";
import {CommentManagerState} from "./states/CommentManagerState";
import {PollParticipateState} from "./states/PollParticipateState";
import {PollCreationState} from "./states/PollCreationState";
import {Author} from "../logic/Author";
import {FromTo, FromToArray} from "../util/TimeSlotUtils";
import * as moment from "moment";
import {serverBus} from "../main";

Vue.use(Vuex);

/**
 * All the namespaces for the modules
 */
export const enum StateModule {
    USER = "USER",
    GENERAL = "GENERAL",
    APP = "APP",
    POLLLIST = "POLLLIST",
    POLLINFORMATION = "POLLINFORMATION",
    COMMENTMANAGER = "COMMENTMANAGER",
    POLLPARTICIPATE = "POLLPARTICIPATE",
    POLLCREATION = "POLLCREATION"
}

export const AppStore = new Vuex.Store({

    strict : process.env.NODE_ENV === "development",

    /**
     * Register a new module here
     *
     * MYMODULE : new MyModule().state
     */
    modules : {
        USER : new UserState().state,
        GENERAL : new GeneralState().state,
        APP : new AppState().state,
        POLLLIST: new PollListState().state,
        POLLINFORMATION : new PollInformationState().state,
        COMMENTMANAGER : new CommentManagerState().state,
        POLLPARTICIPATE : new PollParticipateState().state,
        POLLCREATION : new PollCreationState().state
    },

    /**
     * since you can only put primitive variables into the vuex and do get() and set() methods you have to put all other variables into the state attribute
     */
    state: {
        email_list: [],
        continuedPollsTotal: [],
        continuedPollsCreated: [],
        continuedPollsParticipated: [],
        pastPollsTotal: [],
        pastPollsCreated: [],
        pastPollsParticipated: [],
        viewedDataContinued: [],
        viewedDataPast: [],
        comments: [],
        loadDataObjectPollList : {ready0: false, ready1: false, ready2: false, ready3: false, ready4: false, ready5: false},
        meetingArray: [],
        userEx: new Author(0, 'Pads'),
        timeSlotsCreated: [],
        participateTimeSlots: new FromToArray([]),
        timeSlotDates: new FromToArray([]),
        givenTimeSlots : new FromToArray([]),
        heatMapDates : new FromToArray([]),
        participantArray : []
    },

    /**
     * if you want to mutate state variables you have to write methods that set the variables
     */
    mutations: {
        setParticipants(state, array){
          state.participantArray = [];
          state.participantArray = array;
        },
        setHeatMap(state, array){
            state.heatMapDates = new FromToArray([]);
            state.heatMapDates = array;
        },
        setRepeatingTimeSlotDates(state, object){
            state.timeSlotDates = new FromToArray([]);
            for(let i = 0; i < object.dates.length; i++) {
                let startDate : any = new Date(object.dates[i]);
                // @ts-ignore
                startDate = new Date(startDate.setHours(parseInt(new Date(object.begin).getHours()), parseInt(new Date(object.begin).getMinutes()), 0));
                let endDate : any = new Date(object.dates[i]);
                // @ts-ignore
                endDate = new Date(endDate.setHours(parseInt(new Date(object.end).getHours()), parseInt(new Date(object.end).getMinutes()), 0));
                state.timeSlotDates.push(FromTo.fromObject({from: moment(startDate, "YYYY-M-D H:MM"), to: moment(endDate, "YYYY-M-D H:MM")}));
            }
        },
        changeTimeSlotDates(state, object){
            state.timeSlotDates = new FromToArray([]);
            for(let i = 0; i < object.dates.length; i++) {
                let startDate : any = new Date(object.dates[i].date);
                startDate = new Date(startDate.setHours(parseInt(object.begin.split(':')[0]), parseInt(object.begin.split(':')[1]), 0));
                let endDate : any = new Date(object.dates[i].date);
                endDate = new Date(endDate.setHours(parseInt(object.end.split(':')[0]), parseInt(object.end.split(':')[1]), 0));
                state.timeSlotDates.push(FromTo.fromObject({from: moment(startDate, "YYYY-M-D H:MM"), to: moment(endDate, "YYYY-M-D H:MM")}))
            }
        },
        changeSingleTimeSlotDate(state, object){
            let startDate : any = new Date(object.date);
            startDate = new Date(startDate.setHours(parseInt(object.begin.split(':')[0]), parseInt(object.begin.split(':')[1]), 0));
            let endDate : any = new Date(object.date);
            endDate = new Date(endDate.setHours(parseInt(object.end.split(':')[0]), parseInt(object.end.split(':')[1]), 0));
            state.timeSlotDates.push(FromTo.fromObject({from: moment(startDate, "YYYY-M-D H:MM"), to: moment(endDate, "YYYY-M-D H:MM")}))
        },
        changeSingleTimeSlotDateDelete(state, array){
            for (let i = 0; i < state.timeSlotDates.length; i++){
                let index = array.findIndex((element) => {
                    return element.moment.format("DD.MM.YY") === state.timeSlotDates.value[i].from.format("DD.MM.YY")
                });
                if(index === -1){
                    state.timeSlotDates.value.splice(i , 1);
                }
            }
            serverBus.$emit('adjustPickedTimeSlots');
        },
        changeTimeSlotTime(state, object){
          for (let i = 0; i < state.timeSlotDates.length; i++){
              state.timeSlotDates.value[i].from = state.timeSlotDates.value[i].from.hour(parseInt(object.start.split(":")[0]));
              state.timeSlotDates.value[i].from = state.timeSlotDates.value[i].from.minute(parseInt(object.start.split(":")[1]));
              state.timeSlotDates.value[i].to = state.timeSlotDates.value[i].to.hour(parseInt(object.end.split(":")[0]));
              state.timeSlotDates.value[i].to = state.timeSlotDates.value[i].to.minute(parseInt(object.end.split(":")[1]));
          }
            serverBus.$emit('adjustPickedTimeSlots');
        },
        resetTimeSlotDates(state){
            state.timeSlotDates = new FromToArray([]);
        },
        changeTimeSlotDatesCalendar(state, dates){
            state.timeSlotDates = new FromToArray([]);
            for(let i = 0; i < dates.length; i++) {
                state.timeSlotDates.push(FromTo.fromObject({from: moment(dates[i].from, "YYYY-M-D H:MM"), to: moment(dates[i].to, "YYYY-M-D H:MM")}))
            }
            serverBus.$emit('updateTimeSlotDates')
        },
        setTimeSlots(state, array){
            state.timeSlotsCreated = [];
            for(let i = 0; i < array.length; i++){
                try {
                    for(let j = 0; j < array[i].length; j++){
                        state.timeSlotsCreated.push({start_date: array[i].value[j].from.toDate(), end_date: array[i].value[j].to.toDate()});
                    }
                }catch (e) {

                }
            }
        },
        setParticipateTimeSlots(state, timeSlots){
            let minHours : any = 24;
            let minMinutes : any = 60;
            let maxHours : any = 0;
            let maxMinutes : any = 0;

            for(let i = 0; i < timeSlots.length; i++) {
                let newMinHours = new Date(timeSlots[i].start_date).getHours();
                let newMinMinutes = new Date(timeSlots[i].start_date).getMinutes();
                let newMaxHours = new Date(timeSlots[i].end_date).getHours();
                let newMaxMinutes = new Date(timeSlots[i].end_date).getMinutes();
                if(newMinHours*60+newMinMinutes < minHours*60+minMinutes){
                    minMinutes = newMinMinutes;
                    minHours = newMinHours;
                }
                if(newMaxHours*60+newMaxMinutes >= maxHours*60+maxMinutes){
                    maxMinutes = newMaxMinutes;
                    maxHours = newMaxHours;
                }
            }

            state.participateTimeSlots = new FromToArray([]);
            for(let i = 0; i < timeSlots.length; i++) {
                let startDate : any = new Date(timeSlots[i].start_date);
                let endDate : any = new Date(timeSlots[i].end_date);
                let minTime : any = new Date(timeSlots[i].start_date);
                let maxTime : any = new Date(timeSlots[i].start_date);
                minTime = new Date(minTime).setHours(minHours);
                minTime = new Date(minTime).setMinutes(minMinutes);
                minTime = new Date(minTime);
                maxTime = new Date(maxTime).setHours(maxHours);
                maxTime = new Date(maxTime).setMinutes(maxMinutes);
                maxTime = new Date(maxTime);
                state.participateTimeSlots.push(FromTo.fromObject({from: moment(startDate, "YYYY-M-D H:MM"), to: moment(endDate, "YYYY-M-D H:MM")}));
                state.participateTimeSlots.push(FromTo.fromObject({from: moment(minTime, "YYYY-M-D H:MM"), to: moment(minTime, "YYYY-M-D H:MM")}));
                state.participateTimeSlots.push(FromTo.fromObject({from: moment(maxTime, "YYYY-M-D H:MM"), to: moment(maxTime, "YYYY-M-D H:MM")}));
            }
            serverBus.$emit('updatedParticipatedTimeSlots');
        },
        resetParticipantTimeSlots(state, slots){
            state.participateTimeSlots = new FromToArray([]);
        },
        setGivenTimeSlots(state, timeSlots){
            state.givenTimeSlots = new FromToArray([]);
            for(let i = 0; i < timeSlots.length; i++) {
                let startDate : any = new Date(timeSlots[i].start_date);
                let endDate : any = new Date(timeSlots[i].end_date);
                state.givenTimeSlots.push(FromTo.fromObject({from: moment(startDate, "YYYY-M-D H:MM"), to: moment(endDate, "YYYY-M-D H:MM")}));
            }
            state.givenTimeSlots.value.sort(function (a, b) {
                return a.from.toDate().getTime() - b.from.toDate().getTime()
            })
        },
        setGivenTimeSlotsCalendar(state, timeSlots){
            state.givenTimeSlots = new FromToArray([]);
            for(let i = 0; i < timeSlots.length; i++) {
                let startDate : any = new Date(timeSlots[i].from);
                let endDate : any = new Date(timeSlots[i].to);
                state.givenTimeSlots.push(FromTo.fromObject({from: moment(startDate, "YYYY-M-D H:MM"), to: moment(endDate, "YYYY-M-D H:MM")}));
            }
            state.givenTimeSlots.value.sort(function (a, b) {
                return a.from.toDate().getTime() - b.from.toDate().getTime()
            });
        },
        resetGivenTimeSlots(state){
            state.givenTimeSlots = new FromToArray([]);
        },
        setUserEx(state, author){
          state.userEx = author
        },
        fillMeetingArray(state, meeting){
            for(let i = 0; i < state.meetingArray.length; i++){
                state.meetingArray.splice(0, 1);
            }
            for(let i = 0; i < meeting.length; i++){
                state.meetingArray.push(meeting[i])
            }
            state.meetingArray.sort(function (a, b) {
                return (parseInt(a.split(":")[0])*60 + parseInt(a.split(":")[1])) - (parseInt(b.split(":")[0]) * 60 + parseInt(b.split(":")[1]))
            })
        },
        addMeetingTime(state, time){
            state.meetingArray.push(time);
            state.meetingArray.sort(function (a, b) {
                return (parseInt(a.split(":")[0])*60 + parseInt(a.split(":")[1])) - (parseInt(b.split(":")[0]) * 60 + parseInt(b.split(":")[1]))
            })
        },
        addEmail(state, email){
            state.email_list.push(email)
        },
        deleteEmail(state, index){
            state.email_list.splice(index, 1)
        },
        addContinuedPollsTotal(state, polls){
            for(let i = 0; i < state.continuedPollsTotal.length; i++){
                state.continuedPollsTotal.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < polls.length; i++){
                state.continuedPollsTotal.push(polls[i])
            }
            for(let i = 0; i < state.continuedPollsTotal.length; i++){
                for(let j = i+1; j < state.continuedPollsTotal.length; j++){
                    if(state.continuedPollsTotal[i].id === state.continuedPollsTotal[j].id){
                        state.continuedPollsTotal.splice(j, 1);
                        j = i;
                    }
                }
            }
        },
        addContinuedPollsCreated(state, polls){
            for(let i = 0; i < state.continuedPollsCreated.length; i++){
                state.continuedPollsCreated.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < polls.length; i++){
                state.continuedPollsCreated.push(polls[i])
            }
            for(let i = 0; i < state.continuedPollsCreated.length; i++){
                for(let j = i+1; j < state.continuedPollsCreated.length; j++){
                    if(state.continuedPollsCreated[i].id === state.continuedPollsCreated[j].id){
                        state.continuedPollsCreated.splice(j, 1);
                        j = i;
                    }
                }
            }
        },
        addContinuedPollsParticipated(state, polls){
            for(let i = 0; i < state.continuedPollsParticipated.length; i++){
                state.continuedPollsParticipated.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < polls.length; i++){
                state.continuedPollsParticipated.push(polls[i])
            }
            for(let i = 0; i < state.continuedPollsParticipated.length; i++){
                for(let j = i+1; j < state.continuedPollsParticipated.length; j++){
                    if(state.continuedPollsParticipated[i].id === state.continuedPollsParticipated[j].id){
                        state.continuedPollsParticipated.splice(j, 1);
                        j = i;
                    }
                }
            }
        },
        addPastPollsTotal(state, polls){
            for(let i = 0; i < state.pastPollsTotal.length; i++){
                state.pastPollsTotal.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < polls.length; i++){
                state.pastPollsTotal.push(polls[i]);
            }
            for(let i = 0; i < state.pastPollsTotal.length; i++){
                for(let j = i+1; j < state.pastPollsTotal.length; j++){
                    if(state.pastPollsTotal[i].id === state.pastPollsTotal[j].id){
                        state.pastPollsTotal.splice(j, 1);
                        j = i;
                    }
                }
            }
        },
        addPastPollsCreated(state, polls){
            for(let i = 0; i < state.pastPollsCreated.length; i++){
                state.pastPollsCreated.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < polls.length; i++){
                state.pastPollsCreated.push(polls[i])
            }
            for(let i = 0; i < state.pastPollsCreated.length; i++){
                for(let j = i+1; j < state.pastPollsCreated.length; j++){
                    if(state.pastPollsCreated[i].id === state.pastPollsCreated[j].id){
                        state.pastPollsCreated.splice(j, 1);
                        j = i;
                    }
                }
            }
        },
        addPastPollsParticipated(state, polls){
            for(let i = 0; i < state.pastPollsParticipated.length; i++){
                state.pastPollsParticipated.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < polls.length; i++){
                state.pastPollsParticipated.push(polls[i])
            }
            for(let i = 0; i < state.pastPollsParticipated.length; i++){
                for(let j = i+1; j < state.pastPollsParticipated.length; j++){
                    if(state.pastPollsParticipated[i].id === state.pastPollsParticipated[j].id){
                        state.pastPollsParticipated.splice(j, 1);
                        j = i;
                    }
                }
            }
        },
        addAllComment(state, comments){
            for(let i = 0; i < state.comments.length; i++){
                state.comments.splice(0, 1);
                i = -1;
            }
            for(let i = 0; i < comments.length; i++){
                state.comments.push(comments[i])
            }
            state.comments.sort(function (a, b) {
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            })
        },
    }
});



/**
 * @decorator
 *
 * With this decorator you can map any property in a normal class to a stored value in the Store.
 * If you call the get/set the property the get/set function is going to be replaced with getters/setters
 * stored in the DecoratorFactory.
 *
 * Has to stay in this file to avoid circular dependencies. (needs AppStore instance)
 *
 * @param namespace - namespace representing a StateModule
 * @param fieldName - a override for the key if the variable is local key is called different
 */
export function ClassStateField(namespace : StateModule, fieldName? : string) {
    return function (target : any, key : string | symbol) {
        const keyName =  fieldName ? namespace.toString() + "/" + fieldName.toString() : namespace.toString() + "/" + key.toString();

        const getter = function () {
            return AppStore.getters[keyName];
        };

        const setter = function (value) {
            AppStore.commit(keyName, value);
        };

        return {
            get : getter,
            set : setter
        } as any;
    }
}
