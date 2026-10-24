import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type {
	ILovParent,
	IUpdateLovPayload,
}								from '$lib/types';

export const PATCH : RequestHandler = async ({ params, request }): Promise<Response> => {
	const id = params.id;

	if ( !id ) {
		throw error( 400, { message : 'El ID de la Lista de Valores es requerido' } );
	}

	const body = await request.json() as IUpdateLovPayload;
	const updatedLov = await backendClient.patch<ILovParent, IUpdateLovPayload>(
		EXTERNAL_ENDPOINTS.lov.update( id ),
		body
	);

	return json( updatedLov );
};
