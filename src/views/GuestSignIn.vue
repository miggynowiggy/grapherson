<template>
	<v-app>
		<AppBar pageTitle="Proceed as Guest" />
		<v-main>
			<v-container fluid px-10>
				<v-form lazy-validation ref="form">
					<v-row wrap align="start" justify="start">
						<div
							class="headline primary--text text-left font-weight-bold mb-10 mt-5"
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
				<v-row align="center" justify="center">
					<v-col cols="12">
						<v-divider></v-divider>
					</v-col>
					<v-col cols="6" align="center">
						<v-btn
							color="primary"
							rounded
							outlined
							depressed
							block
							dark
							large
							@click="proceed"
							:loading="proceedBtn"
						>
							<span class="font-weight-black">proceed</span>
							<v-icon right size="21">arrow_forward</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
	import { Plugins } from "@capacitor/core";
	import mixins from "@/mixins";
	import AppBar from "@/components/AppBar.vue";
	const { Toast } = Plugins;
	export default {
		name: "GuestSignIn",
		mixins: [mixins],
		components: { AppBar },
		data: () => ({
			name: null,
			proceedBtn: false,
		}),
		methods: {
			async proceed() {
				const isFormValid = this.$refs.form.validate();
				if (!isFormValid) {
					return;
				}
				this.proceedBtn = true;
				await this.$store.dispatch("auth/registerGuest", {
					name: this.name,
					avatar: "plain.png",
				});
				this.proceedBtn = true;
				this.$router.push({ name: "Home" });
				await Toast.show({
					text: `Welcome to Grapherson, ${this.name.split(" ")[0]}!`,
					position: "bottom",
					duration: "long",
				});
			},
		},
	};
</script>
