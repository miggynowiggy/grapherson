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
				<h1 class="headline primary--text mt-3 text-uppercase font-weight-medium">
					Your Top Traits
				</h1>
			</v-col>
			<v-col cols="11" justify="center" align="center">
				<v-card rounded color="primary" elevation="5" class="pa-5">
					<v-row row align="center" justify="center" wrap>
						<v-col cols="auto" v-for="result in results" :key="result.name">
							<v-chip class="font-weight-medium subtitle-1 white primary--text darken-4">{{ result.name }}</v-chip>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		props: ["record"],
		mounted() {
			const { ratings, findings } = this.record;
			if (findings === "Introvert" || findings === "Extrovert") {
				this.findings = `You're an ${findings}`;
			} else if (
				findings === "Depression tendencies" ||
				findings === "Anxiety tendencies"
			) {
				this.findings = `You're having ${findings}`;
			}

			this.results = [
				{
					name: "Emotional Stability",
					value: Number(ratings.emotional_stability),
				},
				{
					name: "Will Power",
					value: Number(ratings.will_power),
				},
				{
					name: "Modesty",
					value: Number(ratings.modesty),
				},
				{
					name: "Harmony Flexibility",
					value: Number(ratings.harmony_flexibility),
				},
				{
					name: "Discipline",
					value: Number(ratings.discipline),
				},
				{
					name: "Poor Concentration",
					value: Number(ratings.concentration),
				},
				{
					name: "Communicativeness",
					value: Number(ratings.communicativeness),
				},
				{
					name: "Social Ability",
					value: Number(ratings.sociability),
				},
			];

			this.results = this.results.filter(r => r.value > 0);
		},
		data: () => ({
			findings: "",
			results: [
				{ name: "Emotional Stability", value: 0 },
				{ name: "Will Power", value: 0 },
				{ name: "Modesty", value: 0 },
				{ name: "Harmony Flexibility", value: 0 },
				{ name: "Discipline", value: 0 },
				{ name: "Poor Concentration", value: 0 },
				{ name: "Communicativeness", value: 0 },
				{ name: "Social Ability", value: 0 },
			],
		}),
	};
</script>
