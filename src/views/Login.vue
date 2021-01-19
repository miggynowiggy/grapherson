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
          :rules="emailRules"
          filled
          rounded
          outlined
          color="secondary"
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          :rules="passwordRules"
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
          @click="signUp('user')"
        >
          SIGN-UP
        </v-btn>
        <v-btn
          class="text-decoration-underline font-weight-black"
          width="200"
          large
          color="secondary"
          rounded
          plain 
          :disabled="buttonDisabled"
          :loading="buttonDisabled"
          @click="signUp('guest')"
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
    email: null,
    password: null,
    showPassword: false,
    buttonDisabled: false,
    choice: null,

    
    emailRules: [
			v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ],
		passwordRules: [
			v => !!v || 'This field is required',
      v => (v && v.length >= 6) || 'Minimum of 6 characters',
    ],
  }),
  methods: {
      async signUp(choice) {
        this.buttonDisabled = true;
        this.$router.push({ name: 'Signup', params: {typeOfUser: choice}});
        this.loginButtonDisabled = false;
    }
  },
}
</script>