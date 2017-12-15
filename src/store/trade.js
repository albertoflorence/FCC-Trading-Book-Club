import services from '@/services'
import {handleErrors, handleResponse} from '@/helpers'

export default {
  state: {
    trades: []
  },
  mutations: {
    setTrades (state, payload) {
      state.trades = payload
    }
  },
  actions: {
    tradeRequest: ({commit}, payload) =>
      services.trade.create(payload)
      .then(handleResponse('tradeAnswer', 'getTrades'))
      .catch(handleErrors('tradeAnswer')),
    getTrades: ({commit, dispatch, getters}, payload) =>
      services.trade.get(payload)
      .then(async trades => {
        await dispatch('fetchBooksByManyIds', trades.reduce((arr, item) => arr.concat(item.bookId, item.bookIdTarget), []))
        commit('setTrades', trades)
      })
      .catch(e => console.log(e)),
    tradeAnswer: ({commit, dispatch}, payload) =>
      services.trade.answer(payload)
      .then(handleResponse('tradeAnswer', 'getTrades'))
      .catch(handleErrors('tradeAnswer'))
  },
  getters: {
    embedBookToTrade: (state, {books}) => ({bookId, bookIdTarget, ...trade}) => ({
      bookTarget: books[bookIdTarget],
      book: books[bookId],
      ...trade
    }),
    tradesPending: ({trades}, {embedBookToTrade, user}) => trades.filter(trade => trade.status === 'pending').map(embedBookToTrade),
    trades: ({trades}, {embedBookToTrade}) => trades.map(embedBookToTrade)
  }
}
