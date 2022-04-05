import {ClassStateField, StateModule} from "../store/AppStore";

/**
 * class wraps the participate data
 */
export class PollParticipateData{

    @ClassStateField(StateModule.POLLPARTICIPATE)
    username : string;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    creator : boolean;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    userEx : any;

    constructor(){

    }
}
