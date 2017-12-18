<template>
  <div class="spacing">
    <navigation :activator="nav"></navigation>
    <v-toolbar color="primary" dark fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="nav = !nav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title
        class="mr-5 hidden-sm-and-down">
        <router-link
          :to="{name: 'home'}"
          tag="span"
          style="cursor: pointer">
          CoolBook
        </router-link>
      </v-toolbar-title>
      <search/>
      <toolbar-items class="d-flex align-center" style="margin-left: auto"></toolbar-items>
    </v-toolbar>  
  </div>
</template>

<script>
import Search from './Search'
import ToolbarItems from './ToolbarItems/index'
import Navigation from './Navigation'
export default {
  name: 'app-toolbar',
  data: () => ({
    nav: false
  }),
  components: {
    Search,
    ToolbarItems,
    Navigation
  }
}
</script>

<style scoped>
 .spacing {
   margin-bottom: 70px;
 }
</style>
