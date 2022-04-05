import Vue from 'vue';
import { PollParticipateButtonData } from "../../../logic/PollParticipateButtonData";
import { FromToArray } from "../../../util/TimeSlotUtils";
import { AddUserCalendarDates } from "../../../logic/AddUserCalendarDates";
export default class CContent extends Vue {
    loggedIn: boolean;
    id: string;
    resetInput: boolean;
    appStore: any;
    dialogParticipating: boolean;
    writeComment: boolean;
    participateTimeSlots: FromToArray;
    givenTimeSlots: FromToArray;
    error: string;
    timeout: number;
    disableElements: boolean;
    dataProtection: boolean;
    username: string;
    travelTime: string;
    place: string;
    password: string;
    userID: string;
    name: string;
    home: string;
    addDates: AddUserCalendarDates;
    strings: any;
    darkeningParticipate: boolean;
    errorStepOne: boolean;
    errorStepTwo: boolean;
    pollButton: PollParticipateButtonData;
    userEx: any;
    participants: number;
    blockParticipate: boolean;
    timeslot_min_duration: string;
    errorVoteStart: boolean;
    errorVoteEnd: boolean;
    dates: Array<any>;
    /**
     * here the data to participate is sent to the backend
     */
    participate(): Promise<void>;
    participateEditing(): Promise<void>;
    participateFirstTime(): Promise<void>;
    getPoll(participantID: any): Promise<void>;
    /**
     * method set the error message which will be shown in the snackbar in the App.vue
     */
    showError(e: any): void;
    /**
     * after we receive data from the backend after we have participated, we need to update the shown data, like comments, participant number and set the author for writing comments
     */
    fillDataAfterParticipating(poll: any, participantID: any): void;
    /**
     * method close the pop up and reset the error message
     */
    resetVariables(): void;
    /**
     * this method calculate the travel time to the location where the meeting should take place
     */
    calculateTravelingTime(): void;
    /**
     * fill the participate timeslots
     */
    __changeParticipateDates(): void;
    __changeGivenTimeSlots(): void;
    /**
     * show data protection advice
     */
    __showDataMessage(): void;
    /**
     * you should only participate in the poll at the voting start day at 0:00:00 to the voting end day at 23:59:00
     * @private
     */
    __setRightTimeFrame(): void;
    beforeDestroy(): void;
}
