<template>
  <v-menu
    v-if="user"
    offset-y origin="center center"
    transition="scale-transition"
    bottom>
    <v-btn small icon flat slot="activator">
      <v-icon>settings</v-icon>
    </v-btn>
    <v-list>
      <v-container class="pa-3">
        <v-list-tile class="text-xs-left">
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                <v-list-tile-title>{{user.userName}}</v-list-tile-title>
                <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile
          dense 
          class="pt-0"
          v-for="item in items"
          :key="item.title"
          :to="item['link'] ? item.link : null">
          <v-list-tile-action v-if="item.icon">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.title }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> 
      </v-container>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  data: () => ({
    items: [
      { title: 'My books', icon: 'account_box', link: {name: 'user-books'} },
      { title: 'Configuration', icon: 'settings', link: {name: 'user-settings'} },
      { title: 'Loggout', icon: 'exit_to_app', link: { name: 'home' }, action: this.loggout }
    ]
  }),
  methods: {
    loggout () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style>

</style>
