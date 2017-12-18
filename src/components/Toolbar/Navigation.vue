<template>
  <v-navigation-drawer
    fixed
    app
    clipped
    disable-route-watcher
    disable-resize-watcher
    temporary
    v-model="nav">
    <v-list>
      <v-list-tile class="text-xs-left pa-1">
        <v-list-tile-content>
            <v-list-tile-title>{{user.userName}}</v-list-tile-title>
            <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile 
        dense class="pt-0"
        v-for="item in items"
        :key="item.title"
        @click="() => nav = !nav"
        :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile> 
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: [ 'activator' ],
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  data: () => ({
    nav: this.activator,
    items: [
      { title: 'My books', icon: 'account_box', link: {name: 'user-books'} },
      { title: 'Settings', icon: 'settings', link: {name: 'user-settings'} }
    ]
  }),
  watch: {
    activator () {
      this.nav = true
    }
  }
}
</script>

<style>

</style>
