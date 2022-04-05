import {State, StateHandler} from "../State";
import {FromToArray} from "../../util/TimeSlotUtils";

/**
 * this class puts poll creation variables into the Vuex store
 */
@StateHandler()
export class PollCreationState extends State{
    static creator : string = '';

    static title : string = '';

    static displayed_dates : Array<Date> = [];

    static exposing : boolean = false;

    static location : string = '';

    static timeslot_min_duration : string = '';

    static password  : string | undefined = '';

    static cal_start : Date = new Date();

    static cal_end : Date = new Date();

    static cal_timesteps : any = '';

    static color_header : string = "#66ffff";

    static color_content : string = '';

    static color_buttons : string = '';

    static color_text : string = '';

    static logo : string = '';

    static timeslots : any;

    static email_list : Array<any> = [];

    static select_begin : string = '';

    static select_end : string = '';

    static theme : string = '';

    static start_date_poll_date : any = '';

    static end_date_poll_date : any = '';

    static dialog : boolean = false;

    static passwordConfirm : string = '';

    static sharableLink : string = '';

    static latitude : any = 48.78232;

    static longitude : any = 9.17702;

    static mapLocation : Array<any> = [9.17702, 48.78232];

    static mapMarkerLocation : Array<any> = [9.17702, 48.78232];

    static locationResults : Array<any> = [];

    static dialogMap : boolean = false;

    static meetingArray : Array<any> = [];

    static userNameCreation : string | undefined = '';

    static reapeatingPoll : boolean = false;

    static datesTableMoment: FromToArray = new FromToArray([]);
}
