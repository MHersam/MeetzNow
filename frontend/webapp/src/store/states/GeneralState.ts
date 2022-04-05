import {State, StateHandler} from "../State";

/**
 * this class puts general variables into the Vuex store
 */
@StateHandler()
export class GeneralState extends State{
    static blur : boolean = false;
    static id : string = '-';
    static darkeningGeneral : boolean = false;
    static darkeningParticipate : boolean = false;
    static language : string = 'German';
    static strings : any = {};
    static error : string = '';
    static showError : boolean = false;
    static bottom : boolean = true;
    static timeout : number = 4000;
    static disableElements : boolean = false;
    static loadData : boolean = false;
    static loadDataObjectPollList : any = {};
    static dataProtection : boolean = false;
    static resetInput : boolean = false;
}
