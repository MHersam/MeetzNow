<!-- Component show the header of participating in a poll. It contains basic information of the poll -->

<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-card :style="'background-color: ' + pollInfo.headerColor" id="root">
                <v-card-text :style="'background-color: ' + pollInfo.headerColor">
                    <v-layout row wrap>

                        <v-flex xs12 sm6 md3 order-md1 order-sm3>
                            <v-layout justify-center>
                                <v-flex style="text-align: center" class="spacing">
                                    <v-avatar
                                            :size="130"
                                            color="grey lighten-4">
                                        <img data-dz-thumbnail="" :src="pollInfo.logo" alt="avatar">
                                    </v-avatar>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 sm6 md3 order-md2 order-sm4>
                            <v-layout row justify-center style="">
                                <v-flex align-start class="spacing">
                                    <h1 class="headline">
                                        {{pollInfo.theme}}
                                    </h1>
                                </v-flex>
                            </v-layout>
                        </v-flex>

                        <v-flex xs12 sm6 md3 order-md3 order-sm4>
                            <v-layout row wrap justify-center>
                                <v-flex align-start class="spacing">
                                    <div>
                                        <v-icon small>today</v-icon>
                                        {{strings.date}}
                                    </div>
                                    <div>{{pollInfo.date}}</div>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap justify-center>
                                <v-flex align-start class="spacing">
                                    <div>
                                        <v-icon small>business_center </v-icon>
                                        {{strings.createMeetingLenght}}
                                    </div>
                                    <div>{{pollInfo.timeslot_min_duration}}</div>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap justify-center>
                                <v-flex align-start class="spacing">
                                    <div>
                                        <v-icon small>schedule</v-icon>
                                        {{strings.time}}
                                    </div>
                                    <div>{{pollInfo.time}}</div>
                                </v-flex>
                            </v-layout>
                        </v-flex>


                        <v-flex xs12 sm6 md3 order-md4 order-sm4>
                            <v-layout row wrap justify-center>
                                <v-flex align-start class="spacing">
                                    <div>
                                        <v-icon small>room</v-icon>
                                        {{strings.place}}
                                    </div>
                                    <div><a :href="googleMapsLink" target="_blank">{{pollInfo.place}}</a></div>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap justify-center>
                                <v-flex align-start class="spacing">
                                    <div>
                                        <v-icon small>recent_actors</v-icon>
                                        {{strings.participants}}
                                    </div>
                                    <div>{{pollInfo.participants }}</div>
                                </v-flex>
                            </v-layout>

                            <v-layout row wrap justify-center>
                                <v-flex align-start class="spacing">
                                    <div>
                                        <v-icon small>person</v-icon>
                                        {{strings.creatorPoll}}
                                    </div>
                                    <div>{{pollInfo.creatorName}}</div>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {PollInformationData} from "../../../logic/PollInformationData";
    import {ClassStateField, StateModule} from "../../../store/AppStore";
    import {Prop, Watch} from "vue-property-decorator";

    @Component
    export default class PollInformation extends Vue{

        @Prop() id : string;

        pollInfo = new PollInformationData();

        @ClassStateField(StateModule.GENERAL)
        strings : any;

        @ClassStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        @ClassStateField(StateModule.POLLINFORMATION)
        place : string;

        googleMapsLink = "";

        /**
         * once the component is build we want the data from the backend
         */
        mounted(){
            var vm = this;
            this.pollInfo.getPoll(this.id).then(function(){
                var loc = vm.place;
                vm.googleMapsLink = 'https://www.google.com/maps/search/?api=1&query=' + loc.split(" ").join("+").split(",").join("%2C");
            });
        }
    }
</script>

<style scoped>
    .space{
        margin-top: 10px;
    }
    #root{
        height: 20%;
    }
    .spacing{
        margin-top: 25px;
    }
    .invisible{
        background-color: rgba(0,0,0,0);
    }
    .headline{
        text-decoration: underline;
        margin-left: 5px;
    }
    #spaceHeaderContent{
        margin-top: 20px;
    }
</style>
