"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export function Hero() {
  const t = useTranslations("hero");
  useLocale();

  return (
    <section
      aria-label="Venezuela necesita tu ayuda"
      className="relative min-h-[90vh] flex items-end bg-venezuela-ink"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(20,16,14,.78), rgba(0,36,125,.42))",
      }}
    >
      {/* Content: bottom-left aligned */}
      <div className="relative max-w-[1240px] mx-auto px-6 pb-16 md:pb-24 w-full">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 bg-venezuela-red text-white text-xs font-bold uppercase tracking-[.12em] px-4 py-2 rounded-sm mb-6">
          <span aria-hidden="true" className="w-2 h-2 rounded-full bg-venezuela-yellow animate-pulse flex-shrink-0" />
          EMERGENCIA HUMANITARIA
        </div>

        {/* Headline */}
        <h1
          className="font-display font-black text-white leading-[.96] tracking-[-0.02em]"
          style={{ fontSize: "clamp(44px, 7vw, 92px)" }}
        >
          {t("title")}
        </h1>

        {/* Subtitle */}
        <p
          className="font-accent italic text-venezuela-cream max-w-[640px] mt-4"
          style={{ fontSize: "clamp(19px, 2.2vw, 26px)" }}
        >
          {t("subtitle")}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-3 mt-8">
          {/* Blue – missing persons */}
          <a
            href="#buscar"
            className="bg-venezuela-blue text-white px-6 py-4 rounded-card font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {t("cta_desaparecidos")} →
          </a>

          {/* Red – donate */}
          <a
            href="#donar"
            className="bg-venezuela-red text-white px-6 py-4 rounded-card font-bold text-sm hover:opacity-90 transition-opacity"
          >
            {t("cta_donar")} →
          </a>

          {/* Glass – collection centers */}
          <a
            href="#acopio"
            className="bg-white/10 text-white border border-white/20 backdrop-blur px-6 py-4 rounded-card font-bold text-sm hover:bg-white/20 transition-colors"
          >
            {t("cta_acopio")} →
          </a>
        </div>
      </div>
    </section>
  );
}
