<template>
	<v-app>
		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "App",

		components: {},

		data: () => ({
			//
		}),
	};
</script>
<style>
	.login-bg {
		/* background-image: linear-gradient(to top, #c1dfc4 0%, #deecdd 100%); */
		background-image: linear-gradient(
			to top,
			#d5d4d0 0%,
			#d5d4d0 1%,
			#eeeeec 31%,
			#efeeec 75%,
			#e9e9e7 100%
		);
	}
</style>
