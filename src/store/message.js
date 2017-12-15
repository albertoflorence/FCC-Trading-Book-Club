export default {
  state: {
    message: null,
    messageFrom: null,
    messageType: null
  },
  mutations: {
    setMessage (state, payload) {
      state.message = payload.message
      state.messageFrom = payload.from
      state.messageType = payload.type
    },
    clearMessages (state) {
      state.message = null
      state.messageFrom = null
      state.messageType = null
    }
  },
  actions: {
    clearMessages: ({commit}) => commit('clearMessages'),
    messageSuccess: ({commit}, payload) => commit('setMessage', {...payload, type: 'success'}),
    messageError: ({commit}, payload) => commit('setMessage', {...payload, type: 'error'})
  },
  getters: {
    message: ({message}) => message,
    messageFrom: ({messageFrom}) => messageFrom,
    messageType: ({messageType}) => messageType
  }
}
