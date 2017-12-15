<template>
  <v-container>
    <v-tabs v-model="active" >
      <v-tabs-bar color="blue" dark>
        <v-tabs-item
          v-for="tab in tabs"
          :key="tab.name"
          :href="'#' + tab.name"
          ripple>
          <h4 style="text-transform: none">{{ tab.name }}</h4>
        </v-tabs-item>
        <v-tabs-slider color="yellow"></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <my-books name="My Books"></my-books>
        <wish-list name="My Wish List"></wish-list>
        <pending-trades name="My Pending Trades"></pending-trades>
        <resolved-trades name="My Trades"></resolved-trades>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import MyBooks from './MyBooks'
import WishList from './WishList'
import PendingTrades from './PendingTrades'
import ResolvedTrades from './ResolvedTrades'
export default {
  computed: {
    tabs () {
      return [
        {name: 'My Books'},
        {name: 'My Wish List'},
        {name: 'My Pending Trades'},
        {name: 'My Trades'}
      ]
    }
  },
  data: () => ({
    active: null
  }),
  methods: {
    async fetch (action, params) {
      this.$store.dispatch('startLoading', this.active)
      await this.$store.dispatch(action, params)
      this.$store.dispatch('stopLoading', this.active)
    }
  },
  watch: {
    active () {
      switch (this.active) {
        case 'My Books':
          this.fetch('myBooks')
          break
        case 'My Wish List':
          this.fetch('myWishList')
          break
        case 'My Pending Trades':
          this.fetch('getTrades')
          break
        case 'My Trades':
          this.fetch('getTrades')
          break
      }
    }
  },
  created () {
    const {tab} = this.$route.query
    this.active = tab
  },
  components: {
    PendingTrades,
    MyBooks,
    WishList,
    ResolvedTrades
  }
}
</script>

<style>
</style>
