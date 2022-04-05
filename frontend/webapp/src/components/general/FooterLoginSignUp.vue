<!--- Component show the footer of the login and sign up screen -->

<template>
    <v-layout row wrap id="root" justify-center style="margin-left: 0; background-color: rgba(0,0,0,0)">
        <v-flex>
            <v-footer class="footer" height="auto" :dark="darkeningGeneral" justify-center style="background-color: rgba(0,0,0,0)">
                <v-card
                        flat
                        tile
                        class="footer"
                        style="background-color: rgba(0,0,0,0)"
                        :dark="darkeningGeneral">
                    <v-card-text style="background-color: rgba(0,0,0,0)">
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md3 order-md4 order-sm2>
                                <v-layout row justify-center>
                                    <v-flex align-start class="spacing">
                                        <v-avatar size="32">
                                            <img src='../../public/img/calendarFooter.png' width="32" height="32" style="background-color: white"/>
                                        </v-avatar>
                                    </v-flex>
                                    <v-flex>
                                        <p>{{strings.footerDate}}</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6 md3 order-md3 order-sm1>
                                <v-layout row justify-center>
                                    <v-flex align-start class="spacing">
                                        <v-avatar size="32">
                                            <img src='../../public/img/alarm-clock.png' width="32" height="32" style="background-color: white"/>
                                        </v-avatar>
                                    </v-flex>
                                    <v-flex>
                                        <p>{{strings.footerTimeSlots}}</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6 md3 order-md2 order-sm4>
                                <v-layout row justify-center>
                                    <v-flex align-start class="spacing">
                                        <img src='../../public/img/group1.png' width="32" height="32"/>
                                    </v-flex>
                                    <v-flex>
                                        <p>{{strings.footerPlace}}</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6 md3 order-md1 order-sm3>
                                <v-layout row justify-center>
                                    <v-flex align-start class="spacing">
                                        <img src='../../public/img/group2.png' width="32" height="32"/>
                                    </v-flex>
                                    <v-flex>
                                        <p>{{strings.footerParticipants}}</p>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="text-xs-center" justify-center>
                        <span>&copy;{{strings.copyright}} </span><strong :dark="darkeningGeneral">{{strings.meetznow}}</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../store/AppStore";
    import {VueStateField} from "../../store/State";

    @Component
    export default class FooterLoginSignUp extends Vue{
        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;
    }
</script>

<style lang="scss" scoped>

    #footer{


        .loginfooter-featurebox{
            margin: 5px;

            .wrapper {
                :first-child{
                    margin: 20px;
                    height: 60px;
                    width: 60px;
                }
            }

            :last-child{
                margin: 5px;
            }
        }

    }

    #root{
        margin-top: 75px;
        width: 100%;
    }
    .footer{
        width: 100%;
    }
    .spacing{
        margin-right: 5px;
    }

</style>
