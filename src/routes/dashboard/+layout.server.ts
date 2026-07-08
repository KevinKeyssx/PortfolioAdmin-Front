import { redirect }				from '@sveltejs/kit';
import { auth }					from '$lib/auth';
import { ADMIN_EMAIL }			from '$env/static/private';
import type { LayoutServerLoad }	from './$types';


export const load : LayoutServerLoad = async ( event ) => {
	let session = null;

	try {
		const cookies = event.request.headers.get( 'cookie' ) ?? '';
		console.log( 'Cookies en layout:', cookies );
		session = await auth.api.getSession( { headers : event.request.headers } );
		console.log( 'Session devuelta en layout:', session );
	} catch ( err : any ) {
		console.error( 'Error al obtener sesión en layout:', err.message );
	}

	if ( !session ) {
		throw redirect( 302, '/' );
	}

	if ( session.user.email !== ADMIN_EMAIL ) {
		throw redirect( 302, '/forbidden' );
	}

	return {
		user : {
			name  : session.user.name,
			email : session.user.email,
			image : session.user.image ?? null,
		},
	};
};
