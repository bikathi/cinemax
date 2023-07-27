export default defineEventHandler(async (event) => {
	console.log('Callback url fired...');
	const transactionResponse = await readBody(event);
	console.log('Transaction response: ' + JSON.stringify(transactionResponse));

	// stkpush store
	const stkPushStore = useStkPush();
	const { setRequestCancelledByUser, setCheckoutRequestIdDarajaCallback } =
		stkPushStore;

	if (transactionResponse.Body.stkCallback.ResultCode === 1032) {
		// if result code is 1032, then the request was cancelled by the user
		// so we update the store accordingly
		console.log('oops. request cancelled by the user...');
		setRequestCancelledByUser();
	}

	// if it's not 1032, then we update the store with the CheckoutRequestId provided in this callback
	// this signals the UI to update and start validating the transaction
	console.log("client paid....");
});
