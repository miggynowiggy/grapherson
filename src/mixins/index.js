export default {
	data: () => ({
		primaryColor: "#00B882",
		genders: [
			{ name: "Male", value: "male" },
			{ name: "Female", value: "female" },
			{ name: "Prefer not to say", value: "others" },
		],
		basicRules: [(v) => !!v || "This field is required"],
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
};
