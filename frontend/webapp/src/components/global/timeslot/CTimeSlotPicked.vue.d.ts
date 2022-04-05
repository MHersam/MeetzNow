import Vue from 'vue';
import { FromTo, FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CTimeSlotPicked extends Vue {
    strings: any;
    dialog: boolean;
    sortedTimeSlots: Array<any>;
    editingDate: string;
    minTime: string;
    maxTime: string;
    editFrom: string;
    editTo: string;
    oldTimeSlot: FromTo;
    newTimeSlot: FromTo;
    errorValidation: boolean;
    errorValidationTime: boolean;
    errorValidationMeeting: boolean;
    resizeTop: boolean;
    resizeMoment: any;
    mounted(): void;
    /**
     * if we are resizing at the top we have to recognize it
     */
    resizeStartTop(): void;
    /**
     * once the resizing ends we want to reset the zIndex to make the timeslot right clickable
     * and merge it with the other timeslots
     */
    listenerEnd(): void;
    /**
     * method creates a new timeslot based on the indicator and check if it is valid. Then it kick out the old timeslot before resizing and put in the new one after resizing
     */
    listenerMove(): void;
    startResize(index: any): void;
    readonly height: number;
    readonly marginTop: number;
    /**
     * method is a helping method for the pop up to set custom meeting length
     * @param event
     */
    handler(event: any): void;
    /**
     * method send a message to the parent CPollTable to delete a timeslot from the picked Timeslot array
     */
    deleteTimeSlot(): void;
    /**
     * metod open the editing menu of a timeslot
     */
    openEdit(): void;
    /**
     * method put out the balancing of the available timeslots
     */
    correctSortedTimeSlots(): void;
    /**
     * method sets the new edited timeslot through the menu. It checks if the new timeslot is valid and if so then it kick out the old timeslot before editing
     * and put in and merge the new one
     */
    setTimeSlot(): void;
    momentDiv: MomentDiv;
    fromTo: FromTo;
    color: string;
    zIndex: number;
    slotIndex: number;
    availableTimeslots: FromTo[];
    pickedTimeSlots: FromToArray;
    darkening: boolean;
    timeslot_min_duration: string;
    __watchDialog(): void;
}
