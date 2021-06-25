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
		platform: 'web'
	},
	getters: {
		CAPTURE_PHOTO: (state) => state.capturePhoto,
		DEVICE_ID: (state) => state.deviceId,
		IS_CAMERA_ENABLED: (state) => state.enableCamera,
		DEVICE_PLATFORM: (state) => state.platform
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
		},
		SET_DEVICE_PLATFORM(state, payload) {
			state.platform = payload;
		}
	},
	actions: {
		ENABLE_CAMERA({ state }) {
			state.enableCamera = true;
		},
		DISABLE_CAMERA({ state }) {
			state.enableCamera = false;
		},
		async takePicture({ state, commit }) {
			if (state.platform === 'web') {
				const image = await Camera.getPhoto({
					source: "CAMERA",
					quality: 90,
					resultType: CameraResultType.Base64,
					format: "png",
				});
				console.log(image);
				commit("SET_CAPTURED_PHOTO", image.base64String);
				return image.base64String;
			}

			return new Promise((resolve, reject) => {
				scan.scanDoc(
					async (img) => {
						commit("SET_CAPTURED_PHOTO", img);
						resolve(img);
					},
					(err) => reject(err),
					{ sourceType: 1, returnBase64: true, quality: 2 }
				)
			});
		},
		async getGalleryPhoto({ state, commit }) {
			if (state.platform === 'web') {
				const image = await Camera.getPhoto({
					source: "PHOTOS",
					quality: 90,
					resultType: CameraResultType.Base64,
					format: "png",
				});
				commit("SET_CAPTURED_PHOTO", image.base64String);
				return image.base64String;
			}

			return new Promise((resolve, reject) => {
				scan.scanDoc(
					async (img) => {
						commit("SET_CAPTURED_PHOTO", img);
						resolve(img);
					},
					(err) => reject(err),
					{ sourceType: 0, returnBase64: true, quality: 1 }
				)
			});
		},
		async upload_image({ state }) {
			const fileName = `${nanoid()}_${Date.now()}.png`
			await bucket
				.child(fileName)
				.putString(state.capturePhoto, "base64");
			const downloadUrl = await bucket.child(fileName).getDownloadURL();

			return {
				downloadURL: downloadUrl,
				fileName: fileName
			};
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
