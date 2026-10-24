<script lang="ts">
	import Toggle from '../../Toggle.svelte';

	interface Props {
		checked?		: boolean;
		id?				: string;
		label?			: string;
		description?	: string;
		disabled?		: boolean;
		onchange?		: ( checked : boolean ) => void;
	}

	let {
		checked		= $bindable( true ),
		id			= 'active',
		label		= 'Activo',
		description	= 'Determina si este elemento está visible',
		disabled	= false,
		onchange,
	} : Props = $props();
</script>

<div class="flex items-center justify-between p-4 bg-surface-light/50 rounded-xl">
	<div>
		<label for={ id } class="block text-sm font-medium text-text">{ label }</label>

		{#if description }
			<p class="text-xs text-text-muted mt-0.5">{ description }</p>
		{/if}
	</div>

	<Toggle
		bind:checked	= { checked }
		id				= { id }
		disabled		= { disabled }
		onchange		= { onchange }
	/>
</div>
