<!--- Component show a screen with all account information. Through a button you can edit your information. -->

<template>
    <v-layout justify-center text-xs-center id="root">
        <v-flex v-show="!loadData">
            <v-card :dark="darkeningGeneral">
                <v-card-title :dark="darkeningGeneral">
                    <span class="headline" center>{{strings.accountOwner}}</span>
                </v-card-title>
                <v-avatar
                        :size="130"
                        color="grey lighten-4"
                >
                    <img data-dz-thumbnail="" :src="icon" alt="avatar">
                </v-avatar>


                <v-card-text :dark="darkeningGeneral">
                    <v-container grid-list-md>
                        <v-layout wrap row>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label=strings.accountName :value="accountData.prenameOld"  disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label=strings.accountSurname :value="accountData.lastnameOld" disabled></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md4>
                                <v-text-field :label=strings.accountUsername :value="accountData.usernameOld" disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label=strings.accountEmail :value="accountData.emailOld" disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label=strings.accountCompany :value="accountData.enterpriseOld" disabled></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field :label=strings.accountCountry :value="accountData.countryOld" disabled></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-dialog v-model="dialog" persistent max-width="5000px">
                    <v-btn slot="activator" color="primary" dark @click="setPopUp()" :disabled="disableElements" v-if="!loggedInFireBase">{{strings.accountEditing}}</v-btn>
                    <v-card :dark="darkeningGeneral">
                        <v-card-title :dark="darkeningGeneral">
                            <span class="headline">{{strings.accountEditing}}</span>
                        </v-card-title>
                        <v-card-text :dark="darkeningGeneral">
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md4 order-md1 order-sm1>
                                        <v-text-field v-model="accountData.prename" :label=strings.accountName :value="accountData.prename" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 order-md2 order-sm2>
                                        <v-text-field v-model="accountData.lastname" :label=strings.accountSurname :value="accountData.lastname"></v-text-field>
                                    </v-flex>

                                    <v-flex xs12 sm6 md4 order-md3 order-sm3>
                                        <v-text-field v-model="accountData.username" :label=strings.accountUsername :value="accountData.username" required :rules="accountData.rulesUsername"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md4 order-md1 order-sm1>
                                        <v-text-field v-model="accountData.email" :label=strings.accountEmail :value="accountData.email" required :error-messages="accountData.rulesEmail()"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 order-md2 order-sm2>
                                        <v-text-field v-model="accountData.enterprise" :label=strings.accountCompany :value="accountData.enterprise" required></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md4 order-md3 order-sm3>
                                        <v-select
                                                v-model="accountData.country"
                                                :items="[strings.accountGermany, strings.accountEngland, strings.accountFrance, strings.accountSpain]"
                                                :label=strings.accountCountry
                                                required
                                                :value="accountData.country"
                                        ></v-select>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md4 order-md1 order-sm1>
                                        <DragAndDropPicture :title="strings.signUpChangeProfilPic" :pic="accountData.iconNew" v-model="accountData.iconNew"></DragAndDropPicture>
                                    </v-flex>
                                    <v-flex xs12 sm6 md3 order-md2 order-sm2>
                                        <v-avatar :size="48" color="gray lighten-4" style="margin-top: 22px; margin-left: 15px">
                                            <img data-dz-thumbnail="" :src="accountData.iconNew">
                                        </v-avatar>
                                    </v-flex>
                                </v-layout>
                                <v-layout row wrap>
                                    <v-flex xs12 sm6 md3 order-md2 order-sm2>
                                        <v-text-field v-model="accountData.newPassword" :label=strings.accountNewPassword type="password" :rules="[accountData.rulesPassword.required, accountData.rulesPassword.min]" required></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-container grid-list-md>
                                <v-layout row wrap>
                                    <v-spacer></v-spacer>
                                    <v-flex xs12 sm6 md6>

                                        <v-btn color="blue darken-1" flat @click.native="resetVariables">{{strings.accountAbort}}</v-btn>
                                    </v-flex>

                                    <v-flex xs12 sm6 md6>
                                        <v-btn  v-on:click="" color="blue darken-1" flat @click.native="updateData()">{{strings.accountSave}}</v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-actions>

                        <v-layout align-end justify-end>
                            <label class="errorMessage" v-if="errorStepOne">{{strings.creationErrorMessage}}</label>
                        </v-layout>
                    </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="490">
                    <v-btn slot="activator" color="primary" :disabled="disableElements" v-if="!loggedInFireBase">{{strings.accountDelete}}</v-btn>
                    <v-card :dark="darkeningGeneral">
                        <v-card-title :dark="darkeningGeneral" class="headline">{{strings.accountDelete}}</v-card-title>
                        <v-card-text :dark="darkeningGeneral">{{strings.accountDeleteSure}}</v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" flat @click="dialogDelete = false">{{strings.accountAbort}}</v-btn>
                            <v-btn color="blue darken-1" flat @click.native="deleteAccount()">{{strings.accountDelete}}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </v-flex>
        <v-flex v-show="loadData">
            <v-label :dark="darkeningGeneral">{{strings.loading}}</v-label><br>
            <v-progress-linear :indeterminate="true"></v-progress-linear>
        </v-flex>
    </v-layout>
</template>


<script lang="ts">
    import Component from "vue-class-component";
    import Vue from 'vue'
    import {StateModule} from "../../store/AppStore";
    import * as meetz from "../../../node_modules/meetznow-api-client";
    import {AccountData} from "../../logic/AccountData";
    import VSelect from "vuetify/src/components/VSelect/VSelect";
    import {VueStateField} from "../../store/State";
    import DragAndDropPicture from "../general/DragAndDropPicture.vue";

    @Component({
        components: {DragAndDropPicture}
    })
    export default class RAccount extends Vue{
        @VueStateField(StateModule.GENERAL)
        darkeningGeneral : boolean;

        @VueStateField(StateModule.USER, "id")
        userID : any;

        errorStepOne : boolean = false;
        @VueStateField(StateModule.GENERAL)
        strings : any;

        @VueStateField(StateModule.GENERAL)
        loadData : boolean;

        @VueStateField(StateModule.GENERAL)
        error : string;

        @VueStateField(StateModule.GENERAL)
        timeout : number;

        @VueStateField(StateModule.GENERAL)
        disableElements : boolean;

        @VueStateField(StateModule.USER)
        icon : string;

        @VueStateField(StateModule.USER)
        loggedInFireBase : boolean;


        accountData = new AccountData(this.userID);

        dialog: boolean = false;

        dialogDelete : boolean = false;

        /**
         * this method send the updated data to the backend
         */
        async updateData(){
            if(this.accountData.validateForm()){
                this.errorStepOne = false;
                this.dialog = false;
                this.accountData.setUpdatedData(this.userID);
                //TODO do the right bc
                // await new meetz.TestCall({data: {name: 'Paddy'}}).get();
            }else this.errorStepOne = true;
        }

        /**
         * this method close the pop up where you can edit your information and reset the variables to the old values
         */
        resetVariables(){
            this.errorStepOne = false;
            this.dialog = false;
            this.accountData.newPassword = '';
            this.accountData.oldPassword = '';
        }

        /**
         * method delete the user and route you to the login sreen
         */
        async deleteAccount(){
            try{
                await new meetz.DeleteUserCall({payload : {
                        user_id: this.userID
                    }}).get();
                this.$router.push('/login/');
                this.$router.replace('/login/');
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
         * this method initialize the pop up
         */
        setPopUp(){
            this.accountData.setPopUpData();
        }

        /**
         * here will the account data loaded and the language as well as the theme set.
         */
        mounted(){
            if(this.userID !== null) this.accountData.getData(this.userID);
            else{
                this.$router.push('/login/');
                this.$router.replace('/login/');
            }
            let lang = localStorage.getItem('language');
            if(lang !== null){
                if(lang === 'German') this.accountData.language = 'German';
                if(lang === 'English') this.accountData.language = 'English';
            }
            else{
                this.accountData.language = 'German';
            }
            let theme = localStorage.getItem('theme');
            if(theme !== null){
                if(theme === 'Light') this.accountData.theme = theme;
                if(theme === 'Dark') this.accountData.theme = theme;
            }
            else{
                this.accountData.theme = 'Light';
            }
        }

        updated(){
            if(this.loggedInFireBase)this.accountData.getData(this.userID);
        }

    }
</script>

<style scoped>
    #root{
        min-height: 100vh;
        height: 100%;
    }
    .errorMessage{
        color: red;
        font-size: 75%;
        margin-right: 1%;
    }
</style>
