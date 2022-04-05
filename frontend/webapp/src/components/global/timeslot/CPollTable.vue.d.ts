import Vue from 'vue';
import { TimeInterval } from "../../../util/MomentTwoPointO";
import { FromTo, FromToArray } from "../../../util/TimeSlotUtils";
export interface IMouseEvent {
    type: string;
    layerX: number;
    layerY: number;
    target: {
        scrollHeight: number;
    };
}
export interface participateTimeslots {
    participants: Array<string>;
    timeslot: FromTo;
}
export default class CPollTable extends Vue {
    strings: any;
    availableTimeslots: FromToArray;
    resetInput: boolean;
    darkening: boolean;
    givenTimeSlots: FromToArray;
    heatmap: boolean;
    updateEvent: boolean;
    colorsHeatmap: Array<string>;
    heatmapColorSlots: Array<any>;
    participants: Array<participateTimeslots>;
    participantsSlots: Array<any>;
    timeslot_min_duration: string;
    TimeIntervals: TimeInterval[];
    backgroundColorFreeTimeSlots: string;
    backgroundColorBlockedTimeSlots: string;
    pickedTimeSlotsArray: FromToArray[];
    v_model_interval: number;
    interval: TimeInterval;
    pickedTimeSlots: FromToArray;
    /**
     * method to update the v-model when you put in a v-model in the parent, like <CPollTable v-model="array">
     */
    updateVModel(): void;
    /**
     * generates the time limit of a card
     */
    readonly timeSlotPickerCardData: {
        fromTo: FromTo;
        availableTimeslots: FromToArray;
    }[];
    /**
     * once the dark attribute from the parent change, we want to adjust the color of free and blocked time slots here and in all childs
     * @private
     */
    __changeColor(): void;
    /**
     * update the intervals when the selector changed
     */
    __watch_vmodel_interval(index: number): void;
    /**
     * once the picked timeslots change, we want to put in the store
     * @private
     */
    __checkArray(): void;
    /**
     * when the available time slots change, we reset the picked time slots, because this solution is easy.
     * @private
     */
    __deleteTimeSlots(): void;
    /**
     * if the color change then update the heatmap
     * @private
     */
    __watchHeatMap(): void;
    /**
     * if given time slots change update the picked time slots
     * @private
     */
    __watchGivenTimeSlots(): void;
    /**
     * method to put given timeslots in picked time slots array
     */
    prepareGivenTimeSlots(): void;
    /**
     * method do something similar als prepGivenTimeslots and also adds colors and strings for the heatmap
     */
    heatMapPrep(): void;
    /**
     * method to reset all picked time slots
     * @private
     */
    __resetTheInput(): void;
    mounted(): void;
}
