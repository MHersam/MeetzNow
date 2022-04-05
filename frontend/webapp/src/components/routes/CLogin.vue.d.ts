import 'firebase/auth';
import 'firebaseui/dist/firebaseui.css';
import Vue from 'vue';
import { LoginData } from "../../logic/LoginData";
export default class CLogin extends Vue {
    logIn: LoginData;
    strings: any;
    blur: boolean;
    darkeningGeneral: boolean;
    userID: any;
    error: string;
    timeout: number;
    disableElements: boolean;
    loggedInFireBase: boolean;
    icon: string;
    created(): void;
    showError: boolean;
    errorStepOne: boolean;
    interval: any;
    /**
     * method will logout you if you are logged in
     */
    mounted(): void;
    updated(): void;
    beforeDestroy(): void;
    /**
     * method route you to the forgot password screen
     */
    goToForgotPassword(): void;
    /**
     * method route you to the sign up screen
     */
    goToSignIn(): void;
    /**
     * method route you to the home screen
     */
    goToHome(): void;
    /**
     * method logs you in and set some of the user data
     */
    loggingIn(): Promise<void>;
}
