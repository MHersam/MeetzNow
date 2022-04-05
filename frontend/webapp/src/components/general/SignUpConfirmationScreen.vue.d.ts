import Vue from 'vue';
export default class CContent extends Vue {
    strings: any;
    interval: any;
    darkeningGeneral: boolean;
    /**
     * method do the routing to home screen
     */
    goToHome(): void;
    /**
     * method show the screen 3 seconds and then route to the home screen
     */
    mounted(): void;
    /**
     * reset the interval to it is not sending you to the home screen
     */
    beforeDestroy(): void;
}
