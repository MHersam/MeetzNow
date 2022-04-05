import Vue from 'vue';
import { CommentsData } from "../../../../logic/CommentsData";
export default class Comments extends Vue {
    comment: any;
    commentDate: any;
    disableElements: boolean;
    userEx: any;
    id: string;
    com: CommentsData;
    strings: any;
    darkeningParticipate: boolean;
    __changeUser(): void;
}
