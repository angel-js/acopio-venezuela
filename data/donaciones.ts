export interface OrganizacionDonacion {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  metodoPago: ("paypal" | "transferencia" | "cripto" | "tarjeta")[];
  verificada: boolean;
  pais: string;
  logoUrl?: string;
}

export const organizacionesDonacion: OrganizacionDonacion[] = [
  {
    id: "alimenta-la-solidaridad",
    nombre: "Alimenta la Solidaridad",
    descripcion: {
      es: "Red de comedores comunitarios que alimenta a niños en situación de vulnerabilidad en Venezuela.",
      en: "Network of community kitchens feeding vulnerable children in Venezuela.",
    },
    url: "https://alimentalasolidaridad.org",
    metodoPago: ["paypal", "transferencia", "tarjeta"],
    verificada: true,
    pais: "VE",
  },
  {
    id: "prepara-familia",
    nombre: "Prepara Familia",
    descripcion: {
      es: "Organización que atiende a niños hospitalizados y sus familias, proporcionando alimentación y medicamentos.",
      en: "Organization that assists hospitalized children and their families, providing food and medicine.",
    },
    url: "https://preparafamilia.org",
    metodoPago: ["paypal", "tarjeta"],
    verificada: true,
    pais: "VE",
  },
  {
    id: "acnur",
    nombre: "ACNUR Venezuela",
    descripcion: {
      es: "Agencia de la ONU para los refugiados. Ayuda a venezolanos desplazados y refugiados en la región.",
      en: "UN Refugee Agency. Helps displaced Venezuelans and refugees in the region.",
    },
    url: "https://www.acnur.org/venezuela",
    metodoPago: ["tarjeta", "transferencia"],
    verificada: true,
    pais: "INT",
  },
];
