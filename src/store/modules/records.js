/* eslint-disable no-prototype-builtins */
/* eslint-disable no-useless-catch */
import { cloneDeep } from "lodash";
import { AUTH, DB } from "@/config/firebase";
import days from "dayjs";
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
		async generateRandomData() {
			const findings = [
				"Introvert",
				"Extrovert",
				"Depression tendencies",
				"Anxiety tendencies",
			];
			const interpretation = [
				{
					text: `You tend to be more focused on your internal feelings.\nYou are usually quiet, reserved, and reflective.\nYou are not necessarily shy, unfriendly, or socially awkward.\nYou simply drawing your energy in a different way than others.`,
				},
				{
					text: `You tend to be outgoing and naturally drawn towards other people, you love engaging in a multitude of social activities.\nYou are positive and cheerful in your outlook in life, taking risk is your thing since it rewards you with a feeling of fulfillment.`,
				},
				{
					text: `You are having depression tendencies, it seems that you don't find things you enjoy the most as enjoyable habits. You spend most of your time alone and limits your interaction with other people.\nYou are prescribed to at least visit a psychologist to talk and verify this findings.`,
				},
				{
					text: `You are having anxiety tendencies, it seems that you get easily overwhelmed by the things around you.\nYour productivity is sacrificed since you are afraid to perform the task at hand.\nThis could be due to your fear of not doing the task perfectly.\nYou are prescribed to at least visit a psychologist to talk and verify this findings.`,
				},
			];
			const ratings = [
				{
					emotional_stability: generateNumber(80, 100),
					will_power: generateNumber(60, 100),
					modesty: generateNumber(80, 90),
					harmony_flexibility: generateNumber(10, 40),
					discipline: generateNumber(60, 100),
					concentration: generateNumber(20, 40),
					communicativeness: generateNumber(10, 30),
					sociability: generateNumber(10, 20),
				},
				{
					emotional_stability: generateNumber(80, 100),
					will_power: generateNumber(90, 100),
					modesty: generateNumber(90, 100),
					harmony_flexibility: generateNumber(80, 100),
					discipline: generateNumber(60, 100),
					concentration: generateNumber(50, 100),
					communicativeness: generateNumber(80, 100),
					sociability: generateNumber(90, 100),
				},
				{
					emotional_stability: generateNumber(0, 10),
					will_power: generateNumber(0, 10),
					modesty: generateNumber(90, 100),
					harmony_flexibility: generateNumber(0, 10),
					discipline: generateNumber(20, 30),
					concentration: generateNumber(0, 10),
					communicativeness: generateNumber(0, 20),
					sociability: generateNumber(0, 10),
				},
				{
					emotional_stability: generateNumber(10, 20),
					will_power: generateNumber(10, 20),
					modesty: generateNumber(90, 100),
					harmony_flexibility: generateNumber(20, 40),
					discipline: generateNumber(10, 30),
					concentration: generateNumber(0, 10),
					communicativeness: generateNumber(0, 20),
					sociability: generateNumber(0, 10),
				},
			];
			for (let count = 0; count < findings.length; count++) {
				const dummy = {
					ratings: ratings[count],
					findings: findings[count],
					interpretation: interpretation[count].text,
				};
				await DB.collection("dummy").add(dummy);
			}
		},
		//The following actions below are created for findings generateion
		async generateRecord({ rootGetters, state, commit, dispatch }) {
			try {
				const user = rootGetters["auth/USER"];
				const isUserLoggedIn = rootGetters["auth/IS_USER_SIGNED_IN"];
				const downloadURL = await dispatch("plugins/upload_image", null, {
					root: true,
				});

				const randomIndex = generateInt(0, 3);
				const { ratings, findings, interpretation } = state.dummies[
					randomIndex
				];

				const newFindings = {
					title: days().format("MMM DD YYYY"),
					date: days().format("x"),
					userId: isUserLoggedIn 
						? user.id 
						: null,
					downloadURL,
					ratings,
					findings,
					interpretation,
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
	},
};
