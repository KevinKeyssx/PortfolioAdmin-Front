<script lang="ts">
    import { CirclePower } from '@lucide/svelte';

    import Sidebar		from '../../components/Sidebar.svelte';
	import { signOut }	from '$lib/auth-client';
	import { goto }		from '$app/navigation';


	interface Props {
		children : import( 'svelte' ).Snippet;
		data     : {
			user : {
				name  : string;
				email : string;
				image : string | null;
			};
		};
	}


	let { children, data } : Props = $props();


	async function handleLogout(): Promise<void> {
		await signOut();
		goto( '/login' );
	}
</script>


<div class="flex h-screen overflow-hidden">
	<!-- Decorative background -->
	<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
		<div class="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float"></div>
		<div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-primary-light/10 rounded-full blur-[80px] animate-float" style="animation-delay: 4s;"></div>
		<div class="absolute bottom-1/4 left-1/6 w-[250px] h-[250px] bg-accent-light/8 rounded-full blur-[90px]"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary/8 to-transparent rounded-full"></div>
	</div>

	<!-- Sidebar con navegación -->
	<div class="flex flex-col h-full">
		<!-- User info + logout al fondo del sidebar -->
		<div class="glass border-t border-border/30 p-4 flex items-center gap-3">
			{#if data.user.image }
				<img
					src     = { data.user.image }
					alt     = { data.user.name }
					class   = "w-9 h-9 rounded-full ring-2 ring-primary/30 object-cover"
				/>
			{:else}
				<div class="w-9 h-9 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center">
					<span class="text-white text-sm font-bold">{ data.user.name.charAt( 0 ).toUpperCase() }</span>
				</div>
			{/if}

			<div class="flex-1 min-w-0">
				<p class="text-sm font-semibold text-text truncate">{ data.user.name }</p>
				<p class="text-xs text-text-muted truncate">{ data.user.email }</p>
			</div>

			<button
				type        = "button"
				onclick     = { handleLogout }
				class       = "p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all duration-200"
				title       = "Cerrar sesión"
				aria-label  = "Cerrar sesión"
			>
                <CirclePower class="size-5" />
			</button>
		</div>

		<Sidebar />
	</div>

	<!-- Main content del dashboard -->
	<div class="flex-1 h-full flex flex-col overflow-hidden">
		{@render children()}
	</div>
</div>
