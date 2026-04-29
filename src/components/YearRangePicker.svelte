<script lang="ts">
    interface Props {
        value       : string;
        onchange?   : ( value: string ) => void;
    }


    let {
        value = $bindable(''),
        onchange
    }: Props = $props();


    let startYear   = $state('');
    let endYear     = $state('');


    const currentYear   = new Date().getFullYear();
    const years         = Array.from({ length: 30 }, (_, i) => currentYear - 25 + i);


    $effect(() => {
        if ( !value ) return;

        const [ start, end ] = value.split( ' - ' );

        startYear   = start || '';
        endYear     = end   || '';
    });


    function updateValue() {
        value = startYear && endYear
            ? `${startYear} - ${endYear}`
            : startYear || '';

        onchange?.( value );
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
