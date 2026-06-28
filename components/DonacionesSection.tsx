import { useTranslations, useLocale } from "next-intl";
import { organizacionesDonacion } from "@/data/donaciones";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

export function DonacionesSection() {
  const t = useTranslations("donaciones");
  const locale = useLocale() as "es" | "en";

  const verified = organizacionesDonacion.filter((o) => o.verificada);

  return (
    <section id="donaciones" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {verified.map((org) => (
            <Card key={org.id}>
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl text-venezuela-dark">
                    {org.nombre}
                  </h3>
                  <Badge variant="green">{t("verified")} ✓</Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {org.descripcion[locale]}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {org.metodoPago.map((method) => (
                    <Badge key={method}>
                      {t(`payment_methods.${method}`)}
                    </Badge>
                  ))}
                </div>
                <Button href={org.url} external variant="primary" size="sm">
                  {t("donate")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
