<script lang="ts">
	import MainContent			from '../../../components/MainContent.svelte';
	import EmployementFields	from './components/EmployementFields.svelte';
</script>

<svelte:head>
	<title>Employement — Portfolio Admin</title>
</svelte:head>

<MainContent lovId={ 3 } title="Employement">
	{#snippet customFields( { skill } )}
		<EmployementFields { skill } />
	{/snippet}
</MainContent>
