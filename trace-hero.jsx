/* Animated trajectory visualization for the hero.
   A directed graph of "thought / tool / observe / act" nodes.
   Each tick a new edge lights up, tracing an agent's path.
   Hashes appear next to each node as it activates — the "trace" being minted. */

const NODES = [
  { id: "P",  x: 0.10, y: 0.50, k: "prompt",  label: "USER" },
  { id: "R1", x: 0.27, y: 0.22, k: "reason",  label: "reason" },
  { id: "T1", x: 0.46, y: 0.08, k: "tool",    label: "search" },
  { id: "O1", x: 0.62, y: 0.22, k: "observe", label: "obs" },
  { id: "R2", x: 0.46, y: 0.50, k: "reason",  label: "plan" },
  { id: "T2", x: 0.66, y: 0.50, k: "tool",    label: "tx.send" },
  { id: "F",  x: 0.46, y: 0.82, k: "fail",    label: "retry" },
  { id: "R3", x: 0.66, y: 0.82, k: "reason",  label: "recover" },
  { id: "A",  x: 0.88, y: 0.50, k: "act",     label: "settle" },
];
const EDGES = [
  ["P","R1"], ["R1","T1"], ["T1","O1"], ["O1","R2"],
  ["R2","T2"], ["T2","F"],  ["F","R3"],  ["R3","A"],
  ["R2","A"],
];

function shortHash(seed) {
  // deterministic-ish 7-char hex
  const cs = "0123456789abcdef";
  let s = "0x";
  let n = seed * 99173 + 7;
  for (let i = 0; i < 7; i++) { n = (n * 1103515245 + 12345) & 0x7fffffff; s += cs[n % 16]; }
  return s;
}

function TraceHero({ accent = "var(--accent)" }) {
  const [tick, setTick] = React.useState(0);
  const [run, setRun] = React.useState(0);
  const rafRef = React.useRef();
  const startRef = React.useRef(performance.now());

  React.useEffect(() => {
    const step = (t) => {
      const elapsed = (t - startRef.current) / 1000;
      // 9 edges, 0.5s each + 1.2s pause, then restart
      const cycle = EDGES.length * 0.55 + 1.6;
      const phase = elapsed % cycle;
      const idx = Math.min(EDGES.length, Math.floor(phase / 0.55));
      setTick(idx);
      if (phase < 0.05 && elapsed > 1) setRun((r) => r + 1);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const W = 1000, H = 560;
  const px = (n) => n * W;
  const py = (n) => n * H;
  const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]));

  return (
    <div className="hero-anim">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--line-faint)" strokeWidth="1"/>
          </pattern>
          <linearGradient id="edgeGlow" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor={accent} stopOpacity="0"/>
            <stop offset="60%" stopColor={accent} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={accent} stopOpacity="1"/>
          </linearGradient>
        </defs>

        <rect width={W} height={H} fill="url(#grid)" opacity="0.5"/>

        {/* All edges (faint) */}
        {EDGES.map(([a,b], i) => {
          const A = nodeMap[a], B = nodeMap[b];
          return (
            <line key={i} x1={px(A.x)} y1={py(A.y)} x2={px(B.x)} y2={py(B.y)}
                  stroke="var(--line)" strokeWidth="1.2" />
          );
        })}

        {/* Activated edges (accent) */}
        {EDGES.slice(0, tick).map(([a,b], i) => {
          const A = nodeMap[a], B = nodeMap[b];
          const fresh = i === tick - 1;
          return (
            <g key={`e${i}-${run}`}>
              <line x1={px(A.x)} y1={py(A.y)} x2={px(B.x)} y2={py(B.y)}
                    stroke={accent} strokeWidth={fresh ? 2.4 : 1.6}
                    strokeOpacity={fresh ? 1 : 0.7}
                    style={{ filter: fresh ? `drop-shadow(0 0 8px ${accent})` : "none" }} />
              {fresh && (
                <circle r="5" fill={accent} style={{ filter: `drop-shadow(0 0 10px ${accent})` }}>
                  <animate attributeName="cx" from={px(A.x)} to={px(B.x)} dur="0.55s" fill="freeze"/>
                  <animate attributeName="cy" from={py(A.y)} to={py(B.y)} dur="0.55s" fill="freeze"/>
                </circle>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((n, i) => {
          const active = EDGES.slice(0, tick).some(([a,b]) => a===n.id || b===n.id);
          const isPrompt = n.k === "prompt";
          const isAct = n.k === "act";
          const isFail = n.k === "fail";
          const isTool = n.k === "tool";
          const shape = isPrompt || isAct ? "diamond" : isTool ? "square" : "circle";
          const size = isPrompt || isAct ? 22 : 14;
          const fill = active ? accent : "var(--bg)";
          const stroke = active ? accent : "var(--line-strong)";
          return (
            <g key={n.id} transform={`translate(${px(n.x)},${py(n.y)})`}>
              {shape === "circle" && (
                <circle r={size} fill={fill} stroke={stroke} strokeWidth="2"
                        style={{ filter: active ? `drop-shadow(0 0 12px ${accent})` : "none" }}/>
              )}
              {shape === "square" && (
                <rect x={-size} y={-size} width={size*2} height={size*2}
                      fill={fill} stroke={stroke} strokeWidth="2"
                      style={{ filter: active ? `drop-shadow(0 0 12px ${accent})` : "none" }}/>
              )}
              {shape === "diamond" && (
                <rect x={-size} y={-size} width={size*2} height={size*2}
                      transform="rotate(45)"
                      fill={fill} stroke={stroke} strokeWidth="2"
                      style={{ filter: active ? `drop-shadow(0 0 14px ${accent})` : "none" }}/>
              )}
              {isFail && active && (
                <text textAnchor="middle" dy="5" fontSize="14" fontFamily="var(--mono)"
                      fill="var(--bg)" fontWeight="700">!</text>
              )}
              <text textAnchor="middle" y={size + 18} fontSize="13"
                    fontFamily="var(--mono)" fill={active ? "var(--fg)" : "var(--fg-mute)"}
                    letterSpacing="0.05em">
                {n.label}
              </text>
              {active && (
                <text textAnchor="middle" y={size + 34} fontSize="10"
                      fontFamily="var(--mono)" fill={accent} opacity="0.85"
                      letterSpacing="0.04em">
                  {shortHash(i + run * 13)}
                </text>
              )}
            </g>
          );
        })}

        {/* Header labels */}
        <text x="20" y="28" fontFamily="var(--mono)" fontSize="11"
              fill="var(--fg-mute)" letterSpacing="0.18em">
          AGENT.TRAJECTORY ── live capture
        </text>
        <text x={W-20} y="28" textAnchor="end" fontFamily="var(--mono)" fontSize="11"
              fill={accent} letterSpacing="0.18em">
          {`STEP ${String(tick).padStart(2,"0")}/${String(EDGES.length).padStart(2,"0")}`}
        </text>
        <text x="20" y={H-16} fontFamily="var(--mono)" fontSize="11"
              fill="var(--fg-mute)" letterSpacing="0.14em">
          {`run.${String(run).padStart(4,"0")} · ironclaw.trace_contribution.v1`}
        </text>
        <text x={W-20} y={H-16} textAnchor="end" fontFamily="var(--mono)" fontSize="11"
              fill="var(--fg-mute)" letterSpacing="0.14em">
          scrub ▸ gate ▸ register
        </text>
      </svg>
    </div>
  );
}

window.TraceHero = TraceHero;
