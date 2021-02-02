/* eslint-disable no-prototype-builtins */
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { Plugins } from "@capacitor/core";
const { StatusBar, Device, SplashScreen } = Plugins;
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import LottiePlayer from "lottie-player-vue";
import { AUTH } from "./config/firebase";

Vue.config.productionTip = false;
Vue.use(LottiePlayer);

SplashScreen.show({ autoHide: false });

Device.getInfo().then((info) => {
	console.log("device info: ", info);
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
	await store.dispatch("records/getAllDummies");
	const guest = await store.dispatch("auth/getGuestDetails");

	if (user) {
		//If the user registered and still has the guest data in DB
		//Remove the guest and move their trial findings in their actual findings collection
		if (guest) {
			await store.dispatch("auth/deleteGuestDetails");
			await store.dispatch("records/move_to_findings");
		}

		await store.dispatch("auth/getUserDetails");
		await store.dispatch("records/getAllFindings");

		new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount("#app");

		router.push({ name: "Home" });
	} else {
		await store.dispatch("records/getAllGuestTrial");

		new Vue({
			router,
			store,
			vuetify,
			render: (h) => h(App),
		}).$mount("#app");

		if (guest) {
			router.push({ name: "Home" });
		} else {
			router.push({ name: "Login" });
		}
	}

	SplashScreen.hide();
});

defineCustomElements(window);
