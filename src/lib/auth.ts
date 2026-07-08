import { betterAuth } from 'better-auth';

import {
	ADMIN_EMAIL,
	BETTER_AUTH_SECRET,
	BETTER_AUTH_URL,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
} from '$env/static/private';


export const auth = betterAuth( {
	secret          : BETTER_AUTH_SECRET,
	baseURL         : BETTER_AUTH_URL,
	socialProviders : {
		google : {
			clientId     : GOOGLE_CLIENT_ID,
			clientSecret : GOOGLE_CLIENT_SECRET,
		},
	},

	session : {
		cookieCache : {
			enabled : false,
		},
		epiresIn : 60 * 60 * 24 * 7,
	},

	callbacks : {
		signIn : async ( ctx : { user : { email : string } } ) => {
			const email = ctx.user?.email ?? '';
			console.log( 'Intento de signIn. Email:', email, 'Admin email:', ADMIN_EMAIL );

			if ( email !== ADMIN_EMAIL ) {
				console.log( 'Forbidden: email no coincide' );
				return false;
			}

			console.log( 'SignIn exitoso para el admin' );
			return true;
		},
	},
});
