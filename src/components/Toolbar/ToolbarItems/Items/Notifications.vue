<template>
  <v-menu
    offset-y origin="center center"
    :close-on-content-click="false"
    transition="scale-transition"
    botton>
    <v-badge slot="activator" overlap color='red'  v-model="hasNewNotifications">
      <span slot="badge">{{notSeenCount}}</span>
      <v-btn icon flat @click="fetchData">
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-badge>
    <v-container style="max-height: 500px; width: 500px" class="pa-0 elevation-20">
      <v-list three-line>
        <v-container class="py-2">
          <h3 class="text-xs-left">Notifications</h3>
        </v-container>
        <v-divider></v-divider>
        <v-container v-if="notifications">
          <v-list-tile
            class="border elevation-1"
            avatar
            :ripple="true"
            v-for="notification in notifications"
            :key="notification.book" replace 
            :to="{path: '/user/books', query: {tab: notification.type === 'trade_request' ? 'My Pending Trades' : 'My Trades'}}"
            @click="seen(notification._id)">
            <v-list-tile-avatar>
              <v-icon color="green" :disabled="notification.seen">new_releases</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="notification.message"></v-list-tile-title>
              <v-list-tile-sub-title>{{notification.time}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.prevent="remove(notification._id)">
                <v-icon color="red">remove</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-container>
          <h4 class="ma-3" v-if="!hasNotifications">no new notifications</h4>
      </v-list>
    </v-container>
  </v-menu>
</template>

<script>
export default {
  computed: {
    notifications () {
      return this.$store.getters.notifications
    },
    notSeenCount () {
      return this.$store.getters.notSeenCount
    },
    hasNotifications () {
      return this.notifications && this.notifications.length > 0
    },
    hasNewNotifications () {
      return this.notSeenCount > 0
    }
  },
  data: () => ({
    showMenu: false
  }),
  methods: {
    async seen (id) {
      await this.$store.dispatch('notificationSeen', id)
      this.fetchData()
    },
    remove (id) {
      this.$store.dispatch('deleteNotification', id)
    },
    fetchData () {
      this.$store.dispatch('getNotifications')
    }
  },
  created () {
    this.$store.dispatch('getNotifications')
  }
}
</script>

<style scoped>
  .border {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    margin-bottom: 2px
  }
</style>
