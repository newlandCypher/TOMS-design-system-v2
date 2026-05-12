/* global React */
// ─────────────────────────────────────────────────────────────
// TOMS — Charts (real SVG charts, restrained styling)
// Sparkline · Area · Bar · Heatmap · Donut · Battery curve
// ─────────────────────────────────────────────────────────────

const { useMemo: useChartMemo } = React;

// Deterministic pseudo-random (so layouts are stable across renders)
function rng(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function Sparkline({ data, w = 90, h = 26, stroke = "var(--accent-600)", fill }) {
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - 2) + 1;
    const y = h - 2 - ((v - min) / span) * (h - 4);
    return [x, y];
  });
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const area = `${path} L ${(w - 1).toFixed(1)},${h - 1} L 1,${h - 1} Z`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      {fill && <path d={area} fill={fill} />}
      <path d={path} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AreaChart({ data, w = 580, h = 140, color = "var(--accent-600)", fill = "var(--accent-100)" }) {
  const padL = 28, padR = 8, padT = 10, padB = 22;
  const min = 0, max = Math.max(...data) * 1.1;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const pts = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * innerW;
    const y = padT + innerH - ((v - min) / (max - min || 1)) * innerH;
    return [x, y];
  });
  const path = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ");
  const area = `${path} L ${pts[pts.length-1][0].toFixed(1)},${padT+innerH} L ${pts[0][0].toFixed(1)},${padT+innerH} Z`;
  const ticks = [0, 0.5, 1].map((p) => padT + innerH - p * innerH);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      {ticks.map((y, i) => (
        <line key={i} x1={padL} x2={w-padR} y1={y} y2={y} stroke="var(--border-subtle)" strokeDasharray="2 3" />
      ))}
      <path d={area} fill={fill} opacity="0.7" />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last point */}
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3" fill={color} />
      <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="6" fill={color} opacity="0.18" />
      {/* Y labels */}
      {[0, 0.5, 1].map((p, i) => (
        <text key={i} x={padL - 6} y={padT + innerH - p * innerH + 3}
          textAnchor="end" fontSize="9.5" fill="var(--fg-quaternary)" fontFamily="var(--font-mono)">
          {Math.round(max * p)}
        </text>
      ))}
      {/* X labels */}
      {["00", "06", "12", "18", "24"].map((l, i) => (
        <text key={i} x={padL + (i / 4) * innerW} y={h - 6}
          textAnchor="middle" fontSize="9.5" fill="var(--fg-quaternary)" fontFamily="var(--font-mono)">
          {l}:00
        </text>
      ))}
    </svg>
  );
}

function BarPair({ data, w = 580, h = 160 }) {
  // data: [{label, app, device}]
  const padL = 32, padR = 8, padT = 8, padB = 28;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const max = Math.max(...data.flatMap((d) => [d.app, d.device])) * 1.15;
  const groupW = innerW / data.length;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block" }}>
      {[0, 0.5, 1].map((p, i) => (
        <line key={i} x1={padL} x2={w-padR} y1={padT + innerH - p * innerH} y2={padT + innerH - p * innerH}
          stroke="var(--border-subtle)" strokeDasharray="2 3" />
      ))}
      {data.map((d, i) => {
        const cx = padL + i * groupW + groupW / 2;
        const bw = Math.min(14, groupW * 0.35);
        const ha = (d.app / max) * innerH;
        const hd = (d.device / max) * innerH;
        return (
          <g key={i}>
            <rect x={cx - bw - 1} y={padT + innerH - ha} width={bw} height={ha}
              fill="var(--accent-500)" rx="2"/>
            <rect x={cx + 1} y={padT + innerH - hd} width={bw} height={hd}
              fill="var(--bg-active)" stroke="var(--border-strong)" rx="2"/>
            <text x={cx} y={h - 10} textAnchor="middle" fontSize="9.5"
              fill="var(--fg-tertiary)" fontFamily="var(--font-mono)">{d.label}</text>
          </g>
        );
      })}
      {[0, 0.5, 1].map((p, i) => (
        <text key={i} x={padL - 6} y={padT + innerH - p * innerH + 3}
          textAnchor="end" fontSize="9.5" fill="var(--fg-quaternary)" fontFamily="var(--font-mono)">
          {Math.round(max * p)}h
        </text>
      ))}
    </svg>
  );
}

function HBar({ label, real, predict, max }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: "6px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
        <span style={{ flex: 1, fontWeight: 450 }}>{label}</span>
        <span className="mono" style={{ color: "var(--fg-tertiary)", fontSize: 11 }}>
          {real}MB <span style={{ color: "var(--fg-quaternary)" }}>/ {predict}MB</span>
        </span>
      </div>
      <div style={{ position: "relative", height: 6, background: "var(--bg-sunken)", borderRadius: 3 }}>
        <div style={{
          position: "absolute", inset: 0, width: `${(predict / max) * 100}%`,
          background: "var(--bg-active)", borderRadius: 3,
          borderRight: "1px dashed var(--border-strong)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, height: "100%",
          width: `${(real / max) * 100}%`,
          background: "var(--accent-600)", borderRadius: 3,
        }} />
      </div>
    </div>
  );
}

function Heatmap({ data, w = 7, h = 5 }) {
  // data is w*h cells with 0..1 values
  const cell = 16, gap = 3;
  const days = ["M","T","W","T","F","S","S"];
  const wks = ["W1","W2","W3","W4","W5"];
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: gap, paddingTop: 18 }}>
        {wks.map((d, i) => (
          <div key={i} style={{ height: cell, display: "flex", alignItems: "center",
            fontSize: 10, color: "var(--fg-quaternary)", fontFamily: "var(--font-mono)" }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: gap }}>
        <div style={{ display: "flex", gap: gap }}>
          {days.map((d, i) => (
            <div key={i} style={{ width: cell, textAlign: "center",
              fontSize: 10, color: "var(--fg-quaternary)", fontFamily: "var(--font-mono)" }}>{d}</div>
          ))}
        </div>
        {Array.from({ length: h }).map((_, r) => (
          <div key={r} style={{ display: "flex", gap: gap }}>
            {Array.from({ length: w }).map((_, c) => {
              const v = data[r * w + c] ?? 0;
              return (
                <div key={c} style={{
                  width: cell, height: cell, borderRadius: 3,
                  background: v === 0 ? "var(--bg-sunken)"
                    : `oklch(${100 - v * 35}% ${0.04 + v * 0.18} 278)`,
                  border: "1px solid var(--border-subtle)",
                }} />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Donut({ value, size = 76, stroke = 8, color = "var(--accent-600)", track = "var(--bg-active)" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${(value/100)*c} ${c}`}
        transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x={size/2} y={size/2 + 4} textAnchor="middle" fontSize="14"
        fontFamily="var(--font-mono)" fontWeight="500" fill="var(--fg-primary)">
        {value}%
      </text>
    </svg>
  );
}

function StackedBar({ segments, h = 8 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  return (
    <div style={{ display: "flex", height: h, borderRadius: 4, overflow: "hidden",
      background: "var(--bg-sunken)" }}>
      {segments.map((s, i) => (
        <div key={i} title={`${s.label}: ${s.value}`} style={{
          width: `${(s.value / total) * 100}%`,
          background: s.color,
        }} />
      ))}
    </div>
  );
}

window.TomsCharts = { Sparkline, AreaChart, BarPair, HBar, Heatmap, Donut, StackedBar, rng };
