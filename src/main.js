// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import LoadingCircle from './components/Globals/LoadingCircle'
import FormMessage from './components/Globals/FormMessage'
import DialogMessage from './components/Globals/DialogMessage'

import services from './services'

Vue.use(Vuetify, {
  theme: {
    primary: '#2196f3'
  }
})
Vue.component(FormMessage.name, FormMessage)
Vue.component(LoadingCircle.name, LoadingCircle)
Vue.component(DialogMessage.name, DialogMessage)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  async beforeCreate () {
    store.dispatch('startLoading', 'autoSigning')
    await services.auth.autoSignIn().then(data => data ? store.dispatch('setUser', data) : null)
    store.dispatch('stopLoading', 'autoSigning')
  }
})
