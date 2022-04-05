<template lang="pug">
    div#navigation
        nav#menu
            div Test entry

        main#panel
            header
                nav.navbar.navbar-fixed-top.navbar-light.bg-light
                    button.sidebar-toggler.navbar-toggler
                        span.sidebar-toggler.navbar-toggler-icon
                    a.navbar-brand.center meetznow.io
                    p {{ userName }}
</template>

<script lang="ts">

import Vue from "vue";
import Component from "vue-class-component";

// We declare the props separately
// to make props types inferable.
const AppProps = Vue.extend({
    props: {
        propMessage: String
    }
});

@Component
export default class Navigation extends AppProps{
    username : string;
}

</script>

<style lang="scss">


</style>