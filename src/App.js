import { useState, useMemo } from "react";
 
// ===================== DESIGN TOKENS =====================
const C = {
  bg: "#050810",
  bg2: "#080d1a",
  bg3: "#0d1525",
  card: "rgba(10,16,35,0.95)",
  border: "rgba(99,179,255,0.1)",
  borderHover: "rgba(99,179,255,0.35)",
  accent: "#3b82f6",
  accent2: "#8b5cf6",
  cyan: "#06b6d4",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#f59e0b",
  text: "#f0f4ff",
  text2: "#7ea8d4",
  text3: "#3d5a80",
  glow: "0 0 20px rgba(59,130,246,0.3)",
  glowPurple: "0 0 20px rgba(139,92,246,0.3)",
};
 
const typeColors = { GPU: "#8b5cf6", CPU: "#3b82f6", RAM: "#06b6d4", PSU: "#22c55e", Motherboard: "#f59e0b", SSD: "#f97316", Cooler: "#ec4899", Case: "#64748b" };
const typeIcons = { GPU: "🎮", CPU: "⚡", RAM: "💾", PSU: "🔌", Motherboard: "🔧", SSD: "💿", Cooler: "❄️", Case: "📦" };
 
// ===================== DATA =====================
const partsData = [
  // GPUs
  { id:"rtx5060", type:"GPU", brand:"NVIDIA", name:"RTX 5060", specs:"8GB GDDR7 · DLSS 4", priceSAR:1125, watt:115, tier:1, score:72, tag:"Entry" },
  { id:"rtx5060ti16", type:"GPU", brand:"NVIDIA", name:"RTX 5060 Ti 16GB", specs:"16GB GDDR7 · DLSS 4", priceSAR:1612, watt:160, tier:2, score:82, tag:"Best Value" },
  { id:"rtx5070", type:"GPU", brand:"NVIDIA", name:"RTX 5070", specs:"12GB GDDR7 · 1440p/4K", priceSAR:2060, watt:200, tier:3, score:90, tag:"⭐ Top Pick" },
  { id:"rtx5070ti", type:"GPU", brand:"NVIDIA", name:"RTX 5070 Ti", specs:"16GB GDDR7 · 4K", priceSAR:2810, watt:250, tier:3, score:94, tag:"Pro" },
  { id:"rtx5080", type:"GPU", brand:"NVIDIA", name:"RTX 5080", specs:"16GB GDDR7 · 4K Ultra", priceSAR:3745, watt:320, tier:4, score:97, tag:"Elite" },
  { id:"rtx5090", type:"GPU", brand:"NVIDIA", name:"RTX 5090", specs:"32GB GDDR7 · 8K", priceSAR:7495, watt:450, tier:5, score:99, tag:"Flagship" },
  { id:"rx7700xt", type:"GPU", brand:"AMD", name:"RX 7700 XT", specs:"12GB GDDR6 · 1440p", priceSAR:1350, watt:180, tier:2, score:80, tag:"AMD Value" },
  { id:"rx7900xtx", type:"GPU", brand:"AMD", name:"RX 7900 XTX", specs:"24GB GDDR6 · 4K", priceSAR:3200, watt:355, tier:4, score:95, tag:"AMD Flagship" },
  // CPUs
  { id:"i5_14600k", type:"CPU", brand:"Intel", name:"Core i5-14600K", specs:"14 نواة · 5.3GHz · LGA1700", priceSAR:900, watt:125, tier:2, score:80, tag:"Best Value" },
  { id:"i7_14700k", type:"CPU", brand:"Intel", name:"Core i7-14700K", specs:"20 نواة · 5.6GHz · LGA1700", priceSAR:1400, watt:125, tier:3, score:88, tag:"Pro" },
  { id:"i9_14900k", type:"CPU", brand:"Intel", name:"Core i9-14900K", specs:"24 نواة · 6.0GHz · LGA1700", priceSAR:2100, watt:125, tier:4, score:95, tag:"Elite" },
  { id:"r5_9600x", type:"CPU", brand:"AMD", name:"Ryzen 5 9600X", specs:"6 نواة · 5.4GHz · AM5", priceSAR:1050, watt:65, tier:2, score:78, tag:"Efficient" },
  { id:"r7_9800x3d", type:"CPU", brand:"AMD", name:"Ryzen 7 9800X3D", specs:"8 نواة · 5.7GHz · 3D Cache · AM5", priceSAR:1575, watt:120, tier:3, score:99, tag:"⭐ Gaming King" },
  { id:"r9_9950x", type:"CPU", brand:"AMD", name:"Ryzen 9 9950X", specs:"16 نواة · 5.7GHz · AM5", priceSAR:2440, watt:170, tier:4, score:96, tag:"Workstation" },
  // RAM
  { id:"ram_16_ddr5", type:"RAM", brand:"Kingston", name:"FURY Beast 16GB DDR5", specs:"16GB · DDR5-5600", priceSAR:280, watt:5, tier:1, score:70, tag:"Entry" },
  { id:"ram_32_ddr5", type:"RAM", brand:"Corsair", name:"Vengeance 32GB DDR5", specs:"32GB · DDR5-6000", priceSAR:420, watt:5, tier:2, score:85, tag:"⭐ Best Pick" },
  { id:"ram_32_rgb", type:"RAM", brand:"G.Skill", name:"Trident Z5 32GB RGB", specs:"32GB · DDR5-6000 · RGB", priceSAR:490, watt:5, tier:2, score:87, tag:"RGB" },
  { id:"ram_64", type:"RAM", brand:"Corsair", name:"Vengeance 64GB DDR5", specs:"64GB · DDR5-6000", priceSAR:850, watt:8, tier:3, score:90, tag:"Pro" },
  // PSU
  { id:"psu_650", type:"PSU", brand:"Cooler Master", name:"MWE Gold 650W", specs:"650W · 80+ Gold", priceSAR:280, watt:0, tier:1, score:72, tag:"Entry" },
  { id:"psu_750", type:"PSU", brand:"Corsair", name:"RM750e 750W", specs:"750W · 80+ Gold · Full Modular", priceSAR:380, watt:0, tier:2, score:85, tag:"⭐ Recommended" },
  { id:"psu_850", type:"PSU", brand:"Seasonic", name:"Focus GX 850W", specs:"850W · 80+ Gold · 10yr Warranty", priceSAR:530, watt:0, tier:3, score:93, tag:"Premium" },
  { id:"psu_1000", type:"PSU", brand:"be quiet!", name:"Pure Power 13 1000W", specs:"1000W · 80+ Gold · ATX 3.1", priceSAR:650, watt:0, tier:4, score:90, tag:"High-End" },
  // Motherboards
  { id:"mb_b760", type:"Motherboard", brand:"MSI", name:"PRO B760M-P DDR5", specs:"B760 · LGA1700 · DDR5 · mATX", priceSAR:659, watt:30, tier:1, score:72, tag:"Entry" },
  { id:"mb_z790", type:"Motherboard", brand:"ASUS", name:"TUF Gaming Z790-Plus", specs:"Z790 · LGA1700 · DDR5 · WiFi", priceSAR:1629, watt:30, tier:3, score:88, tag:"Gaming" },
  { id:"mb_b850", type:"Motherboard", brand:"Gigabyte", name:"B850 Aorus Elite WiFi7", specs:"B850 · AM5 · DDR5 · WiFi7", priceSAR:935, watt:30, tier:2, score:85, tag:"⭐ AMD Best" },
  { id:"mb_x870", type:"Motherboard", brand:"ASUS", name:"PRIME X870-P WiFi", specs:"X870 · AM5 · DDR5 · WiFi 6E", priceSAR:1499, watt:30, tier:3, score:88, tag:"X870" },
  // SSD
  { id:"ssd_1tb_gen4", type:"SSD", brand:"Samsung", name:"980 PRO 1TB NVMe Gen4", specs:"1TB · PCIe 4.0 · 7000MB/s", priceSAR:350, watt:6, tier:2, score:88, tag:"⭐ Best Pick" },
  { id:"ssd_2tb", type:"SSD", brand:"WD", name:"Black SN850X 2TB", specs:"2TB · PCIe 4.0 · 7300MB/s", priceSAR:600, watt:6, tier:3, score:92, tag:"Pro" },
  { id:"ssd_1tb_budget", type:"SSD", brand:"Kingston", name:"NV2 1TB NVMe", specs:"1TB · PCIe 3.0 · 3500MB/s", priceSAR:200, watt:5, tier:1, score:72, tag:"Budget" },
  // Coolers
  { id:"cool_air", type:"Cooler", brand:"Noctua", name:"NH-D15 Dual Tower", specs:"Air · Dual Tower · LGA1700/AM5", priceSAR:380, watt:0, tier:3, score:90, tag:"Best Air" },
  { id:"cool_240", type:"Cooler", brand:"DeepCool", name:"LT240 AIO 240mm", specs:"AIO · 240mm · ARGB", priceSAR:300, watt:0, tier:2, score:82, tag:"AIO" },
  { id:"cool_360", type:"Cooler", brand:"Corsair", name:"iCUE H150i 360mm", specs:"AIO · 360mm · RGB · Premium", priceSAR:580, watt:0, tier:3, score:93, tag:"⭐ Premium" },
  // Cases
  { id:"case_mid", type:"Case", brand:"NZXT", name:"H7 Flow Mid Tower", specs:"Mid Tower · ATX · Airflow", priceSAR:400, watt:0, tier:2, score:85, tag:"Airflow" },
  { id:"case_lianli", type:"Case", brand:"Lian Li", name:"O11 Dynamic Mid Tower", specs:"Mid Tower · ATX · Dual Chamber", priceSAR:600, watt:0, tier:3, score:92, tag:"⭐ Premium" },
  { id:"case_budget", type:"Case", brand:"Corsair", name:"4000D Airflow", specs:"Mid Tower · ATX · 3 Fans", priceSAR:350, watt:0, tier:2, score:82, tag:"Value" },
];
 
const buildPresets = {
  gaming: { label:"🎮 ألعاب", gpu:"rtx5070", cpu:"r7_9800x3d", ram:"ram_32_ddr5", mb:"mb_b850", ssd:"ssd_1tb_gen4", psu:"psu_750", cooler:"cool_240", case:"case_mid" },
  pro_gaming: { label:"🏆 ألعاب احترافية", gpu:"rtx5080", cpu:"r7_9800x3d", ram:"ram_32_rgb", mb:"mb_b850", ssd:"ssd_2tb", psu:"psu_850", cooler:"cool_360", case:"case_lianli" },
  design: { label:"🎨 تصميم ومونتاج", gpu:"rtx5070ti", cpu:"r9_9950x", ram:"ram_64", mb:"mb_x870", ssd:"ssd_2tb", psu:"psu_850", cooler:"cool_360", case:"case_lianli" },
  study: { label:"📚 دراسة وعمل", gpu:"rtx5060ti16", cpu:"r5_9600x", ram:"ram_16_ddr5", mb:"mb_b850", ssd:"ssd_1tb_budget", psu:"psu_650", cooler:"cool_240", case:"case_budget" },
  budget: { label:"💰 اقتصادي", gpu:"rtx5060", cpu:"i5_14600k", ram:"ram_16_ddr5", mb:"mb_b760", ssd:"ssd_1tb_budget", psu:"psu_650", cooler:"cool_240", case:"case_budget" },
};
 
function getPart(id) { return partsData.find(p => p.id === id); }
function calcWatt(build) { return Object.values(build).reduce((s, id) => s + (getPart(id)?.watt || 0), 0) + 80; }
function calcPrice(build) { return Object.values(build).reduce((s, id) => s + (getPart(id)?.priceSAR || 0), 0); }
function recommendPSU(watt) { if (watt <= 450) return "650W Gold"; if (watt <= 600) return "750W Gold"; if (watt <= 800) return "1000W Gold"; return "1200W Platinum"; }
 
// ===================== COMPONENTS =====================
function GlowCard({ children, color = C.accent, style = {}, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.card, border: `1px solid ${hov ? color + "66" : C.border}`, borderRadius: 16, padding: 16, cursor: onClick ? "pointer" : "default", transition: "all 0.25s", boxShadow: hov ? `0 0 24px ${color}22, inset 0 0 24px ${color}05` : "none", ...style }}>
      {children}
    </div>
  );
}
 
function ScoreRing({ score, color, size = 48 }) {
  const r = (size / 2) - 5;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.bg3} strokeWidth={4} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={4} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: "stroke-dasharray 0.8s ease" }} />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={size/4} fontWeight="bold" style={{ transform: "rotate(90deg)", transformOrigin: `${size/2}px ${size/2}px` }}>{score}</text>
    </svg>
  );
}
 
function PartCard({ part, inBuild, onAdd, onCompare, isCompared }) {
  const [hov, setHov] = useState(false);
  const color = typeColors[part.type];
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: C.card, border: `1px solid ${isCompared ? color : hov ? color + "55" : C.border}`, borderRadius: 16, padding: 14, transition: "all 0.25s", boxShadow: hov ? `0 0 20px ${color}15` : "none" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 18 }}>{typeIcons[part.type]}</span>
            <span style={{ fontSize: 10, background: color + "22", border: `1px solid ${color}44`, borderRadius: 6, padding: "1px 7px", color }}>{part.tag}</span>
            <span style={{ fontSize: 10, color: C.text3 }}>{part.brand}</span>
          </div>
          <div style={{ fontWeight: 800, fontSize: 14, color: C.text, marginBottom: 2 }}>{part.name}</div>
          <div style={{ fontSize: 11, color: C.text2 }}>{part.specs}</div>
          {part.watt > 0 && <div style={{ fontSize: 10, color: C.text3, marginTop: 3 }}>⚡ {part.watt}W</div>}
        </div>
        <div style={{ textAlign: "right" }}>
          <ScoreRing score={part.score} color={color} size={44} />
          <div style={{ fontWeight: 900, fontSize: 15, color, marginTop: 4 }}>{part.priceSAR.toLocaleString()}</div>
          <div style={{ fontSize: 9, color: C.text3 }}>ريال</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <button onClick={() => onAdd(part)} style={{ flex: 1, background: inBuild ? "#22c55e22" : C.bg3, border: `1px solid ${inBuild ? "#22c55e" : C.border}`, borderRadius: 8, padding: "7px", color: inBuild ? "#22c55e" : C.text2, cursor: "pointer", fontSize: 11, fontWeight: 700, transition: "all 0.2s" }}>
          {inBuild ? "✅ في التجميعة" : "➕ أضف"}
        </button>
        <button onClick={() => onCompare(part)} style={{ background: isCompared ? color + "22" : C.bg3, border: `1px solid ${isCompared ? color : C.border}`, borderRadius: 8, padding: "7px 10px", color: isCompared ? color : C.text3, cursor: "pointer", fontSize: 11, transition: "all 0.2s" }}>⚖️</button>
      </div>
    </div>
  );
}
 
// ===================== PAGES =====================
function HomePage({ setPage }) {
  const navItems = [
    { id:"build", icon:"🔧", label:"بناء PC", desc:"اختر قطعك خطوة بخطوة", color: C.accent },
    { id:"parts", icon:"📋", label:"قطع الكمبيوتر", desc:"تصفح كل القطع مع الشرح", color: C.accent2 },
    { id:"compat", icon:"🔗", label:"فحص التوافق", desc:"تأكد أن قطعك تشتغل مع بعض", color: C.cyan },
    { id:"power", icon:"⚡", label:"حساب الطاقة", desc:"احسب الواط المطلوب لتجميعتك", color: C.yellow },
    { id:"compare", icon:"⚖️", label:"مقارنة القطع", desc:"قارن بين قطعتين", color: C.green },
    { id:"smart", icon:"🤖", label:"اقتراح ذكي", desc:"اقتراح تجميعة حسب ميزانيتك", color: "#ec4899" },
  ];
  return (
    <div>
      {/* Hero */}
      <div style={{ textAlign: "center", padding: "48px 0 36px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${C.accent}15 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.accent + "15", border: `1px solid ${C.accent}33`, borderRadius: 100, padding: "5px 14px", marginBottom: 16 }}>
          <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: 2 }}>PC BUILDER SA · RTX 50 · RYZEN 9000</span>
        </div>
        <h1 style={{ fontSize: "clamp(28px,7vw,52px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 12 }}>
          <span style={{ color: C.text }}>ابنِ جهازك </span>
          <span style={{ background: `linear-gradient(135deg,${C.accent},${C.accent2},${C.cyan})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>المثالي</span>
        </h1>
        <p style={{ color: C.text2, fontSize: 14, maxWidth: 400, margin: "0 auto 28px" }}>دليلك الكامل لتجميع PC بكل احترافية — قطعة قطعة</p>
        <button onClick={() => setPage("build")} style={{ background: `linear-gradient(135deg,${C.accent},${C.accent2})`, border: "none", borderRadius: 14, padding: "13px 32px", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 0 30px ${C.accent}44` }}>
          🚀 ابدأ التجميع
        </button>
      </div>
 
      {/* Nav Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 10, marginBottom: 28 }}>
        {navItems.map(n => (
          <GlowCard key={n.id} color={n.color} onClick={() => setPage(n.id)} style={{ textAlign: "center", padding: "20px 14px" }}>
            <div style={{ fontSize: 30, marginBottom: 8 }}>{n.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 4 }}>{n.label}</div>
            <div style={{ fontSize: 11, color: C.text2, lineHeight: 1.4 }}>{n.desc}</div>
          </GlowCard>
        ))}
      </div>
 
      {/* Stats */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.text3, fontWeight: 700, marginBottom: 14, letterSpacing: 1 }}>📊 قاعدة البيانات</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {[["GPU","8",C.accent2],["CPU","6",C.accent],["RAM","4",C.cyan],["PSU+","12",C.green]].map(([l,v,c]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: c }}>{v}</div>
              <div style={{ fontSize: 11, color: C.text3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Featured */}
      <div style={{ fontSize: 12, color: C.text3, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>⭐ FEATURED PICKS</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {partsData.filter(p => p.tag.includes("⭐")).slice(0,4).map(p => (
          <div key={p.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 13, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 20 }}>{typeIcons[p.type]}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{p.name}</div>
                <div style={{ fontSize: 10, color: C.text3 }}>{p.specs}</div>
              </div>
            </div>
            <div style={{ fontWeight: 900, fontSize: 14, color: typeColors[p.type] }}>{p.priceSAR.toLocaleString()} ر.س</div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
function PartsPage({ build, setBuild, compare, setCompare }) {
  const [filter, setFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("score");
  const types = ["الكل","GPU","CPU","RAM","PSU","Motherboard","SSD","Cooler","Case"];
  const filtered = useMemo(() => partsData.filter(p => (filter === "الكل" || p.type === filter) && (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))).sort((a,b) => sort === "score" ? b.score - a.score : sort === "asc" ? a.priceSAR - b.priceSAR : b.priceSAR - a.priceSAR), [filter, search, sort]);
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 14 }}>📋 قطع الكمبيوتر</h2>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 ابحث..." style={{ width: "100%", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 11, padding: "10px 14px", color: C.text, fontSize: 13, outline: "none", marginBottom: 10 }} />
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
        {types.map(t => <button key={t} onClick={() => setFilter(t)} style={{ background: filter === t ? `linear-gradient(135deg,${C.accent},${C.accent2})` : C.bg3, border: `1px solid ${filter === t ? C.accent : C.border}`, borderRadius: 7, padding: "4px 10px", color: filter === t ? "#fff" : C.text2, cursor: "pointer", fontSize: 11, fontWeight: filter === t ? 700 : 400 }}>{t}</button>)}
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 7, padding: "4px 8px", color: C.text2, fontSize: 11, marginRight: "auto" }}>
          <option value="score">الأداء</option>
          <option value="asc">السعر ↑</option>
          <option value="desc">السعر ↓</option>
        </select>
      </div>
      <div style={{ fontSize: 10, color: C.text3, marginBottom: 10 }}>{filtered.length} قطعة</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
        {filtered.map(p => <PartCard key={p.id} part={p} inBuild={build[p.type]?.id === p.id} onAdd={part => setBuild(prev => ({...prev, [part.type]: part}))} onCompare={part => setCompare(prev => prev.find(x => x.id === part.id) ? prev.filter(x => x.id !== part.id) : prev.length < 2 ? [...prev, part] : [prev[1], part])} isCompared={compare.some(x => x.id === p.id)} />)}
      </div>
    </div>
  );
}
 
function BuildPage({ build, setBuild, setPage }) {
  const buildList = Object.values(build);
  const total = calcPrice(build);
  const watt = calcWatt(build);
  const psuRec = recommendPSU(watt);
  const types = ["GPU","CPU","RAM","Motherboard","SSD","PSU","Cooler","Case"];
  const scores = { gaming: Math.round((((build.GPU?.score||0)*0.5+(build.CPU?.score||0)*0.3+(build.RAM?.score||0)*0.2))), design: Math.round(((build.GPU?.score||0)*0.3+(build.CPU?.score||0)*0.4+(build.RAM?.score||0)*0.3)), value: Math.min(100, Math.round(100 - total/120)) };
 
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text }}>🔧 تجميعتي</h2>
        {buildList.length > 0 && <button onClick={() => { const t = buildList.map(p => `${p.type}: ${p.name} — ${p.priceSAR.toLocaleString()} ر.س`).join("\n") + `\n\nالإجمالي: ${total.toLocaleString()} ر.س\nالطاقة: ${watt}W → PSU موصى به: ${psuRec}`; navigator.clipboard?.writeText(t); alert("✅ تم نسخ التجميعة!"); }} style={{ background: `linear-gradient(135deg,${C.accent},${C.accent2})`, border: "none", borderRadius: 9, padding: "7px 14px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 11 }}>📋 نسخ</button>}
      </div>
 
      {/* Presets */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.text3, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>⚡ تجميعات جاهزة</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {Object.entries(buildPresets).map(([key, preset]) => (
            <button key={key} onClick={() => { const b = {}; Object.entries(preset).forEach(([k,v]) => { if(k !== "label") { const p = getPart(v); if(p) b[p.type] = p; } }); setBuild(b); }} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 12px", color: C.text2, cursor: "pointer", fontSize: 11, fontWeight: 600 }}>{preset.label}</button>
          ))}
        </div>
      </div>
 
      {/* Build slots */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {types.map(type => {
          const part = build[type];
          const color = typeColors[type];
          return (
            <div key={type} style={{ background: C.card, border: `1px solid ${part ? color + "44" : C.border}`, borderRadius: 13, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
                <span style={{ fontSize: 20 }}>{typeIcons[type]}</span>
                <div>
                  <div style={{ fontSize: 10, color, fontWeight: 700 }}>{type}</div>
                  {part ? <><div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{part.name}</div><div style={{ fontSize: 10, color: C.text3 }}>{part.specs}</div></> : <div style={{ fontSize: 12, color: C.text3 }}>لم تختر بعد</div>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {part && <span style={{ fontWeight: 800, fontSize: 13, color }}>{part.priceSAR.toLocaleString()} ر.س</span>}
                <button onClick={() => setPage("parts")} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 7, padding: "5px 9px", color: C.text2, cursor: "pointer", fontSize: 10 }}>{part ? "تغيير" : "اختر"}</button>
                {part && <button onClick={() => setBuild(prev => { const n={...prev}; delete n[type]; return n; })} style={{ background: "#ef444422", border: "1px solid #ef444444", borderRadius: 7, padding: "5px 8px", color: "#ef4444", cursor: "pointer", fontSize: 10 }}>✕</button>}
              </div>
            </div>
          );
        })}
      </div>
 
      {buildList.length > 0 && (
        <div style={{ background: `linear-gradient(135deg,${C.accent}15,${C.accent2}10)`, border: `1.5px solid ${C.accent}33`, borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontWeight: 700, color: C.text }}>💰 الإجمالي</span>
            <span style={{ fontWeight: 900, fontSize: 26, color: C.accent }}>~{total.toLocaleString()} ر.س</span>
          </div>
          {/* Budget bars */}
          {buildList.map(p => (
            <div key={p.id} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.text2, marginBottom: 3 }}>
                <span>{typeIcons[p.type]} {p.type}</span>
                <span style={{ color: typeColors[p.type] }}>{Math.round(p.priceSAR/total*100)}% · {p.priceSAR.toLocaleString()} ر.س</span>
              </div>
              <div style={{ background: C.bg3, borderRadius: 4, height: 5 }}><div style={{ width: `${p.priceSAR/total*100}%`, height: "100%", background: typeColors[p.type], borderRadius: 4, transition: "width 0.8s ease" }} /></div>
            </div>
          ))}
          {/* Power */}
          <div style={{ marginTop: 14, padding: "12px 14px", background: C.bg3, borderRadius: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 11, color: C.text3, marginBottom: 2 }}>⚡ استهلاك الطاقة</div><div style={{ fontWeight: 700, fontSize: 14, color: C.yellow }}>{watt}W</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: C.text3, marginBottom: 2 }}>PSU موصى به</div><div style={{ fontWeight: 700, fontSize: 14, color: C.green }}>{psuRec}</div></div>
          </div>
          {/* Scores */}
          {buildList.length >= 2 && (
            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[["🎮 ألعاب", scores.gaming, C.accent2],["🎨 تصميم", scores.design, C.cyan],["💰 قيمة", scores.value, C.green]].map(([l,s,c]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <ScoreRing score={Math.min(100,Math.max(0,s))} color={c} size={52} />
                  <div style={{ fontSize: 10, color: C.text3, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {buildList.length === 0 && (
        <div style={{ textAlign: "center", padding: "50px 20px", background: C.card, borderRadius: 20, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 8 }}>تجميعتك فاضية</div>
          <button onClick={() => setPage("parts")} style={{ background: `linear-gradient(135deg,${C.accent},${C.accent2})`, border: "none", borderRadius: 12, padding: "10px 22px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>تصفح القطع</button>
        </div>
      )}
    </div>
  );
}
 
function CompatPage({ build }) {
  const checks = [
    { label: "المعالج ↔ اللوحة الأم", ok: !build.CPU || !build.Motherboard || (build.CPU.brand === "AMD") === (build.Motherboard.specs.includes("AM5")), msg: "السوكيت غير متوافق!" },
    { label: "الرام ↔ اللوحة الأم", ok: !build.RAM || !build.Motherboard || (build.Motherboard.specs.includes("DDR5") && build.RAM.specs.includes("DDR5")), msg: "نوع الرام غير متوافق!" },
    { label: "مزود الطاقة كافٍ", ok: !build.PSU || !build.GPU || !build.CPU || (parseInt(build.PSU.specs) >= calcWatt(build)), msg: "الباور ضعيف للتجميعة!" },
    { label: "جميع القطع الأساسية موجودة", ok: ["GPU","CPU","RAM","Motherboard","SSD","PSU"].every(t => build[t]), msg: "بعض القطع الأساسية ناقصة" },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>🔗 فحص التوافق</h2>
      <p style={{ fontSize: 12, color: C.text3, marginBottom: 16 }}>تأكد أن قطع تجميعتك تشتغل مع بعض</p>
      {Object.keys(build).length < 2 ? (
        <div style={{ textAlign: "center", padding: "40px", background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🔗</div>
          <div style={{ color: C.text2, fontSize: 13 }}>أضف قطعتين أو أكثر في تجميعتك للفحص</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {checks.map((c, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${c.ok ? "#22c55e44" : "#ef444444"}`, borderRadius: 13, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{c.label}</div>
                {!c.ok && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>⚠️ {c.msg}</div>}
              </div>
              <div style={{ fontSize: 22 }}>{c.ok ? "✅" : "❌"}</div>
            </div>
          ))}
          <div style={{ background: checks.every(c => c.ok) ? "#22c55e22" : "#ef444422", border: `1px solid ${checks.every(c => c.ok) ? "#22c55e44" : "#ef444444"}`, borderRadius: 13, padding: "14px 16px", textAlign: "center" }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: checks.every(c => c.ok) ? C.green : C.red }}>{checks.every(c => c.ok) ? "✅ التجميعة متوافقة تماماً!" : "⚠️ يوجد مشاكل توافق"}</div>
          </div>
        </div>
      )}
    </div>
  );
}
 
function PowerPage({ build }) {
  const watt = calcWatt(build);
  const psuRec = recommendPSU(watt);
  const items = Object.values(build).filter(p => p.watt > 0).concat([{ name: "باقي القطع (تقريبي)", watt: 80, type: "Other" }]);
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>⚡ حساب الطاقة</h2>
      <p style={{ fontSize: 12, color: C.text3, marginBottom: 16 }}>حساب تقريبي لاستهلاك الطاقة في تجميعتك</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
        {items.map((p, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 11, padding: "11px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span>{typeIcons[p.type] || "🔌"}</span>
              <span style={{ fontSize: 13, color: C.text }}>{p.name}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ background: C.bg3, borderRadius: 3, height: 4, width: 80 }}><div style={{ width: `${Math.min(100, p.watt/5)}%`, height: "100%", background: C.yellow, borderRadius: 3 }} /></div>
              <span style={{ fontWeight: 700, fontSize: 13, color: C.yellow, minWidth: 45, textAlign: "right" }}>{p.watt}W</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ background: `linear-gradient(135deg,${C.yellow}15,${C.accent}10)`, border: `1.5px solid ${C.yellow}44`, borderRadius: 16, padding: "18px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 12, color: C.text3, marginBottom: 6 }}>إجمالي الاستهلاك</div>
        <div style={{ fontSize: 42, fontWeight: 900, color: C.yellow, marginBottom: 4 }}>{watt}W</div>
        <div style={{ fontSize: 12, color: C.text2, marginBottom: 12 }}>PSU الموصى به (مع هامش أمان 20%)</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: C.green }}>{psuRec}</div>
      </div>
    </div>
  );
}
 
function ComparePage({ compare, setCompare, setPage }) {
  const [a, b] = compare;
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>⚖️ مقارنة القطع</h2>
      <p style={{ fontSize: 12, color: C.text3, marginBottom: 16 }}>اضغط "⚖️" على قطعتين في قائمة القطع</p>
      {compare.length < 2 ? (
        <div style={{ textAlign: "center", padding: "50px 20px", background: C.card, borderRadius: 16, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 42, marginBottom: 10 }}>⚖️</div>
          <div style={{ color: C.text2, fontSize: 13, marginBottom: 16 }}>اختر {2 - compare.length} قطعة للمقارنة</div>
          <button onClick={() => setPage("parts")} style={{ background: `linear-gradient(135deg,${C.accent},${C.accent2})`, border: "none", borderRadius: 11, padding: "10px 22px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>تصفح القطع</button>
          {compare.length === 1 && <div style={{ marginTop: 12, fontSize: 12, color: C.text2 }}>✅ {compare[0].name}</div>}
        </div>
      ) : (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[a, b].map((p, i) => (
              <div key={p.id} style={{ background: C.card, border: `1.5px solid ${typeColors[p.type]}55`, borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 10, color: typeColors[p.type], fontWeight: 700, marginBottom: 4 }}>{i === 0 ? "الأول" : "الثاني"}</div>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{typeIcons[p.type]}</div>
                <div style={{ fontWeight: 800, fontSize: 13, color: C.text, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: C.text3, marginBottom: 8 }}>{p.specs}</div>
                <ScoreRing score={p.score} color={typeColors[p.type]} size={52} />
                <div style={{ fontWeight: 900, fontSize: 18, color: typeColors[p.type], marginTop: 6 }}>{p.priceSAR.toLocaleString()} ر.س</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 12 }}>
            {[["الاسم", a.name, b.name, null],["الشركة", a.brand, b.brand, null],["المواصفات", a.specs, b.specs, null],["السعر", `${a.priceSAR.toLocaleString()} ر.س`, `${b.priceSAR.toLocaleString()} ر.س`, "price"],["الأداء", `${a.score}%`, `${b.score}%`, "score"],["الطاقة", `${a.watt}W`, `${b.watt}W`, "watt"]].map(([l,v1,v2,cmp], i) => (
              <div key={l} style={{ display: "grid", gridTemplateColumns: "0.8fr 1fr 1fr", borderBottom: `1px solid ${C.border}`, background: i%2===0 ? C.bg3+"33" : "transparent" }}>
                <div style={{ padding: "10px 12px", fontSize: 10, color: C.text3, fontWeight: 700 }}>{l}</div>
                <div style={{ padding: "10px 12px", fontSize: 10, fontWeight: 700, color: cmp === "price" ? (a.priceSAR <= b.priceSAR ? C.green : C.red) : cmp === "score" ? (a.score >= b.score ? C.green : C.red) : cmp === "watt" ? (a.watt <= b.watt ? C.green : C.red) : C.text }}>{v1}</div>
                <div style={{ padding: "10px 12px", fontSize: 10, fontWeight: 700, color: cmp === "price" ? (b.priceSAR <= a.priceSAR ? C.green : C.red) : cmp === "score" ? (b.score >= a.score ? C.green : C.red) : cmp === "watt" ? (b.watt <= a.watt ? C.green : C.red) : C.text }}>{v2}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setCompare([])} style={{ width: "100%", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 11, padding: "10px", color: C.text2, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🔄 مقارنة جديدة</button>
        </div>
      )}
    </div>
  );
}
 
function SmartPage({ build, setBuild }) {
  const [budget, setBudget] = useState(5000);
  const [usage, setUsage] = useState("gaming");
  const usages = [["gaming","🎮","ألعاب"],["design","🎨","تصميم"],["study","📚","دراسة"],["budget","💰","اقتصادي"],["pro_gaming","🏆","احتراف"]];
 
  const suggest = () => {
    const preset = buildPresets[usage];
    const b = {};
    Object.entries(preset).forEach(([k, v]) => { if(k !== "label") { const p = getPart(v); if(p) b[p.type] = p; } });
    const total = calcPrice(b);
    if (total <= budget) { setBuild(b); alert(`✅ تم اقتراح تجميعة ${preset.label}\nالسعر الإجمالي: ~${total.toLocaleString()} ر.س`); }
    else { const cheap = buildPresets["budget"]; const b2 = {}; Object.entries(cheap).forEach(([k,v]) => { if(k !== "label") { const p = getPart(v); if(p) b2[p.type] = p; } }); setBuild(b2); alert(`ℹ️ الميزانية محدودة للاستخدام المطلوب\nتم اقتراح تجميعة اقتصادية بدلاً`); }
  };
 
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>🤖 اقتراح ذكي</h2>
      <p style={{ fontSize: 12, color: C.text3, marginBottom: 20 }}>حدد ميزانيتك واستخدامك وراح نقترح أفضل تجميعة</p>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.text3, fontWeight: 700, marginBottom: 8 }}>💰 الميزانية</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="range" min={3000} max={20000} step={500} value={budget} onChange={e => setBudget(+e.target.value)} style={{ flex: 1, accentColor: C.accent }} />
          <div style={{ fontWeight: 900, fontSize: 18, color: C.accent, minWidth: 100, textAlign: "right" }}>{budget.toLocaleString()} ر.س</div>
        </div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.text3, fontWeight: 700, marginBottom: 8 }}>🎯 الاستخدام</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {usages.map(([id, ic, lb]) => (
            <button key={id} onClick={() => setUsage(id)} style={{ background: usage === id ? `linear-gradient(135deg,${C.accent}33,${C.accent2}22)` : C.bg3, border: `1px solid ${usage === id ? C.accent : C.border}`, borderRadius: 11, padding: "12px", cursor: "pointer", color: usage === id ? C.text : C.text2, fontWeight: usage === id ? 700 : 400, fontSize: 13 }}>
              {ic} {lb}
            </button>
          ))}
        </div>
      </div>
      <button onClick={suggest} style={{ width: "100%", background: `linear-gradient(135deg,${C.accent},${C.accent2})`, border: "none", borderRadius: 13, padding: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 15, boxShadow: `0 0 25px ${C.accent}33` }}>
        🤖 اقترح التجميعة المثالية
      </button>
    </div>
  );
}
 
// ===================== APP =====================
export default function App() {
  const [page, setPage] = useState("home");
  const [build, setBuild] = useState({});
  const [compare, setCompare] = useState([]);
 
  const navItems = [["home","🏠"],["parts","📋"],["build","🔧"],["compat","🔗"],["power","⚡"],["compare","⚖️"],["smart","🤖"]];
  const navLabels = { home:"الرئيسية", parts:"القطع", build:"تجميعتي", compat:"التوافق", power:"الطاقة", compare:"مقارنة", smart:"ذكي" };
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Syne', 'Tajawal', sans-serif", direction: "rtl", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Tajawal:wght@400;500;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.accent}66;border-radius:3px;}
        body{background:${C.bg};}
        input[type=range]{height:4px;border-radius:2px;}
        button{font-family:'Tajawal',sans-serif;}
      `}</style>
 
      {/* Grid background */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(${C.accent}08 1px, transparent 1px), linear-gradient(90deg, ${C.accent}08 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${C.accent}12 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
 
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(5,8,16,0.9)", borderBottom: `1px solid ${C.border}`, backdropFilter: "blur(20px)", padding: "0 16px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ background: `linear-gradient(135deg,${C.accent},${C.accent2})`, borderRadius: 8, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, boxShadow: C.glow }}>🖥️</div>
            <span style={{ fontFamily: "Syne", fontWeight: 900, fontSize: 14, background: `linear-gradient(90deg,${C.accent},${C.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PC BUILDER SA</span>
          </div>
          <div style={{ display: "flex", gap: 2 }}>
            {navItems.map(([p, ic]) => (
              <button key={p} onClick={() => setPage(p)} title={navLabels[p]} style={{ background: page === p ? `${C.accent}22` : "none", border: page === p ? `1px solid ${C.accent}44` : "1px solid transparent", borderRadius: 8, padding: "5px 8px", color: page === p ? C.accent : C.text3, cursor: "pointer", fontSize: 14, position: "relative", transition: "all 0.2s" }}>
                {ic}
                {p === "build" && Object.keys(build).length > 0 && <span style={{ position: "absolute", top: 2, right: 2, background: C.accent, color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{Object.keys(build).length}</span>}
                {p === "compare" && compare.length > 0 && <span style={{ position: "absolute", top: 2, right: 2, background: C.green, color: "#fff", borderRadius: "50%", width: 14, height: 14, fontSize: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>{compare.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </nav>
 
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px", position: "relative", zIndex: 1 }}>
        {page === "home" && <HomePage setPage={setPage} />}
        {page === "parts" && <PartsPage build={build} setBuild={setBuild} compare={compare} setCompare={setCompare} />}
        {page === "build" && <BuildPage build={build} setBuild={setBuild} setPage={setPage} />}
        {page === "compat" && <CompatPage build={build} />}
        {page === "power" && <PowerPage build={build} />}
        {page === "compare" && <ComparePage compare={compare} setCompare={setCompare} setPage={setPage} />}
        {page === "smart" && <SmartPage build={build} setBuild={setBuild} />}
        <div style={{ textAlign: "center", padding: "28px 0 8px", fontSize: 10, color: C.text3, letterSpacing: 1 }}>PC BUILDER SA · أسعار تقريبية · يونيو 2025</div>
      </div>
    </div>
  );
}
