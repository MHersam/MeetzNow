import Vue from 'vue';
export default class DragAndDropPicture extends Vue {
    title: string;
    pic: string;
    url: string;
    alt: any;
    strings: any;
    logo: string;
    snackbar: boolean;
    $refs: {
        myVueDropzone: any;
    };
    dropOptions: any;
    /**
     * once the file is uploaded put the data back to the parent component
     * @param file
     * @param response
     */
    upload(file: any, response: any): void;
    removeFile(file: any, error: any, xhr: any): void;
    adjustCanceled(): void;
}
