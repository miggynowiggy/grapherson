import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: () => import("@/views/Login.vue"),
	},
	{
		path: "/signup",
		name: "Signup",
		component: () => import("@/views/Signup.vue"),
	},
	{
		path: "/signup/guest",
		name: "GuestSignIn",
		component: () => import("@/views/GuestSignIn.vue"),
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/records",
		name: "Records",
		component: () => import("@/views/Records.vue"),
	},
	{
		path: "/view-records",
		name: "ViewRecord",
		component: () => import("@/views/ViewRecord.vue"),
	},
	{
		path: "/settings",
		name: "Settings",
		component: () => import("@/views/Settings.vue"),
	},
	{
		path: "/analyze",
		name: "Analyze",
		component: () => import("@/views/Analyze.vue"),
	},
	{
		path: "/process",
		name: "Process",
		component: () => import("@/views/Process.vue"),
	},
	{
		path: "/edit-details",
		name: "EditDetails",
		component: () => import("@/views/EditDetails.vue"),
	},
	{
		path: "/change-pass",
		name: "ChangePassword",
		component: () => import("@/views/ChangePassword.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
