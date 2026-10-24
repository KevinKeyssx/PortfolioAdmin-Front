<script lang="ts">
	interface Props {
		count?	: number;
	}

	let { count = 6 } : Props = $props();

	const items = $derived<number[]>( Array.from( { length : count }, ( _, index ): number => index ) );
</script>

<div class="space-y-3">
	{#each items as item ( item )}
		<div class="p-5 rounded-2xl glass-light border border-border/30 relative overflow-hidden">
			<div class="absolute inset-0 shimmer pointer-events-none"></div>

			<div class="flex items-start gap-4">
				<!-- Icon placeholder -->
				<div class="shrink-0 w-12 h-12 rounded-xl bg-surface-lighter/60"></div>

				<!-- Content placeholder -->
				<div class="flex-1 min-w-0 space-y-2">
					<div class="flex justify-between items-center">
						<div class="h-4 bg-surface-lighter/80 rounded w-24"></div>
						<div class="h-4 bg-surface-lighter/50 rounded-full w-14"></div>
					</div>

					<div class="h-3 bg-surface-lighter/40 rounded w-36"></div>
				</div>
			</div>

			<!-- Bottom row placeholder -->
			<div class="mt-3 pt-2 border-t border-border/30 flex items-center justify-between">
				<div class="h-2.5 bg-surface-lighter/30 rounded w-20"></div>
			</div>
		</div>
	{/each}
</div>
