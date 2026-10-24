<script lang="ts">
	import {
        ChevronDown,
		Check,
	}                               from '@lucide/svelte';
    import { Select as BitsSelect }	from 'bits-ui';

	export interface SelectOption {
		value		: string;
		label		: string;
		disabled?	: boolean;
	}

	interface Props {
		value?			: string;
		items?			: readonly ( SelectOption | string | number )[];
		placeholder?	: string;
		disabled?		: boolean;
		class?			: string;
		id?				: string;
		onchange?		: ( value : string ) => void;
	}

	let {
		value			= $bindable( '' ),
		items			= [],
		placeholder		= 'Seleccionar...',
		disabled		= false,
		class: className = '',
		id,
		onchange,
	} : Props = $props();

	const normalizedItems = $derived<SelectOption[]>(
		items.map( ( item ) : SelectOption => {
			if ( typeof item === 'object' && item !== null && 'value' in item ) {
				return {
					value		: String( item.value ),
					label		: String( item.label ?? item.value ),
					disabled	: Boolean( item.disabled ),
				};
			}

			return {
				value		: String( item ),
				label		: String( item ),
				disabled	: false,
			};
		} )
	);

	function handleValueChange( nextValue : string ): void {
		value = nextValue;
		onchange?.( nextValue );
	}
</script>

<BitsSelect.Root
	type			= "single"
	bind:value		= { value }
	disabled		= { disabled }
	onValueChange	= { handleValueChange }
	items			= { normalizedItems }
>
	<BitsSelect.Trigger
		{ id }
		class="flex items-center justify-between w-full px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text text-sm placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/30 group outline-none { className }"
	>
		<BitsSelect.Value { placeholder } class="truncate font-normal" />

		<ChevronDown class="size-4 text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0 ml-2" />
	</BitsSelect.Trigger>

	<BitsSelect.Portal>
		<BitsSelect.Content
			class="z-50 min-w-(--bits-select-anchor-width) max-h-60 overflow-hidden p-1.5 rounded-xl border border-border/50 bg-surface/95 backdrop-blur-xl shadow-2xl shadow-black/80 animate-scale-in text-text"
			sideOffset={ 4 }
		>
			<BitsSelect.Viewport class="p-1 max-h-56 overflow-y-auto space-y-0.5">
				{#each normalizedItems as item ( item.value ) }
					<BitsSelect.Item
						value		= { item.value }
						label		= { item.label }
						disabled	= { item.disabled }
						class		= "relative flex items-center justify-between px-3 py-2 rounded-lg text-sm text-text hover:bg-surface-light focus:bg-surface-light focus:text-primary transition-colors cursor-pointer data-selected:text-primary data-selected:font-medium data-highlighted:bg-surface-lighter/50 outline-none select-none"
					>
						{#snippet children( { selected } )}
							<span class="truncate">{ item.label }</span>

							{#if selected }
								<Check class="size-4 text-primary shrink-0 ml-2" />
							{/if}
						{/snippet}
					</BitsSelect.Item>
				{/each}
			</BitsSelect.Viewport>
		</BitsSelect.Content>
	</BitsSelect.Portal>
</BitsSelect.Root>
