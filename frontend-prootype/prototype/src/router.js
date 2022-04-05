import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Anmeldung from './components/Anmeldung'
import DatumTabelle from './components/DatumTabelle'
import UmfrageErstellerSicht from './components/UmfrageErstellerSicht'
import ShareLinkInterface from './components/ShareLinkInterface'
import Account from './components/Account'
import Registrieren from './components/Registrieren'
import PollCreation from './components/PollCreation'
import PollList from './components/PollList'
// import PollParticipation from './components/PollParticipation'
import PollParticipate from './components/PollParticipate'
import ForgotPassword from './components/ForgotPassword'
import SendPassword from './components/SendPassword'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Anmeldung',
      name: 'Anmeldung',
      component: Anmeldung
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    },
    {
      path: '/UmfrageListe',
      name: 'umfrageliste',
      component: PollList
    },
    {
      path: '/UmfrageErstellen',
      name: 'umfrageerstellen',
      component: PollCreation
    },
    {
      path: '/UmfrageTeilnehmen/:id',
      name: 'umfrageteilnehmen',
      component: PollParticipate
    },
    {
      path: '/DatumTabelle',
      name: 'datumTabelle',
      component: DatumTabelle
    },
    {
      path: '/UmfrageErstellerSicht/:id',
      name: 'umfrageerstellersicht',
      component: UmfrageErstellerSicht
    },
    {
      path: '/ShareLinkInterface',
      name: 'shareLinkInterface',
      component: ShareLinkInterface
    },
    {
      path: '/Registrieren',
      name: 'registrieren',
      component: Registrieren
    },
    {
      path: '/ForgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/SendPassword',
      name: 'SendPassword',
      component: SendPassword
    }
  ]
})
