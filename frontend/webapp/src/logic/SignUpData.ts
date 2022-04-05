import {ClassStateField, StateModule} from "../store/AppStore";
import validator from 'validator';

/**
 * class wraps the sign in data
 */
export class SignUpData{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    password : string = '';
    passwordConfirm : string = '';
    email : string = '';
    username : string = '';
    country : string = '';
    company : string = '';
    name : string = '';
    surname : string = '';
    profilePicture : string = '';

    showPassword : boolean = false;
    rules : Object = {
        required: value => !!value || this.strings.ruleFieldNotEmpty,
        min: v => v.length >= 6 || this.strings.rulePasswordMinLength,
    };

    /**
     * method to check if the passwords are equal
     */
    rulesPasswordConfirm(){
        if(!(this.password === this.passwordConfirm)){
            if(this.passwordConfirm === ''){
                return ''
            }
            else {
                return this.strings.rulePasswordSimilar
            }
        }
    }

    rulesUsername : any = [
        (v) => !!v || this.strings.ruleFieldNotEmpty
    ];

    /**
     * method to check if the email is valid
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

    constructor(){

    }

    /**
     * method to validate the first step of the sign in
     */
    public validateForm() {
        if (!validator.isEmail(this.email)) return false;
        if (this.username === '')return false;
        if(!(this.password === this.passwordConfirm)) return false;
        if(this.password.length < 6 || this.password === '') return false;
        return true;
    }

    /**
     * validate if the email of the password forgotten screen is valid
     */
    public validateForgotPassword(){
        return validator.isEmail(this.email);
    }
}
