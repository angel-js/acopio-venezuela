import { useTranslations, useLocale } from "next-intl";
import { organizacionesDonacion } from "@/data/donaciones";

export function DonacionesSection() {
  const t = useTranslations("donaciones");
  const locale = useLocale() as "es" | "en";

  const verified = organizacionesDonacion.filter((o) => o.verificada);

  return (
    <section
      id="donar"
      className="bg-venezuela-ink py-[90px] px-6 scroll-mt-[66px]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-[3px] bg-[#ff6b7e]" />
          <span className="text-[#ff6b7e] text-xs font-bold uppercase tracking-[.2em]">
            DONAR
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-display font-black text-white tracking-[-0.02em] leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-[#bdb6ab] max-w-2xl mt-3">{t("description")}</p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {verified.map((org) => (
            <div
              key={org.id}
              className="bg-[#211d1a] rounded-card border border-[rgba(245,240,232,.12)] p-6 hover:-translate-y-0.5 transition"
            >
              {/* Card header */}
              <div className="flex justify-between items-start">
                <h3 className="font-display font-extrabold text-white text-lg">
                  {org.nombre}
                </h3>
                <span className="bg-[rgba(31,138,76,.18)] text-[#5fd38c] text-xs font-semibold px-2.5 py-1 rounded-sm">
                  ✓ {t("verified")}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#bdb6ab] text-sm mt-3">
                {org.descripcion[locale]}
              </p>

              {/* Payment chips */}
              <div className="flex gap-2 flex-wrap mt-4">
                {org.metodoPago.map((method) => (
                  <span
                    key={method}
                    className="bg-[rgba(245,240,232,.08)] text-[#bdb6ab] text-xs px-2.5 py-1 rounded-sm"
                  >
                    {t(`payment_methods.${method}`)}
                  </span>
                ))}
              </div>

              {/* Donate button */}
              <a
                href={org.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-venezuela-red text-white text-center py-3 rounded-card font-bold text-sm hover:bg-red-700 transition block"
              >
                {t("donate")} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
