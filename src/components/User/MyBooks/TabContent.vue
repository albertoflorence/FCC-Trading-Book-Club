<template>
  <v-tabs-content :id="name">
    <v-card flat>
      <v-progress-circular indeterminate color="red" class="mt-5" size="100" v-if="isLoading"></v-progress-circular>
      <div v-else>
        <slot></slot>
      </div>
    </v-card>
  </v-tabs-content>
</template>

<script>
export default {
  props: ['name'],
  computed: {
    isLoading () {
      return this.$store.getters.isLoading(this.name)
    }
  }
}
</script>

<style>
</style>
