import {State, StateHandler} from "../State";
/**
 * this class puts poll information variables into the Vuex store
 */
@StateHandler()
export class PollInformationState extends State{

    static date : any = 'Kein Datum festgelegt';
    static event : string = 'Kein Ereignis festgelegt';
    static time: string = 'Keine Uhrzeit festgelegt';
    static place : string = 'Kein Ort festgelegt';
    static participants : number = 0;
    static creatorName : string = 'Kein Ersteller festgelegt';
    static theme : string = 'Kein Thema festgelegt';
    static password : string = '';
    static headerColor : string = '';
    static logo : string = '';
    static exposing : boolean = false;
}
