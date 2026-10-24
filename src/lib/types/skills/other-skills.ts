export const OTHER_SKILL_TYPES = [
	'Herramientas',
	'Servidores',
	'Hosting',
	'Otros',
] as const;

export type OtherSkillType = ( typeof OTHER_SKILL_TYPES )[ number ];

export interface OtherSkill {
	type	: OtherSkillType | string;
}
