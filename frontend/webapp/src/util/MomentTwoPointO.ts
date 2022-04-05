import * as moment from "moment";

declare module "moment" {

    export interface Moment {
        roundToFullMin() : moment.Moment;
        adjustToTimeInterval(TimeIntervals, AdjustToIntervalDirection) : moment.Moment;
    }
}

/**
 * Rounds up/down to the next full min.
 */
(moment.fn as any).roundToFullMin = function () : moment.Moment {
    return this.second() >= 30 ? this.add(1, 'minute').startOf('minute') : this.startOf('minute');
};

export const TimeInterval : TimeInterval[] =  [
    5, 10, 15, 30, 60
];

export type TimeInterval = 5 | 10 | 15 | 30 | 60

export enum AdjustToIntervalDirection{
    up, down
}

(moment.fn as any).adjustToTimeInterval = function(interval : TimeInterval, direction : AdjustToIntervalDirection) : moment.Moment{

    const halfIntervalInSec = (interval * 60) / 2;
    this.roundToFullMin();

    if(direction == AdjustToIntervalDirection.down){
        return this.subtract((this.minute() % interval), "m").subtract( halfIntervalInSec, "s")
    } else {
        return this.add((this.minute() % interval), "m").add( halfIntervalInSec, "s")
    }
};

declare global{
    export interface Date {
        toMoment(): moment.Moment;
    }
}

Date.prototype.toMoment = function(){
    return moment(this)
};


