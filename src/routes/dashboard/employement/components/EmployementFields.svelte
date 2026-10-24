<script lang="ts">
	import YearRangePicker			from '../../../../components/YearRangePicker.svelte';
	import TagInput					from '../../../../components/TagInput.svelte';
	import type { EmploymentSkill }	from '../../../../lib/types/skills/employment';

	interface Props {
		skill : Record<string, unknown>;
	}

	let { skill } : Props = $props();

	// svelte-ignore state_referenced_locally
	const emp = skill as unknown as EmploymentSkill;

	if ( emp.job === undefined ) {
		emp.job = '';
	}

	if ( emp.date === undefined ) {
		emp.date = '';
	}

	if ( emp.sort === undefined ) {
		emp.sort = 1;
	}

	if ( emp.tools === undefined || !Array.isArray( emp.tools ) ) {
		emp.tools = [];
	}
</script>

<div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
	<h3 class="text-sm font-semibold text-accent">Datos de Empleo</h3>

	<div class="space-y-2">
		<label for="employment-job" class="block text-sm font-medium text-text-muted">Cargo</label>

		<input
			id			= "employment-job"
			type		= "text"
			bind:value={ emp.job }
			placeholder	= "Ingeniero Informático SR"
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
		/>
	</div>

	<div class="space-y-2">
		<label for="employment-period" class="block text-sm font-medium text-text-muted">Período</label>

		<YearRangePicker bind:value={ emp.date } />
	</div>

	<div class="space-y-2">
		<label for="employment-sort" class="block text-sm font-medium text-text-muted">Orden</label>

		<input
			id			= "employment-sort"
			type		= "number"
			bind:value={ emp.sort }
			min			= "1"
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
		/>
	</div>

	<div class="space-y-2">
		<label for="employment-tools" class="block text-sm font-medium text-text-muted">Herramientas (Enter para agregar)</label>

		<TagInput bind:tags={ emp.tools } placeholder="Agregar tecnología..." />
	</div>
</div>
