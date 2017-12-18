<template>
  <form @submit.prevent="search" style="max-width: 500px; min-width: 128px; display: grid; width: 100%">
    <v-text-field
      clearable
      light
      placeholder="Search"
      append-icon="search"
      :append-icon-cb="search" 
      solo
      v-model="value">
    </v-text-field>
  </form>
</template>

<script>
export default {
  data: () => ({
    value: ''
  }),
  methods: {
    async search () {
      if (!this.value) return
      this.$store.dispatch('startLoading', 'app')
      await this.$store.dispatch('searchBooks', this.value)
      this.$store.dispatch('stopLoading', 'app')
      this.$router.push({
        name: 'books-result',
        query: { search: this.value }
      })
    }
  }
}
</script>

<style>
</style>
