<!--- Component will manage all components, in particular it shows a textfield where you can type in your comment and it will be showed in a special place -->

<template>
    <v-layout row wrap :dark="darkeningParticipate">
        <v-flex>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-form>
                        <v-textarea
                                outline
                                name="input-7-4"
                                :label=strings.labelComments
                                @focus="commentManager.startEditing()"
                                :placeholder=strings.placeholderComment
                                v-model="commentManager.text"
                                class="textAreaDivider"
                                :dark="darkeningParticipate"
                                :readonly="!writeComment"
                        ></v-textarea>
                    </v-form>
                </v-flex>
            </v-layout>
            <v-layout row wrap v-show="commentManager.state === strings.commentStateEditing && writeComment === true">
                <v-flex justify-start id="buttons">
                    <v-btn :dark="darkeningParticipate" @click="commentManager.saveComment(userEx)" :disabled="disableElements">{{strings.buttonSave}}</v-btn>
                    <v-btn :dark="darkeningParticipate" @click="commentManager.stopEditing()">{{strings.buttonAbort}}</v-btn>
                </v-flex>
            </v-layout>
            <v-layout class="textAreaDivider">
                <v-divider></v-divider>
            </v-layout>
            <v-layout row wrap>
                <Comments v-for="(comment, index) in commentManager.comments" :key="index" :comment="comment" :id="id"></Comments>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import Comments from "./Comments.vue";
    import {Prop, Watch} from "vue-property-decorator";
    import {CommentManagerData} from "../../../../logic/CommentManagerData";
    import {AppStore, ClassStateField, StateModule} from "../../../../store/AppStore";
    import {VueStateField} from "../../../../store/State";

    @Component({
        components : {
            Comments
        }
    })
    export default class CommentManager extends Vue{
        @ClassStateField(StateModule.POLLPARTICIPATE)
        userEx : any = AppStore.state.userEx;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @Prop() id : string;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        commentManager = new CommentManagerData(this.userEx, this.id);

        @VueStateField(StateModule.GENERAL)
        darkeningParticipate : boolean;

        @VueStateField(StateModule.POLLPARTICIPATE)
        writeComment : boolean;

        @Watch("userEx")
        __changeUser(){
            this.userEx = AppStore.state.userEx;
        }
    }
</script>

<style scoped>
    .textAreaDivider{
        width: 98.5%;
        padding-left: 1.5%;
    }
    #buttons{
        margin-left: 1%;
    }
</style>
