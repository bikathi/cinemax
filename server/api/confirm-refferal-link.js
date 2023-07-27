import { prisma } from '../../prisma/db';

export default defineEventHandler(async (event) => {
	const refferalUUID = await readBody(event);
	console.log('Referral UUID: ' + refferalUUID);

	const linkExists = await prisma.refferedPeople.findFirst({
		where: {
			refferalId: refferalUUID,
		},
	});

	if (!linkExists) {
        console.log("link not found...");
		return {
			status: 'FAILED',
			successfull: false,
			data: null,
		};
	}

    console.log("link found...");

	return {
		status: 'SUCCESS',
		successfull: true,
		data: null,
	};
});
