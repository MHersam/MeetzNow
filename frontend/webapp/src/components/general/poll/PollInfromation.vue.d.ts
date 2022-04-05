import Vue from 'vue';
import { PollInformationData } from "../../../logic/PollInformationData";
export default class PollInformation extends Vue {
    id: string;
    pollInfo: PollInformationData;
    strings: any;
    darkeningParticipate: boolean;
    place: string;
    googleMapsLink: string;
    /**
     * once the component is build we want the data from the backend
     */
    mounted(): void;
}
