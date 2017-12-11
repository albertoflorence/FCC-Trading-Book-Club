<template>
  <v-layout row v-if="book && !isLoading">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container class="elevation-8">
          <v-flex>
              <img :src="book.url_image" style="width: 300px; height: 411px">
          </v-flex>
          <v-container>
            <v-divider></v-divider>
          </v-container>
          <v-layout>
            <v-flex>
              <v-card-title>
                <div class="text-xs-left">
                  <div class="headline">{{ book.title }}</div>
                  <p class="grey--text"> Author: {{ book.author }}</p>
                  <p class="grey--text"> Publisher: {{ book.publisher }}</p>
                  <p class="grey--text"> Published on: {{ book.publishedDate }}</p>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex class="mt-5">
              <v-card-actions>
                <v-spacer></v-spacer>
                <action icon="compare_arrows" name="requestedBy" color="orange" :book="this.book"></action>
                <action icon="turned_in" name="ownedBy" color="green" :book="this.book"></action>
              </v-card-actions>
            </v-flex>
          </v-layout>
          <match-users :bookId="book.bookId"></match-users>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-slide-y-transition>
            <v-card-text v-show="show" v-html="book.description" class="text-xs-left" >
            </v-card-text>
          </v-slide-y-transition>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Action from './Action'
import MatchUsers from './MatchUsers'
export default {
  computed: {
    book () {
      return this.$store.getters.bookById(this.$route.params.id)
    },
    isLoading () {
      return this.$store.getters.isLoading('app')
    }
  },
  data: () => ({
    show: false
  }),
  async created () {
    if (!this.book) {
      this.$store.dispatch('startLoading', 'app')
      await this.$store.dispatch('fetchBookById', this.$route.params.id)
      this.$store.dispatch('stopLoading', 'app')
    }
  },
  components: {
    Action,
    MatchUsers
  }
}
</script>

<style scoped>
 p {
   margin-bottom: 0px;
 }
 .border {
  border: 1px solid #ddd;
  border-radius: 4px;
  width: auto;
  margin: auto;
  vertical-align: middle;
  text-align: center;

 }
</style>
