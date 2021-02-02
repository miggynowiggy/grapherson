<template>
	<div align="center">
		<v-row align="center" justify="center" wrap>
			<v-col cols="10">
				<v-avatar tile size="200">
					<img
						src="@/assets/samplePicture.png"
						alt="sample writing"
						size="20"
					/>
				</v-avatar>
			</v-col>
			<v-col cols="10" class="mt-n3">
				<h1 class="headline primary--text text-uppercase mt-6">
					{{ record.findings }}
				</h1>
			</v-col>
			<v-col cols="11" class="mt-n6">
				<v-card rounded elevation="5" color="secondary darken-2" class="my-6">
					<v-card-text>
						<p class="text-subtitle-1 white--text">
							{{ record.interpretation }}
						</p>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		name: "Result",
		props: ["record"],
		mounted() {
			const { findings } = this.record;
			if (findings === "Introvert" || findings === "Extrovert") {
				this.findings = `You're an ${findings}`;
			} else if (
				findings === "Depression tendencies" ||
				findings === "Anxiety tendencies"
			) {
				this.findings = `You're having ${findings}`;
			}
		},
		data: () => ({
			findings: "",
			interpretation: "",
		}),
	};
</script>
