<template>
	<v-container fluid pa-0>
		<v-container fluid pa-0>
			<v-row align="center" justify="center">
				<v-col
					cols="12"
					align="center"
					class="headline primary--text font-weight-bold"
				>
					In a clean sheet (line-less) paper, write the following paragraph.
				</v-col>
			</v-row>
		</v-container>
		<v-card outlined light class="mt-8" height="50vh">
			<v-card-text class="body-1">
				I saw the purple people eater say, "You and your silly reading monkey do
				not go home from the zoo!." It was the strangest day. I didn't know
				people eaters could talk so well. At least that silly monkey was reading
				a good book.
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
	export default {
		name: "PenPaper",
		components: {},
		data: () => ({
			animOptions: {
				autoplay: true,
				speed: 0.5,
				loop: true,
				renderer: "svg",
			},
		}),
		methods: {},
	};
</script>

<style></style>
