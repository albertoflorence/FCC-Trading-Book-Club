import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import loading from './loading'
import message from './message'
import book from './book'
import notification from './notification'
import trade from './trade'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    user,
    loading,
    message,
    book,
    notification,
    trade
  }
})
