import services from '@/services'
import {handleErrors, handleResponse} from '@/helpers'
export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserProperty (state, {property, data}) {
      state.user[property] = data
    }
  },
  actions: {
    setUser: ({commit}, payload) => commit('setUser', payload),
    setUserProperty: ({commit}, payload) => commit('setUserProperty', payload),
    signIn: ({commit}, {data, from}) =>
      services.auth.signIn(data)
        .then(handleResponse(from, 'setUser'))
        .catch(handleErrors(from)),
    signUp: ({commit}, {data, from}) =>
      services.auth.signUp(data)
        .then(handleResponse(from, 'setUser'))
        .catch(handleErrors(from)),
    signinWithToken: ({commit}, {data, from}) =>
      services.auth.signInWithToken()
      .then()
      .catch(),
    signOut: ({commit}) =>
      services.auth.signOut()
        .then(commit('setUser', null)),
    signInWithSocialRedirect: ({commit}, payload) =>
      services.auth.getSignInUrl(payload)
      .then(url => {
        if (!url) return
        window.location.href = url
      }),
    signInWithGoogle: ({commit}, payload) =>
      services.auth.signInWithGoogle(payload)
        .then(user => commit('setUser', user)),
    updateUserData: ({commit}, {from, data}) =>
      services.user.updateUser(data.property, data.data)
      .then(handleResponse(from, 'setUserProperty'))
      .catch(handleErrors(from))
  },
  getters: {
    isAuthenticated: ({user}) => !!user,
    user: ({user}) => user
  }
}
