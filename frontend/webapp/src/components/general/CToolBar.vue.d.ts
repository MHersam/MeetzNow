import Vue from 'vue';
export default class CToolBar extends Vue {
    drawer: object;
    items: Array<any>;
    darkeningGeneral: boolean;
    strings: any;
    loggedIn: boolean;
    userName: string;
    icon: string;
    language: string;
    theme: string;
    themeSwitch: boolean;
    languageDialog: boolean;
    mounted(): void;
    __changeTheme(): void;
    __changeLanguage(): void;
    changeLanguage(): void;
    changeTheme(): void;
    /**
     * method route you to the data protection declaration
     */
    goToDataProtection(): void;
    /**
     * method route you to the legal notice screen
     */
    goToLegalNotice(): void;
    /**
     * method route you to the terms of use
     */
    goToTermsOfUse(): void;
}
