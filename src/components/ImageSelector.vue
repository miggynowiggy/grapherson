<template>
	<v-bottom-sheet v-model="bottomSheet">
		<v-list>
			<v-subheader>
				Image Source?
				<v-spacer />
				<v-btn small icon @click="bottomSheet = false">
					<v-icon>close</v-icon>
				</v-btn>
			</v-subheader>
			<v-list-item @click="takeImage('camera')">
				<v-list-item-avatar>
					<v-avatar>
						<v-icon>camera_alt</v-icon>
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-title>Camera</v-list-item-title>
			</v-list-item>
			<v-list-item @click="takeImage('gallery')">
				<v-list-item-avatar>
					<v-avatar>
						<v-icon>collections</v-icon>
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-title>Photo Gallery</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-bottom-sheet>
</template>

<script>
	export default {
		name: "ImageSelector",
		data: () => ({
			bottomSheet: false,
		}),
		methods: {
			async show() {
				this.bottomSheet = true;
			},
			async takeImage(mode) {
				this.bottomSheet = false;
				if (mode === "camera") {
					const img = await this.$store.dispatch("plugins/takePicture");

					if (!img) {
						return false;
					}

					this.$emit("imageTaken");
				} else {
					const img = await this.$store.dispatch("plugins/getGalleryPhoto");
					if (!img) {
						return false;
					}
					this.$emit("imageTaken");
				}
			},
		},
	};
</script>

<style></style>
