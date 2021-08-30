<template>
	<v-container fluid px-10>
		<v-form lazy-validation v-model="isFormValid">
			<v-row wrap align="start" justify="start">
				<div
					class="headline primary--text text-left font-weight-black mb-10 mt-5"
				>
					PERSONAL DETAILS
				</div>
				<v-col cols="12" class="mt-n4">
					<v-text-field
						label="Name / Nickname*"
						type="name"
						v-model="name"
						:rules="basicRules"
						filled
						rounded
						outlined
						single-line
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
			name: null,
			typeOfUser: null,
			isFormValid: false,

			basicRules: [(v) => !!v || "This field is required"],
		}),
		created() {
			this.typeOfUser = this.$route.params.typeOfUser;
		},
		methods: {
			async proceed() {},
		},
		watch: {
			name(value) {
				this.$emit("nameChange", value);
			}
		},
	};
</script>
