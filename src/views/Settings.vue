<template>
	<v-app>
		<app-bar :pageName="'Settings'" />
		<v-main>
			<v-container fluid>
				<h1 class="primary--text">Wait lang settings to pramis</h1>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Settings'" />
	</v-app>
</template>

<script>
	import BottomNav from "@/components/BottomNav.vue";
	import AppBar from "../components/AppBar.vue";
	export default {
		components: { BottomNav, AppBar },
	};
</script>

<style></style>
