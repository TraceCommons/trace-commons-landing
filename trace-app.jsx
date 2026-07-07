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
          PILOT&nbsp;·&nbsp;INVITE-ONLY&nbsp;·&nbsp;MAY&nbsp;2026
        </span>
        <a href="https://github.com/TraceCommons/trace-commons-server" target="_blank" rel="noopener">GitHub</a>
        <a href="https://github.com/TraceCommons/trace-commons-server/blob/main/docs/trace-commons.md" target="_blank" rel="noopener">Protocol</a>
        <a className="cta cta-sm" href="https://near.com" target="_blank" rel="noopener">
          Request invite<span className="arr">↗</span>
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
            When an agent works for you,<br/>
            it leaves <em>a trail of what happened</em>.
          </h1>
          <p className="lede">
            That trail — the tools it called, the places it failed, the result it gave back —
            is the rarest training material in AI. Right now it goes straight to whoever ran
            the model, and you did not specifically agree to that. Trace Commons keeps the
            record under your control: captured and scrubbed on your machine, gated for
            novelty <em>and</em> substance on a shared server, signed and filed into a
            register that buyers can later query under selective disclosure.
          </p>
          <div className="hero-ctas">
            <a className="cta cta-lg" href="https://near.com" target="_blank" rel="noopener">
              Request a pilot invite
              <span className="arr">→</span>
            </a>
            <a className="cta-ghost" href="https://github.com/TraceCommons/trace-commons-server" target="_blank" rel="noopener">
              Read the protocol
            </a>
          </div>
          <div className="hero-stats">
            <Stat k="Phase" v="A · Pilot · invite-only" />
            <Stat k="Review" v="novelty + substance" />
            <Stat k="Default" v="opt-in, scrubbed" />
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
    "LOCAL CAPTURE & SCRUB",
    "TWO-GATE REVIEW",
    "SIGNED ON-CHAIN REGISTER",
    "SELECTIVE DISCLOSURE",
    "USER-OWNED RECORDS",
    "NEAR SETTLEMENT",
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
        You produce the trail.<br/>
        <em>You did not agree to give it away.</em>
      </h2>
      <div className="two-col">
        <p className="body-lg">
          When an AI agent does work for you, it leaves a record of what actually
          happened: the tools it called, the places it failed, the result it gave
          back. The companies building the next generation of agents need millions
          of those records to train against, and most of them live inside private
          user sessions today.
        </p>
        <p className="body-lg">
          Right now you produce the trail and it goes straight to the company running
          the model. The flow is one-way, the value is captured upstream, and what
          comes back is the product you already pay for. <em>Again.</em>
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
          <ThesisPoint n="iv"  text="Trace Commons inverts the topology. Capture and scrubbing stay on your machine. Server-side review tests two things: novelty and substance. Accepted records are signed, dated, and filed into a register that buyers query under selective disclosure. Credits — on-chain receipts of acceptance — flow back to the contributor. The next milestone moves scoring into hardware the operator cannot read." />
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
    { n: "01", k: "CAPTURE", t: "On your machine", b: "Agent runs in Ironclaw on your device. The record of what happened stays off the network unless you opt in. Default is silence." },
    { n: "02", k: "SCRUB",   t: "Before upload", b: "Text and tool payloads are stripped or replaced with stable placeholders, locally, before a single byte leaves the host." },
    { n: "03", k: "GATE",    t: "Two checks. Both must pass.", b: "On a shared server, one check asks whether the record is genuinely different from everything already filed. The other asks whether it is substantive work, not template-shaped filler." },
    { n: "04", k: "REGISTER", t: "Signed, dated, filed", b: "Accepted records are signed and filed into a register. A Trace Credit is the on-chain receipt that yours was accepted. Buyers query the register later under selective disclosure." },
  ];
  return (
    <section className="section credits">
      <div className="sec-head">
        <span className="sec-num">03</span>
        <span className="sec-title">TRACE&nbsp;CREDITS</span>
      </div>
      <h2 className="display-2">
        Uploads don't pay. <em>Acceptance does.</em>
      </h2>
      <p className="body-lg sub">
        A credit is the signed, on-chain record that one of your contributions was
        accepted into the register. It is how recognition flows back to contributors
        when buyers later pay to query the evidence. Credits cannot be traded.
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
          <div className="rule-v">Scrub before upload. No plaintext ever leaves your device.</div>
        </div>
        <div className="rule">
          <div className="rule-k">RULE&nbsp;C</div>
          <div className="rule-v">Two gates: novelty and substance. Both must pass.</div>
        </div>
        <div className="rule">
          <div className="rule-k">RULE&nbsp;D</div>
          <div className="rule-v">Credits attest to acceptance. Uploads alone earn nothing.</div>
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
        The pilot is invite-only, waiting on its first real contributors. Bring an
        Ironclaw agent, an invite, and a workload token. The next milestone moves
        scoring into hardware that even the operators of the server cannot read.
      </p>
      <a className="cta cta-xl" href="https://near.com" target="_blank" rel="noopener">
        Request a pilot invite
        <span className="arr">→</span>
      </a>
      <div className="bigcta-meta">
        <span>near.com</span>
        <span className="sep">·</span>
        <span>wallet required</span>
        <span className="sep">·</span>
        <span>opt-in, scrubbed, revocable</span>
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
            A user-owned register of agent work. Captured and scrubbed locally,
            gated for novelty and substance, signed on-chain.
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
          <span className="foot-static">NEAR AI Cloud · gating</span>
          <span className="foot-static">Intel TDX + NVIDIA GPU TEE · Phase B</span>
          <span className="foot-static">NEAR · settlement</span>
        </FootCol>
        <FootCol title="Get started">
          <a href="https://near.com" target="_blank" rel="noopener">near.com&nbsp;↗</a>
          <span className="foot-static">Phase A · pilot · invite-only</span>
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
