<template>
  <v-layout column>
    <v-flex 
      xs12 md6 offset-md3>
      <form-message name="search"></form-message>
      <v-card
        class="mb-2"
        v-for="book in books"
        v-if="book" 
        :key="book.bookId"
        :to="'/books/' + book.bookId">
        <v-layout row class="pr-1">
          <v-flex xs3 md2>
            <v-card-media
              :src="book.thumbnail"
              height="165"
              contain>
            </v-card-media>
          </v-flex>
          <v-flex xs10 class="text-xs-left ml-2">
              <v-list three-line>
                <v-list-tile-content>
                  <h3>{{book.title}}</h3>
                  <v-list-tile-sub-title class="grey--text text--darken-1">
                    <span>{{book.author}}</span>
                    <span>{{book.publishedYear}}</span>
                    <span>{{'( ' + book.publisher + ')'}}</span>
                  </v-list-tile-sub-title>
                  <v-container class="pt-2 pb-2">
                    <v-divider></v-divider>
                  </v-container>
                  <v-list-tile-sub-title>
                    {{book.description}}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['search'],
  computed: {
    books () {
      return this.$store.state.book.foundBooks
    }
  },
  async created () {
    if (!this.books) {
      this.$store.dispatch('startLoading', 'app')
      await this.$store.dispatch('searchBooks', this.search)
      this.$store.dispatch('stopLoading', 'app')
    }
  }
}
</script>

<style>
</style>
