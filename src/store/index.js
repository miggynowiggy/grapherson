import Vue from 'vue'
import Vuex from 'vuex'

//Import VUEX modules below
import sample_index from './modules/sample-index';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    sample_index
  }
})
