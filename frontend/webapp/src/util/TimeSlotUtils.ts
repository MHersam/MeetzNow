import * as moment from "moment";
import {TimeInterval} from "./MomentTwoPointO"

export class MomentDiv{
    public fromTo : FromTo;
    public height : number;


    constructor(fromTo: FromTo, height: number) {
        this.fromTo = fromTo;
        this.height = height;
    }

    containsFromTo(fromTo : FromTo){
        return this.fromTo.containsFromTo(fromTo)
    }

    contains(m : moment.Moment){
        return this.fromTo.contains(m)
    }

    getMomentFor(position : number) : moment.Moment{
        const startTimeUnix = this.fromTo.from.valueOf();
        const totalTimeUnix = this.fromTo.to.valueOf() - startTimeUnix;

        const timeFromStartUnix = totalTimeUnix * (position / this.height);

        return moment(startTimeUnix + timeFromStartUnix);
    }

    getPositionFor(m: moment.Moment){
        const startTimeUnix = this.fromTo.from.valueOf();
        const totalTimeUnix = this.fromTo.to.valueOf() - startTimeUnix;

        return Math.round(this.height * ((m.valueOf() - startTimeUnix) / totalTimeUnix))
    }

    getStartEnd(fromTo : FromTo){
        const startTimeUnix = this.fromTo.from.valueOf();
        const totalTimeUnix = this.fromTo.to.valueOf() - startTimeUnix;

        return {
            start : Math.round(this.height * ((fromTo.from.valueOf() - startTimeUnix) / totalTimeUnix)),
            end : Math.round(this.height * ((fromTo.to.valueOf() - startTimeUnix) / totalTimeUnix))
        };
    }
}

export class FromTo {
    public from : moment.Moment;
    public to : moment.Moment;

    constructor(from: moment.Moment, to: moment.Moment){
        this.from = from;
        this.to = to;
    }

    static fromObject(obj : {from : moment.Moment, to : moment.Moment}){
        return new FromTo(obj.from, obj.to)
    }

    isValid(){
        return this.from.isBefore(this.to)
    }

    contains(moment : moment.Moment) : boolean{
        return moment.isSame(this.from) || moment.isSame(this.to) || moment.isBetween(this.from, this.to)
    }

    containsFromTo(fromTo : FromTo){
        return this.contains(fromTo.from) && this.contains(fromTo.to)
    }

    clone() : FromTo {
        return new FromTo(this.from.clone(), this.to.clone());
    }
}

export class FromToArray{

    public value : FromTo[];

    constructor(value? : FromTo[]) {
        this.value = value || [];
    }

    get length(){
        this.value.entries()
        return this.value.length
    }

    push(item : FromTo){
        this.value.push(item)
    }

    matching(moment : moment.Moment) : FromTo[]{
        return this.value.filter(value => value.contains(moment))
    }

    matchingFirst(moment : moment.Moment) : FromTo | null {
        const result = this.value.filter(v => v.contains(moment));
        return result.length > 0 ? result[0] : null
    }

    removeIf(filter : (value : FromTo) => boolean){
        for(const v of this.value){
            console.log("V:" + v.from.toISOString() + filter(v));
            if(filter(v)) this.value.splice(this.value.indexOf(v), 1)
        }
    }

    contains(moment : moment.Moment) : boolean{
        return this.matching(moment).length > 0;
    }
    getArraysPerDay() : Array<FromToArray>{
        if(this.value.length == 0) return[new FromToArray()];

        const arr = this.clone().value.sort((a, b) => { return moment.utc(a.from.valueOf()).diff(moment.utc(b.from.valueOf()))});
        const sorted = [];
        let current = new FromToArray();

        for (const m of arr){
            if(current.length === 0){
                current.push(m);
            } else{
                if(current.value[0].from.isSame(m.from, "day"))
                    current.push(m);
                else {
                    sorted.push(current);
                    current = new FromToArray();
                    current.push(m)
                }
            }
        }

        sorted.push(current);

        return sorted;
    }


    pushAndMerge(fromTo : FromTo) {
        fromTo = fromTo.clone();
        if(this.isEmpty()){
            this.push(fromTo);
            return;
        }

        const matchingFrom = this.matchingFirst(fromTo.from);
        const matchingTo = this.matchingFirst(fromTo.to);

        this.removeIf(v => fromTo.contains(v.from) && fromTo.contains(v.to));

        if (matchingFrom && matchingTo && matchingFrom === matchingTo ) {
            //don't add it"
        } else if(!matchingFrom  && !matchingTo)
            this.push(fromTo);
        else if (matchingFrom && matchingTo) {
            console.log("merge");
            const timeslot = FromTo.fromObject({
                from: matchingFrom.from.clone(),
                to: matchingTo.to.clone()
            });

            this.removeIf(value => {
                return timeslot.contains(value.from) || timeslot.contains(value.to)
            });

            this.push(timeslot)
        } else if (matchingFrom)
            matchingFrom.to = fromTo.to;
        else if(matchingTo)
            matchingTo.from = fromTo.from;

    }

    clone() : FromToArray{
        return new FromToArray(this.value.map(v => v.clone()));
    }

    minMax() : FromTo {
        return FromTo.fromObject({
            from : this.min(),
            to : this.max()
        });
    }

    isEmpty(){
        return this.value.length === 0;
    }

    clear(){
        this.value = []
    }

    min() : moment.Moment{
        return  moment.min(this.value.map(v => v.from)).clone();
    }
    max() : moment.Moment{
        return moment.max(this.value.map(v => v.to)).clone();
    }
}
