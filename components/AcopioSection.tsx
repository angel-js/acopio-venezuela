"use client";

import { useTranslations } from "next-intl";

const ACOPIOS_VENEZUELA_URL = "https://acopiosvenezuela.com/";

export function AcopioSection() {
  const t = useTranslations("acopio");

  return (
    <section
      id="acopio"
      aria-label="Centros de acopio"
      className="bg-venezuela-green py-[90px] px-6 scroll-mt-[66px]"
    >
      <div className="max-w-[1240px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-[3px] bg-white block" />
          <span className="text-white text-xs font-bold uppercase tracking-[.2em]">
            CENTROS DE ACOPIO
          </span>
        </div>

        {/* Title */}
        <h2
          className="font-display font-black text-white tracking-[-0.02em] leading-tight"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p className="text-white/80 max-w-2xl mt-3">{t("description")}</p>

        {/* External directory CTA */}
        <div className="bg-white rounded-card p-8 md:p-12 mt-8 text-center">
          <p className="text-venezuela-ink/70 max-w-xl mx-auto">
            {t("directory_description")}
          </p>
          <a
            href={ACOPIOS_VENEZUELA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-venezuela-green text-white font-semibold px-6 py-3 rounded-card hover:opacity-90 transition-opacity"
          >
            {t("directory_cta")} →
          </a>
        </div>
      </div>
    </section>
  );
}
