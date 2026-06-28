export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const countryNames: Record<string, { es: string; en: string }> = {
  CL: { es: "Chile", en: "Chile" },
  ES: { es: "España", en: "Spain" },
  US: { es: "Estados Unidos", en: "United States" },
  CO: { es: "Colombia", en: "Colombia" },
  PE: { es: "Perú", en: "Peru" },
  MX: { es: "México", en: "Mexico" },
  AR: { es: "Argentina", en: "Argentina" },
  EC: { es: "Ecuador", en: "Ecuador" },
  BR: { es: "Brasil", en: "Brazil" },
  PA: { es: "Panamá", en: "Panama" },
  VE: { es: "Venezuela", en: "Venezuela" },
  INT: { es: "Internacional", en: "International" },
};
