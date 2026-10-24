<script lang="ts">
	import {
		Select,
		type SelectOption,
	}							from '../../../../components/shared';
	import { SKILL_TYPES }		from '../../../../lib/types';
	import type { TechSkill }	from '../../../../lib/types/skills/tech-skills';

	interface Props {
		skill		: Record<string, unknown>;
		options?	: readonly ( string | SelectOption )[];
	}

	let {
		skill,
		options	= SKILL_TYPES,
	} : Props = $props();

	// svelte-ignore state_referenced_locally
	const techSkill = skill as unknown as TechSkill;

	if ( techSkill.type === undefined ) {
		techSkill.type = '';
	}
</script>

<div class="space-y-2">
	<label for="skill-type" class="block text-sm font-medium text-text-muted">Tipo</label>

	<Select
		id			= "skill-type"
		bind:value	= { techSkill.type }
		items		= { options }
		placeholder	= "Seleccionar tipo..."
	/>
</div>
