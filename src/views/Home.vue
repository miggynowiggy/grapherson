<template>
	<v-app>
		<v-main style="overflow: hidden;">
			<v-container fluid class="main pt-6">
				<v-row justify="center" align="center">
					<v-col
						cols="11"
						align="center"
						class="d-inline-flex flex-row align-center"
					>
						<v-avatar tile size="150">
							<v-img
								:src="require(`@/assets/avatars/mascot.png`)"
								contain
								alt="avatar"
							/>
						</v-avatar>
						<h2 class="text-h4 font-weight-medium ml-n4 mt-3 primary--text">
							raphology
						</h2>
					</v-col>
				</v-row>
				<v-row justify="center" class="my-6 mx-2">
					<v-card class="pa-3" elevation="12" outlined>
						<v-card-title>What is Graphology?</v-card-title>
						<v-card-text>
							<span class="primary--text body-1 font-weight-medium"
								>Graphology</span
							>
							<span>
								is the study of handwriting, especially when employed as a means
								of analyzing a writer's <b>character</b>, <b>personality</b>,
								<b>abilities</b>, etc.
							</span>
						</v-card-text>
						<v-card-text>
							<span class="primary--text body-1 font-weight-medium"
								>The way you write</span
							>
							<span>
								can indicate more than <b>5,000</b> different personality
								traits.
							</span>
						</v-card-text>
						<v-card-text>
							<span class="primary--text body-1 font-weight-medium"
								>In the medical field,</span
							>
							<span>
								it can be used to refer to the study of handwriting as an
								<b>aid</b> in diagnosis and <b>tracking</b> of diseases.
							</span>
						</v-card-text>
					</v-card>
				</v-row>

				<v-row align="center" justify="center" wrap>
					<v-col cols="11">
						<v-divider class="my-1"></v-divider>
					</v-col>
					<v-col cols="11" class="mt-n3">
						<p class="text-h6 font-weight-bold primary--text darken-3">
							Articles to read on...
						</p>
					</v-col>
					<v-col cols="12" class="mt-n6">
						<v-slide-group multiple center-active>
							<v-slide-item v-for="(article, index) in articles" :key="index">
								<v-card
									width="300"
									class="ma-4"
									@click="openBrowser(article.link)"
								>
									<v-img
										:src="require(`@/assets/articles/${article.pic}`)"
										alt="article pic"
										width="300"
										height="200"
									/>
									<v-card-title class="pa-4 text-subtitle-2">{{
										article.name
									}}</v-card-title>
								</v-card>
							</v-slide-item>
						</v-slide-group>
					</v-col>
				</v-row>

				<v-row align="center" justify="space-around" wrap>
					<v-col cols="11">
						<v-divider class="my-1"></v-divider>
					</v-col>
					<v-col cols="11" class="mt-n3">
						<p class="text-h6 font-weight-bold secondary--text darken-3">
							Videos to binge watch...
						</p>
					</v-col>
					<v-col
						xs="10"
						sm="10"
						md="4"
						lg="4"
						align="center"
						v-for="(video, index) in videos"
						:key="index"
					>
						<v-card outlined height="auto" width="322">
							<iframe
								width="320"
								height="220"
								:src="video.url"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
							<v-card-title class="pa-3 text-subtitle-2">{{
								video.title
							}}</v-card-title>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Home'" />
	</v-app>
</template>

<script>
	import BottomNav from "../components/BottomNav.vue";
	import { Plugins } from "@capacitor/core";
	export default {
		name: "Home",
		components: { BottomNav },
		data: () => ({
			articles: [
				{
					pic: "article1.png",
					name: "What Does Your Handwriting Say About You?",
					link: "https://www.pens.com/handwriting-infographic",
				},
				{
					pic: "article2.jpg",
					name: "How Graphology can help the growth of the business",
					link: "https://www.entrepreneur.com/article/351513",
				},
				{
					pic: "article3.jpg",
					name: "Graphology Today: The Relevance of Graphology",
					link:
						"https://www.britishgraphology.org/about-british-institute-of-graphologists/graphology-today/",
				},
				{
					pic: "article3.jpg",
					name: "Graphology: The Psychology of Extraordinary Beliefs",
					link: "https://u.osu.edu/vanzandt/2018/03/08/graphology/",
				},
			],
			videos: [
				{
					url: "https://www.youtube.com/embed/JWmafBBMHSk",
					title:
						"How to spot a leader in their handwriting | Jamie Mason Cohen | TEDxUBIWiltz",
				},
				{
					url: "https://www.youtube.com/embed/G3bZibRU3kA",
					title: "Hand Writing | Mobina Tazerjani | TEDxPristinePrivateSchool",
				},
				{
					url: "https://www.youtube.com/embed/85bqT904VWA",
					title:
						"Why write? Penmanship for the 21st Century | Jake Weidmann | TEDxMileHigh",
				},
			],
		}),
		methods: {
			async openBrowser(source) {
				const { Browser } = Plugins;
				await Browser.open({
					url: source,
					windowName: "_blank",
					presentationStyle: "popover",
				});
			},
		},
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

<style>
	.main {
		max-height: 90vh;
		overflow-y: scroll;
		scroll-behavior: smooth;
	}
</style>
