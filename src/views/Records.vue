<template>
  <div>
    <v-btn plain class="mx-3 my-5" @click="$router.go(-1)">
      <v-icon large>arrow_back</v-icon>
    </v-btn>
    <v-card
      class="ma-5"
      elevation="2"
      outlined
      shaped
      @click="$router.push({ name: 'ViewRecord' })"
    >
      <v-card-subtitle class="grey--text mx-3">mm-dd-yyyy</v-card-subtitle>
      <v-card-title class="mx-3 heading">Results</v-card-title>
    </v-card>
    <bottom-nav />
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav.vue'
export default {
  components: { BottomNav },
}
</script>