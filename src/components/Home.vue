<template>
  <books-show :books="books"></books-show>
</template>

<script>
import BooksShow from './Book/BooksShow'
export default {
  computed: {
    books () {
      return this.$store.getters.books
    }
  },
  created () {
    this.$store.dispatch('fetchBooksByField')
  },
  components: {
    BooksShow
  }
}
</script>

<style scoped>

</style>
