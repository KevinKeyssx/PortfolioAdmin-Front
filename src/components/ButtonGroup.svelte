<script lang="ts">
    interface Props {
        options     : readonly string[];
        value       : string;
        onchange?   : ( value: string ) => void;
    }

    let { options, value = $bindable(''), onchange }: Props = $props();
</script>

<div class="inline-flex rounded-xl overflow-hidden border border-border/50 bg-surface">
    {#each options as option, index}
        <button
            type="button"
            onclick={() => { value = option; onchange?.(option); }}
            class="px-4 py-2 text-sm font-medium transition-all duration-300 {value === option 
                ? 'bg-linear-to-r from-primary to-primary-dark text-white shadow-lg shadow-primary/30' 
                : 'text-text-muted hover:text-text hover:bg-surface-light'} {index > 0 ? 'border-l border-border/50' : ''}"
        >
            {option}
        </button>
    {/each}
</div>
