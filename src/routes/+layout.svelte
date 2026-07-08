<script lang="ts">
    import '../app.css';
    import QueryProvider            from '../components/QueryProvider.svelte';
    import { SvelteQueryDevtools }  from '@tanstack/svelte-query-devtools';


    let { children } = $props();
</script>


<QueryProvider>
    {@render children()}
    <SvelteQueryDevtools />
</QueryProvider>
