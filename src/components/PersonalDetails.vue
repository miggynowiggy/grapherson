<template>
  <v-container fluid pa-10>
    <v-row>
      <div class = "headline secondary--text text-center font-weight-black mb-10 mt-5">
        PERSONAL DETAILS
      </div>
      <v-form>
        <v-text-field
          label = "Name / Nickname*"
          type = "name"
          v-model="name"
          :rules="basicRules"
          filled
          rounded
          outlined
          color = "secondary"
        ></v-text-field>
        <v-text-field
          label = "Age*"
          type = "number"
          v-model="age"
          :rules="basicRules"
          filled
          rounded
          outlined
          color = "secondary"
        ></v-text-field>
        <v-radio-group
          v-model="gender"
          :rules="basicRules"
          column
        >
          <p class = "font-weight-black gray--text">Gender*:</p>
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
      </v-form>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Signup',
  data: () => ({
    name: null,
    age: null,
    gender: null,
    typeOfUser: null,

    basicRules: [
      v => !!v || 'This field is required'
    ],
  }),
  created() {
    this.typeOfUser = this.$route.params.typeOfUser;
  },
  methods: {
    async proceed(){
      
    }
  },
  watch: {
    name(value){
      this.$emit('nameChange', value)
    },
    age(value){
      this.$emit('ageChange', value)
    },
    gender(value){
      this.$emit('genderChange', value)
    }
  }
}
</script>