import {ClassStateField, StateModule} from "../store/AppStore";

/**
 * class wraps the user data
 */
export class User{

    @ClassStateField(StateModule.USER)
    firstName : string;

    @ClassStateField(StateModule.USER)
    lastName : string;

    @ClassStateField(StateModule.USER, "id")
    userID : string;

    constructor(){

    }
}
