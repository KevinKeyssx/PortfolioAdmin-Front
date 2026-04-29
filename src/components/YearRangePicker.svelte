<script lang="ts">
  interface Props {
    value: string;
    onchange?: (value: string) => void;
  }

  let { value = $bindable(''), onchange }: Props = $props();
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - 25 + i);
  
  let startYear = $state('');
  let endYear = $state('');

  $effect(() => {
    if (value) {
      const parts = value.split(' - ');
      startYear = parts[0] || '';
      endYear = parts[1] || '';
    }
  });

  function updateValue() {
    if (startYear && endYear) {
      value = `${startYear} - ${endYear}`;
      onchange?.(value);
    } else if (startYear) {
      value = startYear;
      onchange?.(value);
    }
  }
</script>

<div class="flex items-center gap-3">
  <select
    bind:value={startYear}
    onchange={updateValue}
    class="flex-1 px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer hover:border-primary/30"
  >
    <option value="">Desde</option>
    {#each years as year}
      <option value={year.toString()}>{year}</option>
    {/each}
  </select>
  
  <span class="text-text-muted">-</span>
  
  <select
    bind:value={endYear}
    onchange={updateValue}
    class="flex-1 px-4 py-2.5 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer hover:border-primary/30"
  >
    <option value="">Hasta</option>
    <option value="Actual">Actual</option>
    {#each years as year}
      <option value={year.toString()}>{year}</option>
    {/each}
  </select>
</div>
