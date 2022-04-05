import Vue from "vue";
export default class RHome extends Vue {
    darkeningGeneral: boolean;
    strings: any;
    /**
     * method route you to the creating poll screen
     */
    goToNewPoll(): void;
    /**
     * method route you to the poll list screen
     */
    goToList(): void;
    /**
     * method route you to the account screen
     */
    goToAccount(): void;
}
