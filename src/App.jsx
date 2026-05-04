import { useState, useEffect, useRef } from "react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fff;font-family:'Inter',sans-serif;color:#111;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:4px}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.fu{animation:fu .45s ease both}
.d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.22s}.d4{animation-delay:.3s}
`;

const C = {
  bg:'#ffffff', alt:'#f6f6f6', border:'#e8e8e8', borderMd:'#d0d0d0',
  text:'#111111', mid:'#555555', faint:'#999999',
  accent:'#2563eb', ahov:'#1d4ed8', abg:'#eff6ff', abd:'#bfdbfe',
  green:'#16a34a', gbg:'#f0fdf4', gbd:'#bbf7d0',
  red:'#dc2626', rbg:'#fef2f2', rbd:'#fecaca',
};
const FF = {d:"'Inter',sans-serif", m:"'JetBrains Mono',monospace"};

const TRADERS = [
  {id:1,name:"Karim A.",handle:"karim_fx",  score:4.83,r:142,dd:29,win:67,t:184,tag:"FX",  subs:312,  ret:"+38%",streak:11},
  {id:2,name:"Sarah M.",handle:"s_quant",   score:4.21,r:98, dd:23,win:71,t:127,tag:"Crypto",subs:241,ret:"+29%",streak:7},
  {id:3,name:"Liu W.",  handle:"liuwei_tr", score:3.97,r:118,dd:29,win:58,t:312,tag:"FX",  subs:198,  ret:"+31%",streak:4},
  {id:4,name:"Dani R.", handle:"danir_idx", score:3.74,r:76, dd:20,win:63,t:89, tag:"Index",subs:156,  ret:"+22%",streak:8},
  {id:5,name:"Ola T.",  handle:"ola_swing", score:3.48,r:104,dd:29,win:55,t:241,tag:"FX",  subs:134,  ret:"+27%",streak:3},
  {id:6,name:"Marc B.", handle:"marcb_vol", score:3.12,r:63, dd:20,win:74,t:68, tag:"Options",subs:98, ret:"+19%",streak:6},
];

const REVIEWS = [
  {name:"Alex P.", role:"Subscriber · 4 months",text:"I was losing money on my own. First month copying Karim I made back 3x what I lost before. The Recovery Score actually tells you who's worth following."},
  {name:"Maria T.", role:"Subscriber · 7 months",text:"The copy flow is simple — you see exactly what to execute. No Telegram chaos, no guessing position size. Finally a platform that treats me like an adult."},
  {name:"James O.", role:"Subscriber · 2 months",text:"The fact that trade history can't be edited is what sold me. Every other platform lets traders cherry-pick their results. Here the record is permanent."},
  {name:"Priya K.", role:"Subscriber · 5 months",text:"Set 1% risk per trade, followed two traders for 90 days. Up 18%. I didn't make a single decision myself. That's the point."},
];

const FAQS = [
  {q:"Do you execute trades automatically?",a:"No — and that's intentional. You receive the full signal (entry, SL, TP, position size) and execute manually in your broker. MT4, MT5, Binance — wherever you trade. You stay in full control."},
  {q:"How do I know the stats are real?",a:"All trades are submitted via API before they close. Once recorded, nothing can be deleted or edited — not even by us. The Recovery Score reflects every trade, including the losses."},
  {q:"What's a Recovery Score?",a:"Total R divided by Max Drawdown. R is a risk-normalised unit — +1R means a trader gained exactly what they risked. Recovery Score tells you how efficiently a trader generates returns relative to their worst losing period."},
  {q:"What if I have no trading experience?",a:"That's who this is built for. You choose a trader, set your risk percentage (we recommend 1%), and follow each signal. The platform tells you exactly how large each position should be for your account size."},
  {q:"Can I cancel anytime?",a:"Yes. Monthly billing. One click to cancel. No contracts, no cancellation fees."},
  {q:"What's the minimum account size?",a:"There's no minimum on our side. Your broker may have their own requirements. Most signals work with accounts from $500 upwards."},
];

const AVC = ['#6366f1','#0ea5e9','#f59e0b','#10b981','#f43f5e','#8b5cf6'];

function Av({id,name,size=34,r=7}){
  const i = name.split(' ').map(n=>n[0]).join('');
  return(
    <div style={{width:size,height:size,borderRadius:r,background:`${AVC[id%6]}15`,
      border:`1px solid ${AVC[id%6]}30`,display:'flex',alignItems:'center',
      justifyContent:'center',fontFamily:FF.m,fontSize:size*.28,fontWeight:600,
      color:AVC[id%6],flexShrink:0}}>{i}</div>
  );
}

function Badge({children,c=C.faint,bg=C.alt,bd=C.border}){
  return <span style={{background:bg,border:`1px solid ${bd}`,color:c,borderRadius:4,
    fontSize:11,fontFamily:FF.m,fontWeight:500,padding:'2px 7px',whiteSpace:'nowrap'}}>{children}</span>;
}

function Btn({children,onClick,v='p',full,sz='md'}){
  const [h,sH]=useState(false);
  const pd = sz==='lg' ? '12px 28px' : sz==='sm' ? '7px 14px' : '9px 20px';
  const fs = sz==='lg' ? 15 : sz==='sm' ? 12 : 13;
  const base = {cursor:'pointer',borderRadius:6,fontWeight:600,fontFamily:FF.d,
    padding:pd,fontSize:fs,transition:'all .12s',display:'inline-flex',
    alignItems:'center',justifyContent:'center',width:full?'100%':'auto',border:'none'};
  if(v==='p') return <button onClick={onClick} onMouseOver={()=>sH(true)} onMouseOut={()=>sH(false)}
    style={{...base,background:h?C.ahov:C.accent,color:'#fff'}}>{children}</button>;
  if(v==='s') return <button onClick={onClick} onMouseOver={()=>sH(true)} onMouseOut={()=>sH(false)}
    style={{...base,background:'transparent',border:`1px solid ${h?C.borderMd:C.border}`,color:h?C.text:C.mid}}>{children}</button>;
  return <button onClick={onClick} onMouseOver={()=>sH(true)} onMouseOut={()=>sH(false)}
    style={{...base,background:h?C.abg:'transparent',border:`1px solid ${C.abd}`,color:C.accent}}>{children}</button>;
}

/* ── NAV ── */
function Nav({tab,go}){
  return(
    <nav style={{position:'sticky',top:0,zIndex:200,background:'rgba(255,255,255,.96)',
      backdropFilter:'blur(10px)',borderBottom:`1px solid ${C.border}`}}>
      <div style={{maxWidth:1060,margin:'0 auto',height:52,display:'flex',
        alignItems:'center',padding:'0 24px'}}>
        <button onClick={()=>go('landing')} style={{background:'none',border:'none',
          cursor:'pointer',fontSize:15,fontWeight:700,color:C.text,fontFamily:FF.d,
          letterSpacing:'-.01em'}}>Rscore</button>
        <div style={{flex:1}}/>
        {[['rankings','Rankings'],['pricing','Pricing']].map(([p,l])=>(
          <button key={p} onClick={()=>go(p)} style={{background:'none',border:'none',
            cursor:'pointer',fontSize:13,fontWeight:500,padding:'5px 12px',borderRadius:5,
            color:tab===p?C.accent:C.mid,background:tab===p?C.abg:'transparent',
            marginRight:2,transition:'all .12s'}}>{l}</button>
        ))}
        <div style={{width:1,height:16,background:C.border,margin:'0 12px'}}/>
        <Btn onClick={()=>go('rankings')} sz="sm">Get Started →</Btn>
      </div>
    </nav>
  );
}

/* ── LIVE TICKER ── */
function Ticker(){
  const items = [
    "Karim A. closed +2.1R on EUR/USD","14 new subscribers in the last hour",
    "Sarah M. win streak: 7 trades","Liu W. Recovery Score: 3.97","Marc B. closed +1.8R on GBP/JPY",
    "Dani R. 63% winrate — 89 trades","Recovery Score updated live after each trade","143 verified traders · 0 unverified",
  ];
  const all = [...items,...items];
  return(
    <div style={{background:'#111',borderBottom:`1px solid #222`,overflow:'hidden',height:34,
      display:'flex',alignItems:'center'}}>
      <div style={{display:'flex',animation:'ticker 40s linear infinite',whiteSpace:'nowrap'}}>
        {all.map((item,i)=>(
          <span key={i} style={{display:'inline-flex',alignItems:'center',gap:8,
            fontFamily:FF.m,fontSize:11,color:'#aaa',padding:'0 28px'}}>
            <span style={{width:5,height:5,borderRadius:'50%',background:'#4ade80',flexShrink:0}}/>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── LANDING ── */
function Landing({go}){
  const [openFaq,setFaq]=useState(null);

  return(
    <div>
      <style>{`
        .tr{cursor:pointer;transition:background .1s}.tr:hover{background:${C.alt}}
        .faq-item{border-bottom:1px solid ${C.border};transition:background .1s}
        .faq-item:hover{background:${C.alt}}
        .tcard{border:1px solid ${C.border};border-radius:10px;background:#fff;
          transition:all .18s;cursor:pointer}
        .tcard:hover{border-color:${C.abd};box-shadow:0 4px 16px rgba(37,99,235,.08)}
        .rcard{border:1px solid ${C.border};border-radius:10px;padding:24px;background:#fff}
        .stat-n{font-size:32px;font-weight:700;color:#111;line-height:1;font-family:'Inter',sans-serif;letter-spacing:-.02em}
        .stat-l{font-size:13px;color:#999;margin-top:4px}
        @media(max-width:720px){.hero-grid{grid-template-columns:1fr!important}.hide-mob{display:none!important}}
      `}</style>

      <Ticker/>

      {/* ── HERO ── */}
      <div style={{maxWidth:1060,margin:'0 auto',padding:'72px 24px 64px'}}>
        <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',
          gap:56,alignItems:'center'}}>
          <div>
            <div className="fu" style={{display:'inline-flex',alignItems:'center',gap:7,
              background:C.gbg,border:`1px solid ${C.gbd}`,borderRadius:20,
              padding:'4px 12px 4px 8px',marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:C.green,
                animation:'pulse 2s infinite'}}/>
              <span style={{fontSize:11,fontWeight:600,color:C.green,fontFamily:FF.m}}>
                3,200+ ACTIVE SUBSCRIBERS
              </span>
            </div>

            <h1 className="fu d1" style={{fontSize:'clamp(34px,4vw,52px)',fontWeight:700,
              lineHeight:1.1,letterSpacing:'-.03em',color:C.text,marginBottom:20}}>
              Copy verified traders.<br/>
              <span style={{color:C.accent}}>Earn without guessing.</span>
            </h1>

            <p className="fu d2" style={{fontSize:16,color:C.mid,lineHeight:1.65,
              maxWidth:420,marginBottom:12}}>
              Choose a trader ranked by risk efficiency — not luck.
              Get their exact signals. Execute in your own broker.
            </p>

            <p className="fu d2" style={{fontSize:14,color:C.faint,lineHeight:1.6,
              maxWidth:400,marginBottom:32}}>
              No trading experience required. No auto-execution. You stay in control.
            </p>

            <div className="fu d3" style={{display:'flex',gap:10,marginBottom:24}}>
              <Btn onClick={()=>go('rankings')} sz="lg">Start Copying Now</Btn>
              <Btn onClick={()=>go('pricing')} v="s" sz="lg">See Pricing</Btn>
            </div>

            <div className="fu d4" style={{display:'flex',gap:24,flexWrap:'wrap'}}>
              {[['143','Verified traders'],['18.7K','Trades tracked'],['$0','Hidden fees']].map(([v,l])=>(
                <div key={l}>
                  <div className="stat-n">{v}</div>
                  <div className="stat-l">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero right — mini leaderboard */}
          <div className="fu d2 hide-mob">
            <div style={{border:`1px solid ${C.border}`,borderRadius:12,overflow:'hidden',
              boxShadow:'0 4px 24px rgba(0,0,0,.07)'}}>
              <div style={{padding:'13px 18px',borderBottom:`1px solid ${C.border}`,
                display:'flex',justifyContent:'space-between',alignItems:'center',
                background:C.alt}}>
                <span style={{fontSize:13,fontWeight:600,color:C.text}}>Top Traders This Month</span>
                <Badge c={C.green} bg={C.gbg} bd={C.gbd}>● Live</Badge>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead>
                  <tr>
                    {['#','Trader','Score','Return','Subs'].map(h=>(
                      <th key={h} style={{padding:'8px 14px',textAlign:'left',fontSize:10,
                        color:C.faint,fontFamily:FF.m,fontWeight:500,letterSpacing:'.05em',
                        borderBottom:`1px solid ${C.border}`,background:C.alt}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRADERS.slice(0,5).map((t,i)=>(
                    <tr key={t.id} className="tr" style={{borderBottom:`1px solid ${C.border}`}}
                      onClick={()=>{go('profile',t)}}>
                      <td style={{padding:'10px 14px',fontFamily:FF.m,fontSize:11,color:C.faint}}>{i+1}</td>
                      <td style={{padding:'10px 14px'}}>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <Av id={t.id} name={t.name} size={26} r={5}/>
                          <div>
                            <div style={{fontSize:12,fontWeight:600,color:C.text}}>{t.name}</div>
                            <div style={{fontSize:10,color:C.faint,fontFamily:FF.m}}>{t.tag}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{padding:'10px 14px'}}>
                        <span style={{fontFamily:FF.m,fontSize:13,fontWeight:700,
                          color:C.accent}}>{t.score}</span>
                      </td>
                      <td style={{padding:'10px 14px'}}>
                        <span style={{fontFamily:FF.m,fontSize:12,fontWeight:600,
                          color:C.green}}>{t.ret}</span>
                      </td>
                      <td style={{padding:'10px 14px'}}>
                        <span style={{fontSize:12,color:C.mid}}>{t.subs}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{padding:'10px 18px',background:C.alt,borderTop:`1px solid ${C.border}`,
                display:'flex',justifyContent:'center'}}>
                <button onClick={()=>go('rankings')} style={{background:'none',border:'none',
                  cursor:'pointer',fontSize:12,color:C.accent,fontWeight:600,fontFamily:FF.d}}>
                  View full rankings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAIN POINTS ── */}
      <div style={{background:C.alt,borderTop:`1px solid ${C.border}`,
        borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1060,margin:'0 auto',padding:'56px 24px'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
              textTransform:'uppercase',marginBottom:10}}>Sound familiar?</div>
            <h2 style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:'-.02em'}}>
              If you're in this category, this is for you.
            </h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {[
              {icon:'📉',head:"Losing money trading",body:"You've tried strategies. They work for a while, then don't. The market feels random because you're missing edge."},
              {icon:'⏱',head:"No time to analyse",body:"Markets move 24/7. You have a job, a life. You can't watch charts all day — but you still want exposure to trading returns."},
              {icon:'🤷',head:"Don't know who to trust",body:"Telegram groups. Paid signals. Gurus. Impossible to verify their actual track record. You've been burned before."},
            ].map(p=>(
              <div key={p.head} style={{background:'#fff',border:`1px solid ${C.border}`,
                borderRadius:9,padding:24}}>
                <div style={{fontSize:24,marginBottom:12}}>{p.icon}</div>
                <div style={{fontSize:15,fontWeight:600,color:C.text,marginBottom:8}}>{p.head}</div>
                <div style={{fontSize:13,color:C.mid,lineHeight:1.65}}>{p.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{maxWidth:1060,margin:'0 auto',padding:'64px 24px'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
            textTransform:'uppercase',marginBottom:10}}>How it works</div>
          <h2 style={{fontSize:30,fontWeight:700,color:C.text,letterSpacing:'-.025em',marginBottom:10}}>
            Three steps. That's it.
          </h2>
          <p style={{fontSize:15,color:C.mid,maxWidth:420,margin:'0 auto'}}>
            No setup complexity. No broker integrations. No API keys.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2,
          border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
          {[
            {n:'01',head:'Browse verified traders',
             body:'Filter by Recovery Score, drawdown, asset class, and win rate. Every stat is computed from immutable trade history — nothing self-reported.',
             detail:'Minimum 20 trades to be listed'},
            {n:'02',head:'Set your risk parameters',
             body:'Enter your account balance and choose how much to risk per trade (we suggest 1%). The platform calculates your exact position size automatically.',
             detail:'Works with any account size'},
            {n:'03',head:'Execute in your own broker',
             body:'When a signal fires, you\'ll see the full details: asset, direction, entry, stop loss, take profit, and position size. One tap to copy. You execute where you trade.',
             detail:'MT4 · MT5 · Binance · any broker'},
          ].map((s,i)=>(
            <div key={s.n} style={{padding:32,borderRight:i<2?`1px solid ${C.border}`:'none',
              background:i===1?C.alt:'#fff'}}>
              <div style={{fontFamily:FF.m,fontSize:12,fontWeight:600,color:C.accent,
                marginBottom:16,letterSpacing:'.04em'}}>{s.n}</div>
              <div style={{fontSize:17,fontWeight:700,color:C.text,marginBottom:12,
                lineHeight:1.3}}>{s.head}</div>
              <div style={{fontSize:13,color:C.mid,lineHeight:1.65,marginBottom:16}}>{s.body}</div>
              <div style={{fontSize:11,color:C.faint,fontFamily:FF.m}}>{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRADERS SECTION ── */}
      <div style={{background:C.alt,borderTop:`1px solid ${C.border}`,
        borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1060,margin:'0 auto',padding:'64px 24px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',
            marginBottom:32,flexWrap:'wrap',gap:12}}>
            <div>
              <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
                textTransform:'uppercase',marginBottom:10}}>Top Traders</div>
              <h2 style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:'-.02em'}}>
                Real performance. Verified history.
              </h2>
            </div>
            <Btn onClick={()=>go('rankings')} v="a">See all rankings →</Btn>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {TRADERS.slice(0,6).map(t=>(
              <div key={t.id} className="tcard" onClick={()=>go('profile',t)}
                style={{padding:22}}>
                <div style={{display:'flex',justifyContent:'space-between',
                  alignItems:'flex-start',marginBottom:16}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <Av id={t.id} name={t.name}/>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:C.text}}>{t.name}</div>
                      <div style={{fontSize:11,color:C.faint,fontFamily:FF.m}}>@{t.handle}</div>
                    </div>
                  </div>
                  <Badge>{t.tag}</Badge>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginBottom:16}}>
                  {[
                    ['Recovery Score',t.score,C.accent],
                    ['Total R',`+${t.r}R`,C.green],
                    ['Max Drawdown',`-${t.dd}R`,C.red],
                    ['Win Rate',`${t.win}%`,C.text],
                  ].map(([l,v,c])=>(
                    <div key={l} style={{background:C.alt,borderRadius:6,padding:'8px 10px'}}>
                      <div style={{fontSize:10,color:C.faint,fontFamily:FF.m,marginBottom:3}}>{l}</div>
                      <div style={{fontFamily:FF.m,fontSize:14,fontWeight:700,color:c}}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{display:'flex',justifyContent:'space-between',
                  alignItems:'center',paddingTop:12,borderTop:`1px solid ${C.border}`}}>
                  <span style={{fontSize:12,color:C.mid}}>{t.subs} subscribers</span>
                  <span style={{fontSize:12,fontWeight:600,color:C.green}}>{t.ret} last 30d</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY RSCORE / TRUST ── */}
      <div style={{maxWidth:1060,margin:'0 auto',padding:'64px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'center'}}>
          <div>
            <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
              textTransform:'uppercase',marginBottom:10}}>Why Rscore</div>
            <h2 style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:'-.02em',marginBottom:16}}>
              We rank by how traders<br/>handle risk — not just profit.
            </h2>
            <p style={{fontSize:14,color:C.mid,lineHeight:1.7,marginBottom:28}}>
              Anyone can have a lucky streak. Recovery Score measures what happens when
              things go wrong — how deep the drawdown was, and how efficiently the trader
              recovered. High score = consistent, disciplined performance.
            </p>
            <div style={{display:'flex',gap:12}}>
              {[
                {label:'Trader A',r:280,dd:142,score:'1.97',note:'High profit, huge DD'},
                {label:'Trader B',r:142,dd:29,score:'4.83',note:'Lower profit, tiny DD',best:true},
              ].map(t=>(
                <div key={t.label} style={{flex:1,background:t.best?C.abg:'#fff',
                  border:`1px solid ${t.best?C.abd:C.border}`,borderRadius:8,padding:'16px'}}>
                  <div style={{fontSize:11,fontFamily:FF.m,fontWeight:600,
                    color:t.best?C.accent:C.faint,marginBottom:12,letterSpacing:'.04em'}}>
                    {t.label}{t.best?' ★ BETTER':''}
                  </div>
                  {[['Total R',`+${t.r}R`],['Max DD',`-${t.dd}R`]].map(([l,v])=>(
                    <div key={l} style={{display:'flex',justifyContent:'space-between',
                      fontSize:12,padding:'5px 0',borderBottom:`1px solid ${t.best?C.abd:C.border}`}}>
                      <span style={{color:C.mid}}>{l}</span>
                      <span style={{fontFamily:FF.m,fontWeight:600,color:C.text}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:'flex',justifyContent:'space-between',
                    alignItems:'center',paddingTop:10}}>
                    <span style={{fontSize:11,color:C.faint}}>{t.note}</span>
                    <span style={{fontFamily:FF.m,fontSize:16,fontWeight:700,
                      color:t.best?C.accent:C.faint}}>{t.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {icon:'🔒',head:'Immutable trade records',body:'Every trade is logged before it closes. No one — including us — can delete or edit entries. What you see is the full truth.'},
              {icon:'📐',head:'Risk-normalised ranking',body:'We don\'t rank by dollars. We rank by R — a universal unit that makes a $500 account comparable to a $500,000 account.'},
              {icon:'⚙️',head:'You control execution',body:'No broker integrations, no API access to your account. You receive signals and execute yourself. Your money never leaves your broker.'},
              {icon:'🚫',head:'No pay-to-win listings',body:'Traders can\'t buy placement. Rankings are purely algorithmic — Recovery Score, trade count, and verified history.'},
            ].map(f=>(
              <div key={f.head} style={{display:'flex',gap:14,padding:'16px 0',
                borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:20,flexShrink:0}}>{f.icon}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:4}}>{f.head}</div>
                  <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SOCIAL PROOF ── */}
      <div style={{background:C.alt,borderTop:`1px solid ${C.border}`,
        borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1060,margin:'0 auto',padding:'64px 24px'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
              textTransform:'uppercase',marginBottom:10}}>What subscribers say</div>
            <h2 style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:'-.02em'}}>
              Results people actually talk about.
            </h2>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12,marginBottom:40}}>
            {REVIEWS.map((r,i)=>(
              <div key={i} className="rcard">
                <div style={{fontSize:13,color:C.mid,lineHeight:1.7,marginBottom:16,
                  fontStyle:'italic'}}>"{r.text}"</div>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={{width:32,height:32,borderRadius:6,background:C.alt,
                    border:`1px solid ${C.border}`,display:'flex',alignItems:'center',
                    justifyContent:'center',fontSize:13,fontWeight:600,color:C.mid}}>
                    {r.name[0]}
                  </div>
                  <div>
                    <div style={{fontSize:13,fontWeight:600,color:C.text}}>{r.name}</div>
                    <div style={{fontSize:11,color:C.faint}}>{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12}}>
            {[
              ['3,200+','Active subscribers'],
              ['143','Verified traders'],
              ['18.7K','Trades in the record'],
              ['4.83','Highest Recovery Score'],
            ].map(([v,l])=>(
              <div key={l} style={{background:'#fff',border:`1px solid ${C.border}`,
                borderRadius:9,padding:'20px 16px',textAlign:'center'}}>
                <div style={{fontSize:28,fontWeight:700,color:C.accent,letterSpacing:'-.02em',
                  fontFamily:FF.d,lineHeight:1,marginBottom:6}}>{v}</div>
                <div style={{fontSize:12,color:C.faint}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <div style={{maxWidth:1060,margin:'0 auto',padding:'64px 24px'}}>
        <div style={{textAlign:'center',marginBottom:40}}>
          <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
            textTransform:'uppercase',marginBottom:10}}>Pricing</div>
          <h2 style={{fontSize:30,fontWeight:700,color:C.text,letterSpacing:'-.025em',marginBottom:10}}>
            One plan. Full access.
          </h2>
          <p style={{fontSize:15,color:C.mid}}>No tiers. No hidden fees. No lock-in.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,maxWidth:620,margin:'0 auto'}}>
          {/* Free */}
          <div style={{border:`1px solid ${C.border}`,borderRadius:10,padding:28}}>
            <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.06em',marginBottom:14}}>FREE</div>
            <div style={{fontSize:40,fontWeight:700,color:C.text,fontFamily:FF.m,marginBottom:4}}>$0</div>
            <div style={{fontSize:12,color:C.faint,marginBottom:20}}>Forever</div>
            {[['Top 5 traders',true],['Score & summary stats',true],['Full trade history',false],
              ['Copy signals',false],['Risk calculator',false]].map(([f,ok])=>(
              <div key={f} style={{display:'flex',alignItems:'center',gap:9,padding:'7px 0',
                borderBottom:`1px solid ${C.border}`,opacity:ok?1:.4}}>
                <span style={{color:ok?C.green:C.faint,fontSize:13}}>{ok?'✓':'×'}</span>
                <span style={{fontSize:13,color:C.mid}}>{f}</span>
              </div>
            ))}
          </div>

          {/* Pro */}
          <div style={{border:`2px solid ${C.accent}`,borderRadius:10,padding:28,
            position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:C.accent}}/>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
              <span style={{fontSize:11,fontFamily:FF.m,color:C.accent,letterSpacing:'.06em'}}>PRO</span>
              <Badge c={C.accent} bg={C.abg} bd={C.abd}>Most popular</Badge>
            </div>
            <div style={{fontSize:40,fontWeight:700,color:C.text,fontFamily:FF.m,marginBottom:4}}>$19</div>
            <div style={{fontSize:12,color:C.faint,marginBottom:20}}>/month · cancel anytime</div>
            {[['All 143 verified traders'],['Full trade history'],['Copy trade signals'],
              ['Risk calculator'],['Filters & sorting'],['Priority support']].map(([f])=>(
              <div key={f} style={{display:'flex',alignItems:'center',gap:9,padding:'7px 0',
                borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.green,fontSize:13}}>✓</span>
                <span style={{fontSize:13,color:C.mid}}>{f}</span>
              </div>
            ))}
            <Btn onClick={()=>go('pricing')} full sz="lg" style={{marginTop:20}}>Start Now</Btn>
            <div style={{textAlign:'center',fontSize:11,color:C.faint,marginTop:10}}>
              Cancel anytime. No contracts.
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{background:C.alt,borderTop:`1px solid ${C.border}`,
        borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:720,margin:'0 auto',padding:'64px 24px'}}>
          <div style={{textAlign:'center',marginBottom:40}}>
            <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.08em',
              textTransform:'uppercase',marginBottom:10}}>FAQ</div>
            <h2 style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:'-.02em'}}>
              Questions we actually get.
            </h2>
          </div>
          <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
            {FAQS.map((f,i)=>(
              <div key={i} className="faq-item" style={{borderBottom:i<FAQS.length-1?`1px solid ${C.border}`:'none'}}>
                <button onClick={()=>setFaq(openFaq===i?null:i)}
                  style={{width:'100%',background:'none',border:'none',cursor:'pointer',
                    padding:'18px 20px',display:'flex',justifyContent:'space-between',
                    alignItems:'center',textAlign:'left',gap:16}}>
                  <span style={{fontSize:14,fontWeight:600,color:C.text}}>{f.q}</span>
                  <span style={{color:C.faint,fontSize:18,flexShrink:0,
                    transition:'transform .2s',
                    transform:openFaq===i?'rotate(45deg)':'rotate(0)'}}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{padding:'0 20px 18px',fontSize:13,color:C.mid,lineHeight:1.7}}>
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div style={{maxWidth:1060,margin:'0 auto',padding:'72px 24px',textAlign:'center'}}>
        <h2 style={{fontSize:36,fontWeight:700,color:C.text,letterSpacing:'-.03em',marginBottom:14}}>
          Stop guessing.<br/>Start copying people who know what they're doing.
        </h2>
        <p style={{fontSize:16,color:C.mid,maxWidth:440,margin:'0 auto 32px'}}>
          3,200 subscribers. 143 verified traders. Full transparency. $19/month.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center'}}>
          <Btn onClick={()=>go('rankings')} sz="lg">View Top Traders</Btn>
          <Btn onClick={()=>go('pricing')} v="s" sz="lg">See Pricing</Btn>
        </div>
        <div style={{marginTop:20,fontSize:12,color:C.faint,fontFamily:FF.m}}>
          No credit card required to browse · Cancel anytime
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{borderTop:`1px solid ${C.border}`}}>
        <div style={{maxWidth:1060,margin:'0 auto',padding:'36px 24px',
          display:'grid',gridTemplateColumns:'2fr 1fr 1fr 1fr',gap:28}}>
          <div>
            <div style={{fontSize:16,fontWeight:700,color:C.text,marginBottom:8}}>Rscore</div>
            <div style={{fontSize:13,color:C.faint,lineHeight:1.65,maxWidth:180}}>
              Risk-adjusted trader rankings. No noise. No illusions.
            </div>
          </div>
          {[
            {title:'Product',ls:['Rankings','How it Works','Pricing','Copy Signals']},
            {title:'Company',ls:['About','Blog','Contact','Careers']},
            {title:'Legal',ls:['Terms','Privacy','Disclaimer','Cookies']},
          ].map(col=>(
            <div key={col.title}>
              <div style={{fontSize:11,fontWeight:600,color:C.text,letterSpacing:'.06em',
                textTransform:'uppercase',marginBottom:14}}>{col.title}</div>
              {col.ls.map(l=>(
                <div key={l} style={{fontSize:13,color:C.faint,marginBottom:9,cursor:'pointer'}}
                  onMouseOver={e=>e.target.style.color=C.accent}
                  onMouseOut={e=>e.target.style.color=C.faint}>{l}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{borderTop:`1px solid ${C.border}`,maxWidth:1060,margin:'0 auto',
          padding:'16px 24px',display:'flex',justifyContent:'space-between',
          fontSize:11,color:C.faint,flexWrap:'wrap',gap:8}}>
          <span>© 2025 Rscore. All rights reserved.</span>
          <span>Past performance does not guarantee future results. Trade responsibly.</span>
        </div>
      </div>
    </div>
  );
}

/* ── RANKINGS ── */
function Rankings({go,setTrader}){
  const [sort,setSort]=useState({k:'score',d:'desc'});
  const sorted=useMemo(()=>[...TRADERS].sort((a,b)=>sort.d==='desc'?b[sort.k]-a[sort.k]:a[sort.k]-b[sort.k]),[sort]);
  const Th=({k,l})=>(
    <th onClick={()=>setSort(s=>({k,d:s.k===k&&s.d==='desc'?'asc':'desc'}))}
      style={{padding:'10px 16px',textAlign:'right',fontSize:10,fontFamily:FF.m,fontWeight:500,
        color:sort.k===k?C.accent:C.faint,letterSpacing:'.05em',cursor:'pointer',userSelect:'none'}}>
      {l}{sort.k===k?(sort.d==='desc'?' ↓':' ↑'):''}
    </th>
  );
  return(
    <div style={{maxWidth:1060,margin:'0 auto',padding:'44px 24px'}}>
      <style>{`.tr2{cursor:pointer;transition:background .1s}.tr2:hover{background:${C.alt}}`}</style>
      <h1 style={{fontSize:28,fontWeight:700,color:C.text,letterSpacing:'-.02em',marginBottom:6}}>
        Trader Rankings
      </h1>
      <p style={{fontSize:14,color:C.mid,marginBottom:28}}>
        Ranked by Recovery Score — Total R ÷ Max Drawdown. Minimum 20 trades to qualify.
      </p>
      <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:C.alt,borderBottom:`1px solid ${C.border}`}}>
              <th style={{padding:'10px 16px',textAlign:'left',fontSize:10,color:C.faint,fontFamily:FF.m}}>#</th>
              <th style={{padding:'10px 16px',textAlign:'left',fontSize:10,color:C.faint,fontFamily:FF.m}}>TRADER</th>
              <Th k="score" l="SCORE"/>
              <Th k="r" l="TOTAL R"/>
              <Th k="dd" l="MAX DD"/>
              <Th k="win" l="WIN%"/>
              <Th k="t" l="TRADES"/>
              <th style={{padding:'10px 16px',textAlign:'right',fontSize:10,color:C.faint,fontFamily:FF.m}}>30D</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((t,i)=>(
              <tr key={t.id} className="tr2" style={{borderBottom:`1px solid ${C.border}`}}
                onClick={()=>{setTrader(t);go('profile',t)}}>
                <td style={{padding:'13px 16px',fontFamily:FF.m,fontSize:11,color:C.faint}}>{i+1}</td>
                <td style={{padding:'13px 16px'}}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <Av id={t.id} name={t.name}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:C.text}}>{t.name}</div>
                      <div style={{fontSize:11,color:C.faint,fontFamily:FF.m}}>@{t.handle}</div>
                    </div>
                    <Badge>{t.tag}</Badge>
                  </div>
                </td>
                <td style={{padding:'13px 16px',textAlign:'right'}}>
                  <span style={{fontFamily:FF.m,fontSize:14,fontWeight:700,
                    color:t.score>=4?C.accent:C.mid}}>{t.score}</span>
                </td>
                <td style={{padding:'13px 16px',textAlign:'right',fontFamily:FF.m,fontSize:13,fontWeight:600,color:C.green}}>+{t.r}R</td>
                <td style={{padding:'13px 16px',textAlign:'right',fontFamily:FF.m,fontSize:13,fontWeight:600,color:C.red}}>-{t.dd}R</td>
                <td style={{padding:'13px 16px',textAlign:'right',fontFamily:FF.m,fontSize:13,color:C.mid}}>{t.win}%</td>
                <td style={{padding:'13px 16px',textAlign:'right',fontFamily:FF.m,fontSize:13,color:C.mid}}>{t.t}</td>
                <td style={{padding:'13px 16px',textAlign:'right',fontFamily:FF.m,fontSize:13,fontWeight:600,
                  color:t.ret.startsWith('+')?C.green:C.red}}>{t.ret}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── PROFILE ── */
function Profile({trader,go,onCopy}){
  if(!trader)return null;
  const TR=[
    {d:'2025-04-28',a:'EUR/USD',e:'1.0832',sl:'1.0812',tp:'1.0872',r:'+2R',w:true},
    {d:'2025-04-25',a:'BTC/USD',e:'68,240',sl:'66,900',tp:'70,900',r:'+2R',w:true},
    {d:'2025-04-22',a:'GBP/JPY',e:'193.40',sl:'192.80',tp:'194.60',r:'+2R',w:true},
    {d:'2025-04-19',a:'EUR/USD',e:'1.0711',sl:'1.0731',tp:'1.0671',r:'-1R', w:false},
    {d:'2025-04-17',a:'GOLD',   e:'2,344', sl:'2,324', tp:'2,384', r:'+2R',w:true},
    {d:'2025-04-14',a:'NAS100', e:'18,234',sl:'18,034',tp:'18,634',r:'+2R',w:true},
  ];
  return(
    <div style={{maxWidth:1060,margin:'0 auto',padding:'40px 24px'}}>
      <style>{`.th2{transition:background .1s}.th2:hover{background:${C.alt}}`}</style>
      <button onClick={()=>go('rankings')} style={{background:'none',border:'none',cursor:'pointer',
        fontSize:13,fontWeight:500,color:C.mid,fontFamily:FF.d,marginBottom:24,
        display:'flex',alignItems:'center',gap:5}}>← Rankings</button>
      <div style={{border:`1px solid ${C.border}`,borderRadius:10,padding:28,marginBottom:14}}>
        <div style={{display:'flex',alignItems:'flex-start',gap:16,flexWrap:'wrap'}}>
          <Av id={trader.id} name={trader.name} size={48} r={10}/>
          <div style={{flex:1,minWidth:160}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
              <h1 style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:'-.02em'}}>{trader.name}</h1>
              <Badge c={C.green} bg={C.gbg} bd={C.gbd}>Verified</Badge>
              <Badge>{trader.tag}</Badge>
            </div>
            <div style={{fontFamily:FF.m,fontSize:11,color:C.faint}}>@{trader.handle}</div>
          </div>
          <div style={{display:'flex',gap:10}}>
            <Btn v="s">Subscribe</Btn>
            <Btn onClick={onCopy}>Copy Trades</Btn>
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))',gap:10,marginTop:20}}>
          {[['Score',trader.score,C.accent,C.abg,C.abd],['Total R',`+${trader.r}R`,C.green,C.gbg,C.gbd],
            ['Max DD',`-${trader.dd}R`,C.red,C.rbg,C.rbd],['Win Rate',`${trader.win}%`,C.text,C.alt,C.border],
            ['Trades',trader.t,C.text,C.alt,C.border],['30D',trader.ret,C.green,C.gbg,C.gbd]
          ].map(([l,v,c,bg,bd])=>(
            <div key={l} style={{background:bg,border:`1px solid ${bd}`,borderRadius:8,padding:'10px 12px'}}>
              <div style={{fontSize:10,color:C.faint,fontFamily:FF.m,letterSpacing:'.06em',
                textTransform:'uppercase',marginBottom:4}}>{l}</div>
              <div style={{fontFamily:FF.m,fontSize:16,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
        <div style={{border:`1px solid ${C.border}`,borderRadius:10,padding:22}}>
          <h2 style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:14}}>Performance</h2>
          {[['Avg R/trade',`+${(trader.r/trader.t).toFixed(2)}R`],['Best trade','+4.5R'],
            ['Worst trade','-1.0R'],['Avg win','+2.1R'],['Avg loss','-0.9R']].map(([l,v])=>(
            <div key={l} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',
              borderBottom:`1px solid ${C.border}`,fontSize:13}}>
              <span style={{color:C.mid}}>{l}</span>
              <span style={{fontFamily:FF.m,fontWeight:600,
                color:v.startsWith('+')?C.green:v.startsWith('-')?C.red:C.text}}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{border:`1px solid ${C.border}`,borderRadius:10,padding:22}}>
          <h2 style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:6}}>Risk Insights</h2>
          <p style={{fontSize:11,color:C.faint,marginBottom:14}}>Auto-generated from trade history</p>
          {[['Max losing streak','4 trades'],['Recovery time','12 days avg'],
            ['R/R ratio','2.1 avg'],['Position sizing','Uniform 1R']].map(([l,v])=>(
            <div key={l} style={{background:C.alt,border:`1px solid ${C.border}`,borderRadius:6,
              padding:'9px 12px',marginBottom:8,display:'flex',justifyContent:'space-between'}}>
              <span style={{fontSize:12,color:C.mid}}>{l}</span>
              <span style={{fontFamily:FF.m,fontSize:12,fontWeight:700,color:C.accent}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{border:`1px solid ${C.border}`,borderRadius:10,overflow:'hidden'}}>
        <div style={{padding:'13px 20px',borderBottom:`1px solid ${C.border}`,background:C.alt,
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <span style={{fontSize:13,fontWeight:600,color:C.text}}>Trade History</span>
          <span style={{fontFamily:FF.m,fontSize:10,color:C.faint}}>READ ONLY · IMMUTABLE</span>
        </div>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead>
            <tr style={{background:C.alt}}>
              {['DATE','ASSET','ENTRY','STOP LOSS','TAKE PROFIT','RESULT'].map(h=>(
                <th key={h} style={{padding:'8px 16px',textAlign:'left',fontSize:10,
                  color:C.faint,fontFamily:FF.m,borderBottom:`1px solid ${C.border}`}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TR.map((t,i)=>(
              <tr key={i} className="th2" style={{borderBottom:`1px solid ${C.border}`}}>
                <td style={{padding:'11px 16px',fontFamily:FF.m,fontSize:12,color:C.faint}}>{t.d}</td>
                <td style={{padding:'11px 16px',fontSize:13,fontWeight:600,color:C.text}}>{t.a}</td>
                <td style={{padding:'11px 16px',fontFamily:FF.m,fontSize:12}}>{t.e}</td>
                <td style={{padding:'11px 16px',fontFamily:FF.m,fontSize:12,color:C.red}}>{t.sl}</td>
                <td style={{padding:'11px 16px',fontFamily:FF.m,fontSize:12,color:C.green}}>{t.tp}</td>
                <td style={{padding:'11px 16px'}}>
                  <span style={{background:t.w?C.gbg:C.rbg,border:`1px solid ${t.w?C.gbd:C.rbd}`,
                    color:t.w?C.green:C.red,borderRadius:4,fontFamily:FF.m,
                    fontSize:12,fontWeight:700,padding:'2px 9px'}}>{t.r}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── PRICING PAGE ── */
function Pricing({go}){
  return(
    <div style={{maxWidth:1060,margin:'0 auto',padding:'64px 24px'}}>
      <div style={{textAlign:'center',marginBottom:52}}>
        <h1 style={{fontSize:40,fontWeight:700,color:C.text,letterSpacing:'-.03em',marginBottom:12}}>
          Simple pricing.
        </h1>
        <p style={{fontSize:16,color:C.mid}}>One plan. Full access. Cancel anytime.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,maxWidth:600,margin:'0 auto 56px'}}>
        <div style={{border:`1px solid ${C.border}`,borderRadius:10,padding:28}}>
          <div style={{fontSize:11,fontFamily:FF.m,color:C.faint,letterSpacing:'.06em',marginBottom:14}}>FREE</div>
          <div style={{fontSize:40,fontWeight:700,color:C.text,fontFamily:FF.m,marginBottom:4}}>$0</div>
          <div style={{fontSize:12,color:C.faint,marginBottom:20}}>Forever</div>
          {[['Top 5 traders',true],['Score overview',true],['Full trade history',false],
            ['Copy signals',false],['Risk calculator',false]].map(([f,ok])=>(
            <div key={f} style={{display:'flex',alignItems:'center',gap:9,padding:'7px 0',
              borderBottom:`1px solid ${C.border}`,opacity:ok?1:.4}}>
              <span style={{color:ok?C.green:C.faint}}>{ok?'✓':'×'}</span>
              <span style={{fontSize:13,color:C.mid}}>{f}</span>
            </div>
          ))}
        </div>
        <div style={{border:`2px solid ${C.accent}`,borderRadius:10,padding:28,position:'relative'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:C.accent,borderRadius:'8px 8px 0 0'}}/>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:14}}>
            <span style={{fontSize:11,fontFamily:FF.m,color:C.accent,letterSpacing:'.06em'}}>PRO</span>
            <Badge c={C.accent} bg={C.abg} bd={C.abd}>Most popular</Badge>
          </div>
          <div style={{fontSize:40,fontWeight:700,color:C.text,fontFamily:FF.m,marginBottom:4}}>$19</div>
          <div style={{fontSize:12,color:C.faint,marginBottom:20}}>/month · cancel anytime</div>
          {[['All 143 verified traders'],['Full trade history'],['Copy signals'],
            ['Risk calculator'],['All filters & sorting'],['Priority support']].map(([f])=>(
            <div key={f} style={{display:'flex',alignItems:'center',gap:9,padding:'7px 0',
              borderBottom:`1px solid ${C.border}`}}>
              <span style={{color:C.green}}>✓</span>
              <span style={{fontSize:13,color:C.mid}}>{f}</span>
            </div>
          ))}
          <Btn full sz="lg" style={{marginTop:18}}>Start Now</Btn>
          <div style={{textAlign:'center',fontSize:11,color:C.faint,marginTop:10}}>Cancel anytime.</div>
        </div>
      </div>
      <div style={{maxWidth:600,margin:'0 auto'}}>
        <h2 style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:20,textAlign:'center'}}>
          Common questions
        </h2>
        {FAQS.slice(0,4).map((f,i)=>(
          <div key={i} style={{borderBottom:`1px solid ${C.border}`,padding:'16px 0'}}>
            <div style={{fontSize:14,fontWeight:600,color:C.text,marginBottom:7}}>{f.q}</div>
            <div style={{fontSize:13,color:C.mid,lineHeight:1.65}}>{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── COPY MODAL ── */
function CopyModal({trader,onClose}){
  const [bal,setBal]=useState(10000);
  const [risk,setRisk]=useState(1);
  const [cp,setCp]=useState(false);
  const ra=(bal*risk/100).toFixed(0);
  const ps=(ra/20).toFixed(3);
  const doCopy=()=>{
    navigator.clipboard?.writeText(`EUR/USD BUY\nEntry: 1.0832 | SL: 1.0812 | TP: 1.0872\nPosition size: ${ps} lots`);
    setCp(true);setTimeout(()=>setCp(false),2000);
  };
  return(
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.3)',backdropFilter:'blur(4px)',
      zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:20}}
      onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:'#fff',border:`1px solid ${C.border}`,borderRadius:12,
        width:'100%',maxWidth:420,boxShadow:'0 20px 48px rgba(0,0,0,.15)'}}>
        <div style={{padding:'18px 22px',borderBottom:`1px solid ${C.border}`,
          display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:C.text}}>Copy Trade</div>
            <div style={{fontSize:12,color:C.faint,marginTop:2}}>Signal-based · You execute manually</div>
          </div>
          <button onClick={onClose} style={{width:28,height:28,border:`1px solid ${C.border}`,
            borderRadius:6,background:C.alt,cursor:'pointer',color:C.mid,fontSize:16,
            display:'flex',alignItems:'center',justifyContent:'center'}}>×</button>
        </div>
        <div style={{padding:22}}>
          <div style={{marginBottom:16}}>
            <label style={{display:'block',fontSize:11,fontFamily:FF.m,color:C.faint,
              textTransform:'uppercase',letterSpacing:'.06em',marginBottom:6}}>Account Balance ($)</label>
            <input type="number" value={bal} onChange={e=>setBal(+e.target.value)}
              style={{width:'100%',border:`1px solid ${C.borderMd}`,borderRadius:7,
                background:C.alt,color:C.text,fontFamily:FF.m,fontSize:15,
                fontWeight:700,padding:'10px 13px',outline:'none'}}/>
          </div>
          <div style={{marginBottom:20}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
              <label style={{fontSize:11,fontFamily:FF.m,color:C.faint,
                textTransform:'uppercase',letterSpacing:'.06em'}}>Risk Per Trade</label>
              <span style={{fontFamily:FF.m,fontSize:13,fontWeight:700,color:C.accent}}>{risk}%</span>
            </div>
            <input type="range" min=".5" max="5" step=".5" value={risk}
              onChange={e=>setRisk(+e.target.value)}
              style={{width:'100%',accentColor:C.accent,cursor:'pointer'}}/>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:4}}>
              <span style={{fontSize:10,color:C.faint,fontFamily:FF.m}}>Conservative ≤1%</span>
              <span style={{fontSize:10,color:C.faint,fontFamily:FF.m}}>Max 5%</span>
            </div>
          </div>
          <div style={{background:C.abg,border:`1px solid ${C.abd}`,borderRadius:8,
            padding:'13px 16px',display:'flex',gap:24,marginBottom:18}}>
            <div>
              <div style={{fontSize:10,fontFamily:FF.m,color:C.faint,marginBottom:3}}>YOU RISK</div>
              <div style={{fontFamily:FF.m,fontSize:20,fontWeight:700,color:C.accent}}>${ra}</div>
            </div>
            <div style={{width:1,background:C.abd}}/>
            <div>
              <div style={{fontSize:10,fontFamily:FF.m,color:C.faint,marginBottom:3}}>POSITION SIZE</div>
              <div style={{fontFamily:FF.m,fontSize:20,fontWeight:700,color:C.text}}>{ps} lots</div>
            </div>
          </div>
          <div style={{background:C.alt,border:`1px solid ${C.border}`,borderRadius:8,
            overflow:'hidden',marginBottom:16}}>
            <div style={{padding:'8px 14px',borderBottom:`1px solid ${C.border}`,
              display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontSize:10,fontFamily:FF.m,color:C.faint}}>LATEST SIGNAL</span>
              <Badge c={C.green} bg={C.gbg} bd={C.gbd}>EUR/USD · BUY</Badge>
            </div>
            <div style={{padding:14,display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[['ENTRY','1.0832',C.text],['STOP LOSS','1.0812',C.red],
                ['TAKE PROFIT','1.0872',C.green],['POSITION',`${ps} lots`,C.accent]].map(([l,v,c])=>(
                <div key={l}>
                  <div style={{fontSize:9,color:C.faint,fontFamily:FF.m,marginBottom:3,letterSpacing:'.05em'}}>{l}</div>
                  <div style={{fontFamily:FF.m,fontSize:14,fontWeight:700,color:c}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{display:'flex',gap:9}}>
            <button onClick={doCopy} style={{flex:1,background:cp?C.green:C.accent,color:'#fff',
              border:'none',borderRadius:7,fontSize:13,fontWeight:600,fontFamily:FF.d,
              padding:'11px',cursor:'pointer',transition:'all .2s'}}>{cp?'✓ Copied!':'Copy All Values'}</button>
            <button onClick={onClose} style={{background:C.alt,border:`1px solid ${C.border}`,
              color:C.mid,borderRadius:7,fontSize:13,fontFamily:FF.d,padding:'11px 16px',
              cursor:'pointer'}}>Close</button>
          </div>
          <p style={{fontSize:11,color:C.faint,marginTop:12,textAlign:'center',lineHeight:1.5}}>
            Rscore does not execute trades. Always verify in your broker.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── APP ── */
export default function App(){
  const [tab,setTab]=useState('landing');
  const [trader,setTrader]=useState(TRADERS[0]);
  const [modal,setModal]=useState(false);

  const go=(page,t)=>{
    if(t) setTrader(t);
    setTab(page);
    window.scrollTo(0,0);
  };

  return(
    <>
      <style>{G}</style>
      <div style={{minHeight:'100vh',background:'#fff',fontFamily:FF.d}}>
        <Nav tab={tab} go={go}/>
        {tab==='landing'  && <Landing go={go}/>}
        {tab==='rankings' && <Rankings go={go} setTrader={setTrader}/>}
        {tab==='profile'  && <Profile trader={trader} go={go} onCopy={()=>setModal(true)}/>}
        {tab==='pricing'  && <Pricing go={go}/>}
        {modal && <CopyModal trader={trader} onClose={()=>setModal(false)}/>}
      </div>
    </>
  );
}
