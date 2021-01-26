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
							@click="openCamera"
						>
							<span class="font-weight-bold">LETS CAPTURE!</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
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
		}),
		methods: {
			nextFrame() {
				if (this.currentFrame < 4) {
					this.currentFrame++;
				}
			},
			async openCamera() {
				const result = await this.$store.dispatch("plugins/takePicture");
				this.$store.commit("plugins/SET_CAPTURED_PHOTO", result);
				this.$router.push({ name: "Process" });
			},
		},
	};
</script>

<style></style>
