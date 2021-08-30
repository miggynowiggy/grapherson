<template>
	<v-app>
		<AppBar pageTitle="Settings" />
		<v-main>
			<v-container fluid v-if="isUserLoggedIn">
				<v-row align="start" justify="center" wrap>
					<v-col cols="12" align="center">
						<v-avatar size="150" class="elevation-3">
							<v-img
								:contain="!userDetails.avatar.includes('https')"
								:src="
									userDetails.avatar.includes('https')
										? userDetails.avatar
										: require(`@/assets/avatars/${userDetails.avatar}`)
								"
							/>
						</v-avatar>
					</v-col>
					<v-col cols="12" align="center" class="mt-n1">
						<span class="text-h5 font-weight-bold secondary--text"
							>Halow {{ firstName }}! 👋</span
						>
					</v-col>
				</v-row>
				<v-row align="start" justify="center" wrap class="mt-4">
					<v-col cols="12" class="mt-n3">
						<v-divider />
					</v-col>
					<v-col cols="12" class="mt-n6">
						<v-list rounded>
							<v-list-item
								v-for="(link, index) in links"
								:key="index"
								:to="link.url"
								:ripple="true"
								color="primary"
							>
								<v-list-item-icon>
									<v-icon>{{ link.icon }}</v-icon>
								</v-list-item-icon>
								<v-list-item-content>
									<v-list-item-title>{{ link.text }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-col>
					<v-col cols="12" class="mt-n6"><v-divider /></v-col>
					<v-col cols="10" class="mt-3 mb-6" align="center">
						<v-btn outlined dark block rounded color="error" @click="logout">
							Logout
							<v-icon right>login</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
			<v-container fluid v-else>
				<v-row align="start" justify="center" wrap>
					<v-col cols="12" align="center">
						<v-img
							:src="require(`@/assets/avatars/plain.png`)"
							width="150"
							contain
						/>
					</v-col>
					<v-col cols="12" align="center" class="mt-n1">
						<span class="text-h5 font-weight-bold secondary--text"
							>Halow {{ firstName }}! 👋</span
						>
					</v-col>
				</v-row>
				<v-row align="center" justify="center" wrap class="mt-4">
					<v-col cols="12"><v-divider /></v-col>
					<v-col cols="12" align="center">
						<v-btn
							color="secondary"
							dark
							depressed
							rounded
							block
							large
							class="font-weight-black"
							@click="goToRegister"
							>Claim this Account!
							<v-icon right>how_to_reg</v-icon>
						</v-btn>
					</v-col>
					<v-col cols="12" align="center">
						<v-btn
							color="primary"
							dark
							outlined
							rounded
							block
							large
							class="font-weight-black"
							@click="goToLogin"
							>Login
							<v-icon right>login</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
		<bottom-nav :activeTab="'Settings'" />
	</v-app>
</template>

<script>
	import { Plugins } from "@capacitor/core";
	import BottomNav from "@/components/BottomNav.vue";
	import AppBar from "@/components/AppBar.vue";
	const { Modals, Toast } = Plugins;
	export default {
		name: "Settings",
		components: { BottomNav, AppBar },
		data: () => ({
			links: [
				{ icon: "create", text: "Edit Details", url: { name: "EditDetails" } },
				{
					icon: "lock_open",
					text: "Change Password",
					url: { name: "ChangePassword" },
				},
			],
		}),
		methods: {
			goToLogin() {
				this.$router.push({ name: "Login" });
			},
			goToRegister() {
				this.$router.push({ name: "Signup" });
			},
			async logout() {
				const response = await Modals.confirm({
					title: "Confirm Logout",
					message: "Are you sure you want to logout?",
					okButtonTitle: "Logout",
				});

				if (response.value) {
					await this.$store.dispatch("auth/logout");
					await Toast.show({
						text: "You have been logged out! See you soon!",
						position: "bottom",
						duration: "long",
					});
				}
			},
		},
		computed: {
			isUserLoggedIn() {
				return this.$store.getters["auth/IS_USER_SIGNED_IN"];
			},
			userDetails() {
				return this.$store.getters["auth/USER"];
			},
			firstName() {
				return this.userDetails.name ? this.userDetails.name.split(" ")[0] : "";
			},
		},
	};
</script>

<style></style>
