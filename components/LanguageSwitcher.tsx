"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1 bg-white/80 rounded-full px-1 py-0.5 border border-gray-200">
      <button
        onClick={() => switchLocale("es")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          locale === "es"
            ? "bg-venezuela-blue text-white"
            : "text-gray-600 hover:text-venezuela-blue"
        }`}
      >
        ES
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
          locale === "en"
            ? "bg-venezuela-blue text-white"
            : "text-gray-600 hover:text-venezuela-blue"
        }`}
      >
        EN
      </button>
    </div>
  );
}
