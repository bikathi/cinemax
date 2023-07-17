import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStkPush = defineStore('StkpushStore', () => {
	const clientMpesaNumber = ref(null);
	const checkoutRequestIdInitiateSTKPush = ref(null);
	const checkoutRequestIdDarajaCallback = ref(null);
	const requestCancelledByUser = ref(false);

	async function setClientMpesaNumber(clientNumber) {
		clientMpesaNumber.value = clientNumber;
	}

	async function setCheckoutRequestIdInitiateSTKPush(requestId) {
		checkoutRequestIdInitiateSTKPush.value = requestId;
	}

	async function setCheckoutRequestIdDarajaCallback(requestId) {
		checkoutRequestIdDarajaCallback.value = requestId;
	}

	async function setRequestCancelledByUser() {
		console.log('In store... setting request cancelled by user....');
		requestCancelledByUser.value = true;
		console.log(
			'request canceled by user: ' + requestCancelledByUser.value,
		);
	}

	return {
		setClientMpesaNumber,
		setCheckoutRequestIdInitiateSTKPush,
		setCheckoutRequestIdDarajaCallback,
		setRequestCancelledByUser,
		clientMpesaNumber,
		checkoutRequestIdDarajaCallback,
		checkoutRequestIdInitiateSTKPush,
		requestCancelledByUser,
	};
});
