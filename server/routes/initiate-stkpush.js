import { useDarajaUtils } from '../../utils/darajapi-utils';

// this endpoint will initiate the STK push to client's phone
export default defineEventHandler(async (event) => {
	const darajaUtilsStore = useDarajaUtils();
	const { generateTimeStamp, generateBase64Password } = darajaUtilsStore;
	// take details from event body
	const mpesaDetails = await readBody(event);
	console.log('mpesa details: ' + mpesaDetails);

	// take other details from ENV file
	const runtimeConfig = useRuntimeConfig();
	const MPESA_BUSINESS_SHORTCODE =
		runtimeConfig.public.MPESA_BUSINESS_SHORTCODE;
	const MPESA_CALLBACK_URL_BASE =
		runtimeConfig.public.MPESA_CALLBACK_URL_BASE;
	const MPESA_PUBLIC_PASSKEY = runtimeConfig.public.MPESA_PUBLIC_PASSKEY;

	const timestamp = await generateTimeStamp();
	const passwordB64 = await generateBase64Password(
		MPESA_BUSINESS_SHORTCODE,
		MPESA_PUBLIC_PASSKEY,
		timestamp,
	);
	console.log(`Current timestamp: ${timestamp}`);
	console.log(`password base64: ${passwordB64}`);

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

	const response = await $fetch(
		'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${mpesaDetails.accessToken}`,
			},
			body: JSON.stringify(requestBody),
		},
	);
	console.log(response);
});
