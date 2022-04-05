<template lang="pug">
    .timeslot-overlay(v-bind:style = "{'height' : momentDiv.height + 'px'}")
        c-participanttimeslots(v-for="(value, index) in timeSlots.value" :key="`timeslot-overlay-${index}`"
        v-bind:momentDiv="momentDiv" v-bind:fromTo="{ from : value.from, to : value.to }" v-bind:color ="color", :participantsSlots="participantsSlots[index]"
        )

</template>

<script lang="ts">

    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop, Watch} from "vue-property-decorator";
    import {FromToArray, MomentDiv} from "../../../util/TimeSlotUtils";
    import CTimeSlot from "./CTimeslot.vue"
    import CParticipantsTimeSlot from "./CParticipantsTimeSlot.vue"

    @Component({
        components : {
            "c-timeslot" : CTimeSlot,
            "c-participanttimeslots" : CParticipantsTimeSlot
        }
    })
    export default class CTimeSlotOverlayParticipants extends Vue {
        @Prop(MomentDiv) momentDiv : MomentDiv;
        @Prop(FromToArray) timeSlots : FromToArray;
        @Prop(String) color : string;
        @Prop() participantsSlots : Array<any>;
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
