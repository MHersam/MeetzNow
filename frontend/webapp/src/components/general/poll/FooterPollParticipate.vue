<!-- Component view a footer when you participate in a poll. It has options to repeat a poll, edit and delete. You can also share your poll on social media -->

<template>
    <v-layout row wrap>
        <v-flex>
            <v-footer class="footer" height="auto" :dark="darkeningParticipate">
                <v-card
                        flat
                        tile
                        class="footer"
                        :dark="darkeningParticipate">
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex style="text-align: center" xs12 sm6 md3 order-md1 order-sm1>
                                <v-layout row wrap justify-center class="downSized" v-if="creator">
                                    <v-flex xs12>
                                        <button type="button" class="btn btn-link buttonStyle" :dark="darkeningParticipate" @click="edit()" :disabled="disableElements">
                                            <v-icon small>edit</v-icon>
                                            {{strings.editPoll}}
                                        </button>
                                    </v-flex>
                                    <v-flex xs12>
                                        <button type="button" class="btn btn-link buttonStyle" :dark="darkeningParticipate" @click="repeat()" :disabled="disableElements">
                                            <v-icon small>replay</v-icon>
                                            {{strings.repeatPoll}}
                                        </button>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-dialog v-model="dialogDelete" max-width="490">
                                            <button slot="activator" type="button" class="btn btn-link buttonStyle" :dark="darkeningParticipate" :disabled="disableElements">
                                                <v-icon small>delete</v-icon>
                                                {{strings.deletePoll}}
                                            </button>
                                            <v-card :dark="darkeningParticipate">
                                                <v-card-title :dark="darkeningParticipate" class="headline">{{strings.deletePollHeader}}</v-card-title>
                                                <v-card-text :dark="darkeningParticipate">{{strings.deletePollConfirm}}</v-card-text>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn color="blue darken-1" flat @click="dialogDelete = false">{{strings.accountAbort}}</v-btn>
                                                    <v-btn color="blue darken-1" flat @click.native="deletePoll()">{{strings.deletePollDelete}}</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex style="padding-top: 10px" class="text-xs-center" justify-center xs12 sm6 order-md2 order-sm4>
                                <v-layout row wrap>
                                    <v-flex>
                                        <p :dark="darkeningParticipate">{{strings.sharePoll}}</p>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap justify-center>
                                    <social-sharing :url="socialShareLink"
                                                    :title="strings.socialTitle"
                                                    :description="strings.socialDescription"
                                                    :hashtags="strings.socialHashtags"
                                                    inline-template>
                                        <v-container>
                                            <network network="email">
                                                <v-btn
                                                        class="mx-3 white--text"
                                                        icon
                                                        :disabled="disableElements"
                                                        :dark="darkeningParticipate">
                                                    <v-avatar size="32px">
                                                        <img src="./../../../public/img/email.png">
                                                    </v-avatar>
                                                </v-btn>
                                            </network>
                                            <network network="whatsapp">
                                                <v-btn
                                                        class="mx-3 white--text"
                                                        icon
                                                        :disabled="disableElements"
                                                        :dark="darkeningParticipate">
                                                    <v-avatar size="32px">
                                                        <img src="./../../../public/img/whatsapp.png">
                                                    </v-avatar>
                                                </v-btn>
                                            </network>
                                            <network network="facebook">
                                                <v-btn
                                                        class="mx-3 white--text"
                                                        :dark="darkeningParticipate"
                                                        :disabled="disableElements"
                                                        icon>
                                                    <v-avatar size="32px">
                                                        <img src="./../../../public/img/fb.png">
                                                    </v-avatar>
                                                </v-btn>
                                            </network>
                                            <network network="twitter">
                                                <v-btn
                                                        class="mx-3 white--text"
                                                        :dark="darkeningParticipate"
                                                        :disabled="disableElements"
                                                        icon>
                                                    <v-avatar size="32px">
                                                        <img src="./../../../public/img/twitter.png">
                                                    </v-avatar>
                                                </v-btn>
                                            </network>
                                        </v-container>
                                    </social-sharing>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 sm6 md3 order-md3 order-sm3 class="downSized">
                                <v-layout row wrap justify-center>
                                    <button type="button" class="btn btn-link linkButton" :dark="darkeningParticipate" @click="goBack" :disabled="disableElements">{{strings.backToOverview}}</button>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text class="text-xs-center" justify-center>
                        <span :dark="darkeningParticipate">&copy;{{strings.copyright}} </span><strong :dark="darkeningParticipate">{{strings.meetznow}}</strong>
                    </v-card-text>
                </v-card>
            </v-footer>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {Prop} from "vue-property-decorator";
    import {ClassStateField, StateModule} from "../../../store/AppStore";
    import * as meetz from "../../../../node_modules/meetznow-api-client"
    import {VueStateField} from "../../../store/State";

    @Component
    export default class FooterPollParticipate extends Vue{
        @Prop() creator : boolean;
        @Prop() idPoll : string;
        @VueStateField(StateModule.GENERAL)
        id : string;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        dialogDelete : boolean = false;

        @VueStateField(StateModule.POLLPARTICIPATE)
        pollEditing : boolean;

        socialShareLink : string = window.location.host + "/app/#/poll/participate/" + this.idPoll;

        /**
         * method route back to the poll list
         */
        goBack(){
            this.$router.push('/poll/liste');
            this.$router.replace('/poll/liste')
        }

        @ClassStateField(StateModule.GENERAL)
        strings : any;

        @ClassStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        /**
         * method route to the poll creation screen where most of the data will be filled for repeating
         */
        repeat(){
            this.id = this.idPoll.toString();
            this.$router.push('/poll/new');
            this.$router.replace('/poll/new')
        }

        edit(){
            this.id = this.idPoll.toString();
            this.pollEditing = true;
            this.$router.push('/poll/new');
            this.$router.replace('/poll/new')
        }

        /**
         * method do the backend call for deleting a poll after that you will be routed back to the poll list
         */
        async deletePoll(){
            // TODO wait until the API is ready and then test it
            this.disableElements = true;
            try{
                await new meetz.DeletePollCall({payload : {
                        poll_id : this.idPoll
                    }}).get();
                this.disableElements = false;
                this.goBack();
            }catch (e) {
                this.error = e.message;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                    self.disableElements = false;
                }, this.timeout);
            }
        }
    }
</script>
<style scoped>
    #root{
        margin-top: 25px;
        width: 100%;
        height: 20%;
    }
    .footer{
        width: 100%;
    }
    .buttonStyle:hover{
        text-decoration: underline;
    }
    .downSized{
        margin-top: 25px;
    }
    .heightShifted{
        height: 20%;
    }

</style>
