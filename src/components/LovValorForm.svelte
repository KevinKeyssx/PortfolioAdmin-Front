<!-- svelte-ignore state_referenced_locally -->
<script lang="ts">
	import type { Snippet }		from 'svelte';
	import Modal				from './Modal.svelte';
	import { Active }			from './shared';
	import type { LovValor }	from '../lib/types';
	import {
		useSaveLovValMutation,
		useUpdateLovValMutation,
	}							from '$lib/services/lov.service';

	interface Props {
		open			: boolean;
		lovId			: number;
		lov?			: LovValor | null;
		onclose?		: () => void;
		customFields?	: Snippet<[{ skill : Record<string, unknown> }]>;
	}

	let {
		open			= $bindable( false ),
		lovId,
		lov				= null,
		onclose,
		customFields,
	} : Props = $props();

	let description	= $state( lov?.description ?? '' );
	let active		= $state( lov?.active ?? true );
	let comment		= $state( lov?.comment ?? '' );
	let skill		= $state<Record<string, unknown>>(
		lov?.skill ? ( JSON.parse( JSON.stringify( lov.skill ) ) as Record<string, unknown> ) : {}
	);

	const saveLovValMutation	= useSaveLovValMutation();
	const updateLovValMutation	= useUpdateLovValMutation();

	$effect( () => {
		if ( lov ) {
			description	= lov.description;
			active		= lov.active;
			comment		= lov.comment ?? '';
			skill		= lov.skill ? ( JSON.parse( JSON.stringify( lov.skill ) ) as Record<string, unknown> ) : {};
		} else {
			description	= '';
			active		= true;
			comment		= '';
			skill		= {};
		}
	} );

	function handleSubmit( e : Event ): void {
		e.preventDefault();

		if ( !description.trim() ) return;

		const payload = {
			description	: description.trim(),
			active,
			skill,
			comment		: comment.trim() || null,
		};

		if ( lov ) {
			updateLovValMutation.mutate( {
				id		: lov.id,
				lovId	: lovId,
				payload,
			} );
		} else {
			saveLovValMutation.mutate( {
				lov_id	: lovId,
				...payload,
			} );
		}

		open = false;
		onclose?.();
	}

	function handleClose(): void {
		open = false;
		onclose?.();
	}
</script>

<Modal bind:open title={ lov ? 'Editar Valor' : 'Nuevo Valor' } { onclose }>
	<form onsubmit={ handleSubmit } class="space-y-6">
		<!-- Description / Name -->
		<div class="space-y-2">
			<label for="description" class="block text-sm font-medium text-text-muted">
				Nombre <span class="text-danger">*</span>
			</label>

			<input
				id			= "description"
				type		= "text"
				bind:value={ description }
				required
				placeholder	= "Nombre del valor..."
				class		= "w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
			/>
		</div>

		<!-- Injected custom snippet per dashboard page (below Nombre) -->
		{#if customFields }
			{@render customFields( { skill } )}
		{/if}

		<!-- Active -->
		<Active bind:checked={ active } description="Determina si este valor está visible" />

		<!-- Comment / Description -->
		<div class="space-y-2">
			<label for="comment" class="block text-sm font-medium text-text-muted">
				Comentario
			</label>

			<textarea
				id			= "comment"
				bind:value={ comment }
				rows		= "3"
				placeholder	= "Descripción opcional..."
				class		= "w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
			></textarea>
		</div>

		<!-- Actions -->
		<div class="flex gap-3 pt-4">
			<button
				type	= "button"
				onclick	= { handleClose }
				class	= "flex-1 px-6 py-3 text-text-muted hover:text-text bg-surface-light hover:bg-surface-lighter rounded-xl font-medium transition-all duration-300 cursor-pointer"
			>
				Cancelar
			</button>

			<button
				type	= "submit"
				class	= "flex-1 px-6 py-3 text-white bg-linear-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary rounded-xl font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
			>
				{ lov ? 'Guardar Cambios' : 'Crear Valor' }
			</button>
		</div>
	</form>
</Modal>
