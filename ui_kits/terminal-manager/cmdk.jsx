/* global React, Ico, Pill */
// Command Palette — Cmd+K

function CmdK({ open, onClose }) {
  const [q, setQ] = React.useState("");
  const [idx, setIdx] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
      setQ(""); setIdx(0);
    }
  }, [open]);

  if (!open) return null;

  const sections = [
    { title: "✦ AI suggestions", ai: true, items: [
      { i: "sparkle", l: `Show terminals with battery cycles > 300`, t: "Smart filter", k: "AI" },
      { i: "sparkle", l: `Push v4.3.0 to MTL Store #4 tonight at 02:00`, t: "Schedule", k: "AI" },
      { i: "sparkle", l: `Why is NL750-K9F2H7B3 using more cellular data?`, t: "Diagnose", k: "AI" },
    ]},
    { title: "Jump to", items: [
      { i: "device", l: "NL750-K9F2H7B3", t: "Terminal · Acme Coffee", k: "↵" },
      { i: "device", l: "NL750-J8M3K2A1", t: "Terminal · Acme Coffee · TOR #1", k: "" },
      { i: "store",  l: "Acme Coffee — MTL Store #4", t: "Merchant", k: "" },
      { i: "card",   l: "ORD-2026-04-088421", t: "Order · CAD $4.85", k: "" },
      { i: "ticket", l: "TICKET-1182 — Printer jam", t: "Ticket · open", k: "" },
    ]},
    { title: "Actions on this terminal", items: [
      { i: "refresh", l: "Refresh snapshot", t: "Pull latest data from device", k: "R" },
      { i: "log",     l: "Tail real-time log", t: "Stream journalctl", k: "L" },
      { i: "flash",   l: "Push firmware update", t: "v4.3.0 differential", k: "" },
      { i: "lock",    l: "Lock screen", t: "Remote lock with offline code", k: "" },
      { i: "power",   l: "Restart terminal", t: "Graceful · ~45s", k: "⇧R" },
      { i: "trash",   l: "Mark as lost", t: "Initiate remote lock + alert", k: "" , danger: true },
    ]},
    { title: "Create", items: [
      { i: "plus", l: "New deployment", t: "Push apps to many terminals" },
      { i: "plus", l: "New ticket", t: "From this terminal" },
      { i: "plus", l: "New extract task", t: "Pull files from device" },
    ]},
  ];

  const flat = sections.flatMap((s) => s.items.map((it) => ({ ...it, _section: s.title })));
  const filtered = q
    ? flat.filter((it) => (it.l + " " + it.t).toLowerCase().includes(q.toLowerCase()))
    : flat;

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { setIdx((i) => Math.min(filtered.length - 1, i + 1)); e.preventDefault(); }
    else if (e.key === "ArrowUp")   { setIdx((i) => Math.max(0, i - 1)); e.preventDefault(); }
    else if (e.key === "Enter")     { onClose(); }
  };

  let counter = -1;
  return (
    <div onClick={onClose} style={{
      position: "absolute", inset: 0, zIndex: 100,
      background: "oklch(15% 0.005 270 / 0.32)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      paddingTop: 80, backdropFilter: "blur(2px)",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 580, background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderRadius: 12, boxShadow: "var(--shadow-lg)",
        display: "flex", flexDirection: "column", overflow: "hidden",
        maxHeight: "70%",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10,
          padding: "12px 14px", borderBottom: "1px solid var(--border-subtle)" }}>
          <Ico name="search" size={15} style={{ color: "var(--fg-tertiary)" }} />
          <input ref={inputRef} value={q} onChange={(e) => { setQ(e.target.value); setIdx(0); }}
            onKeyDown={onKey}
            placeholder="Search terminals, merchants, tickets… or run a command"
            style={{
              flex: 1, border: 0, outline: 0, background: "transparent",
              fontSize: 14, color: "var(--fg-primary)",
            }} />
          <span className="mono" style={{ fontSize: 10.5, color: "var(--fg-quaternary)",
            padding: "2px 6px", border: "1px solid var(--border-subtle)", borderRadius: 4 }}>esc</span>
        </div>

        <div style={{ overflow: "auto", flex: 1, padding: "4px 4px 8px" }}>
          {sections.map((s) => {
            const items = s.items.filter((it) => (it.l + " " + it.t).toLowerCase().includes(q.toLowerCase()));
            if (items.length === 0) return null;
            return (
              <div key={s.title} style={{ padding: "6px 4px" }}>
                <div style={{
                  padding: "6px 12px 4px", fontSize: 10.5, fontWeight: 500,
                  color: s.ai ? "var(--accent-700)" : "var(--fg-quaternary)",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                }}>{s.title}</div>
                {items.map((it, i) => {
                  counter++;
                  const active = counter === idx;
                  return (
                    <button key={i} onMouseEnter={() => setIdx(counter)} onClick={onClose}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "7px 12px", borderRadius: 7, textAlign: "left",
                        background: active ? "var(--bg-active)" : "transparent",
                      }}>
                      <span style={{
                        width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                        background: s.ai ? "var(--accent-100)"
                                  : it.danger ? "var(--danger-bg)"
                                  : "var(--bg-sunken)",
                        color: s.ai ? "var(--accent-700)"
                              : it.danger ? "var(--danger)"
                              : "var(--fg-secondary)",
                        display: "grid", placeItems: "center",
                      }}>
                        <Ico name={it.i} size={13} />
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 450,
                          color: it.danger ? "var(--danger)" : "var(--fg-primary)" }}
                          className="tm-truncate">{it.l}</div>
                        <div style={{ fontSize: 11, color: "var(--fg-tertiary)" }}
                          className="tm-truncate">{it.t}</div>
                      </div>
                      {it.k && <span className="mono" style={{
                        fontSize: 10.5, color: "var(--fg-quaternary)",
                        padding: "1px 6px", border: "1px solid var(--border-subtle)", borderRadius: 4,
                      }}>{it.k}</span>}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12,
          padding: "8px 14px", borderTop: "1px solid var(--border-subtle)",
          background: "var(--bg-sunken)", fontSize: 10.5, color: "var(--fg-tertiary)" }}>
          <span><span className="mono">↑↓</span> navigate</span>
          <span><span className="mono">↵</span> open</span>
          <span><span className="mono">⌘+↵</span> open in new pane</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Ico name="sparkle" size={11} style={{ color: "var(--accent-700)" }} />
            AI suggestions ranked by relevance
          </span>
        </div>
      </div>
    </div>
  );
}

window.CmdK = CmdK;
