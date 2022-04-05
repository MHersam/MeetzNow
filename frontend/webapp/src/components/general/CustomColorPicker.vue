<!--- Component set a color through a pop up and show it in a square -->

<template>
    <v-layout row wrap>
        <v-flex>
            <v-layout row wrap :dark="darkeningGeneral">
                <v-menu :close-on-content-click="false"
                        offset-y
                        lazy
                        full-width
                        v-model="displayPicker"
                        transition="scale-transition"
                        max-width="240px"
                        min-width="240px"
                        max-height="240px"
                        min-height="240px"
                        :dark="darkeningGeneral"
                        :nudge-right="40"
                >
                    <v-text-field v-model="colorValue" :label="label" readonly slot="activator"/>
                    <v-card :dark="darkeningGeneral" style="max-width: 240px; max-height: 240px">
                        <v-card-text style="max-width: 240px; height: 240px" :dark="darkeningGeneral">
                        <span style="max-width: 240px; max-height: 240px; background-color: #2c3e50" v-for="(color, index) in colors">
                            <div @click="setColor(index)" :style="'height: 24px; float: left; width: 24px; background-color: ' + color"></div>
                        </span>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue';
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import {Prop, Watch} from "vue-property-decorator";
    import {StateModule} from "../../store/AppStore";
    import {headerColorLight, headerColorDark} from "../../util/ColorUtils";
    import {VueStateField} from "../../store/State";

    @Component
    export default class CContent extends Vue{
        @Prop() label : string;
        @Prop() colorValue : string;
        @Prop() theme : string;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        colorV : string = this.colorValue;

        colors : Array<string> = headerColorLight;

        displayPicker : boolean = false;


        /**
         * method show the right color in the square
         * @param index
         */
        setColor(index){
            this.colorV = this.colors[index];
            this.displayPicker = false;
        }

        @Watch("colorV")
        __colorValue(val){
            if (val) {
                this.$emit('input', val)
            }

        }

        @Watch("theme")
        __adjustColorArray(){
            if(this.theme === this.strings.themeLight){
                this.colors = headerColorLight;
            }else{
                this.colors = headerColorDark;
            }
            let index = this.colors.findIndex((element) => {
                return element === this.colorV;
            });
            if(index === -1)this.colorV = this.colors[0];
        }
    }
</script>

<style scoped>
</style>
