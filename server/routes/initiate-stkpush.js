import { useDarajaUtils } from '../../utils/darajapi-utils';
import AfricasTalking from 'africastalking';
// this endpoint will initiate the STK push to client's phone
export default defineEventHandler(async (event) => {
	console.log('initiate stk push called...');
	let accessToken = null;

	// daraja utils store
	const darajaUtilsStore = useDarajaUtils();
	const { generateTimeStamp, generateBase64Password } = darajaUtilsStore;

	// take details from event body
	const mpesaDetails = await readBody(event);

	// take other details from ENV file
	const runtimeConfig = useRuntimeConfig();
	const MPESA_BUSINESS_SHORTCODE =
		runtimeConfig.public.MPESA_BUSINESS_SHORTCODE;
	const MPESA_CALLBACK_URL_BASE =
		runtimeConfig.public.MPESA_CALLBACK_URL_BASE;
	const MPESA_PUBLIC_PASSKEY = runtimeConfig.public.MPESA_PUBLIC_PASSKEY;

	console.log('callback url: ' + MPESA_CALLBACK_URL_BASE);

	const timestamp = await generateTimeStamp();
	const passwordB64 = await generateBase64Password(
		MPESA_BUSINESS_SHORTCODE,
		MPESA_PUBLIC_PASSKEY,
		timestamp,
	);

	//get a token first
	const authTokenResponse = await $fetch('/daraja-auth');
	console.log('auth token response: ' + JSON.stringify(authTokenResponse));
	if (!authTokenResponse.successfull) {
		return {
			status: 'FAILED',
			successfull: false,
			data: null,
			message: 'failed to get auth token',
		};
	}
	accessToken = authTokenResponse.data.access_token;

	const requestBody = {
		BusinessShortCode: Number(MPESA_BUSINESS_SHORTCODE),
		Password: passwordB64,
		Timestamp: timestamp,
		TransactionType: 'CustomerPayBillOnline',
		Amount: 1,
		PartyA: mpesaDetails.clientNumber,
		PartyB: Number(MPESA_BUSINESS_SHORTCODE),
		PhoneNumber: mpesaDetails.clientNumber,
		CallBackURL: `${MPESA_CALLBACK_URL_BASE}/daraja-callback/mpesa-callback`,
		AccountReference: 'CinemaxLTD',
		TransactionDesc: 'Cinema Ticket',
	};

	console.log('initiatig stk push....');
	const response = await $fetch(
		'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(requestBody),
		},
	);
	console.log('Intiate STK push response: ' + JSON.stringify(response));
	if (response.ResponseCode !== '0') {
		console.log('request for STK push failed... will exit now');
	}

	// otherwise our STK push response was successfull now we validate the payment status
	const interval = 6000; //ms
	const maxAttempts = 6;

	let paymentResponse = null;
	let attempts = 0;

	const checkPaymentStatus = async () => {
		paymentResponse = await $fetch('/validate-payment', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				checkoutRequestId: response.CheckoutRequestID,
				accessToken: accessToken,
			}),
		});

		if (
			paymentResponse.ResponseCode ||
			!paymentResponse ||
			attempts >= maxAttempts
		) {
			clearInterval(intervalId);
		}
	};

	const intervalId = setInterval(checkPaymentStatus, interval);

	// start the interval to check the status
	await new Promise((resolve) => {
		setTimeout(resolve, interval * 6);
	});

	if (paymentResponse.ResponseCode !== '0') {
		console.log('still processing payment...');
	} else {
		if (paymentResponse.ResultCode === '1032') {
			console.log('payment was not successfull, thank you...');
			return {
				status: 'FAILED',
				successfull: false,
				data: null,
				message: 'transaction failed',
			};
		} else if(paymentResponse.ResultCode === '0') {
			console.log('payment was successfull, thank you...');
			// const atApiKey = runtimeConfig.public.AT_API_KEY;

			// console.log('AT API Key: ' + atApiKey);

			// // initialize AT auth
			// const africasTalking = AfricasTalking({
			// 	apiKey: atApiKey,
			// 	username: 'cinemaxsms',
			// });

			// console.log('Starting to send message...');

			// // send refferal message
			// const result = await africasTalking.SMS.send({
			// 	to: `+${phoneNumber}`,
			// 	message: `Refferal link:  http://localhost:3001/ref/${refferalUUID}/`,
			// });

			// console.log('Send sms result: ' + JSON.stringify(result, null, 2));
			return {
				status: 'SUCCESS',
				successfull: true,
				data: null,
				message: 'transaction success',
			};
		}
	}

		
});
