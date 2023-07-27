import AfricasTalking from 'africastalking';

export default defineEventHandler(async (event) => {
	const refferalDetails = await readBody(event);
	console.log('Refferal details: ' + JSON.stringify(refferalDetails));

	// details from request body
	const referrerFirstName = 'Bikathi';
	const referrerLastName = 'Martin';
	const refferrerNumber = `254${refferalDetails.mobileNumber}`;

	const runtimeConfig = useRuntimeConfig();
	const atApiKey = runtimeConfig.public.AT_API_KEY;

	console.log('AT API Key: ' + atApiKey);

	// initialize AT auth
	const africasTalking = AfricasTalking({
		apiKey: atApiKey,
		username: 'cinemaxsms',
	});

	console.log('Starting to send message...');

	// send refferal message
	const result = await africasTalking.SMS.send({
		to: `${refferalDetails.targetPhoneNumber}`,
		message: `Refferal by ${referrerFirstName} ${referrerLastName}. Please follow the link below to redeem you discount for the next time you purchase a Cinema ticket from Cinemax. ${refferalDetails.code}`,
	});

	console.log('Send sms test: ' + JSON.stringify(result));
	if (!result.SMSMesssageData.status) {
		return {
			status: 'SUCCESSFULL',
			successfull: true,
			data: null,
		};
	}

	return {
		status: 'FAILED',
		successfull: false,
		data: null,
	};
});
