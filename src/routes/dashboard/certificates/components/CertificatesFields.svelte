<script lang="ts">
	import { DatePicker }				from '../../../../components/shared';
	import type { CertificateSkill }	from '../../../../lib/types/skills/certificates';

	interface Props {
		skill : Record<string, unknown>;
	}

	let { skill } : Props = $props();

	// svelte-ignore state_referenced_locally
	const cert = skill as unknown as CertificateSkill;

	if ( cert.date === undefined ) {
		cert.date = '';
	}

	if ( cert.teacher === undefined ) {
		cert.teacher = '';
	}

	if ( cert.description === undefined ) {
		cert.description = '';
	}
</script>

<div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
	<h3 class="text-sm font-semibold text-accent">Datos del Certificado</h3>

	<div class="space-y-2">
		<label for="certificate-date" class="block text-sm font-medium text-text-muted">Fecha</label>

		<DatePicker id="certificate-date" bind:value={ cert.date } maxValue="today" />
	</div>

	<div class="space-y-2">
		<label for="certificate-teacher" class="block text-sm font-medium text-text-muted">Instructor (opcional)</label>

		<input
			id			= "certificate-teacher"
			type		= "text"
			bind:value={ cert.teacher }
			placeholder	= "Fernando Herrera"
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
		/>
	</div>

	<div class="space-y-2">
		<label for="certificate-description" class="block text-sm font-medium text-text-muted">Descripción del curso</label>

		<input
			id			= "certificate-description"
			type		= "text"
			bind:value={ cert.description }
			placeholder	= "SOLID & DRY & Clean Code"
			class		= "w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
		/>
	</div>
</div>
