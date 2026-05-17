/* Trace Commons landing — sections + composition */

const { useState, useEffect } = React;

const ACCENT_OPTIONS = [
  "oklch(0.84 0.17 78)",   // signal amber (default)
  "oklch(0.86 0.20 130)",  // electric green
  "oklch(0.82 0.14 215)",  // crypto cyan
  "oklch(0.74 0.22 350)",  // hot magenta
];

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "oklch(0.84 0.17 78)",
  "mode": "dark",
  "grain": true
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(DEFAULTS);
  const accent = t.accent;

  useEffect(() => {
    document.documentElement.dataset.mode = t.mode;
    document.documentElement.style.setProperty("--accent", accent);
  }, [t.mode, accent]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero accent={accent} />
        <Marquee />
        <WhyNow />
        <Thesis />
        <Credits accent={accent} />
        <BigCTA />
      </main>
      <Footer />
      {t.grain && <div className="grain" aria-hidden="true"/>}
      <Tweaks t={t} setTweak={setTweak} />
    </React.Fragment>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <a className="wordmark" href="#top">
        <span className="wm-mark" aria-hidden="true">◇</span>
        <span>TRACE&nbsp;COMMONS</span>
      </a>
      <div className="nav-links">
        <span className="nav-status">
          <span className="dot"></span>
          PILOT&nbsp;LIVE&nbsp;·&nbsp;MAY&nbsp;2026
        </span>
        <a href="https://github.com/TraceCommons/trace-commons-server" target="_blank" rel="noopener">GitHub</a>
        <a href="https://github.com/TraceCommons/trace-commons-server/blob/main/docs/trace-commons.md" target="_blank" rel="noopener">Protocol</a>
        <a className="cta cta-sm" href="https://near.com" target="_blank" rel="noopener">
          Start mining<span className="arr">↗</span>
        </a>
      </div>
    </nav>
  );
}

function Hero({ accent }) {
  return (
    <section className="hero" id="top">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eb-tag">TRACE&nbsp;COMMONS</span>
            <span className="eb-sep">/</span>
            <span>provenance layer for agent trajectories</span>
          </div>
          <h1 className="display">
            Your agent traces are <em>the new oil</em>.
            <br/>
            Stop giving them away.
          </h1>
          <p className="lede">
            Every prompt you type into ChatGPT is subsidized — paid for in the trajectory
            data you leave behind. Trace Commons is a user-owned environment for that data:
            captured locally, redacted before upload, scored inside a TEE, and minted into
            non-transferable credits bound to the value you produced.
          </p>
          <div className="hero-ctas">
            <a className="cta cta-lg" href="https://near.com" target="_blank" rel="noopener">
              Start mining Trace Credits
              <span className="arr">→</span>
            </a>
            <a className="cta-ghost" href="https://github.com/TraceCommons/trace-commons-server" target="_blank" rel="noopener">
              Read the protocol
            </a>
          </div>
          <div className="hero-stats">
            <Stat k="Phase" v="A · Pilot" />
            <Stat k="Scoring" v="TEE · NEAR&nbsp;AI" />
            <Stat k="Default" v="opt-in, redacted" />
            <Stat k="Credits" v="non-transferable" />
          </div>
        </div>
        <div className="hero-viz">
          <window.TraceHero accent={accent} />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }) {
  return (
    <div className="stat">
      <div className="stat-k">{k}</div>
      <div className="stat-v" dangerouslySetInnerHTML={{__html: v}} />
    </div>
  );
}

function Marquee() {
  const items = [
    "AGENT TRAJECTORIES",
    "LOCAL REDACTION",
    "TEE-HOSTED SCORING",
    "HASH-ONLY ATTESTATION",
    "USER-OWNED DATA",
    "NEAR AI STACK",
    "RANKING EVIDENCE",
    "NON-TRANSFERABLE CREDITS",
  ];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...items, ...items, ...items].map((s, i) => (
          <span key={i} className="marquee-item">
            <span className="m-dot">◇</span>{s}
          </span>
        ))}
      </div>
    </div>
  );
}

function WhyNow() {
  return (
    <section className="section whynow">
      <div className="sec-head">
        <span className="sec-num">01</span>
        <span className="sec-title">WHY&nbsp;NOW</span>
      </div>
      <h2 className="display-2">
        You are paying for ChatGPT and&nbsp;Claude<br/>
        <em>with your trajectories</em>.
      </h2>
      <div className="two-col">
        <p className="body-lg">
          The subsidy is the point. Frontier labs aren't burning capital to be nice —
          they're buying the rarest training material on earth: real humans steering
          real agents through real workflows that fail, recover, and succeed.
        </p>
        <p className="body-lg">
          That data flows one way. Out of your session. Into a closed corpus.
          It comes back as a product you pay for. <em>Again.</em>
        </p>
      </div>
      <div className="shift-row">
        <ShiftCard era="2015–2020" title="Static content" body="Pages, books, Common Crawl. Scraped. Saturated." dead/>
        <ShiftCard era="2020–2024" title="Chat logs" body="Single-turn Q&A. Mostly captured. Diminishing returns." dead/>
        <ShiftCard era="2024–?"    title="Agent trajectories" body="Multi-step reasoning, tool use, transactions, recovery, human feedback." live/>
      </div>
    </section>
  );
}

function ShiftCard({ era, title, body, live, dead }) {
  return (
    <div className={`shift-card ${live ? "live" : ""} ${dead ? "dead" : ""}`}>
      <div className="shift-era">{era}</div>
      <h3 className="shift-title">{title}</h3>
      <p className="shift-body">{body}</p>
      <div className="shift-flag">
        {live && <span><span className="dot"></span>OPEN&nbsp;FRONTIER</span>}
        {dead && <span className="strike">CAPTURED</span>}
      </div>
    </div>
  );
}

function Thesis() {
  return (
    <section className="section thesis">
      <div className="sec-head">
        <span className="sec-num">02</span>
        <span className="sec-title">THESIS</span>
      </div>
      <div className="thesis-grid">
        <div>
          <h2 className="display-2">
            Trajectories are <em>provenance</em>.<br/>
            Provenance is <em>ownership</em>.
          </h2>
        </div>
        <div className="thesis-points">
          <ThesisPoint n="i"   text="An agent trajectory is a workflow: reason, call a tool, observe, transact, fail, recover, succeed. It is the most compressed expression of human intent in compute." />
          <ThesisPoint n="ii"  text="Whoever owns the trajectory owns the model that learns from it. Whoever owns the model owns the next interface to the world." />
          <ThesisPoint n="iii" text="Today's collection layer is the inference API. Plaintext flows out. Credits flow up. Users get a chatbot." />
          <ThesisPoint n="iv"  text="Trace Commons inverts the topology. Capture stays local. Redaction is deterministic. Scoring runs blind inside a TEE. Credits settle on-chain. The operator never sees plaintext." />
        </div>
      </div>
    </section>
  );
}

function ThesisPoint({ n, text }) {
  return (
    <div className="t-point">
      <span className="t-n">{n}.</span>
      <p>{text}</p>
    </div>
  );
}

function Credits({ accent }) {
  const steps = [
    { n: "01", k: "CAPTURE", t: "Local-first", b: "Agent runs in Ironclaw on your device. Traces stay off the network unless you opt in. Default is silence." },
    { n: "02", k: "REDACT",  t: "Deterministic", b: "Text and tool payloads are stripped or replaced with stable placeholders before a single byte leaves the host." },
    { n: "03", k: "SCORE",   t: "Blind, in TEE", b: "An attested enclave scores novelty against a frontier model. The operator sees a number, never plaintext." },
    { n: "04", k: "MINT",    t: "Hash-only", b: "Accepted traces mint Trace Credits via a hash-only attestation pipeline. Bound to evidence. Non-transferable." },
  ];
  return (
    <section className="section credits">
      <div className="sec-head">
        <span className="sec-num">03</span>
        <span className="sec-title">TRACE&nbsp;CREDITS</span>
      </div>
      <h2 className="display-2">
        Uploads don't pay. <em>Utility does.</em>
      </h2>
      <p className="body-lg sub">
        Trace Credits aren't a token for posting data. They are a non-transferable receipt
        for trajectories that measurably improved a model, an evaluation, or a downstream task.
        The pipeline is hash-only end-to-end.
      </p>

      <div className="pipeline">
        {steps.map((s, i) => (
          <React.Fragment key={s.n}>
            <div className="step">
              <div className="step-n">{s.n}</div>
              <div className="step-k">{s.k}</div>
              <div className="step-t">{s.t}</div>
              <div className="step-b">{s.b}</div>
            </div>
            {i < steps.length - 1 && <div className="step-arrow" aria-hidden="true">→</div>}
          </React.Fragment>
        ))}
      </div>

      <div className="credit-rules">
        <div className="rule">
          <div className="rule-k">RULE&nbsp;A</div>
          <div className="rule-v">Opt-in. Off by default. Revocable.</div>
        </div>
        <div className="rule">
          <div className="rule-k">RULE&nbsp;B</div>
          <div className="rule-v">Redact before upload. No plaintext ever leaves your device.</div>
        </div>
        <div className="rule">
          <div className="rule-k">RULE&nbsp;C</div>
          <div className="rule-v">Hash-only logs. Audit rows never carry identity.</div>
        </div>
        <div className="rule">
          <div className="rule-k">RULE&nbsp;D</div>
          <div className="rule-v">Credits attest to utility. Uploads alone earn nothing.</div>
        </div>
      </div>
    </section>
  );
}

function BigCTA() {
  return (
    <section className="section bigcta">
      <h2 className="huge">
        Mine the<br/>
        <em>commons</em>.
      </h2>
      <p className="bigcta-sub">
        The pilot is live. Run an Ironclaw agent. Contribute redacted traces.
        Earn credits bound to the value they produce.
      </p>
      <a className="cta cta-xl" href="https://near.com" target="_blank" rel="noopener">
        Start mining Trace Credits
        <span className="arr">→</span>
      </a>
      <div className="bigcta-meta">
        <span>near.com</span>
        <span className="sep">·</span>
        <span>wallet required</span>
        <span className="sep">·</span>
        <span>opt-in, redacted, revocable</span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="wordmark">
            <span className="wm-mark">◇</span> TRACE&nbsp;COMMONS
          </div>
          <p className="foot-tag">
            A privacy-preserving commons for AI agent traces, with contributor rewards.
          </p>
        </div>
        <FootCol title="Protocol">
          <a href="https://github.com/TraceCommons/trace-commons-server" target="_blank" rel="noopener">Server repo</a>
          <a href="https://github.com/TraceCommons/trace-commons-server/blob/main/docs/trace-commons.md" target="_blank" rel="noopener">Envelope &amp; threat model</a>
          <a href="https://github.com/TraceCommons/trace-commons-server/blob/main/docs/trace-commons-storage.md" target="_blank" rel="noopener">Storage contract</a>
          <a href="https://github.com/TraceCommons/trace-commons-server/blob/main/docs/trace-commons-roadmap.md" target="_blank" rel="noopener">Roadmap</a>
        </FootCol>
        <FootCol title="Stack">
          <span className="foot-static">Ironclaw · client</span>
          <span className="foot-static">NEAR AI Cloud · TEE scoring</span>
          <span className="foot-static">Intel TDX + NVIDIA GPU TEE</span>
          <span className="foot-static">NEAR · settlement</span>
        </FootCol>
        <FootCol title="Get started">
          <a href="https://near.com" target="_blank" rel="noopener">near.com&nbsp;↗</a>
          <span className="foot-static">Phase A · pilot</span>
          <span className="foot-static">May 2026</span>
        </FootCol>
      </div>
      <div className="foot-base">
        <span>© 2026 Trace Commons</span>
        <span className="foot-mono">SHA· uploads carry only ironclaw.trace_contribution.v1</span>
      </div>
    </footer>
  );
}

function FootCol({ title, children }) {
  return (
    <div className="foot-col">
      <div className="foot-h">{title}</div>
      <div className="foot-list">{children}</div>
    </div>
  );
}

function Tweaks({ t, setTweak }) {
  const { TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent">
        <TweakColor
          label="Color"
          value={t.accent}
          onChange={(v) => setTweak("accent", v)}
          options={ACCENT_OPTIONS}
        />
      </TweakSection>
      <TweakSection label="Mode">
        <TweakRadio
          label="Theme"
          value={t.mode}
          onChange={(v) => setTweak("mode", v)}
          options={[{label: "Dark", value: "dark"}, {label: "Light", value: "light"}]}
        />
      </TweakSection>
      <TweakSection label="Texture">
        <TweakToggle value={t.grain} onChange={(v) => setTweak("grain", v)} label="Film grain"/>
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
