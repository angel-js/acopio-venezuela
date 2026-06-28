import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative py-20 md:py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-venezuela-blue/5 via-transparent to-venezuela-red/5" />
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-display text-venezuela-blue leading-tight mb-6">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#desaparecidos" variant="primary" size="lg">
            {t("cta_desaparecidos")}
          </Button>
          <Button href="#donaciones" variant="secondary" size="lg">
            {t("cta_donar")}
          </Button>
          <Button href="#acopio" variant="outline" size="lg">
            {t("cta_acopio")}
          </Button>
        </div>
      </div>
    </section>
  );
}
