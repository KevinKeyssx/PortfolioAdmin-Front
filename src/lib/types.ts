export interface ListaValores {
  id: number;
  description: string;
  active: boolean;
  skill: string;
  comment: string;
  created_at: string;
}

export interface LovValor {
  id: string;
  lov_id: number;
  description: string;
  active: boolean;
  skill: Record<string, unknown>;
  comment: string;
  created_at: string;
}

// About Me Item
export interface AboutMeItem {
  text: string;
  label: string;
}

// About Me Skill
export interface AboutMeSkill {
  items: AboutMeItem[];
}

// Generic Skill with sort and filter
export interface GenericSkill {
  sort?: number;
  filter?: string;
  date?: string;
}

// Education Skill
export interface EducationSkill {
  date: string;
  sort: number;
  location: string;
}

// Employment Skill
export interface EmploymentSkill {
  job: string;
  date: string;
  sort: number;
  tools: string[];
  location?: string;
}

// Skills/OtherSkills Skill
export interface TechSkill {
  type: string;
}

// Certificate Skill
export interface CertificateSkill {
  date: string;
  teacher?: string;
  description: string;
}

// Portfolio GitHub
export interface PortfolioGithub {
  url: string;
  stack: 'Frontend' | 'Backend';
}

// Portfolio Skill
export interface PortfolioSkill {
  img: string;
  url: string;
  github: PortfolioGithub[];
  status: 'In Prod' | 'In Dev' | 'Beta';
  technologies: string[];
}

// LOV Types
export type LovType = 'About' | 'Education' | 'Skills' | 'OtherSkills' | 'Certificates' | 'Employement' | 'Portfolio' | 'Images';

export const SKILL_TYPES = [
  'Desarrollo Frontend',
  'Desarrollo Backend',
  'Bases de Datos',
  'Lenguajes',
  'Desarrollo Móvil'
] as const;

export const OTHER_SKILL_TYPES = [
  'Herramientas',
  'Servidores',
  'Hosting',
  'Otros'
] as const;

export const PORTFOLIO_STATUS = ['In Prod', 'In Dev', 'Beta'] as const;
export const GITHUB_STACK = ['Frontend', 'Backend'] as const;
