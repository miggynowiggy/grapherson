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
		},
		googleProvider: null,
	},
	getters: {
		USER: (state) => state.user,
		IS_USER_SIGNED_IN: (state) => !!state.user.id,
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
		async getGuestDetails({ rootGetters, commit }) {
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			if (!deviceId) {
				return false;
			}
			const guestDoc = await DB.collection("guests")
				.doc(deviceId)
				.get();

			if (guestDoc.exists) {
				commit("SET_USER", { ...guestDoc.data(), id: null });
				return true;
			}

			return false;
		},
		async login({ commit }, authCredentials) {
			const { email, password } = authCredentials;
			const { user } = await AUTH.signInWithEmailAndPassword(email, password);
			const id = user.uid;
			const userDoc = await DB.collection("users")
				.doc(id)
				.get();
			const { name, age, gender } = userDoc.data();
			commit("SET_USER", { name, age, gender, email, id });
		},
		async registerGuest({ commit, rootGetters }, details) {
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			await DB.collection("guests")
				.doc(deviceId)
				.set(details);
			commit("SET_USER", details);
		},
		async checkIfGuestExists({ rootGetters }) {
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			const guestDoc = await DB.collection("guests")
				.doc(deviceId)
				.get();
			return guestDoc.exists;
		},
		async registerManually({ commit, dispatch }, userDetails) {
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
				const isGuestExisting = await dispatch("checkIfGuestExists");
				if (isGuestExisting) {
					await dispatch("deleteGuestDetails");
					const res = await dispatch("records/move_to_findings", null, {
						root: true,
					});
					console.log(res);
				}

				dispatch("plugins/ENABLE_CAMERA", null, { root: true });
				commit("SET_USER", { name, email, age, gender, id });
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
		async editDetails({ state, commit }, newDetails, password) {
			if (newDetails?.email && state.user.email !== newDetails.email) {
				await AUTH.signInWithEmailAndPassword(state.user.email, password);
				await AUTH.currentUser.updateEmail(newDetails.email);
			}
			await DB.collection("users")
				.doc(state.user.id)
				.update(newDetails);
			commit("SET_USER", newDetails);
		},
		async updateGuestDetails({ rootGetters }, detail) {
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			await DB.collection("guests")
				.doc(deviceId)
				.update(detail);
		},
		async deleteGuestDetails({ rootGetters }) {
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			await DB.collection("guests")
				.doc(deviceId)
				.delete();
		},
		async deleteAccount({ state, commit }, password) {
			await AUTH.signInWithEmailAndPassword(state.user.email, password);
			await DB.collection("users")
				.doc(state.user.id)
				.delete();
			await AUTH.currentUser.delete();
			commit("CLEAR_USER");
			await AUTH.signOut();
			console.log("waw deleted na");
		},
	},
};
