import Vue from 'vue';
import { SignUpData } from "../../logic/SignUpData";
export default class CForgotPassword extends Vue {
    strings: any;
    signUp: SignUpData;
    show: boolean;
    blur: boolean;
    darkeningGeneral: boolean;
    errorStepOne: boolean;
    beforeMount(): void;
    beforeDestroy(): void;
    /**
     * method show the conformation that you have requested your password
     */
    showIt(): void;
    /**
     * method do the routing to the home screen
     */
    goToHome(): void;
    /**
     * method do the routing to the sign up screen
     */
    goToSignIn(): void;
    /**
     * here the request is sent to the backend
     */
    sendNewPassword(): Promise<void>;
}
