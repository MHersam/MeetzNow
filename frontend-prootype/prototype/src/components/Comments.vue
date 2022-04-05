<template>
    <div id="kommentare">
        <div v-show="state === 'default'">
            <div>
                <p>{{comment.text}}</p>
                <button v-if="editable" @click="state = 'editing'" type="button" class="btn btn-link" id="editButton">Bearbeiten</button>
            </div>
            <div>
                <p class="textAuthor">{{comment.author.name}} <span>-</span> {{comment.createdAt}}</p>
            </div>
        </div>
        <div v-show="state === 'editing'">
            <div>
                <h3>Update Comment</h3>
            </div>
            <textarea v-model="data.text"
                      placeholder="Update comment"
                      class="form-control" id="exampleFormControlTextarea1" rows="1">
            </textarea>
            <div>
                <button type="button" class="btn btn-primary" @click="saveEdit">Update</button>
                <button type="button" class="btn btn-light" id="cancelButton" @click="resetEdit">Abbrechen</button>
                <button type="button" class="btn btn-danger" id="deleteButton" @click="deleteComment">Löschen</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Kommentare',
  props: {
    user: {
      required: true,
      type: Object
    },
    comment: {
      required: true,
      type: Object
    }
  },
  data: function () {
    return {
      state: 'default',
      data: {
        text: this.comment.text
      }
    }
  },
  methods: {
    /**
       * this function will reset the editing of a comment
       */
    resetEdit: function () {
      this.state = 'default'
      this.data.text = this.comment.text
    },
    /**
       * this function send the data to the parent where the edit will be saved
       */
    saveEdit: function () {
      this.state = 'default'
      this.$emit('comment-updated', {
        'id': this.comment.id,
        'text': this.data.text
      })
    },
    /**
       * this function send the id of the comment to the parent comment manager, where the comment will properly deleted
       */
    deleteComment: function () {
      this.$emit('comment-deleted', {
        'id': this.comment.id
      })
    }
  },
  computed: {
    editable () {
      return this.user.id === this.comment.author.id
    }
  }
}
</script>

<style scoped>
#kommentare{
}
    #editButton{
        position: relative;
        float: right;
        top: -45px;
    }
    .textAuthor{
        font-size: 12px;
        text-decoration-color: #777777;
        color: #777777;
        line-height: 0.1;
        margin-bottom: 25px;
    }
    #cancelButton{
        margin-left: 15px;
    }
    #deleteButton{
        position: relative;
        float: right;
    }
</style>
