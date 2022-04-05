<!--- Component is a overlay of the participants of a timeslot -->
<template>
    <v-tooltip class="c-timeslotParticipants" bottom v-model="overlay">
        <div @touchstart="overlay = true" @touchend="overlay = false" slot="activator" class="c-timeslotParticipants" v-bind:style="{
        'height' : height + 'px',
        'margin-top' : marginTop + 'px',
        }">
        </div>
        <span v-for="(participant, index) in participantsSlots" :key="index"><span>{{(index + 1) + ". " + participant}} <br /></span></span>
    </v-tooltip>
</template>


<script lang="ts">
    import Component from "vue-class-component";
    import {Prop} from 'vue-property-decorator'
    import Vue from 'vue'

    import {
        FromTo, MomentDiv
    } from "../../../util/TimeSlotUtils";

    @Component
    export default class CParticipantsTimeSlot extends Vue {

        get height(){
            if(!this.fromTo || !this.momentDiv) return;
            const yPositions =  this.momentDiv.getStartEnd(this.fromTo);
            return yPositions.end - yPositions.start;
        }

        get marginTop(){
            if(!this.fromTo || !this.momentDiv) return;
            return this.momentDiv.getPositionFor(this.fromTo.from);
        }

        @Prop(MomentDiv)
        momentDiv : MomentDiv;

        @Prop(Object)
        fromTo : FromTo;

        @Prop(String)
        color : string;

        overlay : boolean = false;

        @Prop() participantsSlots : Array<any>;
    }

</script>

<style scoped>
    .c-timeslotParticipants{
        position: absolute;
        width: 100%;
        z-index: 1050;
        margin-left: -25%;
    }
</style>
