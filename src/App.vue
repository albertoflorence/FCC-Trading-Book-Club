<template>
  <v-app v-if="!isAutoSigning" >
    <app-toolbar></app-toolbar>
    <v-progress-linear :indeterminate="true" v-if="isLoading" height="3" class="mt-0">
    </v-progress-linear>
    <router-view :key="route" class="mt-3"></router-view>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar/index'
export default {
  name: 'app',
  computed: {
    isLoading () {
      return this.$store.getters.isLoading('app')
    },
    isAutoSigning () {
      return this.$store.getters.isLoading('autoSigning')
    },
    route () {
      return this.$route.fullPath
    }
  },
  components: {
    [Toolbar.name]: Toolbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.btn {
  text-transform: unset;
}
</style>
