<template>
	<v-app>
		<app-bar :pageName="'Edit Details'" />
		<v-main>
			<v-form ref="form" lazy-validation>
				<v-container fluid class="px-8">
					<v-row align="center" justify="start" wrap class="mt-2">
						<v-col cols="12">
							<v-text-field
								v-model="user.name"
								label="Name"
								type="text"
								color="primary"
								rounded
								outlined
								required
								dense
								:disabled="!toggleEdit"
							/>
						</v-col>
					</v-row>
					<!-- <v-row align="center" justify="start" wrap class="mt-n7">
						<v-col cols="12">
							<v-text-field
								v-model="user.email"
								label="Email"
								type="email"
								color="primary"
								rounded
								outlined
								required
								dense
								:disabled="!toggleEdit"
							/>
						</v-col>
					</v-row> -->
					<v-row align="center" justify="start" wrap class="mt-n7">
						<v-col cols="12">
							<v-text-field
								v-model="user.age"
								label="Age"
								type="number"
								color="primary"
								rounded
								outlined
								required
								dense
								:disabled="!toggleEdit"
							/>
						</v-col>
					</v-row>
					<v-row align="center" justify="start" wrap class="mt-n12">
						<v-col cols="12">
							<v-radio-group
								v-model="user.gender"
								label="Gender"
								:disabled="!toggleEdit"
								required
							>
								<v-radio
									v-for="(gender, index) in genders"
									:key="index"
									:label="gender.name"
									:value="gender.value"
								/>
							</v-radio-group>
						</v-col>
					</v-row>
					<v-divider class="my-2" />
					<v-row
						align="center"
						justify="center"
						v-if="!toggleEdit"
						class="mt-2"
					>
						<v-col cols="10" align="center">
							<v-btn
								color="primary"
								dark
								block
								large
								rounded
								depressed
								@click="edit"
							>
								<span class="font-weight-bold">EDIT</span>
								<v-icon right>create</v-icon>
							</v-btn>
						</v-col>
					</v-row>
					<v-row align="start" justify="center" v-else class="mt-2">
						<v-col cols="10" align="center">
							<v-btn
								color="primary"
								large
								dark
								block
								rounded
								depressed
								:loading="saveBtn"
								@click="save"
							>
								save
								<v-icon right>save</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="10" align="center" class="mt-n2">
							<v-btn
								color="grey darken-2"
								dark
								block
								rounded
								outlined
								large
								:disabled="saveBtn"
								@click="cancel"
							>
								cancel
								<v-icon right>clear</v-icon>
							</v-btn>
						</v-col>
						<v-col cols="12" align="center"><v-divider /></v-col>
						<v-col cols="10" align="center">
							<v-btn
								color="error"
								large
								dark
								block
								rounded
								outlined
								:loading="deleteBtn"
								@click="deleteAccount"
							>
								Delete My Account
								<v-icon right>delete</v-icon>
							</v-btn>
						</v-col>
					</v-row>
				</v-container>
			</v-form>
		</v-main>
	</v-app>
</template>

<script>
	import { Plugins } from "@capacitor/core";
	import AppBar from "@/components/AppBar.vue";
	const { Toast, Modals } = Plugins;
	export default {
		name: "EditDetails",
		components: {
			AppBar,
		},
		data: () => ({
			isFormValid: false,
			toggleEdit: false,
			user: {
				name: null,
				age: null,
				gender: null,
			},
			genders: [
				{ name: "Male", value: "male" },
				{ name: "Female", value: "female" },
				{ name: "Prefer not to Say", value: "others" },
			],
			oldState: {
				name: null,
				age: null,
				gender: null,
			},
			saveBtn: false,
			deleteBtn: false,
		}),
		async mounted() {
			// const { name, age, email, gender } = this.$store.getters["auth/USER"];
			const { name, age, gender } = this.$store.getters["auth/USER"];
			this.user = {
				name,
				age,
				gender,
			};
		},
		methods: {
			edit() {
				this.toggleEdit = true;
				this.oldState = Object.assign({}, this.user);
			},
			async save() {
				this.saveBtn = true;
				try {
					const isFormValid = this.$refs.form.validate();
					if (!isFormValid) {
						return;
					}
					await this.$store.dispatch("auth/editDetails", this.user);
					this.saveBtn = false;
					this.$refs.notif.showSuccess("Details Updated!");
					this.toggleEdit = false;
					await Toast.show({
						text: "Your accounts details have been changed!",
						position: "top",
						duration: "long",
					});
				} catch (err) {
					this.saveBtn = false;
					this.$refs.notif.showError(err.message);
				}
			},
			cancel() {
				this.user = Object.assign({}, this.oldState);
				this.toggleEdit = false;
			},
			async deleteAccount() {
				const response = await Modals.confirm({
					title: "Confirm Account Deletion",
					message:
						"We're sad to see you go\nAre you sure you want to delete your account?",
					okButtonTitle: "Delete",
				});

				if (response.value) {
					this.deleteBtn = true;
					await this.$store.dispatch("auth/deleteAccount");
					this.deleteBtn = false;
					await Toast.show({
						text: "Your account has been deleted :(",
						position: "bottom",
						duration: "long",
					});
				}
			},
		},
	};
</script>

<style></style>
