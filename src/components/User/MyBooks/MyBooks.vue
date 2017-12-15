<template>
  <tab-content :name="name">
    <books-show :books="myBooks"></books-show>
  </tab-content>  
</template>

<script>
import TabContent from './TabContent'
import BooksShow from '../../Book/BooksShow'
export default {
  props: ['name'],
  computed: {
    myBooks () {
      return this.$store.getters.myBooks
    }
  },
  components: {
    TabContent,
    BooksShow
  }
}
</script>

<style>

</style>
