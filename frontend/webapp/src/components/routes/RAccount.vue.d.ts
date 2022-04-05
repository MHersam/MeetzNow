import Vue from 'vue';
import { AccountData } from "../../logic/AccountData";
export default class RAccount extends Vue {
    darkeningGeneral: boolean;
    userID: any;
    errorStepOne: boolean;
    strings: any;
    loadData: boolean;
    error: string;
    timeout: number;
    disableElements: boolean;
    icon: string;
    loggedInFireBase: boolean;
    accountData: AccountData;
    dialog: boolean;
    dialogDelete: boolean;
    /**
     * this method send the updated data to the backend
     */
    updateData(): Promise<void>;
    /**
     * this method close the pop up where you can edit your information and reset the variables to the old values
     */
    resetVariables(): void;
    /**
     * method delete the user and route you to the login sreen
     */
    deleteAccount(): Promise<void>;
    /**
     * this method initialize the pop up
     */
    setPopUp(): void;
    /**
     * here will the account data loaded and the language as well as the theme set.
     */
    mounted(): void;
    updated(): void;
}
