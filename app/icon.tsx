import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const dots = [
  { cx: 188, cy: 112 },
  { cx: 180, cy: 101 },
  { cx: 170, cy: 93 },
  { cx: 157, cy: 89 },
  { cx: 143, cy: 89 },
  { cx: 130, cy: 93 },
  { cx: 120, cy: 101 },
  { cx: 112, cy: 112 },
];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <svg width="32" height="32" viewBox="20 20 260 160">
          <rect x="20" y="20" width="260" height="53" fill="#CF9B27" />
          <rect x="20" y="73" width="260" height="54" fill="#00308F" />
          <rect x="20" y="127" width="260" height="53" fill="#CF141B" />
          {dots.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r={9} fill="white" />
          ))}
        </svg>
      </div>
    ),
    { ...size }
  );
}
