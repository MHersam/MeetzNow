import Vue from 'vue';
import { FromTo, MomentDiv } from "../../../util/TimeSlotUtils";
export default class CParticipantsTimeSlot extends Vue {
    readonly height: number;
    readonly marginTop: number;
    momentDiv: MomentDiv;
    fromTo: FromTo;
    color: string;
    overlay: boolean;
    participantsSlots: Array<any>;
}
