<template>
	<v-snackbar v-model="notifState" :timeout="3500" :color="type" left top>
		<span class="body-2">{{ message }}</span>
	</v-snackbar>
</template>

<script>
	export default {
		name: "AlertNotif",
		data: () => ({
			notifState: false,
			type: "info",
			message: "",
		}),
		methods: {
			showSuccess(message) {
				this.message = message;
				this.type = "success";
				this.notifState = true;
			},
			showWarning(message) {
				this.message = message;
				this.type = "warning";
				this.notifState = true;
			},
			showError(message) {
				this.message = message;
				this.type = "error";
				this.notifState = true;
			},
		},
	};
</script>

<style></style>
