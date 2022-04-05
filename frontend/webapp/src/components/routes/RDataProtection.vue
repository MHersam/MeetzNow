<!-- Component for the data protection declaration -->

<template>
    <v-layout id="root">
        <v-card :dark="darkeningGeneral">
            <v-container fluid grid-list-md>
                <h1 style="text-align: center">{{strings.dpTitle}}</h1><br/><br/>
                <h2>{{strings.dpSecondTitle}}</h2>
                <h2>{{strings.dpResponsibleBody}}</h2>
                {{strings.iswName}}
                {{strings.iswStreet}}
                {{strings.iswCity}}
                {{strings.iswCountry}}
                Tel <a href="tel:+49 (0) 711 - 685 82410">{{strings.iswTel}}</a>
                Fax <a href="fax:+49 (0) 711 - 685 82808">{{strings.iswFax}}</a><br/>
                <a href="mailto:info@isw.uni-stuttgart.de">{{strings.iswMail}}</a><br/>
                <a href="https://www.isw.uni-stuttgart.de">{{strings.iswPage}}</a><br/><br/>

                <h2>{{strings.dpDataProtectionOfficer}}</h2>
                {{strings.dpDPOTextPart1}} <a href="mailto:datenschutz@uni-stuttgart.de">{{strings.dpDPOMail}}</a> {{strings.dpDPOTextPart2}}<br/><br/>

                <h2>{{strings.dp1Title}}</h2>
                {{strings.dp1Text}}<br/><br/>

                <h2>{{strings.dp2Title}}</h2>
                {{strings.dp2Text}}<br/><br/>
                <h2>{{strings.dp2_1Title}}</h2>
                {{strings.dp2_1Text}}<br/><br/>
                <h2>{{strings.dp2_2Title}}</h2>
                {{strings.dp2_2Text}}<br/><br/>
                <h2>{{strings.dp2_3Title}}</h2>
                {{strings.dp2_3Text}}<br/><br/>
                <h2>{{strings.dp2_4Title}}</h2>
                {{strings.dp2_4Text}}<br/><br/>

                <h2>{{strings.dp3Title}}</h2>
                <h2>{{strings.dp3_1Title}}</h2>
                {{strings.dp3_1Text}}<br/><br/>
                <h2>{{strings.dp3_2Title}}</h2>
                {{strings.dp3_2Text}}<br/><br/>
                <h2>{{strings.dp3_3Title}}</h2>
                {{strings.dp3_3Text}}<br/><br/>

                <h2>{{strings.dp4Title}}</h2>
                {{strings.dp4Text}}<br/><br/>

                <h2>{{strings.dp5Title}}</h2>
                {{strings.dp5Text}}<br/><br/>

                <h2>{{strings.dp6Title}}</h2>
                {{strings.dp6Text}}<br/><br/>

                <h2>{{strings.dp7Title}}</h2>
                {{strings.dp7Text}}<br/><br/>

                <h2>{{strings.dp8Title}}</h2>
                {{strings.dp8Text}}<br/><br/>

                <h2>{{strings.dp9Title}}</h2>
                {{strings.dp9Text}}<br/><br/>

                <h2>{{strings.dp10Title}}</h2>
                {{strings.dp10Text}}<br/><br/>

                <h2>{{strings.dp11Title}}</h2>
                {{strings.dp11Text}}<br/><br/>

                <h2>{{strings.dp12Title}}</h2>
                {{strings.dp12Text}}<br/><br/>

                <h2>{{strings.dp13Title}}</h2>
                {{strings.dp13Text}}<br/><br/>

                <h2>{{strings.dp14Title}}</h2>
                {{strings.dp14Text}}<br/><br/>

                <h2>{{strings.dp15Title}}</h2>
                {{strings.dp15Text}}<br/><br/>

                <h2>{{strings.dp16Title}}</h2>
                {{strings.dp16Text}}<br/><br/>

                <h2>{{strings.dp17Title}}</h2>
                {{strings.dp17Text}}<br/><br/>

                <div style="border: solid">
                    <h3>{{strings.dpBoxText}}</h3>
                    {{strings.iswName}}
                    {{strings.iswStreet}}
                    {{strings.iswCity}}
                    {{strings.iswCountry}}
                    Tel <a href="tel:+49 (0) 711 - 685 82410">{{strings.iswTel}}</a>
                    Fax <a href="fax:+49 (0) 711 - 685 82808">{{strings.iswFax}}</a><br/>
                    <a href="mailto:info@isw.uni-stuttgart.de">{{strings.iswMail}}</a><br/>
                    <a href="https://isw.uni-stuttgart.de">{{strings.iswPage}}</a><br/><br/>
                </div>

                <div style="text-align: right">
                    {{strings.dpStatus}}
                </div>
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
    export default class RDataProtection extends Vue {
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
