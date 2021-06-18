/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-pattern */
import { Plugins, CameraResultType } from "@capacitor/core";
import { STORAGE, AUTH } from "../../config/firebase";
import { nanoid } from "nanoid";
const { Camera, Storage, Filesystem } = Plugins;
import ScanbotSdk from 'cordova-plugin-scanbot-sdk';

const bucket = STORAGE.ref("handwritings");
const avatarBucket = STORAGE.ref("avatars");

const SBSDK = ScanbotSdk.promisify();

const initializeScanBot = () => {
	let license = "XYSE/QQTlaEgU4kr/TvMvWKlTyhtkl" +
  "cYO2O2+XhbewTEgqRsOMhhygjZfnbo" +
  "Uw5wJ9ah0+DA5qBUFMwUqQk6i/4voW" +
  "VT/navc6uPO43qrhFfpQ6tkYjogKsb" +
  "ckbLpDxGUIe3Zz5ZqIt9znznW11LLl" +
  "i/K3VTpp/U6TuJo/oGqIP+Xsf6SYQV" +
  "LG/TX3zuy7w4Mo6zO52wbt6ZwS1+Na" +
  "AX2vHCK2GgBoz5fUqrPuQ/TkDtVCvs" +
  "7+MkdhKcScxYnmctPaVMqPu+AZ7lWz" +
  "fdya7CRaebAzLQbrLncBUpchUFCiWV" +
  "zM+t+gNeHB/4FS0LojOnUZS8EHmnSe" +
  "uQ5rr1ZkBuug==\nU2NhbmJvdFNESw" +
  "pjb20uZ3JhcGhlcnNvbgoxNjI2NDc5" +
  "OTk5CjgzODg2MDcKMw==\n";

	let opts = {
		license: license,
		loggingEnabled: false,
		storageImageFormat: 'PNG',
		storageImageQuality: 80,
	};
	const SBSDK = ScanbotSdk.promisify();
	return SBSDK.initializeSdk(opts)
		.then((result) => console.log('SBSDK INIT: ', result))
		.catch((error) => console.log('SBSDK INIT ERROR: ', error));
}

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
				return image.dataUrl;
			}

			// try {
			// 	await initializeScanBot();

			// 	const result = await SBSDK.UI.startDocumentScanner({
			// 		uiConfigs: {
			// 			flashEnabled: true,
			// 			multiPageEnabled: false
			// 		}
			// 	});

			// 	const filteredDoc = await SBSDK.applyImageFilter({
			// 		imageFileUri: result.pages[0].documentImageFileUri,
			// 		imageFilter: 'PURE_BINARIZED',
			// 		quality: 80
			// 	});

			// 	const image = await Filesystem.readFile({
			// 		path: filteredDoc.imageFileUri
			// 		// path: result.pages[0].documentImageFileUri
			// 	});

			// 	commit("SET_CAPTURED_PHOTO", image);
			// 	return image;
			// } catch (err) {
			// 	console.log(err);
			// 	return null;
			// }

			return new Promise((resolve, reject) => {
				scan.scanDoc(
					async (img) => {
						console.log('CAPTURED PHOTO: ', img);
						const image = await Filesystem.readFile({
							path: img
						});
						commit("SET_CAPTURED_PHOTO", image);
						resolve(image);
					},
					(err) => reject(err),
					{ sourceType: 1, quality: 2.5 }
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
				return image.dataUrl;
			}

			return new Promise((resolve, reject) => {
				scan.scanDoc(
					async (img) => {
						const image = await Filesystem.readFile({
							path: img
						});
						commit("SET_CAPTURED_PHOTO", image);
						resolve(image);
					},
					(err) => reject(err),
					{ sourceType: 0, quality: 2.5 }
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
