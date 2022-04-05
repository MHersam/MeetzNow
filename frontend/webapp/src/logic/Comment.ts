import {Author} from "./Author";

/**
 * this class wraps the data for a comment
 */
export class Comment{
    id : any;
    text : string;
    edited : any;
    createdAt : any;
    author : Author;

    constructor(id : any, text : string, edited : any, createdAt : any, author : Author){
        this.id = id;
        this.text = text;
        this.edited = edited;
        this.createdAt = createdAt;
        this.author = author;
    }
}
