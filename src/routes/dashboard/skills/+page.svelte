<script lang="ts">
	import MainContent		from '../../../components/MainContent.svelte';
	import SkillTypeFields	from './components/SkillTypeFields.svelte';
	import { SKILL_TYPES }	from '../../../lib/types';
</script>

<svelte:head>
	<title>Skills — Portfolio Admin</title>
</svelte:head>

<MainContent lovId={ 4 } title="Skills">
	{#snippet customFields( { skill } )}
		<SkillTypeFields { skill } options={ [ ...SKILL_TYPES ] } />
	{/snippet}
</MainContent>
