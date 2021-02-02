<template>
	<v-app>
		<app-bar :pageName="'Edit Details'" />
		<v-main>
			<v-form ref="form" lazy-validation>
				<v-container fluid class="px-8">
					<v-row justify="center">
						<v-avatar tile size="100">
							<v-img
								:src="user.avatar.includes('https') ? user.avatar : require(`@/assets/avatars/${user.avatar}`)"
								contain
								alt="avatar"
							/>
						</v-avatar>
					</v-row>
					<v-row justify="center" class="mt-3" v-if="toggleEdit">
						<v-col cols="3" v-for="avatar in avatars" :key="avatar.name">
							<v-btn fab size="50" @click="changeAvatar(avatar.name)">
								<v-avatar>
									<v-img
										:src="require(`@/assets/avatars/${avatar.name}`)"
										contain
										alt="avatar"
										v-if="avatar.name !== 'add'"
									/>
									<v-icon v-else>add</v-icon>
								</v-avatar>
							</v-btn>
						</v-col>
					</v-row>
					<v-divider class="my-5" v-if="toggleEdit" />
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
					<v-row align="center" justify="start" wrap class="mt-n7">
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
					</v-row>
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
			<ImageSelector ref="imgSelector" @imageTaken="uploadAvatar" />
		</v-main>
	</v-app>
</template>

<script>
	import { Plugins } from "@capacitor/core";
	import AppBar from "@/components/AppBar.vue";
	import ImageSelector from "@/components/ImageSelector.vue";
	const { Toast, Modals } = Plugins;
	export default {
		name: "EditDetails",
		components: {
			AppBar,
			ImageSelector
		},
		data: () => ({
			isFormValid: false,
			toggleEdit: false,
			user: {
				name: null,
				age: null,
				gender: null,
				avatar: null,
				email: null,
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
				avatar: null,
			},
			saveBtn: false,
			deleteBtn: false,
			addNewAvatar: false,
			avatars:[
				{ name: "plain.png" },
				{ name: "female.png" },
				{ name: "male.png" },
				{ name: "glasses.png" },
				{ name: "moustache.png" },
				{ name: "halloween.png" },
				{ name: "santa.png" },
				{ name: "add" },
			],
		}),
		async mounted() {
			const { name, age, gender, email, avatar } = this.$store.getters["auth/USER"];
			this.user = {
				name,
				age,
				gender,
				avatar,
				email,
			};
		},
		methods: {
			edit() {
				this.toggleEdit = true;
				this.oldState = Object.assign({}, this.user);
			},
			changeAvatar(selectedAvatar){
				if(selectedAvatar !== 'add')
					this.user.avatar = selectedAvatar;
				else{
					this.$refs.imgSelector.show();
				}
			},
			async uploadAvatar() {
				this.user.avatar = await this.$store.dispatch("plugins/upload_avatar", null);
			},
			async save() {
				let password;
				this.saveBtn = true;
				try {
					const isFormValid = this.$refs.form.validate();
					if (!isFormValid) {
						return;
					}

					if (this.user.email !== this.oldState.email) {
						const response = await Modals.prompt({
							title: "Edit Account Details",
							message:
								"You're about to change your email, please enter your account password.",
							inputPlaceholder: "password",
							okButtonTitle: "Save Changes",
							cancelButtonTitle: "Cancel",
						});
						password = response.value;
						if (!password) {
							this.saveBtn = false;
							return;
						}
					}

					await this.$store.dispatch("auth/editDetails", this.user, password);
					this.saveBtn = false;
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
				const response = await Modals.prompt({
					title: "Confirm Account Deletion",
					message:
						"We're sad to see you go :(\nPlease re-enter you account password to proceed with the deletion.",
					okButtonTitle: "Delete",
					inputPlaceholder: "Account password",
				});

				if (response.value) {
					this.deleteBtn = true;
					await this.$store.dispatch("auth/deleteAccount", response.value);
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
