export interface EndpointsLov {
	searchParents	: string;
	searchById		: ( id : number | string ) => string;
	save			: string;
	update			: ( id : number | string ) => string;
	delete			: ( id : number | string ) => string;
}

export interface EndpointsLovVal {
	searchAll	: string;
	searchById	: ( id : number | string ) => string;
	save		: string;
	update		: ( id : number | string ) => string;
	delete		: ( id : number | string ) => string;
}

export interface InternalEndpoints {
	lov		: EndpointsLov;
	lovVal	: EndpointsLovVal;
}

export interface ExternalEndpoints {
	lov		: EndpointsLov;
	lovVal	: EndpointsLovVal;
}

export const INTERNAL_ENDPOINTS : InternalEndpoints = {
	lov		: {
		searchParents	: '/api/lov/search-parents',
		searchById		: ( id : number | string ): string => `/api/lov/search-by-id/${ id }`,
		save			: '/api/lov/save',
		update			: ( id : number | string ): string => `/api/lov/update/${ id }`,
		delete			: ( id : number | string ): string => `/api/lov/delete/${ id }`,
	},
	lovVal	: {
		searchAll	: '/api/lov-val/search-all',
		searchById	: ( id : number | string ): string => `/api/lov-val/search-by-id/${ id }`,
		save		: '/api/lov-val/save',
		update		: ( id : number | string ): string => `/api/lov-val/update/${ id }`,
		delete		: ( id : number | string ): string => `/api/lov-val/delete/${ id }`,
	},
};

export const EXTERNAL_ENDPOINTS : ExternalEndpoints = {
	lov		: {
		searchParents	: 'lov/search-parents',
		searchById		: ( id : number | string ): string => `lov/search-by-id/${ id }`,
		save			: 'lov/save',
		update			: ( id : number | string ): string => `lov/update/${ id }`,
		delete			: ( id : number | string ): string => `lov/delete-by-id/${ id }`,
	},
	lovVal	: {
		searchAll	: 'lov-vals/search-all',
		searchById	: ( id : number | string ): string => `lov-vals/search-by-id/${ id }`,
		save		: 'lov-vals/save',
		update		: ( id : number | string ): string => `lov-vals/update/${ id }`,
		delete		: ( id : number | string ): string => `lov-vals/delete-by-id/${ id }`,
	},
};

export const INTERNAL_ENDPOINT : InternalEndpoints = INTERNAL_ENDPOINTS;
export const EXTERNAL_ENDPOINT : ExternalEndpoints = EXTERNAL_ENDPOINTS;
