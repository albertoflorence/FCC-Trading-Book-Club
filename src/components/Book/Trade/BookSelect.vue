<template>
  <v-container>
    <v-select
      :label="label"
      :items="books"
      v-model="element"
      item-text="title"
      chips
      max-height="auto"
      autocomplete>
      <template slot="selection" slot-scope="data">
        <v-chip
          @input="data.parent.selectItem(data.item)"
          :selected="data.selected"
          class="chip--select"
          :key="JSON.stringify(data.item.title)">
          <v-avatar>
            <img :src="data.item.thumbnail">
          </v-avatar>
          {{ data.item.title }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-avatar>
            <img :src="data.item.thumbnail"/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.author + ' - ' + data.item.publishedYear"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
      </template>
    </v-select>
  </v-container>
</template>

<script>
export default {
  props: ['books', 'label', 'ownedBy', 'requestedBy', 'commitName'],
  data: () => ({
    element: null
  }),
  computed: {

  },
  watch: {
    element () {
      this.$emit('onSelectValue', this.element)
    }
  },
  async created () {
    await this.$store.dispatch('fetchBooksByField', {
      commitName: this.commitName,
      filters: {ownedBy: this.ownedBy, requestedBy: this.requestedBy}
    })
    const element = this.books.find(e => e.bookId === this.$route.query.book)
    if (element) this.element = element
  }
}
</script>

<style>

</style>
