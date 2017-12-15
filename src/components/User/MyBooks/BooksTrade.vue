<template>
  <v-flex
    md3 xs12>
    <v-card class="pa-2">
      <book-image 
        :rightImage="trade.book.thumbnail"
        :leftImage="trade.bookTarget.thumbnail">
      </book-image>
        <slot></slot>
    </v-card>
  </v-flex>
</template>

<script>
import BookImage from '../../Book/Trade/BookImage'
export default {
  props: [ 'trade' ],
  components: {
    BookImage
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
