import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type { ILovValWithParent }	from '$lib/types';

export const GET : RequestHandler = async ({ params }): Promise<Response> => {
	const id = params.id;

	if ( !id ) {
		throw error( 400, { message : 'El ID de LovVal es requerido' } );
	}

	const lovVal = await backendClient.get<ILovValWithParent>( EXTERNAL_ENDPOINTS.lovVal.searchById( id ) );
	return json( lovVal );
};
