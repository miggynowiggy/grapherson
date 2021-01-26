import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Plugins } from "@capacitor/core";
const { StatusBar, Device } = Plugins;
import LottiePlayer from "lottie-player-vue";

Vue.config.productionTip = false;
Vue.use(LottiePlayer);

Device.getInfo().then((info) => {
	if (info.platform !== "web") {
		StatusBar.setOverlaysWebView({ overlay: false });
		StatusBar.setBackgroundColor({ color: "#00B882" });
	}
});

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
