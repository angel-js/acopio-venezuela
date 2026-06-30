import { useTranslations, useLocale } from "next-intl";
import { plataformasDesaparecidos } from "@/data/desaparecidos";

export function DesaparecidosSection() {
  const t = useTranslations("desaparecidos");
  const locale = useLocale() as "es" | "en";

  const activePlatforms = plataformasDesaparecidos.filter((p) => p.activo);

  return (
    <section
      id="buscar"
      aria-label="Búsqueda de personas desaparecidas"
      className="bg-venezuela-cream py-[90px] px-6 scroll-mt-[66px]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div aria-hidden="true" className="w-7 h-[3px] bg-venezuela-blue" />
          <span className="text-venezuela-blue text-xs font-bold uppercase tracking-[.2em]">
            BUSCAR PERSONAS
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display font-black text-venezuela-ink tracking-[-0.02em] leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-[#5a554d] max-w-2xl mt-3">{t("description")}</p>

        {/* Warning banner */}
        <div className="bg-[#FFF6E0] border border-[#F2D27A] border-l-4 border-l-venezuela-yellow rounded-card p-4 mt-8 mb-10">
          <p className="text-[#7a5e00] text-sm">
            ⚠️ {t("warning")}
          </p>
        </div>

        {/* Platforms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          {activePlatforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-white rounded-card border border-black/10 border-t-[3px] border-t-venezuela-blue p-6 hover:-translate-y-0.5 transition"
            >
              {/* Card header */}
              <div className="flex justify-between items-start">
                <h3 className="font-display font-extrabold text-venezuela-ink text-lg">
                  {platform.nombre}
                </h3>
                <span className="bg-[#EAF0FB] text-venezuela-blue text-xs font-semibold px-2.5 py-1 rounded-sm">
                  {t(`types.${platform.tipo}`)}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#5a554d] text-sm mt-3">
                {platform.descripcion[locale]}
              </p>

              {/* Link */}
              <div className="mt-4">
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-venezuela-blue font-bold text-sm hover:underline"
                >
                  {t("visit")} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
