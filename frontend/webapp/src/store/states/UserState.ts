import {State, StateHandler} from "../State";
/**
 * this class puts user variables into the Vuex store
 */
@StateHandler()
export class UserState extends State{

    static loggedInFireBase : boolean = false;
    static loggedIn : boolean = false;
    static firebaseUID : string = "";
    static userName : string = "";
    static id : any | undefined = null;
    static icon : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIciSMJrV_s1mZ0zDxFjFgzBo6vjx3rziEoaPuliZNvkfYV34r";
    static emailFireBase : string = '';
}
