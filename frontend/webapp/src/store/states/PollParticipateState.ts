import {State, StateHandler} from "../State";
import {Author} from "../../logic/Author";
import {FromToArray} from "../../util/TimeSlotUtils";
/**
 * this class puts poll participate variables into the Vuex store
 */
@StateHandler()
export class PollParticipateState extends State{

    static username : string = '';
    static creator : boolean = false;
    static pollResultPublic : boolean = true;
    static travelTime : string = '';
    static userEx : any = new Author(0, 'Pads');
    static writeComment : boolean = false;
    static passowordNeeded : boolean = false;
    static participateTimeSlots : FromToArray = new FromToArray([]);
    static givenTimeSlots : FromToArray = new FromToArray([]);
    static blockParticipate : boolean = false;
    static dialogParticipating : boolean = false;
    static start_date_poll : any = new Date();
    static end_date_poll : any = new Date();
    static bestTimeSlotsFromTo : FromToArray = new FromToArray([]);
    static pollEditing : boolean = false;
    static participantsArray : Array<any>= [];
}
