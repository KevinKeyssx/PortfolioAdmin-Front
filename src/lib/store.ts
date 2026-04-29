import { writable, derived, get } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { ListaValores, LovValor } from './types';

// Initial Lista de Valores data
export const initialListaValores: ListaValores[] = [
  { id: 1, description: 'About', active: true, skill: '{}', comment: 'Información relevante sobre mi.', created_at: '2023-01-24 11:51:33' },
  { id: 2, description: 'Education', active: true, skill: '{}', comment: 'Todos los estudios que tuve o que tengo actualmente.', created_at: '2023-01-24 11:58:06' },
  { id: 3, description: 'Employement', active: true, skill: '{}', comment: 'Todos los empleos que he tenido.', created_at: '2023-01-24 11:58:06' },
  { id: 4, description: 'Skills', active: true, skill: '{}', comment: 'Las habilidades más relevantes.', created_at: '2023-01-24 11:58:06' },
  { id: 5, description: 'OtherSkills', active: true, skill: '{}', comment: 'Otras habilidades relevantes.', created_at: '2023-01-24 11:58:06' },
  { id: 6, description: 'Certificates', active: true, skill: '{}', comment: 'Certificados y certificados online.', created_at: '2023-01-24 11:58:06' },
  { id: 7, description: 'Portfolio', active: true, skill: '{}', comment: 'Todos los proyectos que he realizado.', created_at: '2023-01-26 17:04:22' },
  { id: 8, description: 'Images', active: true, skill: '{}', comment: 'Imagenes para el about.', created_at: '2025-04-13 20:47:56' },
];

// Initial LOV Valores data
export const initialLovValores: LovValor[] = [
  // About (lov_id: 1)
  { id: uuidv4(), lov_id: 1, description: 'GitHub', active: true, skill: {}, comment: 'https://github.com/KevinKeyssx', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'LinkedIn', active: true, skill: {}, comment: 'https://www.linkedin.com/in/kevin-gonzalez-ayala/', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'Email', active: true, skill: {}, comment: 'kevin.gonzalez.ayala@gmail.com', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'Nacionalidad', active: true, skill: { sort: 4, filter: 'true' }, comment: 'Chileno', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'Edad', active: true, skill: { date: 'true', sort: 6, filter: 'true' }, comment: '27', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'Estudios', active: true, skill: { sort: 2, filter: 'true' }, comment: 'Universidad Andrés Bello', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'Trabajo', active: true, skill: { sort: 2, filter: 'true' }, comment: 'Ingeniero informático, senior, AUI', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'Celular', active: true, skill: { sort: 2, filter: 'true' }, comment: '+56 9 1234 5678', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 1, description: 'AboutMe', active: true, skill: { items: [
    { text: 'Santiago, Chile', label: 'Localidad' },
    { text: '27', label: 'Edad' },
    { text: 'Chileno', label: 'Nacionalidad' },
    { text: 'Robótica, Música, Tecnología', label: 'Intereses' },
    { text: 'Universidad Andrés Bello', label: 'Estudios' },
    { text: 'Ingeniero informático, senior, AUI', label: 'Empleo' }
  ]}, comment: '', created_at: '2023-01-24' },

  // Education (lov_id: 2)
  { id: uuidv4(), lov_id: 2, description: 'Instituto Profesional AIEP', active: true, skill: { date: '2015 - 2018', sort: 1, location: 'Santiago RM, Chile' }, comment: 'Ingeniero de ejecución en informática con mención en administración de base de datos', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 2, description: 'Universidad Andrés Bello', active: true, skill: { date: '2018 - 2019', sort: 2, location: 'Santiago RM, Chile' }, comment: 'Diplomado en gestión de proyectos TI.', created_at: '2023-01-24' },

  // Employment (lov_id: 3)
  { id: uuidv4(), lov_id: 3, description: 'TSOFT CHILE SPA', active: true, skill: { job: 'Ingeniero Informático SR', date: '2018 - 2019', sort: 3, tools: ['Microservicios', 'PostgreSQL', 'Git/GitHub', 'OpenJDK', 'SpringBoot', 'Oracle'] }, comment: 'Mantención y desarrollo de la plataforma CyberFinancial, externo en la empresa de cobranza CyberFinancial.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 3, description: 'Equifax S.A.', active: true, skill: { job: 'Ingeniero Informático SR', date: '2019 - 2022', sort: 3, tools: ['Microservicios', 'PostgreSQL', 'SpringBoot', 'Angular', 'Docker', 'Git/GitHub'] }, comment: 'Creación, mantención y desarrollo de la plataforma de cobranza Equifax y nueva infraestructura.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 3, description: 'Sportmedics', active: true, skill: { job: 'Ingeniero Informático SR', date: '2017 - 2017', sort: 4, tools: ['SQL Server', 'JavaFX', 'Fingerprint', 'Scrum', 'Java 8'] }, comment: 'Creación y desarrollo de software y registro de asistencia para la empresa Sportmedics.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 3, description: 'Universidad Adolfo Ibañez', active: true, skill: { job: 'Ingeniero Informático SR', date: '2022 - Actual', sort: 1, tools: ['AWS S3', 'Microservicios', 'PostgreSQL', 'MongoDB', 'Angular', 'Docker', 'Git/GitHub'] }, comment: 'Desarrollo de sistemas internos y plataformas educativas.', created_at: '2023-01-24' },

  // Skills (lov_id: 4)
  { id: uuidv4(), lov_id: 4, description: 'Angular', active: true, skill: { type: 'Desarrollo Frontend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'HTML5', active: true, skill: { type: 'Desarrollo Frontend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'PostgreSQL', active: true, skill: { type: 'Bases de Datos' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Oracle', active: true, skill: { type: 'Bases de Datos' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'My SQL', active: true, skill: { type: 'Bases de Datos' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'SQL Server', active: true, skill: { type: 'Bases de Datos' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'GraphQL', active: true, skill: { type: 'Desarrollo Backend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'MongoDB', active: true, skill: { type: 'Bases de Datos' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'SpringBoot', active: true, skill: { type: 'Desarrollo Backend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'C#', active: true, skill: { type: 'Lenguajes' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Next/React', active: true, skill: { type: 'Desarrollo Frontend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'CSS', active: true, skill: { type: 'Desarrollo Frontend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Java', active: true, skill: { type: 'Lenguajes' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'FastAPI', active: true, skill: { type: 'Desarrollo Backend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Astro', active: true, skill: { type: 'Desarrollo Frontend' }, comment: '', created_at: '2024-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Python', active: true, skill: { type: 'Lenguajes' }, comment: '', created_at: '2024-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Dart', active: true, skill: { type: 'Lenguajes' }, comment: '', created_at: '2024-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Nest Microservices', active: true, skill: { type: 'Desarrollo Backend' }, comment: '', created_at: '2024-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Flutter', active: true, skill: { type: 'Desarrollo Móvil' }, comment: '', created_at: '2024-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Svelte', active: true, skill: { type: 'Desarrollo Frontend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'Nest', active: true, skill: { type: 'Desarrollo Backend' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 4, description: 'JS/TS', active: true, skill: { type: 'Lenguajes' }, comment: '', created_at: '2024-01-24' },

  // OtherSkills (lov_id: 5)
  { id: uuidv4(), lov_id: 5, description: 'Atlassian', active: true, skill: { type: 'Herramientas' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Fortify', active: true, skill: { type: 'Herramientas' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Linux', active: true, skill: { type: 'Herramientas' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Git/GitHub', active: true, skill: { type: 'Herramientas' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'AWS', active: true, skill: { type: 'Servidores' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Visual Studio Code', active: true, skill: { type: 'Herramientas' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Glassfish', active: true, skill: { type: 'Servidores' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Tomcat', active: true, skill: { type: 'Servidores' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Netlify', active: true, skill: { type: 'Hosting' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Arduino', active: true, skill: { type: 'Otros' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Photoshop', active: true, skill: { type: 'Otros' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Inglés', active: true, skill: { type: 'Otros' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Fl Studios 12', active: true, skill: { type: 'Otros' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Fl0', active: true, skill: { type: 'Hosting' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Hostinger', active: true, skill: { type: 'Hosting' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Vercel', active: true, skill: { type: 'Hosting' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Railway', active: true, skill: { type: 'Hosting' }, comment: '', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 5, description: 'Office 365', active: true, skill: { type: 'Otros' }, comment: '', created_at: '2023-01-24' },

  // Certificates (lov_id: 6)
  { id: uuidv4(), lov_id: 6, description: 'GraphQL - Platzi', active: true, skill: { date: 'June 5, 2022', description: 'Basic GraphQL Course' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744602481/kevinkeyssx/certifi', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 6, description: 'Angular Forms - Platzi', active: true, skill: { date: 'August 29, 2022', description: 'Creating reactive forms' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744606665/kevinkeyssx/certifi', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 6, description: 'SOLID and clean code principles', active: true, skill: { date: 'June 13, 2022', teacher: 'Fernando Herrera', description: 'SOLID & DRY & Clean Code' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744609930/kevinkeyssx/certifi', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 6, description: 'C# - Microsoft', active: true, skill: { date: 'June 4, 2018', description: 'Software Development' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744599225/kevinkeyssx/certifi', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 6, description: 'Docker - Platzi', active: true, skill: { date: 'June 8, 2022', description: 'Basic Docker Course' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744602784/kevinkeyssx/certifi', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 6, description: 'Svelte - Platzi', active: true, skill: { date: 'April 7, 2023', description: 'Basic Svelte Course' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744608932/kevinkeyssx/certifi', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 6, description: 'Flutter - Devtalles', active: true, skill: { date: 'April 23, 2024', description: 'From Zero to Expert' }, comment: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744609456/kevinkeyssx/certifi', created_at: '2024-01-24' },

  // Portfolio (lov_id: 7)
  { id: uuidv4(), lov_id: 7, description: 'Smart New Gen', active: true, skill: { img: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744512902/kevinkeyssx/projects/efa91c84-239f-4c87-b052-d74822e2f529.avif', url: 'https://smart-new-gen.vercel.app', github: [{ url: 'https://github.com/KevinKeyssx', stack: 'Frontend' }], status: 'In Prod', technologies: ['JavaScript', 'Google Tag Manager', 'CSS'] }, comment: 'E-commerce focused solely on the sale of all kinds of technological products.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 7, description: 'Nicolas Jara', active: true, skill: { img: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744524236/kevinkeyssx/projects/df1ef7a1-fe2d-4d0c-965e-6cb0bb3cf965.avif', url: 'https://www.soportenicolasjara.cl', github: [{ url: 'https://github.com/KevinKeyssx/NicolasJaraNEA', stack: 'Frontend' }], status: 'In Prod', technologies: ['JavaScript', 'CSS', 'HTML'] }, comment: 'Technical maintenance and repair services for computers, laptops, surveillance cameras.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 7, description: 'Navly', active: true, skill: { img: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744524236/kevinkeyssx/projects/ed5ce82d-ff14-4963-aac3-aa9744ab0f23.avif', url: 'https://navly.vercel.app', github: [], status: 'In Dev', technologies: ['Svelte', 'TypeScript', 'TailwindCSS'] }, comment: 'Save, simplify, and organize all your web links exactly how you want.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 7, description: 'Curriculum Online', active: true, skill: { img: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744519877/kevinkeyssx/projects/b153b04a-1427-40df-a305-fb666dd89f158.avif', url: 'https://kevinkeyssx.vercel.app', github: [], status: 'In Prod', technologies: ['Astro', 'TypeScript', 'TailwindCSS'] }, comment: 'Online CV with all academic information and work experience.', created_at: '2023-01-24' },
  { id: uuidv4(), lov_id: 7, description: 'PetSocialNetwork JSConf', active: true, skill: { img: 'https://res.cloudinary.com/dbgzsikcs/image/upload/v1744748761/kevinkeyssx/projects/753ab620-88c3-4fdf-916-35b4003842994.avif', url: 'https://petsocial.vercel.app', github: [{ url: 'https://github.com/KevinKeyssx', stack: 'Frontend' }], status: 'Beta', technologies: ['React', 'Node.js', 'MongoDB'] }, comment: 'Social network created by the JSConfChile community.', created_at: '2023-01-24' },

  // Images (lov_id: 8)
  { id: uuidv4(), lov_id: 8, description: 'Profile Picture', active: true, skill: {}, comment: 'Foto de perfil principal para el about.', created_at: '2025-04-13' },
  { id: uuidv4(), lov_id: 8, description: 'Background Banner', active: true, skill: {}, comment: 'Banner de fondo para la sección about.', created_at: '2025-04-13' },
];

// Stores
export const listaValoresStore = writable<ListaValores[]>([...initialListaValores]);
export const lovValoresStore = writable<LovValor[]>([...initialLovValores]);
export const selectedListaIdStore = writable<number | null>(1);

export type ViewMode = 'card' | 'list';
export const viewModeStore = writable<ViewMode>('card');

// Derived stores
export const selectedLovValores = derived(
  [lovValoresStore, selectedListaIdStore],
  ([$lovValores, $selectedId]) => {
    if ($selectedId === null) return [];
    return $lovValores.filter(lov => lov.lov_id === $selectedId);
  }
);

export const selectedLista = derived(
  [listaValoresStore, selectedListaIdStore],
  ([$listas, $selectedId]) => {
    if ($selectedId === null) return null;
    return $listas.find(lista => lista.id === $selectedId) || null;
  }
);

// Helper functions
export function getListaValores() {
  return get(listaValoresStore);
}

export function getLovValores() {
  return get(lovValoresStore);
}

export function getSelectedListaId() {
  return get(selectedListaIdStore);
}

export function setSelectedListaId(id: number | null) {
  selectedListaIdStore.set(id);
}

export function getLovValoresByListaId(listaId: number) {
  return get(lovValoresStore).filter(lov => lov.lov_id === listaId);
}

export function getListaById(id: number) {
  return get(listaValoresStore).find(lista => lista.id === id);
}

// CRUD for Lista de Valores
export function addListaValor(lista: Omit<ListaValores, 'id' | 'created_at'>) {
  const currentListas = get(listaValoresStore);
  const newId = Math.max(...currentListas.map(l => l.id), 0) + 1;
  const newLista: ListaValores = {
    ...lista,
    id: newId,
    created_at: new Date().toISOString()
  };
  listaValoresStore.update(listas => [...listas, newLista]);
  return newLista;
}

export function updateListaValor(id: number, updates: Partial<ListaValores>) {
  listaValoresStore.update(listas =>
    listas.map(lista => lista.id === id ? { ...lista, ...updates } : lista)
  );
}

export function deleteListaValor(id: number) {
  listaValoresStore.update(listas => listas.filter(lista => lista.id !== id));
  lovValoresStore.update(lovs => lovs.filter(lov => lov.lov_id !== id));
}

// CRUD for LOV Valores
export function addLovValor(lov: Omit<LovValor, 'id' | 'created_at'>) {
  const newLov: LovValor = {
    ...lov,
    id: uuidv4(),
    created_at: new Date().toISOString()
  };
  lovValoresStore.update(lovs => [...lovs, newLov]);
  return newLov;
}

export function updateLovValor(id: string, updates: Partial<LovValor>) {
  lovValoresStore.update(lovs =>
    lovs.map(lov => lov.id === id ? { ...lov, ...updates } : lov)
  );
}

export function deleteLovValor(id: string) {
  lovValoresStore.update(lovs => lovs.filter(lov => lov.id !== id));
}
