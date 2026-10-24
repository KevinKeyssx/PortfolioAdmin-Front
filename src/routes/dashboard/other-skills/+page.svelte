<script lang="ts">
	import MainContent			from '../../../components/MainContent.svelte';
	import OtherSkillTypeFields	from './components/OtherSkillTypeFields.svelte';
</script>

<svelte:head>
	<title>Other Skills — Portfolio Admin</title>
</svelte:head>

<MainContent lovId={ 5 } title="OtherSkills">
	{#snippet customFields( { skill } )}
		<OtherSkillTypeFields { skill } />
	{/snippet}
</MainContent>
