import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import {config} from './helpers/firebaseConfig'
import './registerServiceWorker'
import DrawerLayout from 'vue-drawer-layout'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import Tabs from 'vue-tabs-component'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import VModal from 'vue-js-modal'
import VueCookies from 'vue-cookies'
import 'firebaseui/dist/firebaseui.css'
import Vuelidate from 'vuelidate'
import 'vue-resize/dist/vue-resize.css'
import VueResize from 'vue-resize'

Vue.config.productionTip = false
Vue.use(DrawerLayout)
Vue.use(Tabs)
Vue.use(VueTabs)
Vue.use(VModal, { dynamic: true })
Vue.use(VueCookies)
Vue.use(Vuelidate)
Vue.use(VueResize)

firebase.initializeApp(config)

export const serverBus = new Vue()

// Create the event bus by creating a new Vue instance and
// binding it somehwere accessible. If you bind it to the
// Vue prototype, you can access it within your components
// like this:
//
// Emit an event
// this.$bus.$emit('myEvent', {data: true})
//
// React to an event
// this.$bus.$on('myEvent', (message) => {console.log(message})
Vue.prototype.$bus = new Vue({})

new Vue({
  router,
  store,
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/AuthSuccess')
      } else {
        this.$router.push('/Anmeldung')
      }
    })
  },
  el: '#app',
  render: h => h(App)
}).$mount('#app')
