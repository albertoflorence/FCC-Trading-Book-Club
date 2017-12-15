<template>
  <tab-content :name="name">
    <books-show :books="myWishList"></books-show>
  </tab-content>
</template>

<script>
import TabContent from './TabContent'
import BooksShow from '../../Book/BooksShow'
export default {
  props: ['name'],
  computed: {
    myWishList () {
      return this.$store.getters.myWishList
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
