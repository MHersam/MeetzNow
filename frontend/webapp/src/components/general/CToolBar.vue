<!-- Component show the header / toolbar -->

<template lang="pug">
    v-toolbar#c-toolbar(:dark="darkeningGeneral", app='', :clipped-left='$vuetify.breakpoint.mdAndUp', fixed='')
        v-toolbar-side-icon(@click.stop='drawer = !drawer')
        v-toolbar-title(justify-center="") Meetznow.io
        v-spacer
        v-menu(open-on-hover offset-y bottom left)
            v-btn(icon='', large='', slot='activator')
                v-avatar(size='32px', tile='')
                    v-icon() security
            v-list
                v-list-tile(@click="goToDataProtection")
                    v-list-tile-title {{strings.toolbarDataProtection}}
                v-list-tile(@click="goToLegalNotice")
                    v-list-tile-title {{strings.toolbarLegalNotice}}
                v-list-tile(@click="goToTermsOfUse")
                    v-list-tile-title {{strings.toolbarTermsOfUse}}
        v-menu(open-on-hover offset-y bottom left)
            v-btn(icon='', large='', slot='activator')
                v-avatar(size='32px', tile='')
                    v-icon() settings
            v-list
                v-list-tile()
                    v-dialog(v-model="languageDialog" scrollable max-width="200px")
                        v-list-tile-title(dark slot="activator") {{strings.toolbarSelectLanguage}}
                        v-card(:dark="darkeningGeneral")
                            v-card-title {{strings.toolbarSelectLanguage}}
                            v-card-text(:dark="darkeningGeneral")
                                v-radio-group(v-model="language" column)
                                    v-radio(:label="strings.toolbarLanguageGerman" value="German")
                                    v-radio(:label="strings.toolbarLanguageEnglish" value="English")
                            v-card-actions()
                                v-spacer
                                v-btn(color="blue darken-1" flat @click.native="languageDialog = false") {{strings.toolbarDialogClose}}
                v-list-tile(@click="changeTheme()")
                    v-switch(:label="strings.toolbarDarkThemeSelector" v-model="themeSwitch")
        v-menu(open-on-hover offset-y bottom left)
            v-btn(icon='', large='', slot='activator')
                v-avatar(size='32px')
                    img(v-if="loggedIn" :src="icon" to="/account")
                    v-icon(v-else to="/login") account_circle
            v-list
                v-list-tile(v-if="!loggedIn" to="/login")
                    v-list-tile-title() {{strings.toolBarLogin}}
                v-list-tile(v-if="!loggedIn" to="/signup")
                    v-list-tile-title() {{strings.toolBarRegistry}}
                v-list-tile(v-if="loggedIn" to="/account")
                    v-list-tile-title() {{strings.toolBarSignedInAs}} {{userName}}
                v-list-tile(v-if="loggedIn" to="/login")
                    v-list-tile-title() {{strings.toolBarLogOut}}
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Watch} from 'vue-property-decorator'
    import {VueStateField} from "../../store/State";
    import {ClassStateField, StateModule} from "../../store/AppStore";
    import {StringsUtil} from "../../util/StringsUtil";
    import {StringsUtilEnglish} from "../../util/StringsUtilEnglish";
    import {LoginData} from "../../logic/LoginData";

    @Component
    export default class CToolBar extends Vue{

        @VueStateField(StateModule.APP)
        drawer : object;

        @VueStateField(StateModule.APP)
        items : Array<any>;

        @ClassStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @ClassStateField(StateModule.GENERAL)
        strings : any;

        @ClassStateField(StateModule.USER)
        loggedIn : boolean;

        @ClassStateField(StateModule.USER)
        userName : string;

        @ClassStateField(StateModule.USER)
        icon : string;

        language : string = 'German';
        theme : string = 'Light';
        themeSwitch : boolean = false;
        languageDialog : boolean = false;

        mounted(){
            let lang = localStorage.getItem('language');
            if(lang !== null){
                if(lang === 'German') this.language = 'German';
                if(lang === 'English') this.language = 'English';
            }
            else{
                this.language = 'German';
            }
            let theme = localStorage.getItem('theme');
            if(theme !== null){
                if(theme === 'Light'){
                    this.theme = theme;
                    this.themeSwitch = false;
                }
                if(theme === 'Dark'){
                    this.theme = theme;
                    this.themeSwitch = true;
                }
            }
            else{
                this.theme = 'Light';
                this.themeSwitch = false;
            }
        }

        @Watch("theme")
        __changeTheme(){
            this.darkeningGeneral = this.theme === this.strings.themeDark;
            if(this.darkeningGeneral === false) {
                localStorage.setItem('theme', this.strings.themeLight);
                document.getElementsByTagName('meta')["theme-color"].setAttribute("content", "#FFFFFF");
            }
            else {
                localStorage.setItem('theme', this.strings.themeDark);
                document.getElementsByTagName('meta')["theme-color"].setAttribute("content", "#000000");
            }
        }

        @Watch("language")
        __changeLanguage(){
            if(this.language === this.strings.accountGerman){
                localStorage.setItem('language', this.strings.accountGerman);
                this.strings = StringsUtil;
            }
            if(this.language === this.strings.accountEnglish){
                localStorage.setItem('language', this.strings.accountEnglish);
                this.strings = StringsUtilEnglish;
            }
        }

        changeLanguage(){
            if(this.language === this.strings.accountGerman) this.language = this.strings.accountEnglish;
            else this.language = this.strings.accountGerman;
        }

        changeTheme(){
            if(this.theme === this.strings.themeLight){
                this.theme = this.strings.themeDark;
                this.themeSwitch = true;
            }
            else {
                this.theme = this.strings.themeLight;
                this.themeSwitch = false;
            }
        }

        /**
         * method route you to the data protection declaration
         */
        goToDataProtection(){
            this.$router.push('/data_protection/');
            this.$router.replace('/data_protection/');
        }

        /**
         * method route you to the legal notice screen
         */
        goToLegalNotice(){
            this.$router.push('/legal_notice/');
            this.$router.replace('/legal_notice/');
        }

        /**
         * method route you to the terms of use
         */
        goToTermsOfUse(){
            this.$router.push('/terms_of_use/');
            this.$router.replace('/terms_of_use/');
        }
    }
</script>

<style>
</style>
