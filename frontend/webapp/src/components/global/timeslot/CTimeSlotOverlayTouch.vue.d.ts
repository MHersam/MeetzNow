import Vue from "vue";
import { FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CTimeSlotOverlayTouch extends Vue {
    momentDiv: MomentDiv;
    timeSlots: FromToArray;
    color: string;
    darkening: boolean;
    availableTimeslots: FromToArray;
    colorFreeTimeSlots: string;
    zIndexTouch: number;
}
