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
		lovType?		: string;
		onclose?		: () => void;
		customFields?	: Snippet<[{ skill : Record<string, unknown> }]>;
	}

	let {
		open			= $bindable( false ),
		lovId,
		lov				= null,
		lovType,
		onclose,
		customFields,
	} : Props = $props();

	function getDefaultSkill( targetLovId : number, targetLovType? : string ): Record<string, unknown> {
		if ( targetLovId === 7 || targetLovType === 'Portfolio' ) {
			return {
				img				: '',
				url				: '',
				github			: [],
				status			: 'In Prod',
				technologies	: [],
			};
		}

		return {};
	}

	function createSkillPayload(
		baseSkill?		: Record<string, unknown> | null,
		targetLovId		: number = lovId,
		targetLovType?	: string = lovType
	): Record<string, unknown> {
		const defaults = getDefaultSkill( targetLovId, targetLovType );

		if ( !baseSkill || Object.keys( baseSkill ).length === 0 ) {
			return defaults;
		}

		return {
			...defaults,
			...JSON.parse( JSON.stringify( baseSkill ) ),
		};
	}

	let description		= $state( lov?.description ?? '' );
	let active			= $state( lov?.active ?? true );
	let comment			= $state( lov?.comment ?? '' );
	let skill			= $state<Record<string, unknown>>(
		createSkillPayload( ( lov?.skill as Record<string, unknown> ) ?? null, lovId, lovType )
	);
	let previewError	= $state( false );
	let prevLov			= $state<LovValor | null | undefined>( lov );

	const isImagesLov = $derived( lovType === 'Images' || lovId === 8 );

	const saveLovValMutation	= useSaveLovValMutation();
	const updateLovValMutation	= useUpdateLovValMutation();

	$effect( (): void => {
		if ( lov !== prevLov ) {
			prevLov = lov;

			if ( lov ) {
				description		= lov.description;
				active			= lov.active;
				comment			= lov.comment ?? '';
				skill			= createSkillPayload( ( lov.skill as Record<string, unknown> ) ?? null, lovId, lovType );
				previewError	= false;
			} else {
				description		= '';
				active			= true;
				comment			= '';
				skill			= getDefaultSkill( lovId, lovType );
				previewError	= false;
			}
		}
	} );

	function handleCommentInput(): void {
		previewError = false;
	}

	function handlePreviewError(): void {
		previewError = true;
	}

	function handleSubmit( e : Event ): void {
		e.preventDefault();

		if ( !description.trim() ) return;
		if ( isImagesLov && !comment.trim() ) return;

		const finalSkill = ( lovId === 7 || lovType === 'Portfolio' )
			? {
				img				: ( skill.img as string ) ?? '',
				url				: ( skill.url as string ) ?? '',
				github			: Array.isArray( skill.github ) ? skill.github : [],
				status			: ( skill.status as string ) || 'In Prod',
				technologies	: Array.isArray( skill.technologies ) ? skill.technologies : [],
			}
			: skill;

		const payload = {
			description	: description.trim(),
			active,
			skill		: finalSkill,
			comment		: comment.trim() || null,
		};

		if ( lov ) {
			updateLovValMutation.mutate({
				id		: lov.id,
				lovId	: lovId,
				payload,
			});
		} else {
			saveLovValMutation.mutate({
				lov_id	: lovId,
				...payload,
			});
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
				bind:value	= { description }
				required
				placeholder	= "Nombre del valor..."
				class		= "w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
			/>
		</div>

		<!-- Injected custom snippet per dashboard page (below Nombre) -->
		{#if customFields }
			{@render customFields({ skill })}
		{/if}

		<!-- Active -->
		<Active bind:checked={ active } description="Determina si este valor está visible" />

		<!-- Comment / Image URL -->
		<div class="space-y-2">
			<div class="flex items-center justify-between">
				<label for="comment" class="block text-sm font-medium text-text-muted">
					{#if isImagesLov }
						URL de la Imagen <span class="text-danger">*</span>
					{:else}
						Comentario
					{/if}
				</label>

				{#if isImagesLov && comment.trim() && !previewError }
					<a
						href	= { comment.trim() }
						target	= "_blank"
						rel		= "noopener noreferrer"
						class	= "text-xs text-primary-light hover:text-primary flex items-center gap-1 transition-colors cursor-pointer"
					>
						<span>Abrir original</span>
						<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
						</svg>
					</a>
				{/if}
			</div>

			{#if isImagesLov }
				<input
					id			= "comment"
					type		= "url"
					bind:value	= { comment }
					required
					placeholder	= "https://res.cloudinary.com/... o enlace de imagen"
					class		= "w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
					oninput		= { handleCommentInput }
				/>
			{:else}
				<textarea
					id			= "comment"
					bind:value	= { comment }
					rows		= "3"
					placeholder	= "Descripción opcional..."
					class		= "w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
				></textarea>
			{/if}

			<!-- Image Live Preview for Images -->
			{#if isImagesLov }
				<div class="mt-3">
					<span class="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
						Previsualización
					</span>

					{#if comment.trim() }
						<div class="relative w-full h-48 rounded-xl overflow-hidden bg-surface-light/40 border border-border/50 flex items-center justify-center group/preview transition-all duration-300">
							{#if !previewError }
								<img
									src		= { comment.trim() }
									alt		= "Previsualización"
									class	= "w-full h-full object-contain p-2 transition-transform duration-300 group-hover/preview:scale-[1.02]"
									onerror	= { handlePreviewError }
								/>

								<div class="absolute bottom-2 right-2 px-2.5 py-1 bg-surface/80 backdrop-blur-md rounded-lg border border-white/10 text-[11px] text-text-muted font-medium shadow-md">
									Vista previa
								</div>
							{:else}
								<div class="flex flex-col items-center justify-center p-6 text-center text-danger/80 gap-2">
									<div class="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center text-danger">
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
										</svg>
									</div>

									<p class="text-xs font-medium">No se pudo cargar la imagen</p>
									<p class="text-[11px] text-text-muted max-w-xs">Verifica que la URL sea válida y de acceso público.</p>
								</div>
							{/if}
						</div>
					{:else}
						<div class="w-full h-36 rounded-xl border-2 border-dashed border-border/60 bg-surface/30 flex flex-col items-center justify-center gap-2 text-text-muted p-4 text-center">
							<div class="w-10 h-10 rounded-full bg-surface-light/50 flex items-center justify-center text-text-muted/60">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>

							<p class="text-xs">Pega una URL de imagen arriba para ver la previsualización</p>
						</div>
					{/if}
				</div>
			{/if}
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
