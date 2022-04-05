import Vue from 'vue';
import { GeocoderHelper } from "../../../logic/GeocoderHelper";
export default class MapsPlaces extends Vue {
    strings: any;
    darkeningGeneral: boolean;
    geoCoder: GeocoderHelper;
    zoom: number;
    center: Array<any>;
    rotation: number;
    geolocPosition: any;
    loading: boolean;
    search: null;
    select: null;
    clickCoordinate: null;
    dialogMap: boolean;
    onMapMounted(): void;
    setMarker(): void;
    __colorValue(val: any): void;
}
