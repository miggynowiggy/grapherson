<template>
	<v-container>
		<v-row justify="center">
			<v-avatar tile size="300px">
				<img src="../assets/avatars/moustache.png" alt="avatar" />
			</v-avatar>
		</v-row>
		<v-row justify="center">
			<h1 class="secondary--text">Ben</h1>
		</v-row>
		<bottom-nav />
	</v-container>
</template>

<script>
	import BottomNav from "../components/BottomNav.vue";
	export default {
		name: "Home",
		components: { BottomNav },
		data: () => ({}),
	};
</script>
