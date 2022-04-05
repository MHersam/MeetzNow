import Vue from "vue";
import { FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CTimeSlotOverlayHeatmap extends Vue {
    momentDiv: MomentDiv;
    timeSlots: FromToArray;
    colorHeatmap: Array<string>;
}
