import Vue from 'vue';
export default class CContent extends Vue {
    strings: any;
    darkeningGeneral: boolean;
    sharableLink: string;
    linkcopied: boolean;
    error: string;
    timeout: number;
    /**
     * method do the routing to the overview of all created polls
     */
    goToView(): void;
    /**
     * once you clicked the link copy button a text will be showed, that the link is copied
     */
    showText(): void;
}
