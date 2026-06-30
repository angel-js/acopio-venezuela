export function VenezuelaFlag({ width = 44, height = 30 }: { width?: number; height?: number }) {
  const scaleX = width / 300;
  const scaleY = height / 200;

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

  const r = Math.max(1, width * 0.018);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 200"
      aria-hidden="true"
      style={{ display: "block", borderRadius: 2 }}
    >
      <rect x="20" y="20" width="260" height="160" rx="10" fill="#CF9B27" />
      <rect x="20" y="73" width="260" height="54" fill="#00308F" />
      <rect x="20" y="127" width="260" height="53" fill="#CF141B" />
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={r * (300 / width)} fill="white" />
      ))}
    </svg>
  );
}
