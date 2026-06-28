"use client";

import { useTranslations, useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { centrosAcopio } from "@/data/acopio";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
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

    fetch("/api/geo")
      .then((res) => res.json())
      .then((data) => {
        if (data.country && availableCountries.includes(data.country)) {
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
    <section id="acopio" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-venezuela-blue mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <label
            htmlFor="country-filter"
            className="text-sm font-medium text-gray-700"
          >
            {t("filter_country")}:
          </label>
          <select
            id="country-filter"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-venezuela-blue"
          >
            <option value="ALL">{t("all_countries")}</option>
            {availableCountries.map((code) => (
              <option key={code} value={code}>
                {countryNames[code]?.[locale] ?? code}
              </option>
            ))}
          </select>
        </div>

        {detectedCountry && selectedCountry === detectedCountry && (
          <p className="text-center text-sm text-venezuela-blue mb-6">
            📍{" "}
            {t("detected_country", {
              country: countryNames[detectedCountry]?.[locale] ?? detectedCountry,
            })}
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">{t("no_centers")}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((center) => (
              <Card key={center.id}>
                <h3 className="font-display text-xl text-venezuela-dark mb-1">
                  {center.nombre}
                </h3>
                <p className="text-sm text-venezuela-blue font-medium mb-3">
                  {center.organizacion}
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>📍 {center.direccion}, {center.ciudad}</p>
                  {center.horario && (
                    <p>🕐 {t("schedule")}: {center.horario}</p>
                  )}
                  {center.telefono && (
                    <p>📞 {t("phone")}: {center.telefono}</p>
                  )}
                  {center.email && (
                    <p>
                      ✉️ {t("email")}:{" "}
                      <a
                        href={`mailto:${center.email}`}
                        className="text-venezuela-blue hover:underline"
                      >
                        {center.email}
                      </a>
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-gray-500 mr-1">
                    {t("accepts")}:
                  </span>
                  {center.insumos.map((insumo) => (
                    <Badge key={insumo} variant="blue">
                      {t(`supplies.${insumo}`)}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
