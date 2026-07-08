<script lang="ts">
	import { signIn } from '$lib/auth-client';


	let loading	= $state( false );
	let error	= $state<string | null>( null );


	async function handleGoogleLogin(): Promise<void> {
		loading	= true;
		error	= null;

		try {
			await signIn.social( {
				provider    : 'google',
				callbackURL : '/dashboard/about',
			} );
		} catch ( err ) {
			error	= 'Error al iniciar sesión. Inténtalo de nuevo.';
			loading	= false;
		}
	}
</script>


<svelte:head>
	<title>Login — Portfolio Admin</title>
	<meta name="description" content="Acceso privado al panel de administración del portfolio." />
</svelte:head>


<!-- Decorative background -->
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
	<div class="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float"></div>
	<div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-float" style="animation-delay: 2s;"></div>
	<div class="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-primary-light/10 rounded-full blur-[80px] animate-float" style="animation-delay: 4s;"></div>
	<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-primary/8 to-transparent rounded-full"></div>
</div>


<div class="min-h-screen flex items-center justify-center p-6">
	<div class="w-full max-w-md animate-scale-in">

		<!-- Card -->
		<div class="glass rounded-3xl p-10 shadow-2xl shadow-primary/20 ring-1 ring-primary/20">

			<!-- Logo / Icon -->
			<div class="flex justify-center mb-8">
				<div class="w-20 h-20 rounded-2xl bg-linear-to-br from-primary via-primary-dark to-accent flex items-center justify-center shadow-xl shadow-primary/40 ring-2 ring-primary/30">
					<svg class="w-10 h-10 text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
				</div>
			</div>

			<!-- Title -->
			<div class="text-center mb-8">
				<h1 class="text-3xl font-bold text-text mb-2">Panel Privado</h1>
				<p class="text-text-muted">Acceso exclusivo para el administrador del portfolio.</p>
			</div>

			<!-- Error message -->
			{#if error }
				<div class="mb-6 p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger text-sm text-center animate-fade-in">
					{ error }
				</div>
			{/if}

			<!-- Google button -->
			<button
				id          = "btn-google-login"
				type        = "button"
				onclick     = { handleGoogleLogin }
				disabled    = { loading }
				class       = "w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white text-gray-800 font-semibold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
			>
				{#if loading }
					<!-- Spinner -->
					<svg class="w-5 h-5 animate-spin text-gray-500" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
					<span>Conectando con Google...</span>
				{:else}
					<!-- Google logo SVG -->
					<svg class="w-5 h-5" viewBox="0 0 24 24">
						<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
						<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
						<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
						<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
					</svg>
					<span>Continuar con Google</span>
				{/if}
			</button>

			<!-- Footer -->
			<p class="mt-8 text-center text-xs text-text-muted">
				Este panel es privado. Solo el administrador<br />autorizado puede acceder.
			</p>
		</div>

		<!-- Branding -->
		<p class="mt-6 text-center text-sm text-text-muted/60">
			Portfolio Admin &mdash; Panel de Gestión
		</p>
	</div>
</div>
