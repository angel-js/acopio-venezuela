export interface PlataformaDesaparecidos {
  id: string;
  nombre: string;
  descripcion: { es: string; en: string };
  url: string;
  tipo: "base_de_datos" | "red_social" | "ong" | "gobierno";
  activo: boolean;
  logoUrl?: string;
}

export const plataformasDesaparecidos: PlataformaDesaparecidos[] = [
  {
    id: "foro-penal",
    nombre: "Foro Penal",
    descripcion: {
      es: "ONG venezolana que documenta y asiste a presos políticos y desaparecidos. Tienen una base de datos de detenidos.",
      en: "Venezuelan NGO that documents and assists political prisoners and missing persons. They maintain a detainee database.",
    },
    url: "https://foropenal.com",
    tipo: "ong",
    activo: true,
  },
  {
    id: "provea",
    nombre: "PROVEA",
    descripcion: {
      es: "Programa Venezolano de Educación-Acción en Derechos Humanos. Documenta violaciones de DDHH incluyendo desapariciones.",
      en: "Venezuelan Program of Education-Action in Human Rights. Documents human rights violations including disappearances.",
    },
    url: "https://provea.org",
    tipo: "ong",
    activo: true,
  },
  {
    id: "cofavic",
    nombre: "COFAVIC",
    descripcion: {
      es: "Comité de Familiares de las Víctimas. Brinda acompañamiento jurídico y psicosocial a familiares de víctimas.",
      en: "Committee of Victims' Families. Provides legal and psychosocial support to families of victims.",
    },
    url: "https://cofavic.org",
    tipo: "ong",
    activo: true,
  },
];
