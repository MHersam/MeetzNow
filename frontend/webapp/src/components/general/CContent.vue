<!-- Component show the content components -->

<template lang="pug">
    v-content(v-bind:class="{ bluring: blur, ccontent: !blur }")
        v-container(fluid="true", fill-height='true', align-center, justify-center)
            v-fade-transition(mode="out-in")
                router-view()
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../store/AppStore";
    import {VueStateField} from "../../store/State";

    @Component
    export default class CContent extends Vue{
        @VueStateField(StateModule.GENERAL)
        blur : boolean;

        @VueStateField(StateModule.USER)
        backgroundImage : string;
    }
</script>

<style>
    .ccontent{
        min-height: 100%;
        height:100%;
        background: url("../../public/img/backgroundImage.jpg");
    }

    .wrapper{
        max-width: 2000px;
    }


    .bluring{
        overflow: auto;
        position: relative;
        -webkit-backdrop-filter: blur(3px);
    }
    .bluring:before{
        content: '';
        top: 0px;
        position: fixed;
        width: 100%;
        height: 100%;
        background: url("../../public/img/backgroundImage.jpg");
        background-size: cover;
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }
</style>
