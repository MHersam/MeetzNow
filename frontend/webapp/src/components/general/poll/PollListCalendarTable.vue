<!-- Component show a table, where you can search for your desired poll. By clicking on the poll you can show its details -->

<template>
    <v-layout row wrap class="root">
        <v-flex xs12>
            <v-card :dark="darkeningGeneral">
                <v-card-title :dark="darkeningGeneral">
                    <Label></Label>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            :label="strings.pollListSearch"
                            single-line
                            hide-details
                            xs6
                            :dark="darkeningGeneral"
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        :headers="tHeader"
                        :items="tableData"
                        :search="search"
                        :dark="darkeningGeneral"
                >
                    <v-progress-linear slot="progress" color="blue" indeterminate v-show="loadData"></v-progress-linear>
                    <template slot="items" slot-scope="props">
                        <tr @click="toPoll(props.item.id, props.item.creator)">
                            <td class="text-xs-left pollListTableData">{{ props.item.event }}</td>
                            <td class="text-xs-left pollListTableData">{{ props.item.dateStart }}</td>
                            <td class="text-xs-left pollListTableData">{{ props.item.dateEnd }}</td>
                            <td class="text-xs-left pollListTableData">{{ props.item.place }}</td>
                            <td class="text-xs-left pollListTableData">{{ props.item.creator }}</td>
                        </tr>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        {{strings.searchFirst}} "{{ search }}" {{strings.searchSecound}}
                    </v-alert>
                </v-data-table>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {Prop, Watch} from "vue-property-decorator";
    import Label from "./LabelPollParticipateTable.vue";
    import {AppStore, ClassStateField, StateModule} from "../../../store/AppStore";
    import {VueStateField} from "../../../store/State";

    @Component({
        components: {Label}
    })
    export default class PollListCalendarTable extends Vue{

        @Prop() tableHeader : Array<any>;
        @Prop() tableData : Array<any>;

        tHeader : Array<any> = this.tableHeader;
        tData : Array<any> = this.tableData;

        search : string = "";

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.POLLPARTICIPATE)
        creator : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        loadData : boolean ;

        /**
         * method do the routing to the details of a poll / participate in a poll
         * @param id
         * @param creator
         */
        public toPoll(id, creator){
            if (creator === 'Du' || creator === 'You'){
                this.creator = true;
                this.$router.push('/poll/participate/' + id);
                this.$router.replace('/poll/participate/' + id)
            }
            else {
                this.creator = false;
                this.$router.push('/poll/participate/' + id);
                this.$router.replace('/poll/participate/' + id)
            }
        }
    }
</script>

<style scoped>
    .pollListTableData{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .root{
        height: 100vh
    }
</style>
