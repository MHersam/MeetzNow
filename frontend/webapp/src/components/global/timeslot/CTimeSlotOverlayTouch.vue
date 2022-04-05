<template lang="pug">
    .timeslot-overlay(v-bind:style = "{'height' : momentDiv.height + 'px'}")
        c-timeslot(v-for="(value, index) in timeSlots.value" :key="`timeslot-overlay-${index}`"
        v-bind:momentDiv="momentDiv" v-bind:fromTo="{ from : value.from, to : value.to }" v-bind:color ="color" :availableTimeslots="availableTimeslots.value" :darkening="darkening" :slotIndex="index" :colorFreeTimeSlots="colorFreeTimeSlots" :zIndexTouch="zIndexTouch"
        )

</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop, Watch} from "vue-property-decorator";
    import {FromToArray, MomentDiv} from "../../../util/TimeSlotUtils";
    import CTimeSlotTouch from "./CTimeSlotTouch.vue"

    @Component({
        components : {
            "c-timeslot" : CTimeSlotTouch
        }
    })
    export default class CTimeSlotOverlayTouch extends Vue {
        @Prop(MomentDiv) momentDiv : MomentDiv;
        @Prop(FromToArray) timeSlots : FromToArray;
        @Prop(String) color : string;
        @Prop() darkening : boolean;
        @Prop(FromToArray)  availableTimeslots : FromToArray;
        @Prop() colorFreeTimeSlots : string;
        @Prop() zIndexTouch : number;
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
