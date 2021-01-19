<template>
  <v-container fill-height fluid pa-10>
    <v-row
      align="center"
      justify="center"
    >
      <v-avatar tile size = 100px class = "mb-10">
        <img alt='Grapherson' src='../assets/Grapherson.png'/>
      </v-avatar>
      <v-form>
        <v-text-field
          label="Email Address"
          type="email"
          v-model="email"
          filled
          rounded
          outlined
          color="secondary"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          filled
          rounded
          outlined
          :append-icon="showPassword ? 'visibility' : 'visibility_off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          color="secondary"
        ></v-text-field>
      </v-form>
      <v-col
        align = "center"
      >
        <v-btn
          class = "mb-3 font-weight-black"
          width="200"
          large
          color="secondary"
          rounded
          :disabled="buttonDisabled"
          :loading="buttonDisabled"
        >
          LOGIN
        </v-btn>
        <v-btn
          class = "mb-3 font-weight-black"
          width="200"
          large
          color="secondary"
          rounded
          outlined
          :disabled="buttonDisabled"
          :loading="buttonDisabled" 
          @click="signup"
        >
          SIGN-UP
        </v-btn>
        <v-btn
          class="text-decoration-underline font-weight-black"
          block
          x-large
          color="secondary"
          rounded
          plain 
          :disabled="buttonDisabled"
          :loading="buttonDisabled"
        >
          PROCEED AS GUEST
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Login',
  data: () => ({
    showPassword: false,
    buttonDisabled: false
  }),
  methods: {
    async signup () {
      this.buttonDisabled = true;
      this.$router.push({ name: 'Signup' });
      this.loginButtonDisabled = false;
    }
  },
}
</script>