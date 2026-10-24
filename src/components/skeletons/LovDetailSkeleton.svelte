<script lang="ts">
	interface Props {
		count?	: number;
		grid?	: boolean;
	}

	let { count = 4, grid = false } : Props = $props();

	const items = $derived<number[]>( Array.from( { length : count }, ( _, index ): number => index ) );
</script>

{#if grid }
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
		{#each items as item ( item )}
			<div class="glass-light rounded-2xl p-5 border border-border/30 relative overflow-hidden flex flex-col justify-between h-52">
				<div class="absolute inset-0 shimmer pointer-events-none"></div>

				<div>
					<div class="flex items-center justify-between mb-3">
						<div class="h-5 bg-surface-lighter/80 rounded-md w-2/3"></div>
						<div class="h-5 bg-surface-lighter/60 rounded-full w-12"></div>
					</div>

					<div class="space-y-2">
						<div class="h-3.5 bg-surface-lighter/60 rounded w-full"></div>
						<div class="h-3.5 bg-surface-lighter/40 rounded w-4/5"></div>
					</div>
				</div>

				<div class="pt-3 border-t border-border/30 flex items-center justify-between">
					<div class="h-3 bg-surface-lighter/40 rounded w-24"></div>
					<div class="flex gap-2">
						<div class="h-6 w-6 bg-surface-lighter/60 rounded-lg"></div>
						<div class="h-6 w-6 bg-surface-lighter/60 rounded-lg"></div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{:else}
	<div class="space-y-4">
		{#each items as item ( item )}
			<div class="glass-light rounded-2xl p-5 border border-border/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div class="absolute inset-0 shimmer pointer-events-none"></div>

				<div class="flex-1 space-y-2.5">
					<div class="flex items-center gap-3">
						<div class="h-5 bg-surface-lighter/80 rounded-md w-48"></div>
						<div class="h-5 bg-accent/15 rounded-full w-16"></div>
					</div>

					<div class="h-3.5 bg-surface-lighter/60 rounded w-3/4 max-w-xl"></div>

					<div class="flex items-center gap-2 pt-1">
						<div class="h-4 bg-surface-lighter/50 rounded-md w-28"></div>
						<div class="h-4 bg-surface-lighter/50 rounded-md w-36"></div>
					</div>
				</div>

				<div class="flex items-center gap-3 shrink-0">
					<div class="h-4 bg-surface-lighter/40 rounded w-20"></div>
					<div class="h-8 w-12 bg-surface-lighter/60 rounded-full"></div>
					<div class="h-8 w-8 bg-surface-lighter/60 rounded-xl"></div>
					<div class="h-8 w-8 bg-surface-lighter/60 rounded-xl"></div>
				</div>
			</div>
		{/each}
	</div>
{/if}
