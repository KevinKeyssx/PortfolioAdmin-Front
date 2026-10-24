<script lang="ts">
	import '../app.css';
	import { Toaster }				from 'svelte-french-toast';
	import QueryProvider			from '../components/QueryProvider.svelte';
	import { SvelteQueryDevtools }	from '@tanstack/svelte-query-devtools';

	let { children } = $props();
</script>

<QueryProvider>
	{@render children()}
	<Toaster position="bottom-right" />
	<SvelteQueryDevtools />
</QueryProvider>
