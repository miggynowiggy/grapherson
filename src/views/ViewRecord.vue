<template>
	<v-app class="body">
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
					v-if="recordStep < 2 && $vuetify.breakpoint.mobile"
				>
					<p class="font-italic primary--text">
						Swipe to left or right to see more details
					</p>
				</v-row>
				<v-row
					align="center"
					justify="center"
					class="mt-3"
					v-if="isUserLoggedIn"
				>
					<v-col xs="10" sm="10" md="3" lg="3" align="center">
						<v-btn
							rounded
							color="primary"
							dark
							block
							depressed
							@click="showEdit"
						>
							<span class="font-weight-bold">Edit this finding's title</span>
						</v-btn>
					</v-col>
					<!-- <v-col xs="10" sm="10" md="3" lg="3" align="center">
						<v-btn
							rounded
							color="error"
							dark
							block
							depressed
							@click="showDelete = true"
						>
							<span class="font-weight-bold">Delete this Findings</span>
						</v-btn>
					</v-col> -->
				</v-row>
			</v-container>
			<v-dialog
				persistent
				v-model="editDialog"
				:width="$vuetify.breakpoint.mobile ? 'auto' : '45vw'"
			>
				<v-card>
					<v-card-title class="secondary white--text dark font-weight-bold">
						Edit finding's title
						<v-spacer></v-spacer>
						<v-btn icon small @click="editDialog = false">
							<v-icon color="white">close</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text class="py-8">
						<v-row align="center" justify="center">
							<v-col cols="11" align="center">
								<v-text-field
									v-model="newTitle"
									label="Finding's Title"
									dense
									rounded
									outlined
									color="primary"
								></v-text-field>
							</v-col>
							<v-col cols="5" align="center" class="mt-n10">
								<v-btn
									depressed
									rounded
									color="primary"
									class="mt-5"
									dark
									block
									:loading="saveLoading"
									@click="saveChanges"
								>
									Save
								</v-btn>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-dialog>

			<v-dialog
				persistent
				v-model="showDelete"
				:width="$vuetify.breakpoint.mobile ? 'auto' : '45vw'"
			>
				<v-card>
					<v-card-title class="error white--text dark font-weight-bold">
						Delete this findings?
						<v-spacer></v-spacer>
						<v-btn icon small @click="showDelete = false">
							<v-icon color="white">close</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text class="py-8">
						<v-row align="center" justify="center" dense>
							<v-col cols="11" align="center">
								<v-btn
									depressed
									rounded
									color="error"
									class="mt-5"
									dark
									block
									:loading="deleteLoading"
									@click="deleteFindings"
								>Yes</v-btn>
							</v-col>
							<v-col cols="11" align="center">
								<v-btn
									outlined
									rounded
									color="black lighten-2"
									class="mt-5"
									dark
									block
									@click="showDelete = false"
								>
									No
								</v-btn>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-dialog>
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
			editDialog: false,
			newTitle: null,
			saveLoading: false,
			showDelete: false,
			deleteLoading: false
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
			showEdit() {
				this.newTitle = this.record.title || "";
				this.editDialog = true;
			},
			async saveChanges() {
				this.saveLoading = true;
				await this.$store.dispatch("records/saveName", {
					id: this.record.id,
					title: this.newTitle,
				});
				this.saveLoading = false;
				this.editDialog = false;
			},
			async deleteFindings() {
				this.deleteLoading = false;
				await this.$store.dispatch("records/delete", {
					id: this.record.id
				});
				this.deleteLoading = false;
				this.showDelete = false;
				this.$router.go(-1);
			}
		},
		computed: {
			record() {
				return this.$store.getters["records/CURRENT_RECORD"];
			},
			isUserLoggedIn() {
				return this.$store.getters["auth/IS_USER_SIGNED_IN"];
			},
		},
	};
</script>
<style>
	.body {
		padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
	}
</style>
