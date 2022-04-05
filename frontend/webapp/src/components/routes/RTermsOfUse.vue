<!-- Component for the terms of use -->

<template>
    <v-layout id="root">
        <v-card :dark="darkeningGeneral">
            <v-container fluid grid-list-md>
                <h1 style="text-align: center">{{strings.touTitle}}</h1><br/><br/>
                <h2>{{strings.tou1Title}}</h2>
                {{strings.tou1TextPart1}}<br/>
                <p style="margin-left: 50px; margin-top: 5px;">{{strings.tou1TextPart2}}</p><br/>

                <h2>{{strings.tou2Title}}</h2>
                {{strings.tou2Text}}<br/>
                {{strings.iswName}}<br/>
                {{strings.iswStreet}}
                {{strings.iswCity}}
                {{strings.iswCountry}}<br/>
                Tel <a href="tel:+49 (0) 711 - 685 82410">{{strings.iswTel}}</a>
                Fax <a href="fax:+49 (0) 711 - 685 82808">{{strings.iswFax}}</a><br/>
                <a href="mailto:info@isw.uni-stuttgart.de">{{strings.iswMail}}</a><br/>
                <a href="https://www.isw.uni-stuttgart.de">{{strings.iswPage}}</a><br/><br/>

                <h2>{{strings.tou3Title}}</h2>
                {{strings.tou3Text}}<br/><br/>

                <h2>{{strings.tou4Title}}</h2>
                {{strings.tou4Text}}<br/><br/>

                <h2>{{strings.tou5Title}}</h2>
                {{strings.tou5Text}}<br/><br/>

                <h2>{{strings.tou6Title}}</h2>
                {{strings.tou6Text}}<br/><br/>

                <h2>{{strings.tou7Title}}</h2>
                {{strings.tou7Text}}<br/><br/>
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
    export default class RTermsOfUse extends Vue {
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
