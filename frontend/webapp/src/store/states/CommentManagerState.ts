import {State, StateHandler} from "../State";

/**
 * this class saves all variables for comment state
 */
@StateHandler()
export class CommentManagerState extends State{

    static comments : Array<any> = [];
    static state : string = "default";
    static text : string;
}
