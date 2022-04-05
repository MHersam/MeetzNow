<!-- Component -->

<template lang="pug">
    v-card#root(:dark="darkeningGeneral")
        v-card-text(:dark="darkeningGeneral")
            v-layout(row='', wrap='')
                v-flex
                    v-layout(row='', wrap='', align-center='', justify-center='', style='margin-top: 10px')
                        h1 {{strings.loginMeetz}}
                    v-layout(row='', wrap='', align-center='', justify-center='')
                        label(v-if='!logIn.emailLogin')
                            | {{strings.loginHeader}}
                        label(v-else='')
                            | {{strings.loginText}}
                    v-layout(row='', wrap='', v-if='!logIn.emailLogin')
                        v-flex
                            v-layout(row='', wrap='', align-center='', justify-center='', style="margin-top: 20px")
                                v-btn.buttonsColor.emailLoginButton(@click='logIn.emailLoggingIn()')
                                    v-avatar(size='32px')
                                        img(src='../../public/img/email.png')
                                    span(style='margin-left: 10px') {{strings.loginWithEmail}}
                            v-layout(row='', wrap='', align-center='', justify-center='')
                                #firebaseui-auth-container()
                    v-layout(v-else='', row='', wrap='')
                        v-flex
                            v-layout(row='', wrap='', align-center='', justify-center='')
                                v-form
                                    v-text-field(:error-messages='logIn.rulesEmail()', v-model='logIn.email', prepend-icon='email', name='email', :label='strings.loginEmailAdress', type='email', :rules='[logIn.rules.required]', validate-on-blur='')
                                    v-text-field(v-model='logIn.password', prepend-icon='lock', name='password', :label='strings.loginPassword', :append-icon="logIn.showPassword ? 'visibility_off' : 'visibility'", :type="logIn.showPassword ? 'text' : 'password'", v-on:click:append='logIn.showPassword = !logIn.showPassword', :rules='[logIn.rules.required, logIn.rules.min]', v-on:keyup.enter='loggingIn', validate-on-blur='')
                            v-layout(row='', wrap='', align-start='', justify-center='')
                                button.btn.btn-link.buttonLink(type='button', @click='goToForgotPassword()') {{strings.loginForgotPassword}}
                            v-layout(row='', wrap='', align-center='', justify-center='')
                                v-flex#loginButtons(align-center='', justify-center='')
                                    v-btn(align-center='', justify-center='', @click="loggingIn()", :disabled="disableElements") {{strings.loginButton}}
                                    v-btn(align-center='', justify-center='', @click='logIn.backToGeneral()', :disabled="disableElements") {{strings.loginBackButton}}
                            v-layout(align-center='', justify-center='')
                                label.errorMessage(v-if='errorStepOne') {{strings.creationErrorMessage}}
                    v-layout(row='', wrap='', style='margin-top: 35px', align-center='', justify-center='')
                        button.btn.btn-link.buttonLink(type='button', :style="'color: ' + this.$vuetify.theme.primary", @click='goToSignIn', :disabled="disableElements") {{strings.loginRegistry}}
                    v-layout#divider(row='', wrap='', align-center='', justify-center='')
                        v-divider
                    v-layout(row='', wrap='')
                        v-flex
                            FooterLoginSignUp

</template>

<script lang="ts">
    import firebase from 'firebase/app';
    import 'firebase/auth';
    import firebaseui from 'firebaseui'
    import {config} from './../../helpers/firebaseConfig'
    import 'firebaseui/dist/firebaseui.css'
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {LoginData} from "../../logic/LoginData";
    import {ClassStateField, StateModule} from "../../store/AppStore";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import FooterLoginSignUp from "../general/FooterLoginSignUp.vue";
    import * as meetz from "../../../node_modules/meetznow-api-client";
    import {VueStateField} from "../../store/State";

    @Component({
        components: {FooterLoginSignUp}
    })
    export default class CLogin extends Vue{
        logIn = new LoginData();

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        blur : boolean;

        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.USER, "id")
        userID : any;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @ClassStateField(StateModule.USER)
        loggedInFireBase : boolean;

        @ClassStateField(StateModule.USER)
        icon : string;

        created(){
            this.disableElements = false;
        }

        @VueStateField(StateModule.GENERAL)
        showError : boolean;


        errorStepOne : boolean = false;

        interval : any;

        /**
         * method will logout you if you are logged in
         */
        mounted(){
            this.blur = true;
            this.logIn.firebaseConfig();
            if(this.userID !== null){
                if(this.loggedInFireBase === true)this.logIn.logoutFireBase();
                else this.logIn.logoutEmail();
                localStorage.setItem('userID', '');
                this.logIn.loggedIn = false;
                this.userID = '';
                localStorage.setItem('securityToken', null);
            }
        }

        updated(){
            if(document.getElementById("firebaseui-auth-container")){
                this.logIn.firebaseConfig();
            }
        }

        beforeDestroy(){
            this.blur = false;
        }

        /**
         * method route you to the forgot password screen
         */
        public goToForgotPassword(){
            this.$router.push('/password/new/');
            this.$router.replace('/password/new/');
        }


        /**
         * method route you to the sign up screen
         */
        public goToSignIn(){
            this.$router.push('/signup/');
            this.$router.replace('/signup/');
        }

        /**
         * method route you to the home screen
         */
        goToHome(){
            this.$router.push('/');
            this.$router.replace('/')
        }

        /**
         * method logs you in and set some of the user data
         */
        async loggingIn(){
            if(this.logIn.validateForms()){
                this.disableElements = true;
                this.errorStepOne = false;
                try{
                    let user = await new meetz.LoginCall({payload : {
                            email: this.logIn.email,
                            password: this.logIn.password
                        }}).get();
                    localStorage.setItem('userID', user.payload.user_id);
                    this.userID = user.payload.user_id;
                    localStorage.setItem('securityToken', user.payload.token);
                    this.logIn.loggedIn = true;
                    // @ts-ignore
                    let data = await new meetz.UserInfoCall({token: user.payload.token, payload : {
                            user_id: user.payload.user_id
                        }}).get();
                    let userInfo = data.payload.user;
                    if(typeof userInfo.school !== 'undefined' && userInfo.school !== '') this.icon = userInfo.school;
                    else this.icon = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIciSMJrV_s1mZ0zDxFjFgzBo6vjx3rziEoaPuliZNvkfYV34r";
                    this.logIn.userName = data.payload.user.username;
                    localStorage.setItem('userName', data.payload.user.username);
                    this.disableElements = false;
                    this.goToHome();
                }catch (e) {
                    this.error = e.message;
                    let self = this;
                    setTimeout(function(){
                        self.error = '';
                        self.disableElements = false;
                    }, this.timeout);
                }
            } else this.errorStepOne = true
        }
    }
</script>
<style scoped>
    #root{
        height: 100%;
        width: 100%;
        min-height: 100%;
    }
    .containerContent{
        background-color: white;
        border-style: solid;
        border-width: 10px;
        width: 33%;
        margin-left: 33%;
        margin-top: 5%;
    }
    .emailLoginButton{
        width: 205px;
    }
    #divider{
        width: 50%;
        margin-left: 25%;
    }
    .buttonLink{
        font-size: 100%;
        text-align: center;
    }
    .buttonLink:hover{
        text-decoration: underline;
    }
    #loginButtons{
        text-align: center;
        margin-top: 10%;
    }
    #footer {
        position:absolute;
        bottom:0;
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
</style>
