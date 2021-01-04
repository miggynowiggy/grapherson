<template>
  <div class="home">
    <center>
      <img alt="Vue logo" src="../assets/logo.png">
      <h1>Eyow!</h1>
      <sample-component></sample-component>
    </center>
  </div>
</template>

<script>
import SampleComponent from '@/components/SampleComponent.vue';

export default {
  name: 'Home',
  components: {
    SampleComponent
  }
}
</script>
