/* global React, Card, Stat, Toggle, FieldRow, Pill, ActionButton, Ico, TomsCharts */
// EXTRA SPACIOUS · less content, more whitespace, larger type
const { Sparkline: SparkB, Donut: DonutB } = TomsCharts;

const PAD = "56px 64px";
const GAP = 32;

// ─────────────────────────────────────────────────────────────
// Basic Info
// ─────────────────────────────────────────────────────────────
function BasicTab() {
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="Identity" style={{ gridColumn: "span 6" }} padding={36}>
        <FieldRow label="Vendor">Newland</FieldRow>
        <FieldRow label="Model" mono>N750P</FieldRow>
        <FieldRow label="Serial number" mono copy>NL750-K9F2H7B3</FieldRow>
        <FieldRow label="PCI version" mono>v6.0.1</FieldRow>
      </Card>

      <Card title="Compliance"
        action={<Pill tone="success" dot>Pass</Pill>}
        style={{ gridColumn: "span 6" }} padding={36}>
        <FieldRow label="Root status"><Pill tone="success" dot>Not rooted</Pill></FieldRow>
        <FieldRow label="Bootloader"><Pill tone="success" dot>Locked</Pill></FieldRow>
        <FieldRow label="Last audit" mono>2026-05-04 06:00</FieldRow>
      </Card>

      <Card title="Network" hint="Cellular · LTE Cat-4"
        action={<Pill tone="success" dot>Connected</Pill>}
        style={{ gridColumn: "span 12" }} padding={36}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36 }}>
          <div>
            <FieldRow label="Operator">Bell Mobility</FieldRow>
            <FieldRow label="Signal" mono>−67 dBm</FieldRow>
          </div>
          <div>
            <FieldRow label="SSID">office-5g</FieldRow>
            <FieldRow label="IPv4" mono copy>10.42.118.27</FieldRow>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App & Firmware
// ─────────────────────────────────────────────────────────────
function AppsTab() {
  const apps = [
    { name: "PaymentCore", v: "8.4.2", status: "running", icon: "card", iconBg: "var(--accent-500)" },
    { name: "Inventory Sync", v: "3.1.0", status: "running", icon: "store", iconBg: "var(--success)" },
    { name: "TOMS Agent", v: "4.2.1", status: "running", icon: "shield", iconBg: "var(--fg-secondary)" },
  ];

  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="Firmware"
        action={<ActionButton primary icon="flash">Push update</ActionButton>}
        style={{ gridColumn: "span 12" }} padding={40}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--fg-tertiary)", textTransform: "uppercase",
              letterSpacing: "0.08em", marginBottom: 14, fontWeight: 500 }}>Current</div>
            <div className="mono" style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>v4.2.1</div>
            <div style={{ fontSize: 13, color: "var(--fg-tertiary)", marginTop: 12 }}>
              Built 2026-03-20
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--fg-tertiary)", textTransform: "uppercase",
              letterSpacing: "0.08em", marginBottom: 14, fontWeight: 500 }}>Available</div>
            <div className="mono" style={{ fontSize: 36, fontWeight: 500, letterSpacing: "-0.02em",
              lineHeight: 1, color: "var(--accent-700)" }}>v4.3.0</div>
            <div style={{ fontSize: 13, color: "var(--fg-tertiary)", marginTop: 12 }}>
              42 MB · ~2 min downtime
            </div>
          </div>
        </div>
      </Card>

      <Card title="Applications" hint={`${apps.length} running`}
        style={{ gridColumn: "span 12" }} padding={0}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <tbody>
            {apps.map((a, i) => (
              <tr key={i} style={{ borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
                <td style={{ padding: "24px 36px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <span style={{
                      width: 44, height: 44, borderRadius: 11,
                      background: a.iconBg, color: "white",
                      display: "grid", placeItems: "center", flexShrink: 0,
                    }}>
                      <Ico name={a.icon} size={20} />
                    </span>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 15.5 }}>{a.name}</div>
                      <div className="mono" style={{ fontSize: 12.5, color: "var(--fg-tertiary)", marginTop: 4 }}>
                        v{a.v}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "24px 36px", textAlign: "right" }}>
                  <Pill tone="success" dot>Running</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings
// ─────────────────────────────────────────────────────────────
function SettingsTab() {
  const [vol, setVol] = React.useState(60);
  const [bri, setBri] = React.useState(72);
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="Environment" hint="Display, sound & locale"
        style={{ gridColumn: "span 12" }} padding={40}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <SliderRow label="Brightness" value={bri} setValue={setBri} />
            <SliderRow label="Media volume" value={vol} setValue={setVol} />
            <SliderRow label="Key tone" value={45} setValue={() => {}} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <ToggleRow label="Auto time sync" sub="NTP · time.toms.io" on />
            <ToggleRow label="Adaptive sleep" sub="Dim after 2 min idle" on />
            <ToggleRow label="Haptic feedback" sub="On key press" />
            <ToggleRow label="Dark mode follows location" sub="Sunset → sunrise" on />
          </div>
        </div>
      </Card>

      <Card title="Connectivity" style={{ gridColumn: "span 12" }} padding={36}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { i: "signal", l: "Cellular", s: "LTE · Bell", on: true },
            { i: "wifi",  l: "WiFi", s: "office-5g", on: true },
          ].map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 18,
              padding: "22px 24px", border: "1px solid var(--border-subtle)",
              borderRadius: 12, background: "var(--bg-surface)",
            }}>
              <span style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: "var(--accent-50)", color: "var(--accent-700)",
                display: "grid", placeItems: "center",
              }}>
                <Ico name={c.i} size={18} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{c.l}</div>
                <div className="tm-truncate" style={{ fontSize: 12.5, color: "var(--fg-tertiary)", marginTop: 3 }}>{c.s}</div>
              </div>
              <Toggle on={c.on} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function SliderRow({ label, value, setValue }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 14 }}>
        <span style={{ color: "var(--fg-secondary)" }}>{label}</span>
        <span className="mono" style={{ color: "var(--fg-tertiary)" }}>{value}%</span>
      </div>
      <input type="range" min="0" max="100" value={value}
        onChange={(e) => setValue && setValue(+e.target.value)}
        style={{ width: "100%", accentColor: "var(--accent-600)" }} />
    </div>
  );
}

function ToggleRow({ label, sub, on }) {
  const [v, setV] = React.useState(!!on);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14,
      padding: "18px 20px", borderRadius: 12,
      border: "1px solid var(--border-subtle)", background: "var(--bg-surface)",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)", marginTop: 3 }} className="tm-truncate">{sub}</div>}
      </div>
      <Toggle on={v} onChange={setV} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Remote Assistance — single calm column of tools
// ─────────────────────────────────────────────────────────────
function RemoteTab() {
  const items = [
    { i: "diag", l: "Hardware diagnostics", s: "Self-test 12 modules" },
    { i: "log",  l: "Real-time log",        s: "Tail journalctl" },
    { i: "remote", l: "Remote control",     s: "Mirror screen + control" },
    { i: "lock",   l: "Lock / unlock",      s: "Remote screen lock" },
  ];
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="Diagnostics" hint="Streaming tools"
        style={{ gridColumn: "span 12" }} padding={36}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {items.map((it, i) => (
            <button key={i} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10,
              padding: "26px 28px", borderRadius: 12, textAlign: "left",
              border: "1px solid var(--border-subtle)", background: "var(--bg-surface)",
              transition: "all .12s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}>
              <span style={{
                width: 38, height: 38, borderRadius: 10,
                background: "var(--accent-50)", color: "var(--accent-700)",
                display: "grid", placeItems: "center",
              }}><Ico name={it.i} size={17} /></span>
              <div style={{ fontSize: 15, fontWeight: 500, marginTop: 6 }}>{it.l}</div>
              <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)" }}>{it.s}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Files
// ─────────────────────────────────────────────────────────────
function FilesTab() {
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="File task center"
        action={<ActionButton primary icon="plus">New task</ActionButton>}
        style={{ gridColumn: "span 12" }} padding={0}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14.5 }}>
          <tbody>
            {[
              { n: "Daily syslog · 2026-05-04", size: "4.2 MB", time: "12 min ago" },
              { n: "Hardware self-test",        size: "82 KB",  time: "1h ago" },
              { n: "System snapshot",           size: "16.4 MB",time: "Yesterday" },
            ].map((r, i) => (
              <tr key={i} style={{ borderTop: i ? "1px solid var(--border-subtle)" : "none" }}>
                <td style={{ padding: "26px 36px", fontWeight: 500 }}>{r.n}</td>
                <td style={{ padding: "26px 36px", textAlign: "right",
                  color: "var(--fg-tertiary)" }} className="mono">{r.size}</td>
                <td style={{ padding: "26px 36px", textAlign: "right",
                  color: "var(--fg-tertiary)" }} className="mono">{r.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

Object.assign(window, { BasicTab, AppsTab, SettingsTab, RemoteTab, FilesTab });
