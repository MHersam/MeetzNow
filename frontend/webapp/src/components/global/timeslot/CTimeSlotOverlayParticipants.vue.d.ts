import Vue from "vue";
import { FromToArray, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CTimeSlotOverlayParticipants extends Vue {
    momentDiv: MomentDiv;
    timeSlots: FromToArray;
    color: string;
    participantsSlots: Array<any>;
}
