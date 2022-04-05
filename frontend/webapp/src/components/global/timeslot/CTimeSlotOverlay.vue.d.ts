import Vue from "vue";
import { FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CTimeSlotOverlay extends Vue {
    momentDiv: MomentDiv;
    timeSlots: FromToArray;
    color: string;
}
