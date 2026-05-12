/* global React, Card, Stat, Toggle, FieldRow, Pill, ActionButton, Ico, TomsCharts */
// Calm density · less content, more whitespace, larger type
const { Sparkline: SparkB, Donut: DonutB } = TomsCharts;

const PAD = "32px 40px";
const GAP = 24;

function tempCurve() {
  const pts = [];
  const r = (() => { let s = 41; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })();
  for (let i = 0; i < 48; i++) pts.push(28 + 4 * Math.sin(i / 7) + r() * 1.6);
  return pts;
}

// ─────────────────────────────────────────────────────────────
// Basic Info
// ─────────────────────────────────────────────────────────────
function BasicTab() {
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="Identity" style={{ gridColumn: "span 6" }} padding={24}>
        <FieldRow label="Vendor">Newland</FieldRow>
        <FieldRow label="Model" mono>N750P</FieldRow>
        <FieldRow label="Serial number" mono copy>NL750-K9F2H7B3</FieldRow>
        <FieldRow label="PCI version" mono>PCI 6.x · v6.0.1</FieldRow>
        <FieldRow label="Group">
          <Pill tone="accent">Acme&nbsp;Coffee</Pill>
          <Pill tone="neutral">MTL&nbsp;Store&nbsp;#4</Pill>
        </FieldRow>
      </Card>

      <Card title="Compliance" hint="Audit"
        action={<Pill tone="success" dot>All checks pass</Pill>}
        style={{ gridColumn: "span 6" }} padding={24}>
        <FieldRow label="Root status"><Pill tone="success" dot>Not rooted</Pill></FieldRow>
        <FieldRow label="Bootloader"><Pill tone="success" dot>Locked</Pill></FieldRow>
        <FieldRow label="Attestation" mono>SHA256 · 4f2a…cb19</FieldRow>
        <FieldRow label="Last audit" mono>2026-05-04 06:00 UTC</FieldRow>
      </Card>

      <Card title="Cellular" hint="LTE Cat-4" style={{ gridColumn: "span 6" }} padding={24}
        action={<Pill tone="success" dot>Connected</Pill>}>
        <FieldRow label="IMEI" mono copy>867530901244168</FieldRow>
        <FieldRow label="Operator">Bell Mobility</FieldRow>
        <FieldRow label="Signal" mono>−67 dBm · RSRP −94</FieldRow>
        <FieldRow label="Band" mono>B7 (2600 MHz)</FieldRow>
      </Card>

      <Card title="Local network" hint="WiFi" style={{ gridColumn: "span 6" }} padding={24}
        action={<Pill tone="success" dot>5 GHz</Pill>}>
        <FieldRow label="SSID">office-5g</FieldRow>
        <FieldRow label="IPv4" mono copy>10.42.118.27</FieldRow>
        <FieldRow label="WiFi MAC" mono copy>D8:3A:DD:74:18:9F</FieldRow>
        <FieldRow label="Gateway" mono>10.42.118.1</FieldRow>
      </Card>

      <Card title="Battery health profile" hint="30-day window"
        style={{ gridColumn: "span 12" }} padding={24}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <DonutB value={86} color="var(--success)" size={104} stroke={11} />
            <div style={{ fontSize: 13, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ color: "var(--fg-tertiary)" }}>Cycles</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>312 / 500</div>
              <div style={{ color: "var(--fg-tertiary)", marginTop: 8 }}>Capacity</div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>3,820 mAh</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: "var(--fg-tertiary)", marginBottom: 8 }}>
              Operating temperature · last 48 hours
            </div>
            <SparkB data={tempCurve()} w={520} h={90}
              stroke="var(--warning)" fill="var(--warning-bg)" />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12,
              fontFamily: "var(--font-mono)", color: "var(--fg-quaternary)", marginTop: 6 }}>
              <span>20°C</span><span>min 27.4 · avg 31.2 · max 36.1°C</span><span>40°C</span>
            </div>
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
    { name: "PaymentCore", v: "8.4.2", cat: "Deployment", status: "running", size: "284 MB", pinned: true,
      icon: "card", iconBg: "var(--accent-500)" },
    { name: "Inventory Sync", v: "3.1.0", cat: "Third Party", status: "running", size: "104 MB",
      icon: "store", iconBg: "var(--success)" },
    { name: "TOMS Agent", v: "4.2.1", cat: "System", status: "running", size: "62 MB", locked: true,
      icon: "shield", iconBg: "var(--fg-secondary)" },
    { name: "Receipt Printer", v: "1.8.4", cat: "Deployment", status: "stopped", size: "18 MB",
      icon: "doc", iconBg: "var(--info)" },
  ];
  const [sel, setSel] = React.useState([]);

  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      {/* Firmware — calm hero */}
      <Card title="Firmware" hint="OTA"
        action={<ActionButton primary icon="flash">Push update</ActionButton>}
        style={{ gridColumn: "span 12" }} padding={28}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 32 }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--fg-tertiary)", textTransform: "uppercase",
              letterSpacing: "0.06em", marginBottom: 10, fontWeight: 500 }}>Current</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>v4.2.1</div>
            <div style={{ fontSize: 13, color: "var(--fg-tertiary)", marginTop: 6 }}>
              FW-0712-B · built 2026-03-20
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--fg-tertiary)", textTransform: "uppercase",
              letterSpacing: "0.06em", marginBottom: 10, fontWeight: 500 }}>Available</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 500, color: "var(--accent-700)" }}>v4.3.0</div>
            <div style={{ fontSize: 13, color: "var(--fg-tertiary)", marginTop: 6 }}>
              42 MB differential · ~2 min downtime
            </div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "var(--fg-tertiary)", textTransform: "uppercase",
              letterSpacing: "0.06em", marginBottom: 10, fontWeight: 500 }}>Last upgrade</div>
            <div className="mono" style={{ fontSize: 22, fontWeight: 500 }}>Mar 30</div>
            <div style={{ fontSize: 13, color: "var(--success)", marginTop: 6 }}>Success · 1m 47s</div>
          </div>
        </div>
      </Card>

      {/* Apps — fewer rows */}
      <Card title="Applications" hint={`${apps.length} installed · 3 running`}
        action={<ActionButton primary icon="upload">Push app</ActionButton>}
        style={{ gridColumn: "span 12" }} padding={0}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: "var(--fg-tertiary)", fontSize: 11.5,
              textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
              <th style={{ padding: "16px 16px 16px 28px", width: 28 }}></th>
              <th style={{ padding: "16px 8px", textAlign: "left" }}>App</th>
              <th style={{ padding: "16px 8px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "16px 8px", textAlign: "right" }}>Size</th>
              <th style={{ padding: "16px 28px", width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a, i) => (
              <tr key={i} style={{
                borderTop: "1px solid var(--border-subtle)",
                background: sel.includes(a.name) ? "var(--accent-50)" : "transparent",
              }}>
                <td style={{ padding: "16px 16px 16px 28px" }}>
                  <input type="checkbox" checked={sel.includes(a.name)}
                    onChange={() => setSel((s) => s.includes(a.name) ? s.filter(x => x !== a.name) : [...s, a.name])}
                    style={{ accentColor: "var(--accent-600)" }} />
                </td>
                <td style={{ padding: "16px 8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: 9,
                      background: a.iconBg, color: "white",
                      display: "grid", placeItems: "center", flexShrink: 0,
                    }}>
                      <Ico name={a.icon} size={17} />
                    </span>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontWeight: 500, fontSize: 14.5 }}>{a.name}</span>
                        {a.pinned && <Pill tone="accent">Pinned</Pill>}
                        {a.locked && <Ico name="lock" size={12} style={{ color: "var(--fg-quaternary)" }} />}
                      </div>
                      <div className="mono" style={{ fontSize: 12, color: "var(--fg-tertiary)", marginTop: 2 }}>
                        {a.cat} · v{a.v}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "16px 8px" }}>
                  {a.status === "running"
                    ? <Pill tone="success" dot>Running</Pill>
                    : <Pill tone="neutral" dot>Stopped</Pill>}
                </td>
                <td style={{ padding: "16px 8px", textAlign: "right",
                  color: "var(--fg-tertiary)" }} className="mono">{a.size}</td>
                <td style={{ padding: "16px 28px", textAlign: "right" }}>
                  <button style={{ padding: 6, color: "var(--fg-tertiary)" }}>
                    <Ico name="more" size={15} />
                  </button>
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
      <Card title="Environment" hint="Display & sound" style={{ gridColumn: "span 6" }} padding={24}>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <SliderRow label="Brightness" value={bri} setValue={setBri} />
          <SliderRow label="Media volume" value={vol} setValue={setVol} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 4 }}>
            <ToggleRow label="Auto time sync" sub="NTP · time.toms.io" on />
            <ToggleRow label="Adaptive sleep" sub="2 min idle" on />
          </div>
        </div>
      </Card>

      <Card title="Connectivity" hint="Hardware toggles" style={{ gridColumn: "span 6" }} padding={24}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { i: "signal", l: "Cellular", s: "LTE · Bell", on: true },
            { i: "wifi",  l: "WiFi", s: "office-5g", on: true },
            { i: "pin",   l: "GPS", s: "±4m accuracy", on: true },
            { i: "shield",l: "VPN", s: "toms-ops", on: true },
          ].map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "14px 16px", border: "1px solid var(--border-subtle)",
              borderRadius: 10, background: "var(--bg-surface)",
            }}>
              <span style={{
                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                background: c.on ? "var(--accent-50)" : "var(--bg-sunken)",
                color: c.on ? "var(--accent-700)" : "var(--fg-tertiary)",
                display: "grid", placeItems: "center",
              }}>
                <Ico name={c.i} size={16} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{c.l}</div>
                <div className="tm-truncate" style={{ fontSize: 12, color: "var(--fg-tertiary)" }}>{c.s}</div>
              </div>
              <Toggle on={c.on} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Payment modules" hint="Hardware shielding" style={{ gridColumn: "span 12" }} padding={24}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {[
            { l: "Magstripe reader",  s: "ISO 7811 Track 1/2/3", on: true },
            { l: "Contactless (NFC)", s: "EMV · ApplePay · GPay", on: true },
            { l: "IC chip reader",    s: "EMV Level 2", on: true },
            { l: "Receipt printer",   s: "58mm thermal", on: false },
          ].map((p, i) => (
            <div key={i} style={{
              padding: "16px 18px", borderRadius: 10,
              border: "1px solid var(--border-subtle)",
              background: p.on ? "var(--bg-surface)" : "var(--bg-sunken)",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{p.l}</div>
                <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)", marginTop: 2 }}>{p.s}</div>
              </div>
              {p.on
                ? <Pill tone="success" dot>Enabled</Pill>
                : <Pill tone="neutral" dot>Disabled</Pill>}
              <Toggle on={p.on} onChange={() => {}} />
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
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5, marginBottom: 10 }}>
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
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 16px", borderRadius: 10,
      border: "1px solid var(--border-subtle)", background: "var(--bg-surface)",
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "var(--fg-tertiary)", marginTop: 2 }} className="tm-truncate">{sub}</div>}
      </div>
      <Toggle on={v} onChange={setV} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Remote Assistance
// ─────────────────────────────────────────────────────────────
function RemoteTab() {
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <ActionGrid title="Real-time diagnosis" subtitle="Streaming · session-based"
        gridSpan={6}
        items={[
          { i: "diag", l: "Hardware diagnostics", s: "Self-test 12 modules" },
          { i: "log",  l: "Real-time log",        s: "Tail journalctl" },
          { i: "remote", l: "Remote control",     s: "Mirror screen + control" },
          { i: "download", l: "Extract log",      s: "Last 24h to .zip" },
        ]} />

      <ActionGrid title="High-privilege" subtitle="Audited · double confirm"
        gridSpan={6}
        items={[
          { i: "shield", l: "Update keys",  s: "FlyKey rotation", danger: true },
          { i: "refresh",l: "Recovery",     s: "Factory reset · keep keys", danger: true },
          { i: "lock",   l: "Lock / unlock",s: "Remote screen lock" },
          { i: "info",   l: "Collect info", s: "Hardware + software snap" },
        ]} />

      <Card title="Custom command" hint="Power user"
        style={{ gridColumn: "span 12" }} padding={24}>
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 14px", borderRadius: 8, fontSize: 13.5,
            background: "var(--bg-sunken)", border: "1px solid var(--border-default)",
          }}>
            Category <span className="mono" style={{ color: "var(--fg-tertiary)" }}>shell.exec</span>
            <Ico name="chevd" size={12} />
          </button>
          <span style={{ fontSize: 12.5, color: "var(--fg-tertiary)", alignSelf: "center" }}>
            128 character limit
          </span>
        </div>
        <div style={{
          padding: 18, fontFamily: "var(--font-mono)", fontSize: 13,
          borderRadius: 10, background: "oklch(15% 0.005 270)",
          color: "oklch(85% 0.005 270)", minHeight: 140, lineHeight: 1.7,
        }}>
          <div><span style={{ color: "oklch(60% 0.18 152)" }}>$</span> systemctl status toms-agent</div>
          <div style={{ marginTop: 10, color: "oklch(70% 0.005 270)" }}>
            <div>● toms-agent.service — TOMS Device Agent</div>
            <div>&nbsp;&nbsp;&nbsp;Active: <span style={{ color: "oklch(72% 0.15 152)" }}>active (running)</span> since Apr 19 23:47</div>
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "oklch(60% 0.18 152)" }}>$</span>
            <span>_</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "flex-end" }}>
          <button style={{ fontSize: 13, padding: "8px 14px",
            border: "1px solid var(--border-default)", borderRadius: 7 }}>Save as macro</button>
          <ActionButton primary>Execute</ActionButton>
        </div>
      </Card>
    </div>
  );
}

function ActionGrid({ title, subtitle, items, gridSpan = 6 }) {
  return (
    <Card title={title} hint={subtitle} style={{ gridColumn: `span ${gridSpan}` }} padding={20}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((it, i) => (
          <button key={i} style={{
            display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6,
            padding: "16px 18px", borderRadius: 10, textAlign: "left",
            border: "1px solid var(--border-subtle)", background: "var(--bg-surface)",
            transition: "all .12s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--bg-surface)"; }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: it.danger ? "var(--danger-bg)" : "var(--accent-50)",
              color: it.danger ? "var(--danger)" : "var(--accent-700)",
              display: "grid", placeItems: "center",
            }}><Ico name={it.i} size={15} /></span>
            <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{it.l}</div>
            <div style={{ fontSize: 12.5, color: "var(--fg-tertiary)" }}>{it.s}</div>
          </button>
        ))}
      </div>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Files
// ─────────────────────────────────────────────────────────────
function FilesTab() {
  return (
    <div style={{ padding: PAD, display: "grid", gap: GAP, gridTemplateColumns: "repeat(12, 1fr)" }}>
      <Card title="File task center" hint="Scheduled · ad-hoc"
        action={<ActionButton primary icon="plus">New extract task</ActionButton>}
        style={{ gridColumn: "span 12" }} padding={0}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: "var(--fg-tertiary)", fontSize: 11.5,
              textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
              <th style={{ padding: "16px 28px", textAlign: "left" }}>Task</th>
              <th style={{ padding: "16px 8px", textAlign: "left" }}>Type</th>
              <th style={{ padding: "16px 8px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "16px 8px", textAlign: "right" }}>Size</th>
              <th style={{ padding: "16px 28px", textAlign: "right" }}>Created</th>
            </tr>
          </thead>
          <tbody>
            {[
              { n: "Daily syslog · 2026-05-04", t: "log.zip", s: "ready", size: "4.2 MB", time: "12 min ago" },
              { n: "Hardware self-test",        t: "diag.xls", s: "ready", size: "82 KB", time: "1h ago" },
              { n: "System snapshot",           t: "system.zip", s: "ready", size: "16.4 MB", time: "Yesterday" },
              { n: "TX history · April",        t: "csv",       s: "ready", size: "1.8 MB", time: "Apr 30" },
              { n: "Memory profile",            t: "trace",     s: "running", size: "—",    time: "Started 2m ago" },
            ].map((r, i) => (
              <tr key={i} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "18px 28px", fontWeight: 500 }}>{r.n}</td>
                <td style={{ padding: "18px 8px", color: "var(--fg-tertiary)" }} className="mono">{r.t}</td>
                <td style={{ padding: "18px 8px" }}>
                  {r.s === "ready"
                    ? <Pill tone="success" dot>Ready</Pill>
                    : <Pill tone="info" dot>Running</Pill>}
                </td>
                <td style={{ padding: "18px 8px", textAlign: "right",
                  color: "var(--fg-tertiary)" }} className="mono">{r.size}</td>
                <td style={{ padding: "18px 28px", textAlign: "right",
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
