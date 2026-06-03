import { useState, useMemo } from "react";
 
// ===================== THEME =====================
const themes = {
  dark: {
    bg: "#080c14",
    bg2: "#0d1220",
    bg3: "#111827",
    card: "rgba(17,24,39,0.9)",
    border: "rgba(255,255,255,0.07)",
    text: "#f1f5f9",
    text2: "#94a3b8",
    text3: "#475569",
    accent: "#6366f1",
    accent2: "#06b6d4",
    green: "#22c55e",
    red: "#ef4444",
    yellow: "#f59e0b",
  },
  light: {
    bg: "#f8fafc",
    bg2: "#f1f5f9",
    bg3: "#e2e8f0",
    card: "rgba(255,255,255,0.95)",
    border: "rgba(0,0,0,0.08)",
    text: "#0f172a",
    text2: "#475569",
    text3: "#94a3b8",
    accent: "#6366f1",
    accent2: "#0891b2",
    green: "#16a34a",
    red: "#dc2626",
    yellow: "#d97706",
  },
};
 
// ===================== DATA =====================
const allParts = [
  // GPUs
  { id: "rtx5060", type: "GPU", brand: "NVIDIA", name: "RTX 5060", model: "GeForce RTX 5060", specs: "8GB GDDR7 · DLSS 4 · 1080p", priceSAR: 1125, lastUpdate: "2025-06-01", tier: 1, score: 72, tag: "اقتصادي" },
  { id: "rtx5060ti8", type: "GPU", brand: "NVIDIA", name: "RTX 5060 Ti 8GB", model: "GeForce RTX 5060 Ti", specs: "8GB GDDR7 · DLSS 4 · 1080p/1440p", priceSAR: 1425, lastUpdate: "2025-06-01", tier: 2, score: 78, tag: "قيمة جيدة" },
  { id: "rtx5060ti16", type: "GPU", brand: "NVIDIA", name: "RTX 5060 Ti 16GB", model: "GeForce RTX 5060 Ti", specs: "16GB GDDR7 · DLSS 4 · 1440p", priceSAR: 1612, lastUpdate: "2025-06-01", tier: 2, score: 82, tag: "موصى به" },
  { id: "rtx5070", type: "GPU", brand: "NVIDIA", name: "RTX 5070", model: "GeForce RTX 5070", specs: "12GB GDDR7 · DLSS 4 · 1440p/4K", priceSAR: 2060, lastUpdate: "2025-06-01", tier: 3, score: 90, tag: "⭐ الأفضل" },
  { id: "rtx5070ti", type: "GPU", brand: "NVIDIA", name: "RTX 5070 Ti", model: "GeForce RTX 5070 Ti", specs: "16GB GDDR7 · DLSS 4 · 4K", priceSAR: 2810, lastUpdate: "2025-06-01", tier: 3, score: 94, tag: "احترافي" },
  { id: "rtx5080", type: "GPU", brand: "NVIDIA", name: "RTX 5080", model: "GeForce RTX 5080", specs: "16GB GDDR7 · DLSS 4 · 4K Ultra", priceSAR: 3745, lastUpdate: "2025-06-01", tier: 4, score: 97, tag: "فئة عليا" },
  { id: "rtx5090", type: "GPU", brand: "NVIDIA", name: "RTX 5090", model: "GeForce RTX 5090", specs: "32GB GDDR7 · DLSS 4 · 8K", priceSAR: 7495, lastUpdate: "2025-06-01", tier: 4, score: 99, tag: "فلاقشيب" },
  // CPUs
  { id: "i5_14400f", type: "CPU", brand: "Intel", name: "Core i5-14400F", model: "14400F LGA1700", specs: "10 نواة · 4.7GHz · 65W", priceSAR: 700, lastUpdate: "2025-06-01", tier: 1, score: 70, tag: "اقتصادي" },
  { id: "i5_14600k", type: "CPU", brand: "Intel", name: "Core i5-14600K", model: "14600K LGA1700", specs: "14 نواة · 5.3GHz · OC", priceSAR: 900, lastUpdate: "2025-06-01", tier: 2, score: 80, tag: "توازن" },
  { id: "i7_14700k", type: "CPU", brand: "Intel", name: "Core i7-14700K", model: "14700K LGA1700", specs: "20 نواة · 5.6GHz · OC", priceSAR: 1400, lastUpdate: "2025-06-01", tier: 3, score: 88, tag: "محترف" },
  { id: "i9_14900k", type: "CPU", brand: "Intel", name: "Core i9-14900K", model: "14900K LGA1700", specs: "24 نواة · 6.0GHz · OC", priceSAR: 2100, lastUpdate: "2025-06-01", tier: 4, score: 95, tag: "فلاقشيب" },
  { id: "r5_9600x", type: "CPU", brand: "AMD", name: "Ryzen 5 9600X", model: "9600X AM5", specs: "6 نواة · 5.4GHz · 65W", priceSAR: 1050, lastUpdate: "2025-06-01", tier: 2, score: 78, tag: "كفاءة" },
  { id: "r7_9700x", type: "CPU", brand: "AMD", name: "Ryzen 7 9700X", model: "9700X AM5", specs: "8 نواة · 5.5GHz · 65W", priceSAR: 1350, lastUpdate: "2025-06-01", tier: 2, score: 84, tag: "توازن" },
  { id: "r7_9800x3d", type: "CPU", brand: "AMD", name: "Ryzen 7 9800X3D", model: "9800X3D AM5", specs: "8 نواة · 5.7GHz · 3D Cache", priceSAR: 1575, lastUpdate: "2025-06-01", tier: 3, score: 97, tag: "⭐ ملك الألعاب" },
  { id: "r9_9950x", type: "CPU", brand: "AMD", name: "Ryzen 9 9950X", model: "9950X AM5", specs: "16 نواة · 5.7GHz · Workstation", priceSAR: 2440, lastUpdate: "2025-06-01", tier: 4, score: 96, tag: "فلاقشيب" },
  // RAM
  { id: "kingston_16", type: "RAM", brand: "Kingston", name: "FURY Beast 16GB", model: "DDR5-5600", specs: "16GB · DDR5 · 5600MHz", priceSAR: 280, lastUpdate: "2025-06-01", tier: 1, score: 70, tag: "اقتصادي" },
  { id: "corsair_32", type: "RAM", brand: "Corsair", name: "Vengeance 32GB", model: "DDR5-6000", specs: "32GB · DDR5 · 6000MHz", priceSAR: 420, lastUpdate: "2025-06-01", tier: 2, score: 85, tag: "⭐ الأفضل" },
  { id: "gskill_32", type: "RAM", brand: "G.Skill", name: "Trident Z5 32GB", model: "DDR5-6000 RGB", specs: "32GB · DDR5 · 6000MHz · RGB", priceSAR: 490, lastUpdate: "2025-06-01", tier: 2, score: 87, tag: "RGB" },
  { id: "corsair_64", type: "RAM", brand: "Corsair", name: "Vengeance 64GB", model: "DDR5-6000", specs: "64GB · DDR5 · 6000MHz", priceSAR: 850, lastUpdate: "2025-06-01", tier: 3, score: 90, tag: "محترف" },
  // PSU
  { id: "cm_650", type: "PSU", brand: "Cooler Master", name: "MWE Gold 650W", model: "650W 80+ Gold", specs: "650W · 80+ Gold · Semi Modular", priceSAR: 280, lastUpdate: "2025-06-01", tier: 1, score: 72, tag: "اقتصادي" },
  { id: "corsair_750", type: "PSU", brand: "Corsair", name: "RM750e 750W", model: "750W 80+ Gold", specs: "750W · 80+ Gold · Fully Modular · ATX3.0", priceSAR: 380, lastUpdate: "2025-06-01", tier: 2, score: 85, tag: "موصى به" },
  { id: "seasonic_850", type: "PSU", brand: "Seasonic", name: "Focus GX 850W", model: "850W 80+ Gold", specs: "850W · 80+ Gold · Fully Modular · 10yr", priceSAR: 530, lastUpdate: "2025-06-01", tier: 3, score: 93, tag: "⭐ الأفضل" },
  { id: "bequiet_1000", type: "PSU", brand: "be quiet!", name: "Pure Power 13 1000W", model: "1000W 80+ Gold", specs: "1000W · 80+ Gold · Fully Modular · ATX3.1", priceSAR: 650, lastUpdate: "2025-06-01", tier: 4, score: 90, tag: "قوي" },
  // Motherboards
  { id: "msi_b760", type: "Motherboard", brand: "MSI", name: "PRO B760M-P DDR5", model: "B760 LGA1700", specs: "B760 · LGA1700 · DDR5 · mATX", priceSAR: 659, lastUpdate: "2025-06-01", tier: 1, score: 72, tag: "اقتصادي" },
  { id: "asus_z790", type: "Motherboard", brand: "ASUS", name: "TUF Gaming Z790-Plus", model: "Z790 LGA1700", specs: "Z790 · LGA1700 · DDR5 · WiFi · ATX", priceSAR: 1629, lastUpdate: "2025-06-01", tier: 3, score: 88, tag: "Gaming" },
  { id: "asus_rog_z790", type: "Motherboard", brand: "ASUS", name: "ROG Strix Z790-F WiFi", model: "Z790 ROG LGA1700", specs: "Z790 · LGA1700 · DDR5 · WiFi 6E · ATX", priceSAR: 2149, lastUpdate: "2025-06-01", tier: 4, score: 95, tag: "ROG" },
  { id: "gigabyte_b850", type: "Motherboard", brand: "Gigabyte", name: "B850 Aorus Elite WiFi7", model: "B850 AM5", specs: "B850 · AM5 · DDR5 · WiFi7 · ATX", priceSAR: 935, lastUpdate: "2025-06-01", tier: 2, score: 85, tag: "⭐ أفضل قيمة" },
  { id: "asus_x870", type: "Motherboard", brand: "ASUS", name: "PRIME X870-P WiFi", model: "X870 AM5", specs: "X870 · AM5 · DDR5 · WiFi 6E · ATX", priceSAR: 1499, lastUpdate: "2025-06-01", tier: 3, score: 88, tag: "X870" },
];
 
const partTypes = ["الكل", "GPU", "CPU", "RAM", "PSU", "Motherboard"];
const typeIcons = { GPU: "🖥️", CPU: "⚡", RAM: "💾", PSU: "🔌", Motherboard: "🔧" };
const typeColors = { GPU: "#8b5cf6", CPU: "#ef4444", RAM: "#f59e0b", PSU: "#22c55e", Motherboard: "#3b82f6" };
 
// ===================== MAIN APP =====================
export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [page, setPage] = useState("home"); // home | parts | build | compare
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("الكل");
  const [sortBy, setSortBy] = useState("score");
  const [buildParts, setBuildParts] = useState({});
  const [compareItems, setCompareItems] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
 
  const t = isDark ? themes.dark : themes.light;
 
  const filteredParts = useMemo(() => {
    return allParts
      .filter(p => filterType === "الكل" || p.type === filterType)
      .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()) || p.specs.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        if (sortBy === "price_asc") return a.priceSAR - b.priceSAR;
        if (sortBy === "price_desc") return b.priceSAR - a.priceSAR;
        return 0;
      });
  }, [search, filterType, sortBy]);
 
  const buildTotal = Object.values(buildParts).reduce((sum, p) => sum + p.priceSAR, 0);
  const buildList = Object.values(buildParts);
 
  const addToBuild = (part) => setBuildParts(prev => ({ ...prev, [part.type]: part }));
  const removeFromBuild = (type) => setBuildParts(prev => { const n = { ...prev }; delete n[type]; return n; });
  const toggleCompare = (part) => {
    setCompareItems(prev => prev.find(p => p.id === part.id) ? prev.filter(p => p.id !== part.id) : prev.length < 2 ? [...prev, part] : [prev[1], part]);
  };
 
  const shareBuild = () => {
    const text = buildList.map(p => `${p.name}: ${p.priceSAR} ر.س`).join("\n") + `\nالإجمالي: ${buildTotal.toLocaleString()} ر.س`;
    navigator.clipboard?.writeText(text);
    alert("تم نسخ التجميعة! 📋");
  };
 
  const s = (obj) => ({ ...obj });
 
  // Pie chart data
  const pieData = buildList.map(p => ({ label: p.type, value: p.priceSAR, color: typeColors[p.type] || "#666" }));
  const pieTotal = pieData.reduce((s, d) => s + d.value, 0);
 
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Tajawal', sans-serif", direction: "rtl", color: t.text, transition: "all 0.3s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:6px;}::-webkit-scrollbar-track{background:${t.bg};}::-webkit-scrollbar-thumb{background:${t.accent};border-radius:3px;}button{font-family:'Tajawal',sans-serif;}`}</style>
 
      {/* NAVBAR */}
      <nav style={{ background: t.bg2, borderBottom: `1px solid ${t.border}`, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(10px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🖥️</div>
          <span style={{ fontWeight: 900, fontSize: 15, background: `linear-gradient(90deg,${t.accent},${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PC Builder SA</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[["home","🏠","الرئيسية"],["parts","📋","القطع"],["build","🔧","تجميعتي"],["compare","⚖️","مقارنة"]].map(([p,ic,lb]) => (
            <button key={p} onClick={() => setPage(p)} style={{ background: page === p ? `linear-gradient(135deg,${t.accent}22,${t.accent2}11)` : "none", border: page === p ? `1px solid ${t.accent}44` : "1px solid transparent", borderRadius: 8, padding: "5px 10px", color: page === p ? t.accent : t.text2, cursor: "pointer", fontSize: 12, fontWeight: page === p ? 700 : 400, display: "flex", alignItems: "center", gap: 4 }}>
              <span>{ic}</span><span style={{ display: window.innerWidth > 500 ? "inline" : "none" }}>{lb}</span>
              {p === "build" && buildList.length > 0 && <span style={{ background: t.accent, color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>{buildList.length}</span>}
            </button>
          ))}
          <button onClick={() => setIsDark(!isDark)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 10px", color: t.text2, cursor: "pointer", fontSize: 14 }}>{isDark ? "☀️" : "🌙"}</button>
        </div>
      </nav>
 
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
 
        {/* HOME */}
        {page === "home" && (
          <div>
            <div style={{ textAlign: "center", padding: "40px 0 32px" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🖥️</div>
              <h1 style={{ fontSize: "clamp(26px,6vw,42px)", fontWeight: 900, background: `linear-gradient(90deg,${t.text},${t.accent},${t.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>مساعد تجميع الكمبيوتر</h1>
              <p style={{ color: t.text2, fontSize: 14 }}>PC Builder Saudi Arabia · أسعار محدّثة · RTX 50 Series · Ryzen 9000</p>
            </div>
 
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
              <button onClick={() => setPage("parts")} style={{ background: `linear-gradient(135deg,${t.accent}22,${t.accent2}11)`, border: `1.5px solid ${t.accent}44`, borderRadius: 20, padding: "28px 20px", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: t.text, marginBottom: 6 }}>تصفح القطع</div>
                <div style={{ fontSize: 12, color: t.text2 }}>GPU · CPU · RAM · PSU · Motherboard</div>
                <div style={{ marginTop: 14, background: `linear-gradient(135deg,${t.accent},${t.accent2})`, borderRadius: 10, padding: "8px 16px", color: "#fff", fontWeight: 700, fontSize: 13 }}>ابدأ التصفح</div>
              </button>
              <button onClick={() => setPage("build")} style={{ background: `linear-gradient(135deg,#22c55e22,#06b6d411)`, border: `1.5px solid #22c55e44`, borderRadius: 20, padding: "28px 20px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🚀</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: t.text, marginBottom: 6 }}>تجميع كمبيوتر</div>
                <div style={{ fontSize: 12, color: t.text2 }}>اختر قطعك وشوف السعر الكلي</div>
                <div style={{ marginTop: 14, background: "linear-gradient(135deg,#22c55e,#16a34a)", borderRadius: 10, padding: "8px 16px", color: "#fff", fontWeight: 700, fontSize: 13 }}>ابدأ التجميع</div>
              </button>
            </div>
 
            {/* Quick stats */}
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: t.text3, marginBottom: 12, fontWeight: 700 }}>📊 إحصائيات سريعة</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                {[["GPU","7",t.accent],["CPU","8","#ef4444"],["RAM","4","#f59e0b"],["PSU","4","#22c55e"]].map(([type,count,color]) => (
                  <div key={type} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color }}>{count}</div>
                    <div style={{ fontSize: 11, color: t.text3 }}>{type}</div>
                  </div>
                ))}
              </div>
            </div>
 
            {/* Featured */}
            <div style={{ fontSize: 13, fontWeight: 700, color: t.text2, marginBottom: 10 }}>⭐ أبرز القطع</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {allParts.filter(p => p.tag.includes("⭐")).map(p => (
                <div key={p.id} onClick={() => { setPage("parts"); setFilterType(p.type); }} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 22 }}>{typeIcons[p.type]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: t.text }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: t.text3 }}>{p.specs}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 800, fontSize: 15, color: typeColors[p.type] }}>~{p.priceSAR.toLocaleString()} ر.س</div>
                    <div style={{ fontSize: 10, color: t.text3 }}>أداء {p.score}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* PARTS PAGE */}
        {page === "parts" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 14, color: t.text }}>📋 قائمة القطع</h2>
 
              {/* Search */}
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 ابحث بالاسم أو المواصفات..." style={{ width: "100%", background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "11px 16px", color: t.text, fontSize: 13, marginBottom: 10, outline: "none" }} />
 
              {/* Filters */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {partTypes.map(tp => (
                  <button key={tp} onClick={() => setFilterType(tp)} style={{ background: filterType === tp ? `linear-gradient(135deg,${t.accent},${t.accent2})` : t.card, border: `1px solid ${filterType === tp ? t.accent : t.border}`, borderRadius: 8, padding: "5px 12px", color: filterType === tp ? "#fff" : t.text2, cursor: "pointer", fontSize: 12, fontWeight: filterType === tp ? 700 : 400 }}>
                    {tp !== "الكل" && typeIcons[tp]} {tp}
                  </button>
                ))}
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 10px", color: t.text2, fontSize: 12, cursor: "pointer", marginRight: "auto" }}>
                  <option value="score">ترتيب: الأداء</option>
                  <option value="price_asc">السعر: الأقل</option>
                  <option value="price_desc">السعر: الأعلى</option>
                </select>
              </div>
 
              <div style={{ fontSize: 11, color: t.text3, marginBottom: 12 }}>{filteredParts.length} قطعة</div>
            </div>
 
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredParts.map(part => (
                <div key={part.id} style={{ background: t.card, border: `1px solid ${compareItems.find(p => p.id === part.id) ? t.accent : t.border}`, borderRadius: 16, padding: "14px 16px", transition: "all 0.2s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flex: 1 }}>
                      <div style={{ fontSize: 24, marginTop: 2 }}>{typeIcons[part.type]}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: t.text }}>{part.name}</span>
                          <span style={{ background: typeColors[part.type] + "22", border: `1px solid ${typeColors[part.type]}44`, borderRadius: 6, padding: "1px 7px", fontSize: 10, color: typeColors[part.type] }}>{part.tag}</span>
                        </div>
                        <div style={{ fontSize: 11, color: t.text3, marginTop: 2 }}>{part.brand} · {part.model}</div>
                        <div style={{ fontSize: 11, color: t.text2, marginTop: 3 }}>{part.specs}</div>
                        {/* Score bar */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                          <div style={{ flex: 1, background: t.bg3, borderRadius: 4, height: 4, overflow: "hidden" }}>
                            <div style={{ width: `${part.score}%`, height: "100%", background: `linear-gradient(90deg,${typeColors[part.type]},${t.accent2})`, borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: 10, color: t.text3 }}>{part.score}%</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "left", minWidth: 90 }}>
                      <div style={{ fontWeight: 900, fontSize: 16, color: typeColors[part.type] }}>~{part.priceSAR.toLocaleString()}</div>
                      <div style={{ fontSize: 10, color: t.text3 }}>ريال سعودي</div>
                      <div style={{ fontSize: 9, color: t.text3, marginTop: 2 }}>📅 {part.lastUpdate}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    <button onClick={() => addToBuild(part)} style={{ flex: 1, background: buildParts[part.type]?.id === part.id ? "#22c55e22" : t.bg3, border: `1px solid ${buildParts[part.type]?.id === part.id ? "#22c55e" : t.border}`, borderRadius: 8, padding: "7px", color: buildParts[part.type]?.id === part.id ? "#22c55e" : t.text2, cursor: "pointer", fontSize: 11, fontWeight: 700 }}>
                      {buildParts[part.type]?.id === part.id ? "✅ في تجميعتك" : "➕ أضف للتجميعة"}
                    </button>
                    <button onClick={() => toggleCompare(part)} style={{ background: compareItems.find(p => p.id === part.id) ? t.accent + "22" : t.bg3, border: `1px solid ${compareItems.find(p => p.id === part.id) ? t.accent : t.border}`, borderRadius: 8, padding: "7px 12px", color: compareItems.find(p => p.id === part.id) ? t.accent : t.text3, cursor: "pointer", fontSize: 11 }}>
                      ⚖️ قارن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* BUILD PAGE */}
        {page === "build" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: t.text }}>🔧 تجميعتي</h2>
              {buildList.length > 0 && <button onClick={shareBuild} style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, border: "none", borderRadius: 10, padding: "8px 14px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>📋 نسخ التجميعة</button>}
            </div>
 
            {buildList.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", background: t.card, borderRadius: 20, border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: t.text, marginBottom: 8 }}>تجميعتك فاضية</div>
                <div style={{ color: t.text2, fontSize: 13, marginBottom: 20 }}>روح لقائمة القطع وأضف ما تبي</div>
                <button onClick={() => setPage("parts")} style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, border: "none", borderRadius: 12, padding: "11px 24px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>تصفح القطع</button>
              </div>
            ) : (
              <>
                {buildList.map(part => (
                  <div key={part.id} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ fontSize: 22 }}>{typeIcons[part.type]}</div>
                      <div>
                        <div style={{ fontSize: 10, color: typeColors[part.type], fontWeight: 700 }}>{part.type}</div>
                        <div style={{ fontWeight: 700, fontSize: 13, color: t.text }}>{part.name}</div>
                        <div style={{ fontSize: 11, color: t.text3 }}>{part.specs}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: typeColors[part.type] }}>{part.priceSAR.toLocaleString()} ر.س</div>
                      <button onClick={() => removeFromBuild(part.type)} style={{ background: "#ef444422", border: "1px solid #ef444444", borderRadius: 7, padding: "4px 8px", color: "#ef4444", cursor: "pointer", fontSize: 12 }}>✕</button>
                    </div>
                  </div>
                ))}
 
                {/* Total */}
                <div style={{ background: `linear-gradient(135deg,${t.accent}22,${t.accent2}11)`, border: `1.5px solid ${t.accent}44`, borderRadius: 16, padding: "18px 20px", marginTop: 12, marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: t.text }}>💰 السعر الإجمالي</span>
                    <span style={{ fontWeight: 900, fontSize: 24, color: t.accent }}>~{buildTotal.toLocaleString()} ر.س</span>
                  </div>
                  {/* Simple pie */}
                  {pieData.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, color: t.text3, marginBottom: 8 }}>توزيع الميزانية</div>
                      {pieData.map(d => (
                        <div key={d.label} style={{ marginBottom: 6 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: t.text2, marginBottom: 3 }}>
                            <span>{typeIcons[d.label]} {d.label}</span>
                            <span style={{ color: d.color }}>{Math.round(d.value / pieTotal * 100)}% · {d.value.toLocaleString()} ر.س</span>
                          </div>
                          <div style={{ background: t.bg3, borderRadius: 4, height: 6, overflow: "hidden" }}>
                            <div style={{ width: `${d.value / pieTotal * 100}%`, height: "100%", background: d.color, borderRadius: 4 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
 
                <button onClick={() => setPage("parts")} style={{ width: "100%", background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px", color: t.text2, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>➕ أضف قطعة أخرى</button>
              </>
            )}
          </div>
        )}
 
        {/* COMPARE PAGE */}
        {page === "compare" && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, color: t.text }}>⚖️ مقارنة القطع</h2>
            <p style={{ fontSize: 12, color: t.text3, marginBottom: 16 }}>اختر قطعتين من نفس الفئة للمقارنة — اضغط "قارن" في قائمة القطع</p>
 
            {compareItems.length < 2 ? (
              <div style={{ textAlign: "center", padding: "50px 20px", background: t.card, borderRadius: 20, border: `1px solid ${t.border}` }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>⚖️</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: t.text, marginBottom: 8 }}>اختر {2 - compareItems.length} قطعة للمقارنة</div>
                <div style={{ color: t.text2, fontSize: 12, marginBottom: 20 }}>روح لقائمة القطع واضغط "قارن" على قطعتين</div>
                <button onClick={() => setPage("parts")} style={{ background: `linear-gradient(135deg,${t.accent},${t.accent2})`, border: "none", borderRadius: 12, padding: "11px 24px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>تصفح القطع</button>
                {compareItems.length === 1 && <div style={{ marginTop: 14, background: t.bg2, borderRadius: 12, padding: "12px", fontSize: 13, color: t.text2 }}>✅ تم اختيار: <strong style={{ color: t.text }}>{compareItems[0].name}</strong></div>}
              </div>
            ) : (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  {compareItems.map((part, i) => (
                    <div key={part.id} style={{ background: t.card, border: `1.5px solid ${typeColors[part.type]}55`, borderRadius: 16, padding: "16px" }}>
                      <div style={{ fontSize: 10, color: typeColors[part.type], fontWeight: 700, marginBottom: 4 }}>{i === 0 ? "القطعة الأولى" : "القطعة الثانية"}</div>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>{typeIcons[part.type]}</div>
                      <div style={{ fontWeight: 800, fontSize: 14, color: t.text, marginBottom: 4 }}>{part.name}</div>
                      <div style={{ fontSize: 11, color: t.text3, marginBottom: 8 }}>{part.specs}</div>
                      <div style={{ fontWeight: 900, fontSize: 20, color: typeColors[part.type] }}>{part.priceSAR.toLocaleString()} ر.س</div>
                    </div>
                  ))}
                </div>
 
                {/* Comparison table */}
                <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, overflow: "hidden" }}>
                  {[
                    ["الاسم", compareItems[0].name, compareItems[1].name, null],
                    ["الشركة", compareItems[0].brand, compareItems[1].brand, null],
                    ["النوع", compareItems[0].type, compareItems[1].type, null],
                    ["المواصفات", compareItems[0].specs, compareItems[1].specs, null],
                    ["السعر", `${compareItems[0].priceSAR.toLocaleString()} ر.س`, `${compareItems[1].priceSAR.toLocaleString()} ر.س`, "price"],
                    ["الأداء", `${compareItems[0].score}%`, `${compareItems[1].score}%`, "score"],
                  ].map(([label, v1, v2, compare], i) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: `1px solid ${t.border}`, background: i % 2 === 0 ? t.bg2 + "44" : "transparent" }}>
                      <div style={{ padding: "10px 14px", fontSize: 11, color: t.text3, fontWeight: 700 }}>{label}</div>
                      <div style={{ padding: "10px 14px", fontSize: 11, color: compare === "price" ? (compareItems[0].priceSAR <= compareItems[1].priceSAR ? t.green : t.red) : compare === "score" ? (compareItems[0].score >= compareItems[1].score ? t.green : t.red) : t.text, fontWeight: 700 }}>{v1}</div>
                      <div style={{ padding: "10px 14px", fontSize: 11, color: compare === "price" ? (compareItems[1].priceSAR <= compareItems[0].priceSAR ? t.green : t.red) : compare === "score" ? (compareItems[1].score >= compareItems[0].score ? t.green : t.red) : t.text, fontWeight: 700 }}>{v2}</div>
                    </div>
                  ))}
                </div>
 
                <button onClick={() => setCompareItems([])} style={{ width: "100%", marginTop: 12, background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "11px", color: t.text2, cursor: "pointer", fontSize: 12, fontWeight: 700 }}>🔄 مقارنة جديدة</button>
              </div>
            )}
          </div>
        )}
 
        {/* Footer */}
        <div style={{ textAlign: "center", padding: "24px 0 8px", fontSize: 11, color: t.text3 }}>
          💡 الأسعار تقريبية بالريال السعودي · آخر تحديث: يونيو 2025
        </div>
      </div>
    </div>
  );
}
