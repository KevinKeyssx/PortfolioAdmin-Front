<script lang="ts">
	import {
		SquarePen,
		Trash2,
		Loader2,
	}								from '@lucide/svelte';
	import type { ILovParent }		from '$lib/types';
	import { formatDate }			from '$lib/utils/date';

	interface Props {
		lista		: ILovParent;
		route?		: string;
		active?		: boolean;
		itemBadge?	: string | null;
		isDeleting?	: boolean;
		onedit?		: ( lista : ILovParent ) => void;
		ondelete?	: ( lista : ILovParent ) => void;
	}

	let {
		lista,
		route		= '',
		active		= false,
		itemBadge	= null,
		isDeleting	= false,
		onedit,
		ondelete,
	} : Props = $props();

	const icons : Record<string, string> = {
		'About'			: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
		'Education'		: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
		'Employement'	: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		'Skills'		: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
		'OtherSkills'	: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
		'Certificates'	: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
		'Portfolio'		: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
		'Images'		: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
	};

	function handleEdit( e : MouseEvent ): void {
		e.preventDefault();
		e.stopPropagation();
		onedit?.( lista );
	}

	function handleDelete( e : MouseEvent ): void {
		e.preventDefault();
		e.stopPropagation();
		ondelete?.( lista );
	}
</script>

<div class="group relative">
	<a
		href	= "/dashboard/{ route }"
		class	= "block p-5 rounded-2xl transition-all duration-500 ease-out overflow-hidden no-underline relative {
			isDeleting
				? 'opacity-50 pointer-events-none select-none scale-[0.98]'
				: active
					? 'glass shadow-xl shadow-primary/25 ring-1 ring-primary/40 scale-[1.02]'
					: 'glass-light hover:glass hover:shadow-lg hover:shadow-primary/15 hover:scale-[1.01]'
		}"
	>
		<!-- Overlay de eliminación -->
		{#if isDeleting }
			<div class="absolute inset-0 z-30 glass rounded-2xl flex flex-col items-center justify-center gap-2 bg-surface/85 backdrop-blur-xs animate-fade-in">
				<Loader2 class="size-6 text-danger animate-spin" />
				<span class="text-xs font-semibold text-danger">Eliminando lista...</span>
			</div>
		{/if}

		<!-- Top accent line -->
		<div class="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 {
			active && !isDeleting
				? 'opacity-100'
				: 'group-hover:opacity-60'
		}"></div>

		<!-- Glow when active -->
		{#if active && !isDeleting }
			<div class="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/15 via-transparent to-accent/8 animate-pulse-glow -z-10"></div>
		{/if}

		<div class="flex items-start gap-4">
			<!-- Icon -->
			<div class="shrink-0 w-12 h-12 rounded-xl bg-linear-to-br from-primary/30 to-accent/15 flex items-center justify-center group-hover:from-primary/40 group-hover:to-accent/25 transition-all duration-300 shadow-md shadow-primary/10">
				<svg class="w-6 h-6 text-primary-light drop-shadow-[0_0_6px_rgba(167,139,250,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={ icons[ lista.description ] ?? icons[ 'Skills' ] } />
				</svg>
			</div>

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<div class="flex justify-between gap-1 items-center">
					<h3 class="text-lg font-semibold text-text truncate">{ lista.description }</h3>

					{#if itemBadge }
						<span class="w-fit px-2.5 py-0.5 text-xs font-semibold rounded-full bg-linear-to-r from-accent/25 to-accent/15 text-accent-light border border-accent/20">
							{ itemBadge }
						</span>
					{:else if lista.active }
						<span class="w-fit px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
							Activo
						</span>
					{:else}
						<span class="w-fit px-2.5 py-0.5 text-xs font-semibold rounded-full bg-surface-lighter/60 text-text-muted border border-border/30">
							Inactivo
						</span>
					{/if}
				</div>

				{#if lista.comment }
					<p class="mt-1 text-sm text-text-muted line-clamp-2">{ lista.comment }</p>
				{/if}
			</div>
		</div>

		<!-- Bottom row -->
		<div class="mt-3 pt-2 border-t border-border/30 flex items-center justify-between">
			<span class="text-xs text-text-muted">
				Creado: { formatDate( lista.created_at ) }
			</span>

			<!-- Actions -->
			<div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
				<button
					type		= "button"
					onclick		= { handleEdit }
					class		= "p-1.5 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 cursor-pointer"
					aria-label	= "Editar lista"
				>
					<SquarePen class="size-3.5" />
				</button>

				<button
					type		= "button"
					onclick		= { handleDelete }
					class		= "p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200 cursor-pointer"
					aria-label	= "Eliminar lista"
				>
					<Trash2 class="size-3.5" />
				</button>
			</div>
		</div>
	</a>
</div>
