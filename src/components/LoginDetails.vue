<template>
	<v-container fluid pa-10>
		<v-form>
			<v-row wrap align="center" justify="center">
				<div
					class="headline secondary--text text-center font-weight-black mb-10 mt-5"
				>
					LOGIN DETAILS
				</div>
				<v-col cols="11">
					<v-text-field
						label="Email"
						type="email"
						v-model="email"
						:rules="emailRules"
						filled
						rounded
						outlined
						color="primary"
					></v-text-field>
				</v-col>
				<v-col cols="11">
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
				<v-col cols="11">
					<v-text-field
						label="Confirm Password"
						v-model="confirmPassword"
						:rules="confirmPasswordRules"
						filled
						rounded
						outlined
						:append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'"
						:type="showConfirmPassword ? 'text' : 'password'"
						@click:append="showConfirmPassword = !showConfirmPassword"
						color="primary"
					></v-text-field>
				</v-col>
			</v-row>
		</v-form>
	</v-container>
</template>

<script>
	export default {
		name: "Signup",
		data: () => ({
			email: "",
			password: "",
			confirmPassword: "",
			showPassword: false,
			showConfirmPassword: false,

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
			confirmPasswordRules: [
				(v) => !!v || "This field is required",
				(v) => v === this.password || "Passwords must match",
			],
		}),
		watch: {
			email(value) {
				this.$emit("emailChange", value);
			},
			password(value) {
				this.$emit("passwordChange", value);
			},
			confirmPassword(value) {
				this.$emit("confirmPasswordChange", value);
			},
		},
	};
</script>
