<script lang="ts">
	import { slide }	from 'svelte/transition';
	import {
		Plus,
		Trash2,
	}					from '@lucide/svelte';

	interface KeyValueItem {
		id		: string;
		key		: string;
		value	: string;
	}

	interface Props {
		value?			: Record<string, unknown>;
		label?			: string;
		description?	: string;
		disabled?		: boolean;
		onchange?		: ( value : Record<string, unknown> ) => void;
	}

	let {
		value			= $bindable( {} ),
		label			= 'Propiedades / Skills',
		description		= 'Define pares de clave y valor para configurar metadatos',
		disabled		= false,
		onchange,
	} : Props = $props();

	let items = $state<KeyValueItem[]>( [] );

	$effect( () => {
		const currentKeys = items.map( ( i ) : string => i.key.trim() ).filter( Boolean );
		const valueKeys = Object.keys( value ?? {} );

		// Only synchronize when keys differ to avoid wiping user typing
		const hasSameKeys = currentKeys.length === valueKeys.length && currentKeys.every( ( k ) : boolean => valueKeys.includes( k ) );

		if ( !hasSameKeys ) {
			items = Object.entries( value ?? {} ).map( ( [ k, v ] ) : KeyValueItem => ( {
				id		: crypto.randomUUID(),
				key		: k,
				value	: typeof v === 'object' && v !== null ? JSON.stringify( v ) : String( v ?? '' ),
			} ) );
		}
	} );

	function parseDynamicValue( raw : string ): unknown {
		const trimmed = raw.trim();

		if ( trimmed.toLowerCase() === 'true' ) return true;
		if ( trimmed.toLowerCase() === 'false' ) return false;
		if ( /^-?\d+(\.\d+)?$/.test( trimmed ) && !isNaN( Number( trimmed ) ) ) {
			return Number( trimmed );
		}

		return raw;
	}

	function emitChange(): void {
		const result : Record<string, unknown> = {};

		for ( const item of items ) {
			const k = item.key.trim();
			if ( k ) {
				result[ k ] = parseDynamicValue( item.value );
			}
		}

		value = result;
		onchange?.( value );
	}

	function handleAddItem(): void {
		if ( disabled ) return;

		items = [
			...items,
			{
				id		: crypto.randomUUID(),
				key		: '',
				value	: '',
			},
		];
	}

	function handleRemoveItem( id : string ): void {
		if ( disabled ) return;

		items = items.filter( ( item ) : boolean => item.id !== id );
		emitChange();
	}

	function handleKeyInput( id : string, newKey : string ): void {
		items = items.map( ( item ) : KeyValueItem =>
			item.id === id ? { ...item, key : newKey } : item
		);
		emitChange();
	}

	function handleValueInput( id : string, newValue : string ): void {
		items = items.map( ( item ) : KeyValueItem =>
			item.id === id ? { ...item, value : newValue } : item
		);
		emitChange();
	}
</script>

<div class="p-4 bg-surface-light/30 rounded-xl border border-border/30 space-y-3">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<span class="block text-sm font-medium text-text">{ label }</span>

			{#if description }
				<p class="text-xs text-text-muted mt-0.5">{ description }</p>
			{/if}
		</div>

		<button
			type		= "button"
			onclick		= { handleAddItem }
			disabled	= { disabled }
			class		= "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:text-primary-light bg-primary/10 hover:bg-primary/20 rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
		>
			<Plus class="size-3.5" />
			<span>Agregar</span>
		</button>
	</div>

	<!-- List -->
	{#if items.length === 0 }
		<div class="py-3 px-4 border border-dashed border-border/40 rounded-xl text-center bg-surface/20">
			<p class="text-xs text-text-muted">
				Sin propiedades configuradas. Haz clic en <span class="text-primary font-medium">Agregar</span> para añadir una clave-valor.
			</p>
		</div>
	{:else}
		<div class="space-y-2.5 max-h-64 overflow-y-auto pr-1">
			{#each items as item ( item.id ) }
				<div
					transition:slide={{ duration : 200 }}
					class="flex items-center gap-2 p-2 bg-surface rounded-xl border border-border/40 hover:border-primary/30 transition-all duration-200 group"
				>
					<div class="flex-1">
						<input
							type		= "text"
							value		= { item.key }
							oninput		= { ( e ) : void => handleKeyInput( item.id, e.currentTarget.value ) }
							placeholder	= "Clave (ej: icon, category)"
							disabled	= { disabled }
							class		= "w-full px-3 py-2 bg-surface-light/50 rounded-lg border border-border/40 text-text text-sm placeholder-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
						/>
					</div>

					<span class="text-text-muted text-xs font-mono">:</span>

					<div class="flex-1">
						<input
							type		= "text"
							value		= { item.value }
							oninput		= { ( e ) : void => handleValueInput( item.id, e.currentTarget.value ) }
							placeholder	= "Valor (ej: react, true, 10)"
							disabled	= { disabled }
							class		= "w-full px-3 py-2 bg-surface-light/50 rounded-lg border border-border/40 text-text text-sm placeholder-text-muted focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all outline-none"
						/>
					</div>

					<button
						type		= "button"
						onclick		= { () : void => handleRemoveItem( item.id ) }
						disabled	= { disabled }
						title		= "Eliminar propiedad"
						aria-label	= "Eliminar propiedad"
						class		= "p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors cursor-pointer shrink-0"
					>
						<Trash2 class="size-4" />
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
