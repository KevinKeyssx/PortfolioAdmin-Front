<script lang="ts">
	import YearRangePicker			from '../../../../components/YearRangePicker.svelte';
	import type { EducationSkill }	from '../../../../lib/types/skills/education';

	interface Props {
		skill : Record<string, unknown>;
	}

	let { skill } : Props = $props();

	// svelte-ignore state_referenced_locally
	const edu = skill as unknown as EducationSkill;

	if ( edu.sort === undefined ) {
		edu.sort = 1;
	}

	if ( edu.date === undefined ) {
		edu.date = '';
	}

	if ( edu.location === undefined ) {
		edu.location = '';
	}
</script>

<div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
	<h3 class="text-sm font-semibold text-accent">Datos de Educación</h3>

	<div class="space-y-2">
		<label for="education-period" class="block text-sm font-medium text-text-muted">Período</label>

		<YearRangePicker bind:value={ edu.date } />
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<label for="education-sort" class="block text-sm font-medium text-text-muted">Orden</label>

			<input
				id			= "education-sort"
				type		= "number"
				bind:value={ edu.sort }
				min			= "1"
				class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
			/>
		</div>

		<div class="space-y-2">
			<label for="education-location" class="block text-sm font-medium text-text-muted">Ubicación</label>

			<input
				id			= "education-location"
				type		= "text"
				bind:value={ edu.location }
				placeholder	= "Santiago RM, Chile"
				class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
			/>
		</div>
	</div>
</div>
