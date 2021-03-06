// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// import router from './router'

Vue.use(Buefy)
Vue.config.productionTip = false

/* eslint-disable no-new */
const Office = window.Office
Office.initialize = () => {
  new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
  })
}

/* TODO: Remove for Release */
Office.initialize()
