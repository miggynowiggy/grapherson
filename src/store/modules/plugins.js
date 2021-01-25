import { Plugins, CameraResultType } from "@capacitor/core";
const { Camera, Filesystem } = Plugins;

export default {
	namespaced: true,
	actions: {
		async takePicture() {
			const image = await Camera.getPhoto({
				source: "CAMERA",
				quality: 90,
				resultType: CameraResultType.Uri,
			});
			const imageContent = await Filesystem.readFile({
				path: image.webPath,
			});
			return imageContent;
		},
		async getGalleryPhoto() {
			const image = await Camera.getPhoto({
				source: "PHOTOS",
				quality: 90,
				resultType: CameraResultType.Uri,
			});
			const imageContent = await Filesystem.readFile({
				path: image.webPath,
			});
			return imageContent;
		},
	},
};
