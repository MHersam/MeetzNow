import Vue from 'vue'
import Router from 'vue-router'

import RHome from "../components/routes/RHome.vue";
import RPollNew from "../components/routes/poll/RPollNew.vue";
import RPollList from "../components/routes/poll/RPollList.vue";
import RPollParticipate from "../components/routes/poll/RPollParticipate.vue";
import CLogin from "../components/routes/CLogin.vue";
import CSignUp from "../components/routes/CSignUp.vue";
import RAccount from "../components/routes/RAccount.vue"
// @ts-ignore
import CForgotPassword from "../components/general/CForgetPassword.vue";
import {ClassStateField, StateModule} from "../store/AppStore";
import RHelp from "../components/routes/RHelp.vue";
import RDataProtection from "../components/routes/RDataProtection.vue";
import RLegalNotice from "../components/routes/RLegalNotice.vue";
import RTermsOfUse from "../components/routes/RTermsOfUse.vue";


export enum R{
    HOME = "/",
    POLL_NEW = "/poll/new",
    POLL_PARTICIPATE = "/poll/participate/:id",
    POLL_LIST = "/poll/liste",
    POLL_NEWPOLLCARDS = "/poll/newpollcards",
    HELP = "/help",
    SETTINGS = "/settings",
    FEEDBACK = "/feedback",
    DOWNLOAD = "/download",
    LOGIN = "/login",
    SIGNUP = "/signup",
    ACCOUNT = "/Account",
    PASSWORD_NEW = "/password/new",
    LEGAL_NOTICE = "/legal_notice",
    DATA_PROTECTION = "/data_protection",
    TERMS_OF_USE = "/terms_of_use"
}

export const  NAV_ITEMS = [
    { icon: 'home', text: 'Home' , route : R.HOME},
    { icon: 'add_circle', text: "Neue Umfrage erstellen", route : R.POLL_NEW},
    { icon: 'view_list', text: "Umfrage Liste", route : R.POLL_LIST},
    { icon: 'account_circle', text: "Mein Account", route : R.ACCOUNT},
    { icon: 'help', text: 'Hilfe', route : R.HELP },
    { icon: 'exit_to_app', text: 'Login', route: R.LOGIN}
];

export const  NAV_ITEMS_ENGLISH = [
    { icon: 'home', text: 'Home' , route : R.HOME},
    { icon: 'add_circle', text: "Create new poll", route : R.POLL_NEW},
    { icon: 'view_list', text: "Poll list", route : R.POLL_LIST},
    { icon: 'account_circle', text: "My Account", route : R.ACCOUNT},
    { icon: 'help', text: 'Help', route : R.HELP },
    { icon: 'exit_to_app', text: 'Login', route: R.LOGIN}
];

const routes = [
    { path: R.HOME, component: RHome},
    { path: R.POLL_NEW, component : RPollNew},
    { path: R.POLL_LIST, component : RPollList, props: true, name: 'pollList'},
    { path: R.POLL_PARTICIPATE, component : RPollParticipate},
    { path: R.LOGIN, component : CLogin},
    { path: R.SIGNUP, component : CSignUp},
    { path: R.ACCOUNT, component : RAccount},
    { path: R.PASSWORD_NEW, component : CForgotPassword},
    { path: R.HELP, component : RHelp},
    { path: R.LEGAL_NOTICE, component : RLegalNotice},
    { path: R.DATA_PROTECTION, component : RDataProtection},
    { path: R.TERMS_OF_USE, component : RTermsOfUse}
];

export default new Router({
    routes
})

Vue.use(Router);
