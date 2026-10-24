import { json, error }			from '@sveltejs/kit';
import type { RequestHandler }	from './$types';
import { backendClient }		from '$lib/server/backend-client';
import { EXTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import type { ILovValWithParent }	from '$lib/types';

export const GET : RequestHandler = async ({ url }): Promise<Response> => {
	const description = url.searchParams.get( 'description' );

	if ( !description ) {
		throw error( 400, { message : 'El parámetro description es requerido en la query (?description=...)' } );
	}

	const all = await backendClient.get<ILovValWithParent[]>( EXTERNAL_ENDPOINTS.lovVal.searchAll );
	const matched = all.filter( ( item ): boolean =>
		item.description.toLowerCase().includes( description.toLowerCase() )
	);

	return json( matched );
};
