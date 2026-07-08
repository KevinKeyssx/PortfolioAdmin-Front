import { redirect }				from '@sveltejs/kit';
import { auth }					from '$lib/auth';
import type { PageServerLoad }	from './$types';


export const load : PageServerLoad = async ( event ) => {
	let session = null;

	try {
		session = await auth.api.getSession( { headers : event.request.headers } );
	} catch ( err ) {
		// Ignoramos error de sesión corrupta en la carga de la página de login
	}

	if ( session ) {
		throw redirect( 302, '/dashboard/about' );
	}

	return {};
};
