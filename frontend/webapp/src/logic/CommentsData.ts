import {AppStore, ClassStateField, StateModule} from "../store/AppStore";
import {Comment} from "./Comment";
import * as meetz from "../../node_modules/meetznow-api-client";
import {Author} from "./Author";

/**
 * this class manages the data for the Comment component
 */
export class CommentsData{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.POLLINFORMATION)
    password : string;

    text : string;

    state : string = '';

    user : any = '';
    id : string = '';

    @ClassStateField(StateModule.COMMENTMANAGER)
    comments : Array<Comment> = AppStore.state.comments;

    constructor(text : string, id : string, user : any){
        this.text = text;
        this.state = this.strings.commentStateDefault;
        this.user = user;
        this.id = id;
    }

    /**
     * method save the edited comment and send the update to the backend
     * @param comment
     */
    public async saveEdit(comment){
        this.disableElements = true;
        this.state = this.strings.commentStateDefault;
        let index = this.comments.findIndex((element) => {
            return element.id === comment.id
        });
        try{
            await new meetz.UpdateCommentCall({payload : {
                    comment_id: this.comments[index].id,
                    comment: {
                        text: this.text,
                        last_changed: new Date()
                    }
                }}).get();
            //after a comments was updated, get all comments and put dem in the store
            try {
                let poll = await new meetz.GetPollCall({payload : {
                        poll_id: this.id
                    }}).get();
                this.setUpComments(poll);
            }catch (e) {
                // @ts-ignore
                let poll = await new meetz.SendPollPasswordCall({payload : {
                        poll_id : this.id,
                        password : this.password
                    }}).get();
                this.setUpComments(poll);
            }
            this.disableElements = false;
        }catch (e) {
            this.error = e.message;
            let self = this;
            setTimeout(function(){
                self.error = '';
                self.disableElements = false;
            }, this.timeout);
        }
    }

    /**
     * method send the comment that should be deleted to the backend
     * @param comment
     */
    public async deleteComment(comment){
        this.disableElements = true;
        this.state = this.strings.commentStateDefault;
        let index = this.comments.findIndex((element) => {
            return element.id === comment.id
        });
        try{
            await new meetz.DeleteCommentCall({payload : {
                    comment_id: this.comments[index].id
                }}).get();
            //after a comments was deleted, get all comments and put dem in the store
            try {
                let poll = await new meetz.GetPollCall({payload : {
                        poll_id: this.id
                    }}).get();
                this.setUpComments(poll);
            }catch (e) {
                // @ts-ignore
                let poll = await new meetz.SendPollPasswordCall({payload : {
                        poll_id : this.id,
                        password : this.password
                    }}).get();
                this.setUpComments(poll);
            }
            this.disableElements = false;
        }catch (e) {
            this.error = e.message;
            let self = this;
            setTimeout(function(){
                self.error = '';
                self.disableElements = false;
            }, this.timeout);
        }
    }

    /**
     * if you click abort in the comment editing mode, the state will be set to not editing and the buttons disappear
     * @param comment
     */
    public resetEdit(comment){
        this.state = this.strings.commentStateDefault;
        this.text = comment.text
    }

    /**
     * method sets up all comments after a comment was saved
     * @param poll
     */
    setUpComments(poll){
        let comments = [];
        for (let i = 0; i < poll.payload.poll.participants.length; i++){
            for (let j = 0; j < poll.payload.poll.participants[i].comments.length; j++){
                let author = new Author(poll.payload.poll.participants[i]._id, poll.payload.poll.participants[i].name);
                comments.push(new Comment(poll.payload.poll.participants[i].comments[j]._id, poll.payload.poll.participants[i].comments[j].text, false, poll.payload.poll.participants[i].comments[j].last_changed, author))
            }
        }
        AppStore.commit('addAllComment', comments);
    }
}
