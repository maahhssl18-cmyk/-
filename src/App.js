
import { useState } from "react";
import { Analytics } from '@vercel/analytics/react';
 
const TRACKING_ID = "cuttingguide-21";
 
function amazonLink(name) {
  return `https://www.amazon.sa/s?k=${encodeURIComponent(name)}&tag=${TRACKING_ID}`;
}
 
// ===================== DATA (فاضي - جاهز للروابط) =====================
const categories = [
  { id:"GPU", label:"🎮 GPU كروت الشاشة", subs:[
    { id:"rtx50", label:"NVIDIA RTX 50 Series", parts:[] },
    { id:"rtx40", label:"NVIDIA RTX 40 Series", parts:[] },
    { id:"rx9000", label:"AMD RX 9000 Series", parts:[] },
    { id:"rx7000", label:"AMD RX 7000 Series", parts:[] },
    { id:"arcB", label:"Intel Arc B Series", parts:[] },
    { id:"arcA", label:"Intel Arc A Series", parts:[] },
  ]},
  { id:"CPU", label:"⚡ CPU المعالجات", subs:[
    { id:"intel14", label:"Intel 14th Gen", parts:[] },
    { id:"ryzen9000", label:"AMD Ryzen 9000", parts:[] },
  ]},
  { id:"RAM", label:"💾 RAM الرامات", subs:[
    { id:"ddr5", label:"DDR5", parts:[] },
    { id:"ddr4", label:"DDR4", parts:[] },
  ]},
  { id:"PSU", label:"🔌 PSU مزود الطاقة", subs:[
    { id:"gold", label:"80+ Gold", parts:[] },
    { id:"platinum", label:"80+ Platinum", parts:[] },
  ]},
  { id:"Motherboard", label:"🔧 Motherboard اللوحة الأم", subs:[
    { id:"intelMB", label:"Intel LGA1700", parts:[] },
    { id:"amdMB", label:"AMD AM5", parts:[] },
  ]},
  { id:"SSD", label:"💿 SSD التخزين", subs:[
    { id:"gen4", label:"NVMe Gen4", parts:[] },
    { id:"gen3", label:"NVMe Gen3", parts:[] },
  ]},
  { id:"Cooler", label:"❄️ Cooler التبريد", subs:[
    { id:"air", label:"Air Cooling", parts:[] },
    { id:"aio240", label:"AIO 240mm", parts:[] },
    { id:"aio360", label:"AIO 360mm", parts:[] },
  ]},
  { id:"Case", label:"📦 Case الكيس", subs:[
    { id:"midTower", label:"Mid Tower", parts:[] },
    { id:"fullTower", label:"Full Tower", parts:[] },
  ]},
];
 
const T = {
  bg:"#0d0015", bg2:"#130020", bg3:"#1a0030",
  glass:"rgba(255,255,255,0.05)", glassBorder:"rgba(255,255,255,0.1)",
  neon:"#c855ff", neon2:"#ff2d78", text:"#f0e6ff", text2:"#a080c0", text3:"#5a3a7a",
};
 
export default function App() {
  const [activeCat, setActiveCat] = useState("GPU");
  const [activeSub, setActiveSub] = useState(null);
  const [expandedCat, setExpandedCat] = useState("GPU");
  const [page, setPage] = useState("parts"); // parts | build | compare
 
  const currentCat = categories.find(c => c.id === activeCat);
  const currentSub = activeSub ? currentCat?.subs.find(s => s.id === activeSub) : null;
  const parts = currentSub ? currentSub.parts : (currentCat?.subs.flatMap(s => s.parts) || []);
 
  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Tajawal',sans-serif", direction:"rtl", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:${T.neon}44;border-radius:3px;}
        button,a{font-family:'Tajawal',sans-serif;}
        .sbtn:hover{background:rgba(200,85,255,0.15)!important;color:#e0aaff!important;}
        .card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(200,85,255,0.2);}
        .card{transition:all 0.2s;}
      `}</style>
 
      {/* Background */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, background:`radial-gradient(circle, ${T.neon}08, transparent 70%)`, borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:-200, left:-200, width:500, height:500, background:`radial-gradient(circle, ${T.neon2}08, transparent 70%)`, borderRadius:"50%" }} />
      </div>
 
      {/* NAVBAR */}
      <nav style={{ background:"rgba(13,0,21,0.9)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.glassBorder}`, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:54, position:"sticky", top:0, zIndex:100, flexShrink:0 }}>
        <div style={{ fontWeight:900, fontSize:15, color:T.neon, letterSpacing:1, textShadow:`0 0 20px ${T.neon}` }}>🖥️ PC BUILDER SA</div>
        <div style={{ display:"flex", gap:4 }}>
          {[["parts","📋","القطع"],["build","🔧","تجميعتي"],["compare","⚖️","مقارنة"]].map(([p,ic,lb])=>(
            <button key={p} onClick={()=>setPage(p)} style={{ background:page===p?`${T.neon}18`:"none", border:`1px solid ${page===p?T.neon+"44":"transparent"}`, borderRadius:9, padding:"6px 14px", color:page===p?T.neon:T.text3, cursor:"pointer", fontSize:12, fontWeight:page===p?700:400 }}>
              {ic} {lb}
            </button>
          ))}
        </div>
      </nav>
 
      <div style={{ display:"flex", flex:1, overflow:"hidden", position:"relative", zIndex:1 }}>
 
        {/* SIDEBAR */}
        <aside style={{ width:200, minWidth:200, background:"rgba(10,0,20,0.9)", backdropFilter:"blur(20px)", borderLeft:`1px solid ${T.glassBorder}`, padding:"10px 6px", overflowY:"auto", height:"calc(100vh - 54px)", position:"sticky", top:54 }}>
          <div style={{ fontSize:9, color:T.text3, fontWeight:700, letterSpacing:2, padding:"4px 8px 10px" }}>CATEGORIES</div>
          {categories.map(cat => (
            <div key={cat.id} style={{ marginBottom:2 }}>
              <button className="sbtn" onClick={()=>{ setExpandedCat(expandedCat===cat.id?null:cat.id); setActiveCat(cat.id); setActiveSub(null); }}
                style={{ width:"100%", background:activeCat===cat.id&&!activeSub?`${T.neon}15`:"none", border:"none", borderRadius:8, padding:"7px 10px", color:activeCat===cat.id?T.neon:T.text2, cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span>{cat.label}</span>
                <span style={{ fontSize:9, color:T.text3 }}>{expandedCat===cat.id?"▲":"▼"}</span>
              </button>
              {expandedCat===cat.id && (
                <div style={{ paddingRight:8 }}>
                  {cat.subs.map(sub => (
                    <button key={sub.id} className="sbtn" onClick={()=>{ setActiveCat(cat.id); setActiveSub(sub.id); }}
                      style={{ width:"100%", background:activeSub===sub.id?`${T.neon}22`:"none", border:`1px solid ${activeSub===sub.id?T.neon+"44":"transparent"}`, borderRadius:7, padding:"4px 10px", color:activeSub===sub.id?T.neon:T.text3, cursor:"pointer", fontSize:10, textAlign:"right", marginBottom:1, display:"flex", justifyContent:"space-between" }}>
                      <span>{activeSub===sub.id?"▶ ":""}{sub.label}</span>
                      <span style={{ fontSize:9, color:T.text3, background:"rgba(255,255,255,0.05)", borderRadius:4, padding:"0 4px" }}>{sub.parts.length}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>
 
        {/* MAIN */}
        <main style={{ flex:1, overflowY:"auto", padding:"20px", height:"calc(100vh - 54px)" }}>
 
          {page === "parts" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <h2 style={{ fontSize:18, fontWeight:800, color:T.text }}>
                  {currentSub ? currentSub.label : currentCat?.label}
                </h2>
                <span style={{ fontSize:10, color:T.text3 }}>{parts.length} قطعة</span>
              </div>
 
              {parts.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 20px", background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20 }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
                  <div style={{ fontWeight:700, fontSize:16, color:T.text, marginBottom:6 }}>قريباً!</div>
                  <div style={{ fontSize:12, color:T.text2 }}>جاري إضافة المنتجات مع روابط أمازون</div>
                </div>
              ) : (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
                  {parts.map(part => (
                    <div key={part.id} className="card" style={{ background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:16, overflow:"hidden" }}>
                      {part.img && (
                        <div style={{ height:150, background:`linear-gradient(135deg,${T.neon}22,${T.bg3})`, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                          <img src={part.img} alt={part.name} style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }} onError={e=>{e.target.style.display="none"}} />
                        </div>
                      )}
                      <div style={{ padding:"12px 14px" }}>
                        <div style={{ fontSize:9, color:T.text3, marginBottom:3 }}>{part.brand} · {part.series}</div>
                        <div style={{ fontWeight:800, fontSize:13, color:T.text, marginBottom:3 }}>{part.name}</div>
                        <div style={{ fontSize:10, color:T.text2, marginBottom:8, lineHeight:1.5 }}>{part.specs}</div>
                        <div style={{ fontWeight:900, fontSize:16, color:T.neon, direction:"ltr", display:"inline-block", marginBottom:10 }}>{part.price} ر.س</div>
                        <a href={part.amazonUrl} target="_blank" rel="noopener noreferrer"
                          style={{ display:"block", textAlign:"center", background:"linear-gradient(135deg,#ff9900,#ff6600)", borderRadius:10, padding:"9px", color:"#000", fontWeight:800, fontSize:12, textDecoration:"none", boxShadow:"0 4px 15px rgba(255,153,0,0.3)" }}>
                          🛒 اشترِ من أمازون
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
 
          {page === "build" && (
            <div style={{ maxWidth:600, margin:"0 auto" }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:T.text, marginBottom:16 }}>🔧 تجميعتي</h2>
              <div style={{ textAlign:"center", padding:"60px 20px", background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20 }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
                <div style={{ color:T.text2, fontSize:13 }}>قريباً — بعد ما نضيف المنتجات</div>
              </div>
            </div>
          )}
 
          {page === "compare" && (
            <div style={{ maxWidth:700, margin:"0 auto" }}>
              <h2 style={{ fontSize:18, fontWeight:800, color:T.text, marginBottom:16 }}>⚖️ مقارنة القطع</h2>
              <div style={{ textAlign:"center", padding:"60px 20px", background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20 }}>
                <div style={{ fontSize:48, marginBottom:12 }}>⚖️</div>
                <div style={{ color:T.text2, fontSize:13 }}>قريباً — بعد ما نضيف المنتجات</div>
              </div>
            </div>
          )}
 
          {/* Footer */}
          <div style={{ textAlign:"center", padding:"24px 0 8px", fontSize:10, color:T.text3 }}>
            PC BUILDER SA · روابط أمازون عبر برنامج Amazon Associates · cuttingguide-21
          </div>
        </main>
      </div>
      <Analytics />
    </div>
  );
}
