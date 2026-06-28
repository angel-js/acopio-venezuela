import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-venezuela-ink py-16 px-6">
      <div className="max-w-[1240px] mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Left: Logo + updated */}
          <div>
            <div className="flex items-center gap-3">
              {/* Flag stripes */}
              <div className="flex flex-col rounded-sm overflow-hidden w-4 h-6">
                <div className="flex-1 bg-venezuela-yellow" />
                <div className="flex-1 bg-venezuela-blue" />
                <div className="flex-1 bg-venezuela-red" />
              </div>
              <span className="font-display font-extrabold text-white text-lg">
                Venezuela Ayuda
              </span>
            </div>
            <p className="text-[#8f897f] text-sm mt-2">
              {t("updated", { date: "28 jun 2026" })}
            </p>
          </div>

          {/* Right: Suggest link */}
          <div>
            <a
              href="#contacto"
              className="text-[#8f897f] text-sm underline hover:text-white transition-colors"
            >
              {t("suggest")}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <p className="text-[#8f897f] text-[13px]">{t("disclaimer")}</p>
          <p className="text-[#8f897f] text-[13px]">{t("made_with")}</p>
        </div>
      </div>
    </footer>
  );
}
