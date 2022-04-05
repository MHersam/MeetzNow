<template lang="pug">
    .timeslot-overlay(v-bind:style = "{'height' : momentDiv.height + 'px'}")
        c-timeslotpicked(v-for="(value, index) in pickedTimeSlots.value" :key="`timeslot-overlay-${index}`"
        v-bind:momentDiv="momentDiv" v-bind:fromTo="{ from : value.from, to : value.to }" v-bind:color ="color" :zIndex="zIndex" :slotIndex="index" :pickedTimeSlots="pickedTimeSlots" :availableTimeslots="availableTimeslots.value" :darkening="darkening" :resizeMoment="resizeMoment"
        )

</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";
    import {Model, Prop, Watch} from "vue-property-decorator";
    import {FromTo, FromToArray, MomentDiv} from "../../../util/TimeSlotUtils";
    import CTimeSlotPicked from "./CTimeSlotPicked.vue"
    import * as moment from "moment"

    @Component({
        components : {
            "c-timeslotpicked" : CTimeSlotPicked
        }
    })
    export default class CTimeSlotOverlayPickedTimeSlot extends Vue {
        @Prop(MomentDiv) momentDiv : MomentDiv;
        @Model("change", {type : FromToArray, default : function (){return new FromToArray()}})
        pickedTimeSlots : FromToArray;
        @Prop(String) color : string;
        @Prop() zIndex : number;
        @Prop(FromToArray)  availableTimeslots : FromToArray;
        @Prop() darkening : boolean;
        @Prop() resizeMoment : any;
    }

</script>

<style scoped lang="scss">
    .timeslot-overlay{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }
</style>
