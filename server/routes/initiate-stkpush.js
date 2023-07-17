import { useDarajaUtils } from '../../utils/darajapi-utils';
import { useStkPush } from '../../stores/stkpush';

// this endpoint will initiate the STK push to client's phone
export default defineEventHandler(async (event) => {
	console.log('initiate stk push called...');
	let accessToken = null;

	// daraja utils store
	const darajaUtilsStore = useDarajaUtils();
	const { generateTimeStamp, generateBase64Password } = darajaUtilsStore;

	// stkpush store
	const stkPushStore = useStkPush();
	const { setCheckoutRequestIdInitiateSTKPush } = stkPushStore;

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
		return {
			status: 'FAILED',
			successfull: false,
			data: null,
		};
	}

	// otherwise our STK push response was successfull
	await setCheckoutRequestIdInitiateSTKPush(response.CheckoutRequestID);
	return {
		status: 'SUCCESSFULL',
		successfull: true,
		data: null,
	};
});
