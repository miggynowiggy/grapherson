<template>
	<v-app>
		<AppBar pageTitle="Change Password" />
		<v-main>
			<v-container>
				<h1 class="primary--text">Change Password</h1>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	export default {
		name: "ChangePassword",
		components: {
			AppBar,
		},
	};
</script>

<style></style>
