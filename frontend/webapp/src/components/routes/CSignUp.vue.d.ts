import Vue from 'vue';
import { SignUpData } from "../../logic/SignUpData";
export interface ISteps {
    stepper: number;
}
export default class CSignUp extends Vue {
    signUp: SignUpData;
    strings: any;
    userID: any;
    error: string;
    timeout: number;
    disableElements: boolean;
    created(): void;
    showError: boolean;
    bottom: boolean;
    creationDone: boolean;
    steps: ISteps;
    blur: boolean;
    darkeningGeneral: boolean;
    dataProtection: boolean;
    errorStepOne: boolean;
    loggedIn: boolean;
    userName: string;
    icon: string;
    backgroundImage: string;
    mounted(): void;
    beforeDestroy(): void;
    goToLogin(): void;
    /**
     * method signs you up and route you the home screen afterward
     */
    goToHome(): Promise<void>;
    /**
     * method put you to the next step
     */
    next(): void;
    goBack(): void;
}
