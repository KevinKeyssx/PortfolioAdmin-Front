import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type {
	ILovValWithParent,
	IUpdateLovValPayload,
}								from '$lib/types';

export const PATCH : RequestHandler = async ({ params, request }): Promise<Response> => {
	const id = params.id;

	if ( !id ) {
		throw error( 400, { message : 'El ID de LovVal es requerido' } );
	}

	const body = await request.json() as IUpdateLovValPayload;
	const updatedLovVal = await backendClient.patch<ILovValWithParent, IUpdateLovValPayload>(
		EXTERNAL_ENDPOINTS.lovVal.update( id ),
		body
	);

	return json( updatedLovVal );
};
