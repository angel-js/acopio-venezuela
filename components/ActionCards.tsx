"use client";

import { useTranslations } from "next-intl";

const SearchIcon = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFC400"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const HeartIcon = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFC400"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const PackageIcon = () => (
  <svg
    width="46"
    height="46"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFC400"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="1" width="20" height="20" rx="2" />
    <polyline points="16,1 20,5 20,23" />
    <line x1="12" y1="12" x2="12" y2="1" />
  </svg>
);

const cards = [
  {
    index: "01",
    bg: "bg-venezuela-blue",
    href: "#buscar",
    titleKey: "search_title",
    descKey: "search_desc",
    icon: <SearchIcon />,
    count: "13 plataformas",
  },
  {
    index: "02",
    bg: "bg-venezuela-red",
    href: "#donar",
    titleKey: "donate_title",
    descKey: "donate_desc",
    icon: <HeartIcon />,
    count: "8 organizaciones",
  },
  {
    index: "03",
    bg: "bg-venezuela-green",
    href: "#acopio",
    titleKey: "collect_title",
    descKey: "collect_desc",
    icon: <PackageIcon />,
    count: "24 centros",
  },
] as const;

export function ActionCards() {
  const t = useTranslations("actions");

  return (
    <section aria-label="Cómo ayudar" className="bg-venezuela-cream py-[90px] px-6">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-7 h-[3px] bg-venezuela-red inline-block" />
          <span className="text-venezuela-red text-xs font-bold uppercase tracking-[.2em]">
            {t("eyebrow")}
          </span>
          <span className="w-7 h-[3px] bg-venezuela-red inline-block" />
        </div>

        <h2
          className="font-display font-black text-venezuela-ink text-center tracking-[-0.02em]"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          {t("title")}
        </h2>

        <p className="text-[#5a554d] text-center max-w-lg mx-auto mt-3">
          {t("description")}
        </p>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {cards.map((card) => (
            <a
              key={card.index}
              href={card.href}
              className={`${card.bg} min-h-[340px] rounded-card p-8 flex flex-col transition hover:-translate-y-0.5`}
            >
              {/* Top-right index */}
              <div className="flex justify-end">
                <span className="font-display font-black text-white/30 text-lg">
                  {card.index}
                </span>
              </div>

              {/* Icon */}
              <div className="mt-2">{card.icon}</div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-white text-[28px] mt-4">
                {t(card.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-sm mt-2 flex-1">
                {t(card.descKey)}
              </p>

              {/* Footer */}
              <div className="border-t border-white/20 mt-auto pt-4 flex justify-between items-center">
                <span className="text-white/70 text-sm">{card.count}</span>
                <span className="text-white text-sm font-bold">
                  {t("go_now")} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
