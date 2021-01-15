import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

const vuetify = new Vuetify({
    icons: {
      iconfont: 'md' || 'mdi' || 'fa'
    },
    theme: {
      themes: {
        light: {
          primary: '#00B882',
          secondary: '#1CC8EE',
          error: '#b71c1c',
        },
      },
    },
});

Vue.use(Vuetify);

export default vuetify
