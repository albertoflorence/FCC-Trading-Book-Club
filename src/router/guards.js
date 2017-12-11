import { store } from '@/store'

const isAuth = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (to.name === 'auth') {
      return next({name: 'home'})
    }
    return next()
  }
  if (to.name === 'auth') return next()
  next({name: 'home'})
}

export {
  isAuth
}
