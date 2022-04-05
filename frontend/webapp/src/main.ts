import Vue from 'vue'
import '@babel/polyfill'

import './plugins/vuetify'
import {AppStore} from "./store/AppStore";
import Router from './plugins/router'

// @ts-ignore
import App from './App.vue'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import VueLayers from '../node_modules/vuelayers'
import 'vuelayers/lib/style.css'
import * as SocialSharing from "../node_modules/vue-social-sharing"
import VueClipboard from 'vue-clipboard2'
import CPollTable from "./components/global/timeslot/CPollTable.vue";

Vue.use(VueClipboard);
Vue.use(SocialSharing);

export const serverBus = new Vue();

Vue.config.productionTip = false;

Vue.use(VueLayers);
Vue.component("c-polltable", CPollTable);

new Vue({
    el: '#app',
    store: AppStore,
    router: Router,
    components : {
        App
    },
    render: h => h(App)
});
