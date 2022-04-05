<!--- Component view a color template that should show the distribution of a preferred timeslot -->

<template>
    <v-layout row wrap class="root">
        <v-flex>
            <v-layout row wrap v-for="(color, index) in heatmapColors" :key="index">
                <v-layout row wrap class="space" v-if="percentageArray[index] !== ''">
                    <table>
                        <tr>
                            <td><div :style="'background-color: ' + color" class="colorSize"></div></td>
                            <td><v-label :dark="darkeningParticipate">{{percentageArray[index]}}</v-label></td>
                        </tr>
                    </table>
                </v-layout>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {AppStore, ClassStateField, StateModule} from "../../../store/AppStore";
    import {heatmapColorsDark, heatmapColorsLight} from "../../../util/ColorUtils";
    import {Prop, Watch} from "vue-property-decorator";
    import {FromToArray} from "../../../util/TimeSlotUtils";

    @Component
    export default class ColorVisualisationPollParticipate extends Vue{
        @ClassStateField(StateModule.GENERAL)
        strings : any;

        @ClassStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        @ClassStateField(StateModule.POLLPARTICIPATE)
        participateTimeSlots : FromToArray = AppStore.state.participateTimeSlots;

        @Prop() participantTotal : number;

        heatmapColors = heatmapColorsDark;

        uniqueParticipantArray : Array<any> = [];

        percentageArray = [this.strings.eightStep, this.strings.seventhStep, this.strings.sixthStep, this.strings.fifthStep, this.strings.fourthStep, this.strings.thirdStep, this.strings.secondStep];

        percentage = [1, 0.95, 0.80, 0.65, 0.50, 0.25, 0.01];

        @Watch("participantTotal")
        __adjustNumbers(){
            this.adjustNumbers();
            if(this.darkeningParticipate) this.heatmapColors = heatmapColorsDark;
            else this.heatmapColors = heatmapColorsLight;
        }

        mounted(){
            this.adjustNumbers();
        }

        adjustNumbers(){
            this.percentageArray = [];
            for(let i = 0; i < this.heatmapColors.length; i++){
                this.percentageArray.push(this.strings.colorVisualisationOver + " " + Math.floor(this.percentage[i]*this.participantTotal) + " " + this.strings.colorVisualisationParticipants);
            }
            for (let i = 0; i < this.percentageArray.length - 1; i++){
                for (let j = i + 1; j < this.percentageArray.length; j++){
                    if(this.percentageArray[i] === this.percentageArray[j]){
                        this.percentageArray[j] = '';
                    }
                }
            }
        }

        @Watch("darkeningParticipate")
        __watch_dark(){
            if(this.darkeningParticipate) this.heatmapColors = heatmapColorsDark;
            else this.heatmapColors = heatmapColorsLight;
        }

        /**
         * fill the participate timeslots
         */
        @Watch("participateTimeSlots")
        __changeParticipateDates(){
            if(this.darkeningParticipate) this.heatmapColors = heatmapColorsDark;
            else this.heatmapColors = heatmapColorsLight;
        }
    }
</script>

<style scoped>
    .space{
        margin-top: 15px;
    }
    .colorSize{
        width: 15px;
        height: 15px;
    }
    .root{
        height: 100%;
        width: 100%;
        margin-top: 20%;
    }
</style>
