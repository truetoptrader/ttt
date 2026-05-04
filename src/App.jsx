import { useState, useMemo, useRef, useEffect } from "react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#070b09;font-family:'DM Sans',sans-serif;color:#dde8e3;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}
::-webkit-scrollbar-track{background:#070b09}
::-webkit-scrollbar-thumb{background:#1e2d26;border-radius:3px}
::selection{background:rgba(74,222,128,0.15);color:#4ade80}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
.fade-up{animation:fadeUp .5s ease both}
.fade-up-d1{animation:fadeUp .5s .1s ease both}
.fade-up-d2{animation:fadeUp .5s .2s ease both}
.fade-up-d3{animation:fadeUp .5s .3s ease both}
.fade-up-d4{animation:fadeUp .5s .4s ease both}
.fade-up-d5{animation:fadeUp .5s .5s ease both}
input[type=number]::-webkit-inner-spin-button{-webkit-appearance:none}
`;

const C = {
  bg: '#070b09', surf: '#0d1410', surf2: '#111a16',
  border: '#1a2620', borderMid: '#223029', borderHi: '#2d3f36',
  text: '#dde8e3', textMid: '#8eab9e', textFaint: '#4a6358',
  accent: '#4ade80', accentHi: '#86efac', accentLo: '#166534',
  accentBg: 'rgba(74,222,128,0.07)', accentBgHi: 'rgba(74,222,128,0.13)',
  red: '#f87171', redBg: 'rgba(248,113,113,0.08)',
  amber: '#fbbf24', amberBg: 'rgba(251,191,36,0.08)',
  white: '#f0f7f3',
};

const FF = { display: "'Syne',sans-serif", mono: "'JetBrains Mono',monospace", body: "'DM Sans',sans-serif" };

const TRADERS = [
  { id:1, name:"Karim A.", handle:"karim_fx", score:4.83, totalR:142.5, drawdown:29.5, winrate:67, trades:184, last30d:12.3, streak:6, tag:"FX" },
  { id:2, name:"Sarah M.", handle:"sarah_quant", score:4.21, totalR:98.3, drawdown:23.4, winrate:71, trades:127, last30d:8.7, streak:4, tag:"Crypto" },
  { id:3, name:"Liu W.", handle:"liuwei_trader", score:3.97, totalR:118.7, drawdown:29.9, winrate:58, trades:312, last30d:6.1, streak:3, tag:"FX" },
  { id:4, name:"Dani R.", handle:"danir_indices", score:3.74, totalR:76.2, drawdown:20.4, winrate:63, trades:89, last30d:11.2, streak:5, tag:"Indices" },
  { id:5, name:"Ola T.", handle:"ola_swing", score:3.48, totalR:104.1, drawdown:29.9, winrate:55, trades:241, last30d:4.3, streak:-2, tag:"FX" },
  { id:6, name:"Marc B.", handle:"marcb_vol", score:3.12, totalR:62.9, drawdown:20.2, winrate:74, trades:68, last30d:9.8, streak:7, tag:"Options" },
  { id:7, name:"Ines C.", handle:"ines_crypto", score:2.88, totalR:89.3, drawdown:30.9, winrate:52, trades:178, last30d:-1.2, streak:-4, tag:"Crypto" },
  { id:8, name:"Yaw K.", handle:"yaw_systematic", score:2.71, totalR:54.2, drawdown:20.0, winrate:60, trades:93, last30d:5.6, streak:2, tag:"Futures" },
];

function genEquityCurve(seed, n=120) {
  let r = seed * 9301 + 49297;
  const pts = [0];
  for (let i=1; i<n; i++) {
    r = (r * 9301 + 49297) % 233280;
    const rand = r / 233280;
    const v = rand > 0.42 ? (rand - 0.42) * 4.5 : -(0.42 - rand) * 2.8;
    pts.push(pts[i-1] + v);
  }
  return pts;
}

function EquityCurve({ trader, h=200 }) {
  const pts = useMemo(() => genEquityCurve(trader.id * 17, 120), [trader.id]);
  const min = Math.min(...pts), max = Math.max(...pts);
  const pad = (max - min) * 0.08;
  const lo = min - pad, hi = max + pad;
  const W = 700, H = h;
  const toX = (i) => (i / (pts.length-1)) * W;
  const toY = (v) => H - ((v - lo) / (hi - lo)) * H;
  const pathD = pts.map((v,i) => `${i===0?'M':'L'}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(' ');
  const areaD = pathD + ` L${W},${H} L0,${H} Z`;
  const ddSegs = [];
  let inDD = false, ddStart = 0, ddPeak = pts[0];
  for (let i=1; i<pts.length; i++) {
    if (pts[i] > ddPeak) { ddPeak = pts[i]; inDD = false; }
    if (pts[i] < ddPeak * 0.97 && !inDD) { inDD = true; ddStart = i; }
    if (inDD && (pts[i] > ddPeak * 0.99 || i === pts.length-1)) {
      ddSegs.push({ start: ddStart, end: i });
      inDD = false;
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:h, display:'block' }}>
      <defs>
        <linearGradient id={`grad${trader.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4ade80" stopOpacity=".15"/>
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {ddSegs.map((s,i) => (
        <rect key={i} x={toX(s.start)} y={0} width={toX(s.end)-toX(s.start)} height={H}
          fill="rgba(248,113,113,0.06)" />
      ))}
      <path d={areaD} fill={`url(#grad${trader.id})`}/>
      <path d={pathD} fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinejoin="round"/>
      <line x1="0" y1={toY(0)} x2={W} y2={toY(0)} stroke="#2d3f36" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  );
}

const Tag = ({children, color="#4ade80"}) => (
  <span style={{ background:`rgba(${color==='#4ade80'?'74,222,128':color==='#f87171'?'248,113,113':'251,191,36'},.1)`,
    color, border:`0.5px solid ${color}28`, borderRadius:4, fontSize:11,
    fontFamily:FF.mono, padding:'2px 7px', whiteSpace:'nowrap' }}>{children}</span>
);

const Mono = ({children, size=13, color=C.text, bold}) => (
  <span style={{ fontFamily:FF.mono, fontSize:size, color, fontWeight:bold?600:400 }}>{children}</span>
);

function StatPill({ label, value, color=C.text, sub }) {
  return (
    <div style={{ background:C.surf2, border:`0.5px solid ${C.border}`, borderRadius:8, padding:'12px 16px', minWidth:100 }}>
      <div style={{ fontSize:11, color:C.textFaint, fontFamily:FF.mono, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{label}</div>
      <div style={{ fontFamily:FF.mono, fontSize:20, fontWeight:700, color }}>{value}</div>
      {sub && <div style={{ fontSize:11, color:C.textMid, marginTop:3 }}>{sub}</div>}
    </div>
  );
}

function NavBar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{ position:'sticky', top:0, zIndex:100, background:'rgba(7,11,9,.88)',
      backdropFilter:'blur(12px)', borderBottom:`0.5px solid ${C.border}`, padding:'0 32px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto', height:56, display:'flex', alignItems:'center', gap:32 }}>
        <button onClick={()=>setPage('landing')} style={{ background:'none', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:24, height:24, background:C.accent, borderRadius:6,
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontFamily:FF.mono, fontSize:11, fontWeight:700, color:'#070b09' }}>R</span>
          </div>
          <span style={{ fontFamily:FF.display, fontSize:15, fontWeight:700, color:C.white, letterSpacing:'-.01em' }}>RiskRank</span>
        </button>
        <div style={{ flex:1 }}/>
        {['rankings','pricing'].map(p => (
          <button key={p} onClick={()=>setPage(p)} style={{ background:'none', border:'none', cursor:'pointer',
            fontSize:13, color:page===p?C.accent:C.textMid, fontFamily:FF.body,
            textTransform:'capitalize', padding:'4px 0', borderBottom:page===p?`1px solid ${C.accent}`:'1px solid transparent',
            transition:'all .2s' }}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
        ))}
        <button onClick={()=>setPage('rankings')} style={{ background:C.accent, border:'none', cursor:'pointer',
          color:'#070b09', fontSize:13, fontWeight:600, fontFamily:FF.body, padding:'8px 18px',
          borderRadius:7, letterSpacing:'-.01em' }}>Start Copying</button>
      </div>
    </nav>
  );
}

function LandingPage({ setPage }) {
  return (
    <div>
      <style>{`
        .hero-stat{transition:transform .2s}.hero-stat:hover{transform:translateY(-2px)}
        .cta-pri{transition:all .15s;background:#4ade80;color:#070b09;border:none;cursor:pointer;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;font-family:'DM Sans',sans-serif;letter-spacing:-.02em}
        .cta-pri:hover{background:#86efac}
        .cta-sec{transition:all .15s;background:transparent;color:#dde8e3;border:0.5px solid #2d3f36;cursor:pointer;padding:14px 28px;border-radius:8px;font-size:15px;font-family:'DM Sans',sans-serif}
        .cta-sec:hover{border-color:#4ade80;color:#4ade80}
        .step-card{background:#0d1410;border:0.5px solid #1a2620;border-radius:12px;padding:28px;transition:border-color .2s}
        .step-card:hover{border-color:#2d3f36}
        .prob-card{background:#0d1410;border:0.5px solid #1a2620;border-radius:12px;padding:28px 24px;transition:all .2s}
        .prob-card:hover{border-color:#2d3f36;transform:translateY(-2px)}
        .trader-card{background:#111a16;border:0.5px solid #1a2620;border-radius:12px;padding:24px;transition:border-color .2s;flex:1}
        .trader-card.winner{border-color:#4ade8044;background:rgba(74,222,128,.04)}
        .feature-row{display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:0.5px solid #1a2620}
        .feature-row:last-child{border-bottom:none}
      `}</style>

      {/* Hero */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'96px 32px 80px' }}>
        <div className="fade-up" style={{ display:'inline-flex', alignItems:'center', gap:8,
          background:C.accentBg, border:`0.5px solid ${C.accentLo}`, borderRadius:20,
          padding:'5px 12px', marginBottom:28 }}>
          <span style={{ width:6, height:6, background:C.accent, borderRadius:'50%', animation:'pulse 2s infinite' }}/>
          <span style={{ fontFamily:FF.mono, fontSize:11, color:C.accent }}>NOW IN BETA — 143 TRADERS RANKED</span>
        </div>

        <h1 className="fade-up-d1" style={{ fontFamily:FF.display, fontSize:'clamp(42px,5.5vw,72px)',
          fontWeight:800, lineHeight:1.08, letterSpacing:'-.03em', color:C.white, maxWidth:720, marginBottom:24 }}>
          Trade based on<br/><span style={{ color:C.accent }}>risk,</span> not illusions.
        </h1>

        <p className="fade-up-d2" style={{ fontSize:18, color:C.textMid, maxWidth:520, lineHeight:1.65, marginBottom:40 }}>
          We rank traders by how efficiently they turn risk into profit — not by flashy gains.
          One metric. Zero noise. Full transparency.
        </p>

        <div className="fade-up-d3" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:64 }}>
          <button className="cta-pri" onClick={()=>setPage('rankings')}>View Top Traders</button>
          <button className="cta-sec" onClick={()=>setPage('pricing')}>Start Copying — $19/mo</button>
        </div>

        <div className="fade-up-d4" style={{ display:'flex', gap:48, flexWrap:'wrap' }}>
          {[['143','Active traders'],['18.7K','Trades tracked'],['4.83','Top Recovery Score'],['$0','Hidden fees']].map(([v,l])=>(
            <div key={l} className="hero-stat">
              <div style={{ fontFamily:FF.mono, fontSize:28, fontWeight:700, color:C.white, lineHeight:1 }}>{v}</div>
              <div style={{ fontSize:13, color:C.textFaint, marginTop:5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Problem */}
      <div style={{ background:C.surf, borderTop:`0.5px solid ${C.border}`, borderBottom:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'72px 32px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>The Problem</div>
            <h2 style={{ fontFamily:FF.display, fontSize:36, fontWeight:700, color:C.white, letterSpacing:'-.02em' }}>Most trader rankings are lies.</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:16 }}>
            {[
              { icon:'≠', title:'Profit ≠ Skill', body:'A 300% gain means nothing if it came from a single YOLO trade. Without context, profit is just noise.', c:C.amber },
              { icon:'↑↓', title:'High returns hide risk', body:'The most dangerous traders show the best short-term numbers. Risk is invisible until it destroys you.', c:C.red },
              { icon:'⌁', title:'Telegram = noise', body:'Copy signals sent via chat create chaos. No sizing, no context, no accountability. Pure speculation theater.', c:C.textMid },
            ].map(p=>(
              <div key={p.title} className="prob-card">
                <div style={{ fontFamily:FF.mono, fontSize:24, color:p.c, marginBottom:14 }}>{p.icon}</div>
                <h3 style={{ fontFamily:FF.display, fontSize:17, fontWeight:700, color:C.white, marginBottom:10 }}>{p.title}</h3>
                <p style={{ fontSize:14, color:C.textMid, lineHeight:1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution / How it works */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'80px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
          <div>
            <div style={{ fontFamily:FF.mono, fontSize:11, color:C.accent, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:16 }}>The Solution</div>
            <h2 style={{ fontFamily:FF.display, fontSize:38, fontWeight:800, color:C.white, lineHeight:1.15, letterSpacing:'-.025em', marginBottom:20 }}>
              We measure in <span style={{ color:C.accent }}>R.</span><br/>The only honest unit.
            </h2>
            <p style={{ fontSize:15, color:C.textMid, lineHeight:1.7, marginBottom:32 }}>
              R is the universal unit of risk-adjusted return. Every trade is measured relative to what the trader risked.
              A +5R result means they made 5× their risk. It doesn't matter if that's $50 or $50,000.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <div style={{ background:C.accentBg, border:`0.5px solid ${C.accentLo}`, borderRadius:8, padding:'10px 16px' }}>
                <Mono color={C.accent} size={20} bold>+1R</Mono>
                <div style={{ fontSize:12, color:C.textMid, marginTop:3 }}>Gained = risk</div>
              </div>
              <div style={{ background:C.redBg, border:`0.5px solid rgba(248,113,113,.2)`, borderRadius:8, padding:'10px 16px' }}>
                <Mono color={C.red} size={20} bold>−1R</Mono>
                <div style={{ fontSize:12, color:C.textMid, marginTop:3 }}>Lost = risk</div>
              </div>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
            {[
              { n:'01', label:'Every trade measured in R', desc:'Entry, SL, and TP define the R value. No manipulation possible.' },
              { n:'02', label:'Full history tracked', desc:'Immutable trade log. No deletions, no edits. Verified performance only.' },
              { n:'03', label:'Ranked by Recovery Score', desc:'Total R ÷ Max Drawdown. Higher = more efficient per unit of risk.' },
            ].map(s=>(
              <div key={s.n} className="step-card" style={{ display:'flex', gap:20 }}>
                <div style={{ fontFamily:FF.mono, fontSize:13, color:C.textFaint, paddingTop:2, minWidth:24 }}>{s.n}</div>
                <div>
                  <div style={{ fontFamily:FF.display, fontSize:15, fontWeight:700, color:C.white, marginBottom:6 }}>{s.label}</div>
                  <div style={{ fontSize:13, color:C.textMid, lineHeight:1.6 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metric Comparison */}
      <div style={{ background:C.surf, borderTop:`0.5px solid ${C.border}`, borderBottom:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'72px 32px' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Core Metric</div>
            <h2 style={{ fontFamily:FF.display, fontSize:32, fontWeight:700, color:C.white, letterSpacing:'-.02em' }}>Recovery Score = Total R / Max Drawdown</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:24, alignItems:'center', maxWidth:700, margin:'0 auto' }}>
            <div className="trader-card" style={{ opacity:.7 }}>
              <div style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint, marginBottom:12 }}>TRADER A</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[['Total R','+280R'],['Max Drawdown','-142R'],['Score','1.97']].map(([l,v])=>(
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                    <span style={{ color:C.textMid }}>{l}</span>
                    <Mono color={l==='Score'?C.amber:C.text}>{v}</Mono>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, background:C.amberBg, border:`0.5px solid rgba(251,191,36,.15)`, borderRadius:6, padding:'8px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:12, color:C.amber }}>Recovery Score</span>
                <Mono size={22} color={C.amber} bold>1.97</Mono>
              </div>
            </div>

            <div style={{ fontFamily:FF.mono, fontSize:13, color:C.textFaint }}>VS</div>

            <div className="trader-card winner">
              <div style={{ fontFamily:FF.mono, fontSize:11, color:C.accent, marginBottom:12 }}>TRADER B <span style={{ color:C.accent, marginLeft:6 }}>★ BETTER</span></div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[['Total R','+142R'],['Max Drawdown','-29R'],['Score','4.83']].map(([l,v])=>(
                  <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:13 }}>
                    <span style={{ color:C.textMid }}>{l}</span>
                    <Mono color={l==='Score'?C.accent:C.text}>{v}</Mono>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, background:C.accentBg, border:`0.5px solid rgba(74,222,128,.2)`, borderRadius:6, padding:'8px 12px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:12, color:C.accent }}>Recovery Score</span>
                <Mono size={22} color={C.accent} bold>4.83</Mono>
              </div>
            </div>
          </div>
          <p style={{ textAlign:'center', fontSize:13, color:C.textFaint, marginTop:24 }}>
            Trader B made less total profit — but did it with 5× less drawdown. That's real skill.
          </p>
        </div>
      </div>

      {/* For Traders / For Subscribers */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'80px 32px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
          {[
            { title:'For Traders', sub:'Build reputation on verified performance', items:['Immutable trade history — nobody can question your record','Subscribers pay you directly for copy signals','Recovery Score is your professional credential','Leaderboard visibility drives organic growth'], cta:'List Your Track Record', color:C.accent },
            { title:'For Subscribers', sub:'Stop guessing. Copy structure.', items:['Filter traders by drawdown tolerance, not hype','Understand exactly how each signal is sized','Manual execution — you stay in full control','No Telegram groups, no "trust me bro" signals'], cta:'Find a Trader to Copy', color:C.accentHi },
          ].map(s=>(
            <div key={s.title} style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:14, padding:36 }}>
              <div style={{ fontFamily:FF.mono, fontSize:11, color:s.color, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:10 }}>{s.title}</div>
              <h3 style={{ fontFamily:FF.display, fontSize:24, fontWeight:700, color:C.white, lineHeight:1.2, marginBottom:20 }}>{s.sub}</h3>
              <div>
                {s.items.map(item=>(
                  <div key={item} className="feature-row">
                    <span style={{ color:s.color, fontSize:12, paddingTop:2, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:14, color:C.textMid, lineHeight:1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
              <button className="cta-sec" onClick={()=>setPage(s.title.includes('Trader')?'pricing':'rankings')}
                style={{ marginTop:24, width:'100%', borderColor:`${s.color}44`, color:s.color }}>{s.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div style={{ background:C.surf, borderTop:`0.5px solid ${C.border}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto', padding:'64px 32px', textAlign:'center' }}>
          <h2 style={{ fontFamily:FF.display, fontSize:36, fontWeight:800, color:C.white, letterSpacing:'-.025em', marginBottom:16 }}>
            Ready to trade with evidence?
          </h2>
          <p style={{ fontSize:16, color:C.textMid, marginBottom:32 }}>Full access to rankings, signals, and analytics.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button className="cta-pri" onClick={()=>setPage('rankings')}>View Top Traders</button>
            <button className="cta-sec" onClick={()=>setPage('pricing')}>See Pricing</button>
          </div>
          <div style={{ marginTop:24, fontFamily:FF.mono, fontSize:12, color:C.textFaint }}>$19/month · Cancel anytime · No contracts</div>
        </div>
      </div>
    </div>
  );
}

function RankingsPage({ setPage, setSelectedTrader }) {
  const [sort, setSort] = useState({ key:'score', dir:'desc' });
  const [filter, setFilter] = useState({ minTrades:0, maxDD:100, tf:'all' });

  const sorted = useMemo(() => {
    let list = TRADERS.filter(t => t.trades >= filter.minTrades && t.drawdown <= filter.maxDD);
    return list.sort((a,b) => sort.dir==='desc' ? b[sort.key]-a[sort.key] : a[sort.key]-b[sort.key]);
  }, [sort, filter]);

  const Th = ({ k, label }) => (
    <th onClick={()=>setSort(s=>({ key:k, dir:s.key===k&&s.dir==='desc'?'asc':'desc' }))}
      style={{ padding:'10px 14px', textAlign:'right', fontFamily:FF.mono, fontSize:11,
        color:sort.key===k?C.accent:C.textFaint, letterSpacing:'.06em', cursor:'pointer',
        whiteSpace:'nowrap', userSelect:'none' }}>
      {label}{sort.key===k ? (sort.dir==='desc'?' ↓':' ↑'):''}
    </th>
  );

  const openProfile = (t) => { setSelectedTrader(t); setPage('profile'); };

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'48px 32px' }}>
      <style>{`.tr-row{transition:background .15s;cursor:pointer}.tr-row:hover{background:rgba(74,222,128,.04)}`}</style>
      <div className="fade-up" style={{ marginBottom:32 }}>
        <h1 style={{ fontFamily:FF.display, fontSize:32, fontWeight:800, color:C.white, letterSpacing:'-.025em', marginBottom:8 }}>
          Trader Rankings
        </h1>
        <p style={{ color:C.textMid, fontSize:14 }}>Ranked by Recovery Score — Total R ÷ Max Drawdown</p>
      </div>

      {/* Filters */}
      <div className="fade-up-d1" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:24, alignItems:'center' }}>
        {[['all','All Time'],['90','90 Days'],['30','30 Days']].map(([v,l])=>(
          <button key={v} onClick={()=>setFilter(f=>({...f,tf:v}))}
            style={{ background:filter.tf===v?C.accentBg:'transparent',
              border:`0.5px solid ${filter.tf===v?C.accentLo:C.border}`,
              color:filter.tf===v?C.accent:C.textMid, borderRadius:6, fontSize:12,
              fontFamily:FF.mono, padding:'6px 12px', cursor:'pointer' }}>{l}</button>
        ))}
        <div style={{ marginLeft:'auto', display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
          <label style={{ fontSize:12, color:C.textFaint, fontFamily:FF.mono }}>MIN TRADES</label>
          <select value={filter.minTrades} onChange={e=>setFilter(f=>({...f,minTrades:+e.target.value}))}
            style={{ background:C.surf, border:`0.5px solid ${C.border}`, color:C.text, borderRadius:6,
              padding:'6px 10px', fontSize:12, fontFamily:FF.mono }}>
            {[0,50,100,200].map(n=><option key={n} value={n}>{n}+</option>)}
          </select>
          <label style={{ fontSize:12, color:C.textFaint, fontFamily:FF.mono }}>MAX DD</label>
          <select value={filter.maxDD} onChange={e=>setFilter(f=>({...f,maxDD:+e.target.value}))}
            style={{ background:C.surf, border:`0.5px solid ${C.border}`, color:C.text, borderRadius:6,
              padding:'6px 10px', fontSize:12, fontFamily:FF.mono }}>
            {[100,50,35,25].map(n=><option key={n} value={n}>≤{n}R</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="fade-up-d2" style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:12, overflow:'hidden' }}>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:`0.5px solid ${C.border}` }}>
                <th style={{ padding:'10px 14px', textAlign:'left', fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.06em' }}>#</th>
                <th style={{ padding:'10px 14px', textAlign:'left', fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.06em' }}>TRADER</th>
                <Th k="score" label="SCORE ★"/>
                <Th k="totalR" label="TOTAL R"/>
                <Th k="drawdown" label="MAX DD"/>
                <Th k="winrate" label="WIN%"/>
                <Th k="trades" label="TRADES"/>
                <Th k="last30d" label="30D R"/>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t, i) => (
                <tr key={t.id} className="tr-row" onClick={()=>openProfile(t)}
                  style={{ borderBottom:`0.5px solid ${C.border}`, opacity: i===0&&filter.tf==='all'?1:1 }}>
                  <td style={{ padding:'14px', fontFamily:FF.mono, fontSize:12, color:C.textFaint }}>{i+1}</td>
                  <td style={{ padding:'14px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:8, background:`hsl(${t.id*47},40%,18%)`,
                        border:`0.5px solid hsl(${t.id*47},40%,28%)`, display:'flex', alignItems:'center',
                        justifyContent:'center', fontFamily:FF.mono, fontSize:11, fontWeight:600,
                        color:`hsl(${t.id*47},60%,65%)`, flexShrink:0 }}>
                        {t.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontSize:14, color:C.white, fontWeight:500 }}>{t.name}</div>
                        <div style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint }}>@{t.handle}</div>
                      </div>
                      <Tag>{t.tag}</Tag>
                    </div>
                  </td>
                  <td style={{ padding:'14px', textAlign:'right' }}>
                    <Mono size={15} color={t.score>4?C.accent:t.score>3?C.accentHi:C.text} bold>{t.score.toFixed(2)}</Mono>
                  </td>
                  <td style={{ padding:'14px', textAlign:'right' }}><Mono color={C.accent}>+{t.totalR}R</Mono></td>
                  <td style={{ padding:'14px', textAlign:'right' }}><Mono color={C.red}>-{t.drawdown}R</Mono></td>
                  <td style={{ padding:'14px', textAlign:'right' }}><Mono color={C.textMid}>{t.winrate}%</Mono></td>
                  <td style={{ padding:'14px', textAlign:'right' }}><Mono color={C.textMid}>{t.trades}</Mono></td>
                  <td style={{ padding:'14px', textAlign:'right' }}>
                    <Mono color={t.last30d>0?C.accent:C.red}>{t.last30d>0?'+':''}{t.last30d}R</Mono>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop:16, fontSize:12, color:C.textFaint }}>
        Showing {sorted.length} of {TRADERS.length} traders · Minimum 20 trades required for listing
      </div>
    </div>
  );
}

function TraderProfilePage({ trader, setPage, onCopy }) {
  const [tf, setTf] = useState('all');
  if (!trader) return null;

  const SAMPLE_TRADES = [
    { date:'2025-04-28', asset:'EUR/USD', entry:'1.0832', sl:'1.0812', tp:'1.0872', r:'+2.0R', win:true },
    { date:'2025-04-25', asset:'BTC/USD', entry:'68,240', sl:'66,900', tp:'70,900', r:'+2.0R', win:true },
    { date:'2025-04-22', asset:'GBP/JPY', entry:'193.40', sl:'192.80', tp:'194.60', r:'+2.0R', win:true },
    { date:'2025-04-19', asset:'EUR/USD', entry:'1.0711', sl:'1.0731', tp:'1.0671', r:'−1.0R', win:false },
    { date:'2025-04-17', asset:'GOLD', entry:'2,344', sl:'2,324', tp:'2,384', r:'+2.0R', win:true },
    { date:'2025-04-14', asset:'EUR/USD', entry:'1.0690', sl:'1.0710', tp:'1.0650', r:'−1.0R', win:false },
    { date:'2025-04-11', asset:'NAS100', entry:'18,234', sl:'18,034', tp:'18,634', r:'+2.0R', win:true },
    { date:'2025-04-08', asset:'GBP/USD', entry:'1.2641', sl:'1.2621', tp:'1.2681', r:'+2.0R', win:true },
  ];

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'40px 32px' }}>
      <style>{`.copy-btn{background:#4ade80;color:#070b09;border:none;cursor:pointer;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;font-family:'DM Sans',sans-serif;transition:all .15s}.copy-btn:hover{background:#86efac}
      .sub-btn{background:transparent;color:#dde8e3;border:0.5px solid #2d3f36;cursor:pointer;padding:12px 24px;border-radius:8px;font-size:14px;font-family:'DM Sans',sans-serif;transition:all .15s}.sub-btn:hover{border-color:#4ade80;color:#4ade80}
      .trade-row:hover{background:rgba(74,222,128,.03)}`}</style>

      <button onClick={()=>setPage('rankings')} style={{ background:'none', border:'none', cursor:'pointer',
        color:C.textMid, fontSize:13, fontFamily:FF.body, marginBottom:28, display:'flex', alignItems:'center', gap:6 }}>
        ← Back to Rankings
      </button>

      {/* Header */}
      <div className="fade-up" style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:14, padding:32, marginBottom:20 }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:20, flexWrap:'wrap' }}>
          <div style={{ width:56, height:56, borderRadius:12, background:`hsl(${trader.id*47},40%,15%)`,
            border:`0.5px solid hsl(${trader.id*47},40%,25%)`, display:'flex', alignItems:'center',
            justifyContent:'center', fontFamily:FF.mono, fontSize:16, fontWeight:700,
            color:`hsl(${trader.id*47},60%,65%)`, flexShrink:0 }}>
            {trader.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div style={{ flex:1, minWidth:200 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
              <h1 style={{ fontFamily:FF.display, fontSize:24, fontWeight:800, color:C.white, letterSpacing:'-.02em' }}>{trader.name}</h1>
              <Tag>Verified</Tag>
              <Tag>{trader.tag}</Tag>
            </div>
            <div style={{ fontFamily:FF.mono, fontSize:12, color:C.textFaint }}>@{trader.handle}</div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="sub-btn">Subscribe</button>
            <button className="copy-btn" onClick={onCopy}>Copy Trades</button>
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))', gap:12, marginTop:24 }}>
          <StatPill label="Recovery Score" value={trader.score.toFixed(2)} color={C.accent} sub="Total R / Max DD"/>
          <StatPill label="Total R" value={`+${trader.totalR}R`} color={C.accent}/>
          <StatPill label="Max Drawdown" value={`-${trader.drawdown}R`} color={C.red}/>
          <StatPill label="Win Rate" value={`${trader.winrate}%`}/>
          <StatPill label="Trades" value={trader.trades} sub="All-time"/>
          <StatPill label="30D R" value={`${trader.last30d>0?'+':''}${trader.last30d}R`} color={trader.last30d>0?C.accent:C.red}/>
        </div>
      </div>

      {/* Equity Curve */}
      <div className="fade-up-d1" style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:14, padding:28, marginBottom:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20, flexWrap:'wrap', gap:12 }}>
          <div>
            <h2 style={{ fontFamily:FF.display, fontSize:17, fontWeight:700, color:C.white }}>Equity Curve (R)</h2>
            <p style={{ fontSize:12, color:C.textFaint, marginTop:4 }}>Red zones = drawdown periods · Green line = cumulative R</p>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            {['30','90','all'].map(t=>(
              <button key={t} onClick={()=>setTf(t)} style={{ background:tf===t?C.accentBg:'transparent',
                border:`0.5px solid ${tf===t?C.accentLo:C.border}`, color:tf===t?C.accent:C.textMid,
                borderRadius:5, fontSize:11, fontFamily:FF.mono, padding:'5px 10px', cursor:'pointer' }}>
                {t==='all'?'ALL':t+'D'}
              </button>
            ))}
          </div>
        </div>
        <EquityCurve trader={trader} h={200}/>
      </div>

      {/* Performance + Risk Insights */}
      <div className="fade-up-d2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        <div style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:14, padding:28 }}>
          <h2 style={{ fontFamily:FF.display, fontSize:16, fontWeight:700, color:C.white, marginBottom:20 }}>Performance Stats</h2>
          {[
            ['Avg R per trade', `+${(trader.totalR/trader.trades).toFixed(2)}R`],
            ['Best trade', '+4.5R'],
            ['Worst trade', '−1.0R'],
            ['Avg win', '+2.1R'],
            ['Avg loss', '−0.9R'],
            ['Consistency (30D)', `${(trader.last30d/trader.totalR*100).toFixed(1)}% of all-time`],
          ].map(([l,v])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:`0.5px solid ${C.border}`, fontSize:13 }}>
              <span style={{ color:C.textMid }}>{l}</span>
              <Mono color={v.startsWith('+') ? C.accent : v.startsWith('−') ? C.red : C.text}>{v}</Mono>
            </div>
          ))}
        </div>

        <div style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:14, padding:28 }}>
          <h2 style={{ fontFamily:FF.display, fontSize:16, fontWeight:700, color:C.white, marginBottom:8 }}>Risk Insights</h2>
          <p style={{ fontSize:12, color:C.textFaint, marginBottom:20 }}>Auto-generated from trade history</p>
          {[
            { label:'Avg R per trade', value:`+${(trader.totalR/trader.trades).toFixed(2)}R`, insight:'Consistent across timeframes', good:true },
            { label:'Max losing streak', value:'4 trades', insight:'Recovered in avg 9 days', good:true },
            { label:'Recovery time', value:'12 days avg', insight:'After drawdown periods', good:true },
            { label:'R/R consistency', value:'2.1 avg', insight:'Targets respected 94% of time', good:true },
            { label:'Risk per trade', value:'Uniform 1R', insight:'No position-sizing variance', good:true },
          ].map(r=>(
            <div key={r.label} style={{ background:C.surf2, border:`0.5px solid ${C.border}`, borderRadius:8, padding:'10px 14px', marginBottom:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:12, color:C.textMid }}>{r.label}</span>
                <Mono color={C.accent} size={12} bold>{r.value}</Mono>
              </div>
              <div style={{ fontSize:11, color:C.textFaint }}>{r.insight}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trade History */}
      <div className="fade-up-d3" style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:14, overflow:'hidden' }}>
        <div style={{ padding:'20px 24px', borderBottom:`0.5px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontFamily:FF.display, fontSize:16, fontWeight:700, color:C.white }}>Trade History</h2>
          <span style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint }}>READ ONLY — NO EDITS PERMITTED</span>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ borderBottom:`0.5px solid ${C.border}` }}>
                {['DATE','ASSET','ENTRY','STOP LOSS','TAKE PROFIT','RESULT'].map(h=>(
                  <th key={h} style={{ padding:'9px 14px', textAlign:'left', fontFamily:FF.mono, fontSize:10, color:C.textFaint, letterSpacing:'.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SAMPLE_TRADES.map((t,i)=>(
                <tr key={i} className="trade-row" style={{ borderBottom:`0.5px solid ${C.border}` }}>
                  <td style={{ padding:'12px 14px' }}><Mono size={12} color={C.textMid}>{t.date}</Mono></td>
                  <td style={{ padding:'12px 14px' }}><span style={{ fontSize:13, color:C.white, fontWeight:500 }}>{t.asset}</span></td>
                  <td style={{ padding:'12px 14px' }}><Mono size={12}>{t.entry}</Mono></td>
                  <td style={{ padding:'12px 14px' }}><Mono size={12} color={C.red}>{t.sl}</Mono></td>
                  <td style={{ padding:'12px 14px' }}><Mono size={12} color={C.accent}>{t.tp}</Mono></td>
                  <td style={{ padding:'12px 14px' }}>
                    <span style={{ background:t.win?C.accentBg:C.redBg,
                      border:`0.5px solid ${t.win?'rgba(74,222,128,.2)':'rgba(248,113,113,.2)'}`,
                      color:t.win?C.accent:C.red, borderRadius:5, fontFamily:FF.mono,
                      fontSize:12, fontWeight:600, padding:'3px 9px' }}>{t.r}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CopyTradeModal({ trader, onClose }) {
  const [balance, setBalance] = useState(10000);
  const [risk, setRisk] = useState(1);
  const [copied, setCopied] = useState(false);

  const riskAmt = (balance * risk / 100).toFixed(2);
  const posSize = (riskAmt / 20).toFixed(4);

  const signal = { asset:'EUR/USD', dir:'BUY', entry:'1.0832', sl:'1.0812', tp:'1.0872', pos:posSize };

  const handleCopy = () => {
    const txt = `Asset: ${signal.asset}\nDirection: ${signal.dir}\nEntry: ${signal.entry}\nStop Loss: ${signal.sl}\nTake Profit: ${signal.tp}\nPosition Size: ${signal.pos} lots`;
    navigator.clipboard?.writeText(txt);
    setCopied(true);
    setTimeout(()=>setCopied(false), 2000);
  };

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(7,11,9,.85)', backdropFilter:'blur(8px)',
      zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{ background:C.surf, border:`0.5px solid ${C.borderHi}`, borderRadius:16, width:'100%', maxWidth:480,
        animation:'fadeUp .2s ease' }}>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <div style={{ padding:'22px 24px', borderBottom:`0.5px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <h2 style={{ fontFamily:FF.display, fontSize:18, fontWeight:700, color:C.white }}>Copy Trade</h2>
            <div style={{ fontSize:12, color:C.textFaint, marginTop:3 }}>Signal-based · You execute manually</div>
          </div>
          <button onClick={onClose} style={{ background:C.surf2, border:`0.5px solid ${C.border}`, borderRadius:7,
            width:30, height:30, cursor:'pointer', color:C.textMid, fontSize:16, display:'flex',
            alignItems:'center', justifyContent:'center' }}>×</button>
        </div>

        <div style={{ padding:24 }}>
          {/* Inputs */}
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:8 }}>Account Balance ($)</label>
            <input type="number" value={balance} onChange={e=>setBalance(+e.target.value)}
              style={{ width:'100%', background:C.surf2, border:`0.5px solid ${C.borderMid}`, borderRadius:8,
                color:C.text, fontFamily:FF.mono, fontSize:16, fontWeight:600, padding:'11px 14px' }}/>
          </div>
          <div style={{ marginBottom:24 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
              <label style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.06em', textTransform:'uppercase' }}>Risk Per Trade (%)</label>
              <Mono size={13} color={C.accent} bold>{risk}%</Mono>
            </div>
            <input type="range" min=".5" max="5" step=".5" value={risk} onChange={e=>setRisk(+e.target.value)}
              style={{ width:'100%', accentColor:C.accent, cursor:'pointer' }}/>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color:C.textFaint, fontFamily:FF.mono, marginTop:4 }}>
              <span>0.5%</span><span>Conservative ≤1%</span><span>5%</span>
            </div>
          </div>

          {/* Risk summary */}
          <div style={{ background:C.accentBg, border:`0.5px solid rgba(74,222,128,.15)`, borderRadius:8, padding:'12px 16px', marginBottom:24, display:'flex', gap:24 }}>
            <div>
              <div style={{ fontSize:11, color:C.textFaint, fontFamily:FF.mono, marginBottom:4 }}>RISK AMOUNT</div>
              <Mono size={18} color={C.accent} bold>${riskAmt}</Mono>
            </div>
            <div style={{ width:'0.5px', background:C.border }}/>
            <div>
              <div style={{ fontSize:11, color:C.textFaint, fontFamily:FF.mono, marginBottom:4 }}>POSITION SIZE</div>
              <Mono size={18} color={C.white} bold>{posSize} lots</Mono>
            </div>
          </div>

          {/* Signal Block */}
          <div style={{ background:C.surf2, border:`0.5px solid ${C.border}`, borderRadius:10, overflow:'hidden', marginBottom:20 }}>
            <div style={{ padding:'10px 14px', borderBottom:`0.5px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.06em' }}>EXECUTE IN YOUR TERMINAL</span>
              <Tag color={C.accent}>LATEST SIGNAL</Tag>
            </div>
            <div style={{ padding:14 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  ['ASSET', signal.asset, C.white],
                  ['DIRECTION', signal.dir, C.accent],
                  ['ENTRY', signal.entry, C.text],
                  ['STOP LOSS', signal.sl, C.red],
                  ['TAKE PROFIT', signal.tp, C.accent],
                  ['POSITION', `${signal.pos} lots`, C.white],
                ].map(([l,v,c])=>(
                  <div key={l}>
                    <div style={{ fontFamily:FF.mono, fontSize:10, color:C.textFaint, marginBottom:3 }}>{l}</div>
                    <Mono size={14} color={c} bold>{v}</Mono>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={handleCopy} style={{ flex:1, background:copied?C.accentBg:C.accent,
              border:`0.5px solid ${copied?C.accentLo:'transparent'}`,
              color:copied?C.accent:'#070b09', borderRadius:8, fontSize:14, fontWeight:600,
              fontFamily:FF.body, padding:'12px', cursor:'pointer', transition:'all .2s' }}>
              {copied ? '✓ Copied!' : 'Copy All Values'}
            </button>
            <button onClick={onClose} style={{ background:'transparent', border:`0.5px solid ${C.border}`,
              color:C.textMid, borderRadius:8, fontSize:13, fontFamily:FF.body, padding:'12px 16px', cursor:'pointer' }}>
              Close
            </button>
          </div>

          <p style={{ fontSize:11, color:C.textFaint, marginTop:14, textAlign:'center', lineHeight:1.5 }}>
            This is a manual signal. RiskRank does not execute trades on your behalf.
            Always verify sizing in your own broker platform.
          </p>
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'72px 32px' }}>
      <style>{`.plan-card{transition:transform .2s,border-color .2s}.plan-card:hover{transform:translateY(-3px)}`}</style>
      <div className="fade-up" style={{ textAlign:'center', marginBottom:56 }}>
        <div style={{ fontFamily:FF.mono, fontSize:11, color:C.textFaint, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:12 }}>Pricing</div>
        <h1 style={{ fontFamily:FF.display, fontSize:48, fontWeight:800, color:C.white, letterSpacing:'-.03em', marginBottom:16 }}>
          One plan. Full access.
        </h1>
        <p style={{ fontSize:17, color:C.textMid, maxWidth:460, margin:'0 auto' }}>
          No tiers, no feature gates on core metrics. Pay once, copy from the best.
        </p>
      </div>

      <div className="fade-up-d1" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, maxWidth:700, margin:'0 auto 56px' }}>
        {/* Free */}
        <div className="plan-card" style={{ background:C.surf, border:`0.5px solid ${C.border}`, borderRadius:16, padding:32 }}>
          <div style={{ fontFamily:FF.mono, fontSize:12, color:C.textFaint, letterSpacing:'.06em', marginBottom:16 }}>FREE</div>
          <div style={{ fontFamily:FF.display, fontSize:42, fontWeight:800, color:C.white, letterSpacing:'-.03em', marginBottom:4 }}>$0</div>
          <div style={{ fontSize:13, color:C.textFaint, marginBottom:28 }}>Forever</div>
          {[
            ['Top 5 traders visible', true],
            ['Summary stats only', true],
            ['Equity curve preview', true],
            ['Full trade history', false],
            ['Copy trade signals', false],
            ['Risk calculator', false],
            ['All 140+ traders', false],
            ['API access', false],
          ].map(([f,ok])=>(
            <div key={f} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0',
              borderBottom:`0.5px solid ${C.border}`, opacity:ok?1:0.4 }}>
              <span style={{ color:ok?C.accent:C.textFaint, fontSize:13, flexShrink:0 }}>{ok?'✓':'×'}</span>
              <span style={{ fontSize:13, color:ok?C.textMid:C.textFaint }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Pro */}
        <div className="plan-card" style={{ background:C.surf, border:`1.5px solid ${C.accentLo}`,
          borderRadius:16, padding:32, position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${C.accentLo},${C.accent},${C.accentLo})` }}/>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div style={{ fontFamily:FF.mono, fontSize:12, color:C.accent, letterSpacing:'.06em' }}>PRO</div>
            <span style={{ background:C.accentBg, border:`0.5px solid ${C.accentLo}`, color:C.accent,
              fontFamily:FF.mono, fontSize:10, padding:'3px 8px', borderRadius:4 }}>MOST POPULAR</span>
          </div>
          <div style={{ fontFamily:FF.display, fontSize:42, fontWeight:800, color:C.white, letterSpacing:'-.03em', marginBottom:4 }}>$19</div>
          <div style={{ fontSize:13, color:C.textFaint, marginBottom:28 }}>per month · cancel anytime</div>
          {[
            ['All 140+ traders ranked', true],
            ['Full equity curves', true],
            ['Complete trade history', true],
            ['Copy trade signals', true],
            ['Risk calculator', true],
            ['Mobile-ready signals', true],
            ['Priority new traders', true],
            ['API access (coming)', true],
          ].map(([f])=>(
            <div key={f} style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:`0.5px solid ${C.border}` }}>
              <span style={{ color:C.accent, fontSize:13, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:13, color:C.textMid }}>{f}</span>
            </div>
          ))}
          <button style={{ marginTop:24, width:'100%', background:C.accent, border:'none', cursor:'pointer',
            color:'#070b09', fontSize:15, fontWeight:700, fontFamily:FF.display, padding:'14px',
            borderRadius:9, letterSpacing:'-.02em', transition:'all .15s' }}
            onMouseOver={e=>e.target.style.background=C.accentHi}
            onMouseOut={e=>e.target.style.background=C.accent}>
            Start Copying Now
          </button>
        </div>
      </div>

      {/* FAQ */}
      <div className="fade-up-d2" style={{ maxWidth:700, margin:'0 auto' }}>
        <h2 style={{ fontFamily:FF.display, fontSize:24, fontWeight:700, color:C.white, marginBottom:24, textAlign:'center' }}>Common questions</h2>
        {[
          ['Do you execute trades for me?', 'No. RiskRank is signal-based. You receive the full trade parameters and execute manually in your broker (MT4, MT5, Binance, etc). This keeps you in control.'],
          ['How are Recovery Scores verified?', 'Traders submit trade data through our API. Once submitted, records are immutable. No deletions, no edits. The score reflects the complete history.'],
          ['What is the minimum to be ranked?', 'Traders must complete at least 20 verified trades before appearing in the public rankings. This prevents statistical flukes.'],
          ['Can I cancel anytime?', 'Yes. Monthly billing, cancel with one click. No contracts, no cancellation fees.'],
        ].map(([q,a])=>(
          <div key={q} style={{ borderBottom:`0.5px solid ${C.border}`, padding:'20px 0' }}>
            <div style={{ fontSize:15, color:C.white, fontWeight:500, marginBottom:10 }}>{q}</div>
            <div style={{ fontSize:14, color:C.textMid, lineHeight:1.65 }}>{a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('landing');
  const [selectedTrader, setSelectedTrader] = useState(TRADERS[0]);
  const [showCopyModal, setShowCopyModal] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  return (
    <>
      <style>{G}</style>
      <div style={{ minHeight:'100vh', background:C.bg, color:C.text, fontFamily:FF.body }}>
        <NavBar page={page} setPage={p=>{setPage(p);}}/>
        {page==='landing' && <LandingPage setPage={setPage}/>}
        {page==='rankings' && <RankingsPage setPage={setPage} setSelectedTrader={setSelectedTrader}/>}
        {page==='profile' && <TraderProfilePage trader={selectedTrader} setPage={setPage} onCopy={()=>setShowCopyModal(true)}/>}
        {page==='pricing' && <PricingPage/>}
        {showCopyModal && <CopyTradeModal trader={selectedTrader} onClose={()=>setShowCopyModal(false)}/>}
      </div>
    </>
  );
}
