import { useTranslations, useLocale } from "next-intl";
import {
  type CategoriaAyuda,
  getOrganizacionesByCategoria,
} from "@/data/organizaciones";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

const categoryIcons: Record<CategoriaAyuda, string> = {
  ninos: "👶",
  comida: "🍽️",
  salud: "🏥",
  registro: "📋",
  ingenieria: "🏗️",
  animales: "🐾",
};

const categoryColors: Record<CategoriaAyuda, string> = {
  ninos: "bg-purple-50",
  comida: "bg-orange-50",
  salud: "bg-emerald-50",
  registro: "bg-sky-50",
  ingenieria: "bg-amber-50",
  animales: "bg-rose-50",
};

interface AyudaSectionProps {
  categoria: CategoriaAyuda;
}

export function AyudaSection({ categoria }: AyudaSectionProps) {
  const t = useTranslations(`ayuda.${categoria}`);
  const tCommon = useTranslations("ayuda.common");
  const locale = useLocale() as "es" | "en";

  const orgs = getOrganizacionesByCategoria(categoria);

  return (
    <section
      id={categoria}
      className={`py-16 md:py-24 px-4 ${categoryColors[categoria]}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">{categoryIcons[categoria]}</span>
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orgs.map((org) => (
            <Card key={org.id}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-venezuela-dark">
                    {org.nombre}
                  </h3>
                  {org.verificada && (
                    <Badge variant="green">{tCommon("verified")} ✓</Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {org.descripcion[locale]}
                </p>
                <Button href={org.url} external variant="primary" size="sm">
                  {tCommon("visit")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
