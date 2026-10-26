<script lang="ts">
	import GithubEditor		from '../../../../components/forms/GithubEditor.svelte';
	import ButtonGroup		from '../../../../components/ButtonGroup.svelte';
	import TagInput			from '../../../../components/TagInput.svelte';
	import {
		PORTFOLIO_STATUS,
		type PortfolioSkill,
	}						from '../../../../lib/types';

	interface Props {
		skill : Record<string, unknown>;
	}

	let { skill } : Props = $props();

	// svelte-ignore state_referenced_locally
	const port = skill as unknown as PortfolioSkill;

	let previewError = $state( false );

	if ( port.img === undefined ) {
		port.img = '';
	}

	if ( port.url === undefined ) {
		port.url = '';
	}

	if ( port.github === undefined || !Array.isArray( port.github ) ) {
		port.github = [];
	}

	if ( port.status === undefined ) {
		port.status = 'In Prod';
	}

	if ( port.technologies === undefined || !Array.isArray( port.technologies ) ) {
		port.technologies = [];
	}

	function handleImgInput(): void {
		previewError = false;
	}

	function handlePreviewError(): void {
		previewError = true;
	}
</script>

<div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
	<h3 class="text-sm font-semibold text-accent">Datos del Proyecto</h3>

	<div class="space-y-2">
		<div class="flex items-center justify-between">
			<label for="portfolio-img" class="block text-sm font-medium text-text-muted">
				URL de Imagen
			</label>

			{#if port.img.trim() && !previewError }
				<a
					href	= { port.img.trim() }
					target	= "_blank"
					rel		= "noopener noreferrer"
					class	= "text-xs text-primary-light hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
				>
					<span>Abrir original</span>
					<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
				</a>
			{/if}
		</div>

		<input
			id			= "portfolio-img"
			type		= "url"
			bind:value	= { port.img }
			placeholder	= "https://..."
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
			oninput		= { handleImgInput }
		/>

		<!-- Previsualización reactiva -->
		<div class="mt-2">
			<span class="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
				Previsualización
			</span>

			{#if port.img.trim() }
				<div class="relative w-full h-44 rounded-xl overflow-hidden bg-surface-light/40 border border-border/50 flex items-center justify-center group/preview transition-all duration-300">
					{#if !previewError }
						<img
							src		= { port.img.trim() }
							alt		= "Previsualización del proyecto"
							class	= "w-full h-full object-contain p-2 transition-transform duration-300 group-hover/preview:scale-[1.02]"
							onerror	= { handlePreviewError }
						/>

						<div class="absolute bottom-2 right-2 px-2.5 py-1 bg-surface/80 backdrop-blur-md rounded-lg border border-white/10 text-[11px] text-text-muted font-medium shadow-md">
							Vista previa
						</div>
					{:else}
						<div class="flex flex-col items-center justify-center p-6 text-center text-danger/80 gap-2">
							<div class="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
								</svg>
							</div>

							<p class="text-xs font-medium">No se pudo cargar la imagen</p>
							<p class="text-[11px] text-text-muted max-w-xs">Verifica que la URL sea válida y de acceso público.</p>
						</div>
					{/if}
				</div>
			{:else}
				<div class="w-full h-32 rounded-xl border-2 border-dashed border-border/60 bg-surface/30 flex flex-col items-center justify-center gap-2 text-text-muted p-4 text-center">
					<div class="w-9 h-9 rounded-full bg-surface-light/50 flex items-center justify-center text-text-muted/60">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>

					<p class="text-xs">Pega una URL de imagen para previsualizar el proyecto</p>
				</div>
			{/if}
		</div>
	</div>

	<div class="space-y-2">
		<label for="portfolio-url" class="block text-sm font-medium text-text-muted">URL del Proyecto</label>

		<input
			id			= "portfolio-url"
			type		= "url"
			bind:value	= { port.url }
			placeholder	= "https://..."
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
		/>
	</div>

	<GithubEditor bind:github={ port.github } />

	<div class="space-y-2">
		<span class="block text-sm font-medium text-text-muted">Estado</span>

		<ButtonGroup options={ PORTFOLIO_STATUS } bind:value={ port.status } />
	</div>

	<div class="space-y-2">
		<label for="portfolio-technologies" class="block text-sm font-medium text-text-muted">Tecnologías (Enter para agregar)</label>

		<TagInput bind:tags={ port.technologies } placeholder="Agregar tecnología..." />
	</div>
</div>
