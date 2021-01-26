<template>
	<v-app>
		<app-bar :pageName="''" />
		<v-main>
			<v-container fluid fill-height>
				<v-row align="center" justify="center">
					<v-col cols="11">
						<v-carousel
							v-model="currentFrame"
							:show-arrows="false"
							:hide-delimiters="true"
							:cycle="false"
							:continuous="false"
							height="100%"
						>
							<v-carousel-item>
								<GetStarted />
							</v-carousel-item>
							<v-carousel-item>
								<PenPaper />
							</v-carousel-item>
							<v-carousel-item>
								<Write />
							</v-carousel-item>
							<v-carousel-item>
								<TakeAPhoto />
							</v-carousel-item>
						</v-carousel>
					</v-col>
				</v-row>
				<v-row align="center" justify="space-around">
					<v-col cols="6" v-if="currentFrame < 3">
						<v-btn
							depressed
							color="secondary"
							rounded
							block
							x-large
							@click="nextFrame"
						>
							<span class="font-weight-bold">Next</span>
						</v-btn>
					</v-col>
					<v-col v-else cols="9">
						<v-btn
							depressed
							color="primary"
							rounded
							block
							x-large
							@click="bottomSheet = true"
						>
							<span class="font-weight-bold">LETS CAPTURE!</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
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
		</v-main>
	</v-app>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	import GetStarted from "@/components/Analyze/GetStarted.vue";
	import PenPaper from "@/components/Analyze/PenPaper.vue";
	import Write from "@/components/Analyze/Write.vue";
	import TakeAPhoto from "@/components/Analyze/TakeAPhoto.vue";

	export default {
		name: "Analyze",
		components: {
			AppBar,
			GetStarted,
			PenPaper,
			Write,
			TakeAPhoto,
		},
		data: () => ({
			currentFrame: 0,
			bottomSheet: false,
		}),
		methods: {
			nextFrame() {
				if (this.currentFrame < 4) {
					this.currentFrame++;
				}
			},
			async takeImage(mode) {
				this.bottomSheet = false;
				if (mode === "camera") {
					await this.$store.dispatch("plugins/takePicture");
				} else {
					await this.$store.dispatch("plugins/getGalleryPhoto");
				}
				this.$router.push({ name: "Process" });
			},
		},
	};
</script>

<style></style>
