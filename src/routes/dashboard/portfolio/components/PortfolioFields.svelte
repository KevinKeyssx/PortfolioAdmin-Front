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
</script>

<div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
	<h3 class="text-sm font-semibold text-accent">Datos del Proyecto</h3>

	<div class="space-y-2">
		<label for="portfolio-img" class="block text-sm font-medium text-text-muted">URL de Imagen</label>

		<input
			id			= "portfolio-img"
			type		= "url"
			bind:value={ port.img }
			placeholder	= "https://..."
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
		/>
	</div>

	<div class="space-y-2">
		<label for="portfolio-url" class="block text-sm font-medium text-text-muted">URL del Proyecto</label>

		<input
			id			= "portfolio-url"
			type		= "url"
			bind:value={ port.url }
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
