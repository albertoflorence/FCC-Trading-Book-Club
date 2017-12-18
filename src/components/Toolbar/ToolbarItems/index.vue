<template>
  <div style="display: inline-flex">
    <div v-if="isAuthenticated" class="hidden-sm-and-down">
      <notifications></notifications>
      <settings></settings>
    </div>
    <link-items></link-items>
  </div>
</template>

<script>
import LinkItems from './Items/LinkItems'
import Settings from './Items/Settings'
import Notifications from './Items/Notifications'
export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  components: {
    LinkItems,
    Settings,
    Notifications
  }
}
</script>
<style>
</style>
