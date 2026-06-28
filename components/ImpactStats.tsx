"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const stats = [
  { key: "missing", value: 61000 },
  { key: "deaths", value: 1450 },
  { key: "families", value: 13000 },
] as const;

function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, active]);

  return count;
}

function StatCard({
  statKey,
  label,
  target,
  active,
}: {
  statKey: string;
  label: string;
  target: number;
  active: boolean;
}) {
  const count = useCountUp(target, active);
  const isYellow = statKey === "missing";

  return (
    <div className="py-6 px-4 md:px-8 border-b border-white/10 md:border-b-0 md:border-r last:border-0">
      <span
        className={`font-display font-black tracking-tight tabular-nums block ${
          isYellow ? "text-venezuela-yellow" : "text-white"
        }`}
        style={{ fontSize: "clamp(34px, 4.5vw, 52px)" }}
      >
        {count.toLocaleString()}+
      </span>
      <span className="uppercase text-[#b7b0a6] text-xs font-bold tracking-[.15em] mt-2 block">
        {label}
      </span>
    </div>
  );
}

export function ImpactStats() {
  const t = useTranslations("impact");
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-venezuela-ink py-[90px] px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-8">
          <span className="w-7 h-[3px] bg-venezuela-yellow inline-block mr-3 align-middle" />
          <span className="text-venezuela-yellow text-xs font-bold uppercase tracking-[.2em] align-middle">
            {t("eyebrow")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard
              key={stat.key}
              statKey={stat.key}
              label={t(`${stat.key}.label`)}
              target={stat.value}
              active={visible}
            />
          ))}
        </div>

        <p className="text-[13px] text-[#8f897f] mt-8">{t("source")}</p>
      </div>
    </section>
  );
}
