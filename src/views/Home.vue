<template>
	<v-app>
		<v-main>
			<v-container fluid>
				<v-row justify="center">
					<v-avatar tile size="200">
						<v-img
							v-if="userDetails.hasOwnProperty('avatar') && userDetails.avatar"
							:src="
								userDetails.avatar.includes('https')
									? userDetails.avatar
									: require(`@/assets/avatars/${userDetails.avatar}`)
							"
							contain
							alt="avatar"
						/>
						<v-img
							v-else
							:src="require(`@/assets/avatars/plain.png`)"
							contain
							alt="avatar"
						/>
					</v-avatar>
				</v-row>
				<v-row justify="center">
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
