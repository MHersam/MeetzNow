import Vue from 'vue';
import * as moment from 'moment';
import { FromTo, FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
import { TimeInterval } from "../../../util/MomentTwoPointO";
export interface IMouseEvent {
    type: string;
    layerX: number;
    layerY: number;
    target: {
        scrollHeight: number;
    };
}
export default class CPollTimeSlotPickerCard extends Vue {
    fromTo: FromTo;
    interval: TimeInterval;
    availableTimeslots: FromToArray;
    darkening: boolean;
    backgroundColorFreeTimeSlots: string;
    backgroundColorBlockedTimeSlots: string;
    updateEvent: boolean;
    indexCard: number;
    pickedTimeSlots: FromToArray;
    timeslot_min_duration: string;
    displayedTimes: any[];
    headerHeight: number;
    zIndex: number;
    zIndexTouch: number;
    resizeMoment: any;
    touch: boolean;
    momentDiv: MomentDiv;
    timeIndicator: {
        moment: moment.Moment;
        text: string;
        marginTop: number;
        visibility: string;
    };
    isIndicatorShown: boolean;
    readonly isIndicatorOverAvailableTimeslot: boolean;
    readonly indicatorColor: string;
    readonly isDrawingTimeslotValid: boolean;
    readonly drawingTimeslotAsFromToArray: FromToArray;
    created(): void;
    updated(): void;
    /**
     * Watcher to solve the update problem of the cards
     * @private
     */
    __watch_interval(): void;
    __watch_availbleTimeslots(): void;
    __watch_backgroundFree(): void;
    __watch_backgroundBlocked(): void;
    __watch_darkening(): void;
    __watch_pickedTimeslots(): void;
    __watch_fromTo(): void;
    __watch_meeting(): void;
    __watch_update(): void;
    createCardForInterval(): void;
    setTimeIndicator(value: moment.Moment): void;
    drawingTimeslot: FromTo;
    mouseDownEvent(event: IMouseEvent): void;
    mouseUpEvent(event: IMouseEvent): void;
    private drawingBackwards;
    mouseMoveEvent(event: IMouseEvent): void;
    mouseOverEvent(event: IMouseEvent): void;
    $refs: {
        timeslotselector: any;
        daypickerheader: any;
        interactionLayer: any;
    };
    recalculateHeights(): void;
    mounted(): void;
}
