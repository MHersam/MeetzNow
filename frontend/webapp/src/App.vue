<!-- Component wrap the toolbar, the navigation drawer and the content-->

<template lang="pug">
    v-app#app()
        c-navigation-drawer
        c-toolbar
        v-layout(align-start, ref="contentRef")
            c-content
            v-snackbar(v-model='showError', :bottom='bottom', :timeout='timeout')
                | {{ error }}
            v-snackbar(v-model='dataProtection', :top='bottom', :timeout=0, :multi-line='true')
                | {{ strings.dataProtection }}
                v-btn(dark flat @click="dataProtection=false")
                    | {{strings.closeSnackbar}}
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Watch} from 'vue-property-decorator'

    import CNavigationDrawer from "./components/general/CNavigationDrawer.vue"
    import CToolBar from "./components/general/CToolBar.vue";
    import CContent from "./components/general/CContent.vue";
    import FooterLoginSignUp from "./components/general/FooterLoginSignUp.vue";
    import {ClassStateField, StateModule} from "./store/AppStore";
    import {VueStateField} from "./store/State";
    import {StringsUtil} from "./util/StringsUtil";
    import {StringsUtilEnglish} from "./util/StringsUtilEnglish";
    import {LoginData} from "./logic/LoginData";
    import * as meetz from "meetznow-api-client";

    @Component({
        name : "app",
        components : {
            FooterLoginSignUp,
            "c-navigation-drawer" : CNavigationDrawer,
            "c-toolbar" : CToolBar,
            "c-content" : CContent
        }
    })
    export default class App extends Vue{
        @VueStateField(StateModule.GENERAL)
        blur : boolean;

        @VueStateField(StateModule.GENERAL)
        dataProtection : boolean;

        @VueStateField(StateModule.APP)
        drawer : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        language : string;

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @VueStateField(StateModule.GENERAL)
        showError : boolean;

        @VueStateField(StateModule.GENERAL)
        bottom : boolean;

        @VueStateField(StateModule.USER, "id")
        userID : any;

        @VueStateField(StateModule.USER)
        userName : string;

        @VueStateField(StateModule.USER)
        loggedIn : boolean;

        @ClassStateField(StateModule.USER)
        icon : string;

        created(){
            document.title = 'Meetznow';
            new LoginData().fireBaseLogin();
            let id = localStorage.getItem('userID');
            //if you are logged in set up the data
            if(id !== ''){
                if(id !== null){
                    this.loggedIn = true;
                    if(localStorage.getItem('firebaselogin') !== 'loggedIn') this.getAccountData();
                    this.userID = localStorage.getItem('userID');
                }else{
                    this.userID = null;
                    localStorage.setItem('userID', '')
                }
            }else{
                this.userID = null;
                localStorage.setItem('userID', '')
            }
            //set up the lang
            let lang = localStorage.getItem('language');
            if(lang !== null){
                if(lang === 'German') this.strings = StringsUtil;
                if(lang === 'English') this.strings = StringsUtilEnglish;
            }
            else{
                this.strings = StringsUtilEnglish;
                localStorage.setItem('language', 'English');
            }
            //set up the theme
            let theme = localStorage.getItem('theme');
            if(theme !== null){
                if(theme === this.strings.themeLight) this.darkeningGeneral = false;
                if(theme === this.strings.themeDark) this.darkeningGeneral = true;
            }
            else{
                this.darkeningGeneral = false;
            }
        }

        @Watch('error')
        __showError(){
            if(this.error !== '') this.showError = true;
        }

        /**
         * method get the account data from the backend and set up the user variables
         */
        async getAccountData(){
            let token = localStorage.getItem('securityToken');
            let id = localStorage.getItem('userID');
            try {
                // @ts-ignore
                let data = await new meetz.UserInfoCall({token: token, payload : {
                        user_id: id
                    }}).get();
                let userInfo = data.payload.user;
                this.userName = userInfo.username;
                if(typeof userInfo.profile_image !== 'undefined' && userInfo.profile_image !== '' && userInfo.profile_image !== null) this.icon = userInfo.profile_image;
                else this.icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIciSMJrV_s1mZ0zDxFjFgzBo6vjx3rziEoaPuliZNvkfYV34r";
                }catch (e) {
                this.error = e.message;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                }, this.timeout);
            }
        }

        /**
         * if we go to the login we do a page reload to fix some problems
         * @param to
         * @param from
         * @private
         */
        @Watch("$route")
        __changeRoute(to, from){
            if(to.fullPath === "/login"){
                if(localStorage.getItem('firebaselogin') !== null) new LoginData().logoutFireBase();
                setTimeout(function () {
                    location.reload();
                }, 500)
            }
        }
    }

</script>

<style lang="scss">
    @import 'style/var';
    #footer {
        position:absolute;
        bottom:0;
    }
    /*
    TODO set a dynamic margin with the drawer size
     */
    .openDrawer{
        position:absolute;
        bottom:0;
        margin-left: 300px;
    }
</style>
