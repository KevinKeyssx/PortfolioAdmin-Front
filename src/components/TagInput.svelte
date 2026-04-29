<script lang="ts">
    interface Props {
        tags            : string[];
        placeholder?    : string;
        ontags?         : ( tags: string[] ) => void;
    }


    let {
        tags = $bindable([]),
        placeholder = 'Agregar...',
        ontags
    }: Props = $props();


    let inputValue = $state('');


    function handleKeydown(e: KeyboardEvent) {
        if ( e.key === 'Enter' && inputValue.trim() ) {
            e.preventDefault();

            if ( !tags.includes( inputValue.trim() )) {
                tags = [ ...tags, inputValue.trim() ];

                ontags?.( tags );
            }

            inputValue = '';
        } else if ( e.key === 'Backspace' && !inputValue && tags.length > 0 ) {
            tags = tags.slice( 0, -1 );

            ontags?.( tags );
        }
    }


    function removeTag( index: number ) {
        tags = tags.filter(( _, i ) => i !== index );

        ontags?.( tags );
    }
</script>


<div class="flex flex-wrap gap-2 p-3 bg-surface rounded-xl border border-border/50 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all duration-300">
    {#each tags as tag, index}
        <span 
            class="inline-flex items-center gap-1 px-3 py-1 bg-linear-to-r from-primary/20 to-accent/20 text-primary-light rounded-full text-sm animate-scale-in"
        >
            {tag}
        <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
                type="button"
                onclick={() => removeTag(index)}
                class="ml-1 hover:text-danger transition-colors duration-200"
            >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </span>
    {/each}

    <input
        type="text"
        bind:value={inputValue}
        onkeydown={handleKeydown}
        {placeholder}
        class="flex-1 min-w-[120px] bg-transparent border-none outline-none text-text placeholder-text-muted text-sm"
    />
</div>
