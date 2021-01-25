import Vue from "vue";
import Vuex from "vuex";

//Import VUEX modules below
import records from "./modules/records";
import plugins from "./modules/plugins";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		records,
		plugins,
	},
});
