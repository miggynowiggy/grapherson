/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { Plugins, CameraResultType } from "@capacitor/core";
import { STORAGE, AUTH } from "../../config/firebase";
import { nanoid } from "nanoid";
const { Camera, Storage, Filesystem } = Plugins;

const bucket = STORAGE.ref("handwritings");
const avatarBucket = STORAGE.ref("avatars");

export default {
	namespaced: true,
	state: {
		capturePhoto: null,
		deviceId: null,
		enableCamera: true,
	},
	getters: {
		CAPTURE_PHOTO: (state) => state.capturePhoto,
		DEVICE_ID: (state) => state.deviceId,
		IS_CAMERA_ENABLED: (state) => state.enableCamera,
	},
	mutations: {
		SET_CAPTURED_PHOTO(state, payload) {
			state.capturePhoto = payload;
		},
		SET_DEVICE_UUID(state, payload) {
			state.deviceId = payload;
		},
		CLEAR_CAPTURED_PHOTO(state) {
			state.capturePhoto = null;
		}
	},
	actions: {
		ENABLE_CAMERA({ state }) {
			state.enableCamera = true;
		},
		DISABLE_CAMERA({ state }) {
			state.enableCamera = false;
		},
		async takePicture({ commit }) {
			// const image = await Camera.getPhoto({
			// 	source: "CAMERA",
			// 	quality: 90,
			// 	resultType: CameraResultType.DataUrl,
			// 	format: "jpeg",
			// });
			return new Promise((resolve, reject) => {
				scan.scanDoc(
					(img) => {
						commit("SET_CAPTURED_PHOTO", img);
						resolve(img);
					},
					(err) => reject(err),
					{ sourceType: 1, returnBase64: true }
				)
			});
		},
		async getGalleryPhoto({ commit }) {
			// const image = await Camera.getPhoto({
			// 	source: "PHOTOS",
			// 	quality: 90,
			// 	resultType: CameraResultType.DataUrl,
			// 	format: "jpeg",
			// });
			return new Promise((resolve, reject) => {
				scan.scanDoc(
					(img) => {
						commit("SET_CAPTURED_PHOTO", img);
						resolve(img);
					},
					(err) => reject(err),
					{ sourceType: 0, returnBase64: true }
				)
			});
		},
		async upload_image({ state }) {
			const fileId = nanoid();
			await bucket
				.child(`${fileId}.jpg`)
				.putString(state.capturePhoto, "base64");
			const downloadUrl = await bucket.child(`${fileId}.jpg`).getDownloadURL();
			return downloadUrl;
		},
		async upload_avatar({ state, commit }) {
			const uid = AUTH.currentUser.uid;
			await avatarBucket
				.child(`${uid}.jpg`)
				.putString(state.capturePhoto, "data_url");
			const downloadUrl = await avatarBucket.child(`${uid}.jpg`).getDownloadURL();
			commit("CLEAR_CAPTURED_PHOTO", null);
			return downloadUrl;
		},
		async delete_image({}, downloadURL) {
			const fileReference = STORAGE.refFromURL(downloadURL);
			await fileReference.delete();
			return true;
		},
		async store_to_storage({}, details) {
			const { key, value } = details;
			const parsedValue = JSON.stringify(value);
			await Storage.set({
				key,
				value: parsedValue,
			});
			return true;
		},
		async get_in_storage({}, details) {
			const contents = await Storage.get({ key: details });
			return JSON.parse(contents.value);
		},
		async remove_in_storage({}, key) {
			await Storage.remove({ key });
			return true;
		},
	},
};
