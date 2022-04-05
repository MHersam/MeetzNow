<template>
        <div id="kommentarManager">
            <div class="bg-white rounded shadow-sm p-8 mb-4">
                <div class="mb-4">
                    <h2 class="text-black">Kommentare</h2>
                </div>
                <textarea placeholder="Kommentar Hinzufügen"
                          v-model="text"
                          class="form-control" id="exampleFormControlTextarea1" rows="3"
                          type="textarea"
                          :class="[state === 'editing' ? 'h-24' : 'h-10']"
                          @focus="startEditing">
                </textarea>
                <div v-show="state === 'editing'" class="mt-3">
                    <button type="button" class="btn btn-primary" @click="saveComment">Speichern</button>
                    <button type="button" class="btn btn-light" id="cancelButton" @click="stopEditing">Abbrechen</button>
                </div>
            </div>
            <div class="bg-white rounded shadow-sm p-8" id="commentBox">
                <CommentComp v-for="(comment, index) in comments" :key="comment.id" :comment="comment" id="comments" :user="user"
                            @comment-updated="updateComment($event)"
                            @comment-deleted="deleteComment($event)"
                            :class="[index === comments.length - 1 ? '' : 'mb-6']"></CommentComp>
            </div>
        </div>
</template>

<script>
import CommentComp from './Comments'
import {Comment} from '../functions/Comment'
import {Author} from '../functions/Author'
export default {
  name: 'KommentarManager',
  components: {CommentComp},
  props: {
    user: {
      required: true,
      type: Object
    },
    data: {
      required: true,
      type: Object
    }
  },
  data: function () {
    return {
      comments: [],
      text: '',
      state: 'default'
    }
  },
  methods: {
    /**
       * this function update the comment that is edited
       * @param $event
       */
    updateComment ($event) {
      let index = this.comments.findIndex((element) => {
        return element.id === $event.id
      })
      // TODO remove this line after database is set
      this.comments[index].text = $event.text
      // TODO do a connection to the database
      // let updatedComment = {comment: this.comments[index]}
      // let data = JSON.stringify(updatedComment)
      // let jsonObject = JSON.parse(data)
      // TODO get all comments from the database and save it in comments
      // this.comments = ...
    },
    /**
       * this function delete the comment that is edited
       * @param $event
       */
    deleteComment ($event) {
      let index = this.comments.findIndex((element) => {
        return element.id === $event.id
      })
      // TODO remove this line after database is set
      this.comments.splice(index, 1)
      // TODO send to the database which comment should be deleted
      // let deleteComment = {comment: this.comments[index]}
      // let data = JSON.stringify(deleteComment)
      // let jsonObject = JSON.parse(data)
      // TODO get all comments from the database and save it in comments
      // this.comments = ...
    },
    /**
       * this function save your created comment from the textarea
       */
    saveComment () {
      let author = new Author(this.user.id, this.user.name)
      let newComment = new Comment((this.comments[this.comments.length - 1].id + 1), this.text, false, new Date().toLocaleDateString(), author)
      // TODO remove this line after database is set
      this.comments.push(newComment)
      // TODO add to the database which comment should be deleted
      // let addComment = {comment: newComment}
      // let data = JSON.stringify(addComment)
      // let jsonObject = JSON.parse(data)
      // TODO get all comments from the database and save it in comments
      // this.comments = ...
      this.stopEditing()
    },
    /**
       * this function set the state variable to editing so the editor view of the comment show
       */
    startEditing: function () {
      this.state = 'editing'
    },
    /**
       * this function set the state to default, so once you finished editing you will see the normal comment
       */
    stopEditing: function () {
      this.state = 'default'
      this.text = ''
    },
    /**
       * this function fill the comments initally
       */
    fillComments: function () {
      // TODO get all comments from the database
      // for now it fill example data
      let bspAuthorOne = new Author(0, 'Patrick Koss')
      let bspAuthorTwo = new Author(1, 'Alexander Keck')
      let bspCommentOne = new Comment(0, 'let´s do it!!!', false, new Date().toLocaleDateString(), bspAuthorOne)
      let bspCommentTwo = new Comment(1, 'here we go!!!', false, new Date().toLocaleDateString(), bspAuthorTwo)
      this.comments.push(bspCommentOne)
      this.comments.push(bspCommentTwo)
    }
  },
  beforeMount () {
    this.fillComments()
  }
}
</script>

<style scoped>
#kommentarManager{
    margin-top: 5px;
}
#comments{
    margin-top: 5px;
}
    #cancelButton{
        margin-left: 15px;
    }
    #commentBox{
        height: 400px;
        overflow: scroll;
    }
</style>
