import services from '@/services'
import {handleErrors} from '@/helpers'

export default {
  state: {
    loadedBooks: {},
    foundBooks: [],
    myWishList: [],
    myBooks: [],
    tradeToReceive: [],
    tradeToOffer: [],
    matchedUsers: []
  },
  mutations: {
    addBook (state, payload) {
      state.loadedBooks = {...state.loadedBooks, [payload.bookId]: payload}
    },
    addManyBooks (state, payload) {
      state.loadedBooks = {...state.loadedBooks, ...payload}
    },
    setFoundBooks (state, payload) {
      state.foundBooks = payload
    },
    setTradeToReceive (state, payload) {
      state.tradeToReceive = payload
    },
    setMyBooks (state, payload) {
      state.myBooks = payload
    },
    setTradeToOffer (state, payload) {
      state.tradeToOffer = payload
    },
    setMyWishList (state, payload) {
      state.myWishList = payload
    },
    setMatchedUsers (state, payload) {
      state.matchedUsers = payload
    }
  },
  actions: {
    fetchBookById: ({commit}, payload) =>
      services.book.getById(payload)
        .then(book => commit('addBook', book))
        .catch(e => console.log(e)),
    fetchBooksByManyIds: ({commit, getters, dispatch}, payload) => {
      const ids = payload.filter(id => !getters.bookById(id))
      return ids.length === 1
        ? dispatch('fetchBookById', ids)
        : ids.length > 1
          ? services.book.get({bookId: '$in:' + ids.join(',')}).then(books => books.map(e => commit('addBook', e)))
          : null
    },
    registerUserBook: ({commit, dispatch, getters}, payload) =>
      services.book.register(payload)
      .then(() => dispatch('fetchBookById', payload.bookId))
      .catch(handleErrors('register')),
    searchBooks: ({commit, dispatch}, payload) =>
      services.book.get({q: payload})
      .then(books => commit('setFoundBooks', books))
      .then(() => dispatch('clearMessages'))
      .catch(handleErrors('search')),
    getMatchUsers: ({commit}, payload) =>
      services.book.getMatchUsers(payload)
      .then(users => commit('setMatchedUsers', users)),
    fetchBooksByField: ({commit, getters, dispatch}, {commitName, filters} = {}) =>
      services.book.get(filters)
      .then(books => {
        if (!books || books.length < 1) return
        let booksObj = {}
        const ids = books.map(book => {
          booksObj[book.bookId] = book
          return book['bookId']
        })
        commit('addManyBooks', booksObj)
        if (commitName) {
          commit(commitName, ids)
        }
      }),
    myBooks: ({dispatch, getters}) =>
      dispatch('fetchBooksByField', {commitName: 'setMyBooks', filters: {ownedBy: getters.user.userName}}),
    myWishList: ({dispatch, getters}) =>
      dispatch('fetchBooksByField', {commitName: 'setMyWishList', filters: {requestedBy: getters.user.userName}})
  },
  getters: {
    books: ({loadedBooks}) => loadedBooks,
    bookById: ({loadedBooks}) => (id) => loadedBooks[id],
    myBooks: ({loadedBooks, myBooks}) => myBooks.map(id => loadedBooks[id]),
    myWishList: ({loadedBooks, myWishList}) => myWishList.map(id => loadedBooks[id]),
    tradeToReceive: ({loadedBooks, tradeToReceive}) => tradeToReceive.map(id => loadedBooks[id]),
    tradeToOffer: ({loadedBooks, tradeToOffer}) => tradeToOffer.map(id => loadedBooks[id]),
    matchedUsers: ({matchedUsers}) => matchedUsers
  }
}
