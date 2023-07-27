export default defineEventHandler(async (event) => {
	console.log('Callback url fired...');
	const transactionResponse = await readBody(event);
	console.log('Transaction response: ' + JSON.stringify(transactionResponse));
});
