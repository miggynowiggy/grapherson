<template>
	<v-container fill-height fluid class="login-bg">
		<v-row align="center" justify="center">
			<personal-details
				v-if="signUpStep === 1"
				@nameChange="getNameValue"
				@ageChange="getAgeValue"
				@genderChange="getGenderValue"
			/>
			<login-details
				v-else
				@emailChange="getEmailValue"
				@passwordChange="getPasswordValue"
				@confirmPasswordChange="getConfirmPasswordValue"
			/>
		</v-row>
		<v-row wrap align="start" justify="center" class="mt-n4">
			<v-col cols="10">
				<v-btn
					class="font-weight-black"
					width="200"
					large
					color="primary"
					rounded
					block
					:disabled="buttonDisabled"
					:loading="buttonDisabled"
					@click="proceed"
				>
					<span v-if="typeOfUser === 'user' && signUpStep === 1">Next</span>
					<span v-else>Proceed</span>
				</v-btn>
			</v-col>
			<v-col cols="10" class="mt-2">
				<v-btn
					class="font-weight-black"
					width="200"
					large
					color="primary"
					rounded
					outlined
					block
					:disabled="buttonDisabled"
					:loading="buttonDisabled"
					@click="back"
				>
					<span v-if="typeOfUser === 'user' && signUpStep === 2">Back</span>
					<span v-else>Cancel</span>
				</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	import PersonalDetails from "../components/PersonalDetails.vue";
	import LoginDetails from "../components/LoginDetails.vue";
	export default {
		name: "Signup",
		components: { PersonalDetails, LoginDetails },
		data: () => ({
			name: null,
			age: null,
			gender: null,
			email: null,
			password: null,
			confirmPassword: null,
			typeOfUser: null,
			signUpStep: 1,
			buttonDisabled: false,
		}),
		created() {
			this.typeOfUser = this.$route.params.typeOfUser;
		},
		methods: {
			async proceed() {
				if (!this.name || !this.age || !this.gender) return;
				else if (this.typeOfUser === "user") {
					if (this.signUpStep === 1) this.signUpStep = 2;
					else if (!this.email || !this.password || !this.confirmPassword)
						return;
					else this.$router.push({ name: "Home" });
				} else this.$router.push({ name: "Home" });
			},
			async back() {
				if (this.typeOfUser === "user" && this.signUpStep === 2)
					this.signUpStep = 1;
				else this.$router.push({ name: "Login" });
			},
			getNameValue(value) {
				this.name = value;
			},
			getAgeValue(value) {
				this.age = value;
			},
			getGenderValue(value) {
				this.gender = value;
			},
			getEmailValue(value) {
				this.email = value;
			},
			getPasswordValue(value) {
				this.password = value;
			},
			getConfirmPasswordValue(value) {
				this.confirmPassword = value;
			},
		},
	};
</script>
