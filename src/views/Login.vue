<template>
	<v-app>
		<v-main>
			<v-container class="login-bg" fill-height fluid pa-10>
				<v-form lazy-validation ref="form" v-model="isFormValid">
					<v-row align="center" justify="center" wrap>
						<v-col cols="12" align="center">
							<v-avatar tile size="190px" class="mb-6">
								<img
									alt="Grapherson"
									:src="require('@/assets/grapherson.png')"
								/>
							</v-avatar>
						</v-col>
						<v-col cols="12">
							<v-text-field
								label="Email Address"
								type="email"
								v-model="email"
								:rules="emailRules"
								filled
								rounded
								outlined
								single-line
								color="primary"
							></v-text-field>
						</v-col>
						<v-col cols="12" class="mt-n4">
							<v-text-field
								label="Password"
								v-model="password"
								:rules="passwordRules"
								filled
								rounded
								outlined
								single-line
								:append-icon="showPassword ? 'visibility' : 'visibility_off'"
								:type="showPassword ? 'text' : 'password'"
								@click:append="showPassword = !showPassword"
								@keypress.enter="login"
								color="primary"
							></v-text-field>
						</v-col>
						<v-col cols="10" class="mt-n4">
							<v-btn
								class="font-weight-black"
								color="primary"
								large
								depressed
								rounded
								block
								:disabled="buttonDisabled"
								:loading="buttonDisabled"
								@click="login"
							>
								LOGIN
							</v-btn>
						</v-col>
						<v-col cols="12" class="mt-3"><v-divider /></v-col>
						<v-col cols="12" class="body-1 grey--text darken-1" align="center"
							>New user?</v-col
						>
						<v-col cols="7">
							<v-btn
								class="font-weight-black"
								color="primary"
								rounded
								outlined
								block
								:disabled="buttonDisabled"
								@click="goToSignup"
							>
								SIGN-UP
							</v-btn>
						</v-col>
						<v-col cols="10" class="mt-n2">
							<v-btn
								class="text-decoration-underline font-weight-black"
								color="primary"
								large
								plain
								block
								:disabled="buttonDisabled"
								@click="goToGuest"
							>
								PROCEED AS GUEST
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
				<AlertNotif ref="notif" />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	/* eslint-disable no-useless-catch */
	import mixins from "@/mixins";
	import AlertNotif from "@/components/AlertNotif.vue";
	export default {
		name: "Login",
		mixins: [mixins],
		components: {
			AlertNotif,
		},
		data: () => ({
			email: null,
			password: null,
			showPassword: false,
			buttonDisabled: false,
			choice: null,
			isFormValid: false,
		}),
		methods: {
			async goToSignup() {
				this.$router.push({ name: "Signup" });
			},
			async goToGuest() {
				this.$router.push({ name: "GuestSignIn" });
			},
			async login() {
				const isFormValid = this.$refs.form.validate();
				if (!isFormValid) {
					this.$refs.notif.showWarning("Enter your email and password!");
					return;
				}

				try {
					this.buttonDisabled = true;
					await this.$store.dispatch("auth/login", {
						email: this.email,
						password: this.password,
					});
					this.buttonDisabled = false;
				} catch (err) {
					this.buttonDisabled = false;
					this.$refs.notif.showError(err.message);
				}
			},
		},
	};
</script>
