import {ClassStateField, StateModule} from "../store/AppStore";

/**
 * this class fill the data for selection in creating a poll in the pollNewGeneral Component
 */
export class pollDataFillerFunctions{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    constructor(){
    }

    /**
     * method fill the time selection array where you can select your begin of your timeslot and the end
     */
    public fillSelectionTime () {
        let hour = 0;
        let minutes = 0;
        let time = [];
        for (let i = 0; i < 2 * 24; i++) {
            if (minutes === 0) time.push(hour + ':' + minutes + '0');
            else time.push(hour + ':' + minutes);
            minutes += 30;
            if (i !== 0 && minutes % 60 === 0) hour++;
            if (minutes % 60 === 0) minutes = 0
        }
        time.push('23:59');
        time.push('24:00');
        return time
    }

    /**
     * method fill the data in the meeting time array
     */
    public fillMeetingArray(){
        let hour = 0;
        let minutes = 15;
        let meeting = [];
        for (let i = 0; i < 4 * 24; i++) {
            if (minutes === 0) meeting.push(hour + ':' + minutes + '0');
            else meeting.push(hour + ':' + minutes);
            minutes += 15;
            if (minutes % 60 === 0) hour++;
            if (minutes % 60 === 0) minutes = 0
        }
        return meeting
    }

    /**
     * method fill the time steps, which the time picker card is displayed
     */
    public fillTimeStepArray(){
        return ['0:15', '0:30', '1:00']
    }

    /**
     * method fill the theme array
     */
    public fillThemeArray(){
        return [this.strings.themeLight, this.strings.themeDark]
    }
}
