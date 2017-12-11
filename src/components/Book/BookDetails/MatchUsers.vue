<template>
  <div class="text-xs-center">
    <v-menu top offset-y>
      <v-btn @click="getMatchUsers" slot="activator" outline color="indigo">People that you can trade with</v-btn>
      <v-list v-if="!isLoading && matchedUsers && matchedUsers.length > 0">
        <v-list-tile v-for="(user, i ) in matchedUsers" :key="i" :to="{name: 'trade', params: {user}, query: {book: bookId}}">
          <v-list-tile-title>{{ user }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-list v-else>
        <v-list-tile>
          <v-list-tile-title class="text-xs-center" v-if="isLoading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-list-tile-title>
          <v-list-tile-title class="text-xs-center"v-else> Sorry, no match for you today !</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: [ 'bookId' ],
  computed: {
    matchedUsers () {
      return this.$store.getters.matchedUsers
    },
    isLoading () {
      return this.$store.getters.isLoading('matchUsers')
    }
  },
  methods: {
    async getMatchUsers () {
      this.$store.dispatch('startLoading', 'matchUsers')
      await this.$store.dispatch('getMatchUsers', this.bookId)
      this.$store.dispatch('stopLoading', 'matchUsers')
    }
  }
}
</script>

<style>

</style>
