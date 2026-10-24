<script lang="ts">
	import {
		Active,
		KeyValueEditor,
	}							from './shared';
	import Modal				from './Modal.svelte';
	import type { ILovParent }	from '$lib/types';
	import {
		useSaveLovMutation,
		useUpdateLovMutation,
	}							from '$lib/services/lov.service';

	interface Props {
		open		: boolean;
		lista?		: ILovParent | null;
		onclose?	: () => void;
	}

	let {
		open		= $bindable( false ),
		lista		= null,
		onclose,
	} : Props = $props();

	let description	= $state( '' );
	let active		= $state( true );
	let comment		= $state( '' );
	let skill		= $state<Record<string, unknown>>( {} );

	const saveMutation		= useSaveLovMutation();
	const updateMutation	= useUpdateLovMutation();

	$effect( () => {
		if ( lista ) {
			description	= lista.description;
			active		= lista.active;
			comment		= lista.comment ?? '';
			skill		= lista.skill ? { ...( lista.skill as Record<string, unknown> ) } : {};
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
			skill		: Object.keys( skill ).length > 0 ? skill : {},
			comment		: comment.trim() || null,
		};

		if ( lista ) {
			updateMutation.mutate( {
				id		: lista.id,
				payload,
			} );
		} else {
			saveMutation.mutate( payload );
		}

		open = false;
		onclose?.();
	}

	function handleClose(): void {
		open = false;
		onclose?.();
	}
</script>

<Modal bind:open title={ lista ? 'Editar Lista de Valores' : 'Nueva Lista de Valores' } { onclose }>
	<form onsubmit={ handleSubmit } class="space-y-6">
		<!-- Description -->
		<div class="space-y-2">
			<label for="description" class="block text-sm font-medium text-text-muted">
				Nombre <span class="text-danger">*</span>
			</label>

			<input
				id			= "description"
				type		= "text"
				bind:value={ description }
				required
				placeholder	= "Ej: Skills, Education, Portfolio..."
				class		= "w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
			/>
		</div>

		<!-- Skills / Key-Value Editor -->
		<KeyValueEditor
			bind:value	= { skill }
			label		= "Propiedades / Skills"
			description	= "Define atributos clave-valor para esta lista"
		/>

		<!-- Active -->
		<Active bind:checked={ active } description="Determina si esta lista está visible" />

		<!-- Comment -->
		<div class="space-y-2">
			<label for="comment" class="block text-sm font-medium text-text-muted">
				Comentario
			</label>

			<textarea
				id			= "comment"
				bind:value={ comment }
				rows		= "3"
				placeholder	= "Descripción opcional de esta lista..."
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
				{ lista ? 'Guardar Cambios' : 'Crear Lista' }
			</button>
		</div>
	</form>
</Modal>
