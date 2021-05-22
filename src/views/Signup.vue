<template>
	<v-app>
		<AppBar pageTitle="Register" />
		<v-main>
			<v-container fluid>
				<v-row align="center" justify="center" wrap>
					<v-col cols="12">
						<v-card flat rounded outlined>
							<v-card-title class="primary--text">
								Grapherson Account
							</v-card-title>
							<v-card-text>
								<v-form lazy-validation ref="loginInfo">
									<v-row align="center" justify="center" wrap>
										<v-col cols="12">
											<v-text-field
												label="Name / Nickname*"
												type="name"
												v-model="name"
												:rules="basicRules"
												filled
												rounded
												outlined
												single-line
												dense
												color="primary"
											></v-text-field>
										</v-col>
									</v-row>
									<v-row align="center" justify="center" wrap>
										<v-col cols="12">
											<v-text-field
												label="Email"
												type="email"
												v-model="email"
												:rules="emailRules"
												filled
												rounded
												outlined
												dense
												color="primary"
											></v-text-field>
										</v-col>
										<v-col cols="12" class="mt-n3">
											<v-text-field
												label="Password"
												v-model="password"
												:rules="passwordRules"
												hint="minimum of 8 characters"
												filled
												rounded
												outlined
												dense
												:append-icon="
													showPassword ? 'visibility' : 'visibility_off'
												"
												:type="showPassword ? 'text' : 'password'"
												@click:append="showPassword = !showPassword"
												color="primary"
											></v-text-field>
										</v-col>
									</v-row>
								</v-form>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-row wrap align="start" justify="center" class="mt-6">
					<v-col cols="10">
						<v-btn
							class="font-weight-black"
							color="primary"
							large
							rounded
							block
							depressed
							:disabled="buttonDisabled"
							:loading="buttonDisabled"
							@click="proceed"
						>
							<span>Register</span>
							<v-icon
								right
								size="23"
								v-text="'how_to_reg'"
							></v-icon>
						</v-btn>
					</v-col>
					<v-col cols="10" class="mt-2">
						<v-btn
							class="font-weight-black"
							color="primary"
							large
							rounded
							outlined
							block
							:disabled="buttonDisabled"
							:loading="buttonDisabled"
							@click="back"
						>
							<span v-if="steps < 2">Cancel</span>
							<span v-else>Back</span>
						</v-btn>
					</v-col>
				</v-row>
				<AlertNotif ref="notif" />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import mixins from "@/mixins";
	import { Plugins } from "@capacitor/core";
	import AppBar from "@/components/AppBar.vue";
	import AlertNotif from "@/components/AlertNotif.vue";
	const { Toast } = Plugins;
	export default {
		name: "Signup",
		components: { AppBar, AlertNotif },
		mixins: [mixins],
		data: () => ({
			name: null,
			email: null,
			password: null,
			showPassword: false,
			buttonDisabled: false,
		}),
		mounted() {
			const { name } = this.$store.getters["auth/USER"];
			if (name) {
				this.name = name;
			}
		},
		methods: {
			async back() {
				if (this.steps === 1) {
					this.$router.push({ name: "Login" });
				} else {
					this.steps = 1;
				}
			},
			async proceed() {
				const isLoginFormValid = this.$refs.loginInfo.validate();
				if (isLoginFormValid) {
					this.register();
				}
			},
			async register() {
				try {
					this.buttonDisabled = true;
					await this.$store.dispatch("auth/registerManually", {
						name: this.name,
						email: this.email,
						avatar: "plain.png",
						password: this.password,
					});
					this.buttonDisabled = false;
					await Toast.show({
						text: `Welcome to Grapherson, ${this.name.split(" ")[0]}!`,
						position: "bottom",
						duration: "long",
					});
				} catch (err) {
					this.buttonDisabled = false;
					this.$refs.notif.showError(err.message);
				}
			},
		},
	};
</script>
