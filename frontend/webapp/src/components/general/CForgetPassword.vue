<!-- Component show a screen where you can type in your email and request your password if you have forgot it -->

<template lang="pug">
    v-layout#root(row wrap)
        v-flex.xs8.offset-sm2
            v-card(:dark="darkeningGeneral")
                v-layout(row wrap)
                    v-layout(row wrap)
                        v-flex(v-if="show===false")
                            v-layout(row wrap align-center justify-center style="margin-top: 10px")
                                h1 {{strings.loginMeetz}}
                            v-layout(align-center justify-center pt-3)
                                v-label() {{strings.passwordForgot}}
                            v-layout(align-center justify-center pt-3)
                                v-label() {{strings.passwordForgotText}}
                            v-layout(align-center justify-center pt-3)
                                v-flex.xs8
                                    v-text-field(v-model="signUp.email" name="email" :label="strings.loginEmailAdress" type="email" :error-messages="signUp.rulesEmail()" validate-on-blur)
                            v-layout(row wrap align-center justify-center)
                                v-btn(@click.native="sendNewPassword()") {{strings.passwordForgotSend}}
                            v-layout(row wrap align-center justify-center)
                                label.errorMessage(v-if='errorStepOne') {{strings.creationErrorMessage}}
                            v-layout(row='', wrap='', style='margin-top: 35px', align-center='', justify-center='')
                                button.btn.btn-link.buttonLink(type='button', :style="'color: ' + this.$vuetify.theme.primary", @click='goToSignIn') {{strings.loginRegistry}}
                            v-layout#divider(row='', wrap='', align-center='', justify-center='')
                                v-divider
                            v-layout(row='', wrap='')
                                v-flex
                                    FooterLoginSignUp

                        v-flex(v-else)
                            v-layout(row wrap align-center justify-center style="margin-top: 10px")
                                h1 {{strings.loginMeetz}}
                            v-layout(align-center justify-center pt-3)
                                v-label {{strings.passwordForgotSendNewPassword}}
                            v-layout(align-center justify-center pt-5)
                                v-btn(@click="goToHome()") {{strings.passwordForgotBackToHome}}
                            v-layout(row wrap style="margin-top: 25px" align-center justify-center)
                                button(type="button" class="btn btn-link buttonLink" :style="'color: ' + this.$vuetify.theme.primary" @click="goToSignIn") {{strings.loginRegistry}}
                            v-layout#divider(row='', wrap='', align-center='', justify-center='')
                                v-divider
                            v-layout(row='', wrap='')
                                v-flex
                                    FooterLoginSignUp
</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {SignUpData} from "../../logic/SignUpData";
    import {ClassStateField, StateModule} from "../../store/AppStore";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import VSelect from "vuetify/src/components/VSelect/VSelect";
    import FooterLoginSignUp from "./FooterLoginSignUp.vue";
    import * as meetz from "../../../node_modules/meetznow-api-client";

    @Component({
        components: {
            FooterLoginSignUp
            }
    })

    export default class CForgotPassword extends Vue{
        @ClassStateField(StateModule.GENERAL)
        strings : any;

        signUp = new SignUpData();

        show : boolean = false;

        @ClassStateField(StateModule.GENERAL)
        blur : boolean;

        @ClassStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        errorStepOne : boolean = false;

        beforeMount(){
            this.blur = true;
        }

        beforeDestroy(){
            this.blur = false;
        }

        /**
         * method show the conformation that you have requested your password
         */
        public showIt(){
            this.show = true;
        }

        /**
         * method do the routing to the home screen
         */
        public goToHome(){
            this.$router.push('/');
            this.$router.replace('/')
        }

        /**
         * method do the routing to the sign up screen
         */
        public goToSignIn(){
            this.$router.push('/signup/');
            this.$router.replace('/signup/');
        }

        /**
         * here the request is sent to the backend
         */
        public async sendNewPassword(){
            if(this.signUp.validateForgotPassword()){
                this.errorStepOne = false;
                this.showIt();
                //TODO do the right backend call
                //await new meetz.TestCall({data: {name: 'Paddy'}}).get();
            }
            else this.errorStepOne = true
        }
    }
</script>

<style scoped>
    #root{
        height: 100%;
        min-height:100%;
        width: 100%;
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
</style>
