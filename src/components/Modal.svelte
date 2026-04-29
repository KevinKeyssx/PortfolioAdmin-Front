<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    title: string;
    onclose?: () => void;
    children?: Snippet;
  }

  let { open = $bindable(false), title, onclose, children }: Props = $props();

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      open = false;
      onclose?.();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      open = false;
      onclose?.();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full max-w-2xl max-h-[90vh] overflow-hidden glass rounded-2xl shadow-2xl shadow-primary/10 animate-scale-in">
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-border/30">
        <h2 class="text-xl font-semibold text-text">{title}</h2>
        <button
          type="button"
          onclick={() => { open = false; onclose?.(); }}
          class="p-2 text-text-muted hover:text-text hover:bg-surface-light rounded-lg transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
        {#if children}
          {@render children()}
        {/if}
      </div>
    </div>
  </div>
{/if}
