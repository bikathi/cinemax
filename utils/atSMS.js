import AfricasTalking from 'africastalking';

export const sendSuccessMessage = async (phoneNumber) => {
	console.log('sending successs message....');
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
		to: phoneNumber,
		message: `Refferal link:  http://localhost:3001/ref/${refferalUUID}/`,
	});

	console.log('Send sms result: ' + JSON.stringify(result, null, 2));
	if (
		result.SMSMessageData.Message === 'Sent to 1/1 Total Cost: KES 0.8000'
	) {
		console.log('Message sent successfully');
		return true;
	} else {
		return false;
	}
};
