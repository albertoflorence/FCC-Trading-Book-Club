import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth/index'
import AuthCallBack from '@/components/Auth/AuthCallback'
import NotFound from '@/components/NotFound'
import UserSettings from '@/components/User/Settings/index'
import UserBooks from '@/components/User/MyBooks/index'
import BookDetails from '@/components/Book/BookDetails/index'
import BooksResult from '@/components/Book/BooksResult'
import Trade from '@/components/Book/Trade/index'
import About from '@/components/About'
import {isAuth} from './guards'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'auth',
      component: Auth,
      beforeEnter: isAuth
    },
    {
      path: '/user/settings',
      name: 'user-settings',
      component: UserSettings,
      beforeEnter: isAuth
    },
    {
      path: '/user/books',
      name: 'user-books',
      component: UserBooks
    },
    {
      path: '/auth/authcallback',
      name: 'authcallback',
      props: (route) => ({code: route.query.code}),
      component: AuthCallBack
    },
    {
      path: '/results',
      name: 'books-result',
      props: (route) => ({search: route.query.search}),
      component: BooksResult
    },
    {
      path: '/books/:id',
      name: 'book-details',
      component: BookDetails
    },
    {
      path: '/trade/:user',
      props: (route) => ({book: route.query.bookId}),
      name: 'trade',
      component: Trade
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    }
  ],
  mode: 'history'
})
