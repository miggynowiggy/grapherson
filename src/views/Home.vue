<template>
	<v-app>
		<v-main>
			<v-container fluid class="main">
				<v-row justify="center" align="center" class="mt-4">
					<v-avatar size="150" class="elevation-3">
						<v-img
							v-if="userDetails.hasOwnProperty('avatar') && userDetails.avatar"
							:src="
								userDetails.avatar.includes('https')
									? userDetails.avatar
									: require(`@/assets/avatars/${userDetails.avatar}`)
							"
							alt="avatar"
						/>
						<v-img
							v-else
							:src="require(`@/assets/avatars/plain.png`)"
							alt="avatar"
						/>
					</v-avatar>
				</v-row>
				<v-row justify="center" class="mt-4">
					<h1 class="secondary--text">{{ firstName }}</h1>
				</v-row>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Home'" />
	</v-app>
</template>

<script>
	import BottomNav from "../components/BottomNav.vue";
	export default {
		name: "Home",
		components: { BottomNav },
		data: () => ({}),
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
