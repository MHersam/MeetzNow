<!-- Component shows tabs that should separate continued and past polls and also show a table with the polls -->

<template>
    <v-layout id="root">
        <v-flex>
            <v-tabs grow v-model="pollList.tab" :dark="darkeningGeneral">
                <v-tab :dark="darkeningGeneral">
                    {{strings.continuedPolls}}
                </v-tab>
                <v-tab :dark="darkeningGeneral">
                    {{strings.pastPolls}}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="pollList.tab" touchless>
                <v-tab-item>
                    <PollListCalendarTable :tableHeader="pollList.tableHeader" :tableData="pollList.viewedDataContinued"></PollListCalendarTable>
                </v-tab-item>
                <v-tab-item>
                    <PollListCalendarTable :tableHeader="pollList.tableHeader" :tableData="pollList.viewedDataPast"></PollListCalendarTable>
                </v-tab-item>
            </v-tabs-items>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import PollListCalendarTable from '../../general/poll/PollListCalendarTable.vue'
    import {PollListData} from "../../../logic/PollListData";
    import {ClassStateField, StateModule} from "../../../store/AppStore";
    import {VueStateField} from "../../../store/State";

    @Component({
        components: {
            PollListCalendarTable
        }
    })
    export default class RPollList extends Vue{

        pollList = new PollListData();

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.USER, "id")
        userID : any;

        /**
         * if you are not logged in you will be send to the login screen
         */
        mounted(){
            if(this.userID !== null){}
            else{
                this.$router.push('/login/');
                this.$router.replace('/login/');
            }
            this.pollList.fillDataTable();
        }

        @ClassStateField(StateModule.GENERAL)
        strings : any;

    }
</script>
<style scoped>
    #root{
        min-height: 100vh;
        height: 100%;
    }
</style>
