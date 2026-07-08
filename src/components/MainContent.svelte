<script lang="ts">
	import {
		lovValoresStore,
		viewModeStore,
	}							from '../lib/store';
	import LovValorCard			from './LovValorCard.svelte';
	import LovValorGridCard		from './LovValorGridCard.svelte';
	import LovValorForm			from './LovValorForm.svelte';
	import ViewToggle			from './ViewToggle.svelte';
	import type { LovValor }	from '../lib/types';


	interface Props {
		lovId  : number;
		title  : string;
		count? : number;
	}


	let { lovId, title } : Props = $props();


	let showForm    = $state( false );
	let editingLov  = $state<LovValor | null>( null );
	let searchQuery = $state( '' );


	const lovValores = $derived(
		$lovValoresStore.filter( ( lov ) => lov.lov_id === lovId )
	);


	const filteredLovValores = $derived(
		searchQuery.trim()
		? lovValores.filter( ( lov ) =>
			lov.description.toLowerCase().includes( searchQuery.toLowerCase() ) ||
			lov.comment.toLowerCase().includes( searchQuery.toLowerCase() )
		)
		: lovValores
	);


	function handleNewLov(): void {
		editingLov	= null;
		showForm	= true;
	}


	function handleEdit( lov : LovValor ): void {
		editingLov	= lov;
		showForm	= true;
	}


	function handleCloseForm(): void {
		editingLov	= null;
		showForm	= false;
	}
</script>


<main class="flex-1 h-full flex flex-col overflow-hidden">
	<!-- Header -->
	<header class="p-6 border-b border-border/30 glass">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-4">
				<div class="w-14 h-14 rounded-2xl bg-linear-to-br from-primary via-primary-dark to-accent flex items-center justify-center shadow-lg shadow-primary/40 ring-2 ring-primary/20">
					<span class="text-2xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{ title.charAt( 0 ) }</span>
				</div>

				<div>
					<h1 class="text-2xl font-bold text-text">{ title }</h1>

					<p class="text-sm text-text-muted mt-0.5">{ lovValores.length } valores registrados</p>
				</div>
			</div>

			<div class="flex items-center gap-4">
				<ViewToggle />

				<button
					onclick     = { handleNewLov }
					class       = "flex items-center gap-2 px-5 py-3 text-white bg-linear-to-r from-primary via-primary-dark to-primary rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:shadow-xl hover:scale-105 transition-all duration-300 font-medium ring-1 ring-primary-light/20"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					Nuevo Valor
				</button>
			</div>
		</div>

		<!-- Search -->
		<div class="mt-4 relative">
			<svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>

			<input
				type        = "text"
				bind:value={ searchQuery }
				placeholder = "Buscar valores..."
				class       = "w-full pl-12 pr-4 py-3 bg-surface/80 rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/60 focus:ring-2 focus:ring-primary/30 focus:shadow-lg focus:shadow-primary/10 transition-all duration-300"
			/>

			{#if searchQuery }
				<button
					onclick     = { () => searchQuery = '' }
					class       = "absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text transition-colors"
					aria-label  = "Limpiar búsqueda"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			{/if}
		</div>
	</header>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto p-6">
		{#if filteredLovValores.length > 0 }
			<div class={ $viewModeStore === 'list' ? 'grid gap-3' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' }>
				{#each filteredLovValores as lov ( lov.id )}
					{#if $viewModeStore === 'list' }
						<LovValorCard { lov } onedit={ () => handleEdit( lov ) } />
					{:else }
						<LovValorGridCard { lov } onedit={ () => handleEdit( lov ) } />
					{/if}
				{/each}
			</div>
		{:else if searchQuery }
			<div class="text-center py-16">
				<div class="w-20 h-20 mx-auto mb-6 rounded-full bg-surface-light flex items-center justify-center">
					<svg class="w-10 h-10 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>

				<h3 class="text-lg font-medium text-text mb-2">Sin resultados</h3>
				<p class="text-text-muted">No se encontraron valores para "{ searchQuery }"</p>
			</div>
		{:else }
			<div class="text-center py-16">
				<div class="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-primary/20 to-accent/10 flex items-center justify-center">
					<svg class="w-10 h-10 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
				</div>

				<h3 class="text-lg font-medium text-text mb-2">Lista vacía</h3>
				<p class="text-text-muted mb-6">Aún no hay valores en esta lista</p>

				<button
					onclick = { handleNewLov }
					class   = "inline-flex items-center gap-2 px-5 py-2.5 text-primary hover:text-primary-light border border-primary/30 hover:border-primary/50 rounded-xl transition-all duration-300"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
					</svg>
					Agregar primer valor
				</button>
			</div>
		{/if}
	</div>

	<LovValorForm
		bind:open   = { showForm }
		lovId       = { lovId }
		lov         = { editingLov }
		onclose     = { handleCloseForm }
	/>
</main>
