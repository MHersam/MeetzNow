<!-- Component view a email list. If you want you can delete the email by clicking on the - Button -->

<template>
    <v-layout row wrap id="root">
        <v-flex xs12>
            <v-list subheader style="background-color: rgba(0,0,0,0)">
                <v-subheader>{{strings.emailList}}</v-subheader>
                <v-list-tile
                        v-for="(email, index) in pollData.email_list"
                        :key="index"
                        avatar
                        @click=""
                >
                    <v-list-tile-content>
                        <v-list-tile-title :dark="darkeningGeneral">{{email}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-icon class="iconSize" @click="pollData.deleteEmail(email)" color="red">delete</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {pollNewData} from "../../../logic/pollNewData";
    import {StringsUtil} from "../../../util/StringsUtil";
    import {ClassStateField, StateModule} from "../../../store/AppStore";

    @Component
    export default class EmailList extends Vue{
        pollData = new pollNewData();

        @ClassStateField(StateModule.GENERAL)
        strings : any;

        @ClassStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;
    }
</script>

<style scoped>
    .emailContainer{
        font-size: 100%;
    }
    #root{
        width: 100%;
        height: 100%;
    }
    .iconSize{
        height: 35%;
    }
</style>
