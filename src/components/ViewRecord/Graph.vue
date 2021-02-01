<template>
	<v-container fluid>
		<v-row wrap align="center" justify="center">
			<v-col cols="12" align="center">
				<v-avatar tile size="200">
					<img
						src="@/assets/samplePicture.png"
						alt="sample writing"
						size="20"
					/>
				</v-avatar>
			</v-col>
			<v-col cols="10" align="center">
				<h1 class="headline primary--text mt-3">
					YOU'RE AN ABSOLUTE INTROVERT!
				</h1>
			</v-col>
			<v-col cols="11" justify="center" align="center">
				<v-card rounded color="secondary darken-2" elevation="5" class="pa-4">
					<v-row align="center" justify="center" wrap>
						<v-col cols="11" v-for="result in results" :key="result.name">
							<v-progress-linear
								class="mt-1"
								color="secondary"
								rounded
								height="10"
								:value="result.value"
							></v-progress-linear>
							<p>{{ result.value }}% {{ result.name }}</p>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		data: () => ({
			results: [
				{ name: "Aggresiveness", value: 29 },
				{ name: "Versatile", value: 59 },
				{ name: "Sensitive", value: 15 },
				{ name: "Good Will Power", value: 69 },
				{ name: "Self Confidence", value: 80 },
				{ name: "Good Thinker", value: 58 },
			],
		}),
	};
</script>
