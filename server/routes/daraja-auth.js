export default defineEventHandler(async () => {
	const runtimeConfig = useRuntimeConfig();
	const MPESA_CONSUMER_KEY = runtimeConfig.public.MPESA_CONSUMER_KEY;
	const MPESA_CONSUMER_SECRET = runtimeConfig.public.MPESA_CONSUMER_SECRET;
	const mpesaCredentials = btoa(
		`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`,
	);
	console.log('b64 consumer key: ' + mpesaCredentials);

	const response = await $fetch(
		'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
		{
			method: 'GET',
			headers: {
				Authorization: `Basic ${mpesaCredentials}`,
			},
		},
	);

	if (!response.access_token) {
		return {
			status: 'FAILED',
			successfull: false,
			data: null,
		};
	}

	return {
		status: 'SUCCESSFULL',
		successfull: true,
		data: response,
	};
});
