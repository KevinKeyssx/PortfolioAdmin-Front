import { json }					from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type {
	ILovParent,
	ISaveLovPayload,
}								from '$lib/types';

export const POST : RequestHandler = async ({ request }): Promise<Response> => {
	const body = await request.json() as ISaveLovPayload;
	const createdLov = await backendClient.post<ILovParent, ISaveLovPayload>(
		EXTERNAL_ENDPOINTS.lov.save,
		body
	);

	return json( createdLov, { status : 201 } );
};
