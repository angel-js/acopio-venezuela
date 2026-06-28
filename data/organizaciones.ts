export type CategoriaAyuda =
  | "ninos"
  | "comida"
  | "salud"
  | "registro"
  | "ingenieria"
  | "animales";

export interface OrganizacionAyuda {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  categoria: CategoriaAyuda;
  verificada: boolean;
}

export const organizacionesAyuda: OrganizacionAyuda[] = [
  // AYUDA NIÑOS
  {
    id: "asonacop",
    nombre: "ASONACOP",
    descripcion: {
      es: "Asociación Nacional de Consejos de Protección de Niños, Niñas y Adolescentes. Directorio de recursos de protección infantil.",
      en: "National Association of Child Protection Councils. Directory of child protection resources.",
    },
    url: "https://www.asonacop.com/directorio",
    categoria: "ninos",
    verificada: true,
  },
  {
    id: "plan-international",
    nombre: "Plan International",
    descripcion: {
      es: "Llamado de emergencia por el terremoto en Venezuela. Apoyo a niños y familias afectadas.",
      en: "Venezuela Earthquake Appeal. Support for affected children and families.",
    },
    url: "https://www.plan-international.org/get-involved/venezuela-earthquake-appeal",
    categoria: "ninos",
    verificada: true,
  },
  {
    id: "don-bosco",
    nombre: "Fundación Red de Casas Don Bosco",
    descripcion: {
      es: "Misiones Salesianas — emergencia por terremotos en Venezuela. Atención a niños y jóvenes vulnerables.",
      en: "Salesian Missions — earthquake emergency in Venezuela. Care for vulnerable children and youth.",
    },
    url: "https://www.misionessalesianas.org/emergencia-terremotos-en-venezuela",
    categoria: "ninos",
    verificada: true,
  },

  // COMIDA
  {
    id: "alimenta-solidaridad",
    nombre: "Alimenta la Solidaridad",
    descripcion: {
      es: "Red de comedores comunitarios que alimenta a niños y familias en situación de vulnerabilidad en Venezuela.",
      en: "Network of community kitchens feeding vulnerable children and families in Venezuela.",
    },
    url: "https://www.alimentasolidaridad.org",
    categoria: "comida",
    verificada: true,
  },
  {
    id: "wfp",
    nombre: "World Food Programme (WFP)",
    descripcion: {
      es: "Programa Mundial de Alimentos de la ONU. Respuesta alimentaria de emergencia en Venezuela.",
      en: "United Nations World Food Programme. Emergency food response in Venezuela.",
    },
    url: "https://www.wfp.org",
    categoria: "comida",
    verificada: true,
  },
  {
    id: "wck",
    nombre: "World Central Kitchen (WCK)",
    descripcion: {
      es: "Organización del chef José Andrés que provee comidas en zonas de desastre alrededor del mundo.",
      en: "Chef José Andrés' organization providing meals in disaster zones around the world.",
    },
    url: "https://www.wck.org",
    categoria: "comida",
    verificada: true,
  },

  // SALUD / MEDICINA
  {
    id: "international-medical-corps",
    nombre: "International Medical Corps",
    descripcion: {
      es: "Cuerpo Médico Internacional. Equipos médicos de emergencia desplegados en Venezuela.",
      en: "Emergency medical teams deployed in Venezuela for disaster relief.",
    },
    url: "https://www.internationalmedicalcorps.org",
    categoria: "salud",
    verificada: true,
  },
  {
    id: "direct-relief",
    nombre: "Direct Relief",
    descripcion: {
      es: "Envío directo de medicamentos y suministros médicos a centros de salud en Venezuela.",
      en: "Direct shipment of medications and medical supplies to health centers in Venezuela.",
    },
    url: "https://www.directrelief.org",
    categoria: "salud",
    verificada: true,
  },
  {
    id: "project-hope",
    nombre: "Project Hope",
    descripcion: {
      es: "Organización de salud global que envía profesionales médicos y suministros a zonas de emergencia.",
      en: "Global health organization deploying medical professionals and supplies to emergency zones.",
    },
    url: "https://www.projecthope.org",
    categoria: "salud",
    verificada: true,
  },

  // REGISTRO DE AYUDA
  {
    id: "veneconnect",
    nombre: "VeneConnect",
    descripcion: {
      es: "Plataforma para registrar y coordinar ayuda humanitaria en Venezuela.",
      en: "Platform to register and coordinate humanitarian aid in Venezuela.",
    },
    url: "https://www.veneconnect.com",
    categoria: "registro",
    verificada: true,
  },
  {
    id: "donar-seguro",
    nombre: "DonarSeguro",
    descripcion: {
      es: "Portal verificado para realizar donaciones seguras a organizaciones en Venezuela.",
      en: "Verified portal to make secure donations to organizations in Venezuela.",
    },
    url: "https://www.donarseguro.com",
    categoria: "registro",
    verificada: true,
  },

  // INGENIERÍA Y ARQUITECTURA
  {
    id: "sismo-ayuda-ve",
    nombre: "SismoAyudaVE",
    descripcion: {
      es: "Plataforma de evaluación de daños estructurales post-terremoto. Reporta edificaciones afectadas.",
      en: "Post-earthquake structural damage assessment platform. Report affected buildings.",
    },
    url: "https://www.sismoayudave.com",
    categoria: "ingenieria",
    verificada: true,
  },
  {
    id: "terremoto-venezuela",
    nombre: "TerremotoVenezuela",
    descripcion: {
      es: "Información sobre daños estructurales, evaluaciones de ingeniería y arquitectura post-sismo.",
      en: "Information on structural damage, post-earthquake engineering and architecture assessments.",
    },
    url: "https://www.terremotovenezuela.com",
    categoria: "ingenieria",
    verificada: true,
  },

  // ANIMALES
  {
    id: "laika",
    nombre: "Laika",
    descripcion: {
      es: "App móvil para reportar y encontrar mascotas perdidas tras el terremoto. Sigue @laikamascotas en redes sociales.",
      en: "Mobile app to report and find pets lost after the earthquake. Follow @laikamascotas on social media.",
    },
    url: "https://www.instagram.com/laikamascotas",
    categoria: "animales",
    verificada: true,
  },
  {
    id: "ruta-animal",
    nombre: "Fundación Ruta Animal",
    descripcion: {
      es: "Fundación de rescate animal que coordina búsqueda y refugio de animales afectados por el terremoto.",
      en: "Animal rescue foundation coordinating search and shelter for animals affected by the earthquake.",
    },
    url: "https://fundacionrutoanimal.org",
    categoria: "animales",
    verificada: true,
  },
];

export function getOrganizacionesByCategoria(
  categoria: CategoriaAyuda
): OrganizacionAyuda[] {
  return organizacionesAyuda.filter((o) => o.categoria === categoria);
}
