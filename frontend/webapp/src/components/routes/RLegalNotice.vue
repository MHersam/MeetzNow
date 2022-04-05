<!-- Component for the legal notice -->

<template>
    <v-layout justify-center id="root">
        <v-card justify-center :dark="darkeningGeneral">
            <h1 style="text-align: center">{{strings.lnTitle}}</h1><br/><br/>
            <v-container fluid grid-list-md>
                <table>
                    <tr>
                        <td><h3>{{strings.lnAddress}}</h3></td>
                        <v-spacer></v-spacer>
                        <td class="text-xs-left">
                            {{strings.iswName}}
                            {{strings.iswStreet}}
                            {{strings.iswCity}}
                            {{strings.iswCountry}}
                        </td>
                    </tr>
                    <tr>
                        <td><h3>{{strings.lnTel}}</h3></td>
                        <v-spacer></v-spacer>
                        <td class="text-xs-left">
                            <a href="tel:+49 (0) 711 - 685 82410">{{strings.iswTel}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>{{strings.lnFax}}</h3></td>
                        <v-spacer></v-spacer>
                        <td class="text-xs-left">
                            <a href="fax:+49 (0) 711 - 685 82808">{{strings.iswFax}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>{{strings.lnMail}}</h3></td>
                        <v-spacer></v-spacer>
                        <td class="text-xs-left">
                            <a href="mailto:info@isw.uni-stuttgart.de">{{strings.iswMail}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td><h3>{{strings.lnInternet}}</h3></td>
                        <v-spacer></v-spacer>
                        <td class="text-xs-left">
                            <a href="https://www.isw.uni-stuttgart.de">{{strings.iswPage}}</a><br/>
                            <a href="https://meetznow.io">{{strings.lnPage}}</a>
                        </td>
                    </tr>
                </table>
            </v-container>
        </v-card>
    </v-layout>
</template>




<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {StateModule} from "../../store/AppStore";
    import {VueStateField} from "../../store/State";

    @Component
    export default class RLegalNotice extends Vue {
        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;
    }
</script>

<style scoped>
    #root{
        min-height: 100vh;
        height: 100%;

        white-space: pre-line;
    }
</style>
