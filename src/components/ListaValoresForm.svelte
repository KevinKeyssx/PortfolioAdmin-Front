<script lang="ts">
  import Toggle from './Toggle.svelte';
  import Modal from './Modal.svelte';
  import type { ListaValores } from '../lib/types';
  import { addListaValor, updateListaValor } from '../lib/store';

  interface Props {
    open: boolean;
    lista?: ListaValores | null;
    onclose?: () => void;
  }

  let { open = $bindable(false), lista = null, onclose }: Props = $props();

  let description = $state('');
  let active = $state(true);
  let skill = $state('{}');
  let comment = $state('');

  $effect(() => {
    if (lista) {
      description = lista.description;
      active = lista.active;
      skill = lista.skill;
      comment = lista.comment;
    } else {
      description = '';
      active = true;
      skill = '{}';
      comment = '';
    }
  });

  function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!description.trim()) return;

    if (lista) {
      updateListaValor(lista.id, { description, active, skill, comment });
    } else {
      addListaValor({ description, active, skill, comment });
    }

    open = false;
    onclose?.();
  }

  function handleClose() {
    open = false;
    onclose?.();
  }
</script>

<Modal bind:open title={lista ? 'Editar Lista de Valores' : 'Nueva Lista de Valores'} {onclose}>
  <form onsubmit={handleSubmit} class="space-y-6">
    <!-- Description -->
    <div class="space-y-2">
      <label for="description" class="block text-sm font-medium text-text-muted">
        Nombre <span class="text-danger">*</span>
      </label>
      <input
        id="description"
        type="text"
        bind:value={description}
        required
        placeholder="Ej: Skills, Education, Portfolio..."
        class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
    </div>

    <!-- Active -->
    <div class="flex items-center justify-between p-4 bg-surface-light/50 rounded-xl">
      <div>
        <label class="block text-sm font-medium text-text">Activo</label>
        <p class="text-xs text-text-muted mt-0.5">Determina si esta lista está visible</p>
      </div>
      <Toggle bind:checked={active} />
    </div>

    <!-- Skill (JSON) -->
    <div class="space-y-2">
      <label for="skill" class="block text-sm font-medium text-text-muted">
        Skill (JSON)
      </label>
      <input
        id="skill"
        type="text"
        bind:value={skill}
        placeholder={'{}'}
        class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text font-mono text-sm placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
    </div>

    <!-- Comment -->
    <div class="space-y-2">
      <label for="comment" class="block text-sm font-medium text-text-muted">
        Comentario
      </label>
      <textarea
        id="comment"
        bind:value={comment}
        rows="3"
        placeholder="Descripción opcional de esta lista..."
        class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
      ></textarea>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 pt-4">
      <button
        type="button"
        onclick={handleClose}
        class="flex-1 px-6 py-3 text-text-muted hover:text-text bg-surface-light hover:bg-surface-lighter rounded-xl font-medium transition-all duration-300"
      >
        Cancelar
      </button>
      <button
        type="submit"
        class="flex-1 px-6 py-3 text-white bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-primary rounded-xl font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.02]"
      >
        {lista ? 'Guardar Cambios' : 'Crear Lista'}
      </button>
    </div>
  </form>
</Modal>
