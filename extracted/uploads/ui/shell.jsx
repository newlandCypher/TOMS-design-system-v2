/* global React */
// ─────────────────────────────────────────────────────────────
// TOMS Terminal Manager — Shell components
// Sidebar · Header · Tabs · Action menu · Icons · Primitives
// ─────────────────────────────────────────────────────────────

const { useState, useEffect, useRef, useMemo } = React;

// ─── Icons (1.5px stroke, original geometric set) ───────────
const Icon = ({ d, size = 16, stroke = 1.5, fill = "none", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);

const I = {
  home:    <><path d="M4 11l8-7 8 7"/><path d="M6 10v9h12v-9"/></>,
  grid:    <><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></>,
  device:  <><rect x="6" y="3" width="12" height="18" rx="2"/><circle cx="12" cy="17.5" r="0.6" fill="currentColor"/></>,
  store:   <><path d="M3 9l1.5-5h15L21 9"/><path d="M5 9v11h14V9"/><path d="M9 20v-5h6v5"/></>,
  card:    <><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></>,
  ticket:  <><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4z"/><path d="M14 6v12"/></>,
  settings:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></>,
  search:  <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
  bell:    <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
  more:    <><circle cx="5" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="19" cy="12" r="1.2" fill="currentColor"/></>,
  chevd:   <><path d="m6 9 6 6 6-6"/></>,
  chevr:   <><path d="m9 6 6 6-6 6"/></>,
  chevl:   <><path d="m15 6-6 6 6 6"/></>,
  plus:    <><path d="M12 5v14M5 12h14"/></>,
  check:   <><path d="m4.5 12.5 5 5 10-11"/></>,
  x:       <><path d="M6 6l12 12M18 6 6 18"/></>,
  external:<><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></>,
  download:<><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></>,
  upload:  <><path d="M12 20V8"/><path d="m7 13 5-5 5 5"/><path d="M5 4h14"/></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15.5-6.3L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15.5 6.3L3 16"/><path d="M3 20v-4h4"/></>,
  power:   <><path d="M12 4v9"/><path d="M5.5 9a8 8 0 1 0 13 0"/></>,
  lock:    <><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></>,
  wifi:    <><path d="M2 9a16 16 0 0 1 20 0"/><path d="M5 12.5a11 11 0 0 1 14 0"/><path d="M8.5 16a6 6 0 0 1 7 0"/><circle cx="12" cy="19" r="0.8" fill="currentColor"/></>,
  signal:  <><path d="M3 18h2v3H3z" fill="currentColor"/><path d="M8 14h2v7H8z" fill="currentColor"/><path d="M13 9h2v12h-2z" fill="currentColor"/><path d="M18 4h2v17h-2z" fill="currentColor" opacity="0.3"/></>,
  battery: <><rect x="2" y="8" width="18" height="9" rx="2"/><path d="M22 11v3"/></>,
  pin:     <><path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></>,
  cpu:     <><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="0.5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></>,
  hdd:     <><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M5 14V8l3-4h8l3 4v6"/><circle cx="7" cy="17" r="0.8" fill="currentColor"/></>,
  mod:     <><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><path d="M13 16.5h7M16.5 13v7"/></>,
  doc:     <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
  log:     <><path d="M5 4h14v16H5z"/><path d="M8 9h8M8 13h8M8 17h5"/></>,
  diag:    <><path d="M3 12h4l2-7 4 14 2-7h6"/></>,
  flash:   <><path d="m13 3-9 12h7l-1 6 9-12h-7z"/></>,
  app:     <><rect x="4" y="4" width="6" height="6" rx="1.5"/><rect x="14" y="4" width="6" height="6" rx="1.5"/><rect x="4" y="14" width="6" height="6" rx="1.5"/><rect x="14" y="14" width="6" height="6" rx="1.5"/></>,
  shield:  <><path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6z"/></>,
  remote:  <><path d="M5 5h14v10H5z"/><path d="M9 19h6"/><path d="M12 15v4"/></>,
  sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" opacity="0.6"/><path d="m6 6 3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" opacity="0.6"/></>,
  command: <><path d="M9 9V6.5a2.5 2.5 0 1 0-2.5 2.5H9zM9 9h6m-6 0v6m6-6V6.5a2.5 2.5 0 1 1 2.5 2.5H15zm0 6h2.5a2.5 2.5 0 1 1-2.5 2.5V15zm-6 0v2.5a2.5 2.5 0 1 1-2.5-2.5H9z"/></>,
  filter:  <><path d="M3 5h18l-7 9v6l-4-2v-4z"/></>,
  copy:    <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></>,
  edit:    <><path d="M4 20h4l11-11-4-4L4 16z"/><path d="m14 6 4 4"/></>,
  trash:   <><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7"/></>,
  history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></>,
  alert:   <><path d="M12 9v4M12 17h0"/><path d="M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></>,
  info:    <><circle cx="12" cy="12" r="9"/><path d="M12 8h0M11 12h1v5h1"/></>,
  arrowR:  <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  thermometer: <><path d="M14 14V6a2 2 0 1 0-4 0v8a4 4 0 1 0 4 0z"/></>,
  globe:   <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
};

const Ico = ({ name, size = 16, stroke = 1.5, style }) => (
  <Icon d={I[name]} size={size} stroke={stroke} style={style} />
);

window.Ico = Ico;

// ─── Sidebar ────────────────────────────────────────────────
function Sidebar({ active = "terminals" }) {
  const items = [
    { id: "home", icon: "home", label: "Home" },
    { id: "terminals", icon: "device", label: "Terminals", count: "2,481" },
    { id: "merchants", icon: "store", label: "Merchants" },
    { id: "orders", icon: "card", label: "Orders" },
    { id: "tickets", icon: "ticket", label: "Tickets", count: 12 },
    { id: "deployments", icon: "flash", label: "Deployments" },
    { id: "settings", icon: "settings", label: "Settings" },
  ];
  return (
    <aside style={{
      width: 220, flexShrink: 0, background: "var(--bg-sunken)",
      borderRight: "1px solid var(--border-subtle)",
      display: "flex", flexDirection: "column",
      padding: "12px 8px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px 14px" }}>
        <img src={(window.__resources && window.__resources.tomsLogo) || "assets/toms-logo.png"} alt="TOMS" width="22" height="22"
          style={{ flexShrink: 0, display: "block" }} />
        <span style={{
          fontWeight: 700, fontSize: 14, letterSpacing: "-0.01em",
          color: "var(--brand-mono)",
        }}>TOMS</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--fg-tertiary)", padding: "2px 6px",
          background: "var(--bg-surface)", border: "1px solid var(--border-subtle)", borderRadius: 4 }}>
          Acme&nbsp;Coffee
        </span>
      </div>

      <button style={{
        margin: "2px 4px 12px", padding: "6px 8px 6px 10px",
        display: "flex", alignItems: "center", gap: 8,
        background: "var(--bg-surface)", border: "1px solid var(--border-default)",
        borderRadius: 6, color: "var(--fg-tertiary)", fontSize: 12.5, textAlign: "left",
        boxShadow: "var(--shadow-xs)",
      }}>
        <Ico name="search" size={14} />
        <span>Search…</span>
        <span style={{
          marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11,
          color: "var(--fg-quaternary)", padding: "1px 5px",
          border: "1px solid var(--border-subtle)", borderRadius: 4,
        }}>⌘K</span>
      </button>

      <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {items.map((it) => (
          <a key={it.id} href="#" style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "5.5px 10px", borderRadius: 6,
            fontSize: 12.5, fontWeight: it.id === active ? 500 : 400,
            color: it.id === active ? "var(--fg-primary)" : "var(--fg-secondary)",
            background: it.id === active ? "var(--bg-active)" : "transparent",
            textDecoration: "none",
          }}>
            <Ico name={it.icon} size={15} stroke={it.id === active ? 1.7 : 1.5} />
            <span>{it.label}</span>
            {it.count != null && (
              <span style={{
                marginLeft: "auto", fontSize: 11, color: "var(--fg-tertiary)",
                fontFamily: "var(--font-mono)",
              }}>{it.count}</span>
            )}
          </a>
        ))}
      </nav>

      <div style={{ marginTop: 18, padding: "6px 10px 4px", fontSize: 10.5,
        color: "var(--fg-quaternary)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
        Pinned
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {[
          { id: "p1", label: "T-7K2H · MTL Store #4", state: "online" },
          { id: "p2", label: "Deployment · v4.2.1", state: "running" },
          { id: "p3", label: "Acme Coffee · 142 SNs", state: null },
        ].map((p) => (
          <a key={p.id} href="#" style={{
            display: "flex", alignItems: "center", gap: 8, padding: "5px 10px",
            borderRadius: 6, fontSize: 12, color: "var(--fg-secondary)", textDecoration: "none",
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: p.state === "online" ? "var(--success)"
                       : p.state === "running" ? "var(--accent-500)"
                       : "var(--fg-quaternary)",
            }} />
            <span className="tm-truncate" style={{ flex: 1 }}>{p.label}</span>
          </a>
        ))}
      </nav>

      <div style={{ marginTop: "auto", padding: "10px 8px",
        borderTop: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%",
          background: "var(--brand-mono)", color: "white",
          display: "grid", placeItems: "center", fontSize: 11, fontWeight: 600 }}>EC</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500 }} className="tm-truncate">Elena Costa</div>
          <div style={{ fontSize: 10.5, color: "var(--fg-tertiary)" }}>Admin · TOMS</div>
        </div>
        <button style={{ color: "var(--fg-tertiary)", padding: 4 }} title="Account">
          <Ico name="chevd" size={13} />
        </button>
      </div>
    </aside>
  );
}

// ─── Header / Breadcrumb / Actions ──────────────────────────
function ActionButton({ children, primary, danger, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 10px", borderRadius: 6, fontSize: 12.5, fontWeight: 500,
      border: "1px solid",
      borderColor: primary ? "transparent" : "var(--border-default)",
      background: primary ? "var(--accent-gradient)"
                : danger  ? "transparent"
                : "var(--bg-surface)",
      color: primary ? "var(--fg-on-accent)"
            : danger  ? "var(--danger)"
            : "var(--fg-primary)",
      boxShadow: primary
        ? "inset 0 1px 0 oklch(100% 0 0 / .12), 0 1px 2px oklch(0% 0 0 / .25), 0 0 0 0.5px oklch(0% 0 0 / .4)"
        : "var(--shadow-xs)",
    }}>
      {icon && <Ico name={icon} size={14} />}
      {children}
    </button>
  );
}

function ActionMenu({ open, onClose }) {
  if (!open) return null;
  const groups = [
    {
      title: "Administration",
      items: [
        { icon: "edit", label: "Edit details", hint: "E" },
        { icon: "refresh", label: "Refresh snapshot" },
        { icon: "bell", label: "Send message" },
        { icon: "lock", label: "Offline auth code", hint: "⇧A" },
        { icon: "trash", label: "Delete terminal", danger: true },
      ],
    },
    {
      title: "Lifecycle",
      items: [
        { icon: "alert", label: "Mark as lost" },
        { icon: "diag", label: "Send to repair" },
      ],
    },
    {
      title: "Quick commands",
      items: [
        { icon: "log", label: "Real-time log", hint: "L" },
        { icon: "diag", label: "Hardware diagnostics" },
        { icon: "lock", label: "Lock screen" },
        { icon: "power", label: "Restart", hint: "⇧R" },
        { icon: "power", label: "Shutdown", danger: true },
      ],
    },
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, zIndex: 40 }} />
      <div style={{
        position: "absolute", top: 44, right: 16, zIndex: 41,
        width: 256, background: "var(--bg-surface)",
        border: "1px solid var(--border-default)", borderRadius: 10,
        boxShadow: "var(--shadow-lg)",
        padding: 4, fontSize: 12.5,
      }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{
            padding: "4px 0",
            borderTop: gi === 0 ? "none" : "1px solid var(--border-subtle)",
          }}>
            <div style={{
              padding: "6px 10px 4px", fontSize: 10.5, color: "var(--fg-quaternary)",
              textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500,
            }}>{g.title}</div>
            {g.items.map((it, i) => (
              <button key={i} onClick={onClose} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "6px 10px", borderRadius: 6, textAlign: "left",
                color: it.danger ? "var(--danger)" : "var(--fg-primary)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bg-hover)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                <Ico name={it.icon} size={14} />
                <span style={{ flex: 1 }}>{it.label}</span>
                {it.hint && <span className="mono" style={{
                  fontSize: 10.5, color: "var(--fg-quaternary)",
                }}>{it.hint}</span>}
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function Header({ tab, setTab, onCmdK }) {
  const [menu, setMenu] = useState(false);
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "basic", label: "Basic Info" },
    { id: "apps", label: "App & Firmware" },
    { id: "settings", label: "Settings" },
    { id: "remote", label: "Remote Assistance" },
    { id: "files", label: "Files" },
  ];

  return (
    <div style={{ position: "relative", borderBottom: "1px solid var(--border-subtle)",
      background: "var(--bg-surface)" }}>
      {/* Breadcrumb row */}
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 16px", fontSize: 12, color: "var(--fg-tertiary)",
      }}>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terminals</a>
        <Ico name="chevr" size={11} style={{ opacity: 0.6 }} />
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Acme Coffee</a>
        <Ico name="chevr" size={11} style={{ opacity: 0.6 }} />
        <span className="mono" style={{ color: "var(--fg-secondary)" }}>NL750-K9F2H7B3</span>
        <button onClick={onCmdK} style={{
          marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6,
          padding: "3px 8px", borderRadius: 5,
          background: "var(--bg-sunken)", color: "var(--fg-tertiary)",
          fontSize: 11.5, border: "1px solid var(--border-subtle)",
        }}>
          <Ico name="search" size={12} />
          <span>Search anything</span>
          <span className="mono" style={{ marginLeft: 6, opacity: 0.7 }}>⌘K</span>
        </button>
        <button style={{ padding: 4, color: "var(--fg-tertiary)" }} title="Notifications">
          <Ico name="bell" size={15} />
        </button>
      </div>

      {/* Title row */}
      <div style={{
        display: "flex", alignItems: "flex-end", gap: 16,
        padding: "4px 16px 0",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ color: "var(--fg-tertiary)" }} title="Back">
            <Ico name="chevl" size={16} />
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h1 style={{ fontSize: 19, fontWeight: 600, margin: 0,
                letterSpacing: "-0.01em" }} className="mono">
                NL750-K9F2H7B3
              </h1>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "2px 7px", borderRadius: 999,
                background: "var(--success-bg)", color: "var(--success)",
                fontSize: 11, fontWeight: 500,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%",
                  background: "var(--success)", boxShadow: "0 0 0 3px oklch(58% 0.14 152 / .25)" }} />
                Online
              </span>
              <span style={{
                fontSize: 11, padding: "2px 7px", borderRadius: 4,
                background: "var(--bg-sunken)", color: "var(--fg-secondary)",
                border: "1px solid var(--border-subtle)",
              }}>Newland · N750P</span>
              <span style={{
                fontSize: 11, padding: "2px 7px", borderRadius: 4,
                color: "var(--fg-secondary)",
              }}>Acme Coffee · MTL Store #4</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 4,
              fontSize: 11.5, color: "var(--fg-tertiary)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Ico name="signal" size={12} /> LTE&nbsp;·&nbsp;-67&nbsp;dBm
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Ico name="wifi" size={12} /> office-5g
              </span>
              <span>Today 142&nbsp;MB</span>
              <span>Last seen 3s&nbsp;ago</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Ico name="pin" size={12} /> 26.023, 119.416
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6,
          paddingBottom: 6 }}>
          <ActionButton icon="refresh">Refresh</ActionButton>
          <ActionButton icon="log">Live log</ActionButton>
      <ActionButton primary icon="flash">Push command</ActionButton>
          <button onClick={() => setMenu((m) => !m)} style={{
            padding: 5, borderRadius: 6, border: "1px solid var(--border-default)",
            background: "var(--bg-surface)",
          }}>
            <Ico name="more" size={15} />
          </button>
        </div>

        <ActionMenu open={menu} onClose={() => setMenu(false)} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 2, padding: "10px 12px 0", marginTop: 8 }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab && setTab(t.id)} style={{
            padding: "7px 10px",
            fontSize: 12.5, fontWeight: tab === t.id ? 500 : 400,
            color: tab === t.id ? "var(--fg-primary)" : "var(--fg-secondary)",
            borderBottom: "2px solid",
            borderColor: tab === t.id ? "var(--fg-primary)" : "transparent",
            marginBottom: -1,
          }}>{t.label}</button>
        ))}
      </div>
    </div>
  );
}

// ─── Card primitive ─────────────────────────────────────────
function Card({ title, hint, action, children, padding = 16, style }) {
  return (
    <section style={{
      background: "var(--bg-surface)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 10,
      ...style,
    }}>
      {(title || action) && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "11px 14px 10px",
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          <h3 style={{ fontSize: 12.5, fontWeight: 600, margin: 0, letterSpacing: "-0.005em" }}>{title}</h3>
          {hint && <span style={{ fontSize: 11, color: "var(--fg-tertiary)" }}>{hint}</span>}
          <div style={{ marginLeft: "auto" }}>{action}</div>
        </div>
      )}
      <div style={{ padding }}>{children}</div>
    </section>
  );
}

// ─── Stat / KPI primitive ──────────────────────────────────
function Stat({ label, value, unit, sub, accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ fontSize: 11, color: "var(--fg-tertiary)",
        textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span className="mono" style={{ fontSize: 24, fontWeight: 500,
          letterSpacing: "-0.02em",
          color: accent || "var(--fg-primary)" }}>{value}</span>
        {unit && <span style={{ fontSize: 12, color: "var(--fg-tertiary)" }}>{unit}</span>}
      </div>
      {sub && <div style={{ fontSize: 11.5, color: "var(--fg-tertiary)" }}>{sub}</div>}
    </div>
  );
}

// ─── Toggle, Field row ──────────────────────────────────────
function Toggle({ on, onChange, size = 18 }) {
  return (
    <button onClick={() => onChange && onChange(!on)} style={{
      width: size * 1.7, height: size, borderRadius: 999,
      background: on ? "var(--accent-600)" : "var(--border-default)",
      transition: "background .15s",
      position: "relative", flexShrink: 0,
    }}>
      <span style={{
        position: "absolute", top: 2, left: on ? size * 0.74 : 2,
        width: size - 4, height: size - 4, borderRadius: "50%",
        background: "white", boxShadow: "0 1px 2px oklch(0% 0 0 / .25)",
        transition: "left .15s",
      }} />
    </button>
  );
}

function FieldRow({ label, children, mono, copy }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0",
      borderBottom: "1px dashed var(--border-subtle)" }}>
      <div style={{ width: 140, fontSize: 11.5, color: "var(--fg-tertiary)" }}>{label}</div>
      <div style={{ flex: 1, fontSize: 12.5, fontWeight: 450,
        fontFamily: mono ? "var(--font-mono)" : undefined,
        color: "var(--fg-primary)" }}>{children}</div>
      {copy && (
        <button style={{ color: "var(--fg-quaternary)", padding: 2, opacity: 0.6 }} title="Copy">
          <Ico name="copy" size={12} />
        </button>
      )}
    </div>
  );
}

// ─── Status pill ────────────────────────────────────────────
function Pill({ tone = "neutral", children, dot }) {
  const toneMap = {
    success: { bg: "var(--success-bg)", fg: "var(--success)" },
    warning: { bg: "var(--warning-bg)", fg: "var(--warning)" },
    danger:  { bg: "var(--danger-bg)",  fg: "var(--danger)"  },
    info:    { bg: "var(--info-bg)",    fg: "var(--info)"    },
    accent:  { bg: "var(--accent-50)",  fg: "var(--accent-700)"},
    neutral: { bg: "var(--bg-sunken)",  fg: "var(--fg-secondary)" },
  };
  const t = toneMap[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "1.5px 7px", borderRadius: 999,
      fontSize: 10.5, fontWeight: 500,
      background: t.bg, color: t.fg, lineHeight: 1.4,
    }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.fg }} />}
      {children}
    </span>
  );
}

Object.assign(window, { Sidebar, Header, Card, Stat, Toggle, FieldRow, Pill, ActionButton });
