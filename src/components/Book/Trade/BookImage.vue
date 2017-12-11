<template>
  <v-layout>
    <v-flex xs6 class="text-xs-right">
      <img :src="leftImage" style="width: 128px; height: 165px">
    </v-flex>
      <v-icon class="ma-3" large color="orange darken-2" >compare_arrows</v-icon>
    <v-flex xs6 class="text-xs-left">
      <img :src="rightImage" style="width: 128px; height: 165px" class="">
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [ 'leftImage', 'rightImage' ]
}
</script>

<style>

</style>
