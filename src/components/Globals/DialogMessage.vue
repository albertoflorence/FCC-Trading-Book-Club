<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text>
          <form-message class="mt-4" :name="name"></form-message>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'dialog-message',
  props: [
    'name'
  ],
  computed: {
    shouldRender () {
      return this.$store.getters.messageFrom === this.name
    }
  },
  data: () => ({
    dialog: false
  }),
  watch: {
    'shouldRender' () {
      if (this.shouldRender) this.dialog = true
    },
    'dialog' () {
      if (this.dialog === false) this.$store.dispatch('clearMessages')
    }
  }
}
</script>

<style>
</style>
