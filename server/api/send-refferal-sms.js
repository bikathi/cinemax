import AfricasTalking from 'africastalking';
import { v4 as uuidV4 } from 'uuid';
import { prisma } from '../../prisma/db';

export default defineEventHandler(async (event) => {
	const refferalDetails = await readBody(event);
	console.log('Refferal details: ' + JSON.stringify(refferalDetails));

	// details from request body
	const refferalUUID = uuidV4().split('-')[0];
	console.log('Link UUID: ' + refferalUUID);

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
		message: `Refferal link:  http://localhost:3001/ref/${refferalUUID}/`,
	});

	console.log('Send sms result: ' + JSON.stringify(result, null, 2));
	if (
		result.SMSMessageData.Message === 'Sent to 1/1 Total Cost: KES 0.8000'
	) {
		console.log('Message sent successfully');
		const refferalDetailsFromDB = await prisma.refferedPeople.create({
			data: {
				refferalId: refferalUUID,
				fromNumber: refferalDetails.fromPhoneNumber,
				toNumber: refferalDetails.targetPhoneNumber.replace('+', ''),
			},
		});

		if (!refferalDetailsFromDB) {
			console.log('failed to insert in db.....');
		}

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
