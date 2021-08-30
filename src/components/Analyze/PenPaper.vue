<template>
	<v-card outlined light height="70vh">
		<v-container fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" align="center">
					<lottie-player
						ref="lottieAnimation"
						:src="require('@/assets/lottiefiles/penpaper.json')"
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
					Grab a pen and paper!
				</v-col>
			</v-row>
		</v-card-title>
		<v-card-text>
			<v-row align="center" justify="center">
				<v-col cols="12" align="center" class="body-1">
					We will let you write a body of text for us to analyze and know your
					personality.
				</v-col>
			</v-row>
		</v-card-text>
	</v-card></template
>

<script>
	export default {
		name: "PenPaper",
		data: () => ({
			animOptions: {
				autoplay: true,
				speed: 0.5,
				loop: true,
				renderer: "svg",
				width: "250px",
			},
		}),
		methods: {},
	};
</script>

<style></style>
