<!-- Component show a confirmation screen that you have successfully created a poll. Now you can share it on social media and copy the sharing link -->

<template>
    <v-card :dark="darkeningGeneral">
        <v-card-text :dark="darkeningGeneral">
            <v-layout row wrap xs12>
                <v-flex justify-center>
                    <v-layout row wrap justify-center>
                        <p class="display-1" :dark="darkeningGeneral">{{strings.creationConfirm}}</p>
                    </v-layout>
                    <v-layout row wrap justify-center style="margin-top: 25px">
                        <p :dark="darkeningGeneral">{{strings.creationConfirmShare}}</p>
                    </v-layout>
                    <v-layout row wrap>
                        <v-text-field readonly v-model="sharableLink"></v-text-field>
                        <v-btn icon type="button" v-clipboard:copy="sharableLink" style="background-color: white" @click="showText()">
                            <v-avatar size="32px">
                                <img src="../../../public/img/baseline_input_black_18dp.png">
                            </v-avatar>
                        </v-btn>
                    </v-layout>
                    <v-layout row wrap justify-center align-center>
                        <social-sharing :url="sharableLink"
                                        :title="strings.socialTitle"
                                        :description="strings.socialDescription"
                                        :hashtags="strings.socialHashtags"
                                        inline-template>
                            <div>
                                <network network="email">
                                    <v-btn icon>
                                        <v-avatar size="32px">
                                            <img src="../../../public/img/email.png">
                                        </v-avatar>
                                    </v-btn>
                                </network>
                                <network network="whatsapp">
                                    <v-btn icon>
                                        <v-avatar size="32px">
                                            <img src="../../../public/img/whatsapp.png">
                                        </v-avatar>
                                    </v-btn>
                                </network>
                                <network network="facebook">
                                    <v-btn icon>
                                        <v-avatar size="32px">
                                            <img src="../../../public/img/fb.png">
                                        </v-avatar>
                                    </v-btn>
                                </network>
                                <network network="twitter">
                                    <v-btn icon>
                                        <v-avatar size="32px">
                                            <img src="../../../public/img/twitter.png">
                                        </v-avatar>
                                    </v-btn>
                                </network>
                            </div>
                        </social-sharing>
                    </v-layout>
                    <v-layout row wrap justify-center style="margin-top: 20px">
                        <button type="button" class="btn btn-link link" :style="'color: ' + this.$vuetify.theme.primary" @click="goToView">{{strings.creationConfirmToView}}</button>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {ClassStateField, StateModule} from "../../../store/AppStore";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {VueStateField} from "../../../store/State";
    
    @Component
    export default class CContent extends Vue{

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.POLLCREATION)
        sharableLink : string;

        linkcopied : boolean = false;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        /**
         * method do the routing to the overview of all created polls
         */
        goToView(){
            this.$router.push('/poll/liste/');
            this.$router.replace('/poll/liste/')
        }

        /**
         * once you clicked the link copy button a text will be showed, that the link is copied
         */
        showText(){
            this.error = this.strings.creationConfirmationLink;
            let self = this;
            setTimeout(function(){
                self.error = '';
            }, this.timeout);
        }

    }
</script>

<style scoped>
    .link:hover{
        text-decoration: underline;
    }
</style>
