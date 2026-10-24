<script lang="ts">
	import MainContent			from '../../../components/MainContent.svelte';
	import CertificatesFields	from './components/CertificatesFields.svelte';
</script>

<svelte:head>
	<title>Certificates — Portfolio Admin</title>
</svelte:head>

<MainContent lovId={ 6 } title="Certificates">
	{#snippet customFields( { skill } )}
		<CertificatesFields { skill } />
	{/snippet}
</MainContent>
