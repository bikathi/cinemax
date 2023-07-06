import { prisma } from '../../prisma/db';

export default defineEventHandler(async (event) => {
	const clientDetails = await readBody(event);
	const client = await prisma.client.create({
		data: {
			firstName: clientDetails.firstName,
			lastName: clientDetails.lastName,
			email: clientDetails.email,
			mobileNumber: `254${clientDetails.mobileNumber}`,
			location: clientDetails.location,
		},
	});
	if (!client) {
		return {
			status: 'FAILED',
			successfull: false,
			data: null,
		};
	}

	return {
		status: 'SUCCESSFULL',
		successfull: true,
		data: client,
	};
});
