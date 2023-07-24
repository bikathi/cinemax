import { prisma } from '../../prisma/db';

export default defineEventHandler(async (event) => {
	const clientDetails = await readBody(event);
	let client;

	// confirm the client details do not exist yet
	const existingClient = await prisma.client.findFirst({
		where: {
			mobileNumber: `254${clientDetails.mobileNumber}`,
			OR: {
				email: clientDetails.email,
			},
		},
	});

	// we only save if no clients exist
	if (!existingClient) {
		client = await prisma.client.create({
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
	}

	return {
		status: 'SUCCESSFULL',
		successfull: true,
		data: client || existingClient,
	};
});
