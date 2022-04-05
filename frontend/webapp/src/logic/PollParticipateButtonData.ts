import {ClassStateField, StateModule} from "../store/AppStore";
import * as request from "../../node_modules/request"

/**
 * class wraps the data for participating in a poll
 */
export class PollParticipateButtonData{
    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.GENERAL)
    showError : boolean;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    start_date_poll : any;

    @ClassStateField(StateModule.POLLPARTICIPATE)
    end_date_poll : any;

    latPlace : string = '';
    latHome : string = '';
    lngPlace : string = '';
    lngHome : string = '';

    firstCalculation : boolean = false;
    minutes : number = 0;
    hours : number = 0;

    rulesName : any = [
        (v) => !!v || this.strings.popUpRule
    ];

    @ClassStateField(StateModule.POLLPARTICIPATE)
    travelTime : string;

    constructor(){
        // let poll = this.getPoll(id);
        //TODO make the right bc and put in the data
    }

    /**
     * method calculate the lat lng coordinates for the place where the meeting should take place.
     * @param place
     * @param home
     */
    setLATLNGOne(place, home){
        let urlGeo1 = 'https://api.opencagedata.com/geocode/v1/json?q=' + place.split(" ").join("+").split(",").join("%2C") + '&key=b1fc7693cdff47e49d67059868f65f2c';
        request.get(urlGeo1, (error, response, body) => {
            let json = JSON.parse(body);
            try {
                this.latPlace = `${json.results[0].geometry.lat}`;
                this.lngPlace = `${json.results[0].geometry.lng}`;
                this.setLATLNG2(place, home);
            } catch (e) {
                this.error = e.message;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                    self.disableElements = false;
                }, this.timeout);
            }
        });
    }

    /**
     * method calculate the lat lng coordinated for the place where the participate want to move.
     * @param place
     * @param home
     */
    setLATLNG2(place, home){
        let urlGeo2 = 'https://api.opencagedata.com/geocode/v1/json?q=' + home.split(" ").join("+").split(",").join("%2C") + '&key=b1fc7693cdff47e49d67059868f65f2c';
        request.get(urlGeo2, (error, response, body) => {
            let json = JSON.parse(body);
            try {
                this.latHome = `${json.results[0].geometry.lat}`;
                this.lngHome = `${json.results[0].geometry.lng}`;
                this.setDistance(place, home)
            } catch (e) {
                this.error = e.message;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                    self.disableElements = false;
                }, this.timeout);
            }
        });
    }

    /**
     * method inititialze the calculation of the time, a participant need to arrive at the meeting location
     * @param place
     * @param home
     */
    getDistance(place, home){
        this.disableElements = true;
        this.setLATLNGOne(place, home);
    }

    /**
     * method calculate the traveling time
     * @param place
     * @param home
     */
    setDistance(place, home){
        let urlRoute = 'https://api.routexl.nl/distances';
        let username = 'meetznow';
        let password = 'g8ZUZ0daPY4luAOZNS&FB%R!';
        let auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
        let json = JSON.stringify([{address: place, lat: this.latPlace, lng: this.lngPlace}, {address: home, lat: this.latHome, lng: this.lngHome}]);
        let res = '';
        let self = this;
        request.post({
            url: urlRoute,
            headers : {
                "Authorization" : auth
            },
            form: {
                locations: json
            }
        }, function (error, response, body) {
            res = body.split('duration')[1].split(':')[1].split(',')[0];
            var time = (Math.round((parseFloat(res) / 60.0) * 100) / 100);
            self.hours = Math.floor(time/60);
            self.minutes = Math.round(time%60);
            self.travelTime = self.hours + " ";
            if(self.hours == 1){
                self.travelTime += self.strings.popUpHour;
             } else {
                 self.travelTime += self.strings.popUpHours;
             }
            self.travelTime += " " + self.minutes + " ";
            if(self.minutes == 1){
                self.travelTime += self.strings.popUpMinute;
            } else {
                    self.travelTime += self.strings.popUpMinutes;
                 }
            self.disableElements = false;
            self.firstCalculation = true;
        });
    }

}
