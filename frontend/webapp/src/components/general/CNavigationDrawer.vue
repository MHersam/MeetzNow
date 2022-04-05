<!-- Component show the navigation drawer -->

<template lang="pug">
    v-navigation-drawer#c-navigationdrawer(fixed='', :clipped='$vuetify.breakpoint.mdAndUp', app='', v-model='drawer', :dark="darkeningGeneral")
        v-list(dense='')
            template(v-for='item in items')
                v-layout(row='', v-if='item.heading', align-center='', :key='item.heading')
                    v-flex(xs6='')
                        v-subheader(v-if='item.heading') {{ item.heading }}

                    v-flex.text-xs-center(xs6='')
                        a.body-2.black--text(href='#!') {{strings.navigationDrawerEdit}}

                v-list-group(v-else-if='item.children', v-model='item.model', :key='item.text', :prepend-icon="item.model ? item.icon : item['icon-alt']", append-icon='')
                    v-list-tile(slot='activator')
                        v-list-tile-content
                            v-list-tile-title {{ item.text }}

                    v-list-tile(v-for='(child, i) in item.children', :key='i', @click='')
                        v-list-tile-action(v-if='child.icon')
                            v-icon {{ child.icon }}
                        v-list-tile-content
                            v-list-tile-title {{ child.text }}

                v-list-tile(v-else='', :to="item.route", :key='item.text')
                    v-list-tile-action
                        v-icon {{ item.icon }}
                    v-list-tile-content
                        v-list-tile-title {{ item.text }}
</template>

<script lang="ts">

    import Vue from 'vue'
    import {Component, Watch} from 'vue-property-decorator'
    import {NAV_ITEMS, NAV_ITEMS_ENGLISH} from "../../plugins/router"
    import {VueStateField} from "../../store/State";
    import {StateModule} from "../../store/AppStore";
    import {LoginData} from "../../logic/LoginData";

    @Component
    export default class CNavigationDrawer extends Vue{

        @VueStateField(StateModule.APP)
        drawer : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.USER, "id")
        userID : any;

        items : any = NAV_ITEMS;


        /**
         * method set the language of the items in the drawer
         */
        mounted(){
            let lang = localStorage.getItem('language');
            if(lang !== null){
                if(lang === 'German') this.items = NAV_ITEMS;
                if(lang === 'English') this.items = NAV_ITEMS_ENGLISH;
            }
            else{
                this.items = NAV_ITEMS
            }
            if(this.userID !== null)this.items[NAV_ITEMS.length - 1].text = 'Logout';
            else this.items[NAV_ITEMS.length - 1].text = 'Login'
        }

        /**
         * to update the strings dynamically we have to watch the strings and set the right language
         * @private
         */
        @Watch("strings")
        __change_text_language(){
            let lang = localStorage.getItem('language');
            if(lang !== null){
                if(lang === 'German') this.items = NAV_ITEMS;
                if(lang === 'English') this.items = NAV_ITEMS_ENGLISH;
            }
            else{
                this.items = NAV_ITEMS
            }
        }

        /**
         * once you are signedIn or Logged in the last item of the drawer should be Logout
         * @private
         */
        @Watch("userID")
        __changeLastItem(){
            if(this.userID !== null)this.items[NAV_ITEMS.length - 1].text = 'Logout';
            else this.items[NAV_ITEMS.length - 1].text = 'Login'
        }

    }

</script>
