import Vue from 'vue';
import { CommentManagerData } from "../../../../logic/CommentManagerData";
export default class CommentManager extends Vue {
    userEx: any;
    disableElements: boolean;
    id: string;
    strings: any;
    commentManager: CommentManagerData;
    darkeningParticipate: boolean;
    writeComment: boolean;
    __changeUser(): void;
}
