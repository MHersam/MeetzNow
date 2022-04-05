import Vue from "vue";
import { FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CTimeSlotOverlayPickedTimeSlot extends Vue {
    momentDiv: MomentDiv;
    pickedTimeSlots: FromToArray;
    color: string;
    zIndex: number;
    availableTimeslots: FromToArray;
    darkening: boolean;
    resizeMoment: any;
}
