"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const stats = [
  { key: "missing", value: 61000 },
  { key: "deaths", value: 2295 },
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
    <div className="py-4 px-4 md:px-8 flex flex-col justify-center">
      <span
        className={`font-display font-black tracking-tight tabular-nums leading-none ${
          isYellow ? "text-venezuela-yellow" : "text-white"
        }`}
        style={{ fontSize: "clamp(20px, 2.5vw, 30px)" }}
      >
        {count.toLocaleString()}+
      </span>
      <span className="uppercase text-[#8f897f] text-[10px] font-bold tracking-[.12em] mt-1">
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
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Cifras del terremoto" className="bg-venezuela-ink border-b border-white/10 px-6">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-3 divide-x divide-white/10">
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
      </div>
    </section>
  );
}
