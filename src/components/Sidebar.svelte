<script lang="ts">
	import { page }							from '$app/state';
	import {
		Package,
		Plus,
		RefreshCw,
	}											from '@lucide/svelte';
	import {
		useQueryClient,
		useIsMutating,
	}											from '@tanstack/svelte-query';

	import {
		useLovParentsQuery,
		useDeleteLovMutation,
	}											from '$lib/services/lov.service';
	import {
		notifySuccess,
		notifyInfo,
		notifyError,
	}											from '$lib/utils/notifications';
	import { lovStorage }						from '$lib/services/lov-storage.service';
	import LovSidebarSkeleton					from './skeletons/LovSidebarSkeleton.svelte';
	import ListaValoresCard						from './ListaValoresCard.svelte';
	import ListaValoresForm						from './ListaValoresForm.svelte';
	import { ConfirmDialog }					from './shared';
	import type { ILovParent, ILovDetail }		from '$lib/types';

	const queryClient		= useQueryClient();
	const parentsQuery		= useLovParentsQuery();
	const deleteMutation	= useDeleteLovMutation();
	const isCreatingLista	= useIsMutating( { mutationKey : [ 'lov', 'save' ] } );

	// Mapeo descripción → segmento de URL
	const routeMap : Record<string, string> = {
		About			: 'about',
		Education		: 'education',
		Employement		: 'employement',
		Skills			: 'skills',
		OtherSkills		: 'other-skills',
		Certificates	: 'certificates',
		Portfolio		: 'portfolio',
		Images			: 'images',
	};

	let showForm			= $state( false );
	let editingLista		= $state<ILovParent | null>( null );
	let showConfirmDelete	= $state( false );
	let listaToDelete		= $state<ILovParent | null>( null );
	let deletingListaId		= $state<number | null>( null );
	let isRefreshing		= $state( false );

	const listas = $derived( parentsQuery.data ?? [] );

	function getItemBadge( id : number ): string {
		const cachedDetail = queryClient.getQueryData<ILovDetail>( [ 'lov', 'detail', id ] );
		if ( cachedDetail?.lov_vals ) {
			return `${ cachedDetail.lov_vals.length } items`;
		}
		return '';
	}

	function isActive( description : string ): boolean {
		const route = routeMap[ description ];
		return page.url.pathname === `/dashboard/${ route }`;
	}

	function handleEdit( lista : ILovParent ): void {
		editingLista	= lista;
		showForm		= true;
	}

	function handleRequestDelete( lista : ILovParent ): void {
		listaToDelete		= lista;
		showConfirmDelete	= true;
	}

	function handleConfirmDelete(): void {
		if ( !listaToDelete ) return;

		const targetId = listaToDelete.id;
		deletingListaId = targetId;
		showConfirmDelete = false;

		deleteMutation.mutate( targetId, {
			onSettled	: (): void => {
				if ( deletingListaId === targetId ) {
					deletingListaId = null;
					listaToDelete = null;
				}
			},
		} );
	}

	function handleCloseForm(): void {
		editingLista	= null;
		showForm		= false;
	}

	function handleNewLista(): void {
		editingLista	= null;
		showForm		= true;
	}

	async function handleRefresh(): Promise<void> {
		if ( isRefreshing ) return;
		isRefreshing = true;

		try {
			const result = await parentsQuery.refetch();
			const freshData = result.data ?? [];
			const syncResult = lovStorage.syncParentsIfChanged( freshData );

			if ( syncResult.hasChanged ) {
				notifySuccess( 'Datos actualizados desde el servidor' );
			} else {
				notifyInfo( 'Los datos ya se encuentran actualizados' );
			}
		} catch ( err : unknown ) {
			const message = err instanceof Error ? err.message : 'Error al refrescar las listas';
			notifyError( message );
		} finally {
			isRefreshing = false;
		}
	}
</script>

<aside class="w-88 h-full flex flex-col max-h-(calc(100vh-6rem)) glass border-r border-border/30 overflow-y-auto">
	<!-- Header -->
	<div class="p-6 border-b border-border/30">
		<div class="flex items-center justify-between">
			<div>
				<div class="flex items-center gap-2">
					<h2 class="text-xl font-bold text-text">Lista de Valores</h2>

					<button
						aria-label	= "Refrescar listas"
						type		= "button"
						onclick		= { handleRefresh }
						disabled	= { isRefreshing || parentsQuery.isFetching }
						class		= "p-1.5 text-text-muted hover:text-primary hover:bg-surface-lighter/60 rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
						title		= "Refrescar listas"
					>
						<RefreshCw class="size-4 { isRefreshing || parentsQuery.isFetching ? 'animate-spin text-primary' : '' }" />
					</button>
				</div>

				<p class="text-sm text-text-muted mt-1">
					{ parentsQuery.isPending && listas.length === 0 ? 'Cargando...' : `${ listas.length } listas` }
				</p>
			</div>

			<button
				aria-label	= "Crear nueva lista"
				type		= "button"
				onclick		= { handleNewLista }
				class		= "p-3 text-white bg-linear-to-r from-primary to-accent rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:shadow-xl hover:scale-110 transition-all duration-300 ring-1 ring-primary-light/20 cursor-pointer"
				title		= "Nueva lista"
			>
				<Plus class="size-5" />
			</button>
		</div>
	</div>

	<!-- Nav list -->
	<nav class="flex-1 overflow-y-auto p-4 space-y-3">
		{#if parentsQuery.isPending && listas.length === 0 }
			<LovSidebarSkeleton count={ 6 } />
		{:else if parentsQuery.isError && listas.length === 0 }
			<div class="text-center py-8 px-4">
				<p class="text-xs text-danger mb-3">Error al cargar las listas</p>
				<button
					type	= "button"
					onclick	= { () => parentsQuery.refetch() }
					class	= "px-3 py-1.5 text-xs text-primary border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
				>
					Reintentar
				</button>
			</div>
		{:else}
			<!-- Skeleton animado al crear nueva lista -->
			{#if isCreatingLista.current > 0 }
				<div class="animate-scale-in">
					<LovSidebarSkeleton count={ 1 } />
				</div>
			{/if}

			{#each listas as lista ( lista.id ) }
				<ListaValoresCard
					{ lista }
					route		= { routeMap[ lista.description ] ?? '#' }
					active		= { isActive( lista.description ) }
					itemBadge	= { getItemBadge( lista.id ) }
					isDeleting	= { deletingListaId === lista.id }
					onedit		= { handleEdit }
					ondelete	= { handleRequestDelete }
				/>
			{/each}

			{#if listas.length === 0 && !parentsQuery.isPending && !parentsQuery.isFetching }
				<div class="text-center py-12">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-light flex items-center justify-center">
						<Package class="size-8 text-text-muted" />
					</div>

					<p class="text-text-muted">No hay listas creadas</p>

					<button
						onclick	= { handleNewLista }
						class	= "mt-4 px-4 py-2 text-sm text-primary hover:text-primary-light transition-colors duration-200 cursor-pointer"
					>
						Crear primera lista
					</button>
				</div>
			{/if}
		{/if}
	</nav>
</aside>

<ListaValoresForm
	bind:open	= { showForm }
	lista		= { editingLista }
	onclose		= { handleCloseForm }
/>

<ConfirmDialog
	bind:open	= { showConfirmDelete }
	title		= "¿Eliminar lista de valores?"
	description	= { listaToDelete ? `Se eliminará la lista "${ listaToDelete.description }" junto con todos sus valores asociados. Esta acción no se puede deshacer.` : '' }
	confirmText	= "Eliminar lista"
	cancelText	= "Cancelar"
	variant		= "danger"
	loading		= { deleteMutation.isPending }
	onconfirm	= { handleConfirmDelete }
	oncancel	= { () => { listaToDelete = null; } }
/>
