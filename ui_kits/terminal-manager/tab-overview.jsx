/* global React, Sidebar, Header, Card, Stat, Toggle, FieldRow, Pill, ActionButton, Ico, TomsCharts */
// ─────────────────────────────────────────────────────────────
// TOMS — Overview tab (Calm density · less content, more whitespace)
// ─────────────────────────────────────────────────────────────

const { Sparkline: SparkO, AreaChart, BarPair, HBar, Donut, StackedBar, rng: rngO } = TomsCharts;

// Stable sample data
const trafficData = (() => {
  const r = rngO(7);
  return Array.from({ length: 48 }, (_, i) => {
    const base = 30 + 25 * Math.sin(i / 6) + 15 * Math.cos(i / 3);
    return Math.max(2, Math.round(base + r() * 18));
  });
})();

const uptimeData = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((label, i) => {
  const r = rngO(11 + i);
  const device = 16 + r() * 6;
  const app = device * (0.55 + r() * 0.3);
  return { label, app: Math.round(app * 10) / 10, device: Math.round(device * 10) / 10 };
});

function OverviewTab() {
  return (
    <div style={{ padding: "32px 40px", display: "grid", gap: 24,
      gridTemplateColumns: "repeat(12, 1fr)" }}>

      {/* AI insight banner — generous padding, taller */}
      <div style={{
        gridColumn: "span 12",
        display: "flex", alignItems: "center", gap: 16,
        padding: "16px 22px", borderRadius: 12,
        background: "var(--accent-gradient-soft)",
        border: "1px solid var(--accent-200)",
      }}>
        <span style={{
          width: 30, height: 30, borderRadius: 8, flexShrink: 0,
          background: "var(--bg-surface)", color: "var(--accent-700)",
          display: "grid", placeItems: "center",
          border: "1px solid var(--accent-200)",
        }}>
          <Ico name="sparkle" size={15} />
        </span>
        <div style={{ flex: 1, fontSize: 14, color: "var(--fg-primary)", lineHeight: 1.55 }}>
          <span style={{ fontWeight: 500 }}>Battery cycles trending high.</span>
          <span style={{ color: "var(--fg-secondary)" }}>
            &nbsp;312 of 500 warrantied cycles used in 8 months — replacement recommended by{" "}
            <span className="mono">Q2 2027</span>.
          </span>
        </div>
        <button style={{ fontSize: 13, color: "var(--accent-700)", fontWeight: 500 }}>
          View plan →
        </button>
      </div>

      {/* Three headline KPIs — bigger numbers, more breathing room */}
      <Card style={{ gridColumn: "span 4" }} padding={24}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: "var(--fg-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
            Battery health
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <Donut value={86} color="var(--success)" />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="mono" style={{ fontSize: 30, fontWeight: 500,
                letterSpacing: "-0.02em", lineHeight: 1.05 }}>86%</span>
              <Pill tone="success" dot>Healthy</Pill>
            </div>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)",
            paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
            312 cycles · 31.2°C · charging on AC
          </div>
        </div>
      </Card>

      <Card style={{ gridColumn: "span 4" }} padding={24}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: "var(--fg-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
            Transactions today
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 30, fontWeight: 500,
              letterSpacing: "-0.02em", lineHeight: 1.05 }}>1,043</span>
            <span style={{ fontSize: 13, color: "var(--success)" }}>↑ 8.4%</span>
          </div>
          <SparkO data={trafficData.slice(-30)} w={240} h={36}
            stroke="var(--accent-600)" fill="var(--accent-100)" />
          <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)",
            paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
            Peak 78 / hour at 14:00 · avg 32/hour
          </div>
        </div>
      </Card>

      <Card style={{ gridColumn: "span 4" }} padding={24}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: "var(--fg-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
            Data this month
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="mono" style={{ fontSize: 30, fontWeight: 500,
              letterSpacing: "-0.02em", lineHeight: 1.05 }}>4.21</span>
            <span style={{ fontSize: 14, color: "var(--fg-tertiary)" }}>GB</span>
            <span style={{ fontSize: 13, color: "var(--success)", marginLeft: "auto" }}>↑ 12%</span>
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--fg-tertiary)" }}>
            <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2,
              background: "var(--accent-600)", marginRight: 6 }} />Cellular 2.84</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2,
              background: "var(--bg-active)", border: "1px solid var(--border-strong)",
              marginRight: 6 }} />WiFi 1.37</span>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)",
            paddingTop: 12, borderTop: "1px solid var(--border-subtle)" }}>
            Forecast ~218 MB tomorrow
          </div>
        </div>
      </Card>

      {/* Traffic chart — full width, more height */}
      <Card title="Data consumption · last 24h" hint="MB / hour"
        style={{ gridColumn: "span 12" }}
        padding={24}
        action={
          <div style={{ display: "flex", gap: 4, padding: 3,
            background: "var(--bg-sunken)", borderRadius: 7, fontSize: 12 }}>
            {["Cellular", "WiFi", "All"].map((s, i) => (
              <button key={s} style={{
                padding: "5px 14px", borderRadius: 5,
                background: i === 2 ? "var(--bg-surface)" : "transparent",
                color: i === 2 ? "var(--fg-primary)" : "var(--fg-tertiary)",
                fontWeight: i === 2 ? 500 : 400,
                boxShadow: i === 2 ? "var(--shadow-xs)" : "none",
              }}>{s}</button>
            ))}
          </div>
        }>
        <AreaChart data={trafficData} h={200} />
      </Card>

      {/* Two-up: Uptime + Location */}
      <Card title="Uptime · last 7 days" hint="App vs. device · hours"
        style={{ gridColumn: "span 7" }}
        padding={24}
        action={
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
              color: "var(--fg-tertiary)" }}>
              <span style={{ width: 9, height: 9, background: "var(--accent-500)",
                borderRadius: 2 }} />App
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6,
              color: "var(--fg-tertiary)" }}>
              <span style={{ width: 9, height: 9, background: "var(--bg-active)",
                border: "1px solid var(--border-strong)", borderRadius: 2 }} />Device
            </span>
          </div>
        }>
        <BarPair data={uptimeData} h={200} />
      </Card>

      <Card title="Location" hint="Live"
        style={{ gridColumn: "span 5" }} padding={0}>
        <div style={{
          height: 220, position: "relative",
          background: "linear-gradient(135deg, oklch(96% 0.01 240) 0%, oklch(94% 0.015 220) 100%)",
          borderBottom: "1px solid var(--border-subtle)",
          overflow: "hidden",
        }}>
          <svg width="100%" height="100%" viewBox="0 0 320 220" style={{ position: "absolute", inset: 0 }}>
            <g stroke="oklch(85% 0.01 240)" strokeWidth="1" fill="none">
              <line x1="0" y1="55" x2="320" y2="55"/>
              <line x1="0" y1="115" x2="320" y2="115"/>
              <line x1="0" y1="175" x2="320" y2="175"/>
              <line x1="80" y1="0" x2="80" y2="220"/>
              <line x1="170" y1="0" x2="170" y2="220"/>
              <line x1="245" y1="0" x2="245" y2="220"/>
            </g>
            <g stroke="oklch(82% 0.015 240)" strokeWidth="3" fill="none" opacity="0.6">
              <line x1="0" y1="115" x2="320" y2="115"/>
              <line x1="170" y1="0" x2="170" y2="220"/>
            </g>
            <rect x="100" y="65" width="55" height="32" fill="oklch(92% 0.01 240)" stroke="oklch(85% 0.01 240)"/>
            <rect x="190" y="130" width="40" height="28" fill="oklch(92% 0.01 240)" stroke="oklch(85% 0.01 240)"/>
            <rect x="20" y="130" width="50" height="28" fill="oklch(92% 0.01 240)" stroke="oklch(85% 0.01 240)"/>
            <g transform="translate(170 115)">
              <circle r="22" fill="var(--accent-500)" opacity="0.15">
                <animate attributeName="r" values="14;30;14" dur="2.4s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite"/>
              </circle>
              <circle r="7" fill="var(--accent-600)" stroke="white" strokeWidth="2.5"/>
            </g>
          </svg>
        </div>
        <div style={{ padding: 20, fontSize: 13, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
            <span style={{ color: "var(--fg-tertiary)" }}>Address</span>
            <span style={{ fontWeight: 450, textAlign: "right" }}>
              372 Ave du Mont-Royal E, Montréal
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "var(--fg-tertiary)" }}>Last fix</span>
            <span className="mono">2s ago · ±4m</span>
          </div>
        </div>
      </Card>

      {/* Audit / activity timeline — single calm column */}
      <Card title="Recent activity" hint="Last 24 hours"
        style={{ gridColumn: "span 12" }}
        padding={24}
        action={
          <button style={{ fontSize: 12.5, color: "var(--fg-secondary)",
            padding: "5px 12px", border: "1px solid var(--border-default)",
            borderRadius: 6 }}>View all →</button>
        }>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            { e: "Firmware update pushed",     who: "Elena C.",       t: "12:48", tone: "success" },
            { e: "App deployment scheduled",   who: "auto · scheduler", t: "12:32", tone: "info" },
            { e: "Diagnostics run complete",   who: "Elena C.",       t: "11:18", tone: "success" },
            { e: "Screen lock command failed", who: "Marc D.",        t: "10:42", tone: "warning" },
          ].map((it, i, arr) => (
            <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0",
              alignItems: "center",
              borderBottom: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
                background: it.tone === "success" ? "var(--success)"
                          : it.tone === "warning" ? "var(--warning)"
                          : "var(--info)" }} />
              <div style={{ flex: 1, fontSize: 14 }}>{it.e}</div>
              <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)" }}>{it.who}</div>
              <div className="mono" style={{ fontSize: 12.5, color: "var(--fg-tertiary)",
                width: 60, textAlign: "right" }}>{it.t}</div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}

window.OverviewTab = OverviewTab;
