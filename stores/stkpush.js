import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStkPush = defineStore('StkpushStore', () => {
	const clientMpesaNumber = ref(null);
	const checkoutRequestIdInitiateSTKPush = ref(null);
	const checkoutRequestIdDarajaCallback = ref(null);

	async function setClientMpesaNumber(clientNumber) {
		clientMpesaNumber.value = clientNumber;
	}

	async function setCheckoutRequestIdInitiateSTKPush(requestId) {
		checkoutRequestIdInitiateSTKPush.value = requestId;
	}

	async function setCheckoutRequestIdDarajaCallback(requestId) {
		checkoutRequestIdDarajaCallback.value = requestId;
	}

	return {
		setClientMpesaNumber,
		setCheckoutRequestIdInitiateSTKPush,
		setCheckoutRequestIdDarajaCallback,
		clientMpesaNumber,
		checkoutRequestIdDarajaCallback,
		checkoutRequestIdInitiateSTKPush,
		requestCancelledByUser,
	};
});
