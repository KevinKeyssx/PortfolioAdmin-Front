<script lang="ts">
    import { viewModeStore, type ViewMode } from '../lib/store';


    function setView( mode: ViewMode ): void {
        viewModeStore.set( mode );
    }
</script>


<div class="flex items-center bg-surface/40 p-1 rounded-xl border border-border/30 glass-light">
    <button
        onclick     = { () => setView( 'card' ) }
        class       = { `p-2 rounded-lg transition-all duration-300 ${ $viewModeStore === 'card' ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'text-text-muted hover:text-text hover:bg-white/5' }` }
        title       = "Vista Grid"
        aria-label  = "Vista Grid"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect width="7" height="7" x="3" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="3" rx="1"/>
            <rect width="7" height="7" x="14" y="14" rx="1"/>
            <rect width="7" height="7" x="3" y="14" rx="1"/>
        </svg>
    </button>

    <button
        onclick     = { () => setView( 'list' ) }
        class       = { `p-2 rounded-lg transition-all duration-300 ${ $viewModeStore === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'text-text-muted hover:text-text hover:bg-white/5' }` }
        title       = "Vista Lista"
        aria-label  = "Vista Lista"
    >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" x2="21" y1="6" y2="6"/>
            <line x1="8" x2="21" y1="12" y2="12"/>
            <line x1="8" x2="21" y1="18" y2="18"/>
            <line x1="3" x2="3.01" y1="6" y2="6"/>
            <line x1="3" x2="3.01" y1="12" y2="12"/>
            <line x1="3" x2="3.01" y1="18" y2="18"/>
        </svg>
    </button>
</div>
