export interface RedSocial {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  plataforma: "instagram" | "twitter" | "facebook" | "tiktok" | "youtube";
  url: string;
  handle: string;
  activo: boolean;
}

export const redesSociales: RedSocial[] = [
  {
    id: "foro-penal-ig",
    nombre: "Foro Penal",
    descripcion: {
      es: "Actualizaciones sobre presos políticos y derechos humanos en Venezuela.",
      en: "Updates on political prisoners and human rights in Venezuela.",
    },
    plataforma: "instagram",
    url: "https://instagram.com/foropenal",
    handle: "@foropenal",
    activo: true,
  },
  {
    id: "provea-tw",
    nombre: "PROVEA",
    descripcion: {
      es: "Reportes de derechos humanos y documentación de la crisis venezolana.",
      en: "Human rights reports and documentation of the Venezuelan crisis.",
    },
    plataforma: "twitter",
    url: "https://x.com/provaborea",
    handle: "@provea",
    activo: true,
  },
  {
    id: "alimenta-ig",
    nombre: "Alimenta la Solidaridad",
    descripcion: {
      es: "Comedores comunitarios y nutrición infantil en Venezuela.",
      en: "Community kitchens and child nutrition in Venezuela.",
    },
    plataforma: "instagram",
    url: "https://instagram.com/alimentalasolidaridad",
    handle: "@alimentalasolidaridad",
    activo: true,
  },
];
