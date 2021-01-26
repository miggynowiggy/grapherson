import { cloneDeep } from "lodash";
import { DB } from "@/config/firebase";

function generateNumber(min, max) {
	return Math.random() * (max - min) + min;
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
	},
	getters: {
		ALL_RECORDS: (state) => state.records,
		CURRENT_RECORD: (state) => state.currentRecord,
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
	},
	actions: {
		async generateRandomData() {
			for (let count = 0; count < 10; count++) {
				const dummy = {
					stability: generateNumber(1, 10),
					willPower: generateNumber(1, 10),
					modesty: generateNumber(1, 10),
					flexibility: generateNumber(1, 10),
					lackDiscipline: generateNumber(1, 10),
					poorConcentration: generateNumber(1, 10),
					isolation: generateNumber(1, 10),
				};

				await DB.collection("dummy_data").add(dummy);
			}
		},
	},
};
