// ──────────────────────────────────────────────────────────────
// Entidades base
// ──────────────────────────────────────────────────────────────

export interface ListaValores {
    id          : number;
    description : string;
    active      : boolean;
    skill       : string;
    comment     : string;
    created_at  : string;
}


export interface LovValor {
    id          : string;
    lov_id      : number;
    description : string;
    active      : boolean;
    skill       : Record<string, unknown>;
    comment     : string;
    created_at  : string;
}


// ──────────────────────────────────────────────────────────────
// Skills tipados por sección
// ──────────────────────────────────────────────────────────────

export interface AboutMeItem {
    text    : string;
    label   : string;
}


export interface AboutMeSkill {
    items : AboutMeItem[];
}


export interface GenericSkill {
    sort?   : number;
    filter? : string;
    date?   : string;
}


export interface EducationSkill {
    date        : string;
    sort        : number;
    location    : string;
}


export interface EmploymentSkill {
    job         : string;
    date        : string;
    sort        : number;
    tools       : string[];
    location?   : string;
}


export interface TechSkill {
    type : string;
}


export interface CertificateSkill {
    date        : string;
    teacher?    : string;
    description : string;
}


export interface PortfolioGithub {
    url     : string;
    stack   : 'Frontend' | 'Backend';
}


export interface PortfolioSkill {
    img             : string;
    url             : string;
    github          : PortfolioGithub[];
    status          : 'In Prod' | 'In Dev' | 'Beta';
    technologies    : string[];
}


// ──────────────────────────────────────────────────────────────
// Tipos y constantes
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


export const SKILL_TYPES = [
    'Desarrollo Frontend',
    'Desarrollo Backend',
    'Bases de Datos',
    'Lenguajes',
    'Desarrollo Móvil',
] as const;


export const OTHER_SKILL_TYPES = [
    'Herramientas',
    'Servidores',
    'Hosting',
    'Otros',
] as const;


export const PORTFOLIO_STATUS  = [ 'In Prod', 'In Dev', 'Beta' ] as const;
export const GITHUB_STACK      = [ 'Frontend', 'Backend' ] as const;
