<template>
	<v-app>
		<app-bar :pageName="record.title" />
		<v-main>
			<v-container fluid>
				<v-carousel
					v-model="recordStep"
					:show-arrows="false"
					:hide-delimiters="true"
					:cycle="false"
					:continuous="false"
					height="100%"
				>
					<v-carousel-item>
						<handwriting />
					</v-carousel-item>
					<v-carousel-item>
						<graph />
					</v-carousel-item>
					<v-carousel-item>
						<result />
					</v-carousel-item>
				</v-carousel>
				<v-row
					align="center"
					justify="center"
					class="mt-5"
					v-if="recordStep < 2"
				>
					<p class="font-italic primary--text">
						Swipe to left or right to see more details
					</p>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import AppBar from "../components/AppBar.vue";
	import Graph from "../components/ViewRecord/Graph.vue";
	import Handwriting from "../components/ViewRecord/Handwriting.vue";
	import Result from "../components/ViewRecord/Result.vue";
	export default {
		components: { Handwriting, Graph, Result, AppBar },
		data: () => ({
			recordStep: 0,
			title: null,
		}),
		methods: {
			back() {
				if (this.recordStep === 1) {
					this.$store.commit("records/CLEAR_CURRENT_RECORD");
					this.$router.go(-1);
				} else {
					this.recordStep--;
				}
			},
		},
		computed: {
			record() {
				return this.$store.getters["records/CURRENT_RECORD"];
			},
		},
	};
</script>
