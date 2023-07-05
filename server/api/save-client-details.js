import { prisma } from '../../prisma/db';

export default defineEventHandler(async (event) => {
	const clientDetails = await readBody(event);
	console.log('clientDetails: ' + JSON.stringify(clientDetails));
	const client = await prisma.client.create({
		data: {
			firstName: clientDetails.firstName,
			lastName: clientDetails.lastName,
			email: clientDetails.email,
			mobileNumber: `254${clientDetails.mobileNumber}`,
			location: clientDetails.location,
		},
	});

	console.log('done creating record: ' + JSON.stringify(client));
});
