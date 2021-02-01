<template>
	<v-container fluid>
		<v-row wrap align="center" justify="center">
			<v-col cols="10" align="center">
				<h1 class="headline font-weight-bold secondary--text">
					YOUR HANDWRITING
				</h1>
			</v-col>
			<v-col cols="12" align="center" class="mt-2">
				<v-avatar tile width="300" height="420" class="elevation-6">
					<v-btn
						v-if="downloadURL"
						color="primary"
						dark
						rounded
						overlap
						class="enlarge elevation-12"
						large
						@click="enlargeImage"
						>ENLARGE</v-btn
					>
					<v-img
						v-if="downloadURL"
						:src="downloadURL"
						alt="sample writing"
						size="20"
					/>
					<v-img
						v-else
						:src="require('@/assets/grapherson.png')"
						size="20"
						alt="grapherson-logo"
						contain
					/>
				</v-avatar>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import mixins from "@/mixins";
	import { Plugins } from "@capacitor/core";
	const { Browser } = Plugins;
	export default {
		name: "HandwritingPic",
		mixins: [mixins],
		props: ["downloadURL"],
		methods: {
			async enlargeImage() {
				await Browser.open({
					url: this.downloadURL,
					toolbarColor: this.primaryColor,
				});
			},
		},
	};
</script>

<style>
	.enlarge {
		position: absolute;
		top: 50%;
		font-weight: bold;
		z-index: 999;
	}
</style>
