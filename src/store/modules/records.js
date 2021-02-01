import { cloneDeep } from "lodash";
import { DB } from "@/config/firebase";

function generateNumber(min, max) {
	const num = Math.random() * (max - min) + min;
	return num.toFixed(2);
}

export default {
	namespaced: true,
	state: {
		records: [
			{ title: "When I was sad", date: "01-20-2021" },
			{ title: "When I was your men", date: "12-23-2021" },
			{ title: "I talked to my crush", date: "11-10-2020" },
			{ title: "Burned Out", date: "10-12-2020" },
			{ title: "Ate a delicious dinner", date: "10-12-2020" },
			{ title: "Dinner date with Crush", date: "10-12-2020" },
			{ title: "Biked around the subdivision", date: "10-12-2020" },
			{ title: "Grab some Drink at SB", date: "10-12-2020" },
		],
		currentRecord: {
			date: null,
			title: null,
		},
		dummies: [],
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
		async getAllDummyData({ commit }) {
			const dummiesRef = await DB.collection("dummy").get();
			const dummies = dummiesRef.docs.map((dummy) => {
				const data = dummy.doc.data();
				data.id = dummy.doc.id;
				return data;
			});
			commit("SET_DUMMIES", dummies);
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
					emotional_stability: generateNumber(8, 10),
					will_power: generateNumber(6, 10),
					modesty: generateNumber(8, 9),
					harmony_flexibility: generateNumber(1, 4),
					discipline: generateNumber(6, 10),
					concentration: generateNumber(2, 4),
					communicativeness: generateNumber(1, 3),
					sociability: generateNumber(1, 2),
				},
				{
					emotional_stability: generateNumber(8, 10),
					will_power: generateNumber(9, 10),
					modesty: generateNumber(9, 10),
					harmony_flexibility: generateNumber(8, 10),
					discipline: generateNumber(6, 10),
					concentration: generateNumber(5, 10),
					communicativeness: generateNumber(8, 10),
					sociability: generateNumber(9, 10),
				},
				{
					emotional_stability: generateNumber(0, 1),
					will_power: generateNumber(0, 1),
					modesty: generateNumber(9, 10),
					harmony_flexibility: generateNumber(0, 1),
					discipline: generateNumber(2, 3),
					concentration: generateNumber(0, 1),
					communicativeness: generateNumber(0, 2),
					sociability: generateNumber(0, 1),
				},
				{
					emotional_stability: generateNumber(1, 2),
					will_power: generateNumber(1, 2),
					modesty: generateNumber(9, 10),
					harmony_flexibility: generateNumber(2, 4),
					discipline: generateNumber(1, 3),
					concentration: generateNumber(0, 1),
					communicativeness: generateNumber(0, 2),
					sociability: generateNumber(0, 1),
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
		async generate() {},
	},
};
