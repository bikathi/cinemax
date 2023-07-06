import { defineStore } from 'pinia';

export const useDarajaUtils = defineStore('DarajaUtils', () => {
	async function generateTimeStamp() {
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		var hours = today.getHours();
		var minutes = today.getMinutes();
		var seconds = today.getSeconds();

		if (month < 10) {
			month = '0' + month;
		}

		if (day < 10) {
			day = '0' + day;
		}

		if (hours < 10) {
			hours = '0' + hours;
		}

		if (minutes < 10) {
			minutes = '0' + minutes;
		}

		if (seconds < 10) {
			seconds = '0' + seconds;
		}

		var timestamp = year + month + day + hours + minutes + seconds;
		console.log(timestamp);
		return timestamp;
	}

	async function generateBase64Password(shortCode, passkey, timeStamp) {
		const base64Password = btoa(shortCode + passkey + timeStamp);
		return base64Password.toString();
	}

	return {
		generateTimeStamp,
		generateBase64Password,
	};
});
