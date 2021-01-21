<template>
  <div align="center">
    <v-avatar tile size="200">
      <img src="@/assets/samplePicture.png" alt="sample writing" size="20">
    </v-avatar>
    <h1 class="headline secondary--text mt-3">YOU'RE AN ABSOLUTE INTROVERT!</h1>
    <v-card width="320" rounded color="#EAE2FF" class="my-3">
      <v-col cols="10" v-for="result in results" :key="result.name">
        <v-progress-linear
          class="mt-1"
          color="secondary"
          rounded
          height="10"
          :value=result.value
        ></v-progress-linear>
      <p>{{ result.value }}% {{ result.name }}</p>
      </v-col>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    results:[
      {name: 'Aggresiveness', value: 29,},
      {name: 'Versatile', value: 59},
      {name: 'Sensitive', value: 15},
      {name: 'Good Will Power', value: 69},
      {name: 'Self Confidence', value: 80},
      {name: 'Good Thinker', value: 58},
    ]
  }),
}
</script>