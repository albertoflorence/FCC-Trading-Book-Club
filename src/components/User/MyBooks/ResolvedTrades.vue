<template>
  <tab-content :name="name">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <books-trade 
          v-for="trade in tradesResolved"
          :key="trade._id"
          :trade="trade">
          <v-card-text class="text-xs-left">
            <p> requested by: <span style="font-weight: bold">{{trade.user}}</span> </p>
            <p>to: <span style="font-weight: bold">{{trade.userTarget}}</span> </p>
            <p> status: <span :class="(trade.status === 'accept' ? 'green' : 'red') + '--text'">{{trade.status }}</span></p>
          </v-card-text>
        </books-trade>
      </v-layout>
    </v-container>
  </tab-content>
</template>

<script>
import BooksTrade from './BooksTrade'
import TabContent from './TabContent'
export default {
  props: ['name'],
  computed: {
    tradesResolved () {
      return this.$store.getters.trades
    }
  },
  components: {
    BooksTrade,
    TabContent
  }
}
</script>

<style>
  p {
    margin: 0px
  }
</style>
