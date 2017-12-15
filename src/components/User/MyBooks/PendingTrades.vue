<template>
  <tab-content :name="name">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <books-trade 
          v-for="trade in tradesPending"
          :key="trade._id"
          :trade="trade">
          <v-card-title primary-title>
            <div class="text-xs-left" style="max-width: 100%">
                <p class="ma-0 text"> <span style="font-weight: 600; font-size: 17px">{{ trade.user }}</span> want to trade his
                  <a :href="'books/' + trade.book.bookId">{{ trade.book.title }}</a>
                </p>
                <p class="ma-0 text">to yours
                  <a :href="'books/' + trade.bookTarget.bookId">{{ trade.bookTarget.title }}</a>
                </p>
            </div>
          </v-card-title>
          <v-card-actions>
            <div v-if="user === trade.user">
              <v-btn outline color="red" @click="answer(trade._id, 'cancel')">cancel</v-btn>
            </div>
            <div v-else>
              <v-btn outline color="green" @click="answer(trade._id, 'accept')">accept</v-btn>
              <v-btn outline color="red" @click="answer(trade._id, 'reject')">decline</v-btn>
            </div>
          </v-card-actions>
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
    tradesPending () {
      return this.$store.getters.tradesPending
    },
    user () {
      return this.$store.getters.user.userName
    }
  },
  methods: {
    async answer (id, answer) {
      this.$store.dispatch('startLoading', this.name)
      await this.$store.dispatch('tradeAnswer', {id, answer})
      this.$store.dispatch('stopLoading', this.name)
    }
  },
  components: {
    BooksTrade,
    TabContent
  }
}
</script>

<style scoped>
  .text {
    display: inline-block;
    white-space: nowrap;
    width: 99%;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
