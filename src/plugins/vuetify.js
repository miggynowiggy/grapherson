import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#00B882',
          secondary: '#1CC8EE',
          error: '#b71c1c',
        },
      },
    },
  })

Vue.use(Vuetify);

export default vuetify
