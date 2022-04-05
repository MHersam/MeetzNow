import Vue from 'vue';
import { pollNewData } from "../../../logic/pollNewData";
export default class PollNewGeneral extends Vue {
    strings: any;
    pollData: pollNewData;
    loadData: boolean;
    darkeningGeneral: boolean;
    disableElements: boolean;
    resetInput: boolean;
    /**
     * method is called when the component is created. Operations are necessary for repeating / editing a poll.
     */
    created(): void;
    /**
     * method is a helping method for the pop up to set custom meeting length
     * @param event
     */
    handler(event: any): void;
    /**
     * method adjust the voting start date
     * @private
     */
    __start_Date_Update(): void;
    /**
     * method adjust the voting end date
     * @private
     */
    __end_Date_Update(): void;
    /**
     * reset the input of timeslots after meeting length has changed
     */
    __resetTimeSlots(): void;
}
