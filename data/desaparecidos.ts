export interface PlataformaDesaparecidos {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  tipo: "base_de_datos" | "red_social" | "ong" | "gobierno" | "plataforma";
  activo: boolean;
}

export const plataformasDesaparecidos: PlataformaDesaparecidos[] = [
  {
    id: "desaparecidos-terremoto",
    nombre: "Desaparecidos Terremoto Venezuela",
    descripcion: {
      es: "Base de datos centralizada para reportar y buscar personas desaparecidas tras el terremoto en Venezuela.",
      en: "Centralized database to report and search for missing persons after the earthquake in Venezuela.",
    },
    url: "https://www.desaparecidosterremotovenezuela.com",
    tipo: "base_de_datos",
    activo: true,
  },
  {
    id: "red-ayuda-venezuela",
    nombre: "Red Ayuda Venezuela",
    descripcion: {
      es: "Red de ayuda y coordinación para asistencia humanitaria en Venezuela.",
      en: "Aid and coordination network for humanitarian assistance in Venezuela.",
    },
    url: "https://www.redayudavenezuela.com",
    tipo: "plataforma",
    activo: true,
  },
  {
    id: "hospitales-venezuela",
    nombre: "Hospitales en Venezuela",
    descripcion: {
      es: "Directorio de hospitales y centros de salud activos en Venezuela para localizar pacientes.",
      en: "Directory of active hospitals and health centers in Venezuela to locate patients.",
    },
    url: "https://www.hospitalesenvenezuela.com",
    tipo: "base_de_datos",
    activo: true,
  },
  {
    id: "hazlo-hoy-busqueda",
    nombre: "Hazlo Hoy - Búsqueda",
    descripcion: {
      es: "Plataforma de Hazlo Hoy para búsqueda de personas y coordinación de ayuda tras el terremoto.",
      en: "Hazlo Hoy platform for searching people and coordinating aid after the earthquake.",
    },
    url: "https://www.terremoto.hazlohoy.org",
    tipo: "plataforma",
    activo: true,
  },
  {
    id: "venezuela-reporta",
    nombre: "Venezuela Reporta",
    descripcion: {
      es: "Portal de reportes ciudadanos sobre personas desaparecidas y situación post-terremoto.",
      en: "Citizen reporting portal for missing persons and post-earthquake situation.",
    },
    url: "https://www.venezuelareporta.org",
    tipo: "plataforma",
    activo: true,
  },
  {
    id: "sos-venezuela-2026",
    nombre: "SOS Venezuela 2026",
    descripcion: {
      es: "Plataforma de emergencia para reportar y buscar desaparecidos del terremoto de 2026.",
      en: "Emergency platform to report and search for missing persons from the 2026 earthquake.",
    },
    url: "https://www.sosvenezuela2026.com",
    tipo: "plataforma",
    activo: true,
  },
  {
    id: "interp-aid",
    nombre: "InterpAid",
    descripcion: {
      es: "Herramienta de ayuda interpersonal para coordinar rescate y asistencia en Venezuela.",
      en: "Interpersonal aid tool to coordinate rescue and assistance in Venezuela.",
    },
    url: "https://interp-aid.lovable.app/?utm_id=97760_v0_s00_e0_tv6_a1denngtpjj4st",
    tipo: "plataforma",
    activo: true,
  },
  {
    id: "aqui-estoy-venezuela",
    nombre: "Aquí Estoy Venezuela",
    descripcion: {
      es: "Plataforma para que personas reporten que están a salvo y se reconecten con sus familiares.",
      en: "Platform for people to report they are safe and reconnect with their families.",
    },
    url: "https://www.aquiestoyvenezuela.com/",
    tipo: "base_de_datos",
    activo: true,
  },
  {
    id: "venezuela-ayuda",
    nombre: "Venezuela Ayuda",
    descripcion: {
      es: "Portal centralizado de ayuda humanitaria y búsqueda de personas en Venezuela.",
      en: "Centralized humanitarian aid and people search portal in Venezuela.",
    },
    url: "https://venezuelayuda.com/",
    tipo: "plataforma",
    activo: true,
  },
  {
    id: "sistemas-pnp-cedula",
    nombre: "Sistemas PNP - Cédula",
    descripcion: {
      es: "Sistema de consulta por cédula de identidad para localizar personas registradas.",
      en: "ID card lookup system to locate registered persons.",
    },
    url: "https://www.sistemaspnp.com/cedula/",
    tipo: "base_de_datos",
    activo: true,
  },
  {
    id: "terremoto-venezuela-app",
    nombre: "Terremoto Venezuela App",
    descripcion: {
      es: "Aplicación con directorio de recursos, refugios y personas tras el terremoto en Venezuela.",
      en: "App with directory of resources, shelters, and people after the earthquake in Venezuela.",
    },
    url: "https://terremotovenezuela.app/#e-directory",
    tipo: "base_de_datos",
    activo: true,
  },
  {
    id: "desaparecidos-terremoto-2",
    nombre: "Desaparecidos Terremoto VE",
    descripcion: {
      es: "Registro de personas desaparecidas durante el terremoto en Venezuela.",
      en: "Registry of missing persons during the earthquake in Venezuela.",
    },
    url: "https://desaparecidosterremotovenezuela.com/",
    tipo: "base_de_datos",
    activo: true,
  },
  {
    id: "pacientes-venezuela",
    nombre: "Pacientes Venezuela",
    descripcion: {
      es: "Plataforma para localizar pacientes en hospitales y centros de atención en Venezuela.",
      en: "Platform to locate patients in hospitals and care centers in Venezuela.",
    },
    url: "https://pacientesvenezuela.help",
    tipo: "base_de_datos",
    activo: true,
  },
];
