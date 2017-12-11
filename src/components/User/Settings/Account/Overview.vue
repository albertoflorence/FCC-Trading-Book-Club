<template >
  <v-container v-if="user">
    <v-layout>
      <v-flex xs6>
        <v-card class="pa-5">
          <v-card-title>
            <div class="text-xs-left">
              <h1>Overview</h1>
            </div>
          </v-card-title>
          <v-card-text>
            <v-divider></v-divider>
            <form>
              <form-message name="overview"></form-message>
              <v-text-field
                v-for="item in user"
                :key="item.value"
                :label="item.label"
                :append-icon="item.editable ? 'edit' : ''"
                :append-icon-cb="() => (editField = item.name)"
                :readonly="!isEditing(item.name)"
                :loading="isLoading(item.name) ? 'green' : false "
                :class="isEditing(item.name) ? 'input-group--focused' : ''"
                :autofocus="isEditing(item.name)"
                @keyup.enter="isEditing(item.name) ? edit(item.name, item.value) : null"
                v-model="item.value">
              </v-text-field>
            </form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    isEditing () {
      return (field) => (this.editField === field)
    },
    user () {
      const data = this.$store.getters.user
      return [
        {label: 'User Name', value: data.userName, name: 'userName', editable: false},
        {label: 'Email address', value: data.email, name: 'email', editable: false},
        {label: 'City', value: data.city, name: 'city', editable: true},
        {label: 'State', value: data.state, name: 'state', editable: true}
      ]
    },
    isLoading () {
      return (from) => {
        return this.$store.getters.isLoading(from)
      }
    }
  },
  data: () => ({
    editField: null
  }),
  methods: {
    async edit (property, data) {
      this.$store.dispatch('startLoading', property)
      await this.$store.dispatch('updateUserData', { from: 'overview', data: {property, data} })
      this.$store.dispatch('stopLoading', property)
      this.editField = null
    }
  }
}
</script>

<style>

</style>
