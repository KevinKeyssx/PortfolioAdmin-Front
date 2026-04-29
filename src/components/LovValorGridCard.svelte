<script lang="ts">
    import type { LovValor, LovType } from '../lib/types';
    import Toggle                     from './Toggle.svelte';
    import {
        updateLovValor,
        deleteLovValor,
        getListaById
    }                                 from '../lib/store';


    interface Props {
        lov     : LovValor;
        onedit? : () => void;
    }


    let { lov, onedit }: Props = $props();


    const lovType = $derived(() => {
        const lista = getListaById( lov.lov_id );
        return lista?.description as LovType | undefined;
    });


    function handleToggle( checked: boolean ) {
        updateLovValor( lov.id, { active: checked } );
    }


    function handleDelete( e: MouseEvent ) {
        e.stopPropagation();
        if ( confirm( `¿Eliminar "${ lov.description }"?` ) ) {
            deleteLovValor( lov.id );
        }
    }


    function handleEdit( e: MouseEvent ) {
        e.stopPropagation();
        onedit?.();
    }


    function getSkillInfo(): { label: string; value: string }[] {
        const skill = lov.skill as Record<string, unknown>;
        const type  = lovType();
        const info  : { label: string; value: string }[] = [];

        if ( type === 'Education' || type === 'Employement' ) {
            if ( skill.date ) info.push({ label: 'Período', value: skill.date as string });
            if ( skill.location ) info.push({ label: 'Ubicación', value: ( skill.location as string ).split( ',' )[0] });
        } else if ( type === 'Skills' || type === 'OtherSkills' ) {
            if ( skill.type ) info.push({ label: 'Tipo', value: skill.type as string });
        } else if ( type === 'Certificates' ) {
            if ( skill.date ) info.push({ label: 'Fecha', value: skill.date as string });
        } else if ( type === 'Portfolio' ) {
            if ( skill.status ) info.push({ label: 'Estado', value: skill.status as string });
        }

        return info.slice( 0, 2 );
    }


    const skillInfo = $derived( getSkillInfo() );


    const statusColors: Record<string, string> = {
        'In Prod' : 'bg-success/20 text-success border border-success/20',
        'In Dev'  : 'bg-warning/20 text-warning border border-warning/20',
        'Beta'    : 'bg-accent/20 text-accent border border-accent/20'
    };
</script>


<div
    class   = "group relative flex flex-col h-full p-5 glass-light rounded-2xl hover:glass transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-[1.03] animate-scale-in overflow-hidden border border-white/5"
    style   = "animation-delay: { Math.random() * 100 }ms"
>
    <!-- Background Glow -->
    <div class="absolute -top-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>

    <!-- Header Section -->
    <div class="flex items-start justify-between mb-4 relative z-10">
        {#if lovType() === 'Portfolio' && ( lov.skill as Record<string, unknown> ).img}
            <div class="w-12 h-12 rounded-xl overflow-hidden bg-surface ring-2 ring-white/5 group-hover:ring-primary/30 transition-all">
                <img
                    src     = { ( lov.skill as Record<string, unknown> ).img as string }
                    alt     = { lov.description }
                    class   = "w-full h-full object-cover"
                />
            </div>
        {:else}
            <div class="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-accent/10 flex items-center justify-center shadow-lg shadow-primary/5 group-hover:from-primary/30 group-hover:to-accent/20 transition-all">
                <svg class="w-6 h-6 text-primary-light drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
            </div>
        {/if}

        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
            <button
                type        = "button"
                onclick     = { handleEdit }
                class       = "p-2 text-text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                title       = "Editar"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <button
                type        = "button"
                onclick     = { handleDelete }
                class       = "p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                title       = "Eliminar"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>

    <!-- Content Section -->
    <div class="flex-1 relative z-10">
        <div class="flex items-center gap-2 mb-2">
            <h4 class="font-bold text-text text-lg truncate group-hover:text-primary-light transition-colors">{ lov.description }</h4>
        </div>

        {#if lovType() === 'Portfolio'}
            {@const status = ( lov.skill as Record<string, unknown> ).status as string}
            {#if status}
                <div class="mb-3">
                    <span class="px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-full { statusColors[status] || 'bg-surface-lighter text-text-muted' }">
                        { status }
                    </span>
                </div>
            {/if}
        {/if}

        {#if lov.comment}
            <p class="text-sm text-text-muted line-clamp-2 leading-relaxed mb-4 group-hover:text-text/70 transition-colors">
                { lov.comment }
            </p>
        {/if}
    </div>

    <!-- Footer Info -->
    <div class="mt-auto pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
        <div class="flex flex-col gap-1">
            {#each skillInfo as info}
                <span class="text-[11px] text-text-muted flex items-center gap-1.5">
                    <span class="w-1 h-1 rounded-full bg-primary/40"></span>
                    <span class="font-medium text-primary-light/60">{ info.label }:</span>
                    <span class="truncate max-w-[100px]">{ info.value }</span>
                </span>
            {/each}
        </div>

        <Toggle checked={ lov.active } onchange={ handleToggle } />
    </div>
</div>
