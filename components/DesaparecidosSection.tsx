import { useTranslations, useLocale } from "next-intl";
import { plataformasDesaparecidos } from "@/data/desaparecidos";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export function DesaparecidosSection() {
  const t = useTranslations("desaparecidos");
  const locale = useLocale() as "es" | "en";

  const activePlatforms = plataformasDesaparecidos.filter((p) => p.activo);

  return (
    <section id="desaparecidos" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 text-sm font-medium">⚠️ {t("warning")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activePlatforms.map((platform) => (
            <Card key={platform.id}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-venezuela-dark">
                    {platform.nombre}
                  </h3>
                  <Badge variant="blue">
                    {t(`types.${platform.tipo}`)}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {platform.descripcion[locale]}
                </p>
                <Button href={platform.url} external variant="outline" size="sm">
                  {t("visit")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
