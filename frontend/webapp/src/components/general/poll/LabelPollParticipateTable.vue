<!-- Component show three different labels on the table you select which poll you want to show. By clicking on one label it will select what you have clicked on -->

<template>
    <v-flex style="padding-top: 20px">
        <v-chip label :dark="darkeningGeneral" :color="labelPoll.colorChips[0]" ref="ges" @click="changeColor(0)">
            <v-icon left :dark="darkeningGeneral">label</v-icon>{{strings.labelTotal}}
        </v-chip>
        <v-chip label :dark="darkeningGeneral" :color="labelPoll.colorChips[1]" ref="created" @click="changeColor(1)">
            <v-icon left :dark="darkeningGeneral">label</v-icon>{{strings.labelCreatedByMe}}
        </v-chip>
        <v-chip label :dark="darkeningGeneral" :color="labelPoll.colorChips[2]" ref="participated" @click="changeColor(2)">
            <v-icon left :dark="darkeningGeneral">label</v-icon>{{strings.labelCreatedByOthers}}
        </v-chip>
    </v-flex>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {LabelPollParticipateTableData} from "../../../logic/LabelPollParticipateTableData";
    import {StringsUtil} from "../../../util/StringsUtil";
    import {ClassStateField, StateModule} from "../../../store/AppStore";

    @Component
    export default class LabelPollParticipateTable extends Vue{
        labelPoll = new LabelPollParticipateTableData();

        /**
         * method change the color of a label that should be selected, as well change the viewed data, that should be viewed.
         * @param pos
         */
        changeColor(pos){
            this.labelPoll.changeColor(this.$refs.ges, this.$refs.created, this.$refs.participated, pos)
        }

        @ClassStateField(StateModule.GENERAL)
        strings : any;

        @ClassStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;
    }
</script>

<style scoped>

</style>
