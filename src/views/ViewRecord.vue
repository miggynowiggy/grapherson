<template>
	<v-app>
		<AppBar :pageTitle="record.title" />
		<v-main>
			<v-container fluid>
				<v-carousel
					v-model="currentFrame"
					:show-arrows="!$vuetify.breakpoint.mobile"
					:continuous="false"
					:hide-delimiter-background="true"
					:hide-delimiters="true"
					height="100%"
					dark
				>
					<v-carousel-item>
						<Handwriting :downloadURL="record.downloadURL" />
					</v-carousel-item>
					<v-carousel-item>
						<Graph :record="record" />
					</v-carousel-item>
					<v-carousel-item>
						<Result :record="record" />
					</v-carousel-item>
				</v-carousel>
				<v-row
					align="center"
					justify="center"
					class="mt-8"
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
			currentFrame: 0,
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
