<script lang="ts">
  import type { AboutMeItem } from '../../lib/types';

  interface Props {
    items: AboutMeItem[];
    onitems?: (items: AboutMeItem[]) => void;
  }

  let { items = $bindable([]), onitems }: Props = $props();

  function updateItem(index: number, field: 'text' | 'label', value: string) {
    items = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    onitems?.(items);
  }

  function addItem() {
    items = [...items, { text: '', label: '' }];
    onitems?.(items);
  }

  function removeItem(index: number) {
    items = items.filter((_, i) => i !== index);
    onitems?.(items);
  }
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between">
    <h4 class="text-sm font-medium text-text-muted">Items de Información</h4>
    <button
      type="button"
      onclick={addItem}
      class="px-3 py-1.5 text-xs font-medium text-accent hover:text-accent-light bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300"
    >
      + Agregar Item
    </button>
  </div>
  
  <div class="space-y-3 max-h-[300px] overflow-y-auto pr-2">
    {#each items as item, index}
      <div class="flex gap-3 items-start p-3 bg-surface-light/50 rounded-xl border border-border/30 animate-fade-in group">
        <div class="flex-1 space-y-2">
          <input
            type="text"
            value={item.label}
            oninput={(e) => updateItem(index, 'label', e.currentTarget.value)}
            placeholder="Etiqueta (ej: Localidad)"
            class="w-full px-3 py-2 bg-surface rounded-lg border border-border/50 text-text text-sm placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
          <input
            type="text"
            value={item.text}
            oninput={(e) => updateItem(index, 'text', e.currentTarget.value)}
            placeholder="Valor (ej: Santiago, Chile)"
            class="w-full px-3 py-2 bg-surface rounded-lg border border-border/50 text-text text-sm placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <button
          type="button"
          onclick={() => removeItem(index)}
          class="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    {/each}
  </div>
</div>
