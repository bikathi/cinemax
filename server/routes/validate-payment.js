import { useDarajaUtils } from '../../utils/darajapi-utils';

// we will use this nedpoint to confirm if the payment went through
export default defineEventHandler(async (event) => {
	console.log('finally starting to validate payment...');
	const darajaUtilsStore = useDarajaUtils();
	const { generateTimeStamp, generateBase64Password } = darajaUtilsStore;

	// extract details required for validating payment from request body
	const validatePaymentRequirements = await readBody(event);
	console.log(
		'Validate payment requirements: ' +
			JSON.stringify(validatePaymentRequirements),
	);

	// extract some details from the runtimeConfig()
	const runtimeConfig = useRuntimeConfig();
	const MPESA_BUSINESS_SHORTCODE =
		runtimeConfig.public.MPESA_BUSINESS_SHORTCODE;
	const MPESA_PUBLIC_PASSKEY = runtimeConfig.public.MPESA_PUBLIC_PASSKEY;

	const timestamp = await generateTimeStamp();
	const passwordB64 = await generateBase64Password(
		MPESA_BUSINESS_SHORTCODE,
		MPESA_PUBLIC_PASSKEY,
		timestamp,
	);
	const requestBody = {
		BusinessShortCode: MPESA_BUSINESS_SHORTCODE,
		Password: passwordB64,
		Timestamp: timestamp,
		CheckoutRequestID: `${validatePaymentRequirements.checkoutRequestId}`,
	};

	const response = await $fetch(
		'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
		{
			headers: {
				Authorization: `Bearer ${validatePaymentRequirements.accessToken}`,
			},
			body: JSON.stringify(requestBody),
		},
	);
	console.log('Validate payment response: ' + JSON.stringify(response));
});
