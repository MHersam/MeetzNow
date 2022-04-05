<!-- Component show the standard timeslot -->
<template>
    <div class="c-timeslot" style="resize: vertical" v-bind:style="{
        'background-color' : color,
        'height' : height + 'px',
        'margin-top' : marginTop + 'px'
    }"></div>
</template>


<script lang="ts">
    import Component from "vue-class-component";
    import {Prop, Watch} from 'vue-property-decorator'
    import Vue from 'vue'

    import {
        FromTo, MomentDiv
    } from "../../../util/TimeSlotUtils";

    @Component
    export default class CTimeslot extends Vue {

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
    }

</script>

<style scoped>
    .c-timeslot{
        position: absolute;
        width: 100%;
        resize: vertical;
    }
</style>
