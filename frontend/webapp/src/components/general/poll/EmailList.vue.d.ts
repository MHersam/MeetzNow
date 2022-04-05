import Vue from 'vue';
import { pollNewData } from "../../../logic/pollNewData";
export default class EmailList extends Vue {
    pollData: pollNewData;
    strings: any;
    darkeningGeneral: boolean;
}
