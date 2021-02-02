<template>
	<v-app>
		<AppBar pageTitle="Previous Findings" />
		<v-main style="overflow: hidden;">
			<v-container fluid class="main" v-if="results.length">
				<v-row wrap align="center" justify="center">
					<v-col
						cols="12"
						v-for="(result, index) in results"
						:key="index"
						class="px-6"
					>
						<v-card elevation="6" outlined shaped @click="viewRecord(result)">
							<v-card-subtitle class="grey--text mx-3">{{
								result.date | formatDate
							}}</v-card-subtitle>
							<v-card-title class="mx-3 heading">{{
								result.title
							}}</v-card-title>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
			<v-container fluid pa-6 fill-height v-else-if="loading">
				<v-row align="center" justify="center">
					<v-col cols="10" align="center">
						<p class="mb-6 text-h4 text-center font-weight-bold primary--text">
							Please Wait...
						</p>
						<v-progress-circular
							indeterminate
							width="9"
							size="200"
							color="secondary darken-2"
						></v-progress-circular>
					</v-col>
				</v-row>
			</v-container>
			<v-container fluid pa-6 fill-height v-else-if="!results.length">
				<v-row align="end" justify="center" class="mt-8">
					<v-col cols="11" algin="center">
						<p class="text-h4 primary--text text-center font-weight-black">
							Take your first assessment
						</p>
					</v-col>
					<v-col cols="12" align="center">
						<lottie-player
							ref="lottieAnimation"
							:src="require('@/assets/lottiefiles/first_assessment.json')"
							:options="animOptions"
						/>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Records'" />
	</v-app>
</template>

<script>
	import mixins from "@/mixins";
	import BottomNav from "@/components/BottomNav.vue";
	import AppBar from "@/components/AppBar.vue";
	export default {
		name: "Records",
		mixins: [mixins],
		components: { BottomNav, AppBar },
		mounted() {
			setTimeout(() => {
				this.loading = false;
			}, 1500);
		},
		data: () => ({
			loading: true,
			animOptions: {
				autoplay: true,
				speed: 0.6,
				loop: true,
				mode: "bounce",
				renderer: "svg",
				width: "350px",
			},
		}),
		methods: {
			viewRecord(record) {
				this.$store.commit("records/SET_CURRENT_RECORD", record);
				this.$router.push({
					name: "ViewRecord",
				});
			},
		},
		computed: {
			results() {
				return this.$store.getters["records/ALL_RECORDS"];
			},
		},
	};
</script>
<style>
	.main {
		max-height: 81vh;
		overflow-y: scroll;
		scroll-behavior: smooth;
	}
</style>
