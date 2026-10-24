<script lang="ts">
	import {
		Trash2,
		AlertTriangle,
		Info,
		Loader2,
	}				from '@lucide/svelte';
	import Dialog	from './Dialog.svelte';

	interface Props {
		open?			: boolean;
		title			: string;
		description		: string;
		confirmText?	: string;
		cancelText?		: string;
		variant?		: 'danger' | 'warning' | 'info';
		loading?		: boolean;
		onconfirm		: () => void;
		oncancel?		: () => void;
	}

	let {
		open		= $bindable( false ),
		title,
		description,
		confirmText	= 'Eliminar',
		cancelText	= 'Cancelar',
		variant		= 'danger',
		loading		= false,
		onconfirm,
		oncancel,
	} : Props = $props();

	function handleCancel(): void {
		open = false;
		oncancel?.();
	}

	function handleConfirm(): void {
		onconfirm();
	}
</script>

<Dialog bind:open maxWidth="max-w-md" onclose={ handleCancel }>
	<div class="flex flex-col items-center text-center">
		<!-- Icon Badge -->
		{#if variant === 'danger' }
			<div class="w-14 h-14 rounded-2xl bg-danger/15 text-danger border border-danger/30 flex items-center justify-center mb-4 shadow-lg shadow-danger/20">
				<Trash2 class="size-7" />
			</div>
		{:else if variant === 'warning' }
			<div class="w-14 h-14 rounded-2xl bg-warning/15 text-warning border border-warning/30 flex items-center justify-center mb-4 shadow-lg shadow-warning/20">
				<AlertTriangle class="size-7" />
			</div>
		{:else}
			<div class="w-14 h-14 rounded-2xl bg-primary/15 text-primary border border-primary/30 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
				<Info class="size-7" />
			</div>
		{/if}

		<!-- Title -->
		<h3 class="text-xl font-bold text-text mb-2">
			{ title }
		</h3>

		<!-- Description -->
		<p class="text-sm text-text-muted mb-6 leading-relaxed max-w-sm">
			{ description }
		</p>

		<!-- Action Buttons -->
		<div class="flex items-center gap-3 w-full">
			<button
				type		= "button"
				onclick		= { handleCancel }
				disabled	= { loading }
				class		= "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:text-text bg-surface-light hover:bg-surface-lighter border border-border/30 transition-all duration-200 cursor-pointer disabled:opacity-50"
			>
				{ cancelText }
			</button>

			<button
				type		= "button"
				onclick		= { handleConfirm }
				disabled	= { loading }
				class		= "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed {
					variant === 'danger'
						? 'bg-linear-to-r from-danger to-rose-600 hover:from-danger-light hover:to-danger shadow-danger/30 hover:shadow-danger/50'
						: 'bg-linear-to-r from-primary to-accent hover:from-primary-light hover:to-accent shadow-primary/30'
				}"
			>
				{#if loading }
					<Loader2 class="size-4 animate-spin" />
					<span>Procesando...</span>
				{:else}
					<span>{ confirmText }</span>
				{/if}
			</button>
		</div>
	</div>
</Dialog>
