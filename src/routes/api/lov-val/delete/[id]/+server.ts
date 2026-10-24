import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';

export const DELETE : RequestHandler = async ({ params }): Promise<Response> => {
	const id = params.id;

	if ( !id ) {
		throw error( 400, { message : 'El ID de LovVal es requerido' } );
	}

	const result = await backendClient.delete<boolean>( EXTERNAL_ENDPOINTS.lovVal.delete( id ) );
	return json( { success : result } );
};
