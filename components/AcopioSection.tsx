"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { centrosAcopio } from "@/data/acopio";
import { countryNames } from "@/lib/utils";

export function AcopioSection() {
  const t = useTranslations("acopio");
  const locale = useLocale() as "es" | "en";
  const [selectedCountry, setSelectedCountry] = useState<string>("ALL");
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  const activeCenters = centrosAcopio.filter((c) => c.activo);

  const availableCountries = Array.from(
    new Set(activeCenters.map((c) => c.pais))
  ).sort();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "none") return;

    const countries = Array.from(
      new Set(centrosAcopio.filter((c) => c.activo).map((c) => c.pais))
    ).sort();

    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        if (data.country && countries.includes(data.country)) {
          setSelectedCountry(data.country);
          setDetectedCountry(data.country);
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    selectedCountry === "ALL"
      ? activeCenters
      : activeCenters.filter((c) => c.pais === selectedCountry);

  return (
    <section
      id="acopio"
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

        {/* Country filter */}
        <div className="flex items-center gap-3 mt-8 mb-8">
          <span className="text-white text-sm font-semibold">
            {t("filter_country")}
          </span>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-white/15 text-white border border-white/20 rounded-card px-4 py-2 text-sm backdrop-blur"
          >
            <option value="ALL" className="text-venezuela-ink bg-white">
              {t("all_countries")}
            </option>
            {availableCountries.map((code) => (
              <option
                key={code}
                value={code}
                className="text-venezuela-ink bg-white"
              >
                {countryNames[code]?.[locale] ?? code}
              </option>
            ))}
          </select>
        </div>

        {detectedCountry && selectedCountry === detectedCountry && (
          <p className="text-white text-sm mt-2 mb-4">
            {t("detected_country", {
              country: countryNames[detectedCountry]?.[locale] ?? detectedCountry,
            })}
          </p>
        )}

        {/* Cards grid or empty state */}
        {filtered.length === 0 ? (
          <div className="border-2 border-dashed border-white/30 rounded-card p-12 text-center text-white/80">
            <p>{t("no_centers")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {filtered.map((center) => (
              <div
                key={center.id}
                className="bg-white rounded-card p-6 text-venezuela-ink"
              >
                {/* Card header */}
                <div className="flex justify-between items-start">
                  <h3 className="font-display font-extrabold text-lg">
                    {center.nombre}
                  </h3>
                  <span className="bg-[rgba(31,138,76,.15)] text-venezuela-green text-xs font-semibold px-2.5 py-1 rounded-sm">
                    {countryNames[center.pais]?.[locale] ?? center.pais}
                  </span>
                </div>

                {/* Organization */}
                <p className="text-venezuela-green font-semibold text-sm mt-1">
                  {center.organizacion}
                </p>

                {/* Details */}
                <div className="mt-4 space-y-2 text-sm text-[#5a554d]">
                  <p>› {center.direccion}, {center.ciudad}</p>
                  {center.horario && (
                    <p>› {t("schedule")}: {center.horario}</p>
                  )}
                  {center.telefono && (
                    <p>› {t("phone")}: {center.telefono}</p>
                  )}
                  {center.email && (
                    <p>
                      › {t("email")}:{" "}
                      <a
                        href={`mailto:${center.email}`}
                        className="text-venezuela-green hover:underline"
                      >
                        {center.email}
                      </a>
                    </p>
                  )}
                </div>

                {/* Footer: supplies */}
                <div className="mt-4 pt-4 border-t border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8f897f] mb-2">
                    {t("accepts")}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {center.insumos.map((insumo) => (
                      <span
                        key={insumo}
                        className="bg-[#F2EDE3] text-[#5a554d] text-xs px-2.5 py-1 rounded-sm"
                      >
                        {t(`supplies.${insumo}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
