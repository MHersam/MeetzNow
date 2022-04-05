<!-- Component set up a FAQ screen -->

<template>
    <v-layout justify-center text-xs-center id="root">
        <v-flex v-show="!loadData">


            <v-card :dark="darkeningGeneral">
                <v-card-text :dark="darkeningGeneral">
                    <v-container fluid grid-list-md>
                        <v-layout wrap row>

                            <v-flex xs12 sm12 md12>
                                <v-card-title :dark="darkeningGeneral">
                                    <span class="headline" center>{{strings.helpTitle}}</span>
                                </v-card-title>
                            </v-flex>

                            <v-layout row wrap>
                                <v-expansion-panel focusable>
                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question1}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer1}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>

                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question2}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer2}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>

                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question3}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer3}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>

                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question4}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer4}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>

                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question5}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer5}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>

                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question6}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer6}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>

                                    <v-expansion-panel-content>
                                        <div slot="header">
                                            {{strings.question7}}
                                        </div>
                                        <v-card>
                                            <v-card-text v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">{{strings.answer7}}</v-card-text>
                                        </v-card>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-layout>


                            <v-flex xs12 sm12 md12>
                                <v-card-title :dark="darkeningGeneral" style="margin-top: 100px">
                                    <span class="headline" center>{{strings.helpContact}}</span>
                                </v-card-title>
                            </v-flex>

                            <v-flex xs12 sm6 md6 v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }">
                                <v-avatar
                                        :size="130"
                                        color="grey lighten-4"
                                        style="margin-top: 20px"
                                >
                                    <img src="../../public/img/isw-quadrat.gif">
                                </v-avatar>
                            </v-flex>
                            <v-flex xs12 sm6 md6 v-bind:class="{colorLight : !darkeningGeneral, colorDark : darkeningGeneral }" style="text-align: left;">
                                <p class="text-sm-left">{{strings.helpContactPerson}}</p>
                                <p class="text-sm-left"><v-icon small>home</v-icon> {{strings.iswAdress}}</p>
                                <p class="text-sm-left"><v-icon small>call</v-icon>
                                    <a href="tel:+49 (0) 711 - 685 82410">{{strings.iswTel}}</a>
                                </p>
                                <p class="text-sm-left" ><v-icon small>email</v-icon>
                                    <a href="mailto:info@isw.uni-stuttgart.de">{{strings.iswMail}}</a>
                                </p>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex v-show="loadData">
            <v-label :dark="darkeningGeneral">{{strings.loading}}</v-label><br>
            <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
    </v-layout>

</template>


<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../store/AppStore";
    import VSelect from "vuetify/src/components/VSelect/VSelect";
    import {VueStateField} from "../../store/State";

    @Component
    export default class RAccount extends Vue{
        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        loadData : boolean;
    }
</script>

<style scoped>
    #root{
        min-height: 100vh;
        height: 100%;
    }
    .colorLight{
        background-color: #efefef;
    }
    .colorDark{
        background-color: #000000;
    }
</style>
