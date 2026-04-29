<script lang="ts">
  import type { PortfolioGithub } from '../../lib/types';
  import { GITHUB_STACK } from '../../lib/types';
  import ButtonGroup from '../ButtonGroup.svelte';

  interface Props {
    github: PortfolioGithub[];
    ongithub?: (github: PortfolioGithub[]) => void;
  }

  let { github = $bindable([]), ongithub }: Props = $props();

  function updateGithub(index: number, field: keyof PortfolioGithub, value: string) {
    github = github.map((g, i) => 
      i === index ? { ...g, [field]: value } : g
    );
    ongithub?.(github);
  }

  function addGithub() {
    github = [...github, { url: '', stack: 'Frontend' }];
    ongithub?.(github);
  }

  function removeGithub(index: number) {
    github = github.filter((_, i) => i !== index);
    ongithub?.(github);
  }
</script>

<div class="space-y-3">
  <div class="flex items-center justify-between">
    <label class="text-sm font-medium text-text-muted">Repositorios GitHub</label>
    <button
      type="button"
      onclick={addGithub}
      class="px-3 py-1.5 text-xs font-medium text-accent hover:text-accent-light bg-accent/10 hover:bg-accent/20 rounded-lg transition-all duration-300"
    >
      + Agregar Repo
    </button>
  </div>
  
  {#each github as repo, index}
    <div class="flex gap-3 items-center p-3 bg-surface-light/50 rounded-xl border border-border/30 animate-fade-in group">
      <input
        type="url"
        value={repo.url}
        oninput={(e) => updateGithub(index, 'url', e.currentTarget.value)}
        placeholder="https://github.com/..."
        class="flex-1 px-3 py-2 bg-surface rounded-lg border border-border/50 text-text text-sm placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
      <ButtonGroup
        options={GITHUB_STACK}
        bind:value={repo.stack}
        onchange={(v) => updateGithub(index, 'stack', v)}
      />
      <button
        type="button"
        onclick={() => removeGithub(index)}
        class="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  {/each}
</div>
