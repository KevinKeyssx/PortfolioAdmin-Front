<script lang="ts">
	import SkillTypeFields from '../../skills/components/SkillTypeFields.svelte';
	import { OTHER_SKILL_TYPES } from '../../../../lib/types/skills/other-skills';

	interface Props {
		skill : Record<string, unknown>;
	}

	let { skill } : Props = $props();
</script>

<SkillTypeFields { skill } options={ [ ...OTHER_SKILL_TYPES ] } />
