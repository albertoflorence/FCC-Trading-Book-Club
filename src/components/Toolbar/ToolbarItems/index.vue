<template>
  <div style="display: inline-flex">
    <div v-if="isAuthenticated">
      <notifications class="ml-3"></notifications>
      <settings class="ml-3"></settings>
    </div>
    <link-items class="ml-3"></link-items>
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
