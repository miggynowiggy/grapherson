/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-catch */
import { cloneDeep } from "lodash";
import { AUTH, DB, STORAGE } from "@/config/firebase";
import days from "dayjs";
import axios from 'axios';
import advancedFormat from "dayjs/plugin/advancedFormat";
days.extend(advancedFormat);

function generateNumber(min, max) {
	const num = Math.random() * (max - min) + min;
	return num.toFixed(2);
}

function generateInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export default {
	namespaced: true,
	state: {
		records: [],
		dummies: [],
		currentRecord: {
			date: null,
			title: null,
			findings: null,
			interpretation: null,
			ratings: {},
		},
	},
	getters: {
		ALL_RECORDS: (state) => state.records,
		CURRENT_RECORD: (state) => state.currentRecord,
		DUMMIES: (state) => state.dummies,
	},
	mutations: {
		SET_RECORDS(state, payload) {
			state.records = [...payload];
		},
		ADD_RECORD(state, payload) {
			state.records.unshift(payload);
		},
		UPDATE_RECORD(state, payload) {
			const { id } = payload;
			const index = state.records.findIndex((record) => record.id === id);

			if (index !== -1) {
				for (const [key, value] of Object.entries(payload)) {
					state.records[index][key] = value;
				}
			}

			if (payload.id === state.currentRecord.id) {
				for (const [key, value] of Object.entries(payload)) {
					state.currentRecord[key] = value;
				}
			}
		},
		DELETE_RECORD(state, payload) {
			const { id } = payload;
			if (!id) return;

			const index = state.records.findIndex((record) => record.id === id);
			if (index !== -1) state.records.splice(index, 1);
		},
		SET_CURRENT_RECORD(state, payload) {
			state.currentRecord = cloneDeep(payload);
		},
		CLEAR_CURRENT_RECORD(state) {
			state.currentRecord = null;
		},
		SET_DUMMIES(state, payload) {
			state.dummies = payload;
		},
	},
	actions: {
		async getAllDummies({ commit }) {
			const dummiesRef = await DB.collection("dummy").get();
			const dummies = dummiesRef.docs.map((dummy) => {
				const data = dummy.data();
				data.id = dummy.id;
				return data;
			});
			commit("SET_DUMMIES", dummies);
		},
		async getAllFindings({ commit }) {
			const userId = AUTH.currentUser.uid;
			const findingsRef = await DB.collection("findings")
				.where("userId", "==", userId)
				.orderBy("date", "desc")
				.get();
			const findings = findingsRef.docs.map((finding) => {
				const data = finding.data();
				data.id = finding.id;
				return data;
			});
			commit("SET_RECORDS", findings);
		},
		async getAllGuestTrial({ commit, rootGetters, dispatch }) {
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			const trialRef = await DB.collection("tempFindings")
				.doc(deviceId)
				.get();

			if (trialRef.exists) {
				console.log(trialRef.data(), trialRef.id);
				commit("ADD_RECORD", { ...trialRef.data(), id: trialRef.id });
				dispatch("plugins/DISABLE_CAMERA", null, { root: true });
			} else {
				dispatch("plugins/ENABLE_CAMERA", null, { root: true });
			}
		},
		//The following actions below are created for findings generateion
		async generateRecord({ rootGetters, state, commit, dispatch }) {
			try {
				const user = rootGetters["auth/USER"];
				const isUserLoggedIn = rootGetters["auth/IS_USER_SIGNED_IN"];
				const { downloadURL, fileName } = await dispatch("plugins/upload_image", null, {
					root: true,
				});

				const results = await axios({
					method: 'post',
					url: process.env.VUE_APP_ML_API + '/analyze',
					data: {
						downloadURL,
						filename: fileName
					}
				});

				console.log(results);

				const newFindings = {
					title: days().format("MMM DD YYYY"),
					date: days().format("x"),
					userId: isUserLoggedIn
						? user.id
						: null,
					downloadURL,
					ratings: results.data,
					findings: '',
					interpretation: '',
					fileName
				};

				let id;
				if (isUserLoggedIn) {
					const newDoc = await DB.collection("findings").add(newFindings);
					id = newDoc.id;
				} else {
					const deviceId = rootGetters["plugins/DEVICE_ID"];
					await DB.collection("tempFindings")
						.doc(deviceId)
						.set(newFindings);
					id = deviceId;
					dispatch("plugins/DISABLE_CAMERA", null, { root: true });
				}

				newFindings.id = id;
				commit("ADD_RECORD", newFindings);
				commit("SET_CURRENT_RECORD", newFindings);
			} catch (err) {
				throw err;
			}
		},
		async move_to_findings({ rootGetters }) {
			const userId = AUTH.currentUser.uid;
			const deviceId = rootGetters["plugins/DEVICE_ID"];
			const recordToMoveRef = await DB.collection("tempFindings")
				.doc(deviceId)
				.get();
			const recordToMove = recordToMoveRef.data();
			recordToMove.userId = userId;

			await DB.collection("tempFindings")
				.doc(deviceId)
				.delete();

			await DB.collection("findings").add(recordToMove);
			return true;
		},
		async saveName({ commit }, record) {
			const { title, id } = record;
			try {
				await DB.collection("findings")
					.doc(id)
					.update({ title });
				commit("UPDATE_RECORD", record);
			} catch (err) {
				throw err;
			}
		},
		async delete({ commit, state }, DeleteRecord) {
			const { id } = DeleteRecord;
			try {
				const record = state.records.find(r => r.id === id);
				await STORAGE.ref("handwritings").child(record.fileName).delete();
				await DB.collection("findings").doc(id).delete();
				commit("DELETE_RECORD", record);
			} catch(err) {
				throw err;
			}
		}
	},
};
