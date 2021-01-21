<template>
  <div align="center">
    <h1 class="headline secondary--text mt-3">YOUR HANDWRITING</h1>
    <v-avatar tile width="300" height="420" class = "mt-5">
      <v-btn color="secondary" rounded overlap class="enlarge" large>ENLARGE</v-btn>
      <img src="@/assets/sampleWriting.png" alt="sample writing" size="20">
    </v-avatar>
  </div>
</template>

<script>
export default {

}
</script>

<style>
	.enlarge {
		position: fixed;
		top: 50vh;
	}
</style>