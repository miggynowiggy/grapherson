<template>
  <v-container fill-height fluid pa-10>
    <v-row
      align="center"
      justify="center"
    >
      <v-avatar tile size = 100px class = "mb-10">
        <img alt='Grapherson' src='../assets/Grapherson.png'/>
      </v-avatar>
      <v-text-field
        label="Email Address"
        type="email"
        filled
        rounded
        outlined
      ></v-text-field>
      <v-text-field
        label="Password"
        filled
        rounded
        outlined
        :append-icon="showPassword ? 'visibility' : 'visibility_off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    showPassword: false
  })
}
</script>