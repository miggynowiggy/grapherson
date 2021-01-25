import Vue from "vue";
import Vuex from "vuex";

//Import VUEX modules below
import records from "./modules/records";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		records,
	},
});
