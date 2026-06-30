"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState } from "react";
import { VenezuelaFlag } from "./VenezuelaFlag";

export function Navbar() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { key: "desaparecidos", href: "#buscar" },
    { key: "donaciones", href: "#donar" },
    { key: "tipos", href: "#ayuda" },
    { key: "acopio", href: "#acopio" },
    { key: "contacto", href: "#contacto" },
  ] as const;

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#d6cfc4]"
      style={{ background: "rgba(245,240,232,.88)", backdropFilter: "blur(12px)", height: "66px" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <VenezuelaFlag width={44} height={30} />
          <span className="font-display font-extrabold text-lg tracking-tight text-venezuela-ink">
            Ayuda Venezuela
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-[13px] font-semibold text-[#3a352f] hover:text-venezuela-blue transition-colors whitespace-nowrap"
            >
              {t(link.key)}
            </a>
          ))}
          <LanguageSwitcher />
        </div>

        {/* Mobile: language switcher + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#3a352f] hover:text-venezuela-blue"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-[#d6cfc4]"
          style={{ background: "rgba(245,240,232,.96)" }}
        >
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-6 text-sm font-semibold text-[#3a352f] hover:text-venezuela-blue transition-colors"
            >
              {t(link.key)}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
