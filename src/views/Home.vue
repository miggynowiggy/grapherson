<template>
	<v-app>
		<v-main>
			<v-container fluid>
				<v-row justify="start" class="my-5 mx-2">
					<v-avatar tile size="100">
						<v-img
							:src="require(`@/assets/avatars/mascot.png`)"
							contain
							alt="avatar"
						/>
					</v-avatar>
					<h2 class="mt-10 primary--text">raphology</h2>
				</v-row>
				<v-row justify="center" class="my-5 mx-2">
					<v-card class="pa-3">
						<v-card-title>What is Graphology?</v-card-title>
						<v-card-text>
							<span class="primary--text body-1 font-weight-medium">Graphology</span>
							<span>
								is the study of handwriting, especially when employed as a means of analyzing a writer's <b>character</b>, <b>personality</b>, <b>abilities</b>, etc.
							</span>
						</v-card-text>
						<v-card-text>
							<span class="primary--text body-1 font-weight-medium">The way you write</span>
							<span>
								can indicate more than <b>5,000</b> different personality traits.
							</span>
						</v-card-text>
						<v-card-text>
							<span class="primary--text body-1 font-weight-medium">In the medical field,</span>
							<span>
								it can be used to refer to the study of handwriting as an <b>aid</b> in diagnosis and <b>tracking</b> of diseases.
							</span>
						</v-card-text>
					</v-card>
				</v-row>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Home'" />
	</v-app>
</template>

<script>
	import BottomNav from "../components/BottomNav.vue";
	export default {
		name: "Home",
		components: { BottomNav },
		data: () => ({}),
		computed: {
			userDetails() {
				return this.$store.getters["auth/USER"];
			},
			firstName() {
				return this.userDetails.name ? this.userDetails.name.split(" ")[0] : "";
			},
		},
	};
</script>
