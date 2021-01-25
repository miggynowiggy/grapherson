<template>
	<v-app-bar app fixed elevate-on-scroll color="white">
		<v-app-bar-nav-icon @click="goBack" v-ripple>
			<v-icon medium color="grey darken-1">arrow_back</v-icon>
		</v-app-bar-nav-icon>
		<v-toolbar-title class="font-weight-bold title primary--text">{{
			pageName || ""
		}}</v-toolbar-title>
	</v-app-bar>
</template>

<script>
	export default {
		name: "AppBar",
		props: ["pageName"],
		methods: {
			goBack() {
				this.$router.go(-1);
			},
		},
	};
</script>

<style></style>
