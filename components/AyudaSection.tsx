import { useTranslations, useLocale } from "next-intl";
import { organizacionesAyuda, type CategoriaAyuda } from "@/data/organizaciones";

const categories: CategoriaAyuda[] = [
  "ninos",
  "comida",
  "salud",
  "registro",
  "ingenieria",
  "animales",
];

const strokeColors: string[] = [
  "#00247D",
  "#CF142B",
  "#1F8A4C",
  "#00247D",
  "#CF142B",
  "#1F8A4C",
];

const linkColorClasses: string[] = [
  "text-venezuela-blue",
  "text-venezuela-red",
  "text-venezuela-green",
  "text-venezuela-blue",
  "text-venezuela-red",
  "text-venezuela-green",
];

export function AyudaSection() {
  const tSection = useTranslations("ayuda");
  const locale = useLocale() as "es" | "en";

  return (
    <section id="ayuda" className="py-[90px] px-6 scroll-mt-[66px]">
      <div className="max-w-[1240px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-7 h-[3px] bg-venezuela-green block" />
            <span className="text-venezuela-green text-xs font-bold uppercase tracking-[.2em]">
              {tSection("section_eyebrow")}
            </span>
            <span className="w-7 h-[3px] bg-venezuela-green block" />
          </div>
          <h2
            className="font-display font-black text-venezuela-ink text-center tracking-[-0.02em]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {tSection("section_title")}
          </h2>
          <p className="text-center text-[#5a554d] max-w-lg mx-auto mt-3">
            {tSection("section_description")}
          </p>
        </div>

        {/* Categories */}
        {categories.map((categoria, index) => {
          const orgs = organizacionesAyuda.filter(
            (o) => o.categoria === categoria
          );
          const number = String(index + 1).padStart(2, "0");
          const strokeColor = strokeColors[index];
          const linkColorClass = linkColorClasses[index];
          const bgClass =
            index % 2 === 0 ? "bg-venezuela-cream" : "bg-venezuela-cream-alt";

          return (
            <div key={categoria} className={`py-12 px-6 -mx-6 ${bgClass}`}>
              {/* Category header */}
              <div className="max-w-[1240px] mx-auto">
                <div className="flex items-start gap-6 mb-8">
                  {/* Large number */}
                  <span
                    className="font-display font-black text-[64px] leading-none select-none"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `2px ${strokeColor}`,
                    }}
                  >
                    {number}
                  </span>
                  {/* Divider */}
                  <span className="w-px h-16 bg-black/10 self-center block" />
                  {/* Title + description */}
                  <div className="flex-1">
                    <h3 className="font-display font-extrabold text-2xl text-venezuela-ink">
                      {tSection(`${categoria}.title`)}
                    </h3>
                    <p className="text-[#5a554d] text-sm mt-1">
                      {tSection(`${categoria}.description`)}
                    </p>
                  </div>
                </div>

                {/* Org cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orgs.map((org) => (
                    <div
                      key={org.id}
                      className="bg-white rounded-card border border-black/10 p-6 hover:-translate-y-0.5 transition"
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-display font-bold text-venezuela-ink">
                          {org.nombre}
                        </h4>
                        <span className="text-venezuela-green text-lg">✓</span>
                      </div>
                      <p className="text-[#5a554d] text-sm mt-3">
                        {org.descripcion[locale]}
                      </p>
                      <div className="mt-4">
                        <a
                          href={org.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-bold text-sm hover:underline ${linkColorClass}`}
                        >
                          {tSection("common.visit")} →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
