/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-catch */
import { AUTH, DB, FB } from "@/config/firebase";

export default {
	namespaced: true,
	state: {
		user: {
			name: null,
			age: null,
			id: null,
			gender: null,
			email: null,
			avatar: null,
		},
		googleProvider: null,
	},
	getters: {
		USER: (state) => state.user,
		IS_USER_SIGNED_IN: () => Boolean(AUTH.currentUser.uid),
	},
	mutations: {
		SET_USER_ID(state, payload) {
			state.user.id = payload;
		},
		SET_USER(state, payload) {
			Object.keys(payload).forEach((key) => {
				state.user[key] = payload[key];
			});
		},
		CLEAR_USER(state) {
			state.user = {
				id: null,
				name: null,
				age: null,
				gender: null,
				email: null,
				avatar: null,
			};
		},
		SET_GOOGLE_PROVIDER(state, payload) {
			state.googleProvider = payload;
		},
	},
	actions: {
		async set_google_provier({ commit }) {
			const provider = await new FB.auth.GoogleAuthProvider();
			commit("SET_GOOGLE_PROVIDER", provider);
		},
		async getUserDetails({ commit }) {
			const id = AUTH.currentUser.uid;
			const userDoc = await DB.collection("users")
				.doc(id)
				.get();
			commit("SET_USER", { ...userDoc.data(), id });
		},
		async login({ commit }, authCredentials) {
			const { email, password } = authCredentials;
			const { user } = await AUTH.signInWithEmailAndPassword(email, password);
			const id = user.uid;
			const userDoc = await DB.collection("users")
				.doc(id)
				.get();
			const { name, age, gender, avatar } = userDoc.data();
			commit("SET_USER", { name, age, gender, avatar, email, id });
		},
		async registerManually({ commit }, userDetails) {
			try {
				const { name, age, gender, avatar, email, password } = userDetails;
				const { user } = await AUTH.createUserWithEmailAndPassword(
					email,
					password
				);
				const id = user.uid;
				await DB.collection("users")
					.doc(id)
					.set({ name, email, age, gender, avatar });
				commit("SET_USER", { name, email, age, gender, avatar, id });
			} catch (err) {
				throw err;
			}
		},
		async registerThroughGoogle({ state, commit }) {
			try {
				await AUTH.signInWithRedirect(state.googleProvider);
				const result = await AUTH.getRedirectResult();
				const { user } = result;
				const newUser = {
					name: user.displayName,
					email: user.email,
					age: 0,
					gender: null,
					avatar: "plain.png",
					id: user.uid,
				};
				await DB.collection("users")
					.doc(user.uid)
					.set(newUser);
				commit("SET_USER", newUser);
			} catch (err) {
				throw err;
			}
		},
		async logout({ commit }) {
			await AUTH.signOut();
			commit("CLEAR_USER");
		},
		async editDetails({ state, commit }, newDetails) {
			if (newDetails?.email && state.user.email !== newDetails.email) {
				await AUTH.currentUser.updateEmail(newDetails.email);
			}
			await DB.collection("users")
				.doc(state.user.id)
				.update(newDetails);
			commit("SET_USER", newDetails);
		},
		async deleteAccount() {
			console.log("waw delete");
		},
		async store_guest({ state, dispatch }) {
			await dispatch(
				"plugins/set_to_storage",
				{ key: "guestDetails", value: state.user },
				{ root: true }
			);
			return true;
		},
		async get_guest({ dispatch, commit }) {
			const guest = await dispatch("plugins/get_in_storage", "guestDetails", {
				root: true,
			});
			commit("SET_USER", guest);
			return guest?.name ? true : false;
		},
	},
};
