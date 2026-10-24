<script lang="ts">
	import MainContent		from '../../../components/MainContent.svelte';
	import EducationFields	from './components/EducationFields.svelte';
</script>

<svelte:head>
	<title>Education — Portfolio Admin</title>
</svelte:head>

<MainContent lovId={ 2 } title="Education">
	{#snippet customFields( { skill } )}
		<EducationFields { skill } />
	{/snippet}
</MainContent>
