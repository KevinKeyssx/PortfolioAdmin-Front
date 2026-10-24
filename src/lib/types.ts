export * from './types/skills';
export * from './types/lov';
export * from './types/lov-val';

import type { AnySkill }		from './types/skills';
import type { ILovParent }		from './types/lov';
import { TECH_SKILL_TYPES }		from './types/skills/tech-skills';

// ──────────────────────────────────────────────────────────────
// Compatibilidad con componentes existentes
// ──────────────────────────────────────────────────────────────

export type ListaValores = ILovParent<AnySkill>;

export interface LovValor {
	id			: number | string;
	lov_id		: number;
	description	: string;
	active		: boolean;
	skill		: AnySkill;
	comment		: string | null;
	created_at	: string | null;
}

export const SKILL_TYPES = TECH_SKILL_TYPES;

// ──────────────────────────────────────────────────────────────
// Tipos y constantes de navegación
// ──────────────────────────────────────────────────────────────

export type LovType =
	| 'About'
	| 'Education'
	| 'Skills'
	| 'OtherSkills'
	| 'Certificates'
	| 'Employement'
	| 'Portfolio'
	| 'Images';
