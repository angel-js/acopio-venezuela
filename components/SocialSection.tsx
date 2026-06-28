import { useTranslations, useLocale } from "next-intl";
import { redesSociales } from "@/data/social";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";

const platformIcons: Record<string, string> = {
  instagram: "📷",
  twitter: "🐦",
  facebook: "📘",
  tiktok: "🎵",
  youtube: "🎬",
};

export function SocialSection() {
  const t = useTranslations("social");
  const locale = useLocale() as "es" | "en";

  const active = redesSociales.filter((r) => r.activo);

  return (
    <section id="redes" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {active.map((account) => (
            <Card key={account.id} flagStripe={false}>
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">
                    {platformIcons[account.plataforma]}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-venezuela-dark">
                      {account.nombre}
                    </h3>
                    <p className="text-xs text-gray-500">{account.handle}</p>
                  </div>
                  <Badge className="ml-auto">
                    {t(`platforms.${account.plataforma}`)}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {account.descripcion[locale]}
                </p>
                <Button
                  href={account.url}
                  external
                  variant="outline"
                  size="sm"
                >
                  {t("follow")} →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
