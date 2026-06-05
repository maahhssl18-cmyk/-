
import { useState, useMemo } from "react";
 
const partsData = [
  // GPU
  { id:"rtx5090", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5090", specs:"32GB GDDR7 · 8K · DLSS 4", priceSAR:7495, watt:450, score:99, tag:"Flagship", img:"https://images.unsplash.com/photo-1591405351990-4726e331f141?w=400&q=80", color:"#a855f7" },
  { id:"rtx5080", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5080", specs:"16GB GDDR7 · 4K Ultra · DLSS 4", priceSAR:3745, watt:320, score:97, tag:"Elite", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", color:"#8b5cf6" },
  { id:"rtx5070", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5070", specs:"12GB GDDR7 · 1440p/4K · DLSS 4", priceSAR:2060, watt:200, score:90, tag:"⭐ Top Pick", img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80", color:"#6366f1" },
  { id:"rtx5060ti", type:"GPU", series:"RTX 50 Series", brand:"NVIDIA", name:"RTX 5060 Ti 16GB", specs:"16GB GDDR7 · 1440p · DLSS 4", priceSAR:1612, watt:165, score:83, tag:"Best Value", img:"https://images.unsplash.com/photo-1591405351990-4726e331f141?w=400&q=80", color:"#3b82f6" },
  { id:"rtx4070", type:"GPU", series:"RTX 40 Series", brand:"NVIDIA", name:"RTX 4070", specs:"12GB GDDR6 · 1440p · DLSS 3", priceSAR:1650, watt:200, score:82, tag:"Mid", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", color:"#06b6d4" },
  { id:"rx7900xtx", type:"GPU", series:"RX 7000 Series", brand:"AMD", name:"RX 7900 XTX", specs:"24GB GDDR6 · 4K · FSR 3", priceSAR:3200, watt:355, score:94, tag:"AMD Elite", img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80", color:"#ef4444" },
  // CPU
  { id:"r7_9800x3d", type:"CPU", series:"AMD Ryzen 9000", brand:"AMD", name:"Ryzen 7 9800X3D", specs:"8 نواة · 5.7GHz · 3D Cache · AM5", priceSAR:1575, watt:120, score:99, tag:"⭐ Gaming King", img:"https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80", color:"#ef4444" },
  { id:"i9_14900k", type:"CPU", series:"Intel 14th Gen", brand:"Intel", name:"Core i9-14900K", specs:"24 نواة · 6.0GHz · LGA1700", priceSAR:2100, watt:125, score:95, tag:"Elite", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", color:"#3b82f6" },
  { id:"r9_9950x", type:"CPU", series:"AMD Ryzen 9000", brand:"AMD", name:"Ryzen 9 9950X", specs:"16 نواة · 5.7GHz · AM5", priceSAR:2440, watt:170, score:96, tag:"Workstation", img:"https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80", color:"#f97316" },
  { id:"i5_14600k", type:"CPU", series:"Intel 14th Gen", brand:"Intel", name:"Core i5-14600K", specs:"14 نواة · 5.3GHz · LGA1700", priceSAR:900, watt:125, score:80, tag:"Best Value", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", color:"#06b6d4" },
  // RAM
  { id:"ram_32_corsair", type:"RAM", series:"DDR5", brand:"Corsair", name:"Vengeance 32GB DDR5", specs:"32GB · DDR5-6000MHz", priceSAR:420, watt:5, score:85, tag:"⭐ Best Pick", img:"https://images.unsplash.com/photo-1562976540-1502c2145851?w=400&q=80", color:"#22c55e" },
  { id:"ram_64", type:"RAM", series:"DDR5", brand:"G.Skill", name:"Trident Z5 64GB RGB", specs:"64GB · DDR5-6000MHz · RGB", priceSAR:850, watt:8, score:90, tag:"Pro", img:"https://images.unsplash.com/photo-1562976540-1502c2145851?w=400&q=80", color:"#a855f7" },
  // PSU
  { id:"psu_850", type:"PSU", series:"80+ Gold", brand:"Seasonic", name:"Focus GX 850W", specs:"850W · 80+ Gold · Fully Modular", priceSAR:530, watt:0, score:93, tag:"⭐ Premium", img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80", color:"#fbbf24" },
  { id:"psu_750", type:"PSU", series:"80+ Gold", brand:"Corsair", name:"RM750e 750W", specs:"750W · 80+ Gold · Full Modular", priceSAR:380, watt:0, score:85, tag:"Best Value", img:"https://images.unsplash.com/photo-1591405351990-4726e331f141?w=400&q=80", color:"#f97316" },
  // Motherboard
  { id:"mb_b850", type:"Motherboard", series:"AMD B850", brand:"Gigabyte", name:"B850 Aorus Elite WiFi7", specs:"B850 · AM5 · DDR5 · WiFi7", priceSAR:935, watt:30, score:85, tag:"⭐ Best AMD", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", color:"#ef4444" },
  { id:"mb_z790", type:"Motherboard", series:"Intel Z790", brand:"ASUS", name:"ROG Strix Z790-F WiFi", specs:"Z790 · LGA1700 · DDR5 · WiFi6E", priceSAR:2149, watt:30, score:94, tag:"ROG", img:"https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&q=80", color:"#3b82f6" },
  // SSD
  { id:"ssd_samsung", type:"SSD", series:"NVMe Gen4", brand:"Samsung", name:"980 PRO 1TB NVMe", specs:"1TB · PCIe 4.0 · 7000MB/s", priceSAR:350, watt:6, score:88, tag:"⭐ Best Pick", img:"https://images.unsplash.com/photo-1562976540-1502c2145851?w=400&q=80", color:"#06b6d4" },
  // Cooler
  { id:"cool_corsair360", type:"Cooler", series:"AIO 360mm", brand:"Corsair", name:"iCUE H150i 360mm", specs:"AIO · 360mm · RGB · Premium", priceSAR:580, watt:0, score:93, tag:"⭐ Premium", img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80", color:"#ec4899" },
  // Case
  { id:"case_lianli", type:"Case", series:"Mid Tower", brand:"Lian Li", name:"O11 Dynamic Mid Tower", specs:"Mid Tower · ATX · Dual Chamber", priceSAR:600, watt:0, score:92, tag:"⭐ Premium", img:"https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80", color:"#64748b" },
];
 
const types = ["الكل","GPU","CPU","RAM","PSU","Motherboard","SSD","Cooler","Case"];
const typeIcons = { GPU:"🎮", CPU:"⚡", RAM:"💾", PSU:"🔌", Motherboard:"🔧", SSD:"💿", Cooler:"❄️", Case:"📦" };
 
async function askAI(partName, partSpecs) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `اشرح لي هذه القطعة بشكل مبسط بالعربي في 3 نقاط فقط:\nالقطعة: ${partName}\nالمواصفات: ${partSpecs}\nاكتب: 1. وظيفتها 2. من يحتاجها 3. هل تستحق سعرها؟`
      }]
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "عذراً، حدث خطأ في الاتصال بالـ AI";
}
 
export default function App() {
  const [filter, setFilter] = useState("الكل");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [build, setBuild] = useState({});
 
  const featured = partsData.filter(p => p.tag.includes("⭐")).slice(0, 3);
  const trending = partsData.slice(0, 6);
 
  const filtered = useMemo(() =>
    partsData
      .filter(p => filter === "الكل" || p.type === filter)
      .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())),
    [filter, search]
  );
 
  const openPart = async (part) => {
    setSelected(part);
    setAiText("");
    setAiLoading(true);
    try {
      const text = await askAI(part.name, part.specs);
      setAiText(text);
    } catch {
      setAiText("⚠️ تعذر الاتصال بالـ AI حالياً");
    }
    setAiLoading(false);
  };
 
  const buildTotal = Object.values(build).reduce((s, id) => s + (partsData.find(p => p.id === id)?.priceSAR || 0), 0);
 
  return (
    <div style={{ minHeight:"100vh", background:"#1a1a2e", color:"#fff", fontFamily:"'Tajawal',sans-serif", direction:"rtl" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:#7c3aed44;border-radius:2px;}
        .card:hover{transform:translateY(-4px);transition:transform 0.2s;}
        .card{transition:transform 0.2s;}
      `}</style>
 
      {/* NAVBAR */}
      <nav style={{ background:"#16213e", borderBottom:"1px solid #0f3460", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:60, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <div style={{ fontWeight:900, fontSize:18, color:"#7c3aed", letterSpacing:1 }}>🖥️ PC BUILDER SA</div>
          <div style={{ display:"flex", gap:4 }}>
            {["الرئيسية","القطع","تجميعتي"].map((lb,i) => (
              <button key={lb} onClick={() => {}} style={{ background:"none", border:"none", color:"#94a3b8", cursor:"pointer", padding:"6px 12px", fontSize:13, fontWeight:600, borderBottom: i===0?"2px solid #7c3aed":"2px solid transparent" }}>{lb}</button>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ابحث عن قطعة..." style={{ background:"#0f3460", border:"1px solid #1e4080", borderRadius:8, padding:"7px 14px", color:"#fff", fontSize:12, outline:"none", width:200 }} />
          {buildTotal > 0 && <div style={{ background:"#7c3aed", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700 }}>🛒 {buildTotal.toLocaleString()} ر.س</div>}
        </div>
      </nav>
 
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 20px" }}>
 
        {/* HERO BANNER */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, padding:"20px 0 24px" }}>
          {featured.map((p, i) => (
            <div key={p.id} className="card" onClick={() => openPart(p)} style={{ borderRadius:12, overflow:"hidden", cursor:"pointer", position:"relative", height:220, background:`linear-gradient(135deg, ${p.color}44, #1a1a2e)` }}>
              <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.4, position:"absolute", inset:0 }} onError={e=>{e.target.style.display='none'}} />
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top, ${p.color}88, transparent)` }} />
              <div style={{ position:"absolute", bottom:0, right:0, padding:16 }}>
                <div style={{ display:"flex", gap:6, marginBottom:6, flexWrap:"wrap" }}>
                  <span style={{ background:p.color, color:"#fff", borderRadius:4, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{p.type}</span>
                  <span style={{ background:"rgba(0,0,0,0.5)", color:"#fff", borderRadius:4, padding:"2px 8px", fontSize:10 }}>{p.tag}</span>
                </div>
                <div style={{ fontWeight:900, fontSize:16, color:"#fff", textShadow:"0 2px 8px rgba(0,0,0,0.8)" }}>{p.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginTop:3 }}>{p.specs}</div>
                <div style={{ fontSize:15, fontWeight:900, color:p.color, marginTop:6, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</div>
              </div>
            </div>
          ))}
        </div>
 
        {/* FILTER TABS */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16, borderBottom:"1px solid #0f3460", paddingBottom:12 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ background:filter===t?"#7c3aed":"#16213e", border:`1px solid ${filter===t?"#7c3aed":"#0f3460"}`, borderRadius:8, padding:"6px 14px", color:filter===t?"#fff":"#94a3b8", cursor:"pointer", fontSize:12, fontWeight:filter===t?700:400 }}>
              {t !== "الكل" && typeIcons[t]} {t}
            </button>
          ))}
        </div>
 
        {/* TRENDING SECTION */}
        {filter === "الكل" && !search && (
          <div style={{ marginBottom:28 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <h2 style={{ fontSize:20, fontWeight:800, color:"#e2e8f0" }}>🔥 الأكثر طلباً</h2>
              <span style={{ fontSize:12, color:"#7c3aed", cursor:"pointer" }}>شاهد المزيد ←</span>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
              {trending.map(p => (
                <div key={p.id} className="card" onClick={() => openPart(p)} style={{ background:"#16213e", border:"1px solid #0f3460", borderRadius:12, overflow:"hidden", cursor:"pointer" }}>
                  <div style={{ height:140, background:`linear-gradient(135deg,${p.color}33,#16213e)`, position:"relative", overflow:"hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.5 }} onError={e=>{e.target.style.display='none'}} />
                    <div style={{ position:"absolute", top:8, right:8, background:p.color, borderRadius:4, padding:"1px 6px", fontSize:9, fontWeight:700, color:"#fff" }}>{p.type}</div>
                  </div>
                  <div style={{ padding:"10px 12px" }}>
                    <div style={{ fontWeight:700, fontSize:13, color:"#e2e8f0", marginBottom:2 }}>{p.name}</div>
                    <div style={{ fontSize:10, color:"#64748b", marginBottom:6 }}>{p.brand} · {p.series}</div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontWeight:900, fontSize:13, color:p.color, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</span>
                      <span style={{ fontSize:10, background:"#0f3460", borderRadius:4, padding:"2px 6px", color:"#94a3b8" }}>⭐ {p.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* ALL PARTS GRID */}
        <div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <h2 style={{ fontSize:18, fontWeight:800, color:"#e2e8f0" }}>
              {filter === "الكل" ? "📋 جميع القطع" : `${typeIcons[filter]} ${filter}`}
            </h2>
            <span style={{ fontSize:11, color:"#64748b" }}>{filtered.length} قطعة</span>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12, marginBottom:40 }}>
            {filtered.map(p => (
              <div key={p.id} className="card" onClick={() => openPart(p)} style={{ background:"#16213e", border:`1px solid ${build[p.type]===p.id?"#22c55e":"#0f3460"}`, borderRadius:12, overflow:"hidden", cursor:"pointer" }}>
                <div style={{ height:150, background:`linear-gradient(135deg,${p.color}33,#0f3460)`, position:"relative", overflow:"hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.45, mixBlendMode:"luminosity" }} onError={e=>{e.target.style.display='none'}} />
                  <div style={{ position:"absolute", top:0, left:0, right:0, bottom:0, background:`linear-gradient(to bottom, transparent 40%, #16213e)` }} />
                  <div style={{ position:"absolute", top:8, right:8, display:"flex", flexDirection:"column", gap:4 }}>
                    <span style={{ background:p.color, borderRadius:4, padding:"1px 6px", fontSize:9, fontWeight:700, color:"#fff" }}>{p.type}</span>
                    {p.tag.includes("⭐") && <span style={{ background:"#fbbf24", borderRadius:4, padding:"1px 6px", fontSize:9, fontWeight:700, color:"#000" }}>{p.tag}</span>}
                  </div>
                  <div style={{ position:"absolute", bottom:6, left:8, fontSize:22, fontWeight:900, color:p.color, direction:"ltr" }}>{p.score}</div>
                </div>
                <div style={{ padding:"10px 12px" }}>
                  <div style={{ fontSize:10, color:"#64748b", marginBottom:3 }}>{p.brand} · {p.series}</div>
                  <div style={{ fontWeight:800, fontSize:13, color:"#e2e8f0", marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:10, color:"#475569", marginBottom:8 }}>{p.specs}</div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontWeight:900, fontSize:14, color:p.color, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</span>
                    <button onClick={e=>{ e.stopPropagation(); setBuild(prev=>({...prev,[p.type]:p.id})); }} style={{ background:build[p.type]===p.id?"#22c55e22":"#0f3460", border:`1px solid ${build[p.type]===p.id?"#22c55e":"#1e4080"}`, borderRadius:6, padding:"4px 8px", color:build[p.type]===p.id?"#22c55e":"#94a3b8", cursor:"pointer", fontSize:11, fontWeight:700 }}>
                      {build[p.type]===p.id?"✅":"➕"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* PART MODAL */}
      {selected && (
        <div onClick={()=>setSelected(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#16213e", border:`1px solid ${selected.color}44`, borderRadius:20, maxWidth:520, width:"100%", overflow:"hidden", maxHeight:"90vh", overflowY:"auto" }}>
            {/* Image header */}
            <div style={{ height:200, background:`linear-gradient(135deg,${selected.color}55,#0f3460)`, position:"relative", overflow:"hidden" }}>
              <img src={selected.img} alt={selected.name} style={{ width:"100%", height:"100%", objectFit:"cover", opacity:0.5 }} onError={e=>{e.target.style.display='none'}} />
              <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom, transparent, #16213e)` }} />
              <button onClick={()=>setSelected(null)} style={{ position:"absolute", top:12, left:12, background:"rgba(0,0,0,0.5)", border:"none", borderRadius:8, padding:"6px 10px", color:"#fff", cursor:"pointer", fontSize:16 }}>✕</button>
              <div style={{ position:"absolute", bottom:16, right:16 }}>
                <div style={{ display:"flex", gap:6, marginBottom:6 }}>
                  <span style={{ background:selected.color, borderRadius:5, padding:"2px 8px", fontSize:10, fontWeight:700, color:"#fff" }}>{selected.type}</span>
                  <span style={{ background:"rgba(0,0,0,0.5)", borderRadius:5, padding:"2px 8px", fontSize:10, color:"#fff" }}>{selected.tag}</span>
                </div>
                <div style={{ fontWeight:900, fontSize:20, color:"#fff", textShadow:"0 2px 10px rgba(0,0,0,0.8)" }}>{selected.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", marginTop:2 }}>{selected.brand} · {selected.series}</div>
              </div>
            </div>
 
            <div style={{ padding:20 }}>
              {/* Specs */}
              <div style={{ background:"#0f3460", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                <div style={{ fontSize:10, color:"#64748b", fontWeight:700, marginBottom:6, letterSpacing:1 }}>المواصفات</div>
                <div style={{ fontSize:13, color:"#e2e8f0" }}>{selected.specs}</div>
                {selected.watt > 0 && <div style={{ fontSize:11, color:"#fbbf24", marginTop:4 }}>⚡ الطاقة: {selected.watt}W</div>}
              </div>
 
              {/* Price & Score */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                <div style={{ background:"#0f3460", borderRadius:10, padding:"12px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"#64748b", marginBottom:4 }}>السعر</div>
                  <div style={{ fontSize:20, fontWeight:900, color:selected.color, direction:"ltr" }}>{selected.priceSAR.toLocaleString()} ر.س</div>
                </div>
                <div style={{ background:"#0f3460", borderRadius:10, padding:"12px", textAlign:"center" }}>
                  <div style={{ fontSize:10, color:"#64748b", marginBottom:4 }}>تقييم الأداء</div>
                  <div style={{ fontSize:20, fontWeight:900, color:selected.color }}>{selected.score}/100</div>
                </div>
              </div>
 
              {/* AI Section */}
              <div style={{ background:`${selected.color}11`, border:`1px solid ${selected.color}33`, borderRadius:12, padding:14, marginBottom:14 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                  <span style={{ fontSize:16 }}>🤖</span>
                  <span style={{ fontWeight:700, fontSize:13, color:"#e2e8f0" }}>شرح الذكاء الاصطناعي</span>
                  {aiLoading && <span style={{ fontSize:11, color:selected.color }}>جاري التحليل...</span>}
                </div>
                {aiLoading ? (
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    {[0,1,2].map(i => <div key={i} style={{ width:8, height:8, background:selected.color, borderRadius:"50%", animation:`pulse 1s ${i*0.2}s infinite` }} />)}
                  </div>
                ) : (
                  <div style={{ fontSize:12, color:"#cbd5e1", lineHeight:1.8, whiteSpace:"pre-line" }}>{aiText || "اضغط على القطعة لتحليلها"}</div>
                )}
              </div>
 
              {/* Actions */}
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>{ setBuild(prev=>({...prev,[selected.type]:selected.id})); setSelected(null); }} style={{ flex:1, background:`linear-gradient(135deg,${selected.color},${selected.color}aa)`, border:"none", borderRadius:10, padding:"12px", color:"#fff", fontWeight:800, cursor:"pointer", fontSize:13 }}>
                  {build[selected.type]===selected.id ? "✅ في تجميعتك" : "➕ أضف للتجميعة"}
                </button>
                <button onClick={()=>setSelected(null)} style={{ background:"#0f3460", border:"1px solid #1e4080", borderRadius:10, padding:"12px 16px", color:"#94a3b8", cursor:"pointer", fontSize:13 }}>إغلاق</button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      <style>{`@keyframes pulse { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1)} }`}</style>
    </div>
  );
}
 
