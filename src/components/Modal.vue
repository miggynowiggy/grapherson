<template>
	<v-dialog v-model="dialogState">
		<v-card flat rounded outlined>
			<v-card-title
				:class="[
					type === 'warning' ? 'warning white--text font-weight-bold' : '',
					type === 'error' ? 'error white--text font-weight-bold' : '',
				]"
				>{{ title }}</v-card-title
			>
			<v-card-text class="mt-3">
				<v-row align="center" justify="center">
					<v-col cols="12" align="center" class="body-2">
						{{ message }}
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-row align="center" justify="center">
					<v-col cols="5" v-if="showCancel">
						<v-btn outlined block color="grey darken-2" @click="cancel">
							Cancel
						</v-btn>
					</v-col>
					<v-col :cols="showCancel ? 5 : 12">
						<v-btn depressed dark block color="primary" @click="ok">{{
							okBtn
						}}</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "Modal",
		data: () => ({
			dialogState: false,
			title: null,
			message: null,
			showCancel: false,
			okBtn: null,
			type: "warning",
		}),
		methods: {
			showWarning(title, message, showCancel, okBtn) {
				this.title = title;
				this.message = message;
				this.showCancel = showCancel;
				this.okBtn = okBtn;
				this.type = "warning";
				this.dialogState = true;
			},
			showError(title, message, showCancel, okBtn) {
				this.title = title;
				this.message = message;
				this.showCancel = showCancel;
				this.okBtn = okBtn;
				this.type = "error";
				this.dialogState = true;
			},
			cancel() {
				this.dialogState = false;
				this.$emit("cancel");
			},
			ok() {
				this.dialogState = false;
				this.$emit("confirm");
			},
		},
	};
</script>

<style></style>
