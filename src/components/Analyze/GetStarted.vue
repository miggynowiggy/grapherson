<template>
	<v-card outlined light height="70vh">
		<v-container fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" align="center">
					<lottie-player
						ref="lottieAnimation"
						:src="require('@/assets/lottiefiles/handwriting.json')"
						:options="animOptions"
					/>
				</v-col>
			</v-row>
		</v-container>
		<v-card-title
			style="margin-top: -40px;"
			class="primary--text font-weight-bold"
		>
			<v-row wrap align="center" justify="center">
				<v-col cols="12" align="center">
					Let's Get to Know You More
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text>
			<v-row align="center" justify="center">
				<v-col cols="12" align="center" class="body-1">
					Did you know that you could know more about yourself through your
					handwriting?
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
		name: "GetStarted",
		components: {},
		data: () => ({
			animOptions: {
				autoplay: true,
				speed: 0.5,
				loop: true,
				renderer: "svg",
				width: "250px",
			},
		}),
		methods: {
			initializeAnim(anim) {
				this.anim = anim;
				this.anim.setSpeed(1);
			},
		},
	};
</script>

<style></style>
