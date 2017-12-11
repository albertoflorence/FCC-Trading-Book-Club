<template>
<div>
  <v-btn @click="test">routes test</v-btn>
  <books-show :books="books"></books-show>

</div>
</template>

<script>
import BooksShow from './Book/BooksShow'
import services from '../services'

export default {
  computed: {
    books () {
      return this.$store.getters.myBooks
    }
  },
  methods: {
    async test () {
      await services.action.test({
        bookId: '$in: KGt-FxUEj48C, fOgtAgAAQBAJ'
      })
    }
  },
  created () {
    this.$store.dispatch('fetchBooksByField', {
      commitName: '',
      filters: {}
    })
  },
  components: {
    BooksShow
  }
}
</script>

<style scoped>

</style>
