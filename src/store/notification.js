import services from '@/services'

export default {
  state: {
    notifications: null
  },
  mutations: {
    setNotifications (state, payload) {
      state.notifications = payload
    }
  },
  actions: {
    getNotifications: ({commit}) =>
      services.notification.get()
        .then(r => commit('setNotifications', r))
        .catch(e => console.log(e)),
    notificationSeen: ({commit}, payload) =>
      services.notification.seen(payload),
    deleteNotification: ({commit}, payload) =>
      services.notification.delete(payload)
  },
  getters: {
    notifications: ({notifications}) => notifications,
    notSeenCount: ({notifications}) => notifications ? notifications.filter(e => !e.seen).length : 0
  }
}
