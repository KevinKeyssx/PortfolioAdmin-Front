<script lang="ts">
  interface Props {
    checked: boolean;
    onchange?: (checked: boolean) => void;
    disabled?: boolean;
  }

  let { checked = $bindable(), onchange, disabled = false }: Props = $props();

  function handleChange() {
    if (disabled) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label="Toggle"
  {disabled}
  onclick={handleChange}
  class="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface {checked ? 'bg-gradient-to-r from-primary to-accent' : 'bg-surface-lighter'} {disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg hover:shadow-primary/20'}"
>
  <span
    class="inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out {checked ? 'translate-x-6 scale-110' : 'translate-x-1'}"
  ></span>
</button>
