import Vue from 'vue';
export default class FooterPollParticipate extends Vue {
    creator: boolean;
    idPoll: string;
    id: string;
    error: string;
    timeout: number;
    disableElements: boolean;
    dialogDelete: boolean;
    pollEditing: boolean;
    socialShareLink: string;
    /**
     * method route back to the poll list
     */
    goBack(): void;
    strings: any;
    darkeningParticipate: boolean;
    /**
     * method route to the poll creation screen where most of the data will be filled for repeating
     */
    repeat(): void;
    edit(): void;
    /**
     * method do the backend call for deleting a poll after that you will be routed back to the poll list
     */
    deletePoll(): Promise<void>;
}
