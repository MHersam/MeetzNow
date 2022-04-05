<!-- In this Component we set the location of a Poll and viewing it on a map -->

<template xmlns:>
    <v-layout row wrap>
        <v-dialog v-model="dialogMap" style="width: 100%" persistent>
            <v-text-field slot="activator"
                          :label="strings.createPlace"
                          v-model="geoCoder.location"
                          validate-on-blur
                          :dark="darkeningGeneral"></v-text-field>
            <v-card :dark="darkeningGeneral">
                <v-card-text :dark="darkeningGeneral">
                    <v-layout row class="layoutPopUp" align-start justify-start :dark="darkeningGeneral">
                        <vl-map :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
                                data-projection="EPSG:4326"  v-if="dialogMap" @mounted="onMapMounted" ref="map" class="mapView" @click="clickCoordinate = $event.coordinate" @dblclick="setMarker">
                            <vl-view :zoom.sync="zoom" :center="geoCoder.mapLocation" :rotation.sync="rotation"></vl-view>
                            <v-layout row wrap>
                                <v-flex xs12 sm12 md8 xl10 order-md1 order-sm1>
                                    <v-combobox clearable
                                                :label="strings.createPlace"
                                                :items="geoCoder.locationResults"
                                                flat
                                                autofocus
                                                hide-no-data
                                                hide-details
                                                :search-input.sync="geoCoder.location"
                                                solo-inverted
                                                v-model="geoCoder.location"
                                                style="width: 100%; margin-bottom: 5px"
                                                v-on:change='geoCoder.callGeoCoderWithTimeout()'
                                                v-on:keyup.enter='geoCoder.callGeoCoder()'></v-combobox>
                                </v-flex>
                                <v-flex xs6 sm6 md2 xl1 order-md1 order-sm1>
                                    <v-btn @click="geoCoder.callGeoCoder()" style="width: 100%; margin-left: 0; margin-right: 0;">{{strings.mapsSearch}}</v-btn>
                                </v-flex>
                                <v-flex xs6 sm6 md2 xl1 order-md2 order-sm2>
                                    <v-btn @click="geoCoder.checkMapValid()" style="width: 100%; margin-left: 0; margin-right: 0;">{{strings.creationMapConfirm}}</v-btn>
                                </v-flex>
                                <v-flex xs12 sm6 md3 order-md3 order-sm3 v-show="geoCoder.mapCheck" style="color: red; margin-bottom: 5px;">
                                    {{strings.creationMapInvalid}}
                                </v-flex>
                            </v-layout>
                            <vl-layer-tile id="osm">
                                <vl-source-osm></vl-source-osm>
                            </vl-layer-tile>
                                <vl-overlay id="overlay" positioning="bottom-center" :position="geoCoder.mapMarkerLocation">
                                    <template slot-scope="scope">
                                        <vl-style-icon src="../../../assets/marker.png" :scale="0.4" :anchor="[0.5, 1]"></vl-style-icon>
                                        <img src="../../../assets/marker.png" style="width: 50px; height: 50px">
                                    </template>
                                </vl-overlay>
                        </vl-map>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {ClassStateField, StateModule} from "../../../store/AppStore";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {Watch} from "vue-property-decorator";
    import {pollNewData} from "../../../logic/pollNewData";
    import {VueStateField} from "../../../store/State";
    import {GeocoderHelper} from "../../../logic/GeocoderHelper";


    @Component
    export default class MapsPlaces extends Vue{

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        geoCoder = new GeocoderHelper();

        zoom : number= 18;
        center : Array<any>= this.geoCoder.mapLocation;
        rotation : number= 0;
        geolocPosition : any= undefined;

        loading: boolean;
        search: null;
        select: null;
        clickCoordinate: null;

        @ClassStateField(StateModule.POLLCREATION)
        dialogMap : boolean;

        onMapMounted(){
            let dblClickInteraction;
            // @ts-ignore
            dblClickInteraction = this.$refs.map.$map.getInteractions().getArray()[1];
            // remove the default double click = zoom in interaction from the map
            // @ts-ignore
            this.$refs.map.$map.removeInteraction(dblClickInteraction);
        }
        
        //set marker on map with lat lng coordinates from user double click
        setMarker(){
            this.geoCoder.mapMarkerLocation = this.clickCoordinate;
            this.geoCoder.callGeoCoderMarkerPos();
        }

        @Watch("geoCoder.location")
        __colorValue(val){
            if (val) {
                this.$emit('input', val)
            }

        }
    }
</script>
<style>
.mapView{
    max-height: 700px;
    margin-bottom: 75px;
}

@media screen and (max-width: 960px){
    .mapView{
        margin-bottom: 125px;
    }
}

@media screen and (min-height: 1200px){
    .mapView{
        max-height: 900px;
    }
}

@media screen and (max-height: 960px){
    .mapView{
        max-height: 450px;
    }
}

@media screen and (max-height: 700px){
    .mapView{
        max-height: 350px;
    }
}

@media screen and (max-height: 565px){
    .mapView{
        max-height: 300px;
    }
}
@media screen and (max-height: 510px){
    .mapView{
        max-height: 200px;
    }
}
</style>

