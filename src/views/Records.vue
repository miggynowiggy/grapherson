<template>
	<v-app>
		<app-bar :pageName="'Previous Findings'" />
		<v-main style="overflow: hidden;">
			<v-container fluid class="main">
				<v-row wrap align="center" justify="center">
					<v-col
						cols="12"
						v-for="(result, index) in results"
						:key="index"
						class="px-6"
					>
						<v-card elevation="6" outlined shaped @click="viewRecord(result)">
							<v-card-subtitle class="grey--text mx-3">{{
								result.date
							}}</v-card-subtitle>
							<v-card-title class="mx-3 heading">{{
								result.title
							}}</v-card-title>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Records'" />
	</v-app>
</template>

<script>
	import BottomNav from "@/components/BottomNav.vue";
	import AppBar from "@/components/AppBar.vue";
	export default {
		components: { BottomNav, AppBar },
		data: () => ({}),
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
