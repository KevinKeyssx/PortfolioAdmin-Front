<script lang="ts">
	import MainContent		from '../../../components/MainContent.svelte';
	import PortfolioFields	from './components/PortfolioFields.svelte';
</script>

<svelte:head>
	<title>Portfolio — Portfolio Admin</title>
</svelte:head>

<MainContent lovId={ 7 } title="Portfolio">
	{#snippet customFields( { skill } )}
		<PortfolioFields { skill } />
	{/snippet}
</MainContent>
