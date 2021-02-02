<template>
	<v-app>
		<AppBar pageTitle="" />
		<v-main>
			<v-container fluid fill-height v-show="loading">
				<v-row align="start" justify="center">
					<v-col cols="12" align="center"
						><span class="text-h4 primary--text">Please wait...</span></v-col
					>
					<v-col cols="12" align="center" class="mt-2">
						<v-progress-circular
							indeterminate
							color="primary"
							width="7"
							size="200"
						></v-progress-circular>
					</v-col>
				</v-row>
			</v-container>
			<v-container fluid fill-height v-show="!loading">
				<v-row align="center" justify="center">
					<v-col cols="11">
						<v-carousel
							v-model="currentFrame"
							:show-arrows="!$vuetify.breakpoint.mobile"
							:continuous="false"
							:hide-delimiter-background="true"
							:hide-delimiters="true"
							height="100%"
							dark
						>
							<v-carousel-item eager>
								<GetStarted />
							</v-carousel-item>
							<v-carousel-item eager>
								<PenPaper />
							</v-carousel-item>
							<v-carousel-item>
								<Write />
							</v-carousel-item>
							<v-carousel-item eager>
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
							@click="openImageSelector"
						>
							<span class="font-weight-bold">LETS CAPTURE!</span>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
			<ImageSelector @imageTaken="proceedToProcess" ref="imgSelector" />
		</v-main>
	</v-app>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	import GetStarted from "@/components/Analyze/GetStarted.vue";
	import PenPaper from "@/components/Analyze/PenPaper.vue";
	import Write from "@/components/Analyze/Write.vue";
	import TakeAPhoto from "@/components/Analyze/TakeAPhoto.vue";
	import ImageSelector from "@/components/ImageSelector.vue";

	export default {
		name: "Analyze",
		components: {
			AppBar,
			GetStarted,
			PenPaper,
			Write,
			TakeAPhoto,
			ImageSelector,
		},
		data: () => ({
			currentFrame: 0,
			bottomSheet: false,
			loading: true,
		}),
		mounted() {
			setTimeout(() => {
				this.loading = false;
			}, 1250);
		},
		methods: {
			nextFrame() {
				if (this.currentFrame < 4) {
					this.currentFrame++;
				}
			},
			openImageSelector() {
				this.$refs.imgSelector.show();
			},
			proceedToProcess() {
				this.$router.push({ name: "Process" });
			},
		},
	};
</script>

<style></style>
