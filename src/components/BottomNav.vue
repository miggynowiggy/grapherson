<template>
	<div>
		<v-bottom-navigation app fixed grow height="60">
			<v-row align="center" justify="center">
				<v-col cols="6">
					<v-btn class="secondary--text" width="10" height="58" plain block @click="$router.push({ name: 'Records' })">
						<v-icon large>receipt_long</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="6">
					<v-btn class="secondary--text" width="10" height="58" plain block>
						<v-icon large>settings</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-bottom-navigation>
		<v-btn class="big-btn" x-large fab elevation="6" color="secondary">
			<v-icon large>camera_alt</v-icon>
		</v-btn>
	</div>
</template>

<script>
	export default {
		name: "BottomNav",
	};
</script>

<style>
	.big-btn {
		position: fixed;
		top: 87vh;
		left: 41vw;
		z-index: 1000;
	}
</style>
