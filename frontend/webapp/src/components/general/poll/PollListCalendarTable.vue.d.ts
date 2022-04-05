import Vue from 'vue';
export default class PollListCalendarTable extends Vue {
    tableHeader: Array<any>;
    tableData: Array<any>;
    tHeader: Array<any>;
    tData: Array<any>;
    search: string;
    strings: any;
    creator: boolean;
    darkeningGeneral: boolean;
    loadData: boolean;
    /**
     * method do the routing to the details of a poll / participate in a poll
     * @param id
     * @param creator
     */
    toPoll(id: any, creator: any): void;
}
