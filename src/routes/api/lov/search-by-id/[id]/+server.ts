import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type { ILovDetail }		from '$lib/types';

export const GET : RequestHandler = async ({ params }): Promise<Response> => {
	const id = params.id;

	if ( !id ) {
		throw error( 400, { message : 'El ID de la Lista de Valores es requerido' } );
	}

	const detail = await backendClient.get<ILovDetail>( EXTERNAL_ENDPOINTS.lov.searchById( id ) );
	return json( detail );
};
