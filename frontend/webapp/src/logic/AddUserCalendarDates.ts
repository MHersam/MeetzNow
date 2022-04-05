import 'firebase/auth';
import {config} from '../helpers/firebaseConfig';
import 'firebaseui/dist/firebaseui.css';
import {AppStore} from "../store/AppStore";
import * as moment from "moment";


export class AddUserCalendarDates{
    /**
     * Reads the file the user uploads. Gets the summary, start datetime and end datetime of the events in
     * the authorized user's calendar that are during the displayed dates of the poll.
     */
    public onFilePicked(event, meetingLength) {

        let file = event.target.files[0];
        let fileinput = null;

        let reader = new FileReader();
        let calEvent = [];

        let eventsDuringPoll = [];

        reader.onload = function(e) {
            fileinput = reader.result;
            fileinput = fileinput.split('\n');

            let r = [];
            let eventBegin = [];
            let eventEnd = [];
            for(let i = 0; i < fileinput.length; i++){
                if(fileinput[i].match('BEGIN:VEVENT')){
                    eventBegin.push(i);
                }
                if(fileinput[i].match('END:VEVENT')){
                    eventEnd.push(i);
                }
            }
            for(let i = 0; i < eventBegin.length; i++){
                r.push(fileinput.slice(eventBegin[i], eventEnd[i]));
            }

            fileinput = r.join();
            fileinput = fileinput.split(',');

            const result = fileinput.filter(word => word.match('SUMMARY') || word.match('DTSTART') || word.match('DTEND'));

            let summary;
            let start : Date;
            let end : Date;
            for(let i = 0; i < result.length; i++){
                if(result[i].toString().match('SUMMARY')){
                    summary = result[i].toString().split(':')[1];
                } else if(result[i].toString().match('DTSTART')){
                    start = result[i].toString().split(':')[1];
                } else if(result[i].toString().match('DTEND')){
                    end = result[i].toString().split(':')[1];
                }
                if(summary != null && start != null && end != null){
                    calEvent.push({summary,start,end});
                    summary = null;
                    start = null;
                    end = null;
                }
            }

            let displayedPollDates = [];
            for(let i = 0; i < AppStore.state.timeSlotDates.length; i++){
                let from = AppStore.state.timeSlotDates.value[i].from.toDate().toISOString();
                let to = AppStore.state.timeSlotDates.value[i].to.toDate().toISOString();
                displayedPollDates.push({from, to});
            }


            for(const event of displayedPollDates){
                event.from = new Date(event.from);
                event.to = new Date(event.to);
                event.from.toISOString();
                event.to.toISOString();
            }


            for(const event of calEvent){
                if(event.start.length > 9 || event.end.length > 9){
                    event.start = event.start.substr(0, 4) + '-' +
                        event.start.substr(4, 2) + '-' +
                        event.start.substr(6, 2) + 'T' +
                        event.start.substr(9,2) + ':' +
                        event.start.substr(11, 2) + ':' +
                        event.start.substr(13, 2);

                    event.end = event.end.substr(0, 4) + '-' +
                        event.end.substr(4, 2) + '-' +
                        event.end.substr(6, 2) + 'T' +
                        event.end.substr(9,2) + ':' +
                        event.end.substr(11, 2) + ':' +
                        event.end.substr(13, 2);

                    event.start += 'Z';
                    event.end += 'Z';
                }
                if(event.start.length <= 9 || event.end.length <= 9){
                    event.start = event.start.substr(0, 4) + '-' +
                        event.start.substr(4, 2) + '-' +
                        event.start.substr(6, 2) + 'T00:00:00Z';

                    event.end = event.end.substr(0, 4) + '-' +
                        event.end.substr(4, 2) + '-' +
                        event.end.substr(6, 2) + 'T23:59:00Z';
                    event.start = new Date(new Date(event.start).setHours(0,0,0)).toISOString();
                    event.end = new Date(new Date(event.end).setHours(23,59,59)).toISOString();
                }
                event.start = new Date(event.start);
                event.end = new Date(event.end);
            }


            for(const event of calEvent){
                for(const pollDate of displayedPollDates){
                    if((pollDate.from.getTime() <= event.start.getTime())
                        && (pollDate.to.getTime() >= event.end.getTime())){
                        eventsDuringPoll.push({event});
                    }else if((pollDate.from.getTime() <= event.end.getTime())
                        && (pollDate.to.getTime() >= event.end.getTime())){
                        eventsDuringPoll.push({event});
                    }else if((pollDate.from.getTime() <= event.start.getTime())
                        && (pollDate.to.getTime() >= event.start.getTime())){
                        eventsDuringPoll.push({event});
                    } else if((pollDate.from.getTime() >= event.start.getTime())
                        && (pollDate.to.getTime() <= event.end.getTime())){
                        eventsDuringPoll.push({event: {start: new Date(pollDate.from), end: new Date(pollDate.to)}})
                    }
                }
            }

            let eventsDuringPollSingleDates = [];
            for (let i = 0; i < eventsDuringPoll.length; i++){
                let tempTime = moment(eventsDuringPoll[i].event.start);
                while (tempTime.isBefore(moment(new Date(eventsDuringPoll[i].event.end)))){
                    let tomorrow = moment(tempTime).add(1, 'days');
                    if(tomorrow.toDate().getTime() > eventsDuringPoll[i].event.end.getTime()) {
                        eventsDuringPollSingleDates.push({from: tempTime, to: moment(new Date(eventsDuringPoll[i].event.end))});
                    }
                    else {
                        let toMoment = moment(tempTime).hour(23).minute(59).millisecond(59);
                        eventsDuringPollSingleDates.push({from: tempTime, to: toMoment});
                    }
                    tempTime = moment(tempTime).add(1, 'days');
                }
            }

            eventsDuringPollSingleDates.sort(function (a, b) {
                return a.from.toDate().getTime() - b.from.toDate().getTime()
            });

            //merge overlapping dates
            let merged = eventsDuringPollSingleDates.slice(0);
            let  i = 0;
            while(i < merged.length - 1) {
                let current = merged[i];
                 let next = merged[i+1];

                // check if there is an overlapping
                if(current.to.toDate().getTime() >= next.from.toDate().getTime()) {
                    current.to = moment(Math.max(current.to.toDate().getTime(), next.to.toDate().getTime()));
                    // remove next
                    merged.splice(i+1, 1);
                } else {
                    // move to next
                    i++;
                }
            }

            eventsDuringPollSingleDates = merged.slice(0);

            //figure out what are the available dates
            let availableDates : Array<any> = [];
            for (let i = 0; i < displayedPollDates.length; i++){
                let tempFrom = moment(displayedPollDates[i].from);
                for (let j = 0; j < eventsDuringPollSingleDates.length; j++){
                    if(moment(displayedPollDates[i].from).format("DD.MM.YY") === moment(eventsDuringPollSingleDates[j].from).format("DD.MM.YY")){
                        //check if event is in a displayed date
                        if(displayedPollDates[i].from.getTime() <= eventsDuringPollSingleDates[j].from.toDate().getTime() &&
                        displayedPollDates[i].to.getTime() >= eventsDuringPollSingleDates[j].to.toDate().getTime()){
                            availableDates.push({from: tempFrom, to: moment(eventsDuringPollSingleDates[j].from)});
                            tempFrom = moment(eventsDuringPollSingleDates[j].to);
                            if(j < eventsDuringPollSingleDates.length - 1){
                                if(moment(displayedPollDates[i].from).format("DD.MM.YY") !== moment(eventsDuringPollSingleDates[j + 1].from).format("DD.MM.YY")
                                && moment(displayedPollDates[i].to).toDate().getTime() > moment(eventsDuringPollSingleDates[j].to).toDate().getTime()){
                                    availableDates.push({from: tempFrom, to: moment(displayedPollDates[i].to)})
                                }
                            }
                            if(j === eventsDuringPollSingleDates.length - 1){
                                availableDates.push({from: tempFrom, to: moment(displayedPollDates[i].to)})
                            }
                        }
                        else if(displayedPollDates[i].from.getTime() > eventsDuringPollSingleDates[j].from.toDate().getTime() &&
                            displayedPollDates[i].to.getTime() >= eventsDuringPollSingleDates[j].to.toDate().getTime()){
                            eventsDuringPollSingleDates[j].from = eventsDuringPollSingleDates[j].from.hour(displayedPollDates[i].from.getHours());
                            eventsDuringPollSingleDates[j].from = eventsDuringPollSingleDates[j].from.minute(displayedPollDates[i].from.getMinutes());
                            j--;
                        }
                        else if(displayedPollDates[i].from.getTime() <= eventsDuringPollSingleDates[j].from.toDate().getTime() &&
                            displayedPollDates[i].to.getTime() < eventsDuringPollSingleDates[j].to.toDate().getTime()){
                            eventsDuringPollSingleDates[j].to = eventsDuringPollSingleDates[j].to.hour(displayedPollDates[i].to.getHours());
                            eventsDuringPollSingleDates[j].to = eventsDuringPollSingleDates[j].to.minute(displayedPollDates[i].to.getMinutes());
                            j--;
                        }
                    }
                }
            }
            //add dates without event but still selected
            for (let i = 0; i < displayedPollDates.length; i++){
                let index = eventsDuringPollSingleDates.findIndex((element) => {
                    return element.from.format("DD.MM.YY") === moment(displayedPollDates[i].from).format("DD.MM.YY")
                });
                if(index === -1){
                    availableDates.push({from: moment(displayedPollDates[i].from), to: moment(displayedPollDates[i].to)})
                }
            }

            AppStore.commit('changeTimeSlotDatesCalendar', availableDates);
            let minMinutes = parseInt(meetingLength.split(":")[0])*60 + parseInt(meetingLength.split(":")[1]);
            for (let i = 0; i < availableDates.length; i++){
                let freeTimeSlotLength = (availableDates[i].to.toDate().getTime() - availableDates[i].from.toDate().getTime()) / 1000 / 60;
                if (minMinutes > freeTimeSlotLength){
                    availableDates.splice(i, 1);
                    i--;
                }
            }
            AppStore.commit('setGivenTimeSlotsCalendar', availableDates);

        };
        reader.readAsText(file);
    };

    public onFilePickedParticipant(event, meetingLength) {

        let file = event.target.files[0];
        let fileinput = null;

        let reader = new FileReader();
        let calEvent = [];

        reader.onload = function(e) {
            fileinput = reader.result;

            fileinput = fileinput.split('\n');

            let r = [];
            let eventBegin = [];
            let eventEnd = [];
            for (let i = 0; i < fileinput.length; i++) {
                if (fileinput[i].match('BEGIN:VEVENT')) {
                    eventBegin.push(i);
                }
                if (fileinput[i].match('END:VEVENT')) {
                    eventEnd.push(i);
                }
            }
            for (let i = 0; i < eventBegin.length; i++) {
                r.push(fileinput.slice(eventBegin[i], eventEnd[i]));
            }

            fileinput = r.join();
            fileinput = fileinput.split(',');

            const result = fileinput.filter(word => word.match('SUMMARY') || word.match('DTSTART') || word.match('DTEND'));

            let summary;
            let start: Date;
            let end: Date;
            for (let i = 0; i < result.length; i++) {
                if (result[i].toString().match('SUMMARY')) {
                    summary = result[i].toString().split(':')[1];
                } else if (result[i].toString().match('DTSTART')) {
                    start = result[i].toString().split(':')[1];
                } else if (result[i].toString().match('DTEND')) {
                    end = result[i].toString().split(':')[1];
                }
                if (summary != null && start != null && end != null) {
                    calEvent.push({summary, start, end});
                    summary = null;
                    start = null;
                    end = null;
                }
            }

            let displayedPollDates = [];
            for (let i = 0; i < AppStore.state.participateTimeSlots.length; i++) {
                let from = AppStore.state.participateTimeSlots.value[i].from.toDate().toISOString();
                let to = AppStore.state.participateTimeSlots.value[i].to.toDate().toISOString();
                if (from != to) {
                    displayedPollDates.push({from, to});
                }
            }


            for (const event of displayedPollDates) {
                event.from = new Date(event.from);
                event.to = new Date(event.to);
                event.from.toISOString();
                event.to.toISOString();
            }


            for (const event of calEvent) {
                if (event.start.length > 9 || event.end.length > 9) {
                    event.start = event.start.substr(0, 4) + '-' +
                        event.start.substr(4, 2) + '-' +
                        event.start.substr(6, 2) + 'T' +
                        event.start.substr(9, 2) + ':' +
                        event.start.substr(11, 2) + ':' +
                        event.start.substr(13, 2);

                    event.end = event.end.substr(0, 4) + '-' +
                        event.end.substr(4, 2) + '-' +
                        event.end.substr(6, 2) + 'T' +
                        event.end.substr(9, 2) + ':' +
                        event.end.substr(11, 2) + ':' +
                        event.end.substr(13, 2);

                    event.start += 'Z';
                    event.end += 'Z';
                }
                if (event.start.length <= 9 || event.end.length <= 9) {
                    event.start = event.start.substr(0, 4) + '-' +
                        event.start.substr(4, 2) + '-' +
                        event.start.substr(6, 2) + 'T00:00:00Z';

                    event.end = event.end.substr(0, 4) + '-' +
                        event.end.substr(4, 2) + '-' +
                        event.end.substr(6, 2) + 'T00:00:00Z';
                    event.start = new Date(new Date(event.start).setHours(0, 0, 0)).toISOString();
                    event.end = new Date(new Date(event.end).setHours(23, 59, 59)).toISOString();
                }
                event.start = new Date(event.start);
                event.end = new Date(event.end);
            }

            let eventsDuringPoll = [];
            for(const event of calEvent){
                for(const pollDate of displayedPollDates){
                    if((pollDate.from.getTime() <= event.start.getTime())
                        && (pollDate.to.getTime() >= event.end.getTime())){
                        eventsDuringPoll.push({event});
                    }else if((pollDate.from.getTime() <= event.end.getTime())
                        && (pollDate.to.getTime() >= event.end.getTime())){
                        eventsDuringPoll.push({start: new Date(pollDate.from), end: event.end});
                    }else if((pollDate.from.getTime() <= event.start.getTime())
                        && (pollDate.to.getTime() >= event.start.getTime())){
                        eventsDuringPoll.push({start: event.start, end: new Date(pollDate.to)});
                    }else if((pollDate.from.getTime() >= event.start.getTime())
                        && (pollDate.to.getTime() <= event.end.getTime())){
                        eventsDuringPoll.push({start: new Date(pollDate.from), end: new Date(pollDate.to)})
                    }
                }
            }

            let eventsDuringPollSingleDates = [];
            for (let i = 0; i < eventsDuringPoll.length; i++){
                let tempTime = moment(eventsDuringPoll[i].start);
                while (tempTime.isBefore(moment(new Date(eventsDuringPoll[i].end)))){
                    let tomorrow = moment(tempTime).add(1, 'days');
                    if(tomorrow.toDate().getTime() > eventsDuringPoll[i].end.getTime()) {
                        eventsDuringPollSingleDates.push({from: tempTime, to: moment(new Date(eventsDuringPoll[i].end))});
                    }
                    else {
                        let toMoment = moment(tempTime).hour(23).minute(59).millisecond(59);
                        eventsDuringPollSingleDates.push({from: tempTime, to: toMoment});
                    }
                    tempTime = moment(tempTime).add(1, 'days');
                }
            }

            eventsDuringPollSingleDates.sort(function (a, b) {
                return a.from.toDate().getTime() - b.from.toDate().getTime()
            });


            //merge overlapping dates
            let merged = eventsDuringPollSingleDates.slice(0);
            let i = 0;
            while (i < merged.length - 1) {
                let current = merged[i];
                let next = merged[i + 1];

                // check if there is an overlapping
                if (current.to.toDate().getTime() >= next.from.toDate().getTime()) {
                    current.to = moment(Math.max(current.to.toDate().getTime(), next.to.toDate().getTime()));
                    // remove next
                    merged.splice(i + 1, 1);
                } else {
                    // move to next
                    i++;
                }
            }

            eventsDuringPollSingleDates = merged.slice(0);

            //figure out what are the available dates
            let availableDates : Array<any> = [];
            for (let i = 0; i < displayedPollDates.length; i++){
                let tempFrom = moment(displayedPollDates[i].from);
                for (let j = 0; j < eventsDuringPollSingleDates.length; j++){
                    if(moment(displayedPollDates[i].from).format("DD.MM.YY") === moment(eventsDuringPollSingleDates[j].from).format("DD.MM.YY")){
                        //check if event is in a displayed date
                        if(displayedPollDates[i].from.getTime() <= eventsDuringPollSingleDates[j].from.toDate().getTime() &&
                            displayedPollDates[i].to.getTime() >= eventsDuringPollSingleDates[j].to.toDate().getTime()){
                            availableDates.push({from: tempFrom, to: moment(eventsDuringPollSingleDates[j].from)});
                            tempFrom = moment(eventsDuringPollSingleDates[j].to);
                            if(j < eventsDuringPollSingleDates.length - 1){
                                if(moment(displayedPollDates[i].from).format("DD.MM.YY") !== moment(eventsDuringPollSingleDates[j + 1].from).format("DD.MM.YY")
                                    && moment(displayedPollDates[i].to).toDate().getTime() > moment(eventsDuringPollSingleDates[j].to).toDate().getTime()){
                                    availableDates.push({from: tempFrom, to: moment(displayedPollDates[i].to)})
                                }
                            }
                            if(j === eventsDuringPollSingleDates.length - 1){
                                availableDates.push({from: tempFrom, to: moment(displayedPollDates[i].to)})
                            }
                        }
                    }
                }
            }
            //add dates without event but still selected
            /*for (let i = 0; i < displayedPollDates.length; i++){
                let index = eventsDuringPollSingleDates.findIndex((element) => {
                    return element.from.format("DD.MM.YY") === moment(displayedPollDates[i].from).format("DD.MM.YY")
                });
                if(index === -1){
                    availableDates.push({from: moment(displayedPollDates[i].from), to: moment(displayedPollDates[i].to)})
                }
            }*/
            for(const pollDate of displayedPollDates){
                let eventInBlock = false;
                for(const event of eventsDuringPollSingleDates){
                    if(((pollDate.from.getTime() <= event.from.toDate().getTime())
                        && (pollDate.to.getTime() >= event.to.toDate().getTime()) ||
                        (pollDate.from.getTime() <= event.to.toDate().getTime())
                        && (pollDate.to.getTime() >= event.to.toDate().getTime()) ||
                        (pollDate.from.getTime() <= event.from.toDate().getTime())
                        && (pollDate.to.getTime() >= event.from.toDate().getTime()))) {
                        eventInBlock = true;
                    }
                }
                if(!eventInBlock)availableDates.push({from: moment(pollDate.from), to: moment(pollDate.to)});
            }

            let minMinutes = parseInt(meetingLength.split(":")[0])*60 + parseInt(meetingLength.split(":")[1]);
            for (let i = 0; i < availableDates.length; i++){
                if (availableDates[i].from === availableDates[i].to){
                    availableDates.splice(i, 1);
                    i--;
                    continue;
                }
                let freeTimeSlotLength = (availableDates[i].to.toDate().getTime() - availableDates[i].from.toDate().getTime()) / 1000 / 60;
                if (minMinutes > freeTimeSlotLength){
                    availableDates.splice(i, 1);
                    i--;
                }
            }

            AppStore.commit('setGivenTimeSlotsCalendar', availableDates);

        };
        reader.readAsText(file);
    };
}
