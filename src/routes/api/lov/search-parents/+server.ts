import { json }					from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type { ILovParent }		from '$lib/types';

export const GET : RequestHandler = async (): Promise<Response> => {
	const parents = await backendClient.get<ILovParent[]>( EXTERNAL_ENDPOINTS.lov.searchParents );
	return json( parents );
};
