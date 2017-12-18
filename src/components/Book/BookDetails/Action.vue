<template>
  <div class="mr-4">
    <v-tooltip top>
      <v-badge right slot="activator" v-model="showBadge">
        <span slot="badge">{{count}}</span>
        <v-btn
          :disabled="isLoading"
          icon class="ma-0"
          @click="register">
          <v-icon large :color="color" :disabled="!isBookmarked">{{ this.icon }}</v-icon>  
        </v-btn>
      </v-badge>
      <span>add to your {{this.name === 'ownedBy' ? 'books' : 'wish list'}}</span>
    </v-tooltip>
  </div>
</template>

<script>
import NotificationDialog from './NotificationDialog'
export default {
  props: ['name', 'book', 'color', 'icon'],
  computed: {
    count () {
      return this.book[this.name + 'Count']
    },
    showBadge () {
      return this.count > 0
    },
    isBookmarked () {
      if (!Array.isArray(this.book[this.name]) || !this.$store.getters.isAuthenticated) return false
      return this.book[this.name].includes(this.$store.getters.user.userName)
    },
    isLoading () {
      return this.$store.getters.isLoading('bookAction')
    }
  },
  data: () => ({
    show: false
  }),
  methods: {
    async register () {
      this.$store.dispatch('startLoading', 'bookAction')
      await this.$store.dispatch('registerUserBook', { type: this.name, bookId: this.book.bookId })
      this.$store.dispatch('stopLoading', 'bookAction')
    }
  },
  components: {
    NotificationDialog
  }
}
</script>

<style>

</style>