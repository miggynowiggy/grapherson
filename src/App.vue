<template>
	<router-view></router-view>
</template>

<script>
	export default {
		name: "App",

		components: {},
		data: () => ({
			transitionMode: "scroll-right",
		}),
		watch: {
			$route(to, from) {
				if (from.name === "Analyze" && to.name === "Process") {
					this.transitionMode = "scroll-left";
				}
			},
		},
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
	.body {
		padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
	}
</style>
