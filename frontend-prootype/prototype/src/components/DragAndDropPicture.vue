<template>
    <div class="container">
        <vue-dropzone id="drop" :options="dropOptions"></vue-dropzone>
    </div>
</template>

<script>
import vueDropzone from 'vue2-dropzone'
export default {
  name: 'DragAndDropPicture',
  components: {
    vueDropzone
  },
  props: {
    title: ''
  },
  data () {
    return {
      dropOptions: {
        url: 'https://httpbin.org/post',
        maxFilesize: 2, // MB
        maxFiles: 1,
        chunking: true,
        chunkSize: 500, // Bytes
        thumbnailWidth: 50, // px
        thumbnailHeight: 50,
        addRemoveLinks: true,
        dictDefaultMessage: this.title
      }
    }
  },
  methods: {
    /**
             * function for drag and drop component
             * @param image
             */
    onChange (image) {
      /* eslint-disable no-console */
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: Use the <form>, Luke!')
      }
      /* eslint-enable no-console */
    }
  }
}
</script>

<style scoped>

</style>
