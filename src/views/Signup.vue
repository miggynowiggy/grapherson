<template>
	<v-app>
		<AppBar :pageName="'Register'" />
		<v-main>
			<v-container fluid>
				<v-row align="center" justify="center" wrap>
					<v-col cols="12">
						<v-stepper v-model="steps" light>
							<v-stepper-header>
								<v-stepper-step :complete="steps > 1" step="1">
									Basic Information
								</v-stepper-step>
								<v-divider />
								<v-stepper-step step="2">
									Login Information
								</v-stepper-step>
							</v-stepper-header>

							<v-stepper-items>
								<v-stepper-content step="1" class="pa-2">
									<v-card flat rounded outlined>
										<v-card-title class="primary--text">
											Basic Information
										</v-card-title>
										<v-card-text>
											<v-form lazy-validation ref="basicInfo">
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
													<v-col cols="12" class="mt-n4">
														<v-text-field
															label="Age*"
															type="number"
															v-model="age"
															:rules="basicRules"
															filled
															rounded
															outlined
															single-line
															dense
															color="primary"
														></v-text-field>
													</v-col>
													<v-col cols="12" class="mt-n8">
														<v-radio-group
															label="Gender*"
															v-model="gender"
															:rules="basicRules"
															column
														>
															<v-radio
																v-for="gender in genders"
																:key="gender.name"
																:label="gender.name"
																:value="gender.value"
																color="primary"
															></v-radio>
														</v-radio-group>
													</v-col>
												</v-row>
											</v-form>
										</v-card-text>
									</v-card>
								</v-stepper-content>
								<v-stepper-content step="2" class="pa-2">
									<v-card rounded flat outlined>
										<v-card-title class="primary--text">
											Login Information
										</v-card-title>
										<v-card-text>
											<v-form lazy-validation ref="loginInfo">
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
								</v-stepper-content>
							</v-stepper-items>
						</v-stepper>
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
							<span v-if="steps < 2">Proceed</span>
							<span v-else>Register</span>
							<v-icon
								right
								size="23"
								v-text="steps < 2 ? 'arrow_forward' : 'how_to_reg'"
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
			steps: 1,
			name: null,
			age: null,
			gender: null,
			email: null,
			password: null,
			showPassword: false,
			buttonDisabled: false,
		}),
		mounted() {
			const { name, age, gender } = this.$store.getters["auth/USER"];
			if (name && age && gender) {
				this.name = name;
				this.age = age;
				this.gender = gender;
				this.steps = 2;
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
				const isBasicFormValid = this.$refs.basicInfo.validate();
				if (this.steps === 1 && isBasicFormValid) {
					this.steps += 1;
					return;
				}

				const isLoginFormValid = this.$refs.loginInfo.validate();
				if (this.steps === 2 && isLoginFormValid) {
					this.register();
				}
			},
			async register() {
				try {
					this.buttonDisabled = true;
					await this.$store.dispatch("auth/registerManually", {
						name: this.name,
						age: this.age,
						gender: this.gender,
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
