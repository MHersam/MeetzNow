import Vue from 'vue';
import { FromToArray } from "../../../util/TimeSlotUtils";
export default class ColorVisualisationPollParticipate extends Vue {
    strings: any;
    darkeningParticipate: boolean;
    participateTimeSlots: FromToArray;
    participantTotal: number;
    heatmapColors: string[];
    uniqueParticipantArray: Array<any>;
    percentageArray: any[];
    percentage: number[];
    __adjustNumbers(): void;
    mounted(): void;
    adjustNumbers(): void;
    __watch_dark(): void;
    /**
     * fill the participate timeslots
     */
    __changeParticipateDates(): void;
}
