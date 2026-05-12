/* global React, Card, Pill, Ico, TomsCharts */
// ─────────────────────────────────────────────────────────────
// TOMS — Overview tab (EXTRA SPACIOUS · less content, more whitespace)
// ─────────────────────────────────────────────────────────────

const { Sparkline: SparkO, AreaChart, rng: rngO } = TomsCharts;

const PAD_O = "56px 64px";
const GAP_O = 32;

const trafficData = (() => {
  const r = rngO(7);
  return Array.from({ length: 48 }, (_, i) => {
    const base = 30 + 25 * Math.sin(i / 6) + 15 * Math.cos(i / 3);
    return Math.max(2, Math.round(base + r() * 18));
  });
})();

function OverviewTab() {
  return (
    <div style={{ padding: PAD_O, display: "grid", gap: GAP_O,
      gridTemplateColumns: "repeat(12, 1fr)" }}>

      {/* Page header — gives the page a quiet anchor */}
      <div style={{ gridColumn: "span 12", display: "flex",
        alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
        <div>
          <div style={{ fontSize: 12, color: "var(--fg-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.08em",
            fontWeight: 500, marginBottom: 10 }}>Terminal · Overview</div>
          <h1 className="mono" style={{ fontSize: 28, fontWeight: 500,
            letterSpacing: "-0.02em", margin: 0, lineHeight: 1.1 }}>
            NL750-K9F2H7B3
          </h1>
          <div style={{ marginTop: 10, fontSize: 14, color: "var(--fg-tertiary)" }}>
            Acme Coffee · MTL Store #4 · last sync 3 seconds ago
          </div>
        </div>
        <Pill tone="success" dot>Online</Pill>
      </div>

      {/* Two large headline KPIs only — generous padding */}
      <Card style={{ gridColumn: "span 6" }} padding={36}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, color: "var(--fg-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
            Battery health
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span className="mono" style={{ fontSize: 56, fontWeight: 500,
              letterSpacing: "-0.025em", lineHeight: 1 }}>86<span style={{
                fontSize: 24, color: "var(--fg-tertiary)" }}>%</span></span>
            <Pill tone="success" dot>Healthy</Pill>
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-tertiary)" }}>
            312 cycles · charging
          </div>
        </div>
      </Card>

      <Card style={{ gridColumn: "span 6" }} padding={36}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 12, color: "var(--fg-tertiary)",
            textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 500 }}>
            Transactions today
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
            <span className="mono" style={{ fontSize: 56, fontWeight: 500,
              letterSpacing: "-0.025em", lineHeight: 1 }}>1,043</span>
            <span style={{ fontSize: 15, color: "var(--success)" }}>↑ 8.4%</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--fg-tertiary)" }}>
            Peak 78 / hour · CAD $312K processed
          </div>
        </div>
      </Card>

      {/* One chart — tall, calm, no toolbar clutter */}
      <Card title="Data consumption" hint="Last 24 hours · MB / hour"
        style={{ gridColumn: "span 12" }} padding={36}>
        <div style={{ marginTop: 8 }}>
          <AreaChart data={trafficData} h={260} />
        </div>
      </Card>

    </div>
  );
}

window.OverviewTab = OverviewTab;
