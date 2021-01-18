<template>
  <v-container fluid pa-10>
    <v-row>
      <div class = "headline secondary--text text-center font-weight-black mb-10 mt-5">
        PERSONAL DETAILS
      </div>
      <v-text-field
        label = "Name / Nickname"
        type = "name"
        filled
        rounded
        outlined
        color = "secondary"
      ></v-text-field>
      <v-text-field
        label = "Age"
        type = "age"
        filled
        rounded
        outlined
        color = "secondary"
      ></v-text-field>
      <v-radio-group
        v-model="gender"
        column
      >
        <p class = "font-weight-black gray--text">Gender:</p>
        <v-radio
          label="Female"
          color="secondary"
          value="female"
        ></v-radio>
        <v-radio
          label="Male"
          color="secondary"
          value="male"
        ></v-radio>
        <v-radio
          label="Prefer not to say"
          color="secondary"
          value="others"
        ></v-radio>
      </v-radio-group>
    </v-row>
    <v-row
      style = "height: 150px"
      justify = "center"
      align = "end"
    >
      <v-btn
        class = "mb-3 font-weight-black"
        block
        large
        color="secondary"
        rounded
        :disabled="buttonDisabled"
        :loading="buttonDisabled"
      >
        next
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Signup',
  data: () => ({}),
    methods: {},
}
</script>