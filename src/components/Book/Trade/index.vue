<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12 md6 offset-md3>
        <book-image :leftImage="thumbnail(toReceiveItem)" :rightImage="thumbnail(toOfferItem)"/>
        <v-layout :column="$vuetify.breakpoint.xsOnly">
          <v-flex xs12 md6>
            <book-select :books="toOffer" label="select what you going to give" v-on:onSelectValue="setToReceiveItem" v-if="toOffer"></book-select>
          </v-flex>
          <v-flex xs12 md6>
            <book-select :books="toReceive" label="select what you want to receive" v-on:onSelectValue="setToOfferItem" v-if="toReceive"></book-select>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-btn @click="trade" :disabled="!isEnableToTrade">TRADE</v-btn>
  </v-container>
</template>

<script>
import BookSelect from './BookSelect'
import BookImage from './BookImage'
export default {
  computed: {
    toReceive () {
      return this.$store.getters.tradeToReceive
    },
    toOffer () {
      return this.$store.getters.tradeToOffer
    },
    isEnableToTrade () {
      return this.toOfferItem && this.toReceiveItem
    },
    thumbnail () {
      return (item) => item ? item.thumbnail : null
    }
  },
  data: () => ({
    toOfferItem: null,
    toReceiveItem: null
  }),
  methods: {
    trade () {
      if (!this.isEnableToTrade) return
      this.$store.dispatch('tradeRequest', {
        bookId: this.toOfferItem.bookId,
        bookIdTarget: this.toReceiveItem.bookId,
        userTarget: this.$route.params.user
      })
    },
    setToOfferItem (value) {
      this.toOfferItem = value
    },
    setToReceiveItem (value) {
      this.toReceiveItem = value
    }
  },
  created () {
    this.$store.dispatch('fetchBooksByField', {
      commitName: 'setTradeToReceive',
      filters: {ownedBy: this.$route.params.user, requestedBy: this.$store.getters.user.userName}
    })
    this.$store.dispatch('fetchBooksByField', {
      commitName: 'setTradeToOffer',
      filters: {ownedBy: this.$store.getters.user.userName, requestedBy: this.$route.params.user}
    })
  },
  components: { BookSelect, BookImage }
}
</script>

<style>

</style>
