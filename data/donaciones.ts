export interface OrganizacionDonacion {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  metodoPago: ("paypal" | "transferencia" | "cripto" | "tarjeta")[];
  verificada: boolean;
  pais: string;
}

export const organizacionesDonacion: OrganizacionDonacion[] = [
  {
    id: "we-love-foundation",
    nombre: "We Love Foundation",
    descripcion: {
      es: "Fundación internacional que canaliza donaciones para ayuda humanitaria en Venezuela.",
      en: "International foundation channeling donations for humanitarian aid in Venezuela.",
    },
    url: "https://www.welove.foundation",
    metodoPago: ["tarjeta", "paypal", "transferencia"],
    verificada: true,
    pais: "INT",
  },
  {
    id: "sun-risas",
    nombre: "Sun Risas",
    descripcion: {
      es: "Campaña de recaudación de fondos para apoyar a los afectados por el terremoto en Venezuela.",
      en: "Fundraising campaign to support those affected by the earthquake in Venezuela.",
    },
    url: "https://fundraise.sunrisas.org/campaign/815513/donate",
    metodoPago: ["tarjeta", "paypal"],
    verificada: true,
    pais: "INT",
  },
  {
    id: "the-house-project",
    nombre: "The House Project",
    descripcion: {
      es: "Organización dedicada a proyectos de vivienda y reconstrucción para familias afectadas.",
      en: "Organization dedicated to housing and reconstruction projects for affected families.",
    },
    url: "https://www.thehouse-project.org",
    metodoPago: ["tarjeta", "paypal", "transferencia"],
    verificada: true,
    pais: "INT",
  },
  {
    id: "gofundme-venezuela",
    nombre: "GoFundMe - Venezuela Earthquake Relief",
    descripcion: {
      es: "Página oficial de GoFundMe para alivio del terremoto en Venezuela con múltiples campañas verificadas.",
      en: "Official GoFundMe page for Venezuela earthquake relief with multiple verified campaigns.",
    },
    url: "https://www.gofundme.com/c/act/venezuela-earthquake-relief",
    metodoPago: ["tarjeta", "paypal"],
    verificada: true,
    pais: "INT",
  },
  {
    id: "hazlo-hoy",
    nombre: "Hazlo Hoy - Venezuela Ayuda",
    descripcion: {
      es: "Plataforma de ayuda inmediata para Venezuela. Dona y coordina asistencia para los afectados.",
      en: "Immediate aid platform for Venezuela. Donate and coordinate assistance for those affected.",
    },
    url: "https://www.terremoto.hazlohoy.org",
    metodoPago: ["tarjeta", "paypal", "transferencia", "cripto"],
    verificada: true,
    pais: "INT",
  },
];
