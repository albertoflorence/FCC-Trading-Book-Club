<template>
  <div>
    <v-alert
      transition="scale-transition"
      outline
      :color="color"
      :icon="icon"
      :value="shouldRender">
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
      return this.$store.getters.message
    },
    shouldRender () {
      return this.$store.getters.messageFrom === this.name
    },
    messageType () {
      return this.$store.getters.messageType
    },
    icon () {
      return this.icons[this.messageType]
    },
    color () {
      return this.colors[this.messageType]
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
