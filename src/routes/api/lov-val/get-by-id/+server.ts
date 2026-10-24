import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type { ILovValWithParent }	from '$lib/types';

export const GET : RequestHandler = async ({ url }): Promise<Response> => {
	const id = url.searchParams.get( 'id' );

	if ( !id ) {
		throw error( 400, { message : 'El parámetro id es requerido en la query (?id=...)' } );
	}

	const lovVal = await backendClient.get<ILovValWithParent>( EXTERNAL_ENDPOINTS.lovVal.searchById( id ) );
	return json( lovVal );
};
