<template>
    <v-app class="ma-5 pa-5">
        <v-container fill-height fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-avatar tile size = 100px class = "mb-10">
            <img alt = 'Grapherson' src = '../assets/Grapherson.png'/>
          </v-avatar>
          <v-text-field
            label="Email Address"
            placeholder="Email"
            filled
            rounded
            outlined
          ></v-text-field>
          <v-text-field
            type = 'password'
            label="Password"
            placeholder="Password"
            filled
            rounded
            outlined
          ></v-text-field>
        </v-row>
      </v-container>
    </v-app>
</template>

<script>

export default {}
</script>