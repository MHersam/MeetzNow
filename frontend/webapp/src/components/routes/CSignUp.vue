<template lang="pug">
    v-layout#root(row wrap)
        v-flex.xs12.sm10.offset-sm1
            v-card(:dark="darkeningGeneral")
                v-stepper(v-model="steps.stepper", alt-labels)
                    v-stepper-header
                        v-stepper-step( :complete="steps.stepper > 1" step="1")
                            span() {{strings.signUpGeneral}}
                        v-divider
                        v-stepper-step( :complete="steps.stepper > 2" step="2")
                            span() {{strings.signUpAdditional}}
                        v-divider
                        v-stepper-step(step="3")
                            span() {{strings.signUpConfirmation}}

                    v-stepper-items
                        v-stepper-content(step="1")
                            v-layout(align-center justify-center row wrap)
                                h1 {{strings.meetznow}}
                            v-layout(align-center justify-center pt-3 row wrap)
                                v-label() {{strings.signUpText}}
                            v-container(fluid grid-list-md)
                                v-layout(row wrap justify-center)
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(v-model="signUp.email" name="email" :label="strings.loginEmailAdress" type="email" :error-messages="signUp.rulesEmail()" validate-on-blur)
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(name="username", :label="strings.signUpUsername", v-model="signUp.username", :rules="signUp.rulesUsername")
                                v-layout(row wrap justify-center)
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(v-model="signUp.password" id="password" name="password" :label="strings.loginPassword" :append-icon="signUp.showPassword ? 'visibility_off' : 'visibility'" :type="signUp.showPassword ? 'text' : 'password'" v-on:click:append="signUp.showPassword = !signUp.showPassword" :rules="[signUp.rules.required, signUp.rules.min]" validate-on-blur)
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(v-model="signUp.passwordConfirm" id="passwordConfirm" name="passwordConfirm" :label="strings.signUpPasswordConfirm" :append-icon="signUp.showPassword ? 'visibility_off' : 'visibility'" :type="signUp.showPassword ? 'text' : 'password'" v-on:click:append="signUp.showPassword = !signUp.showPassword" :error-messages="signUp.rulesPasswordConfirm()" validate-on-blur)

                            v-layout(align-end justify-end row wrap)
                                v-btn(@click="next") {{strings.createButtonForward}}
                                    v-icon(right) navigate_next
                            v-layout(align-center justify-center)
                                label.errorMessage(v-if='errorStepOne') {{strings.creationErrorMessage}}
                            v-layout(row wrap align-center justify-center style="margin-top: 30px; margin-bottom: 10px; text-align:center")
                                v-label {{strings.signUpAccount}}
                                button(style="margin-left: 5px" type="button" class="btn btn-link linkButton" @click="goToLogin()", :style="'color: ' + this.$vuetify.theme.primary") {{strings.signUpLogin}}
                            v-layout#divider(row='', wrap='', align-center='', justify-center='')
                                v-divider
                            v-layout
                                FooterLoginSignUp

                        v-stepper-content(step="2")
                            v-layout(align-center justify-center row wrap)
                                h1 {{strings.meetznow}}
                            v-layout(align-center justify-center pt-3 row wrap)
                                v-label() {{strings.signUpAdditionalText}}
                            v-container(fluid grid-list-md)
                                v-layout(row wrap justify-center)
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(name="company" :label="strings.signUpCompany" v-model="signUp.company")
                                    v-flex(xs12 sm6 md6)
                                        v-select(
                                        id="id_country"
                                        :items="[strings.signUpGermany, strings.signUpEngland, strings.signUpFrance, strings.signUpSpain]"
                                        label="Land"
                                        required
                                        v-model="signUp.country"
                                        :value="signUp.country")

                                v-layout(row justify-center)
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(name="name" :label="strings.signUpName" v-model="signUp.name")
                                    v-flex(xs12 sm6 md6)
                                        v-text-field(name="surname" :label="strings.signUpSurname" v-model="signUp.surname")

                                v-layout(row wrap justify-center style="text-align: center")
                                    v-flex(xs12 sm6 md6)
                                        v-flex(xs12)
                                            v-label {{strings.signUpProfilPicture}}
                                        v-flex(xs12)
                                            v-avatar(:size="120" color="grey lighten-4")
                                                img(src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIciSMJrV_s1mZ0zDxFjFgzBo6vjx3rziEoaPuliZNvkfYV34r", v-if="signUp.profilePicture === ''")
                                                img(data-dz-thumbnail="", :src="signUp.profilePicture", v-else="")

                                v-layout(align-center justify-center pt-3 row wrap)
                                    v-flex(xs12 sm6 md6)
                                        DragAndDropPicture(:title="strings.signUpChangeProfilPic", :pic="signUp.profilePicture", v-model="signUp.profilePicture")
                            v-layout(align-end justify-end row wrap)
                                v-btn(@click="goBack" flat) {{strings.signUpButtonGoBack}}
                                v-btn(@click="next()") {{strings.createButtonForward}}
                                    v-icon(right) navigate_next
                            v-layout
                                FooterLoginSignUp

                        v-stepper-content(step="3")
                            v-layout(align-center justify-center row wrap)
                                h1 {{strings.meetznow}}
                            v-container(fluid grid-list-md)
                                v-layout(row wrap)
                                    v-flex(xs12 sm6 md6)
                                        v-label {{this.strings.signUpConfirmationEmail}} {{signUp.email}}
                                    v-flex(xs12 sm6 md6)
                                        v-label {{this.strings.signUpConfirmationUserName}} {{signUp.username}}
                                v-layout(row wrap)
                                    v-flex(xs12 sm6 md6)
                                        v-label {{this.strings.signUpConfirmationCompany}} {{signUp.company}}
                                    v-flex(xs12 sm6 md6)
                                        v-label {{this.strings.signUpConfirmationCountry}} {{signUp.country}}
                                v-layout(row wrap)
                                    v-flex(xs12 sm6 md6)
                                        v-label {{this.strings.signUpConfirmationName}} {{signUp.name}}
                                    v-flex(xs12 sm6 md6)
                                        v-label {{this.strings.signUpConfirmationSurname}} {{signUp.surname}}

                            v-layout(align-end justify-end row wrap)
                                v-btn(@click="goBack" flat, :disabled="disableElements") {{strings.signUpButtonGoBack}}
                                v-btn(@click="goToHome()", :disabled="disableElements") {{strings.signUpGetStarted}}
                                v-dialog(v-model="creationDone", persistent='')
                                    SignUpConfirmationScreen(v-if="creationDone")
                            v-layout
                                FooterLoginSignUp


</template>

<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {SignUpData} from "../../logic/SignUpData";
    import {ClassStateField, StateModule} from "../../store/AppStore";
    import VTextField from "vuetify/src/components/VTextField/VTextField";
    import VSelect from "vuetify/src/components/VSelect/VSelect";
    import DragAndDropPicture from "../general/DragAndDropPicture.vue";
    import FooterLoginSignUp from "../general/FooterLoginSignUp.vue";
    import SignUpConfirmationScreen from "../general/SignUpConfirmationScreen.vue";
    import * as meetz from "../../../node_modules/meetznow-api-client";
    import {VueStateField} from "../../store/State";

    export interface ISteps {
        stepper : number,
    }

    @Component({
        components: {
            SignUpConfirmationScreen,
            FooterLoginSignUp,
            DragAndDropPicture}
    })
    export default class CSignUp extends Vue{
        signUp = new SignUpData();

        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.USER, "id")
        userID : any;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean ;

        created(){
            this.disableElements = false;
        }

        @VueStateField(StateModule.GENERAL)
        showError : boolean;

        @VueStateField(StateModule.GENERAL)
        bottom : boolean;

        creationDone : boolean = false;

        steps : ISteps = {
            stepper : 1
        };

        @ClassStateField(StateModule.GENERAL)
        blur : boolean;

        @ClassStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.GENERAL)
        dataProtection : boolean;

        errorStepOne : boolean = false;

        @ClassStateField(StateModule.USER)
        loggedIn : boolean;

        @ClassStateField(StateModule.USER)
        userName : string;

        @ClassStateField(StateModule.USER)
        icon : string;

        @ClassStateField(StateModule.USER)
        backgroundImage : string;

        mounted(){
            this.blur = true;
        }

        beforeDestroy(){
            this.blur = false;
        }

        public goToLogin(){
            this.$router.push('/login/');
            this.$router.replace('/login/');
        }

        /**
         * method signs you up and route you the home screen afterward
         */
        async goToHome(){
            this.disableElements = true;
            try{
                let user = await new meetz.RegisterCall({payload : {
                        username: this.signUp.username,
                        name: this.signUp.name,
                        surname: this.signUp.surname,
                        email: this.signUp.email,
                        password: this.signUp.password,
                    }}).get();
                localStorage.setItem('userID', user.payload.user_id);
                this.userID = user.payload.user_id;
                localStorage.setItem('securityToken', user.payload.token);
                this.loggedIn = true;
                this.userName = this.signUp.username;
                //add the additonal optional data with updating the user
                const additionalData = await new meetz.UpdateUserCall({token: user.payload.token, payload : {
                        user_id : this.userID,
                        user: {
                            username : this.signUp.username,
                            name : this.signUp.name,
                            surname : this.signUp.surname,
                            email : this.signUp.email,
                            hash : this.signUp.password,
                            company : this.signUp.company,
                            birthdate : new Date(),
                            gender : '',
                            school : '',
                            profile_image : this.signUp.profilePicture,
                            country : this.signUp.country
                        }
                    }}).get();
                if(this.signUp.profilePicture !== '') this.icon = this.signUp.profilePicture;
                this.creationDone = true;
                this.disableElements = false;
                this.dataProtection = false;
            }catch (e) {
                this.error = e.message;
                let self = this;
                setTimeout(function(){
                    self.error = '';
                    self.disableElements = false;
                }, this.timeout);
            }
        }

        /**
         * method put you to the next step
         */
        next(){
            if(this.signUp.validateForm()){
                this.steps.stepper ++;
                this.errorStepOne = false;
                if(this.steps.stepper === 3)this.dataProtection = true;
            }
            else this.errorStepOne = true
        }

        goBack(){
            this.steps.stepper --;
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
