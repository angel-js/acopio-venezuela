import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ayuda Venezuela — Información de ayuda humanitaria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 7 stars in arc for the OG flag
function flagStars(cx: number, cy: number, arcR: number) {
  return Array.from({ length: 7 }, (_, i) => {
    const angle = Math.PI + (i / 6) * Math.PI;
    return {
      x: cx + arcR * Math.cos(angle),
      y: cy + arcR * Math.sin(angle) * 0.38,
    };
  });
}

export default async function Image() {
  // Flag dimensions in OG image
  const flagW = 340;
  const flagH = 226;
  const stripeH = flagH / 3;
  const fcx = flagW / 2;
  const fcy = flagH / 2;
  const stars = flagStars(fcx, fcy, flagW * 0.3);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#161412",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Left: text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "64px 48px 64px 72px",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 28, height: 3, background: "#CF142B" }} />
            <span style={{ color: "#CF142B", fontSize: 13, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              EMERGENCIA HUMANITARIA
            </span>
          </div>

          {/* Title */}
          <div style={{ color: "#ffffff", fontSize: 80, fontWeight: 900, lineHeight: 0.94, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Ayuda
            <br />
            Venezuela
          </div>

          {/* Subtitle */}
          <div style={{ color: "#bdb6ab", fontSize: 20, lineHeight: 1.5, maxWidth: 520, marginBottom: 48 }}>
            Desaparecidos, donaciones verificadas y centros de acopio. Todo en un lugar.
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 36 }}>
            {[
              { num: "61,000+", label: "REPORTADAS", yellow: true },
              { num: "1,719+", label: "FALLECIDAS", yellow: false },
              { num: "13,000+", label: "FAMILIAS", yellow: false },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ color: s.yellow ? "#FFC400" : "#ffffff", fontSize: 26, fontWeight: 900 }}>
                  {s.num}
                </span>
                <span style={{ color: "#8f897f", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Venezuelan flag */}
        <div
          style={{
            width: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 56px 0 24px",
          }}
        >
          <svg
            width={flagW}
            height={flagH}
            viewBox={`0 0 ${flagW} ${flagH}`}
            style={{ borderRadius: 6, boxShadow: "0 8px 32px rgba(0,0,0,.5)" }}
          >
            {/* Yellow stripe */}
            <rect width={flagW} height={stripeH} fill="#FFC400" />
            {/* Blue stripe */}
            <rect y={stripeH} width={flagW} height={stripeH} fill="#00247D" />
            {/* Red stripe */}
            <rect y={stripeH * 2} width={flagW} height={stripeH} fill="#CF142B" />
            {/* 7 white stars */}
            {stars.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={9} fill="white" />
            ))}
          </svg>
        </div>

        {/* Domain bottom-left */}
        <div style={{ position: "absolute", bottom: 40, left: 72, color: "#5a554d", fontSize: 15, letterSpacing: "0.06em" }}>
          {process.env.NEXT_PUBLIC_SITE_URL?.replace("https://", "") ?? "ayudavenezuela2026.org"}
        </div>
      </div>
    ),
    { ...size }
  );
}
