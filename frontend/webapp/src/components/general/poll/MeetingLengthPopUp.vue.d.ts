import Vue from 'vue';
import { pollNewData } from "../../../logic/pollNewData";
export default class MeetingLengthPopUp extends Vue {
    pollData: pollNewData;
    strings: any;
    /**
     * method close the pop up and set the meeting length time
     */
    close(): void;
    darkeningGeneral: boolean;
}
