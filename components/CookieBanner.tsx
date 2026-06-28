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
      <div className="max-w-[1240px] mx-auto bg-venezuela-ink rounded-card border border-white/10 p-6 shadow-2xl">
        <h3 className="font-display font-bold text-white text-base mb-1">
          {t("title")}
        </h3>
        <p className="text-[#bdb6ab] text-sm">{t("description")}</p>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={() => accept("all")}
            className="bg-venezuela-red text-white text-sm font-bold px-5 py-2.5 rounded-card hover:bg-red-700 transition-colors"
          >
            {t("accept_all")}
          </button>
          <button
            onClick={() => accept("necessary")}
            className="bg-white/10 text-white text-sm font-bold px-5 py-2.5 rounded-card border border-white/10 hover:bg-white/20 transition-colors"
          >
            {t("accept_necessary")}
          </button>
          <button
            onClick={() => accept("none")}
            className="text-[#8f897f] text-sm font-bold px-5 py-2.5 rounded-card hover:text-white transition-colors"
          >
            {t("reject_all")}
          </button>
        </div>
      </div>
    </div>
  );
}
