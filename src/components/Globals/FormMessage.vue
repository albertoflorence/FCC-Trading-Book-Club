<template>
  <div>
    <v-alert
      transition="scale-transition"
      outline
      :color="color"
      :icon="icon"
      :value="lastFormMessage">
      {{message}}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'form-message',
  props: [
    'name'
  ],
  computed: {
    message () {
      return this.$store.getters.formMessage
    },
    lastFormMessage () {
      return this.$store.getters.lastFormMessage === this.name
    },
    lastFormMessageType () {
      return this.$store.getters.lastFormMessageType
    },
    icon () {
      return this.icons[this.lastFormMessageType]
    },
    color () {
      return this.colors[this.lastFormMessageType]
    }
  },
  data: () => ({
    colors: {error: 'error', success: 'success'},
    icons: {error: 'warning', success: 'check_circle'}
  }),
  destroyed () {
    this.$store.dispatch('clearMessages')
  }
}
</script>

<style>
</style>
