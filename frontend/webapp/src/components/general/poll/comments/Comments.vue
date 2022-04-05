<!-- Component view the comment and if you are the creator you can edit it -->

<template>
    <v-layout row wrap id="root">
        <v-flex>
            <v-layout row wrap v-show="com.state === strings.commentStateDefault">
                <v-flex xs12 sm6 md4 order-sm1 order-md1>
                    <v-label :dark="darkeningParticipate">{{comment.text}}</v-label>
                </v-flex>
                <v-flex xs12 sm6 md4 order-sm2 order-md2>
                </v-flex>
                <v-flex xs12 sm6 md4 order-sm2 order-md2>
                    <button v-if="editable" @click="com.state = strings.commentStateEditing" type="button" class="btn btn-link linkButton" :dark="darkeningParticipate">{{strings.buttonEditing}}</button>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-show="com.state === strings.commentStateDefault">
                <v-flex xs12 sm6 md4 order-sm1 order-md1 align-start justify-start>
                    <v-label class="textAuthor" :dark="darkeningParticipate">{{comment.author.name}} <span>-</span> {{commentDate}}</v-label>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-show="com.state === 'editing'" class="textAreaWidth">
                <v-textarea
                        outline
                        name="input-7-4"
                        :label=strings.labelCommentUpdate
                        v-model="com.text"
                        :dark="darkeningParticipate"
                ></v-textarea>
            </v-layout>
            <v-layout row wrap v-show="com.state === strings.commentStateEditing">
                <v-flex style="padding-right: 2%">
                    <v-btn :dark="darkeningParticipate" @click="com.saveEdit(comment)" class="buttonLeft" :disabled="disableElements">{{strings.buttonSave}}</v-btn>
                    <v-btn :dark="darkeningParticipate" @click="com.resetEdit(comment)" class="buttonLeft">{{strings.buttonAbort}}</v-btn>
                </v-flex>
                <v-flex>
                    <v-btn :dark="darkeningParticipate" @click="com.deleteComment(comment)" class="buttonRight" :disabled="disableElements">{{strings.buttonDelete}}</v-btn>
                </v-flex>
            </v-layout>
            <v-layout class="textAreaWidth">
                <v-divider></v-divider>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {CommentsData} from "../../../../logic/CommentsData";
    import {Prop, Watch} from "vue-property-decorator";
    import {AppStore, StateModule} from "../../../../store/AppStore";
    import {VueStateField} from "../../../../store/State";
    import * as moment from "moment"

    @Component({computed: {
            editable () {
                return AppStore.state.userEx.id === this.comment.author.id
            }
        }})
    export default class Comments extends Vue{

        @Prop()
        comment : any;

        commentDate : any = moment(this.comment.createdAt).format("DD.MM.YYYY");

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        userEx : any = AppStore.state.userEx;

        @Prop() id : string;

        com = new CommentsData(this.comment.text, this.id, this.userEx);

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        @Watch("userEx")
        __changeUser(){
            this.userEx = AppStore.state.userEx;
            console.log('CommentManager id: ' + this.userEx)
        }
    }
</script>

<style>
    .linkButton{
        float: right;
        position: relative;
        margin-right: 4.5%;
    }
    .linkButton:hover{
        text-decoration: underline;
    }
    #root{
        height: 20%;
        width: 97%;
        margin-left: 1.5%;
        margin-top: 10px;
    }
    .textAreaWidth{
        width: 98.5%;
    }
    .buttonLeft{
        float: left;
        margin-left: -0.2%;
    }
    .buttonRight{
        float: right;
        position: relative;
        margin-right: 3.5%;
    }
</style>
