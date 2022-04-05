import Vue from "vue";
import * as moment from "moment";
import { pollNewData } from "../../../logic/pollNewData";
import { FromToArray } from "../../../util/TimeSlotUtils";
import { AddUserCalendarDates } from '../../../logic/AddUserCalendarDates';
export interface IAddDatesSelected {
    moment: moment.Moment;
    date: any;
}
export interface IAddDates {
    picker: {
        date: string;
    };
    activeTab: number;
    selected: IAddDatesSelected;
    selectable: IAddDatesSelected[];
}
export interface ISteps {
    stepper: number;
    ADD_DATES: IAddDates;
}
export default class RPollNew extends Vue {
    resetInput: boolean;
    appStore: any;
    dateTrick: boolean;
    datesTableMoment: FromToArray;
    dataProtection: boolean;
    darkeningGeneral: boolean;
    error: string;
    timeout: number;
    disableElements: boolean;
    showError: boolean;
    userNameCreation: string;
    errorStepOne: boolean;
    errorStepTwo: boolean;
    pollData: pollNewData;
    strings: any;
    userID: string;
    loggedIn: boolean;
    userName: string;
    givenTimeSlots: FromToArray;
    addDates: AddUserCalendarDates;
    creationDone: boolean;
    firstNext: boolean;
    pollEditing: boolean;
    updateTrigger: boolean;
    steps: ISteps;
    readonly hasSelectedDates: boolean;
    /**
     * method put you to the first step
     */
    reset(): void;
    /**
     * method send you to the next step of a stepper and validate the first step
     */
    next(): void;
    /**
     * method create the poll and send it to the backend. After that a conformation pop up is shown
     */
    create(): Promise<void>;
    /**
     * before you send the data to the backend you have to initialize all variables correct in this method
     */
    setCreatingData(): {
        startTime: Date;
        endTime: Date;
        timesteps: number;
        displayedDate: Date[];
    };
    /**
     * after the poll was created from the backend the wrap up has to be done in this method
     */
    setAfterCreatingData(poll_id: any): void;
    /**
     * watch the date picker dates. If the dates are already selected the date will be filtered
     * @private
     */
    __watch_pickerDate(): void;
    /**
     * once a date has changed the date should be added to the store
     * @private
     */
    __check_dates(): void;
    __changeBegin(): void;
    __changeEnd(): void;
    __checker(): void;
    /**
     * if you want to reapeat a poll this method set the dates
     * @private
     */
    __addADD_Dates(): void;
    beforeDestroy(): void;
    mounted(): void;
}
