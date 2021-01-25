import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import LottiePlayer from "lottie-player-vue";

Vue.config.productionTip = false;
Vue.use(LottiePlayer);

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
