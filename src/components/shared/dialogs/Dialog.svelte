<script lang="ts">
	import { browser }				from '$app/environment';
	import { Dialog as BitsDialog }	from 'bits-ui';
	import { X }						from '@lucide/svelte';

	interface Props {
		open?			: boolean;
		title?			: string;
		description?	: string;
		maxWidth?		: string;
		children?		: import( 'svelte' ).Snippet;
		onclose?		: () => void;
	}

	let {
		open		= $bindable( false ),
		title		= '',
		description	= '',
		maxWidth	= 'max-w-md',
		children,
		onclose,
	} : Props = $props();

	function handleOpenChange( isOpen : boolean ): void {
		open = isOpen;
		if ( !isOpen ) {
			onclose?.();
		}
	}
</script>

{#if browser }
	<BitsDialog.Root bind:open onOpenChange={ handleOpenChange }>
		<BitsDialog.Portal>
			<BitsDialog.Overlay class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md animate-fade-in" />

			<BitsDialog.Content
				class="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[92vw] { maxWidth } glass rounded-2xl border border-primary/20 p-6 shadow-2xl shadow-black/60 animate-scale-in focus:outline-none"
			>
				<div class="flex items-center justify-between mb-4">
					{#if title }
						<BitsDialog.Title class="text-lg font-bold text-text">
							{ title }
						</BitsDialog.Title>
					{:else}
						<div></div>
					{/if}

					<BitsDialog.Close
						class="p-1.5 text-text-muted hover:text-text hover:bg-surface-lighter/60 rounded-lg transition-colors cursor-pointer"
						aria-label="Cerrar modal"
					>
						<X class="size-4" />
					</BitsDialog.Close>
				</div>

				{#if description }
					<BitsDialog.Description class="text-sm text-text-muted mb-4 leading-relaxed">
						{ description }
					</BitsDialog.Description>
				{/if}

				{#if children }
					{@render children()}
				{/if}
			</BitsDialog.Content>
		</BitsDialog.Portal>
	</BitsDialog.Root>
{/if}
