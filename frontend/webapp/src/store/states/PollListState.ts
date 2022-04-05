import {State, StateHandler} from "../State";
/**
 * this class puts poll list variables into the Vuex store
 */
@StateHandler()
export class PollListState extends State{

    static continuedPollsTotal : any[] = [];
    static continuedPollsCreated : any[] = [];
    static continuedPollsParticipated : any[] = [];
    static pastPollsTotal : any[] = [];
    static pastPollsCreated : any[] = [];
    static pastPollsParticipated : any[] = [];
    static search : string = '';
    static tab : number = 0;
    static viewedDataContinued : any[] = [];
    static viewedDataPast : any[] = [];
}
