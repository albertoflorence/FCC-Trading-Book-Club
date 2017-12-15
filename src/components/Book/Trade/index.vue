<template>
  <v-layout column>
    <v-flex xs12 md6 offset-md3>
      <v-card>
        <v-container fluid>
          <book-image :leftImage="thumbnail(toOfferItem)" :rightImage="thumbnail(toReceiveItem)"/>
          <v-layout :column="$vuetify.breakpoint.xsOnly">
            <v-flex xs12 md6>
              <book-select 
                :books="toReceive" 
                label="select what you want to receive" 
                v-on:onSelectValue="setToOfferItem"
                :ownedBy="userParam"
                :requestedBy="user"
                commitName="setTradeToReceive"
                v-if="toReceive"
                ></book-select>
            </v-flex>
            <v-flex xs12 md6>
              <book-select 
                :books="toOffer" 
                label="select what you going to give" 
                v-on:onSelectValue="setToReceiveItem" 
                :ownedBy="user"
                :requestedBy="userParam"
                commitName="setTradeToOffer"
                v-if="toOffer"
                ></book-select>
            </v-flex>
          </v-layout>
          <v-btn @click="trade" :disabled="!isEnableToTrade" color="primary" style="font-weight: bold" large>
            <loading-circle name="trade_request" title="send the request"></loading-circle>
          </v-btn>
          <dialog-message name="tradeAnswer"></dialog-message>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
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
    },
    user () {
      return this.$store.getters.user.userName
    },
    userParam () {
      return this.$route.params.user
    }
  },
  data: () => ({
    toOfferItem: null,
    toReceiveItem: null
  }),
  methods: {
    async trade () {
      if (!this.isEnableToTrade) return
      this.$store.dispatch('startLoading', 'trade_request')
      await this.$store.dispatch('tradeRequest', {
        bookId: this.toOfferItem.bookId,
        bookIdTarget: this.toReceiveItem.bookId,
        userTarget: this.$route.params.user
      })
      this.$store.dispatch('stopLoading', 'trade_request')
    },
    setToOfferItem (value) {
      this.toOfferItem = value
    },
    setToReceiveItem (value) {
      this.toReceiveItem = value
    }
  },
  components: { BookSelect, BookImage }
}
</script>

<style>

</style>
