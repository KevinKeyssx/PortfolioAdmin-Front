import {
	createQuery,
	createMutation,
	useQueryClient,
	type CreateQueryResult,
	type CreateMutationResult,
}								from '@tanstack/svelte-query';
import { INTERNAL_ENDPOINTS }	from '$lib/constants/endpoints';
import { apiClient }			from './api-client';
import {
	notifySuccess,
	notifyError,
}								from '$lib/utils/notifications';
import { lovStorage }			from './lov-storage.service';
import type {
	ILovParent,
	ILovDetail,
	ILovValWithParent,
	ISaveLovPayload,
	IUpdateLovPayload,
	ISaveLovValPayload,
	IUpdateLovValPayload,
}								from '$lib/types';

// ──────────────────────────────────────────────────────────────
// Queries
// ──────────────────────────────────────────────────────────────

export function useLovParentsQuery(): CreateQueryResult<ILovParent[], Error> {
	return createQuery( () => {
		const cached = lovStorage.getStoredParents();
		const hasCached = cached !== null && cached.length > 0;

		return ({
			queryKey				: [ 'lov', 'parents' ],
			queryFn					: async (): Promise<ILovParent[]> => {
				const data = await apiClient.get<ILovParent[]>( INTERNAL_ENDPOINTS.lov.searchParents );
				lovStorage.syncParentsIfChanged( data );
				return data;
			},
			initialData				: (): ILovParent[] | undefined => {
				return hasCached ? cached : undefined;
			},
			initialDataUpdatedAt	: hasCached ? Date.now() : undefined,
			staleTime				: Infinity,
			refetchOnMount			: !hasCached,
			refetchOnWindowFocus	: false,
			refetchOnReconnect		: false,
		});
	} );
}

export function useLovDetailQuery(
	getId : () => number | string | null | undefined
): CreateQueryResult<ILovDetail, Error> {
	return createQuery( () => {
		const id = getId();
		const isEnabled = id !== null && id !== undefined && id !== '';

		return ({
			queryKey	: [ 'lov', 'detail', id ],
			queryFn		: async (): Promise<ILovDetail> => {
				if ( !id ) {
					throw new Error( 'ID no válido para consultar detalle' );
				}
				return apiClient.get<ILovDetail>( INTERNAL_ENDPOINTS.lov.searchById( id ) );
			},
			enabled		: isEnabled,
		});
	} );
}

// ──────────────────────────────────────────────────────────────
// Mutaciones LOV (Padre)
// ──────────────────────────────────────────────────────────────

export function useSaveLovMutation(): CreateMutationResult<ILovParent, Error, ISaveLovPayload> {
	const queryClient = useQueryClient();

	return createMutation( () => ({
		mutationKey	: [ 'lov', 'save' ],
		mutationFn	: async ( payload : ISaveLovPayload ): Promise<ILovParent> => {
			return apiClient.post<ILovParent, ISaveLovPayload>( INTERNAL_ENDPOINTS.lov.save, payload );
		},
		onSuccess	: async ( created : ILovParent ): Promise<void> => {
			lovStorage.addStoredParent( created );
			const all = lovStorage.getStoredParents() ?? [];
			queryClient.setQueryData( [ 'lov', 'parents' ], all );
			notifySuccess( 'Lista de valores creada con éxito' );
		},
		onError		: ( err : Error ): void => {
			notifyError( err.message );
		},
	}) );
}

export interface UpdateLovParams {
	id		: number | string;
	payload	: IUpdateLovPayload;
}

export function useUpdateLovMutation(): CreateMutationResult<ILovParent, Error, UpdateLovParams> {
	const queryClient = useQueryClient();

	return createMutation( () => ({
		mutationFn	: async ( params : UpdateLovParams ): Promise<ILovParent> => {
			return apiClient.patch<ILovParent, IUpdateLovPayload>(
				INTERNAL_ENDPOINTS.lov.update( params.id ),
				params.payload
			);
		},
		onSuccess	: async ( updated : ILovParent, variables ): Promise<void> => {
			lovStorage.updateStoredParent( variables.id, updated );
			const all = lovStorage.getStoredParents() ?? [];
			queryClient.setQueryData( [ 'lov', 'parents' ], all );
			await queryClient.invalidateQueries( { queryKey : [ 'lov', 'detail', variables.id ] } );
			notifySuccess( 'Lista de valores actualizada' );
		},
		onError		: ( err : Error ): void => {
			notifyError( err.message );
		},
	}) );
}

export function useDeleteLovMutation(): CreateMutationResult<{ success : boolean }, Error, number | string> {
	const queryClient = useQueryClient();

	return createMutation( () => ({
		mutationFn	: async ( id : number | string ): Promise<{ success : boolean }> => {
			return apiClient.delete<{ success : boolean }>( INTERNAL_ENDPOINTS.lov.delete( id ) );
		},
		onSuccess	: async ( _data, id ): Promise<void> => {
			lovStorage.removeStoredParent( id );
			const all = lovStorage.getStoredParents() ?? [];
			queryClient.setQueryData( [ 'lov', 'parents' ], all );
			notifySuccess( 'Lista de valores eliminada' );
		},
		onError		: ( err : Error ): void => {
			notifyError( err.message );
		},
	}) );
}

// ──────────────────────────────────────────────────────────────
// Mutaciones Lov-Val (Hijos)
// ──────────────────────────────────────────────────────────────

export function useSaveLovValMutation(): CreateMutationResult<ILovValWithParent, Error, ISaveLovValPayload> {
	const queryClient = useQueryClient();

	return createMutation( () => ({
		mutationKey	: [ 'lovVal', 'save' ],
		mutationFn	: async ( payload : ISaveLovValPayload ): Promise<ILovValWithParent> => {
			return apiClient.post<ILovValWithParent, ISaveLovValPayload>(
				INTERNAL_ENDPOINTS.lovVal.save,
				payload
			);
		},
		onSuccess	: async ( _data, variables ): Promise<void> => {
			await queryClient.invalidateQueries( { queryKey : [ 'lov', 'detail', variables.lov_id ] } );
			await queryClient.invalidateQueries( { queryKey : [ 'lov', 'parents' ] } );
			notifySuccess( 'Valor creado con éxito' );
		},
		onError		: ( err : Error ): void => {
			notifyError( err.message );
		},
	}) );
}

export interface UpdateLovValParams {
	id		: number | string;
	lovId	: number | string;
	payload	: IUpdateLovValPayload;
}

export function useUpdateLovValMutation(): CreateMutationResult<ILovValWithParent, Error, UpdateLovValParams> {
	const queryClient = useQueryClient();

	return createMutation( () => ({
		mutationFn	: async ( params : UpdateLovValParams ): Promise<ILovValWithParent> => {
			return apiClient.patch<ILovValWithParent, IUpdateLovValPayload>(
				INTERNAL_ENDPOINTS.lovVal.update( params.id ),
				params.payload
			);
		},
		onSuccess	: async ( _data, variables ): Promise<void> => {
			await queryClient.invalidateQueries( { queryKey : [ 'lov', 'detail', variables.lovId ] } );
			notifySuccess( 'Valor actualizado con éxito' );
		},
		onError		: ( err : Error ): void => {
			notifyError( err.message );
		},
	}) );
}

export interface DeleteLovValParams {
	id		: number | string;
	lovId	: number | string;
}

export function useDeleteLovValMutation(): CreateMutationResult<{ success : boolean }, Error, DeleteLovValParams> {
	const queryClient = useQueryClient();

	return createMutation( () => ({
		mutationFn	: async ( params : DeleteLovValParams ): Promise<{ success : boolean }> => {
			return apiClient.delete<{ success : boolean }>( INTERNAL_ENDPOINTS.lovVal.delete( params.id ) );
		},
		onSuccess	: async ( _data, variables ): Promise<void> => {
			await queryClient.invalidateQueries( { queryKey : [ 'lov', 'detail', variables.lovId ] } );
			await queryClient.invalidateQueries( { queryKey : [ 'lov', 'parents' ] } );
			notifySuccess( 'Valor eliminado con éxito' );
		},
		onError		: ( err : Error ): void => {
			notifyError( err.message );
		},
	}) );
}
