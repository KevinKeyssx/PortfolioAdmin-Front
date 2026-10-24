import { json }					from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type { ILovValWithParent }	from '$lib/types';

export const GET : RequestHandler = async (): Promise<Response> => {
	const lovVals = await backendClient.get<ILovValWithParent[]>( EXTERNAL_ENDPOINTS.lovVal.searchAll );
	return json( lovVals );
};
