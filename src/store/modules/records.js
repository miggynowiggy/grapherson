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

				let results = await axios({
					method: 'post',
					url: 'http://34.70.231.88/analyze',
					data: {
						downloadURL,
						filename: fileName
					},
					timeout: 60000 * 2
				});
				results = results.data;
				console.log('ML API RESULTS: ', results);

				const { emotional_stability, will_power, modesty,  harmony_flexibility, discipline, concentration, communicativeness, sociability } = results;

				let interpretation = "";

				if (emotional_stability) {
					interpretation += `<p>You are composed, ordered, dependable, and you persevere. You are normally sensitive and healthy emotionally. Judgement and logic rules but you have sympathy and compassion. However, the mind disciplines your emotions so the range of expression is seldom over demonstrative.</p>`
					interpretation += `<br />`;
				}

				if (will_power) {
					interpretation += `<p>You are expected to adaptably fit into conventional or prevailing circumstances with a balance of mind.You are practical, realistic and the norm between extremes therefore, are the indication of healthy vitality and will power.</p>`
					interpretation += `<br />`;
				}

				if (modesty) {
					interpretation += `<p>You are an introspective person, you do not seek the limelight. You are modest and formally respective but you have the talent in detail and organizing and this gives you good executive ability.</p>`
					interpretation += `<br />`;
				}

				if (harmony_flexibility) {
					interpretation += `<p>You have personal harmony, flexibility, social maturity, intelligence, and inner organization with an objective way of dealing with yourself and with other people.</p>`
					interpretation += `<br />`;
				}

				if (discipline) {
					interpretation += `<p>You have a direct approach to things but you leave things open so that you will be able to change your mind later on. You are unpredictable and excitable but you are also indifferent.</p>`
					interpretation += `<br />`;
				}

				if (concentration) {
					interpretation += `<p>You are bold, enthusiastic, optimistic, lively, and often creative. You need to win recognition and to be observed to make an impression so you constantly express yourself in words, actions, and projects.</p>`
					interpretation += `<br />`;
				}

				if (communicativeness) {
					interpretation += `<p>You are a very private person and usually communicate with your close friends only all the while maintaining your distance</p>`
					interpretation += `<br />`;
				}

				if (sociability) {
					interpretation += `<p>You value personal space and would like to spend most of the day in isolation for self discovery. It can also be interpreted that lately you have been spending much of your time in loneliness due to anxiety or boredom. But there are still great things ahead of your life. </p>`
					interpretation += `<br />`;
				}

				const newFindings = {
					title: days().format("MMM DD YYYY"),
					date: days().format("x"),
					userId: isUserLoggedIn
						? user.id
						: null,
					downloadURL,
					ratings: results,
					findings: `You're doing great!`,
					interpretation: interpretation,
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
