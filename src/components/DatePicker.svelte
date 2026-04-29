<script lang="ts">
  interface Props {
    value: string;
    onchange?: (value: string) => void;
  }

  let { value = $bindable(''), onchange }: Props = $props();
  
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - 10 + i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  let selectedMonth = $state('');
  let selectedDay = $state('');
  let selectedYear = $state('');

  $effect(() => {
    if (value) {
      // Parse "Month Day, Year" format
      const match = value.match(/(\w+)\s+(\d+),\s+(\d+)/);
      if (match) {
        selectedMonth = match[1];
        selectedDay = match[2];
        selectedYear = match[3];
      }
    }
  });

  function updateValue() {
    if (selectedMonth && selectedDay && selectedYear) {
      value = `${selectedMonth} ${selectedDay}, ${selectedYear}`;
      onchange?.(value);
    }
  }
</script>

<div class="flex items-center gap-2">
  <select
    bind:value={selectedMonth}
    onchange={updateValue}
    class="flex-1 px-3 py-2.5 bg-surface rounded-xl border border-border/50 text-text text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
  >
    <option value="">Mes</option>
    {#each months as month}
      <option value={month}>{month}</option>
    {/each}
  </select>
  
  <select
    bind:value={selectedDay}
    onchange={updateValue}
    class="w-20 px-3 py-2.5 bg-surface rounded-xl border border-border/50 text-text text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
  >
    <option value="">Día</option>
    {#each days as day}
      <option value={day.toString()}>{day}</option>
    {/each}
  </select>
  
  <select
    bind:value={selectedYear}
    onchange={updateValue}
    class="w-24 px-3 py-2.5 bg-surface rounded-xl border border-border/50 text-text text-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
  >
    <option value="">Año</option>
    {#each years as year}
      <option value={year.toString()}>{year}</option>
    {/each}
  </select>
</div>
