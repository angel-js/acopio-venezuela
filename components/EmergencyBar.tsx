"use client";

import { useState } from "react";

export function EmergencyBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-venezuela-red text-white text-xs py-2 px-4 flex items-center justify-between">
      {/* Left: pulsing dot + text */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-venezuela-yellow animate-pulse flex-shrink-0" />
        <span className="uppercase tracking-[.12em] font-semibold">
          EMERGENCIA ACTIVA · TERREMOTO VENEZUELA
        </span>
      </div>

      {/* Dismiss button */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Cerrar"
        className="ml-4 text-white/80 hover:text-white transition-colors flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
