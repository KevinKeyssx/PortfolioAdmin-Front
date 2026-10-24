import { error }					from '@sveltejs/kit';
import { BACKEND_URL, token }		from '$env/static/private';

export interface BackendRequestOptions {
	method?		: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	body?		: unknown;
	headers?	: Record<string, string>;
}

export class BackendApiClient {
	private readonly baseUrl	: string;
	private readonly secret		: string;

	constructor() {
		const rawUrl	= BACKEND_URL ?? 'http://127.0.0.1:5000/api/v1';
		this.baseUrl	= rawUrl.replace( '://localhost', '://127.0.0.1' );
		this.secret		= token ?? '';
	}

	private async request<T>( endpoint : string, options : BackendRequestOptions = {} ): Promise<T> {
		const cleanEndpoint	= endpoint.startsWith( '/' ) ? endpoint.slice( 1 ) : endpoint;
		const url				= `${ this.baseUrl.replace( /\/+$/, '' ) }/${ cleanEndpoint }`;

		const headers : Record<string, string> = {
			'X-T'		: this.secret,
			'Accept'	: 'application/json',
			...( options.headers ?? {} ),
		};

		if ( options.body !== undefined ) {
			headers[ 'Content-Type' ] = 'application/json';
		}

		let response : Response;

		try {
			response = await fetch( url, {
				method	: options.method ?? 'GET',
				headers,
				body	: options.body !== undefined ? JSON.stringify( options.body ) : undefined,
			} );
		} catch ( err : unknown ) {
			const message = err instanceof Error ? err.message : 'Error al conectar con el backend';
			throw error( 503, { message : `Fallo de conexión con backend: ${ message }` } );
		}

		if ( !response.ok ) {
			let errorMessage = `Error ${ response.status }: ${ response.statusText }`;

			try {
				const errorData = await response.json();
				if ( typeof errorData === 'object' && errorData !== null ) {
					if ( 'detail' in errorData ) {
						errorMessage = typeof errorData.detail === 'string'
							? errorData.detail
							: JSON.stringify( errorData.detail );
					}
				}
			} catch {
				// No se devolvió un json en el error
			}

			throw error( response.status, { message : errorMessage } );
		}

		return ( await response.json() ) as T;
	}

	public async get<T>( endpoint : string ): Promise<T> {
		return this.request<T>( endpoint, { method : 'GET' } );
	}

	public async post<T, B = unknown>( endpoint : string, body : B ): Promise<T> {
		return this.request<T>( endpoint, {
			method	: 'POST',
			body,
		} );
	}

	public async patch<T, B = unknown>( endpoint : string, body : B ): Promise<T> {
		return this.request<T>( endpoint, {
			method	: 'PATCH',
			body,
		} );
	}

	public async delete<T>( endpoint : string ): Promise<T> {
		return this.request<T>( endpoint, { method : 'DELETE' } );
	}
}

export const backendClient : BackendApiClient = new BackendApiClient();
