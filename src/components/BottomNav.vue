<template>
  <v-main>
   <div>
    <v-row
     align="end"
     no-gutters
     style="height: 150px;"
    >
     <v-col>
      <v-btn
       class="secondary"
       height="70"
       width="70"
       fab
      >
       <v-icon large>receipt_long</v-icon>
      </v-btn>
     </v-col>
    </v-row>
   </div>
   
   <v-bottom-navigation
    app
    fixed
    grow
    height="60"
   >
    <v-row>
     <v-col class="ml-5">
      <v-btn
       class="secondary--text"
       width="10"
       height="58"
       plain
      >
       <v-icon large>receipt_long</v-icon>
      </v-btn>
     </v-col>
     <v-spacer></v-spacer>
     <v-col class="ml-5">
      <v-btn
       class="secondary--text"
       width="10"
       height="58"
       plain
      >
       <v-icon large>settings</v-icon>
      </v-btn>
     </v-col>
    </v-row>
   </v-bottom-navigation>
  </v-main>
</template>

<script>

export default {
 name: 'BottomNav'
}
</script>