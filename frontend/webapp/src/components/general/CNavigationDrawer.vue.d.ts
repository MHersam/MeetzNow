import Vue from 'vue';
export default class CNavigationDrawer extends Vue {
    drawer: boolean;
    darkeningGeneral: boolean;
    strings: any;
    userID: any;
    items: any;
    /**
     * method set the language of the items in the drawer
     */
    mounted(): void;
    /**
     * to update the strings dynamically we have to watch the strings and set the right language
     * @private
     */
    __change_text_language(): void;
    /**
     * once you are signedIn or Logged in the last item of the drawer should be Logout
     * @private
     */
    __changeLastItem(): void;
}
