import Vue from 'vue';
import { PollListData } from "../../../logic/PollListData";
export default class RPollList extends Vue {
    pollList: PollListData;
    darkeningGeneral: boolean;
    userID: any;
    /**
     * if you are not logged in you will be send to the login screen
     */
    mounted(): void;
    strings: any;
}
