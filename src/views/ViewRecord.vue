<template>
  <div>
    <v-btn plain class="mx-3 my-5" @click="back">
      <v-icon large>arrow_back</v-icon>
    </v-btn>
    <v-btn plain class="my-5" @click="recordStep++" right absolute v-if="recordStep < 3">
      <v-icon large>arrow_forward</v-icon>
    </v-btn>
    <handwriting v-if="recordStep === 1"/>
    <graph v-if="recordStep === 2"/>
    <result v-if="recordStep === 3" />
    <bottom-nav />
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav.vue'
import Graph from '../components/ViewRecord/Graph.vue'
import Handwriting from '../components/ViewRecord/Handwriting.vue'
import Result from '../components/ViewRecord/Result.vue'
export default {
  components: { BottomNav, Handwriting, Graph, Result },
  data: () => ({
    recordStep: 1,
  }),
  methods: {
    back(){
      if (this.recordStep === 1)
        this.$router.go(-1);
      else
        this.recordStep--;
    }
  },
}
</script>

<style>
	.enlarge {
		position: fixed;
		top: 50vh;
	}
</style>