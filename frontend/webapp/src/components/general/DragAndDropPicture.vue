<!-- component is a dropzone where you can upload your logo -->

<template>
    <v-container>
        <vue-dropzone class="vue-dropzone" v-on:vdropzone-error="adjustCanceled" v-on:vdropzone-removed-file="removeFile" v-on:vdropzone-success="upload" id="customdropzone" :options="dropOptions"  style="background-color: rgba(0,0,0,0)" ref="myVueDropzone"></vue-dropzone>
        <v-snackbar
                v-model="snackbar"
                :timeout="4000"
                bottom
        >
            {{ strings.creationDropError }}
            <v-btn
                    dark
                    flat
                    @click="snackbar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
    </v-container>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import vueDropzone from '../../../node_modules/vue2-dropzone'
    import {Prop} from "vue-property-decorator";
    import {StateModule} from "../../store/AppStore";
    import {VueStateField} from "../../store/State";

    @Component({
        components: {vueDropzone}
    })
    export default class DragAndDropPicture extends Vue{
        @Prop() title : string;
        @Prop() pic : string;

        url : string = this.pic;
        alt : any = '';

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.POLLCREATION)
        logo : string;

        snackbar : boolean = false;

        $refs!: {
            myVueDropzone : any;
        };

        dropOptions : any = {
            url: 'https://httpbin.org/post',
            maxFilesize: 0.5, // MB
            maxFiles: 1,
            chunking: true,
            chunkSize: 500, // Bytes
            thumbnailWidth: 50, // px
            thumbnailHeight: 50,
            addRemoveLinks: true,
            dictDefaultMessage: this.title,
            acceptedFiles: 'image/*',
        };

        /**
         * once the file is uploaded put the data back to the parent component
         * @param file
         * @param response
         */
        upload(file, response){
            // noinspection TypeScriptUnresolvedFunction
            this.url = this.$refs.myVueDropzone.getAcceptedFiles()[0].dataURL;
            this.$emit('input', this.url)
        }

        removeFile(file, error, xhr){
            this.logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABIAAAAKICAIAAACHSRZaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA2zSURBVHhe7dcxAQAADMOg+TfducgFLrgBAACQEDAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAIgIGAAAQETAAAICIgAEAAEQEDAAAICJgAAAAEQEDAACICBgAAEBEwAAAACICBgAAEBEwAACAiIABAABEBAwAACAiYAAAABEBAwAAiAgYAABARMAAAAAiAgYAABARMAAAgIiAAQAARAQMAAAgImAAAAARAQMAAIgIGAAAQETAAAAAEtsD9S7Spuq5RpkAAAAASUVORK5CYII=';
            if(this.$refs.myVueDropzone.getAcceptedFiles().length > 0){
                this.url = this.$refs.myVueDropzone.getAcceptedFiles()[0].dataURL;
                this.$emit('input', this.url)
            }
        }

        adjustCanceled(){
            this.$refs.myVueDropzone.removeFile(this.$refs.myVueDropzone.getRejectedFiles()[0]);
            this.snackbar = true;
        }

    }
</script>

<style scoped>
    #customdropzone {
        height: 100%;
        width: 100%;
    }

    #customdropzone .dz-preview {
        width: 100%;
        display: inline-block
    }
    #customdropzone .dz-preview .dz-image {
        width: 80px;
        height: 80px;
        margin-left: 40px;
        margin-bottom: 10px;
    }
    #customdropzone .dz-preview .dz-image > div {
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background-size: contain;
    }
    #customdropzone .dz-preview .dz-image > img {
        width: 100%;
    }

    #customdropzone .dz-preview .dz-details {
        color: white;
        transition: opacity .2s linear;
        text-align: center;
    }
    #customdropzone .dz-success-mark, .dz-error-mark, .dz-remove {
        display: none;
    }
</style>
