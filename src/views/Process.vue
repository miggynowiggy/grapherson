<template>
	<v-app>
		<v-main>
			<v-container fluid pa-0 fill-height>
				<v-row wrap align="start" justify="center">
					<v-col cols="12" align="center">
						<lottie-player
							:src="require('@/assets/lottiefiles/loading.json')"
							:options="animOptions"
						/>
					</v-col>
					<v-col
						cols="11"
						align="center"
						class="font-weight-bold text-h4 primary--text darken-3"
						id="fadingMessages"
					>
						{{ displayMessages[progress] }}
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "Process",
		async mounted() {
			this.setNextTimer();
			setTimeout(() => {
				this.$store.dispatch("records/generateRecord");
			}, 2000);
		},
		beforeDestroy() {
			clearInterval(this.setNextTimer);
		},
		data: () => ({
			displayMessages: [
				"Uploading your photo...",
				"Clearing and brightening up your photo...",
				"Extracting your personality...",
				"Generating interpretation...",
				"Generating meaningful graphs...",
			],
			progress: 0,
			animOptions: {
				autoplay: true,
				speed: 0.85,
				loop: true,
				renderer: "svg",
			},
		}),
		methods: {
			setNextTimer() {
				setInterval(() => {
					this.showNextMessage();
				}, 6000);
			},
			showNextMessage() {
				if (this.progress !== this.displayMessages.length - 1) {
					this.progress += 1;
				} else {
					this.$router.push({ name: "ViewRecord" });
				}
			},
		},
	};
</script>

<style>
	#fadingMessages {
		animation: fadeIn ease-in-out 1.5s infinite alternate;
	}
	@keyframes fadeIn {
		0% {
			opacity: 0.25;
		}
		100% {
			opacity: 1;
		}
	}
</style>
