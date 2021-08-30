<template>
	<v-card outlined flat light height="70vh">
		<v-container>
			<v-row align="center" justify="center">
				<v-col cols="12" align="center">
					<lottie-player
						ref="lottieAnimation"
						:src="require('@/assets/lottiefiles/capture.json')"
						:options="animOptions"
					/>
				</v-col>
			</v-row>
		</v-container>
		<v-card-title
			class="font-weight-bold primary--text"
			style="margin-top: -20px; z-index: 999;"
		>
			<v-row align="center" justify="center">
				<v-col cols="12" align="center">
					Let's take a photo<br />of your handwriting!
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text class="body-1">
			<v-row align="center" justify="center">
				<v-col cols="12" align="center">
					Make sure that all of your handwriting is covered in the camera frame.
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
	export default {
		name: "TakeAPhoto",
		data: () => ({
			animOptions: {
				autoplay: true,
				speed: 1.5,
				loop: true,
				renderer: "svg",
				width: "250px",
			},
		}),
	};
</script>

<style></style>
