import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Plugins } from "@capacitor/core";
const { StatusBar, Device } = Plugins;
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import LottiePlayer from "lottie-player-vue";
import { AUTH } from "./config/firebase";

Vue.config.productionTip = false;
Vue.use(LottiePlayer);

Device.getInfo().then((info) => {
	store.commit("plugins/SET_DEVICE_UUID", info.uuid);
	if (info.platform !== "web") {
		StatusBar.setOverlaysWebView({ overlay: false });
		StatusBar.setBackgroundColor({ color: "#00B882" });
	}
});

window.addEventListener("deviceready", () => {
	store.dispatch("auth/SET_GOOGLE_PROVIDER");
});

AUTH.onAuthStateChanged(async (user) => {
	if (user) {
		await store.dispatch("auth/getUserDetails");
		new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount("#app");
		router.push({ name: "Home" });
	} else {
		new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount("#app");
		router.push({ name: "Login" });
	}
});

defineCustomElements(window);
