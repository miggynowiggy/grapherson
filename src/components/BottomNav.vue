<template>
	<span class="supermain">
		<div class="mainBox">
			<span class="records" @click="goToRecord" v-ripple>
				<v-icon large :color="recordsIconColor">receipt_long</v-icon>
			</span>
			<span class="settings" @click="goToSettings" v-ripple>
				<v-icon large :color="settingsIconColor">settings</v-icon>
			</span>
		</div>
		<span class="camera-container" @click="goToHome" v-ripple>
			<v-icon size="50" color="white">camera_alt</v-icon>
		</span>
	</span>
</template>

<script>
	import { Plugins } from "@capacitor/core";
	const { Toast } = Plugins;
	export default {
		name: "BottomNav",
		props: ["activeTab"],
		methods: {
			goToRecord() {
				if (this.activeTab.toLowerCase() !== "records")
					this.$router.push({ name: "Records" });
			},
			async goToHome() {
				const isCameraEnabled = this.$store.getters[
					"plugins/IS_CAMERA_ENABLED"
				];
				if (isCameraEnabled) {
					const records  = await this.$store.getters['records/ALL_RECORDS'];
					if(records.length < 3)
						this.$router.push({ name: "Analyze" });
					else
						await Toast.show({
							text: "Free users have a limit of 3 tests",
							position: "top",
							duration: "long"
						});
				} else {
					await Toast.show({
						text: "Guests have a limit of 1 test",
						position: "top",
						duration: "long",
					});
				}
			},
			goToSettings() {
				if (this.activeTab.toLowerCase() !== "settings")
					this.$router.push({ name: "Settings" });
			},
		},
		computed: {
			isUserLoggedIn() {
				return this.$store.getters["auth/IS_USER_SIGNED_IN"];
			},
			recordsIconColor() {
				return this.activeTab.toLowerCase() === "records"
					? "primary"
					: "grey darken-1";
			},
			settingsIconColor() {
				return this.activeTab.toLowerCase() === "settings"
					? "primary"
					: "grey darken-1";
			},
		},
	};
</script>

<style scoped>
	.supermain {
		display: flex;
		justify-content: space-around;
	}
	.mainBox {
		position: fixed;
		width: 102vw;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		height: 70px;
		border-top-left-radius: 45px;
		border-top-right-radius: 45px;
		overflow: hidden;
		background-color: white;
		box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
		-webkit-box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
	}
	.camera-container {
		position: fixed;
		bottom: 2vh;
		left: 39vw;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 90px;
		width: 90px;
		align-self: center;
		background-color: #00b882;
		border-radius: 50%;
		box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
		-webkit-box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.2);
	}
	.records {
		order: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 40%;
		align-self: center;
		background-color: white;
	}
	.settings {
		order: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 40%;
		align-self: center;
		background-color: white;
	}

	@media screen and (min-width: 500px) {
		.camera-container {
			bottom: 2vh;
			left: 42vw;
		}
	}

	@media screen and (min-width: 800px) {
		.camera-container {
			bottom: 2vh;
			left: 44vw;
		}
	}

	@media screen and (min-width: 900px) {
		.camera-container {
			bottom: 2vh;
			left: 46vw;
		}
	}

	@media screen and (min-width: 1200px) {
		.camera-container {
			bottom: 2vh;
			left: 48vw;
		}
	}

	@media screen and (min-width: 1400px) {
		.camera-container {
			bottom: 3vh;
			left: 48vw;
		}
	}
</style>
