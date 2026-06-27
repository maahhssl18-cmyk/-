import { useState, useMemo } from "react";
import { Analytics } from '@vercel/analytics/react';
 
const TRACKING_ID = "cuttingguide-21";
function amazonLink(url) { return url + (url.includes('?') ? '&' : '?') + `tag=${TRACKING_ID}`; }
 
const T = {
  bg:"#0d0015", bg2:"#130020", bg3:"#1a0030",
  glass:"rgba(255,255,255,0.05)", glassBorder:"rgba(255,255,255,0.1)", glassBorderHover:"rgba(200,85,255,0.4)",
  neon:"#c855ff", neon2:"#ff2d78", neon3:"#7c3aed",
  text:"#f0e6ff", text2:"#a080c0", text3:"#5a3a7a",
  green:"#22c55e", red:"#ef4444", yellow:"#fbbf24",
};
 
const typeIcons = { GPU:"🎮", CPU:"⚡", RAM:"💾", PSU:"🔌", Motherboard:"🔧", SSD:"💿", Cooler:"❄️", Case:"📦" };
 
// ===================== DATA =====================
// القطع فاضية — تتضاف مع الروابط لاحقاً
const allParts = [
  // مثال على الشكل (معطل حالياً):
  // { id:"rtx5090", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5090", specs:"32GB GDDR7 · 575W · 8K", price:7495, tier:10, color:"#76b900", amazonUrl:"https://www.amazon.sa/dp/XXXXXXXX" },
];
 
const sidebarCats = [
  { label:"🎮 GPU كروت الشاشة", type:"GPU", subs:[
    { label:"NVIDIA RTX 50", series:"RTX 50 Series" },
    { label:"NVIDIA RTX 40", series:"RTX 40 Series" },
    { label:"AMD RX 9000", series:"RX 9000 Series" },
    { label:"AMD RX 7000", series:"RX 7000 Series" },
    { label:"Intel Arc B", series:"Arc B Series" },
    { label:"Intel Arc A", series:"Arc A Series" },
  ]},
  { label:"⚡ CPU المعالجات", type:"CPU", subs:[
    { label:"Intel 14th Gen", series:"Intel 14th Gen" },
    { label:"AMD Ryzen 9000", series:"AMD Ryzen 9000" },
  ]},
  { label:"💾 RAM الرامات", type:"RAM", subs:[
    { label:"DDR5", series:"DDR5" },
    { label:"DDR4", series:"DDR4" },
  ]},
  { label:"🔌 PSU مزود الطاقة", type:"PSU", subs:[
    { label:"80+ Gold", series:"80+ Gold" },
    { label:"80+ Platinum", series:"80+ Platinum" },
  ]},
  { label:"🔧 Motherboard اللوحة الأم", type:"Motherboard", subs:[
    { label:"Intel LGA1700", company:"Intel" },
    { label:"AMD AM5", company:"AMD" },
  ]},
  { label:"💿 SSD التخزين", type:"SSD", subs:[
    { label:"NVMe Gen4", series:"NVMe Gen4" },
    { label:"NVMe Gen3", series:"NVMe Gen3" },
  ]},
  { label:"❄️ Cooler التبريد", type:"Cooler", subs:[
    { label:"Air Cooling", series:"Air Cooling" },
    { label:"AIO 240mm", series:"AIO 240mm" },
    { label:"AIO 360mm", series:"AIO 360mm" },
  ]},
  { label:"📦 Case الكيس", type:"Case", subs:[
    { label:"Mid Tower", series:"Mid Tower" },
    { label:"Full Tower", series:"Full Tower" },
  ]},
];
 
// ===================== BOTTLENECK ENGINE =====================
function calcBottleneck(build) {
  const gpu = build.GPU, cpu = build.CPU;
  if (!gpu || !cpu) return null;
  const cpuBN = Math.max(0, (gpu.tier - cpu.tier) * 8);
  const ramBN = Math.max(0, (gpu.tier - (build.RAM?.tier||5)) * 5);
  const overall = Math.max(40, Math.min(100, Math.round(100 - cpuBN*0.5 - ramBN*0.2)));
  const gpuEff = Math.max(50, Math.min(100, Math.round(100 - cpuBN*0.6)));
  const mainBN = cpuBN > 20 ? { part:"CPU", msg:`المعالج يعيق الكرت بنسبة ${Math.min(cpuBN,60)}%` }
    : cpuBN > 10 ? { part:"CPU", msg:`عنق زجاجي خفيف من المعالج ${cpuBN}%` }
    : ramBN > 15 ? { part:"RAM", msg:`الرامات تعيق الأداء ${ramBN}%` }
    : null;
  const scores = {
    GPU: gpuEff,
    CPU: Math.max(60, Math.min(100, Math.round(100 - Math.max(0, cpu.tier - gpu.tier) * 5))),
    RAM: Math.max(65, Math.min(100, Math.round(100 - ramBN * 0.3))),
    Motherboard: 90, SSD: 90,
  };
  // توافق المعالج مع اللوحة
  const mbCompat = !build.Motherboard || !build.CPU ? null :
    (build.CPU.company === "AMD") === (build.Motherboard.socket === "AM5") ? true : false;
  // توافق الرامات مع اللوحة
  const ramCompat = !build.RAM || !build.Motherboard ? null :
    (build.Motherboard.specs?.includes("DDR5")) === (build.RAM.specs?.includes("DDR5")) ? true : false;
  return { overall, gpuEff, mainBN, scores, mbCompat, ramCompat };
}
 
// ===================== AI =====================
async function askAI(name, specs, type) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        model:"claude-sonnet-4-20250514", max_tokens:300,
        messages:[{ role:"user", content:`اشرح هذه القطعة بالعربي في 3 نقاط:\nالقطعة: ${name} (${type})\nالمواصفات: ${specs}\n1. وظيفتها\n2. من يحتاجها\n3. هل تستحق سعرها؟` }]
      })
    });
    const d = await res.json();
    return d.content?.[0]?.text || "حدث خطأ";
  } catch { return "⚠️ تعذر الاتصال بالـ AI"; }
}
 
// ===================== COMPONENTS =====================
function GlassCard({ children, style={}, onClick, glow }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:T.glass, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:`1px solid ${hov&&glow?glow+"66":T.glassBorder}`, borderRadius:16, transition:"all 0.25s", cursor:onClick?"pointer":"default", boxShadow:hov&&glow?`0 0 30px ${glow}22`:"none", ...style }}>
      {children}
    </div>
  );
}
 
function PartImg({ id, type, color, img, height=130 }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ height, background:`linear-gradient(135deg,${color||T.neon}22,${T.bg3})`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", borderRadius:"16px 16px 0 0" }}>
      {img && !err
        ? <img src={img} alt="" onError={()=>setErr(true)} style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }} />
        : <div style={{ fontSize:40, opacity:0.2 }}>{typeIcons[type]||"🔧"}</div>
      }
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, #130020)" }} />
    </div>
  );
}
 
function ScoreBar({ label, value }) {
  const color = value >= 85 ? T.green : value >= 70 ? T.yellow : T.red;
  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.text2, marginBottom:4 }}>
        <span>{label} {value < 75 && "⚠️"}</span>
        <span style={{ color, fontWeight:700 }}>{value}%</span>
      </div>
      <div style={{ background:`${T.neon}08`, borderRadius:4, height:5, overflow:"hidden" }}>
        <div style={{ width:`${value}%`, height:"100%", background:color, borderRadius:4, transition:"width 0.8s" }} />
      </div>
    </div>
  );
}
 
// ===================== PAGES =====================
function PartsPage({ build, setBuild }) {
  const [activeType, setActiveType] = useState(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("tier");
  const [expandedCat, setExpandedCat] = useState("GPU");
  const [selected, setSelected] = useState(null);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
 
  const filtered = useMemo(() => {
    let list = allParts;
    if (activeType) list = list.filter(p => p.type === activeType);
    if (activeSeries) list = list.filter(p => p.series === activeSeries);
    if (activeCompany && !activeSeries) list = list.filter(p => p.company === activeCompany);
    if (search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.company?.toLowerCase().includes(search.toLowerCase()));
    return list.sort((a,b) => sort==="tier" ? b.tier-a.tier : sort==="asc" ? a.price-b.price : b.price-a.price);
  }, [activeType, activeSeries, activeCompany, search, sort]);
 
  const openPart = async (part) => {
    setSelected(part); setAiText(""); setAiLoading(true);
    const t = await askAI(part.name, part.specs, part.type);
    setAiText(t); setAiLoading(false);
  };
 
  return (
    <div style={{ display:"flex", height:"calc(100vh - 54px)", overflow:"hidden" }}>
      {/* Sidebar */}
      <aside style={{ width:200, minWidth:200, background:"rgba(10,0,20,0.95)", backdropFilter:"blur(20px)", borderLeft:`1px solid ${T.glassBorder}`, padding:"10px 6px", overflowY:"auto" }}>
        <div style={{ fontSize:9, color:T.text3, fontWeight:700, letterSpacing:2, padding:"4px 8px 10px" }}>CATEGORIES</div>
        <button onClick={()=>{setActiveType(null);setActiveSeries(null);setActiveCompany(null);}}
          style={{ width:"100%", background:!activeType?`${T.neon}15`:"none", border:`1px solid ${!activeType?T.neon+"44":"transparent"}`, borderRadius:8, padding:"6px 10px", color:!activeType?T.neon:T.text3, cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", marginBottom:4 }}>
          📋 الكل ({allParts.length})
        </button>
        {sidebarCats.map(cat => (
          <div key={cat.type} style={{ marginBottom:2 }}>
            <button onClick={()=>{setExpandedCat(expandedCat===cat.type?null:cat.type);setActiveType(cat.type);setActiveSeries(null);setActiveCompany(null);}}
              style={{ width:"100%", background:activeType===cat.type&&!activeSeries&&!activeCompany?`${T.neon}15`:"none", border:"none", borderRadius:8, padding:"6px 10px", color:activeType===cat.type?T.neon:T.text2, cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", display:"flex", justifyContent:"space-between" }}>
              <span>{cat.label}</span>
              <span style={{ fontSize:9, color:T.text3 }}>{expandedCat===cat.type?"▲":"▼"}</span>
            </button>
            {expandedCat===cat.type && (
              <div style={{ paddingRight:8 }}>
                {cat.subs.map(sub => {
                  const isActive = activeSeries===sub.series && (!sub.company||activeCompany===sub.company);
                  const count = allParts.filter(p=>p.type===cat.type&&(!sub.series||p.series===sub.series)&&(!sub.company||p.company===sub.company)).length;
                  return (
                    <button key={sub.label} onClick={()=>{setActiveType(cat.type);setActiveSeries(sub.series||null);setActiveCompany(sub.company||null);}}
                      style={{ width:"100%", background:isActive?`${T.neon}22`:"none", border:`1px solid ${isActive?T.neon+"44":"transparent"}`, borderRadius:7, padding:"4px 10px", color:isActive?T.neon:T.text3, cursor:"pointer", fontSize:10, textAlign:"right", marginBottom:1, display:"flex", justifyContent:"space-between" }}>
                      <span>{isActive?"▶ ":""}{sub.label}</span>
                      <span style={{ fontSize:9, color:T.text3, background:"rgba(255,255,255,0.05)", borderRadius:4, padding:"0 4px" }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </aside>
 
      {/* Main */}
      <div style={{ flex:1, overflowY:"auto", padding:"14px 16px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ابحث..." style={{ flex:1, background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"8px 14px", color:T.text, fontSize:12, outline:"none" }} />
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"8px 10px", color:T.text2, fontSize:11, cursor:"pointer" }}>
            <option value="tier">الأقوى</option>
            <option value="asc">السعر ↑</option>
            <option value="desc">السعر ↓</option>
          </select>
        </div>
 
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 20px", background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20 }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
            <div style={{ fontWeight:700, fontSize:15, color:T.text, marginBottom:6 }}>قريباً!</div>
            <div style={{ fontSize:12, color:T.text2 }}>جاري إضافة المنتجات مع روابط أمازون</div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))", gap:10 }}>
            {filtered.map(p => (
              <GlassCard key={p.id} onClick={()=>openPart(p)} glow={p.color} style={{ overflow:"hidden", border:`1px solid ${build[p.type]===p.id?"#22c55e55":T.glassBorder}` }}>
                <PartImg id={p.id} type={p.type} color={p.color} img={p.img} height={130} />
                <div style={{ padding:"9px 11px" }}>
                  <div style={{ fontSize:8, color:T.text3, marginBottom:1 }}>{p.series}</div>
                  <div style={{ fontWeight:800, fontSize:12, color:T.text, marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontSize:9, color:T.text3, marginBottom:7, lineHeight:1.4 }}>{p.specs}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <span style={{ fontWeight:900, fontSize:13, color:p.color||T.neon, direction:"ltr", display:"inline-block" }}>{p.price?.toLocaleString()} ر.س</span>
                    <button onClick={e=>{e.stopPropagation();setBuild(prev=>({...prev,[p.type]:p.id}));}} style={{ background:build[p.type]===p.id?"#22c55e22":T.glass, border:`1px solid ${build[p.type]===p.id?"#22c55e":T.glassBorder}`, borderRadius:6, padding:"3px 8px", color:build[p.type]===p.id?"#22c55e":T.text2, cursor:"pointer", fontSize:10, fontWeight:700 }}>
                      {build[p.type]===p.id?"✅":"➕"}
                    </button>
                  </div>
                  <a href={amazonLink(p.amazonUrl)} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()}
                    style={{ display:"block", textAlign:"center", background:"linear-gradient(135deg,#ff9900,#ff6600)", borderRadius:8, padding:"7px", color:"#000", fontWeight:800, fontSize:11, textDecoration:"none" }}>
                    🛒 اشترِ من أمازون
                  </a>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
 
      {/* Modal */}
      {selected && (
        <div onClick={()=>setSelected(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#130020", backdropFilter:"blur(30px)", border:`1px solid ${selected.color||T.neon}55`, borderRadius:24, maxWidth:460, width:"100%", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ position:"relative", borderRadius:"24px 24px 0 0", overflow:"hidden" }}>
              <PartImg id={selected.id} type={selected.type} color={selected.color} img={selected.img} height={200} />
              <button onClick={()=>setSelected(null)} style={{ position:"absolute", top:12, left:12, background:"rgba(0,0,0,0.7)", border:"none", borderRadius:8, padding:"6px 12px", color:"#fff", cursor:"pointer", fontSize:14 }}>✕</button>
              <div style={{ position:"absolute", top:12, right:12 }}>
                <span style={{ background:selected.color||T.neon, borderRadius:6, padding:"2px 8px", fontSize:10, fontWeight:700, color:"#000" }}>{selected.type} · {selected.company}</span>
              </div>
              <div style={{ position:"absolute", bottom:0, right:0, left:0, padding:"14px 16px" }}>
                <div style={{ fontWeight:900, fontSize:20, color:"#fff", textShadow:"0 2px 10px rgba(0,0,0,0.9)" }}>{selected.name}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{selected.series}</div>
              </div>
            </div>
            <div style={{ padding:18 }}>
              <div style={{ background:T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"10px 14px", marginBottom:12, fontSize:11, color:T.text2 }}>{selected.specs}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                <div style={{ background:T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"10px", textAlign:"center" }}>
                  <div style={{ fontSize:9, color:T.text3, marginBottom:3 }}>السعر</div>
                  <div style={{ fontSize:18, fontWeight:900, color:selected.color||T.neon, direction:"ltr" }}>{selected.price?.toLocaleString()} ر.س</div>
                </div>
                <div style={{ background:T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"10px", textAlign:"center" }}>
                  <div style={{ fontSize:9, color:T.text3, marginBottom:3 }}>مستوى القطعة</div>
                  <div style={{ fontSize:18, fontWeight:900, color:selected.color||T.neon }}>{selected.tier}/10</div>
                </div>
              </div>
              <div style={{ background:`${selected.color||T.neon}11`, border:`1px solid ${selected.color||T.neon}33`, borderRadius:14, padding:14, marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                  <span>🤖</span>
                  <span style={{ fontWeight:700, fontSize:12, color:T.text }}>تحليل الذكاء الاصطناعي</span>
                  {aiLoading && <span style={{ fontSize:9, color:selected.color||T.neon }}>جاري...</span>}
                </div>
                {aiLoading
                  ? <div style={{ display:"flex", gap:5 }}>{[0,1,2].map(i=><div key={i} style={{ width:7,height:7,background:selected.color||T.neon,borderRadius:"50%",animation:`bounce 1s ${i*0.2}s infinite` }}/>)}</div>
                  : <div style={{ fontSize:11, color:T.text2, lineHeight:1.9, whiteSpace:"pre-line" }}>{aiText}</div>
                }
              </div>
              <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                <button onClick={()=>{setBuild(prev=>({...prev,[selected.type]:selected.id}));setSelected(null);}} style={{ flex:1, background:`linear-gradient(135deg,${selected.color||T.neon},${selected.color||T.neon}cc)`, border:"none", borderRadius:12, padding:"12px", color:"#000", fontWeight:800, cursor:"pointer", fontSize:13 }}>
                  {build[selected.type]===selected.id?"✅ في تجميعتك":"➕ أضف للتجميعة"}
                </button>
                <button onClick={()=>setSelected(null)} style={{ background:T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:12, padding:"12px 16px", color:T.text3, cursor:"pointer" }}>✕</button>
              </div>
              <a href={amazonLink(selected.amazonUrl)} target="_blank" rel="noopener noreferrer"
                style={{ display:"block", textAlign:"center", background:"linear-gradient(135deg,#ff9900,#ff6600)", borderRadius:12, padding:"12px", color:"#000", fontWeight:800, fontSize:14, textDecoration:"none", boxShadow:"0 4px 20px rgba(255,153,0,0.4)" }}>
                🛒 اشترِ من أمازون السعودية
              </a>
              <div style={{ fontSize:9, color:T.text3, textAlign:"center", marginTop:6 }}>* رابط شراكة Amazon Associates</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
function BuildPage({ build, setBuild, setPage }) {
  const buildList = Object.values(build).map(id=>allParts.find(p=>p.id===id)).filter(Boolean);
  const total = buildList.reduce((s,p)=>s+(p.price||0),0);
  const bn = calcBottleneck({
    GPU: allParts.find(p=>p.id===build.GPU),
    CPU: allParts.find(p=>p.id===build.CPU),
    RAM: allParts.find(p=>p.id===build.RAM),
    Motherboard: allParts.find(p=>p.id===build.Motherboard),
  });
  const types = ["GPU","CPU","RAM","Motherboard","SSD","PSU","Cooler","Case"];
 
  return (
    <div style={{ maxWidth:680, margin:"0 auto", padding:"16px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <h2 style={{ fontSize:18, fontWeight:800, color:T.text }}>🔧 تجميعتي</h2>
        {buildList.length>0 && (
          <button onClick={()=>{const txt=buildList.map(p=>`${p.type}: ${p.name} — ${(p.price||0).toLocaleString()} ر.س`).join("\n")+`\n\nالإجمالي: ${total.toLocaleString()} ر.س`;navigator.clipboard?.writeText(txt);alert("✅ تم نسخ التجميعة!");}}
            style={{ background:`linear-gradient(135deg,${T.neon},${T.neon2})`, border:"none", borderRadius:9, padding:"7px 14px", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:11 }}>📋 نسخ</button>
        )}
      </div>
 
      {/* Build slots */}
      <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:16 }}>
        {types.map(type => {
          const part = build[type] ? allParts.find(p=>p.id===build[type]) : null;
          return (
            <div key={type} style={{ background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${part?part.color+"44":T.glassBorder}`, borderRadius:12, padding:"11px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:10, alignItems:"center", flex:1 }}>
                <span style={{ fontSize:18 }}>{typeIcons[type]}</span>
                <div>
                  <div style={{ fontSize:9, color:part?.color||T.text3, fontWeight:700 }}>{type}</div>
                  {part
                    ? <><div style={{ fontWeight:700, fontSize:13, color:T.text }}>{part.name}</div><div style={{ fontSize:10, color:T.text3 }}>{part.specs}</div></>
                    : <div style={{ fontSize:12, color:T.text3 }}>لم تختر بعد</div>
                  }
                </div>
              </div>
              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                {part && <span style={{ fontWeight:800, fontSize:12, color:part.color||T.neon, direction:"ltr", display:"inline-block" }}>{(part.price||0).toLocaleString()} ر.س</span>}
                <button onClick={()=>setPage("parts")} style={{ background:T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:7, padding:"4px 8px", color:T.text2, cursor:"pointer", fontSize:10 }}>{part?"تغيير":"اختر"}</button>
                {part && <button onClick={()=>setBuild(prev=>{const n={...prev};delete n[type];return n;})} style={{ background:"#ef444415", border:"1px solid #ef444433", borderRadius:7, padding:"4px 8px", color:"#ef4444", cursor:"pointer", fontSize:10 }}>✕</button>}
              </div>
            </div>
          );
        })}
      </div>
 
      {/* توافق القطع */}
      {bn && (build.CPU || build.GPU) && (
        <div style={{ background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:16, padding:"18px 20px", marginBottom:14 }}>
          <div style={{ fontSize:11, color:T.text3, fontWeight:700, letterSpacing:1, marginBottom:14 }}>📊 تحليل الأداء والتوافق</div>
 
          {/* Overall */}
          <div style={{ textAlign:"center", padding:"16px", background:`${T.neon}08`, border:`1px solid ${T.neon}22`, borderRadius:12, marginBottom:14 }}>
            <div style={{ fontSize:11, color:T.text3, marginBottom:6 }}>الأداء العام للتجميعة</div>
            <div style={{ fontSize:52, fontWeight:900, color:bn.overall>=85?T.green:bn.overall>=70?T.yellow:T.red, textShadow:`0 0 30px ${bn.overall>=85?T.green:bn.overall>=70?T.yellow:T.red}44` }}>{bn.overall}%</div>
            <div style={{ fontSize:12, color:T.text2 }}>
              {bn.overall>=90?"تجميعة متوازنة ممتازة 🏆":bn.overall>=75?"تجميعة جيدة ✅":bn.overall>=60?"يوجد عنق زجاجي ⚠️":"عنق زجاجي شديد ❌"}
            </div>
          </div>
 
          {/* العنق الزجاجي */}
          {bn.mainBN && (
            <div style={{ background:"#ef444415", border:"1px solid #ef444433", borderRadius:10, padding:"12px 14px", marginBottom:14, display:"flex", gap:10 }}>
              <span style={{ fontSize:20 }}>⚠️</span>
              <div>
                <div style={{ fontWeight:700, fontSize:13, color:T.red, marginBottom:2 }}>عنق زجاجي — {bn.mainBN.part}</div>
                <div style={{ fontSize:11, color:"#fca5a5" }}>{bn.mainBN.msg}</div>
              </div>
            </div>
          )}
 
          {/* التوافق */}
          {(bn.mbCompat !== null || bn.ramCompat !== null) && (
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:10, color:T.text3, fontWeight:700, marginBottom:8 }}>🔗 التوافق بين القطع</div>
              {bn.mbCompat !== null && (
                <div style={{ background:bn.mbCompat?"#22c55e15":"#ef444415", border:`1px solid ${bn.mbCompat?"#22c55e33":"#ef444433"}`, borderRadius:8, padding:"8px 12px", marginBottom:6, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:T.text }}>المعالج ↔ اللوحة الأم</span>
                  <span style={{ fontSize:14 }}>{bn.mbCompat?"✅":"❌ غير متوافق"}</span>
                </div>
              )}
              {bn.ramCompat !== null && (
                <div style={{ background:bn.ramCompat?"#22c55e15":"#ef444415", border:`1px solid ${bn.ramCompat?"#22c55e33":"#ef444433"}`, borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:11, color:T.text }}>الرامات ↔ اللوحة الأم</span>
                  <span style={{ fontSize:14 }}>{bn.ramCompat?"✅":"❌ غير متوافق"}</span>
                </div>
              )}
            </div>
          )}
 
          {/* كفاءة كل قطعة */}
          <div>
            <div style={{ fontSize:10, color:T.text3, fontWeight:700, marginBottom:8 }}>كفاءة كل قطعة في التجميعة</div>
            {Object.entries(bn.scores).map(([type, score]) => build[type] && <ScoreBar key={type} label={`${typeIcons[type]} ${type}`} value={score} />)}
          </div>
        </div>
      )}
 
      {/* الإجمالي */}
      {buildList.length > 0 && (
        <div style={{ background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:14, padding:"16px 18px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontWeight:700, color:T.text }}>💰 الإجمالي</span>
            <span style={{ fontWeight:900, fontSize:24, color:T.neon, direction:"ltr" }}>{total.toLocaleString()} ر.س</span>
          </div>
          {buildList.map(p => (
            <div key={p.id} style={{ marginBottom:6 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.text2, marginBottom:3 }}>
                <span>{typeIcons[p.type]} {p.type}</span>
                <span style={{ color:p.color||T.neon, direction:"ltr" }}>{Math.round((p.price||0)/total*100)}% · {(p.price||0).toLocaleString()} ر.س</span>
              </div>
              <div style={{ background:`${T.neon}08`, borderRadius:3, height:4 }}>
                <div style={{ width:`${(p.price||0)/total*100}%`, height:"100%", background:p.color||T.neon, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
      )}
 
      {buildList.length === 0 && (
        <div style={{ textAlign:"center", padding:"50px 20px", background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
          <div style={{ fontWeight:700, color:T.text, marginBottom:8 }}>تجميعتك فاضية</div>
          <button onClick={()=>setPage("parts")} style={{ background:`linear-gradient(135deg,${T.neon},${T.neon2})`, border:"none", borderRadius:11, padding:"10px 22px", color:"#fff", fontWeight:700, cursor:"pointer" }}>تصفح القطع</button>
        </div>
      )}
    </div>
  );
}
 
function ComparePage() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [filterType, setFilterType] = useState("GPU");
  const list = allParts.filter(p=>p.type===filterType).sort((x,y)=>y.tier-x.tier);
  const winner = a && b ? (a.tier>b.tier?"a":b.tier>a.tier?"b":"tie") : null;
  const perfDiff = a && b ? Math.abs(a.tier-b.tier)*8 : 0;
 
  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"16px 20px" }}>
      <h2 style={{ fontSize:20, fontWeight:800, color:T.text, marginBottom:6 }}>⚖️ مقارنة القطع</h2>
      <p style={{ fontSize:12, color:T.text3, marginBottom:14 }}>اختر نوع القطعة واضغط على قطعتين للمقارنة</p>
 
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        {["GPU","CPU","RAM","PSU","Motherboard","SSD","Cooler","Case"].map(t=>(
          <button key={t} onClick={()=>{setFilterType(t);setA(null);setB(null);}} style={{ background:filterType===t?`linear-gradient(135deg,${T.neon},${T.neon2})`:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${filterType===t?"transparent":T.glassBorder}`, borderRadius:8, padding:"5px 12px", color:filterType===t?"#fff":T.text2, cursor:"pointer", fontSize:11, fontWeight:filterType===t?700:400 }}>
            {typeIcons[t]} {t}
          </button>
        ))}
      </div>
 
      {a && b && (
        <div style={{ background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20, padding:"20px", marginBottom:16 }}>
          {winner !== "tie" && (
            <div style={{ textAlign:"center", marginBottom:16, padding:"12px", background:`${T.neon}15`, border:`1px solid ${T.neon}33`, borderRadius:12 }}>
              <div style={{ fontSize:12, color:T.text3, marginBottom:4 }}>🏆 الفائز</div>
              <div style={{ fontSize:18, fontWeight:900, color:T.neon }}>{winner==="a"?a.name:b.name}</div>
              <div style={{ fontSize:11, color:T.text2, marginTop:4 }}>أقوى بنسبة ~{perfDiff}%</div>
            </div>
          )}
          {winner==="tie" && <div style={{ textAlign:"center", marginBottom:16, padding:"12px", background:`${T.yellow}15`, border:`1px solid ${T.yellow}33`, borderRadius:12 }}><div style={{ fontSize:16, fontWeight:900, color:T.yellow }}>⚖️ متساويان في الأداء</div></div>}
 
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:14 }}>
            {[a,b].map((p,i)=>(
              <div key={p.id} style={{ background:T.bg2, border:`1.5px solid ${winner===(i===0?"a":"b")?T.neon:T.glassBorder}`, borderRadius:14, overflow:"hidden" }}>
                <PartImg id={p.id} type={p.type} color={p.color} img={p.img} height={130} />
                <div style={{ padding:"10px 12px" }}>
                  <div style={{ fontWeight:800, fontSize:13, color:T.text, marginBottom:2 }}>{p.name}</div>
                  {winner===(i===0?"a":"b") && <div style={{ fontSize:9, background:`${T.neon}22`, border:`1px solid ${T.neon}44`, borderRadius:5, padding:"1px 6px", color:T.neon, display:"inline-block", marginBottom:4 }}>🏆 الأقوى</div>}
                  <div style={{ fontWeight:900, fontSize:15, color:p.color||T.neon, direction:"ltr", display:"inline-block" }}>{(p.price||0).toLocaleString()} ر.س</div>
                </div>
              </div>
            ))}
          </div>
 
          {[["مستوى الأداء",`${a.tier}/10`,`${b.tier}/10`,"high"],["السعر",`${(a.price||0).toLocaleString()} ر.س`,`${(b.price||0).toLocaleString()} ر.س`,"low"],["المواصفات",a.specs,b.specs,null]].map(([l,v1,v2,cmp])=>(
            <div key={l} style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, marginBottom:8, alignItems:"center" }}>
              <div style={{ background:cmp==="high"?(a.tier>=b.tier?`${T.neon}22`:T.glass):cmp==="low"?((a.price||0)<=(b.price||0)?`${T.neon}22`:T.glass):T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:8, padding:"7px 10px", textAlign:"right", fontSize:11, fontWeight:700, color:T.text, direction:"ltr" }}>{v1}</div>
              <div style={{ fontSize:9, color:T.text3, textAlign:"center", fontWeight:700 }}>{l}</div>
              <div style={{ background:cmp==="high"?(b.tier>=a.tier?`${T.neon}22`:T.glass):cmp==="low"?((b.price||0)<=(a.price||0)?`${T.neon}22`:T.glass):T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:8, padding:"7px 10px", textAlign:"left", fontSize:11, fontWeight:700, color:T.text, direction:"ltr" }}>{v2}</div>
            </div>
          ))}
 
          <div style={{ marginTop:12, background:`${T.neon2}11`, border:`1px solid ${T.neon2}33`, borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.neon2, marginBottom:4 }}>💡 الحكم النهائي</div>
            <div style={{ fontSize:11, color:T.text2, lineHeight:1.7 }}>
              {winner==="tie"
                ? "القطعتان متساويتان — اختر الأرخص أو الأوفر في المواصفات."
                : `${winner==="a"?a.name:b.name} أقوى بـ ~${perfDiff}% ${perfDiff>15?"— فرق كبير يستحق التفكير.":"— فرق بسيط، وفّر فلوسك."}`
              }
            </div>
          </div>
          <button onClick={()=>{setA(null);setB(null);}} style={{ width:"100%", marginTop:10, background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"9px", color:T.text2, cursor:"pointer", fontSize:12, fontWeight:700 }}>🔄 مقارنة جديدة</button>
        </div>
      )}
 
      {(!a||!b) && (
        <div style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:12, padding:"10px 14px", marginBottom:12, display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
          {[a,b].map((p,i)=>(
            <div key={i} style={{ background:p?`${p.color||T.neon}22`:`${T.neon}11`, border:`1px solid ${p?p.color+"44":T.neon+"22"}`, borderRadius:8, padding:"5px 12px", fontSize:11, color:p?T.neon:T.text3 }}>
              {p?`✅ ${p.name}`:`اختر القطعة ${i+1}`}
            </div>
          ))}
          {(a||b)&&<button onClick={()=>{setA(null);setB(null);}} style={{ background:"none", border:"none", color:T.text3, cursor:"pointer", fontSize:11 }}>✕ مسح</button>}
        </div>
      )}
 
      {list.length === 0 ? (
        <div style={{ textAlign:"center", padding:"40px", background:T.glass, border:`1px solid ${T.glassBorder}`, borderRadius:16 }}>
          <div style={{ fontSize:40, marginBottom:10 }}>⚖️</div>
          <div style={{ color:T.text2, fontSize:12 }}>قريباً — بعد إضافة المنتجات</div>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:8 }}>
          {list.map(p=>{
            const sel = p.id===a?.id||p.id===b?.id;
            const isFull = a&&b&&!sel;
            return (
              <div key={p.id} onClick={()=>{ if(isFull)return; if(!a){setA(p);}else if(!b&&p.id!==a.id){setB(p);}else if(p.id===a?.id){setA(null);}else{setB(null);}}}
                style={{ background:sel?`${p.color||T.neon}22`:T.glass, backdropFilter:"blur(10px)", border:`1.5px solid ${sel?p.color||T.neon+"66":T.glassBorder}`, borderRadius:14, overflow:"hidden", cursor:isFull?"not-allowed":"pointer", opacity:isFull?0.4:1, transition:"all 0.2s" }}>
                <PartImg id={p.id} type={p.type} color={p.color} img={p.img} height={110} />
                <div style={{ padding:"8px 10px" }}>
                  <div style={{ fontWeight:800, fontSize:11, color:T.text, marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontWeight:900, fontSize:12, color:p.color||T.neon, direction:"ltr", display:"inline-block" }}>{(p.price||0).toLocaleString()} ر.س</div>
                  {sel && <div style={{ fontSize:9, color:T.neon, fontWeight:700, marginTop:2 }}>{p.id===a?.id?"— الأول ✓":"— الثاني ✓"}</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
 
// ===================== APP =====================
export default function App() {
  const [page, setPage] = useState("parts");
  const [build, setBuild] = useState({});
  const buildCount = Object.keys(build).length;
 
  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Tajawal',sans-serif", direction:"rtl", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:${T.neon}44;border-radius:3px;}
        button,a{font-family:'Tajawal',sans-serif;}
        @keyframes bounce{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-6px);opacity:1}}
      `}</style>
 
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, background:`radial-gradient(circle, ${T.neon}08, transparent 70%)`, borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:-200, left:-200, width:500, height:500, background:`radial-gradient(circle, ${T.neon2}08, transparent 70%)`, borderRadius:"50%" }} />
      </div>
 
      <nav style={{ background:"rgba(13,0,21,0.9)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.glassBorder}`, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:54, position:"sticky", top:0, zIndex:100, flexShrink:0 }}>
        <div style={{ fontWeight:900, fontSize:15, color:T.neon, letterSpacing:1, textShadow:`0 0 20px ${T.neon}` }}>🖥️ PC BUILDER SA</div>
        <div style={{ display:"flex", gap:4 }}>
          {[["parts","📋","القطع"],["build","🔧","تجميعتي"],["compare","⚖️","مقارنة"]].map(([p,ic,lb])=>(
            <button key={p} onClick={()=>setPage(p)} style={{ background:page===p?`${T.neon}18`:"none", border:`1px solid ${page===p?T.neon+"44":"transparent"}`, borderRadius:9, padding:"6px 14px", color:page===p?T.neon:T.text3, cursor:"pointer", fontSize:12, fontWeight:page===p?700:400, display:"flex", alignItems:"center", gap:4, position:"relative" }}>
              {ic} {lb}
              {p==="build"&&buildCount>0&&<span style={{ background:T.neon, color:"#000", borderRadius:"50%", width:16, height:16, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>{buildCount}</span>}
            </button>
          ))}
        </div>
      </nav>
 
      <div style={{ flex:1, overflow:page==="parts"?"hidden":"auto", position:"relative", zIndex:1 }}>
        {page==="parts" && <PartsPage build={build} setBuild={setBuild} />}
        {page==="build" && <BuildPage build={build} setBuild={setBuild} setPage={setPage} />}
        {page==="compare" && <ComparePage />}
      </div>
 
      <Analytics />
    </div>
  );
}
