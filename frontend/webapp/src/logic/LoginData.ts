import {ClassStateField, StateModule} from "../store/AppStore";
import firebase from '../../node_modules/firebase/app';
import 'firebase/auth';
import firebaseui from 'firebaseui'
import {config} from '../helpers/firebaseConfig'
import 'firebaseui/dist/firebaseui.css'
import * as meetz from "../../node_modules/meetznow-api-client";
import validator from 'validator';
firebase.initializeApp(config);
let ui;

/**
 * this class wraps the login data
 */
export class LoginData{

    password : string = '';

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.USER)
    loggedInFireBase : boolean;

    @ClassStateField(StateModule.USER)
    loggedIn : boolean;

    @ClassStateField(StateModule.USER)
    userName : string;

    @ClassStateField(StateModule.USER)
    emailFireBase : string;

    @ClassStateField(StateModule.USER)
    icon : string;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.USER)
    id : any;

    email : string = '';
    showPassword : boolean = false;
    emailLogin : boolean = false;

    rules : Object = {
        required: value => !!value || this.strings.ruleFieldNotEmpty,
        min: v => v.length >= 6 || this.strings.rulePasswordMinLength,
    };
    uiConfig : any;

    /**
     * the username field shoudn´t be empty
     */
    public rulesEmail(){
        if(!validator.isEmail(this.email)){
            if(this.email === ''){
                return ''
            } else{
                return this.strings.creationEmailError
            }
        }
    }


    /**
     * method to validate the form, so the email field and the password field
     */
    validateForms(){
        if (!validator.isEmail(this.email)) return false;
        return !(this.password === '' || this.password.length < 6);

    }

    constructor(){

    }

    /**
     * initialize the firebaseconfig
     */
    public firebaseConfig(){
        // initialization for the firebaseui container
        this.uiConfig = {
            signInFlow: 'popup',
            signInSuccessUrl: '/app',
            signInOptions: [
                // the different social logins we're supporting, more can be added or removed here
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID
            ]
        };
        // for single page application ui needs to be reset if it already exists, otherwise it won't render the firebaseui
        // container a second time eg. after logout
        if (ui) {
            ui.reset()
        } else {
            ui = new firebaseui.auth.AuthUI(firebase.auth())
        }
        ui.start('#firebaseui-auth-container', this.uiConfig);
        return true;
    }

    /**
     * method change the view of the component to login with your email adress
     */
    public emailLoggingIn(){
        this.emailLogin = true;
    }

    /**
     * method change the view of the component to the general view
     */
    public backToGeneral(){
        this.emailLogin = false;
    }

    /**
     * method resets the variables when you log out
     */
    public logoutEmail() {
        this.emailLogin = false;
        this.userName = "";
        this.email = "";
        this.icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIciSMJrV_s1mZ0zDxFjFgzBo6vjx3rziEoaPuliZNvkfYV34r";
        this.loggedIn = false;
    }

    async fireBaseLogin(){
        let vm = this;
        /**
         * to make it work
         */
        // listener, triggered, when the user successfully logged in via social login
        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                // apply user values we get from firebase to local vars
                try {

                    user.getIdToken(true).then(async function (idToken) {
                        // @ts-ignore
                        let userFirebase = await new meetz.FirebaseCall({
                            payload: {
                                firebase_token: idToken,
                                email: user.email,
                                firebase_id: user.uid,
                                username: user.displayName,
                            }
                        }).get();
                        localStorage.setItem('userID',userFirebase.payload.user_id);
                        vm.id = userFirebase.payload.user_id;
                        localStorage.setItem('securityToken', userFirebase.payload.token);
                    });
                    vm.loggedIn = true;
                    vm.loggedInFireBase = true;
                    vm.disableElements = false;
                    vm.userName = user.displayName;
                    vm.icon = user.photoURL;
                    vm.emailFireBase = user.email;   
                    localStorage.setItem('firebaselogin', 'loggedIn');
                } catch (e) {
                    vm.error = e.message;
                    setTimeout(function () {
                        vm.error = '';
                        vm.disableElements = false;
                    }, vm.timeout);
                    vm.logoutFireBase();
                }
            }
        })
    }

    /**
     * method resets firebase variable and loggout firebase user
     */
    public logoutFireBase(){
        let vm = this;
        firebase.auth().signOut().then(function() {
            vm.loggedInFireBase = false;
            vm.loggedIn = false;
            vm.userName = "";
            vm.emailFireBase = "";
            vm.icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIciSMJrV_s1mZ0zDxFjFgzBo6vjx3rziEoaPuliZNvkfYV34r";
            localStorage.setItem('firebaselogin', null);
        }, function(error) {
            console.log("logout failed")
        });
    }

}
