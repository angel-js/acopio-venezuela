"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { redesSociales } from "@/data/social";

export function ContactSection() {
  const t = useTranslations("contact");
  const tSocial = useTranslations("social");
  const locale = useLocale() as "es" | "en";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "rate_limited">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else if (res.status === 429) {
        setStatus("rate_limited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const platformColors: Record<string, string> = {
    instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
    twitter: "bg-venezuela-ink",
    facebook: "bg-blue-600",
    tiktok: "bg-black",
    youtube: "bg-red-600",
  };

  const inputClass =
    "bg-white border border-[rgba(22,20,18,.15)] rounded-card px-4 py-3 text-sm w-full text-venezuela-ink placeholder-[#bdb6ab] focus:outline-none focus:ring-2 focus:ring-venezuela-blue";

  return (
    <section
      id="contacto"
      className="bg-venezuela-cream py-[90px] px-6 scroll-mt-[66px]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* LEFT COLUMN — Contact form */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-[3px] bg-venezuela-blue" />
              <span className="text-venezuela-blue text-xs font-bold uppercase tracking-[.2em]">
                CONTACTO
              </span>
            </div>

            <h2 className="font-display font-black text-venezuela-ink tracking-[-0.02em] text-3xl">
              {t("title")}
            </h2>
            <p className="text-[#5a554d] mt-3 text-sm">{t("description")}</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder={t("placeholder_name")}
                className={inputClass}
              />

              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder={t("placeholder_email")}
                className={inputClass}
              />

              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder={t("placeholder_message")}
                className={`${inputClass} resize-none`}
              />

              {status === "success" && (
                <div className="bg-[#e8f5e9] text-[#2e7d32] text-sm p-3 rounded-card">
                  {t("success")}
                </div>
              )}

              {status === "error" && (
                <div className="bg-red-50 text-red-800 text-sm p-3 rounded-card">
                  {t("error")}
                </div>
              )}

              {status === "rate_limited" && (
                <div className="bg-amber-50 text-amber-800 text-sm p-3 rounded-card">
                  {t("rate_limited")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-venezuela-blue text-white py-3.5 rounded-card font-bold text-sm hover:bg-blue-900 transition mt-2 disabled:opacity-60"
              >
                {status === "loading" ? "..." : t("submit")}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN — Social media */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-[3px] bg-venezuela-red" />
              <span className="text-venezuela-red text-xs font-bold uppercase tracking-[.2em]">
                REDES SOCIALES
              </span>
            </div>

            <h2 className="font-display font-black text-venezuela-ink tracking-[-0.02em] text-3xl">
              {tSocial("title")}
            </h2>
            <p className="text-[#5a554d] mt-3 text-sm">
              {tSocial("description")}
            </p>

            <ul className="mt-8 space-y-3">
              {redesSociales
                .filter((a) => a.activo)
                .map((account) => (
                  <li
                    key={account.id}
                    className="flex items-center gap-4 bg-white rounded-card border border-black/10 p-4 hover:-translate-y-0.5 transition"
                  >
                    {/* Avatar */}
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${platformColors[account.plataforma] ?? "bg-gray-400"}`}
                    >
                      {account.nombre.charAt(0).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-venezuela-ink text-sm">
                        {account.nombre}
                      </p>
                      <p className="text-[#8f897f] text-xs">
                        {tSocial(`platforms.${account.plataforma}`)}
                      </p>
                      <p className="text-[#5a554d] text-xs line-clamp-1">
                        {account.descripcion[locale]}
                      </p>
                    </div>

                    {/* Follow link */}
                    <a
                      href={account.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-venezuela-red text-sm font-bold hover:underline whitespace-nowrap"
                    >
                      Seguir →
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
