import Vue from 'vue';
import { pollNewData } from "../../../logic/pollNewData";
export default class PollCreationConfirmation extends Vue {
    pollData: pollNewData;
    strings: any;
    userID: string;
    showPassword: boolean;
    darkeningGeneral: boolean;
    loggedIn: boolean;
}
