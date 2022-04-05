import Vue from 'vue';
export default class CContent extends Vue {
    label: string;
    colorValue: string;
    theme: string;
    strings: any;
    darkeningGeneral: boolean;
    colorV: string;
    colors: Array<string>;
    displayPicker: boolean;
    /**
     * method show the right color in the square
     * @param index
     */
    setColor(index: any): void;
    __colorValue(val: any): void;
    __adjustColorArray(): void;
}
