import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-venezuela-blue text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-display text-xl mb-2">Venezuela Ayuda</p>
            <p className="text-blue-200 text-sm">
              {t("made_with")}
            </p>
          </div>

          <div className="text-center md:text-right text-sm text-blue-200 space-y-1">
            <p>{t("updated", { date: "Junio 2026" })}</p>
            <a
              href="#contacto"
              className="hover:text-white transition-colors underline"
            >
              {t("suggest")}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-blue-700">
          <p className="text-center text-xs text-blue-300">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
