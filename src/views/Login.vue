<template>
	<v-app>
		<v-main>
			<v-container class="login-bg" fill-height fluid pa-10>
				<v-form lazy-validation v-model="isFormValid">
					<v-row align="center" justify="center" wrap>
						<v-col cols="12" align="center">
							<v-avatar tile size="150px" class="mb-10">
								<img alt="Grapherson" src="../assets/Grapherson.png" />
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
								color="primary"
							></v-text-field>
						</v-col>
						<v-col cols="12" class="mt-n5">
							<v-text-field
								label="Password"
								v-model="password"
								:rules="passwordRules"
								filled
								rounded
								outlined
								:append-icon="showPassword ? 'visibility' : 'visibility_off'"
								:type="showPassword ? 'text' : 'password'"
								@click:append="showPassword = !showPassword"
								color="primary"
							></v-text-field>
						</v-col>
						<v-col cols="10">
							<v-btn
								class="mb-3 font-weight-black"
								width="200"
								large
								color="primary"
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
						<v-col cols="10" class="mt-n4">
							<v-btn
								class="mb-3 font-weight-black"
								width="200"
								large
								color="primary"
								rounded
								outlined
								block
								:disabled="buttonDisabled"
								:loading="buttonDisabled"
								@click="signUp('user')"
							>
								SIGN-UP
							</v-btn>
						</v-col>
						<v-col cols="10" class="mt-n4">
							<v-btn
								class="text-decoration-underline font-weight-black"
								width="200"
								large
								color="primary"
								rounded
								plain
								block
								:disabled="buttonDisabled"
								:loading="buttonDisabled"
								@click="signUp('guest')"
							>
								PROCEED AS GUEST
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "Login",
		data: () => ({
			email: null,
			password: null,
			showPassword: false,
			buttonDisabled: false,
			choice: null,
			isFormValid: false,

			emailRules: [
				(v) => !!v || "E-mail is required",
				(v) =>
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"E-mail must be valid",
			],
			passwordRules: [
				(v) => !!v || "This field is required",
				(v) => (v && v.length >= 6) || "Minimum of 6 characters",
			],
		}),
		methods: {
			async signUp(choice) {
				this.buttonDisabled = true;
				this.$router.push({ name: "Signup", params: { typeOfUser: choice } });
				this.loginButtonDisabled = false;
			},
			async login() {
				this.buttonDisabled = true;
				this.$router.push({ name: "Home" });
				this.loginButtonDisabled = false;
			},
		},
	};
</script>
