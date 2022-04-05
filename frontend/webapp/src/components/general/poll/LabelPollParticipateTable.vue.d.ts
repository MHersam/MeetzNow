import Vue from 'vue';
import { LabelPollParticipateTableData } from "../../../logic/LabelPollParticipateTableData";
export default class LabelPollParticipateTable extends Vue {
    labelPoll: LabelPollParticipateTableData;
    /**
     * method change the color of a label that should be selected, as well change the viewed data, that should be viewed.
     * @param pos
     */
    changeColor(pos: any): void;
    strings: any;
    darkeningGeneral: boolean;
}
