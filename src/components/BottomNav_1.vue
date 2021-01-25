<template>
	<div>
		<v-bottom-navigation app fixed grow height="60" v-model="currentTab">
			<v-row align="center" justify="center">
				<v-col cols="6">
					<v-btn
						class="primary--text"
						width="10"
						height="58"
						plain
						block
						value="Records"
						@click="$router.push({ name: 'Records' })"
					>
						<v-icon large>receipt_long</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="6">
					<v-btn
						class="primary--text"
						width="10"
						height="58"
						plain
						block
						value="Settings"
					>
						<v-icon large>settings</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-bottom-navigation>
		<v-btn
			class="big-btn"
			x-large
			fab
			depressed
			elevation="6"
			color="primary"
			@click="currentTab = 'Home'"
		>
			<v-icon large>camera_alt</v-icon>
		</v-btn>
	</div>
</template>

<script>
	export default {
		name: "BottomNav",
		data: () => ({
			currentTab: "Records",
		}),
		watch: {
			currentTab(val) {
				this.$router.push({ name: val });
			},
		},
	};
</script>

<style>
	.big-btn {
		position: fixed;
		bottom: 0;
		left: 41vw;
		z-index: 999;
	}
</style>
