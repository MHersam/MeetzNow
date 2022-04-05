import {ClassStateField, StateModule} from "../store/AppStore";
import {post} from '../../node_modules/request'
let request = require('request');

const DATE_FORMAT = "ddd DD. MMMM YYYY";

/**
 * class to wrap all data necessary to create a poll
 */
export class GeocoderHelper{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    location : string = 'Stuttgart';

    mapCheck : boolean = false;

    @ClassStateField(StateModule.POLLCREATION)
    dialogMap : boolean = false;

    @ClassStateField(StateModule.POLLCREATION)
    latitude : any;

    @ClassStateField(StateModule.POLLCREATION)
    longitude : any;

    @ClassStateField(StateModule.POLLCREATION)
    mapLocation : any;

    @ClassStateField(StateModule.POLLCREATION)
    mapMarkerLocation : any;

    @ClassStateField(StateModule.POLLCREATION)
    locationResults : Array<any> = [this.strings.mapsMunich, this.strings.mapsHamburg, this.strings.mapsBerlin, this.strings.mapsCologne, this.strings.mapsFrankfurt, this.strings.mapsStuttgart];

    // Init a timeout variable to be used below
    geocoderTimeout = null;

    //variable to prevent multiple geocoder calls after a double click on map
    markerPosChanged = false;

    /**
     * method set lat lng, so the map can adjust
     */
    public callGeoCoder(){
        let vm = this;
        clearTimeout(this.geocoderTimeout);
        if(vm.location && vm.location.length > 1){
            let url = 'https://api.opencagedata.com/geocode/v1/json?q=' + vm.location.split(" ").join("+").split(",").join("%2C") + '&key=b1fc7693cdff47e49d67059868f65f2c';
            request.get(url, (error, response, body) => {
                let json = JSON.parse(body);
                try {
                    vm.latitude = `${json.results[0].geometry.lat}`;
                    vm.longitude = `${json.results[0].geometry.lng}`;
                    vm.mapLocation = new Array(parseFloat(vm.longitude), parseFloat(vm.latitude));
                    vm.mapMarkerLocation = vm.mapLocation;

                    let suggestions = [];
                    let i = 0;
                    json.results.forEach(loc=> {
                        suggestions.push(`${json.results[i].formatted}`);
                        i++;
                    });
                    vm.locationResults = suggestions;
                } catch (TypeError) {
                }
            });
        }
    }


    /**
     * timeout to limit geocoder calls, allowing place suggestions after every keystroke, without spamming calls
     */
    public callGeoCoderWithTimeout(){
        if(this.markerPosChanged){
            this.markerPosChanged = false;
            return;
        }
        this.mapCheck = false;
        let vm = this;
        clearTimeout(this.geocoderTimeout);
        this.geocoderTimeout = setTimeout(function () {
            vm.callGeoCoder();
        }, 1000);
    }

    /**
     * method to check if a location has lat and lng coordinates, otherwise the dialog won´t close.
     */
    public checkMapValid(){
        if(this.location && this.location.length > 1){
            let url = 'https://api.opencagedata.com/geocode/v1/json?q=' + this.location.split(" ").join("+").split(",").join("%2C") + '&key=b1fc7693cdff47e49d67059868f65f2c';
            request.get(url, (error, response, body) => {
                let json = JSON.parse(body);
                if(json.results.length === 0){
                    this.mapCheck = true;
                    this.dialogMap = true;
                    return true;
                }
                try {
                    this.mapCheck = false;
                    this.dialogMap = false;
                    return false;
                } catch (TypeError) {
                }
            });
        }
        else{
            this.mapCheck = true;
            return true;
        }

        return true;
    }

    /**
     * reverse geocoding from lat lng coordinates from a double click to a formatted adress
     */
    public callGeoCoderMarkerPos(){
        let vm = this;
        let url = "https://api.opencagedata.com/geocode/v1/json?q="+vm.mapMarkerLocation[1]+"+"+vm.mapMarkerLocation[0]+"&key=b1fc7693cdff47e49d67059868f65f2c";
        request.get(url, (error, response, body) => {
            let json = JSON.parse(body);
            try {
                vm.location = `${json.results[0].formatted}`;
                this.markerPosChanged = true;
            } catch (TypeError) {
            }
        });
    }
}
