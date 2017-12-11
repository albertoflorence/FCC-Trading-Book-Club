import services from '@/services'

export default {
  state: {
    myPendingTrades: []
  },
  mutations: {
    setPendingTrades (state, payload) {
      state.myPendingTrades = payload
    }
  },
  actions: {
    tradeRequest: ({commit}, payload) =>
      services.trade.create(payload)
        .then(r => console.log(r))
        .catch(e => console.log(e)),
    getTrades: ({commit, dispatch}, payload) =>
      services.trade.get(payload)
      .then(async trades => {
        await dispatch('fetchBooksByManyIds', trades.map(({bookId}) => bookId))
        commit('setPendingTrades', trades)
      })
      .catch(e => console.log(e))
  },
  getters: {
    myPendingTrades: ({myPendingTrades}, {books}) => myPendingTrades.map(({bookId, ...trade}) => ({
      book: books[bookId],
      ...trade
    }))
  }
}
