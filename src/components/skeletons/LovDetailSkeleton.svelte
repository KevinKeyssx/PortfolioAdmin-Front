<script lang="ts">
	interface Props {
		count?		: number;
		grid?		: boolean;
		container?	: boolean;
	}

	let {
		count		= 4,
		grid		= false,
		container	= true,
	} : Props = $props();

	const items = $derived<number[]>( Array.from( { length : count }, ( _, index : number ): number => index ) );
</script>

{#snippet gridCard()}
	<div class="glass-light rounded-2xl p-5 border border-white/5 relative overflow-hidden flex flex-col justify-between min-h-47.5 h-full w-full">
		<div class="absolute inset-0 shimmer pointer-events-none"></div>

		<!-- Top row: Icon box + ID pill placeholder -->
		<div class="flex items-center justify-between mb-4">
			<div class="w-10 h-10 rounded-xl bg-surface-lighter/60"></div>
			<div class="h-4 bg-surface-lighter/40 rounded-md w-14"></div>
		</div>

		<!-- Title & Subtitle placeholder -->
		<div class="flex-1 space-y-2 mb-4">
			<div class="h-5 bg-surface-lighter/80 rounded-md w-3/4"></div>
			<div class="h-3.5 bg-surface-lighter/40 rounded w-1/2"></div>
		</div>

		<!-- Footer: Actions + Toggle switch placeholder -->
		<div class="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
			<div class="h-4 bg-surface-lighter/30 rounded w-16"></div>
			<div class="h-6 w-11 bg-surface-lighter/60 rounded-full"></div>
		</div>
	</div>
{/snippet}

{#snippet listItem()}
	<div class="glass-light rounded-xl p-4 border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
		<div class="absolute inset-0 shimmer pointer-events-none"></div>

		<div class="flex-1 space-y-2.5">
			<div class="flex items-center gap-3">
				<div class="w-8 h-8 rounded-lg bg-surface-lighter/60 shrink-0"></div>
				<div class="h-5 bg-surface-lighter/80 rounded-md w-48"></div>
				<div class="h-4 bg-surface-lighter/40 rounded-md w-14"></div>
			</div>

			<div class="h-3.5 bg-surface-lighter/50 rounded w-3/4 max-w-xl pl-11"></div>
		</div>

		<div class="flex items-center gap-3 shrink-0">
			<div class="h-4 bg-surface-lighter/40 rounded w-20"></div>
			<div class="h-6 w-11 bg-surface-lighter/60 rounded-full"></div>
			<div class="h-8 w-8 bg-surface-lighter/40 rounded-xl"></div>
			<div class="h-8 w-8 bg-surface-lighter/40 rounded-xl"></div>
		</div>
	</div>
{/snippet}

{#if container }
	{#if grid }
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each items as item ( item )}
				{@render gridCard()}
			{/each}
		</div>
	{:else}
		<div class="grid gap-3">
			{#each items as item ( item )}
				{@render listItem()}
			{/each}
		</div>
	{/if}
{:else}
	{#each items as item ( item )}
		{#if grid }
			{@render gridCard()}
		{:else}
			{@render listItem()}
		{/if}
	{/each}
{/if}
