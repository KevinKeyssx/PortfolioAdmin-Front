import { json }					from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type {
	ILovValWithParent,
	ISaveLovValPayload,
}								from '$lib/types';

export const POST : RequestHandler = async ({ request }): Promise<Response> => {
	const body = await request.json() as ISaveLovValPayload;
	const createdLovVal = await backendClient.post<ILovValWithParent, ISaveLovValPayload>(
		EXTERNAL_ENDPOINTS.lovVal.save,
		body
	);

	return json( createdLovVal, { status : 201 } );
};
