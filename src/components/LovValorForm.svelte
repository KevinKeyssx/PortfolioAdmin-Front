<script lang="ts">
  import Toggle from './Toggle.svelte';
  import Modal from './Modal.svelte';
  import TagInput from './TagInput.svelte';
  import YearRangePicker from './YearRangePicker.svelte';
  import DatePicker from './DatePicker.svelte';
  import ButtonGroup from './ButtonGroup.svelte';
  import AboutMeEditor from './forms/AboutMeEditor.svelte';
  import GithubEditor from './forms/GithubEditor.svelte';
  import type { LovValor, LovType, AboutMeItem, PortfolioGithub } from '../lib/types';
  import { SKILL_TYPES, OTHER_SKILL_TYPES, PORTFOLIO_STATUS } from '../lib/types';
  import { addLovValor, updateLovValor, getListaById } from '../lib/store';

  interface Props {
    open: boolean;
    lovId: number;
    lov?: LovValor | null;
    onclose?: () => void;
  }

  let { open = $bindable(false), lovId, lov = null, onclose }: Props = $props();

  // Common fields
  let description = $state('');
  let active = $state(true);
  let comment = $state('');

  // Dynamic skill fields based on LOV type
  let skillSort = $state(1);
  let skillFilter = $state(true);
  let skillDate = $state(false);
  let skillLocation = $state('');
  let skillDateRange = $state('');
  let skillJob = $state('');
  let skillTools = $state<string[]>([]);
  let skillType = $state('');
  let skillTeacher = $state('');
  let skillDateText = $state('');
  let skillDescription = $state('');
  let skillImg = $state('');
  let skillUrl = $state('');
  let skillGithub = $state<PortfolioGithub[]>([]);
  let skillStatus = $state<'In Prod' | 'In Dev' | 'Beta'>('In Prod');
  let skillTechnologies = $state<string[]>([]);
  let aboutMeItems = $state<AboutMeItem[]>([]);

  const lovType = $derived(() => {
    const lista = getListaById(lovId);
    return lista?.description as LovType | undefined;
  });

  $effect(() => {
    if (lov) {
      description = lov.description;
      active = lov.active;
      comment = lov.comment;

      const skill = lov.skill as Record<string, unknown>;
      
      // Parse skill based on type
      skillSort = (skill.sort as number) || 1;
      skillFilter = skill.filter === 'true' || skill.filter === true;
      skillDate = skill.date === 'true' || skill.date === true;
      skillLocation = (skill.location as string) || '';
      skillDateRange = (skill.date as string) || '';
      skillJob = (skill.job as string) || '';
      skillTools = (skill.tools as string[]) || [];
      skillType = (skill.type as string) || '';
      skillTeacher = (skill.teacher as string) || '';
      skillDateText = (skill.date as string) || '';
      skillDescription = (skill.description as string) || '';
      skillImg = (skill.img as string) || '';
      skillUrl = (skill.url as string) || '';
      skillGithub = (skill.github as PortfolioGithub[]) || [];
      skillStatus = (skill.status as 'In Prod' | 'In Dev' | 'Beta') || 'In Prod';
      skillTechnologies = (skill.technologies as string[]) || [];
      aboutMeItems = (skill.items as AboutMeItem[]) || [];
    } else {
      // Reset to defaults
      description = '';
      active = true;
      comment = '';
      skillSort = 1;
      skillFilter = true;
      skillDate = false;
      skillLocation = '';
      skillDateRange = '';
      skillJob = '';
      skillTools = [];
      skillType = '';
      skillTeacher = '';
      skillDateText = '';
      skillDescription = '';
      skillImg = '';
      skillUrl = '';
      skillGithub = [];
      skillStatus = 'In Prod';
      skillTechnologies = [];
      aboutMeItems = [];
    }
  });

  function buildSkill(): Record<string, unknown> {
    const type = lovType();
    
    switch (type) {
      case 'About':
        // Check if it's AboutMe type
        if (description === 'AboutMe' || aboutMeItems.length > 0) {
          return { items: aboutMeItems };
        }
        // Check for Nacionalidad, Edad, etc.
        if (description === 'Edad') {
          return { date: 'true', sort: skillSort, filter: skillFilter ? 'true' : 'false' };
        }
        if (['Nacionalidad'].includes(description)) {
          return { sort: skillSort, filter: skillFilter ? 'true' : 'false' };
        }
        if (['Estudios', 'Trabajo', 'Celular'].includes(description)) {
          return { sort: skillSort, filter: skillFilter ? 'true' : 'false' };
        }
        return {};

      case 'Education':
        return { date: skillDateRange, sort: skillSort, location: skillLocation };

      case 'Employement':
        return { job: skillJob, date: skillDateRange, sort: skillSort, tools: skillTools };

      case 'Skills':
        return { type: skillType };

      case 'OtherSkills':
        return { type: skillType };

      case 'Certificates':
        return skillTeacher 
          ? { date: skillDateText, teacher: skillTeacher, description: skillDescription }
          : { date: skillDateText, description: skillDescription };

      case 'Portfolio':
        return {
          img: skillImg,
          url: skillUrl,
          github: skillGithub,
          status: skillStatus,
          technologies: skillTechnologies
        };

      case 'Images':
        return {};

      default:
        return {};
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!description.trim()) return;

    const skill = buildSkill();

    if (lov) {
      updateLovValor(lov.id, { description, active, skill, comment });
    } else {
      addLovValor({ lov_id: lovId, description, active, skill, comment });
    }

    open = false;
    onclose?.();
  }

  function handleClose() {
    open = false;
    onclose?.();
  }

  // Helpers
  function isAboutGeneric() {
    const type = lovType();
    return type === 'About' && !['AboutMe', 'Nacionalidad', 'Edad', 'Estudios', 'Trabajo', 'Celular'].includes(description);
  }

  function isAboutWithSortFilter() {
    return ['Nacionalidad', 'Estudios', 'Trabajo', 'Celular'].includes(description);
  }

  function isAboutEdad() {
    return description === 'Edad';
  }

  function isAboutMe() {
    return description === 'AboutMe';
  }
</script>

<Modal bind:open title={lov ? 'Editar Valor' : 'Nuevo Valor'} {onclose}>
  <form onsubmit={handleSubmit} class="space-y-6">
    <!-- Description/Name -->
    <div class="space-y-2">
      <label for="description" class="block text-sm font-medium text-text-muted">
        Nombre <span class="text-danger">*</span>
      </label>
      <input
        id="description"
        type="text"
        bind:value={description}
        required
        placeholder="Nombre del valor..."
        class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
    </div>

    <!-- Active -->
    <div class="flex items-center justify-between p-4 bg-surface-light/50 rounded-xl">
      <div>
        <label class="block text-sm font-medium text-text">Activo</label>
        <p class="text-xs text-text-muted mt-0.5">Determina si este valor está visible</p>
      </div>
      <Toggle bind:checked={active} />
    </div>

    <!-- Dynamic Skill Fields -->
    {#if lovType() === 'About'}
      {#if isAboutMe()}
        <!-- AboutMe Items Editor -->
        <div class="p-4 bg-surface-light/30 rounded-xl border border-border/30 space-y-4">
          <h3 class="text-sm font-semibold text-accent">Información Personal</h3>
          <AboutMeEditor bind:items={aboutMeItems} />
        </div>
      {:else if isAboutEdad()}
        <!-- Edad: date, sort, filter -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-muted">Orden</label>
            <input
              type="number"
              bind:value={skillSort}
              min="1"
              class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
          <div class="flex items-center justify-between p-4 bg-surface-light/50 rounded-xl">
            <label class="text-sm font-medium text-text">Filtro</label>
            <Toggle bind:checked={skillFilter} />
          </div>
          <div class="flex items-center justify-between p-4 bg-surface-light/50 rounded-xl">
            <label class="text-sm font-medium text-text">Es Fecha</label>
            <Toggle bind:checked={skillDate} />
          </div>
        </div>
      {:else if isAboutWithSortFilter()}
        <!-- Sort and Filter -->
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-muted">Orden</label>
            <input
              type="number"
              bind:value={skillSort}
              min="1"
              class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
          <div class="flex items-center justify-between p-4 bg-surface-light/50 rounded-xl">
            <label class="text-sm font-medium text-text">Filtro</label>
            <Toggle bind:checked={skillFilter} />
          </div>
        </div>
      {/if}
    {/if}

    {#if lovType() === 'Education'}
      <div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
        <h3 class="text-sm font-semibold text-accent">Datos de Educación</h3>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Período</label>
          <YearRangePicker bind:value={skillDateRange} />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-muted">Orden</label>
            <input
              type="number"
              bind:value={skillSort}
              min="1"
              class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
          <div class="space-y-2">
            <label class="block text-sm font-medium text-text-muted">Ubicación</label>
            <input
              type="text"
              bind:value={skillLocation}
              placeholder="Santiago RM, Chile"
              class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    {/if}

    {#if lovType() === 'Employement'}
      <div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
        <h3 class="text-sm font-semibold text-accent">Datos de Empleo</h3>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Cargo</label>
          <input
            type="text"
            bind:value={skillJob}
            placeholder="Ingeniero Informático SR"
            class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Período</label>
          <YearRangePicker bind:value={skillDateRange} />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Orden</label>
          <input
            type="number"
            bind:value={skillSort}
            min="1"
            class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Herramientas (Enter para agregar)</label>
          <TagInput bind:tags={skillTools} placeholder="Agregar tecnología..." />
        </div>
      </div>
    {/if}

    {#if lovType() === 'Skills'}
      <div class="space-y-2">
        <label class="block text-sm font-medium text-text-muted">Tipo</label>
        <select
          bind:value={skillType}
          class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
        >
          <option value="">Seleccionar tipo...</option>
          {#each SKILL_TYPES as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
    {/if}

    {#if lovType() === 'OtherSkills'}
      <div class="space-y-2">
        <label class="block text-sm font-medium text-text-muted">Tipo</label>
        <select
          bind:value={skillType}
          class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer"
        >
          <option value="">Seleccionar tipo...</option>
          {#each OTHER_SKILL_TYPES as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
    {/if}

    {#if lovType() === 'Certificates'}
      <div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
        <h3 class="text-sm font-semibold text-accent">Datos del Certificado</h3>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Fecha</label>
          <DatePicker bind:value={skillDateText} />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Instructor (opcional)</label>
          <input
            type="text"
            bind:value={skillTeacher}
            placeholder="Fernando Herrera"
            class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Descripción del curso</label>
          <input
            type="text"
            bind:value={skillDescription}
            placeholder="SOLID & DRY & Clean Code"
            class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
      </div>
    {/if}

    {#if lovType() === 'Portfolio'}
      <div class="space-y-4 p-4 bg-surface-light/30 rounded-xl border border-border/30">
        <h3 class="text-sm font-semibold text-accent">Datos del Proyecto</h3>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">URL de Imagen</label>
          <input
            type="url"
            bind:value={skillImg}
            placeholder="https://..."
            class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">URL del Proyecto</label>
          <input
            type="url"
            bind:value={skillUrl}
            placeholder="https://..."
            class="w-full px-4 py-3 bg-surface rounded-xl border border-border/50 text-text placeholder-text-muted focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
          />
        </div>
        <GithubEditor bind:github={skillGithub} />
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Estado</label>
          <ButtonGroup options={PORTFOLIO_STATUS} bind:value={skillStatus} />
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-text-muted">Tecnologías (Enter para agregar)</label>
          <TagInput bind:tags={skillTechnologies} placeholder="Agregar tecnología..." />
        </div>
      </div>
    {/if}

    <!-- Comment / Description -->
    <div class="space-y-2">
      <label for="comment" class="block text-sm font-medium text-text-muted">
        {lovType() === 'Portfolio' || lovType() === 'Images' ? 'Descripción' : 'Comentario'}
      </label>
      <textarea
        id="comment"
        bind:value={comment}
        rows="3"
        placeholder={lovType() === 'About' && isAboutGeneric() ? 'URL o valor...' : 'Descripción opcional...'}
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
        {lov ? 'Guardar Cambios' : 'Crear Valor'}
      </button>
    </div>
  </form>
</Modal>
