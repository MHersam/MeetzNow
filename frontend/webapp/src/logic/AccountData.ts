import * as meetz from "../../node_modules/meetznow-api-client";
import validator from 'validator';
import {StringsUtil} from "../util/StringsUtil";
import {ClassStateField, StateModule} from "../store/AppStore";

/**
 * this class wrap the account data
 */
export class AccountData{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    dialog: boolean = false;

    prename: string = '';

    lastname: string = '';

    username: string = '';

    email: string = '';

    enterprise: string = '';

    country: string = '';

    prenameOld: string = '';

    lastnameOld: string = '';

    usernameOld: string = '';

    emailOld: string = '';

    enterpriseOld: string = '';

    countryOld: string = '';

    oldPassword : string = '';

    oldPasswordFromDB : string = '';

    newPassword : string = '';

    theme : string = '';

    language: string = '';

    @ClassStateField(StateModule.GENERAL)
    loadData : boolean;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.GENERAL)
    showError : boolean;

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

    iconNew : string = '';

    constructor(id){
    }

    /**
     * method request the user data from the backend and fill the variables
     * @param id
     */
    async getData(id){
        try{
            let logIn = localStorage.getItem('firebaselogin');
            if(logIn !== 'loggedIn'){
                let token = localStorage.getItem('securityToken');
                // @ts-ignore
                let data = await new meetz.UserInfoCall({token: token, payload : {
                        user_id: id
                    }}).get();
                let user = data.payload.user;
                this.emailOld = user.email;
                this.usernameOld = user.username;
                this.prenameOld = user.name;
                this.lastnameOld = user.surname;
                if(typeof user.company !== 'undefined')this.enterpriseOld = user.company;
                if(typeof user.country !== 'undefined')this.countryOld = user.country;
            }
        }catch (e) {
            this.error = e.message;
            let self = this;
            setTimeout(function(){
                self.error = '';
            }, this.timeout);
        }
        try {
            if(this.loggedInFireBase){
                this.emailOld = this.emailFireBase;
                this.usernameOld = this.userName;
            }
        }catch (e) {

        }
    }

    /**
     * rules for the email field. An email should contain an at sign and . on the right place
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
     * a user name shoud´t be empty
     */
    rulesUsername : any = [
        (v) => !!v || this.strings.ruleFieldNotEmpty
    ];

    /**
     * the new password should have at least 6 signs
     */
    rulesPassword : Object = {
        required: value => !!value || this.strings.ruleFieldNotEmpty,
        min: v => v.length >= 6 || this.strings.rulePasswordMinLength,
    };

    /**
     * method validate the pop up information
     */
    public validateForm() {
        if (this.username === '') return false;
        if (!validator.isEmail(this.email)) return false;
        if (this.newPassword !== '' && this.newPassword.length < 6)return false;
        return true;
    }

    /**
     * method set the pop up data
     */
    setPopUpData(){
        this.prename = this.prenameOld;
        this.lastname = this.lastnameOld;
        this.username = this.usernameOld;
        this.email = this.emailOld;
        this.enterprise = this.enterpriseOld;
        this.country = this.countryOld;
        this.iconNew = this.icon;
    }

    /**
     * after the data is updated, this method will set the correct values
     */
    async setUpdatedData(id){
        try{
            let token = localStorage.getItem('securityToken');
            let data;
            //if the user dosen´t type in another pw then the pw will not be sent
            if(this.newPassword === ''){
                // @ts-ignore
                data = await new meetz.UpdateUserCall({token: token, payload : {
                        user_id : id,
                        user: {
                            username : this.username,
                            name : this.prename,
                            surname : this.lastname,
                            email : this.email,
                            company : this.enterprise,
                            birthdate : new Date(),
                            gender : '',
                            school : '',
                            profile_image : this.iconNew,
                            country : this.country
                        }
                    }}).get();
            }
            else{
                // @ts-ignore
                data = await new meetz.UpdateUserCall({token: token, payload : {
                        user_id : id,
                        user: {
                            username : this.username,
                            name : this.prename,
                            surname : this.lastname,
                            email : this.email,
                            hash : this.newPassword,
                            company : this.enterprise,
                            birthdate : new Date(),
                            gender : '',
                            school : '',
                            profile_image : this.iconNew,
                            country : this.country
                        }
                    }}).get();
            }
            //set up the updated user data
            let user = data.payload.updated_user;
            this.emailOld = user.email;
            this.usernameOld = user.username;
            this.userName = user.username;
            this.prenameOld = user.name;
            this.lastnameOld = user.surname;
            this.countryOld = user.country;
            this.enterpriseOld = user.company;
            this.icon = user.profile_image;
        }catch (e) {
            this.error = e.message;
            let self = this;
            setTimeout(function(){
                self.error = '';
                self.disableElements = false;
            }, this.timeout);
        }
    }

}
