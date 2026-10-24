export interface ClientRequestOptions {
	method?		: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	body?		: unknown;
	headers?	: Record<string, string>;
}

export class FrontendApiClient {
	private async request<T>( url : string, options : ClientRequestOptions = {} ): Promise<T> {
		const headers : Record<string, string> = {
			'Accept'	: 'application/json',
			...( options.headers ?? {} ),
		};

		if ( options.body !== undefined ) {
			headers[ 'Content-Type' ] = 'application/json';
		}

		const response = await fetch( url, {
			method	: options.method ?? 'GET',
			headers,
			body	: options.body !== undefined ? JSON.stringify( options.body ) : undefined,
		} );

		if ( !response.ok ) {
			let message = `Error ${ response.status }: ${ response.statusText }`;

			try {
				const errorData = await response.json();
				if ( typeof errorData === 'object' && errorData !== null ) {
					if ( 'message' in errorData && typeof errorData.message === 'string' ) {
						message = errorData.message;
					} else if ( 'detail' in errorData && typeof errorData.detail === 'string' ) {
						message = errorData.detail;
					}
				}
			} catch {
				// No json body
			}

			throw new Error( message );
		}

		return ( await response.json() ) as T;
	}

	public async get<T>( url : string ): Promise<T> {
		return this.request<T>( url, { method : 'GET' } );
	}

	public async post<T, B = unknown>( url : string, body : B ): Promise<T> {
		return this.request<T>( url, {
			method	: 'POST',
			body,
		} );
	}

	public async patch<T, B = unknown>( url : string, body : B ): Promise<T> {
		return this.request<T>( url, {
			method	: 'PATCH',
			body,
		} );
	}

	public async delete<T>( url : string ): Promise<T> {
		return this.request<T>( url, { method : 'DELETE' } );
	}
}

export const apiClient : FrontendApiClient = new FrontendApiClient();
