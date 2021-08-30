<template>
	<v-app>
		<AppBar pageTitle="Change Password" />
		<v-main>
			<v-container fluid class="mt-6">
				<v-row align="center" justify="center">
					<v-col cols="10" align="center">
						<v-text-field
							label="Current Password"
							v-model="currentPassword"
							:rules="passwordRules"
							filled
							rounded
							outlined
							single-line
							:append-icon="showPassword ? 'visibility' : 'visibility_off'"
							:type="showPassword ? 'text' : 'password'"
							@click:append="showPassword = !showPassword"
							color="primary"
						></v-text-field>
					</v-col>
					<v-col cols="10" align="center">
						<v-text-field
							label="New Password"
							v-model="newPassword"
							:rules="passwordRules"
							filled
							rounded
							outlined
							single-line
							:append-icon="newShowPassword ? 'visibility' : 'visibility_off'"
							:type="newShowPassword ? 'text' : 'password'"
							@click:append="newShowPassword = !newShowPassword"
							@keypress.enter="changePass"
							color="primary"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row align="center" justify="center" wrap>
					<v-col cols="10">
						<v-btn
							block
							depressed
							color="error darken-2"
							dark
							rounded
							@click="changePass"
						>
							Change Password
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
			<AlertNotif ref="notif" />
		</v-main>
	</v-app>
</template>

<script>
	import AppBar from "@/components/AppBar.vue";
	import mixins from "@/mixins";
	import AlertNotif from "@/components/AlertNotif.vue";
	export default {
		name: "ChangePassword",
		mixins: [mixins],
		components: {
			AppBar,
			AlertNotif,
		},
		data: () => ({
			currentPassword: null,
			newPassword: null,
			showPassword: false,
			newShowPassword: false,
			saveLoading: false,
		}),
		methods: {
			async changePass() {
				if (!this.currentPassword || !this.newPassword) {
					return;
				}

				this.saveLoading = true;
				await this.$store.dispatch("auth/changePassword", {
					oldPass: this.currentPassword,
					newPass: this.newPassword,
				});
				this.saveLoading = false;
				this.$refs.notif.showSuccess("Your password has been changed!");
			},
		},
	};
</script>

<style></style>
