export const TECH_SKILL_TYPES = [
	'Desarrollo Frontend',
	'Desarrollo Backend',
	'Bases de Datos',
	'Lenguajes',
	'Desarrollo Móvil',
] as const;

export type TechSkillType = ( typeof TECH_SKILL_TYPES )[ number ];

export interface TechSkill {
	type	: TechSkillType | string;
}
