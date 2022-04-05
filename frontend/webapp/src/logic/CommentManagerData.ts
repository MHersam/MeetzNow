import {ClassStateField, StateModule, AppStore} from "../store/AppStore";
import {Comment} from "./Comment";
import {Author} from "./Author";
import * as meetz from "meetznow-api-client"

/**
 * this class manages the comment manager data for the CommentManager Component
 */
export class CommentManagerData{

    @ClassStateField(StateModule.GENERAL)
    strings : any;

    @ClassStateField(StateModule.GENERAL)
    error : string;

    @ClassStateField(StateModule.GENERAL)
    timeout : number;

    @ClassStateField(StateModule.GENERAL)
    disableElements : boolean;

    @ClassStateField(StateModule.COMMENTMANAGER)
    state : string = '';

    @ClassStateField(StateModule.COMMENTMANAGER)
    comments : Array<Comment> = AppStore.state.comments;

    @ClassStateField(StateModule.POLLINFORMATION)
    password : string;

    text : string;

    user : any = '';
    id : string = '';

    constructor(user : any, id : string){
        this.state = this.strings.commentStateDefault;
        this.user = user;
        this.id = id;
    }

    /**
     * method set the textbox to the state where you can write and save a comment
     */
    public startEditing(){
        this.state = this.strings.commentStateEditing
    }

    /**
     * if you click abort in the editing method, this method is triggered and set the state to not editing
     */
    public stopEditing(){
        this.state = this.strings.commentStateDefault
    }

    /**
     * method save a comment and send it to the backend
     * @param author
     */
    public async saveComment(author : Author){
        this.disableElements = true;
        this.stopEditing();
        try{
            await new meetz.CreateCommentCall({payload : {
                    participant_id: author.id,
                    comment: this.text
                }}).get();
            this.text = '';
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
