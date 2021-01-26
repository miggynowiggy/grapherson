import { Plugins, CameraResultType } from "@capacitor/core";
// import { DB, STORAGE } from "../../config/firebase";
const { Camera } = Plugins;
export default {
	namespaced: true,
	state: {
		capturePhoto: null,
	},
	getters: {
		CAPTURE_PHOTO: (state) => state.capturePhoto,
	},
	mutations: {
		SET_CAPTURED_PHOTO(state, payload) {
			state.capturePhoto = payload;
		},
	},
	actions: {
		async takePicture({ commit }) {
			const image = await Camera.getPhoto({
				source: "PROMPT",
				quality: 90,
				resultType: CameraResultType.DataUrl,
			});
			commit("SET_CAPTURES_PHOTO", image);
			return image;
		},
		async getGalleryPhoto({ commit }) {
			const image = await Camera.getPhoto({
				source: "PHOTOS",
				quality: 90,
				resultType: CameraResultType.DataUrl,
			});
			commit("SET_CAPTURED_PHOTO", image);
			return image;
		},
		async upload_image() {},
	},
};
