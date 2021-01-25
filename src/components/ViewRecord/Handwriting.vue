<template>
	<v-container fluid>
		<v-row wrap align="center" justify="center">
			<v-col cols="10" align="center">
				<h1 class="headline font-weight-bold secondary--text">
					YOUR HANDWRITING
				</h1>
			</v-col>
			<v-col cols="12" align="center" class="mt-2">
				<v-avatar tile width="300" height="420" class="elevation-6">
					<v-btn color="primary" dark rounded overlap class="enlarge" large
						>ENLARGE</v-btn
					>
					<img
						src="@/assets/sampleWriting.png"
						alt="sample writing"
						size="20"
					/>
				</v-avatar>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		name: "HandwritingPic",
	};
</script>

<style>
	.enlarge {
		position: absolute;
		top: 50%;
	}
</style>
