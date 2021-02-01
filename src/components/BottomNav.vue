<template>
	<span class="supermain">
		<div class="mainBox">
			<span class="records" @click="goToRecord" :v-ripple="isUserLoggedIn">
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
	export default {
		name: "BottomNav",
		props: ["activeTab"],
		methods: {
			goToRecord() {
				if (this.isUserLoggedIn) {
					this.$router.push({ name: "Records" });
				}
			},
			goToHome() {
				this.$router.push({ name: "Analyze" });
			},
			goToSettings() {
				this.$router.push({ name: "Settings" });
			},
		},
		computed: {
			isUserLoggedIn() {
				return this.$store.getters["auth/IS_USER_SIGNED_IN"];
			},
			recordsIconColor() {
				if (this.activeTab.toLowerCase() === "records" && this.isUserLoggedIn) {
					return "primary";
				} else if (
					this.activeTab.toLowerCase() !== "records" &&
					this.isUserLoggedIn
				) {
					return "grey darken-1";
				} else {
					return "grey lighten-3";
				}
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
		width: 98vw;
		bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: stretch;
		justify-content: space-between;
		height: 70px;
		border-top-left-radius: 40px;
		border-top-right-radius: 40px;
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
</style>
