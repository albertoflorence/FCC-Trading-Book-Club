<template>
  <v-layout v-if="books">
    <v-flex xs10 offset-xs1>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            md2 xs12
            v-for="book in books"
            :key="book.bookId">
            <v-card
              :to="'/books/' + book.bookId">
              <v-container>
                <div style="max-width: 128px; max-height: 175px; margin: auto">
                  <v-card-media :src="book.thumbnail" height="175px"></v-card-media>
                </div>
              </v-container>
              <v-list>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title class="text-xs-center"> {{book.title}}</v-list-tile-title>
                    <v-tooltip top>
                      <span>{{book.title}}</span>
                    </v-tooltip>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout> 
</template>

<script>
export default {
  props: ['books']
}
</script>

<style>

</style>
