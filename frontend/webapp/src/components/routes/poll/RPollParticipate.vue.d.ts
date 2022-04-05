import Vue from 'vue';
import { PollInformationData } from "../../../logic/PollInformationData";
import { PollParticipateData } from "../../../logic/PollParticipateData";
import { FromToArray } from "../../../util/TimeSlotUtils";
export default class RPollParticipate extends Vue {
    heatmapColors: string[];
    colorsBestTimeSlots: Array<string>;
    participantNames: Array<string>;
    participateTimeSlots: FromToArray;
    loggedIn: boolean;
    dialogParticipating: boolean;
    userEx: any;
    pollParticipate: PollParticipateData;
    showPassword: boolean;
    error: string;
    timeout: number;
    disableElements: boolean;
    showError: boolean;
    darkeningParticipate: boolean;
    strings: any;
    loadData: boolean;
    password: string;
    passowordNeeded: boolean;
    blockParticipate: boolean;
    pollInfo: PollInformationData;
    bestTimeSlots: Array<any>;
    bestTimeSlotsFromTo: FromToArray;
    participantsArray: Array<any>;
    created(): void;
    mounted(): void;
    bestTimeSlot(): Promise<void>;
    /**
     * this method maps the map to a array of objects
     */
    mapMapToTimeSlots(value: any, key: any, map: any): void;
    /**
     * method to check if the typed in is correct with the poll password
     */
    passwordCheck(): void;
    __watchDialog(): void;
    __watchPasswordActualisation(): void;
    /**
     * fill the participate timeslots
     */
    __changeParticipateDates(): void;
    __changeBestTimeSlots(): void;
    __watch_dark(): void;
    beforeDestroy(): void;
}
