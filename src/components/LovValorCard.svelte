<script lang="ts">
  import type { LovValor, LovType } from '../lib/types';
  import Toggle from './Toggle.svelte';
  import { updateLovValor, deleteLovValor, getListaById } from '../lib/store';

  interface Props {
    lov: LovValor;
    onedit?: () => void;
  }

  let { lov, onedit }: Props = $props();

  const lovType = $derived(() => {
    const lista = getListaById(lov.lov_id);
    return lista?.description as LovType | undefined;
  });

  function handleToggle(checked: boolean) {
    updateLovValor(lov.id, { active: checked });
  }

  function handleDelete(e: MouseEvent) {
    e.stopPropagation();
    if (confirm(`¿Eliminar "${lov.description}"?`)) {
      deleteLovValor(lov.id);
    }
  }

  function handleEdit(e: MouseEvent) {
    e.stopPropagation();
    onedit?.();
  }

  // Get skill display info
  function getSkillInfo(): { label: string; value: string }[] {
    const skill = lov.skill as Record<string, unknown>;
    const type = lovType();
    const info: { label: string; value: string }[] = [];

    if (type === 'Education' || type === 'Employement') {
      if (skill.date) info.push({ label: 'Período', value: skill.date as string });
      if (skill.job) info.push({ label: 'Cargo', value: skill.job as string });
      if (skill.location) info.push({ label: 'Ubicación', value: skill.location as string });
      if (skill.tools) info.push({ label: 'Tools', value: (skill.tools as string[]).join(', ') });
    } else if (type === 'Skills' || type === 'OtherSkills') {
      if (skill.type) info.push({ label: 'Tipo', value: skill.type as string });
    } else if (type === 'Certificates') {
      if (skill.date) info.push({ label: 'Fecha', value: skill.date as string });
      if (skill.teacher) info.push({ label: 'Instructor', value: skill.teacher as string });
    } else if (type === 'Portfolio') {
      if (skill.status) info.push({ label: 'Estado', value: skill.status as string });
      if (skill.technologies) info.push({ label: 'Tech', value: (skill.technologies as string[]).slice(0, 3).join(', ') });
    } else if (type === 'About') {
      if (skill.sort) info.push({ label: 'Orden', value: String(skill.sort) });
      if (skill.items) info.push({ label: 'Items', value: `${(skill.items as unknown[]).length} elementos` });
    }

    return info;
  }

  const skillInfo = $derived(getSkillInfo());

  // Status color mapping
  const statusColors: Record<string, string> = {
    'In Prod' : 'bg-success/20 text-success border border-success/20',
    'In Dev'  : 'bg-warning/20 text-warning border border-warning/20',
    'Beta'    : 'bg-accent/20 text-accent border border-accent/20'
  };
</script>

<div
  class="group relative p-4 glass-light rounded-xl hover:glass transition-all duration-300 hover:shadow-lg hover:shadow-primary/15 hover:scale-[1.01] animate-slide-in overflow-hidden"
  style="animation-delay: {Math.random() * 100}ms"
>
  <!-- Top accent line -->
  <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  <div class="flex items-start gap-4">
    <!-- Thumbnail for Portfolio -->
    {#if lovType() === 'Portfolio' && (lov.skill as Record<string, unknown>).img}
      <div class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-surface">
        <img 
          src={(lov.skill as Record<string, unknown>).img as string} 
          alt={lov.description}
          class="w-full h-full object-cover"
        />
      </div>
    {:else}
      <!-- Icon placeholder -->
      <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center shadow-sm shadow-primary/10">
        <svg class="w-5 h-5 text-primary-light drop-shadow-[0_0_4px_rgba(167,139,250,0.3)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      </div>
    {/if}

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <h4 class="font-medium text-text truncate">{lov.description}</h4>
        {#if lovType() === 'Portfolio'}
          {@const status = (lov.skill as Record<string, unknown>).status as string}
          {#if status}
            <span class="px-2 py-0.5 text-xs font-medium rounded-full {statusColors[status] || 'bg-surface-lighter text-text-muted'}">
              {status}
            </span>
          {/if}
        {/if}
      </div>

      <!-- Skill info badges -->
      {#if skillInfo.length > 0}
        <div class="flex flex-wrap gap-2 mt-2">
          {#each skillInfo as info}
            <span class="inline-flex items-center px-2 py-0.5 text-xs bg-surface rounded-md text-text-muted">
              <span class="font-medium text-primary-light/70 mr-1">{info.label}:</span>
              <span class="truncate max-w-[150px]">{info.value}</span>
            </span>
          {/each}
        </div>
      {/if}

      <!-- Comment -->
      {#if lov.comment}
        <p class="mt-2 text-sm text-text-muted line-clamp-1">{lov.comment}</p>
      {/if}
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1">
      <div onclick={(e) => e.stopPropagation()} class="flex items-center gap-2">
        <Toggle checked={lov.active} onchange={handleToggle} />
      </div>
      <button
        type="button"
        onclick={handleEdit}
        class="p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
        title="Editar"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        type="button"
        onclick={handleDelete}
        class="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
        title="Eliminar"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</div>
