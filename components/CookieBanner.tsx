"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

type CookieConsent = "all" | "necessary" | "none" | null;

function getConsent(): CookieConsent {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem("cookie-consent");
  if (value === "all" || value === "necessary" || value === "none") return value;
  return null;
}

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setConsent(getConsent());
    setLoaded(true);
  }, []);

  function accept(level: "all" | "necessary" | "none") {
    localStorage.setItem("cookie-consent", level);
    setConsent(level);
  }

  if (!loaded || consent !== null) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-display text-lg text-venezuela-dark mb-1">
              🍪 {t("title")}
            </h3>
            <p className="text-sm text-gray-600">{t("description")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={() => accept("all")}
              className="px-5 py-2.5 bg-venezuela-red text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              {t("accept_all")}
            </button>
            <button
              onClick={() => accept("necessary")}
              className="px-5 py-2.5 bg-venezuela-blue text-white text-sm font-medium rounded-lg hover:bg-blue-900 transition-colors"
            >
              {t("accept_necessary")}
            </button>
            <button
              onClick={() => accept("none")}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
            >
              {t("reject_all")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
