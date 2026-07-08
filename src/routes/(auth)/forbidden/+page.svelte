<svelte:head>
    <title>Acceso Denegado — Portfolio Admin</title>
    <meta name="description" content="No tienes permiso para acceder a este panel." />
</svelte:head>


<!-- Decorative background -->
<div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div class="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-danger/10 rounded-full blur-[120px] animate-float"></div>
    <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-float" style="animation-delay: 2s;"></div>
</div>


<div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-md text-center animate-scale-in">

        <!-- Card -->
        <div class="glass rounded-3xl p-10 shadow-2xl shadow-danger/10 ring-1 ring-danger/20">

            <!-- Icon -->
            <div class="flex justify-center mb-8">
                <div class="w-20 h-20 rounded-2xl bg-linear-to-br from-danger/80 to-danger/40 flex items-center justify-center shadow-xl shadow-danger/30">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                </div>
            </div>

            <!-- Content -->
            <div class="mb-8">
                <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-danger/20 text-danger border border-danger/30 mb-4">
                    403 Forbidden
                </span>

                <h1 class="text-3xl font-bold text-text mb-3">Acceso Denegado</h1>

                <p class="text-text-muted leading-relaxed">
                    Este panel es privado y solo el administrador<br />
                    autorizado puede acceder. Tu cuenta no tiene<br />
                    los permisos necesarios.
                </p>
            </div>

            <!-- Back button -->
            <a
                href    = "/login"
                id      = "btn-back-login"
                class   = "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300 no-underline"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver al Login
            </a>
        </div>
    </div>
</div>
