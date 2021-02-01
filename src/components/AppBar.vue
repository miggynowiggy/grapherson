<template>
	<v-app-bar app fixed elevate-on-scroll color="white">
		<v-app-bar-nav-icon @click="goBack" v-ripple>
			<v-icon size="31" color="grey darken-1">arrow_back</v-icon>
		</v-app-bar-nav-icon>
		<v-toolbar-title class="font-weight-bold title primary--text">{{
			pageName || ""
		}}</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-btn icon medium v-if="pageName !== 'Register' && pageName !== 'Proceed as Guest'" @click="goHome">
			<v-icon>home</v-icon>
		</v-btn>
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
			goHome() {
				this.$router.push({ name: "Home" });
			},
		},
	};
</script>

<style></style>
