import { Plugins, CameraResultType } from "@capacitor/core";
const { Camera, Filesystem } = Plugins;

export default {
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
			return imageContent.data;
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
			return imageContent.data;
		},
	},
};
