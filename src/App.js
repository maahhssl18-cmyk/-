cat > /mnt/user-data/outputs/App.js << 'ENDOFFILE'
import { useState, useMemo } from "react";

const C = {
  bg: "#030608",
  bg2: "#070d12",
  bg3: "#0a1520",
  glass: "rgba(10,25,40,0.7)",
  glassBorder: "rgba(0,255,150,0.12)",
  glassBorderHover: "rgba(0,255,150,0.35)",
  neon: "#00ff96",
  neonDim: "#00cc78",
  blue: "#0ea5e9",
  purple: "#a855f7",
  red: "#ef4444",
  yellow: "#fbbf24",
  white: "#f0faf5",
  text2: "#7aada0",
  text3: "#2d5a4a",
  glow: "0 0 30px rgba(0,255,150,0.2)",
};

const DT = {
  bg: "#f8fafc", bg2: "#f1f5f9", bg3: "#e2e8f0",
  glass: "rgba(255,255,255,0.85)", glassBorder: "rgba(0,150,100,0.2)",
  glassBorderHover: "rgba(0,150,100,0.5)",
  neon: "#059669", neonDim: "#047857", blue: "#0284c7",
  purple: "#7c3aed", red: "#dc2626", yellow: "#d97706",
  white: "#0f172a", text2: "#475569", text3: "#94a3b8",
  glow: "0 0 30px rgba(5,150,105,0.15)",
};

const typeColors = { GPU:"#a855f7", CPU:"#0ea5e9", RAM:"#00ff96", PSU:"#fbbf24", Motherboard:"#f97316", SSD:"#06b6d4", Cooler:"#ec4899", Case:"#64748b" };
const typeIcons = { GPU:"🎮", CPU:"⚡", RAM:"💾", PSU:"🔌", Motherboard:"🔧", SSD:"💿", Cooler:"❄️", Case:"📦" };

const partsData = [
  // GPU - RTX 50
  { id:"rtx5060", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5060", specs:"8GB GDDR7 · DLSS 4 · 1080p", priceSAR:1125, watt:115, score:72, tag:"Entry" },
  { id:"rtx5060ti8", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5060 Ti 8GB", specs:"8GB GDDR7 · DLSS 4 · 1440p", priceSAR:1425, watt:160, score:80, tag:"Value" },
  { id:"rtx5060ti16", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5060 Ti 16GB", specs:"16GB GDDR7 · DLSS 4 · 1440p", priceSAR:1612, watt:165, score:83, tag:"Best Value" },
  { id:"rtx5070", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5070", specs:"12GB GDDR7 · DLSS 4 · 1440p/4K", priceSAR:2060, watt:200, score:90, tag:"⭐ Top Pick" },
  { id:"rtx5070ti", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5070 Ti", specs:"16GB GDDR7 · DLSS 4 · 4K", priceSAR:2810, watt:250, score:94, tag:"Pro" },
  { id:"rtx5080", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5080", specs:"16GB GDDR7 · 4K Ultra", priceSAR:3745, watt:320, score:97, tag:"Elite" },
  { id:"rtx5090", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5090", specs:"32GB GDDR7 · 8K", priceSAR:7495, watt:450, score:99, tag:"Flagship" },
  // GPU - RTX 40
  { id:"rtx4060", type:"GPU", series:"RTX 40 Series", brand:"NVIDIA", name:"RTX 4060", specs:"8GB GDDR6 · DLSS 3 · 1080p", priceSAR:1050, watt:115, score:70, tag:"Budget" },
  { id:"rtx4070", type:"GPU", series:"RTX 40 Series", brand:"NVIDIA", name:"RTX 4070", specs:"12GB GDDR6 · DLSS 3 · 1440p", priceSAR:1650, watt:200, score:82, tag:"Mid" },
  { id:"rtx4080", type:"GPU", series:"RTX 40 Series", brand:"NVIDIA", name:"RTX 4080 Super", specs:"16GB GDDR6 · DLSS 3 · 4K", priceSAR:3200, watt:320, score:93, tag:"High-End" },
  // GPU - RX 7000
  { id:"rx7700xt", type:"GPU", series:"RX 7000 Series", brand:"AMD", name:"RX 7700 XT", specs:"12GB GDDR6 · FSR 3 · 1440p", priceSAR:1350, watt:180, score:80, tag:"AMD Value" },
  { id:"rx7900xtx", type:"GPU", series:"RX 7000 Series", brand:"AMD", name:"RX 7900 XTX", specs:"24GB GDDR6 · FSR 3 · 4K", priceSAR:3200, watt:355, score:94, tag:"AMD Elite" },
  // CPU - Intel 14th
  { id:"i5_14400f", type:"CPU", series:"Intel 14th Gen", brand:"Intel", name:"Core i5-14400F", specs:"10 نواة · 4.7GHz · LGA1700", priceSAR:700, watt:65, score:72, tag:"Budget" },
  { id:"i5_14600k", type:"CPU", series:"Intel 14th Gen", brand:"Intel", name:"Core i5-14600K", specs:"14 نواة · 5.3GHz · LGA1700", priceSAR:900, watt:125, score:80, tag:"Best Value" },
  { id:"i7_14700k", type:"CPU", series:"Intel 14th Gen", brand:"Intel", name:"Core i7-14700K", specs:"20 نواة · 5.6GHz · LGA1700", priceSAR:1400, watt:125, score:88, tag:"Pro" },
  { id:"i9_14900k", type:"CPU", series:"Intel 14th Gen", brand:"Intel", name:"Core i9-14900K", specs:"24 نواة · 6.0GHz · LGA1700", priceSAR:2100, watt:125, score:95, tag:"Elite" },
  // CPU - AMD Ryzen 9000
  { id:"r5_9600x", type:"CPU", series:"AMD Ryzen 9000", brand:"AMD", name:"Ryzen 5 9600X", specs:"6 نواة · 5.4GHz · AM5", priceSAR:1050, watt:65, score:78, tag:"Efficient" },
  { id:"r7_9700x", type:"CPU", series:"AMD Ryzen 9000", brand:"AMD", name:"Ryzen 7 9700X", specs:"8 نواة · 5.5GHz · AM5", priceSAR:1350, watt:65, score:84, tag:"Balance" },
  { id:"r7_9800x3d", type:"CPU", series:"AMD Ryzen 9000", brand:"AMD", name:"Ryzen 7 9800X3D", specs:"8 نواة · 5.7GHz · 3D Cache · AM5", priceSAR:1575, watt:120, score:99, tag:"⭐ Gaming King" },
  { id:"r9_9950x", type:"CPU", series:"AMD Ryzen 9000", brand:"AMD", name:"Ryzen 9 9950X", specs:"16 نواة · 5.7GHz · AM5", priceSAR:2440, watt:170, score:96, tag:"Workstation" },
  // RAM - DDR5
  { id:"ram_16_ddr5", type:"RAM", series:"DDR5", brand:"Kingston", name:"FURY Beast 16GB DDR5", specs:"16GB · DDR5-5600", priceSAR:280, watt:5, score:70, tag:"Entry" },
  { id:"ram_32_corsair", type:"RAM", series:"DDR5", brand:"Corsair", name:"Vengeance 32GB DDR5", specs:"32GB · DDR5-6000", priceSAR:420, watt:5, score:85, tag:"⭐ Best Pick" },
  { id:"ram_32_gskill", type:"RAM", series:"DDR5", brand:"G.Skill", name:"Trident Z5 32GB RGB", specs:"32GB · DDR5-6000 · RGB", priceSAR:490, watt:5, score:87, tag:"RGB" },
  { id:"ram_64", type:"RAM", series:"DDR5", brand:"Corsair", name:"Vengeance 64GB DDR5", specs:"64GB · DDR5-6000", priceSAR:850, watt:8, score:90, tag:"Pro" },
  // RAM - DDR4
  { id:"ram_16_ddr4", type:"RAM", series:"DDR4", brand:"Kingston", name:"FURY Beast 16GB DDR4", specs:"16GB · DDR4-3200", priceSAR:180, watt:4, score:65, tag:"Budget" },
  { id:"ram_32_ddr4", type:"RAM", series:"DDR4", brand:"G.Skill", name:"Ripjaws V 32GB DDR4", specs:"32GB · DDR4-3600", priceSAR:280, watt:4, score:72, tag:"Value" },
  // PSU
  { id:"psu_650g", type:"PSU", series:"80+ Gold", brand:"Cooler Master", name:"MWE Gold 650W", specs:"650W · 80+ Gold · Semi Modular", priceSAR:280, watt:0, score:72, tag:"Entry" },
  { id:"psu_750g", type:"PSU", series:"80+ Gold", brand:"Corsair", name:"RM750e 750W", specs:"750W · 80+ Gold · Full Modular", priceSAR:380, watt:0, score:85, tag:"⭐ Best Value" },
  { id:"psu_850g", type:"PSU", series:"80+ Gold", brand:"Seasonic", name:"Focus GX 850W", specs:"850W · 80+ Gold · 10yr", priceSAR:530, watt:0, score:93, tag:"Premium" },
  { id:"psu_1000p", type:"PSU", series:"80+ Platinum", brand:"Corsair", name:"HX1000 1000W", specs:"1000W · 80+ Platinum · Modular", priceSAR:750, watt:0, score:95, tag:"Platinum" },
  // Motherboard - Intel
  { id:"mb_b760", type:"Motherboard", series:"Intel B760", brand:"MSI", name:"PRO B760M-P DDR5", specs:"B760 · LGA1700 · DDR5 · mATX", priceSAR:659, watt:30, score:72, tag:"Budget", socket:"LGA1700" },
  { id:"mb_z790_tuf", type:"Motherboard", series:"Intel Z790", brand:"ASUS", name:"TUF Gaming Z790-Plus", specs:"Z790 · LGA1700 · DDR5 · WiFi", priceSAR:1629, watt:30, score:88, tag:"Gaming", socket:"LGA1700" },
  { id:"mb_z790_rog", type:"Motherboard", series:"Intel Z790", brand:"ASUS", name:"ROG Strix Z790-F WiFi", specs:"Z790 · LGA1700 · DDR5 · WiFi6E", priceSAR:2149, watt:30, score:94, tag:"ROG", socket:"LGA1700" },
  // Motherboard - AMD
  { id:"mb_b850", type:"Motherboard", series:"AMD B850", brand:"Gigabyte", name:"B850 Aorus Elite WiFi7", specs:"B850 · AM5 · DDR5 · WiFi7", priceSAR:935, watt:30, score:85, tag:"⭐ Best AMD", socket:"AM5" },
  { id:"mb_x870", type:"Motherboard", series:"AMD X870", brand:"ASUS", name:"PRIME X870-P WiFi", specs:"X870 · AM5 · DDR5 · WiFi6E", priceSAR:1499, watt:30, score:88, tag:"X870", socket:"AM5" },
  { id:"mb_x870e", type:"Motherboard", series:"AMD X870E", brand:"MSI", name:"MEG X870E ACE", specs:"X870E · AM5 · DDR5 · WiFi7", priceSAR:2199, watt:30, score:95, tag:"Flagship", socket:"AM5" },
  // SSD - NVMe Gen4
  { id:"ssd_samsung_1tb", type:"SSD", series:"NVMe Gen4", brand:"Samsung", name:"980 PRO 1TB", specs:"1TB · PCIe 4.0 · 7000MB/s", priceSAR:350, watt:6, score:88, tag:"⭐ Best Pick" },
  { id:"ssd_wd_2tb", type:"SSD", series:"NVMe Gen4", brand:"WD", name:"Black SN850X 2TB", specs:"2TB · PCIe 4.0 · 7300MB/s", priceSAR:600, watt:6, score:92, tag:"Pro" },
  // SSD - NVMe Gen3
  { id:"ssd_kv2_1tb", type:"SSD", series:"NVMe Gen3", brand:"Kingston", name:"NV2 1TB", specs:"1TB · PCIe 3.0 · 3500MB/s", priceSAR:200, watt:5, score:72, tag:"Budget" },
  { id:"ssd_crucial_1tb", type:"SSD", series:"NVMe Gen3", brand:"Crucial", name:"P3 Plus 1TB", specs:"1TB · PCIe 3.0 · 5000MB/s", priceSAR:250, watt:5, score:78, tag:"Value" },
  // Coolers
  { id:"cool_noctua", type:"Cooler", series:"Air Cooling", brand:"Noctua", name:"NH-D15 Dual Tower", specs:"Air · Dual Tower · LGA1700/AM5", priceSAR:380, watt:0, score:90, tag:"⭐ Best Air" },
  { id:"cool_deepcool240", type:"Cooler", series:"AIO 240mm", brand:"DeepCool", name:"LT240 AIO 240mm", specs:"AIO · 240mm · ARGB · LGA1700/AM5", priceSAR:300, watt:0, score:82, tag:"AIO" },
  { id:"cool_corsair360", type:"Cooler", series:"AIO 360mm", brand:"Corsair", name:"iCUE H150i 360mm", specs:"AIO · 360mm · RGB · Premium", priceSAR:580, watt:0, score:93, tag:"⭐ Premium" },
  { id:"cool_arctic360", type:"Cooler", series:"AIO 360mm", brand:"Arctic", name:"Liquid Freezer III 360", specs:"AIO · 360mm · Best Value", priceSAR:420, watt:0, score:91, tag:"Best Value" },
  // Cases
  { id:"case_nzxt", type:"Case", series:"Mid Tower", brand:"NZXT", name:"H7 Flow", specs:"Mid Tower · ATX · Airflow · 3 Fans", priceSAR:400, watt:0, score:85, tag:"Airflow" },
  { id:"case_lianli", type:"Case", series:"Mid Tower", brand:"Lian Li", name:"O11 Dynamic", specs:"Mid Tower · ATX · Dual Chamber", priceSAR:600, watt:0, score:92, tag:"⭐ Premium" },
  { id:"case_corsair", type:"Case", series:"Mid Tower", brand:"Corsair", name:"4000D Airflow", specs:"Mid Tower · ATX · 3 Fans Included", priceSAR:350, watt:0, score:82, tag:"Value" },
  { id:"case_fractal", type:"Case", series:"Mid Tower", brand:"Fractal", name:"North Charcoal", specs:"Mid Tower · ATX · Wood Panel · Silent", priceSAR:500, watt:0, score:88, tag:"Design" },
];

const buildPresets = {
  gaming: { label:"🎮 ألعاب", gpu:"rtx5070", cpu:"r7_9800x3d", ram:"ram_32_corsair", mb:"mb_b850", ssd:"ssd_samsung_1tb", psu:"psu_750g", cooler:"cool_deepcool240", case:"case_nzxt" },
  pro: { label:"🏆 احترافي", gpu:"rtx5080", cpu:"r7_9800x3d", ram:"ram_32_gskill", mb:"mb_b850", ssd:"ssd_wd_2tb", psu:"psu_850g", cooler:"cool_corsair360", case:"case_lianli" },
  design: { label:"🎨 تصميم", gpu:"rtx5070ti", cpu:"r9_9950x", ram:"ram_64", mb:"mb_x870", ssd:"ssd_wd_2tb", psu:"psu_850g", cooler:"cool_corsair360", case:"case_lianli" },
  study: { label:"📚 دراسة", gpu:"rtx5060ti16", cpu:"r5_9600x", ram:"ram_16_ddr5", mb:"mb_b850", ssd:"ssd_kv2_1tb", psu:"psu_650g", cooler:"cool_deepcool240", case:"case_corsair" },
  budget: { label:"💰 اقتصادي", gpu:"rtx4060", cpu:"i5_14400f", ram:"ram_16_ddr4", mb:"mb_b760", ssd:"ssd_kv2_1tb", psu:"psu_650g", cooler:"cool_deepcool240", case:"case_corsair" },
};

function getPart(id) { return partsData.find(p => p.id === id); }
function calcWatt(build) { return Object.values(build).reduce((s, id) => s + (getPart(id)?.watt || 0), 0) + 80; }
function calcPrice(build) { return Object.values(build).reduce((s, id) => s + (getPart(id)?.priceSAR || 0), 0); }
function recommendPSU(w) { return w <= 450 ? "650W Gold" : w <= 600 ? "750W Gold" : w <= 800 ? "1000W Gold" : "1200W Platinum"; }

function ScoreRing({ score, color, size = 48 }) {
  const r = size / 2 - 5;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)", filter: `drop-shadow(0 0 6px ${color}88)` }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3.5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3.5} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={size * 0.22} fontWeight="900" style={{ transform: `rotate(90deg)`, transformOrigin: `${size/2}px ${size/2}px`, fontFamily: "monospace" }}>{score}</text>
    </svg>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [page, setPage] = useState("home");
  const [build, setBuild] = useState({});
  const [compare, setCompare] = useState([]);
  const [filterType, setFilterType] = useState("GPU");
  const [filterSeries, setFilterSeries] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("score");

  const T = dark ? C : DT;

  const types = ["GPU","CPU","RAM","PSU","Motherboard","SSD","Cooler","Case"];
  const seriesList = useMemo(() => [...new Set(partsData.filter(p => p.type === filterType).map(p => p.series))], [filterType]);

  const filtered = useMemo(() => partsData
    .filter(p => p.type === filterType)
    .filter(p => !filterSeries || p.series === filterSeries)
    .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sort === "score" ? b.score - a.score : sort === "asc" ? a.priceSAR - b.priceSAR : b.priceSAR - a.priceSAR),
    [filterType, filterSeries, search, sort]
  );

  const buildList = Object.values(build).map(id => getPart(id)).filter(Boolean);
  const total = buildList.reduce((s,p) => s + p.priceSAR, 0);
  const watt = buildList.reduce((s,p) => s + (p.watt||0), 0) + 80;

  const addToBuild = p => setBuild(prev => ({...prev, [p.type]: p.id}));
  const removeFromBuild = type => setBuild(prev => { const n={...prev}; delete n[type]; return n; });
  const toggleCompare = p => setCompare(prev => prev.find(x=>x.id===p.id) ? prev.filter(x=>x.id!==p.id) : prev.length < 2 ? [...prev,p] : [prev[1],p]);

  const navItems = [
    ["home","🏠","الرئيسية"],
    ["parts","📋","القطع"],
    ["build","🔧","تجميعتي"],
    ["compat","🔗","التوافق"],
    ["power","⚡","الطاقة"],
    ["compare","⚖️","مقارنة"],
    ["smart","🤖","ذكي"],
  ];

  const glass = { background: T.glass, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: `1px solid ${T.glassBorder}`, borderRadius: 16 };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.white, fontFamily: "'Tajawal', sans-serif", direction: "rtl", transition: "background 0.3s, color 0.3s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&family=Space+Grotesk:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${T.neon}44; border-radius: 2px; }
        button { font-family: 'Tajawal', sans-serif; }
        input { font-family: 'Tajawal', sans-serif; }
        .price { direction: ltr; display: inline-block; font-variant-numeric: tabular-nums; }
      `}</style>

      {/* Background effects */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 500, height: 500, background: `radial-gradient(circle, ${T.neon}08 0%, transparent 70%)`, borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -200, left: -200, width: 400, height: 400, background: `radial-gradient(circle, ${T.blue}08 0%, transparent 70%)`, borderRadius: "50%" }} />
        {dark && <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${T.neon}04 1px, transparent 1px), linear-gradient(90deg, ${T.neon}04 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />}
      </div>

      {/* NAVBAR */}
      <nav style={{ ...glass, borderRadius: 0, borderLeft: "none", borderRight: "none", borderTop: "none", position: "sticky", top: 0, zIndex: 100, padding: "0 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: `linear-gradient(135deg, ${T.neon}, ${T.blue})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, boxShadow: T.glow }}>🖥️</div>
            <span style={{ fontFamily: "'Space Grotesk'", fontWeight: 800, fontSize: 15, color: T.neon, letterSpacing: 1 }}>PC BUILDER SA</span>
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
            {navItems.map(([p, ic, lb]) => (
              <button key={p} onClick={() => setPage(p)} title={lb} style={{ background: page===p ? `${T.neon}18` : "none", border: `1px solid ${page===p ? T.neon+"44" : "transparent"}`, borderRadius: 9, padding: "5px 8px", color: page===p ? T.neon : T.text3, cursor: "pointer", fontSize: 15, position: "relative", transition: "all 0.2s" }}>
                {ic}
                {p==="build" && buildList.length>0 && <span style={{ position:"absolute", top:1, right:1, background:T.neon, color:"#000", borderRadius:"50%", width:13, height:13, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>{buildList.length}</span>}
                {p==="compare" && compare.length>0 && <span style={{ position:"absolute", top:1, right:1, background:T.purple, color:"#fff", borderRadius:"50%", width:13, height:13, fontSize:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>{compare.length}</span>}
              </button>
            ))}
            <button onClick={() => setDark(!dark)} style={{ background: "none", border: `1px solid ${T.glassBorder}`, borderRadius: 9, padding: "5px 9px", color: T.text2, cursor: "pointer", fontSize: 14, marginRight: 4 }}>{dark ? "☀️" : "🌙"}</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px", position: "relative", zIndex: 1 }}>

        {/* HOME */}
        {page === "home" && (
          <div>
            <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
              <div style={{ display: "inline-block", background: `${T.neon}15`, border: `1px solid ${T.neon}33`, borderRadius: 100, padding: "5px 16px", marginBottom: 18, fontSize: 11, color: T.neon, fontWeight: 700, letterSpacing: 2 }}>RTX 50 · RYZEN 9000 · DDR5</div>
              <h1 style={{ fontSize: "clamp(30px,7vw,56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>
                <span style={{ color: T.white }}>ابنِ جهازك </span>
                <span style={{ color: T.neon, textShadow: `0 0 40px ${T.neon}66` }}>المثالي</span>
              </h1>
              <p style={{ color: T.text2, fontSize: 14, marginBottom: 28 }}>دليلك الكامل لتجميع PC بكل احترافية</p>
              <button onClick={() => setPage("build")} style={{ background: `linear-gradient(135deg, ${T.neon}, ${T.blue})`, border: "none", borderRadius: 14, padding: "13px 36px", color: "#000", fontWeight: 900, fontSize: 15, cursor: "pointer", boxShadow: T.glow }}>🚀 ابدأ التجميع</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
              {[["📋","تصفح القطع","parts",T.neon],["⚖️","قارن القطع","compare",T.purple],["🤖","اقتراح ذكي","smart",T.blue],["🔗","فحص التوافق","compat",T.yellow],["⚡","حساب الطاقة","power",T.red],["🔧","تجميعتي","build","#ec4899"]].map(([ic,lb,pg,cl]) => (
                <div key={pg} onClick={() => setPage(pg)} style={{ ...glass, padding: "18px 14px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = cl+"66"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = T.glassBorder}>
                  <div style={{ fontSize: 26, marginBottom: 6 }}>{ic}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: T.white }}>{lb}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 11, color: T.text3, fontWeight: 700, letterSpacing: 2, marginBottom: 10 }}>⭐ FEATURED</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {partsData.filter(p => p.tag.includes("⭐")).slice(0,5).map(p => (
                <div key={p.id} style={{ ...glass, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontSize: 18 }}>{typeIcons[p.type]}</span>
                    <div>
                      <span style={{ fontWeight: 700, fontSize: 13, color: T.white }}>{p.name}</span>
                      <div style={{ fontSize: 10, color: T.text3 }}>{p.series} · {p.brand}</div>
                    </div>
                  </div>
                  <div style={{ direction: "ltr" }}>
                    <span style={{ fontWeight: 900, fontSize: 14, color: typeColors[p.type] }}>{p.priceSAR.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: T.text2 }}> ر.س</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PARTS PAGE */}
        {page === "parts" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: T.white, marginBottom: 14 }}>📋 قطع الكمبيوتر</h2>

            {/* Type tabs */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {types.map(t => (
                <button key={t} onClick={() => { setFilterType(t); setFilterSeries(null); }} style={{ background: filterType===t ? `linear-gradient(135deg,${T.neon},${T.blue})` : T.bg3, border: `1px solid ${filterType===t ? "transparent" : T.glassBorder}`, borderRadius: 9, padding: "6px 13px", color: filterType===t ? "#000" : T.text2, cursor: "pointer", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                  {typeIcons[t]} {t}
                </button>
              ))}
            </div>

            {/* Series tabs */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12, paddingBottom: 12, borderBottom: `1px solid ${T.glassBorder}` }}>
              <button onClick={() => setFilterSeries(null)} style={{ background: !filterSeries ? `${T.neon}22` : "none", border: `1px solid ${!filterSeries ? T.neon+"44" : T.glassBorder}`, borderRadius: 7, padding: "4px 10px", color: !filterSeries ? T.neon : T.text3, cursor: "pointer", fontSize: 11, fontWeight: !filterSeries ? 700 : 400 }}>الكل</button>
              {seriesList.map(s => (
                <button key={s} onClick={() => setFilterSeries(s)} style={{ background: filterSeries===s ? `${T.neon}22` : "none", border: `1px solid ${filterSeries===s ? T.neon+"44" : T.glassBorder}`, borderRadius: 7, padding: "4px 10px", color: filterSeries===s ? T.neon : T.text3, cursor: "pointer", fontSize: 11, fontWeight: filterSeries===s ? 700 : 400 }}>{s}</button>
              ))}
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ background: T.bg3, border: `1px solid ${T.glassBorder}`, borderRadius: 7, padding: "4px 8px", color: T.text2, fontSize: 11, marginRight: "auto", cursor: "pointer" }}>
                <option value="score">الأداء</option>
                <option value="asc">السعر ↑</option>
                <option value="desc">السعر ↓</option>
              </select>
            </div>

            {/* Search */}
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 ابحث..." style={{ width: "100%", background: T.bg3, border: `1px solid ${T.glassBorder}`, borderRadius: 10, padding: "9px 13px", color: T.white, fontSize: 13, outline: "none", marginBottom: 12 }} />
            <div style={{ fontSize: 10, color: T.text3, marginBottom: 10 }}>{filtered.length} قطعة في {filterSeries || filterType}</div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: 10 }}>
              {filtered.map(part => {
                const color = typeColors[part.type];
                const inBuild = build[part.type] === part.id;
                const isComp = compare.some(x => x.id === part.id);
                return (
                  <div key={part.id} style={{ ...glass, borderColor: isComp ? color+"66" : inBuild ? T.neon+"44" : T.glassBorder, transition: "all 0.2s" }}
                    onMouseEnter={e => { if(!isComp && !inBuild) e.currentTarget.style.borderColor = color+"44"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = isComp ? color+"66" : inBuild ? T.neon+"44" : T.glassBorder; }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 16 }}>{typeIcons[part.type]}</span>
                          <span style={{ fontSize: 10, background: color+"22", border: `1px solid ${color}44`, borderRadius: 5, padding: "1px 6px", color, fontWeight: 700 }}>{part.tag}</span>
                          <span style={{ fontSize: 9, color: T.text3 }}>{part.brand}</span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: 14, color: T.white, marginBottom: 2 }}>{part.name}</div>
                        <div style={{ fontSize: 10, color: T.text2, marginBottom: 4 }}>{part.specs}</div>
                        <div style={{ fontSize: 9, color: T.text3 }}>{part.series}</div>
                        {part.watt > 0 && <div style={{ fontSize: 9, color: T.text3, marginTop: 2 }}>⚡ {part.watt}W</div>}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <ScoreRing score={part.score} color={color} size={50} />
                        <div style={{ direction: "ltr", fontWeight: 900, fontSize: 14, color, marginTop: 4 }}>{part.priceSAR.toLocaleString()}</div>
                        <div style={{ fontSize: 9, color: T.text3 }}>ريال</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                      <button onClick={() => addToBuild(part)} style={{ flex: 1, background: inBuild ? `${T.neon}22` : T.bg3, border: `1px solid ${inBuild ? T.neon : T.glassBorder}`, borderRadius: 8, padding: "7px", color: inBuild ? T.neon : T.text2, cursor: "pointer", fontSize: 11, fontWeight: 700, transition: "all 0.2s" }}>
                        {inBuild ? "✅ في التجميعة" : "➕ أضف"}
                      </button>
                      <button onClick={() => toggleCompare(part)} style={{ background: isComp ? color+"22" : T.bg3, border: `1px solid ${isComp ? color : T.glassBorder}`, borderRadius: 8, padding: "7px 10px", color: isComp ? color : T.text3, cursor: "pointer", fontSize: 11, transition: "all 0.2s" }}>⚖️</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BUILD PAGE */}
        {page === "build" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: T.white }}>🔧 تجميعتي</h2>
              {buildList.length > 0 && <button onClick={() => { const txt = buildList.map(p=>`${p.type}: ${p.name} — ${p.priceSAR.toLocaleString()} ر.س`).join("\n")+`\n\nالإجمالي: ${total.toLocaleString()} ر.س`; navigator.clipboard?.writeText(txt); alert("✅ تم نسخ التجميعة!"); }} style={{ background: `linear-gradient(135deg,${T.neon},${T.blue})`, border:"none", borderRadius:9, padding:"7px 14px", color:"#000", fontWeight:700, cursor:"pointer", fontSize:11 }}>📋 نسخ</button>}
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {Object.entries(buildPresets).map(([k,v]) => (
                <button key={k} onClick={() => { const b={}; Object.entries(v).forEach(([key,id])=>{ if(key!=="label"){ const p=getPart(id); if(p) b[p.type]=p.id; }}); setBuild(b); }} style={{ background: T.bg3, border:`1px solid ${T.glassBorder}`, borderRadius:8, padding:"5px 11px", color:T.text2, cursor:"pointer", fontSize:11 }}>{v.label}</button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {types.map(type => {
                const part = build[type] ? getPart(build[type]) : null;
                const color = typeColors[type];
                return (
                  <div key={type} style={{ ...glass, borderColor: part ? color+"44" : T.glassBorder, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flex: 1 }}>
                      <span style={{ fontSize: 20 }}>{typeIcons[type]}</span>
                      <div>
                        <div style={{ fontSize: 9, color, fontWeight: 700, letterSpacing: 1 }}>{type}</div>
                        {part ? <><div style={{ fontWeight: 700, fontSize: 13, color: T.white }}>{part.name}</div><div style={{ fontSize: 10, color: T.text3 }}>{part.specs}</div></> : <div style={{ fontSize: 12, color: T.text3 }}>لم تختر بعد</div>}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                      {part && <span style={{ fontWeight: 800, fontSize: 13, color, direction: "ltr" }}>{part.priceSAR.toLocaleString()} ر.س</span>}
                      <button onClick={() => setPage("parts")} style={{ background: T.bg3, border:`1px solid ${T.glassBorder}`, borderRadius:7, padding:"4px 8px", color:T.text2, cursor:"pointer", fontSize:10 }}>{part?"تغيير":"اختر"}</button>
                      {part && <button onClick={() => removeFromBuild(type)} style={{ background:"#ef444422", border:"1px solid #ef444444", borderRadius:7, padding:"4px 8px", color:"#ef4444", cursor:"pointer", fontSize:10 }}>✕</button>}
                    </div>
                  </div>
                );
              })}
            </div>

            {buildList.length > 0 && (
              <div style={{ ...glass, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <span style={{ fontWeight: 700, color: T.white }}>💰 الإجمالي</span>
                  <span style={{ fontWeight: 900, fontSize: 26, color: T.neon, direction: "ltr", textShadow: `0 0 20px ${T.neon}66` }}>{total.toLocaleString()} ر.س</span>
                </div>
                {buildList.map(p => (
                  <div key={p.id} style={{ marginBottom: 7 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: T.text2, marginBottom: 3 }}>
                      <span>{typeIcons[p.type]} {p.type}</span>
                      <span style={{ color: typeColors[p.type], direction: "ltr" }}>{Math.round(p.priceSAR/total*100)}% · {p.priceSAR.toLocaleString()} ر.س</span>
                    </div>
                    <div style={{ background: `${T.neon}10`, borderRadius: 4, height: 5 }}>
                      <div style={{ width:`${p.priceSAR/total*100}%`, height:"100%", background: typeColors[p.type], borderRadius:4 }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 14, background: `${T.neon}08`, border:`1px solid ${T.neon}22`, borderRadius: 10, padding: "11px 14px", display: "flex", justifyContent: "space-between" }}>
                  <div><div style={{ fontSize:10, color:T.text3 }}>⚡ الطاقة</div><div style={{ fontWeight:700, color:T.yellow, direction:"ltr" }}>{watt}W</div></div>
                  <div style={{ textAlign:"right" }}><div style={{ fontSize:10, color:T.text3 }}>PSU موصى به</div><div style={{ fontWeight:700, color:T.neon }}>{recommendPSU(watt)}</div></div>
                </div>
              </div>
            )}
            {buildList.length === 0 && (
              <div style={{ ...glass, textAlign:"center", padding:"50px 20px" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
                <div style={{ fontWeight:700, color:T.white, marginBottom:8 }}>تجميعتك فاضية</div>
                <button onClick={() => setPage("parts")} style={{ background:`linear-gradient(135deg,${T.neon},${T.blue})`, border:"none", borderRadius:11, padding:"10px 22px", color:"#000", fontWeight:700, cursor:"pointer" }}>تصفح القطع</button>
              </div>
            )}
          </div>
        )}

        {/* COMPAT */}
        {page === "compat" && (
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:T.white, marginBottom:6 }}>🔗 فحص التوافق</h2>
            <p style={{ fontSize:12, color:T.text3, marginBottom:16 }}>تأكد أن قطع تجميعتك تشتغل مع بعض</p>
            {buildList.length < 2 ? (
              <div style={{ ...glass, textAlign:"center", padding:"40px 20px" }}>
                <div style={{ fontSize:40, marginBottom:10 }}>🔗</div>
                <div style={{ color:T.text2, fontSize:13 }}>أضف قطعتين أو أكثر في تجميعتك</div>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { label:"المعالج ↔ اللوحة الأم", ok: !build.CPU||!build.Motherboard||(getPart(build.CPU)?.brand==="AMD")===(getPart(build.Motherboard)?.socket==="AM5"), msg:"السوكيت غير متوافق!" },
                  { label:"الرام ↔ اللوحة الأم", ok: !build.RAM||!build.Motherboard||(getPart(build.Motherboard)?.specs?.includes("DDR5"))===(getPart(build.RAM)?.specs?.includes("DDR5")), msg:"نوع الرام غير متوافق!" },
                  { label:"مزود الطاقة كافٍ", ok: !build.PSU||parseInt(getPart(build.PSU)?.specs||"0")>=watt, msg:"الباور قد لا يكفي!" },
                  { label:"القطع الأساسية موجودة", ok:["GPU","CPU","RAM","Motherboard","SSD","PSU"].every(t=>build[t]), msg:"بعض القطع الأساسية ناقصة" },
                ].map((c,i) => (
                  <div key={i} style={{ ...glass, borderColor:c.ok?"#22c55e44":"#ef444444", padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ fontWeight:700, fontSize:13, color:T.white }}>{c.label}</div>
                      {!c.ok && <div style={{ fontSize:11, color:"#ef4444", marginTop:3 }}>⚠️ {c.msg}</div>}
                    </div>
                    <span style={{ fontSize:22 }}>{c.ok?"✅":"❌"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* POWER */}
        {page === "power" && (
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:T.white, marginBottom:6 }}>⚡ حساب الطاقة</h2>
            <p style={{ fontSize:12, color:T.text3, marginBottom:16 }}>حساب تقريبي لاستهلاك الطاقة</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
              {[...buildList, { name:"باقي القطع", watt:80, type:"Other" }].map((p,i) => (
                <div key={i} style={{ ...glass, padding:"11px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontSize:13, color:T.white }}>{typeIcons[p.type]||"🔌"} {p.name}</span>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    <div style={{ background:`${T.neon}10`, borderRadius:3, height:4, width:70 }}><div style={{ width:`${Math.min(100,p.watt/5)}%`, height:"100%", background:T.yellow, borderRadius:3 }} /></div>
                    <span style={{ fontWeight:700, color:T.yellow, fontSize:13, direction:"ltr", minWidth:45, textAlign:"right" }}>{p.watt}W</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ ...glass, padding:"20px", textAlign:"center", borderColor:`${T.yellow}33` }}>
              <div style={{ fontSize:11, color:T.text3, marginBottom:6 }}>إجمالي الاستهلاك</div>
              <div style={{ fontSize:44, fontWeight:900, color:T.yellow, direction:"ltr", textShadow:`0 0 30px ${T.yellow}66`, marginBottom:6 }}>{watt}W</div>
              <div style={{ fontSize:12, color:T.text2, marginBottom:10 }}>PSU الموصى به</div>
              <div style={{ fontSize:24, fontWeight:900, color:T.neon }}>{recommendPSU(watt)}</div>
            </div>
          </div>
        )}

        {/* COMPARE */}
        {page === "compare" && (
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:T.white, marginBottom:6 }}>⚖️ مقارنة القطع</h2>
            <p style={{ fontSize:12, color:T.text3, marginBottom:16 }}>اضغط ⚖️ على قطعتين في قائمة القطع</p>
            {compare.length < 2 ? (
              <div style={{ ...glass, textAlign:"center", padding:"50px 20px" }}>
                <div style={{ fontSize:42, marginBottom:10 }}>⚖️</div>
                <div style={{ color:T.text2, fontSize:13, marginBottom:16 }}>اختر {2-compare.length} قطعة للمقارنة</div>
                <button onClick={() => setPage("parts")} style={{ background:`linear-gradient(135deg,${T.neon},${T.blue})`, border:"none", borderRadius:11, padding:"10px 22px", color:"#000", fontWeight:700, cursor:"pointer", fontSize:13 }}>تصفح القطع</button>
                {compare[0] && <div style={{ marginTop:12, fontSize:12, color:T.text2 }}>✅ {compare[0].name}</div>}
              </div>
            ) : (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  {compare.map((p,i) => (
                    <div key={p.id} style={{ ...glass, borderColor:typeColors[p.type]+"55", padding:14 }}>
                      <div style={{ fontSize:9, color:typeColors[p.type], fontWeight:700, marginBottom:4 }}>{i===0?"الأول":"الثاني"}</div>
                      <div style={{ fontSize:26, marginBottom:6 }}>{typeIcons[p.type]}</div>
                      <div style={{ fontWeight:800, fontSize:13, color:T.white, marginBottom:4 }}>{p.name}</div>
                      <div style={{ fontSize:10, color:T.text3, marginBottom:8 }}>{p.specs}</div>
                      <ScoreRing score={p.score} color={typeColors[p.type]} size={52} />
                      <div style={{ fontWeight:900, fontSize:18, color:typeColors[p.type], marginTop:6, direction:"ltr" }}>{p.priceSAR.toLocaleString()} ر.س</div>
                    </div>
                  ))}
                </div>
                <div style={{ ...glass, overflow:"hidden", marginBottom:12 }}>
                  {[["الاسم",compare[0].name,compare[1].name,null],["الشركة",compare[0].brand,compare[1].brand,null],["السلسلة",compare[0].series,compare[1].series,null],["المواصفات",compare[0].specs,compare[1].specs,null],["السعر",`${compare[0].priceSAR.toLocaleString()} ر.س`,`${compare[1].priceSAR.toLocaleString()} ر.س`,"price"],["الأداء",`${compare[0].score}%`,`${compare[1].score}%`,"score"]].map(([l,v1,v2,cmp],i) => (
                    <div key={l} style={{ display:"grid", gridTemplateColumns:"0.8fr 1fr 1fr", borderBottom:`1px solid ${T.glassBorder}`, background:i%2===0?`${T.neon}04`:"transparent" }}>
                      <div style={{ padding:"10px 12px", fontSize:10, color:T.text3, fontWeight:700 }}>{l}</div>
                      <div style={{ padding:"10px 12px", fontSize:10, fontWeight:700, color:cmp==="price"?(compare[0].priceSAR<=compare[1].priceSAR?T.neon:T.red):cmp==="score"?(compare[0].score>=compare[1].score?T.neon:T.red):T.white }}>{v1}</div>
                      <div style={{ padding:"10px 12px", fontSize:10, fontWeight:700, color:cmp==="price"?(compare[1].priceSAR<=compare[0].priceSAR?T.neon:T.red):cmp==="score"?(compare[1].score>=compare[0].score?T.neon:T.red):T.white }}>{v2}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setCompare([])} style={{ width:"100%", background:T.bg3, border:`1px solid ${T.glassBorder}`, borderRadius:11, padding:"10px", color:T.text2, cursor:"pointer", fontSize:12, fontWeight:700 }}>🔄 مقارنة جديدة</button>
              </div>
            )}
          </div>
        )}

        {/* SMART */}
        {page === "smart" && (
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:T.white, marginBottom:6 }}>🤖 اقتراح ذكي</h2>
            <p style={{ fontSize:12, color:T.text3, marginBottom:20 }}>حدد ميزانيتك واستخدامك</p>
            {(() => {
              const [budget, setBudget] = useState(6000);
              const [usage, setUsage] = useState("gaming");
              return (
                <div>
                  <div style={{ marginBottom:16 }}>
                    <div style={{ fontSize:11, color:T.text3, fontWeight:700, marginBottom:8 }}>💰 الميزانية</div>
                    <input type="range" min={3000} max={25000} step={500} value={budget} onChange={e=>setBudget(+e.target.value)} style={{ width:"100%", accentColor:T.neon, marginBottom:6 }} />
                    <div style={{ fontWeight:900, fontSize:20, color:T.neon, direction:"ltr", textAlign:"center" }}>{budget.toLocaleString()} ر.س</div>
                  </div>
                  <div style={{ marginBottom:20 }}>
                    <div style={{ fontSize:11, color:T.text3, fontWeight:700, marginBottom:8 }}>🎯 الاستخدام</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                      {Object.entries(buildPresets).map(([k,v]) => (
                        <button key={k} onClick={()=>setUsage(k)} style={{ background:usage===k?`${T.neon}20`:T.bg3, border:`1px solid ${usage===k?T.neon:T.glassBorder}`, borderRadius:11, padding:"12px", cursor:"pointer", color:usage===k?T.neon:T.text2, fontWeight:usage===k?700:400, fontSize:13 }}>{v.label}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={()=>{ const preset=buildPresets[usage]; const b={}; Object.entries(preset).forEach(([k,id])=>{ if(k!=="label"){ const p=getPart(id); if(p) b[p.type]=p.id; }}); const t=Object.values(b).reduce((s,id)=>(s+(getPart(id)?.priceSAR||0)),0); if(t<=budget*1.15){ setBuild(b); setPage("build"); }else{ alert(`الميزانية (${budget.toLocaleString()} ر.س) أقل من التجميعة (${t.toLocaleString()} ر.س)\nجرب ميزانية أعلى أو استخدام أبسط`); }}} style={{ width:"100%", background:`linear-gradient(135deg,${T.neon},${T.blue})`, border:"none", borderRadius:13, padding:"14px", color:"#000", fontWeight:900, cursor:"pointer", fontSize:15, boxShadow:T.glow }}>🤖 اقترح التجميعة</button>
                </div>
              );
            })()}
          </div>
        )}

        <div style={{ textAlign:"center", padding:"28px 0 8px", fontSize:10, color:T.text3, letterSpacing:1 }}>PC BUILDER SA · أسعار تقريبية · 2025</div>
      </div>
    </div>
  );
}
