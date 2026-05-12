/* global React, ReactDOM, Sidebar, Header, OverviewTab, BasicTab, AppsTab, SettingsTab, RemoteTab, FilesTab, CmdK, DesignCanvas, DCSection, DCArtboard, TweaksPanel, useTweaks, TweakSection, TweakRadio */

const { useState, useEffect } = React;

// A standalone artboard that contains the full Terminal Detail UI, locked to a tab.
function TerminalDetail({ initialTab = "overview", themeOverride, showCmdK }) {
  const [tab, setTab] = useState(initialTab);
  const [cmd, setCmd] = useState(!!showCmdK);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmd((c) => !c);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const Body =
    tab === "overview" ? OverviewTab :
    tab === "basic"    ? BasicTab :
    tab === "apps"     ? AppsTab :
    tab === "settings" ? SettingsTab :
    tab === "remote"   ? RemoteTab :
    tab === "files"    ? FilesTab : OverviewTab;

  return (
    <div className={`tm-root theme-${themeOverride || "light"}`} style={{ position: "relative" }}>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <Sidebar active="terminals" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0,
          background: "var(--bg-app)" }}>
          <Header tab={tab} setTab={setTab} onCmdK={() => setCmd(true)} />
          <div style={{ flex: 1, overflow: "auto" }}>
            <Body />
          </div>
        </div>
      </div>
      <CmdK open={cmd} onClose={() => setCmd(false)} />
    </div>
  );
}

// ─── Tweaks ─────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme to <body> for any chrome outside artboards
  useEffect(() => {
    document.body.classList.toggle("theme-dark", tweaks.theme === "dark");
    document.body.classList.toggle("theme-light", tweaks.theme !== "dark");
  }, [tweaks.theme]);

  const W = 1440, H = 900;

  return (
    <>
      <DesignCanvas title="TOMS · Terminal Manager" subtitle="Terminal Detail · 2026 · Light + Dark · Cmd+K">
        <DCSection id="primary" title="Terminal Detail" subtitle="Six tabs covering the full spec — switchable inside each artboard">
          <DCArtboard id="overview" label="A · Overview · Real-time monitoring" width={W} height={H}>
            <TerminalDetail initialTab="overview" themeOverride={tweaks.theme} />
          </DCArtboard>

          <DCArtboard id="basic" label="B · Basic Info · Hardware & compliance" width={W} height={H}>
            <TerminalDetail initialTab="basic" themeOverride={tweaks.theme} />
          </DCArtboard>

          <DCArtboard id="apps" label="C · App & Firmware · OTA + matrix" width={W} height={H}>
            <TerminalDetail initialTab="apps" themeOverride={tweaks.theme} />
          </DCArtboard>

          <DCArtboard id="settings" label="D · Settings · Remote policy" width={W} height={H}>
            <TerminalDetail initialTab="settings" themeOverride={tweaks.theme} />
          </DCArtboard>

          <DCArtboard id="remote" label="E · Remote Assistance · Diagnostics" width={W} height={H}>
            <TerminalDetail initialTab="remote" themeOverride={tweaks.theme} />
          </DCArtboard>

          <DCArtboard id="files" label="F · Files · Task center" width={W} height={H}>
            <TerminalDetail initialTab="files" themeOverride={tweaks.theme} />
          </DCArtboard>
        </DCSection>

        <DCSection id="overlays" title="Overlays" subtitle="Cmd+K command palette · always available with ⌘K">
          <DCArtboard id="cmdk" label="G · Command Palette · ⌘K" width={W} height={H}>
            <TerminalDetail initialTab="overview" themeOverride={tweaks.theme} showCmdK />
          </DCArtboard>

          <DCArtboard id="dark" label="H · Dark mode · Overview" width={W} height={H}>
            <TerminalDetail initialTab="overview" themeOverride="dark" />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={(v) => setTweak("theme", v)}
            options={[
              { value: "light", label: "Light" },
              { value: "dark",  label: "Dark"  },
            ]}
          />
          <p style={{ fontSize: 11, color: "var(--tw-text-muted, #888)", margin: "8px 0 0", lineHeight: 1.5 }}>
            Artboard H always renders dark for comparison.<br/>
            Press <span style={{ fontFamily: "var(--font-mono)" }}>⌘K</span> in any artboard to open the palette.
          </p>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
