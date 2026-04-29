<script lang="ts">
  import ListaValoresCard from './ListaValoresCard.svelte';
  import ListaValoresForm from './ListaValoresForm.svelte';
  import { listaValoresStore, selectedListaIdStore, setSelectedListaId } from '../lib/store';
  import type { ListaValores } from '../lib/types';

  let showForm = $state(false);
  let editingLista = $state<ListaValores | null>(null);

  function handleSelect(id: number) {
    setSelectedListaId(id);
  }

  function handleEdit(lista: ListaValores) {
    editingLista = lista;
    showForm = true;
  }

  function handleCloseForm() {
    editingLista = null;
    showForm = false;
  }

  function handleNewLista() {
    editingLista = null;
    showForm = true;
  }
</script>

<aside class="w-96 h-full flex flex-col glass border-r border-border/30">
  <!-- Header -->
  <div class="p-6 border-b border-border/30">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-text">Lista de Valores</h2>
        <p class="text-sm text-text-muted mt-1">{$listaValoresStore.length} listas</p>
      </div>
      <button
        onclick={handleNewLista}
        class="p-3 text-white bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:shadow-xl hover:scale-110 transition-all duration-300 ring-1 ring-primary-light/20"
        title="Nueva lista"
        aria-label="Crear nueva lista"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  </div>

  <!-- List -->
  <div class="flex-1 overflow-y-auto p-4 space-y-3">
    {#each $listaValoresStore as lista (lista.id)}
      <ListaValoresCard 
        {lista} 
        selected={$selectedListaIdStore === lista.id}
        onclick={() => handleSelect(lista.id)}
        onedit={() => handleEdit(lista)}
      />
    {/each}

    {#if $listaValoresStore.length === 0}
      <div class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-light flex items-center justify-center">
          <svg class="w-8 h-8 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p class="text-text-muted">No hay listas creadas</p>
        <button
          onclick={handleNewLista}
          class="mt-4 px-4 py-2 text-sm text-primary hover:text-primary-light transition-colors duration-200"
        >
          Crear primera lista
        </button>
      </div>
    {/if}
  </div>
</aside>

<ListaValoresForm 
  bind:open={showForm} 
  lista={editingLista}
  onclose={handleCloseForm}
/>
