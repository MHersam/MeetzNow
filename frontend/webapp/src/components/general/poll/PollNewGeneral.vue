<!-- Component will show the first step of creating a poll -->

<template>
    <v-layout row wrap>
        <v-flex xs12 v-show="!loadData">
            <context-menu id="context-menu" ref="ctxMenu">
                <li @click="pollData.setTime()" class="ctxMenuSubPoints">{{strings.creationSetTime}}</li>
            </context-menu>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <MapsPlaces class="elementWidth lining" v-model="pollData.location"></MapsPlaces>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-text-field
                            :label="strings.createTitle"
                            v-model="pollData.title"
                            class="elementWidth lining"
                            :rules="pollData.rulesTitle"
                            :dark="darkeningGeneral"
                            @focus="pollData.title = ''"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md3 order-sm3>
                    <v-select
                            :items="pollData.theme_Array"
                            :label="strings.createTheme"
                            v-model="pollData.theme"
                            class="elementWidth lining"
                            :dark="darkeningGeneral"
                    ></v-select>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <v-menu :close-on-content-click="false"
                            offset-y
                            lazy
                            full-width
                            v-model="pollData.start_date_poll.menu"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                            class="elementWidth"
                            v-bind:class="{ menuZIndex: pollData.start_date_poll.menu, menuZIndexClosed: !pollData.start_date_poll.menu }"
                            :nudge-right="40"
                    >
                        <v-text-field v-model="pollData.start_date_poll_date"
                                      :label="strings.createPollStart"
                                      required
                                      :rules="pollData.rulesDatesStart"
                                      slot="activator"
                                      readonly
                                      class="elementWidth"
                                      v-bind:class="{ menuZIndex: pollData.start_date_poll.menu, menuZIndexClosed: !pollData.start_date_poll.menu }"
                                      :dark="darkeningGeneral"></v-text-field>
                        <v-date-picker :dark="darkeningGeneral" v-bind:class="{ menuZIndex: pollData.start_date_poll.menu, menuZIndexClosed: !pollData.start_date_poll.menu }" v-model="pollData.start_date_poll.day" no-title @input="pollData.start_date_poll.menu = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <v-menu :close-on-content-click="false"
                            offset-y
                            lazy
                            full-width
                            v-model="pollData.end_date_poll.menu"
                            transition="scale-transition"
                            max-width="290px"
                            min-width="290px"
                            class="elementWidth"
                            v-bind:class="{ menuZIndex: pollData.end_date_poll.menu, menuZIndexClosed: !pollData.end_date_poll.menu }"
                            :nudge-right="40"
                    >
                        <v-text-field v-model="pollData.end_date_poll_date"
                                      :label="strings.createPollEnd"
                                      required
                                      :error-messages='pollData.rulesDateEnd()'
                                      slot="activator"
                                      readonly
                                      :dark="darkeningGeneral"
                                      v-bind:class="{ menuZIndex: pollData.end_date_poll.menu, menuZIndexClosed: !pollData.end_date_poll.menu }"
                                      class="elementWidth"></v-text-field>
                        <v-date-picker v-bind:class="{ menuZIndex: pollData.end_date_poll.menu, menuZIndexClosed: !pollData.end_date_poll.menu }" :dark="darkeningGeneral" v-model="pollData.end_date_poll.day" no-title @input="pollData.end_date_poll.menu = false"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md3 order-sm3 @contextmenu.prevent="$refs.ctxMenu.open"
                        @contextmenu="handler($event)">
                    <v-tooltip bottom>
                        <v-select
                                :items="pollData.meetingArray"
                                :label="strings.createMeetingLenght"
                                v-model="pollData.timeslot_min_duration"
                                class="elementWidth"
                                :dark="darkeningGeneral"
                                slot="activator"
                        ></v-select>
                        <span>{{strings.creationRightClick}}</span>
                    </v-tooltip>
                    <MeetingLengthPopUp></MeetingLengthPopUp>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <table class="elementWidth">
                        <tr class="elementWidth">
                            <td class="elementWidth">
                                <CustomColorPickerForm :label="strings.createColorHeader" v-model="pollData.color_header" :colorValue="pollData.color_header" class="elementWidth" :theme="pollData.theme"></CustomColorPickerForm>
                            </td>
                            <td>
                                <div :style="'height: 24px; float: left; width: 24px; background-color: ' + pollData.color_header"></div>
                            </td>
                        </tr>
                    </table>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <DragAndDropPicture :title="strings.createBackgroundImage" :pic="pollData.logo" v-model="pollData.logo"></DragAndDropPicture>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md3 order-sm3>
                    <v-avatar
                            :size="150"
                            color="grey lighten-4"
                    >
                        <img data-dz-thumbnail="" :src="pollData.logo" :alt="strings.createBackgroundImage.split(' ')[0]">
                    </v-avatar>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 md3 order-md1 order-sm1>
                    <table class="elementWidth">
                        <tr class="elementWidth">
                            <td class="elementWidth"><v-text-field
                                    :label="strings.createAddParticipants"
                                    :dark="darkeningGeneral"
                                    :error-messages="pollData.rulesEmail()"
                                    v-model="pollData.email"
                            ></v-text-field></td>
                            <td><v-btn
                                    icon
                                    style="background-color: white"
                                    @click="pollData.emailButton()">
                                <v-avatar size="32px">
                                    <img src="../../../public/img/baseline_add_circle_outline_black_18dp.png">
                                </v-avatar>
                            </v-btn></td>
                        </tr>
                    </table>
                </v-flex>
                <v-flex xs12 sm6 md3 order-md2 order-sm2>
                    <EmailList></EmailList>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex xs12 v-show="loadData">
            <v-layout row wrap>
                <v-label :dark="darkeningGeneral">{{strings.loading}}</v-label><br>
                <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../../store/AppStore";
    import {pollNewData} from "../../../logic/pollNewData";
    import CustomColorPickerForm from "../CustomColorPicker.vue";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import VSelect from "vuetify/src/components/VSelect/VSelect";
    import * as moment from "moment";
    import {Watch} from "vue-property-decorator";
    import DragAndDropPicture from "../DragAndDropPicture.vue";
    import MapsPlaces from "./MapsPlaces.vue";
    import EmailList from "./EmailList.vue";
    import contextMenu from '../../../../node_modules/vue-context-menu'
    import MeetingLengthPopUp from "./MeetingLengthPopUp.vue";
    import {VueStateField} from "../../../store/State";
    import {serverBus} from "../../../main";

    const DATE_FORMAT = "ddd DD. MMMM YYYY";
    @Component({
        components: {
            MeetingLengthPopUp,
            EmailList,
            MapsPlaces,
            DragAndDropPicture,
            CustomColorPickerForm,
            contextMenu,
        }
    })
    export default class PollNewGeneral extends Vue{

        @VueStateField(StateModule.GENERAL)
        strings : any;

        pollData = new pollNewData();

        @VueStateField(StateModule.GENERAL)
        loadData : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @VueStateField(StateModule.GENERAL)
        resetInput : boolean;

        /**
         * method is called when the component is created. Operations are necessary for repeating / editing a poll.
         */
        created(){
            this.loadData = false;
            this.disableElements = false;
        }

        /**
         * method is a helping method for the pop up to set custom meeting length
         * @param event
         */
        public handler(event){
            event.preventDefault()
        }

        /**
         * method adjust the voting start date
         * @private
         */
        @Watch("pollData.start_date_poll.day")
        __start_Date_Update(){
            const closeAtMoment = moment(this.pollData.start_date_poll.day);
            this.pollData.start_date_poll.formatted = closeAtMoment.format(DATE_FORMAT);
            this.pollData.start_date_poll_date = closeAtMoment.format(DATE_FORMAT);
        }

        /**
         * method adjust the voting end date
         * @private
         */
        @Watch("pollData.end_date_poll.day")
        __end_Date_Update(){
            const closeAtMoment = moment(this.pollData.end_date_poll.day);
            this.pollData.end_date_poll.formatted = closeAtMoment.format(DATE_FORMAT);
            this.pollData.end_date_poll_date = closeAtMoment.format(DATE_FORMAT);
        }

        /**
         * reset the input of timeslots after meeting length has changed
         */
        @Watch("pollData.timeslot_min_duration")
        __resetTimeSlots(){
            if(!this.pollData.reapeatingPoll) this.resetInput = !this.resetInput;
            serverBus.$emit("updateTimeSlots");
        }
    }
</script>

<style scoped>
    .elementWidth{
        width: 95%;
    }
    .lining{
        padding-top: 2px
    }
    .ctxMenuSubPoints{
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .ctxMenuSubPoints:hover{
        background-color: #999999;
    }
    #tableScroll{
        overflow: scroll;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .menuZIndex{
        z-index: 50;
    }
    .menuZIndexClosed{
        z-index: 0;
    }
</style>
