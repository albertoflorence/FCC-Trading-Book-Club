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
        <v-tabs-content
          v-for="tab in tabs"
          :key="tab.name"
          :id="tab.name">
          <v-card flat>
            <books-show :books="tab.content"></books-show>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-container>
</template>

<script>
import BooksShow from '../../Book/BooksShow'
export default {
  computed: {
    myBooks () {
      return this.$store.getters.myBooks
    },
    myWishList () {
      return this.$store.getters.myWishList
    },
    myPendingTrades () {
      return this.$store.getters.myPendingTrades.map(e => e.book)
    },
    tabs () {
      return [
        {name: 'My Books', content: this.myBooks},
        {name: 'My Wish List', content: this.myWishList},
        {name: 'My Pending Trades', content: this.myPendingTrades}
      ]
    }
  },
  created () {
    const user = this.$store.getters.user.userName
    this.$store.dispatch('fetchBooksByField', {
      commitName: 'setMyBooks',
      filters: {ownedBy: user}
    })
    this.$store.dispatch('fetchBooksByField', {
      commitName: 'setMyWishList',
      filters: {requestedBy: user}
    })
    this.$store.dispatch('getTrades')
  },
  data: () => ({
    active: null
  }),
  components: {
    BooksShow
  }
}
</script>

<style>
</style>
