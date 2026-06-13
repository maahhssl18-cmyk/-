· جافا سكريبت
import { useState, useMemo } from "react";
 
// ===================== THEME =====================
const T = {
  bg: "#0d0015",
  bg2: "#130020",
  bg3: "#1a0030",
  glass: "rgba(255,255,255,0.05)",
  glassBorder: "rgba(255,255,255,0.1)",
  glassBorderHover: "rgba(200,100,255,0.4)",
  neon: "#c855ff",
  neon2: "#ff2d78",
  neon3: "#7c3aed",
  text: "#f0e6ff",
  text2: "#a080c0",
  text3: "#5a3a7a",
  green: "#22c55e",
  red: "#ef4444",
  yellow: "#fbbf24",
};
 
// ===================== IMAGES =====================
const IMG = {
  rtx5090:"https://www.techpowerup.com/gpu-specs/images/c/4089.jpg",
  rtx5080:"https://www.techpowerup.com/gpu-specs/images/c/4088.jpg",
  rtx5070ti:"https://www.techpowerup.com/gpu-specs/images/c/4087.jpg",
  rtx5070:"https://www.techpowerup.com/gpu-specs/images/c/4086.jpg",
  rtx5060ti16:"https://www.techpowerup.com/gpu-specs/images/c/4085.jpg",
  rtx5060ti8:"https://www.techpowerup.com/gpu-specs/images/c/4084.jpg",
  rtx5060:"https://www.techpowerup.com/gpu-specs/images/c/4083.jpg",
  rtx5050:"https://www.techpowerup.com/gpu-specs/images/c/4082.jpg",
  rtx4090:"https://www.techpowerup.com/gpu-specs/images/c/3702.jpg",
  rtx4080s:"https://www.techpowerup.com/gpu-specs/images/c/3922.jpg",
  rtx4080:"https://www.techpowerup.com/gpu-specs/images/c/3761.jpg",
  rtx4070tis:"https://www.techpowerup.com/gpu-specs/images/c/3921.jpg",
  rtx4070ti:"https://www.techpowerup.com/gpu-specs/images/c/3859.jpg",
  rtx4070s:"https://www.techpowerup.com/gpu-specs/images/c/3920.jpg",
  rtx4070:"https://www.techpowerup.com/gpu-specs/images/c/3799.jpg",
  rtx4060ti:"https://www.techpowerup.com/gpu-specs/images/c/3832.jpg",
  rtx4060:"https://www.techpowerup.com/gpu-specs/images/c/3831.jpg",
  rx9070xt:"https://www.techpowerup.com/gpu-specs/images/c/4076.jpg",
  rx9070:"https://www.techpowerup.com/gpu-specs/images/c/4077.jpg",
  rx9060xt:"https://www.techpowerup.com/gpu-specs/images/c/4078.jpg",
  rx7900xtx:"https://www.techpowerup.com/gpu-specs/images/c/3798.jpg",
  rx7900xt:"https://www.techpowerup.com/gpu-specs/images/c/3797.jpg",
  rx7800xt:"https://www.techpowerup.com/gpu-specs/images/c/3894.jpg",
  rx7700xt:"https://www.techpowerup.com/gpu-specs/images/c/3895.jpg",
  rx7600xt:"https://www.techpowerup.com/gpu-specs/images/c/3996.jpg",
  rx7600:"https://www.techpowerup.com/gpu-specs/images/c/3850.jpg",
  arcb580:"https://www.techpowerup.com/gpu-specs/images/c/4010.jpg",
  arcb570:"https://www.techpowerup.com/gpu-specs/images/c/4011.jpg",
  arca770:"https://www.techpowerup.com/gpu-specs/images/c/3626.jpg",
  arca750:"https://www.techpowerup.com/gpu-specs/images/c/3625.jpg",
};
 
const typeIcons = { GPU:"🎮", CPU:"⚡", RAM:"💾", PSU:"🔌", Motherboard:"🔧", SSD:"💿", Cooler:"❄️", Case:"📦" };
const typeColors = { GPU:"#c855ff", CPU:"#ff2d78", RAM:"#22c55e", PSU:"#fbbf24", Motherboard:"#f97316", SSD:"#06b6d4", Cooler:"#ec4899", Case:"#64748b" };
 
// ===================== DATA =====================
const allParts = [
  { id:"rtx5090", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5090", specs:"32GB GDDR7 · 575W · 8K · DLSS 4", priceSAR:7495, tier:10, color:"#76b900" },
  { id:"rtx5080", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5080", specs:"16GB GDDR7 · 360W · 4K Ultra · DLSS 4", priceSAR:3745, tier:9, color:"#76b900" },
  { id:"rtx5070ti", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5070 Ti", specs:"16GB GDDR7 · 300W · 4K · DLSS 4", priceSAR:2810, tier:8, color:"#76b900" },
  { id:"rtx5070", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5070", specs:"12GB GDDR7 · 250W · 1440p/4K", priceSAR:2060, tier:7, color:"#76b900" },
  { id:"rtx5060ti16", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5060 Ti 16GB", specs:"16GB GDDR7 · 180W · 1440p", priceSAR:1612, tier:6, color:"#76b900" },
  { id:"rtx5060ti8", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5060 Ti 8GB", specs:"8GB GDDR7 · 160W · 1080p", priceSAR:1425, tier:5, color:"#76b900" },
  { id:"rtx5060", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5060", specs:"8GB GDDR7 · 115W · 1080p", priceSAR:1125, tier:4, color:"#76b900" },
  { id:"rtx5050", type:"GPU", company:"NVIDIA", series:"RTX 50 Series", name:"RTX 5050", specs:"8GB GDDR7 · 70W · Budget", priceSAR:850, tier:3, color:"#76b900" },
  { id:"rtx4090", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4090", specs:"24GB GDDR6X · 450W · 8K", priceSAR:6800, tier:9, color:"#76b900" },
  { id:"rtx4080s", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4080 SUPER", specs:"16GB GDDR6X · 320W · 4K", priceSAR:3200, tier:8, color:"#76b900" },
  { id:"rtx4080", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4080", specs:"16GB GDDR6X · 320W · 4K", priceSAR:2900, tier:8, color:"#76b900" },
  { id:"rtx4070tis", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070 Ti SUPER", specs:"16GB GDDR6X · 285W · 4K", priceSAR:2400, tier:7, color:"#76b900" },
  { id:"rtx4070ti", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070 Ti", specs:"12GB GDDR6X · 285W · 4K", priceSAR:2100, tier:7, color:"#76b900" },
  { id:"rtx4070s", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070 SUPER", specs:"12GB GDDR6X · 220W · 1440p", priceSAR:1800, tier:6, color:"#76b900" },
  { id:"rtx4070", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4070", specs:"12GB GDDR6X · 200W · 1440p", priceSAR:1600, tier:6, color:"#76b900" },
  { id:"rtx4060ti", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4060 Ti", specs:"8GB GDDR6 · 160W · 1080p", priceSAR:1200, tier:5, color:"#76b900" },
  { id:"rtx4060", type:"GPU", company:"NVIDIA", series:"RTX 40 Series", name:"RTX 4060", specs:"8GB GDDR6 · 115W · 1080p", priceSAR:950, tier:4, color:"#76b900" },
  { id:"rx9070xt", type:"GPU", company:"AMD", series:"RX 9000 Series", name:"RX 9070 XT", specs:"16GB GDDR6 · 304W · 4K", priceSAR:2100, tier:7, color:"#ED1C24" },
  { id:"rx9070", type:"GPU", company:"AMD", series:"RX 9000 Series", name:"RX 9070", specs:"16GB GDDR6 · 220W · 1440p/4K", priceSAR:1750, tier:7, color:"#ED1C24" },
  { id:"rx9060xt", type:"GPU", company:"AMD", series:"RX 9000 Series", name:"RX 9060 XT", specs:"16GB GDDR6 · 150W · 1440p", priceSAR:1350, tier:5, color:"#ED1C24" },
  { id:"rx7900xtx", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7900 XTX", specs:"24GB GDDR6 · 355W · 4K", priceSAR:3200, tier:8, color:"#ED1C24" },
  { id:"rx7900xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7900 XT", specs:"20GB GDDR6 · 315W · 4K", priceSAR:2600, tier:7, color:"#ED1C24" },
  { id:"rx7800xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7800 XT", specs:"16GB GDDR6 · 263W · 1440p", priceSAR:1600, tier:6, color:"#ED1C24" },
  { id:"rx7700xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7700 XT", specs:"12GB GDDR6 · 245W · 1440p", priceSAR:1350, tier:5, color:"#ED1C24" },
  { id:"rx7600xt", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7600 XT", specs:"16GB GDDR6 · 165W · 1080p", priceSAR:1050, tier:4, color:"#ED1C24" },
  { id:"rx7600", type:"GPU", company:"AMD", series:"RX 7000 Series", name:"RX 7600", specs:"8GB GDDR6 · 165W · 1080p", priceSAR:850, tier:3, color:"#ED1C24" },
  { id:"arcb580", type:"GPU", company:"Intel", series:"Arc B Series", name:"Arc B580", specs:"12GB GDDR6 · 190W · 1440p", priceSAR:950, tier:5, color:"#0068B5" },
  { id:"arcb570", type:"GPU", company:"Intel", series:"Arc B Series", name:"Arc B570", specs:"10GB GDDR6 · 150W · 1080p", priceSAR:750, tier:4, color:"#0068B5" },
  { id:"arca770", type:"GPU", company:"Intel", series:"Arc A Series", name:"Arc A770", specs:"16GB GDDR6 · 225W · 1440p", priceSAR:900, tier:4, color:"#0068B5" },
  { id:"arca750", type:"GPU", company:"Intel", series:"Arc A Series", name:"Arc A750", specs:"8GB GDDR6 · 225W · 1080p", priceSAR:700, tier:3, color:"#0068B5" },
  { id:"i5_14400f", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i5-14400F", specs:"10 نواة · 4.7GHz · LGA1700", priceSAR:700, tier:4, color:"#0068B5" },
  { id:"i5_14600k", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i5-14600K", specs:"14 نواة · 5.3GHz · LGA1700", priceSAR:900, tier:5, color:"#0068B5" },
  { id:"i7_14700k", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i7-14700K", specs:"20 نواة · 5.6GHz · LGA1700", priceSAR:1400, tier:7, color:"#0068B5" },
  { id:"i9_14900k", type:"CPU", company:"Intel", series:"Intel 14th Gen", name:"Core i9-14900K", specs:"24 نواة · 6.0GHz · LGA1700", priceSAR:2100, tier:9, color:"#0068B5" },
  { id:"r5_9600x", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 5 9600X", specs:"6 نواة · 5.4GHz · AM5", priceSAR:1050, tier:5, color:"#ED1C24" },
  { id:"r7_9700x", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 7 9700X", specs:"8 نواة · 5.5GHz · AM5", priceSAR:1350, tier:6, color:"#ED1C24" },
  { id:"r7_9800x3d", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 7 9800X3D", specs:"8 نواة · 5.7GHz · AM5 · 3D Cache", priceSAR:1575, tier:8, color:"#ED1C24" },
  { id:"r9_9950x", type:"CPU", company:"AMD", series:"AMD Ryzen 9000", name:"Ryzen 9 9950X", specs:"16 نواة · 5.7GHz · AM5", priceSAR:2440, tier:9, color:"#ED1C24" },
  { id:"ram_16_ddr5", type:"RAM", company:"Kingston", series:"DDR5", name:"FURY Beast 16GB DDR5", specs:"16GB · DDR5-5600MHz", priceSAR:280, tier:3, color:"#22c55e" },
  { id:"ram_32_corsair", type:"RAM", company:"Corsair", series:"DDR5", name:"Vengeance 32GB DDR5", specs:"32GB · DDR5-6000MHz", priceSAR:420, tier:5, color:"#22c55e" },
  { id:"ram_32_gskill", type:"RAM", company:"G.Skill", series:"DDR5", name:"Trident Z5 32GB RGB", specs:"32GB · DDR5-6000MHz · RGB", priceSAR:490, tier:6, color:"#22c55e" },
  { id:"ram_64", type:"RAM", company:"Corsair", series:"DDR5", name:"Vengeance 64GB DDR5", specs:"64GB · DDR5-6000MHz", priceSAR:850, tier:7, color:"#22c55e" },
  { id:"psu_650", type:"PSU", company:"Cooler Master", series:"80+ Gold", name:"MWE Gold 650W", specs:"650W · 80+ Gold · Semi Modular", priceSAR:280, tier:3, color:"#fbbf24" },
  { id:"psu_750", type:"PSU", company:"Corsair", series:"80+ Gold", name:"RM750e 750W", specs:"750W · 80+ Gold · Full Modular", priceSAR:380, tier:5, color:"#fbbf24" },
  { id:"psu_850", type:"PSU", company:"Seasonic", series:"80+ Gold", name:"Focus GX 850W", specs:"850W · 80+ Gold · 10yr", priceSAR:530, tier:7, color:"#fbbf24" },
  { id:"psu_1000", type:"PSU", company:"Corsair", series:"80+ Platinum", name:"HX1000 1000W", specs:"1000W · 80+ Platinum", priceSAR:750, tier:8, color:"#fbbf24" },
  { id:"mb_b760", type:"Motherboard", company:"MSI", series:"Intel B760", name:"PRO B760M-P DDR5", specs:"B760 · LGA1700 · DDR5", priceSAR:659, tier:3, color:"#f97316", socket:"LGA1700" },
  { id:"mb_z790", type:"Motherboard", company:"ASUS", series:"Intel Z790", name:"TUF Gaming Z790-Plus", specs:"Z790 · LGA1700 · DDR5 · WiFi", priceSAR:1629, tier:7, color:"#f97316", socket:"LGA1700" },
  { id:"mb_b850", type:"Motherboard", company:"Gigabyte", series:"AMD B850", name:"B850 Aorus Elite WiFi7", specs:"B850 · AM5 · DDR5 · WiFi7", priceSAR:935, tier:5, color:"#f97316", socket:"AM5" },
  { id:"mb_x870e", type:"Motherboard", company:"MSI", series:"AMD X870E", name:"MEG X870E ACE", specs:"X870E · AM5 · DDR5 · WiFi7", priceSAR:2199, tier:9, color:"#f97316", socket:"AM5" },
  { id:"ssd_kv2", type:"SSD", company:"Kingston", series:"NVMe Gen3", name:"NV2 1TB", specs:"1TB · PCIe 3.0 · 3500MB/s", priceSAR:200, tier:3, color:"#06b6d4" },
  { id:"ssd_samsung", type:"SSD", company:"Samsung", series:"NVMe Gen4", name:"980 PRO 1TB", specs:"1TB · PCIe 4.0 · 7000MB/s", priceSAR:350, tier:6, color:"#06b6d4" },
  { id:"ssd_wd", type:"SSD", company:"WD", series:"NVMe Gen4", name:"Black SN850X 2TB", specs:"2TB · PCIe 4.0 · 7300MB/s", priceSAR:600, tier:8, color:"#06b6d4" },
  { id:"cool_dp240", type:"Cooler", company:"DeepCool", series:"AIO 240mm", name:"LT240 AIO 240mm", specs:"AIO · 240mm · ARGB", priceSAR:300, tier:4, color:"#ec4899" },
  { id:"cool_noctua", type:"Cooler", company:"Noctua", series:"Air Cooling", name:"NH-D15 Dual Tower", specs:"Air · Dual Tower · 280W TDP", priceSAR:380, tier:6, color:"#ec4899" },
  { id:"cool_h150i", type:"Cooler", company:"Corsair", series:"AIO 360mm", name:"iCUE H150i 360mm", specs:"AIO · 360mm · RGB", priceSAR:580, tier:8, color:"#ec4899" },
  { id:"case_corsair", type:"Case", company:"Corsair", series:"Mid Tower", name:"4000D Airflow", specs:"Mid Tower · ATX · 3 Fans", priceSAR:350, tier:4, color:"#64748b" },
  { id:"case_fractal", type:"Case", company:"Fractal", series:"Mid Tower", name:"North Charcoal", specs:"Mid Tower · ATX · Silent", priceSAR:500, tier:6, color:"#64748b" },
  { id:"case_lianli", type:"Case", company:"Lian Li", series:"Mid Tower", name:"O11 Dynamic Mid Tower", specs:"Mid Tower · ATX · Dual Chamber", priceSAR:600, tier:7, color:"#64748b" },
];
 
const sidebarCats = [
  { label:"🎮 GPU", type:"GPU", subs:[{ label:"NVIDIA RTX 50", series:"RTX 50 Series" },{ label:"NVIDIA RTX 40", series:"RTX 40 Series" },{ label:"AMD RX 9000", series:"RX 9000 Series" },{ label:"AMD RX 7000", series:"RX 7000 Series" },{ label:"Intel Arc B", series:"Arc B Series" },{ label:"Intel Arc A", series:"Arc A Series" }]},
  { label:"⚡ CPU", type:"CPU", subs:[{ label:"Intel 14th Gen", series:"Intel 14th Gen" },{ label:"AMD Ryzen 9000", series:"AMD Ryzen 9000" }]},
  { label:"💾 RAM", type:"RAM", subs:[{ label:"DDR5", series:"DDR5" }]},
  { label:"🔌 PSU", type:"PSU", subs:[{ label:"80+ Gold", series:"80+ Gold" },{ label:"80+ Platinum", series:"80+ Platinum" }]},
  { label:"🔧 Motherboard", type:"Motherboard", subs:[{ label:"Intel LGA1700", company:"Intel" },{ label:"AMD AM5", company:"AMD" }]},
  { label:"💿 SSD", type:"SSD", subs:[{ label:"NVMe Gen4", series:"NVMe Gen4" },{ label:"NVMe Gen3", series:"NVMe Gen3" }]},
  { label:"❄️ Cooler", type:"Cooler", subs:[{ label:"Air Cooling", series:"Air Cooling" },{ label:"AIO 240mm", series:"AIO 240mm" },{ label:"AIO 360mm", series:"AIO 360mm" }]},
  { label:"📦 Case", type:"Case", subs:[{ label:"Mid Tower", series:"Mid Tower" }]},
];
 
// ===================== BOTTLENECK =====================
function calcBottleneck(build) {
  const gpu = build.GPU, cpu = build.CPU;
  if (!gpu || !cpu) return null;
  const cpuBN = Math.max(0, (gpu.tier - cpu.tier) * 8);
  const ramBN = Math.max(0, (gpu.tier - (build.RAM?.tier||5)) * 5);
  const overall = Math.max(40, Math.min(100, Math.round(100 - cpuBN*0.5 - ramBN*0.2)));
  const gpuEff = Math.max(50, Math.min(100, Math.round(100 - cpuBN*0.6)));
  const mainBN = cpuBN > 20 ? { part:"CPU", pct:Math.min(cpuBN,60), msg:`المعالج يعيق الكرت بنسبة ${Math.min(cpuBN,60)}%` } : cpuBN > 10 ? { part:"CPU", pct:cpuBN, msg:`عنق زجاجي خفيف ${cpuBN}%` } : ramBN > 15 ? { part:"RAM", pct:ramBN, msg:`الرامات تعيق الأداء ${ramBN}%` } : null;
  const scores = { GPU:gpuEff, CPU:Math.max(60,Math.min(100,Math.round(100-Math.max(0,cpu.tier-gpu.tier)*5))), RAM:Math.max(65,Math.min(100,Math.round(100-ramBN*0.3))), Motherboard:Math.max(70,100), SSD:Math.max(75,100) };
  return { overall, gpuEff, mainBN, scores };
}
 
// ===================== AI =====================
async function askAI(name, specs, type) {
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:300, messages:[{ role:"user", content:`اشرح هذه القطعة بالعربي في 3 نقاط:\nالقطعة: ${name} (${type})\nالمواصفات: ${specs}\n1. وظيفتها\n2. من يحتاجها\n3. هل تستحق سعرها؟` }] })
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
      style={{ background:T.glass, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", border:`1px solid ${hov?T.glassBorderHover:T.glassBorder}`, borderRadius:16, transition:"all 0.25s", cursor:onClick?"pointer":"default", boxShadow:hov&&glow?`0 0 30px ${glow}33`:"none", ...style }}>
      {children}
    </div>
  );
}
 
function PartImg({ id, type, color, height=130 }) {
  const [err, setErr] = useState(false);
  const src = IMG[id];
  return (
    <div style={{ height, background:`linear-gradient(135deg,${color}22,#0d0015)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", borderRadius:"16px 16px 0 0" }}>
      {src && !err ? <img src={src} alt="" onError={()=>setErr(true)} style={{ width:"100%", height:"100%", objectFit:"contain", padding:8 }} />
        : <div style={{ fontSize:40, opacity:0.2 }}>{typeIcons[type]||"🔧"}</div>}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 50%, #130020)" }} />
    </div>
  );
}
 
// ===================== PAGES =====================
function HomePage({ setPage }) {
  const featured = allParts.filter(p=>p.type==="GPU" && p.tier>=7).slice(0,3);
  const trending = [...allParts].sort((a,b)=>b.tier-a.tier).slice(0,8);
 
  return (
    <div style={{ padding:"0 20px" }}>
      {/* HERO */}
      <div style={{ position:"relative", borderRadius:24, overflow:"hidden", marginBottom:32, minHeight:320, display:"flex", alignItems:"center", background:"linear-gradient(135deg,#1a0030,#0d0015)", border:`1px solid ${T.glassBorder}` }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse at 70% 50%, #c855ff22 0%, transparent 60%)", pointerEvents:"none" }} />
        <div style={{ padding:"40px 36px", position:"relative", zIndex:1, flex:1 }}>
          <div style={{ display:"inline-block", background:`${T.neon}22`, border:`1px solid ${T.neon}55`, borderRadius:100, padding:"4px 14px", fontSize:11, color:T.neon, fontWeight:700, letterSpacing:2, marginBottom:16 }}>PC BUILDER SA · RTX 50 · RYZEN 9000</div>
          <h1 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, lineHeight:1.1, marginBottom:12 }}>
            <span style={{ color:T.text }}>ابنِ جهازك </span>
            <span style={{ color:T.neon, textShadow:`0 0 40px ${T.neon}` }}>المثالي</span>
          </h1>
          <p style={{ color:T.text2, fontSize:14, marginBottom:24 }}>تصفح القطع · قارن · ابنِ تجميعتك · اكتشف العنق الزجاجي</p>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={()=>setPage("parts")} style={{ background:`linear-gradient(135deg,${T.neon},${T.neon2})`, border:"none", borderRadius:12, padding:"12px 28px", color:"#fff", fontWeight:800, fontSize:14, cursor:"pointer", boxShadow:`0 0 30px ${T.neon}55` }}>🚀 استكشف القطع</button>
            <button onClick={()=>setPage("compare")} style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:12, padding:"12px 20px", color:T.text2, fontWeight:700, fontSize:13, cursor:"pointer" }}>⚖️ قارن الآن</button>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, padding:20, position:"relative", zIndex:1 }}>
          {featured.map(p => (
            <div key={p.id} onClick={()=>setPage("parts")} style={{ background:`${T.glass}`, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:14, overflow:"hidden", cursor:"pointer", width:130 }}>
              <PartImg id={p.id} type={p.type} color={p.color} height={100} />
              <div style={{ padding:"8px 10px" }}>
                <div style={{ fontSize:10, fontWeight:800, color:T.text }}>{p.name}</div>
                <div style={{ fontSize:11, fontWeight:900, color:T.neon, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</div>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* TOP PICKS */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <h2 style={{ fontSize:18, fontWeight:800, color:T.text }}>🔥 الأقوى والأحدث</h2>
          <span onClick={()=>setPage("parts")} style={{ fontSize:12, color:T.neon, cursor:"pointer" }}>شاهد الكل ←</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10 }}>
          {trending.map(p => (
            <GlassCard key={p.id} onClick={()=>setPage("parts")} glow={p.color} style={{ overflow:"hidden" }}>
              <PartImg id={p.id} type={p.type} color={p.color} height={120} />
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontSize:9, color:T.text3, marginBottom:2 }}>{p.series}</div>
                <div style={{ fontWeight:800, fontSize:12, color:T.text, marginBottom:4 }}>{p.name}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:900, fontSize:12, color:typeColors[p.type]||T.neon, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</span>
                  <span style={{ fontSize:9, background:`${typeColors[p.type]}22`, border:`1px solid ${typeColors[p.type]}44`, borderRadius:4, padding:"1px 5px", color:typeColors[p.type] }}>{p.type}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
 
      {/* QUICK NAV */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
        {[["📋","تصفح القطع","parts",T.neon],["⚖️","مقارنة","compare",T.neon2],["🔧","تجميعتي","build",T.neon3],["🤖","شرح AI","parts","#22c55e"]].map(([ic,lb,pg,cl])=>(
          <GlassCard key={lb} onClick={()=>setPage(pg)} style={{ padding:"16px 12px", textAlign:"center" }} glow={cl}>
            <div style={{ fontSize:26, marginBottom:6 }}>{ic}</div>
            <div style={{ fontWeight:700, fontSize:12, color:T.text }}>{lb}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
 
function PartsPage({ build, setBuild }) {
  const [activeType, setActiveType] = useState(null);
  const [activeSeries, setActiveSeries] = useState(null);
  const [activeCompany, setActiveCompany] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("tier");
  const [selected, setSelected] = useState(null);
  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [expandedCat, setExpandedCat] = useState("GPU");
 
  const filtered = useMemo(() => {
    let list = allParts;
    if (activeType) list = list.filter(p=>p.type===activeType);
    if (activeSeries) list = list.filter(p=>p.series===activeSeries);
    if (activeCompany && !activeSeries) list = list.filter(p=>p.company===activeCompany);
    if (search) list = list.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())||p.company.toLowerCase().includes(search.toLowerCase())||p.series.toLowerCase().includes(search.toLowerCase()));
    return list.sort((a,b)=>sort==="tier"?b.tier-a.tier:sort==="asc"?a.priceSAR-b.priceSAR:b.priceSAR-a.priceSAR);
  }, [activeType, activeSeries, activeCompany, search, sort]);
 
  const openPart = async (part) => {
    setSelected(part); setAiText(""); setAiLoading(true);
    const t = await askAI(part.name, part.specs, part.type);
    setAiText(t); setAiLoading(false);
  };
 
  return (
    <div style={{ display:"flex", height:"calc(100vh - 54px)", overflow:"hidden" }}>
      {/* Sidebar */}
      <aside style={{ width:190, minWidth:190, background:"rgba(13,0,21,0.9)", backdropFilter:"blur(20px)", borderLeft:`1px solid ${T.glassBorder}`, padding:"10px 6px", overflowY:"auto" }}>
        <div style={{ fontSize:9, color:T.text3, fontWeight:700, letterSpacing:2, padding:"2px 8px 8px" }}>CATEGORIES</div>
        <button onClick={()=>{setActiveType(null);setActiveSeries(null);setActiveCompany(null);}} style={{ width:"100%", background:!activeType?`${T.neon}22`:"none", border:`1px solid ${!activeType?T.neon+"44":"transparent"}`, borderRadius:7, padding:"6px 10px", color:!activeType?T.neon:T.text3, cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", marginBottom:3 }}>
          📋 الكل ({allParts.length})
        </button>
        {sidebarCats.map(cat=>(
          <div key={cat.type} style={{ marginBottom:2 }}>
            <button onClick={()=>{setExpandedCat(expandedCat===cat.type?null:cat.type);setActiveType(cat.type);setActiveSeries(null);setActiveCompany(null);}}
              style={{ width:"100%", background:activeType===cat.type&&!activeSeries&&!activeCompany?`${T.neon}15`:"none", border:"none", borderRadius:7, padding:"6px 10px", color:activeType===cat.type?T.neon:T.text2, cursor:"pointer", fontSize:11, fontWeight:700, textAlign:"right", display:"flex", justifyContent:"space-between" }}>
              <span>{cat.label}</span><span style={{ fontSize:9, color:T.text3 }}>{expandedCat===cat.type?"▲":"▼"}</span>
            </button>
            {expandedCat===cat.type && (
              <div style={{ paddingRight:8 }}>
                {cat.subs.map(sub=>{
                  const isActive = activeSeries===sub.series&&(!sub.company||activeCompany===sub.company);
                  const count = allParts.filter(p=>p.type===cat.type&&(!sub.series||p.series===sub.series)&&(!sub.company||p.company===sub.company)).length;
                  return (
                    <button key={sub.label} onClick={()=>{setActiveType(cat.type);setActiveSeries(sub.series||null);setActiveCompany(sub.company||null);}}
                      style={{ width:"100%", background:isActive?`${T.neon}22`:"none", border:`1px solid ${isActive?T.neon+"44":"transparent"}`, borderRadius:6, padding:"4px 10px", color:isActive?T.neon:T.text3, cursor:"pointer", fontSize:10, textAlign:"right", marginBottom:1, display:"flex", justifyContent:"space-between" }}>
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
      <div style={{ flex:1, overflowY:"auto", padding:"12px 16px" }}>
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ابحث..." style={{ flex:1, background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"8px 14px", color:T.text, fontSize:12, outline:"none" }} />
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"8px 10px", color:T.text2, fontSize:11, cursor:"pointer" }}>
            <option value="tier">الأقوى</option>
            <option value="asc">السعر ↑</option>
            <option value="desc">السعر ↓</option>
          </select>
        </div>
        <div style={{ fontSize:10, color:T.text3, marginBottom:10 }}>{filtered.length} قطعة</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(170px,1fr))", gap:10 }}>
          {filtered.map(p=>(
            <GlassCard key={p.id} onClick={()=>openPart(p)} glow={p.color} style={{ overflow:"hidden", border:`1px solid ${build[p.type]===p.id?"#22c55e55":T.glassBorder}` }}>
              <PartImg id={p.id} type={p.type} color={p.color} height={125} />
              <div style={{ padding:"9px 11px" }}>
                <div style={{ fontSize:8, color:T.text3, marginBottom:1 }}>{p.series}</div>
                <div style={{ fontWeight:800, fontSize:12, color:T.text, marginBottom:2 }}>{p.name}</div>
                <div style={{ fontSize:9, color:T.text3, marginBottom:7, lineHeight:1.4 }}>{p.specs}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:900, fontSize:13, color:p.color, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</span>
                  <button onClick={e=>{e.stopPropagation();setBuild(prev=>({...prev,[p.type]:p.id}));}} style={{ background:build[p.type]===p.id?"#22c55e22":T.glass, border:`1px solid ${build[p.type]===p.id?"#22c55e":T.glassBorder}`, borderRadius:6, padding:"3px 8px", color:build[p.type]===p.id?"#22c55e":T.text2, cursor:"pointer", fontSize:10, fontWeight:700 }}>
                    {build[p.type]===p.id?"✅":"➕"}
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
 
      {/* Modal */}
      {selected && (
        <div onClick={()=>setSelected(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:300, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#130020", backdropFilter:"blur(30px)", border:`1px solid ${selected.color}55`, borderRadius:24, maxWidth:460, width:"100%", maxHeight:"90vh", overflowY:"auto" }}>
            <div style={{ position:"relative", borderRadius:"24px 24px 0 0", overflow:"hidden" }}>
              <PartImg id={selected.id} type={selected.type} color={selected.color} height={200} />
              <button onClick={()=>setSelected(null)} style={{ position:"absolute", top:12, left:12, background:"rgba(0,0,0,0.7)", backdropFilter:"blur(10px)", border:"none", borderRadius:8, padding:"6px 12px", color:"#fff", cursor:"pointer", fontSize:14 }}>✕</button>
              <div style={{ position:"absolute", top:12, right:12 }}>
                <span style={{ background:selected.color, borderRadius:6, padding:"2px 8px", fontSize:10, fontWeight:700, color:"#000" }}>{selected.type} · {selected.company}</span>
              </div>
              <div style={{ position:"absolute", bottom:0, right:0, left:0, padding:"14px 16px" }}>
                <div style={{ fontWeight:900, fontSize:20, color:"#fff", textShadow:"0 2px 10px rgba(0,0,0,0.9)" }}>{selected.name}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{selected.series}</div>
              </div>
            </div>
            <div style={{ padding:18 }}>
              <div style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"10px 14px", marginBottom:12, fontSize:11, color:T.text2 }}>{selected.specs}</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
                {[["السعر",`${selected.priceSAR.toLocaleString()} ر.س`,"ltr"],["مستوى القطعة",`${selected.tier}/10`,"rtl"]].map(([l,v,d])=>(
                  <div key={l} style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"10px", textAlign:"center" }}>
                    <div style={{ fontSize:9, color:T.text3, marginBottom:3 }}>{l}</div>
                    <div style={{ fontSize:18, fontWeight:900, color:selected.color, direction:d }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:`${selected.color}11`, border:`1px solid ${selected.color}33`, borderRadius:14, padding:14, marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:8 }}>
                  <span>🤖</span>
                  <span style={{ fontWeight:700, fontSize:12, color:T.text }}>تحليل الذكاء الاصطناعي</span>
                  {aiLoading && <span style={{ fontSize:9, color:selected.color }}>جاري...</span>}
                </div>
                {aiLoading ? <div style={{ display:"flex", gap:5 }}>{[0,1,2].map(i=><div key={i} style={{ width:7,height:7,background:selected.color,borderRadius:"50%",animation:`bounce 1s ${i*0.2}s infinite` }}/>)}</div>
                  : <div style={{ fontSize:11, color:T.text2, lineHeight:1.9, whiteSpace:"pre-line" }}>{aiText}</div>}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={()=>{setBuild(prev=>({...prev,[selected.type]:selected.id}));setSelected(null);}} style={{ flex:1, background:`linear-gradient(135deg,${selected.color},${selected.color}cc)`, border:"none", borderRadius:12, padding:"12px", color:"#000", fontWeight:800, cursor:"pointer", fontSize:13 }}>
                  {build[selected.type]===selected.id?"✅ في تجميعتك":"➕ أضف للتجميعة"}
                </button>
                <button onClick={()=>setSelected(null)} style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:12, padding:"12px 16px", color:T.text3, cursor:"pointer" }}>✕</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
function ComparePage() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [filterType, setFilterType] = useState("GPU");
  const [search, setSearch] = useState("");
 
  const list = useMemo(() => allParts.filter(p=>p.type===filterType&&(!search||p.name.toLowerCase().includes(search.toLowerCase()))).sort((x,y)=>y.tier-x.tier), [filterType, search]);
 
  const winner = a && b ? (a.tier > b.tier ? "a" : b.tier > a.tier ? "b" : "tie") : null;
  const perfDiff = a && b ? Math.abs(a.tier - b.tier) * 8 : 0;
  const priceDiff = a && b ? Math.abs(a.priceSAR - b.priceSAR) : 0;
 
  const types = ["GPU","CPU","RAM","PSU","Motherboard","SSD","Cooler","Case"];
 
  const StatRow = ({ label, va, vb, better }) => {
    const aWin = better === "low" ? va <= vb : va >= vb;
    return (
      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:8, marginBottom:8, alignItems:"center" }}>
        <div style={{ background:aWin?`${T.neon}22`:`${T.neon2}11`, border:`1px solid ${aWin?T.neon+"44":T.glassBorder}`, borderRadius:8, padding:"7px 10px", textAlign:"right", fontSize:12, fontWeight:700, color:aWin?T.neon:T.text2, direction:"ltr" }}>{va}</div>
        <div style={{ fontSize:9, color:T.text3, textAlign:"center", fontWeight:700, whiteSpace:"nowrap" }}>{label}</div>
        <div style={{ background:!aWin?`${T.neon}22`:`${T.neon2}11`, border:`1px solid ${!aWin?T.neon+"44":T.glassBorder}`, borderRadius:8, padding:"7px 10px", textAlign:"left", fontSize:12, fontWeight:700, color:!aWin?T.neon:T.text2, direction:"ltr" }}>{vb}</div>
      </div>
    );
  };
 
  return (
    <div style={{ maxWidth:900, margin:"0 auto", padding:"16px 20px" }}>
      <h2 style={{ fontSize:20, fontWeight:800, color:T.text, marginBottom:6 }}>⚖️ مقارنة القطع</h2>
      <p style={{ fontSize:12, color:T.text3, marginBottom:16 }}>اختر نوع القطعة واضغط على قطعتين للمقارنة</p>
 
      {/* Type filter */}
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
        {types.map(t=>(
          <button key={t} onClick={()=>{setFilterType(t);setA(null);setB(null);}} style={{ background:filterType===t?`linear-gradient(135deg,${T.neon},${T.neon2})`:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${filterType===t?"transparent":T.glassBorder}`, borderRadius:8, padding:"5px 12px", color:filterType===t?"#fff":T.text2, cursor:"pointer", fontSize:11, fontWeight:filterType===t?700:400 }}>
            {typeIcons[t]} {t}
          </button>
        ))}
      </div>
 
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 ابحث..." style={{ width:"100%", background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"8px 14px", color:T.text, fontSize:12, outline:"none", marginBottom:14 }} />
 
      {/* Comparison result */}
      {a && b && (
        <div style={{ background:T.glass, backdropFilter:"blur(20px)", border:`1px solid ${T.glassBorder}`, borderRadius:20, padding:"20px", marginBottom:16 }}>
          {/* Winner banner */}
          {winner !== "tie" && (
            <div style={{ textAlign:"center", marginBottom:16, padding:"12px", background:`${T.neon}15`, border:`1px solid ${T.neon}33`, borderRadius:12 }}>
              <div style={{ fontSize:12, color:T.text3, marginBottom:4 }}>🏆 الفائز</div>
              <div style={{ fontSize:18, fontWeight:900, color:T.neon }}>{winner==="a"?a.name:b.name}</div>
              <div style={{ fontSize:11, color:T.text2, marginTop:4 }}>أقوى بنسبة {perfDiff}% تقريباً</div>
            </div>
          )}
          {winner === "tie" && (
            <div style={{ textAlign:"center", marginBottom:16, padding:"12px", background:`${T.yellow}15`, border:`1px solid ${T.yellow}33`, borderRadius:12 }}>
              <div style={{ fontSize:16, fontWeight:900, color:T.yellow }}>⚖️ متساويان في الأداء</div>
            </div>
          )}
 
          {/* Cards side by side */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
            {[a,b].map((p,i)=>(
              <div key={p.id} style={{ background:T.bg2, border:`1.5px solid ${winner===(i===0?"a":"b")?T.neon:T.glassBorder}`, borderRadius:14, overflow:"hidden" }}>
                <PartImg id={p.id} type={p.type} color={p.color} height={140} />
                <div style={{ padding:"10px 12px" }}>
                  <div style={{ fontSize:9, color:T.text3 }}>{p.series} · {p.company}</div>
                  <div style={{ fontWeight:800, fontSize:13, color:T.text, marginBottom:3 }}>{p.name}</div>
                  {winner===(i===0?"a":"b") && <div style={{ fontSize:9, background:`${T.neon}22`, border:`1px solid ${T.neon}44`, borderRadius:5, padding:"1px 6px", color:T.neon, display:"inline-block", marginBottom:4 }}>🏆 الأقوى</div>}
                  <div style={{ fontWeight:900, fontSize:15, color:p.color, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</div>
                </div>
              </div>
            ))}
          </div>
 
          {/* Stats comparison */}
          <StatRow label="مستوى الأداء" va={`${a.tier}/10`} vb={`${b.tier}/10`} better="high" />
          <StatRow label="السعر" va={`${a.priceSAR.toLocaleString()} ر.س`} vb={`${b.priceSAR.toLocaleString()} ر.س`} better="low" />
          <StatRow label="المواصفات" va={a.specs} vb={b.specs} better="high" />
 
          {/* Value verdict */}
          <div style={{ marginTop:14, background:`${T.neon2}11`, border:`1px solid ${T.neon2}33`, borderRadius:12, padding:"12px 14px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:T.neon2, marginBottom:4 }}>💡 الحكم النهائي</div>
            <div style={{ fontSize:11, color:T.text2, lineHeight:1.7 }}>
              {winner==="a" ? `${a.name} أقوى بنسبة ${perfDiff}% — لكن ${priceDiff > 0 ? `أغلى بـ ${priceDiff.toLocaleString()} ر.س` : "بنفس السعر"}. ${perfDiff > 15 ? "الفرق كبير ويستحق التفكير." : "الفرق بسيط، وفّر فلوسك."}` :
               winner==="b" ? `${b.name} أقوى بنسبة ${perfDiff}% — لكن ${priceDiff > 0 ? `أغلى بـ ${priceDiff.toLocaleString()} ر.س` : "بنفس السعر"}. ${perfDiff > 15 ? "الفرق كبير ويستحق التفكير." : "الفرق بسيط، وفّر فلوسك."}` :
               "القطعتان متساويتان في الأداء — اختر الأرخص أو الأوفر في مواصفاتها."}
            </div>
          </div>
 
          <button onClick={()=>{setA(null);setB(null);}} style={{ width:"100%", marginTop:12, background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:10, padding:"10px", color:T.text2, cursor:"pointer", fontSize:12, fontWeight:700 }}>🔄 مقارنة جديدة</button>
        </div>
      )}
 
      {/* Selection status */}
      {(!a || !b) && (
        <div style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:12, padding:"12px 16px", marginBottom:12, display:"flex", gap:12, alignItems:"center" }}>
          <div style={{ display:"flex", gap:8 }}>
            {[a,b].map((p,i)=>(
              <div key={i} style={{ background:p?`${p.color}22`:`${T.neon}11`, border:`1px solid ${p?p.color+"44":T.neon+"22"}`, borderRadius:8, padding:"6px 12px", fontSize:11, color:p?T.neon:T.text3, fontWeight:p?700:400 }}>
                {p?`✅ ${p.name}`:`اختر القطعة ${i+1}`}
              </div>
            ))}
          </div>
          {(a||b) && <button onClick={()=>{setA(null);setB(null);}} style={{ background:"none", border:"none", color:T.text3, cursor:"pointer", fontSize:11 }}>✕ مسح</button>}
        </div>
      )}
 
      {/* Parts grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:8 }}>
        {list.map(p=>{
          const sel = p.id===a?.id||p.id===b?.id;
          const isA = p.id===a?.id;
          const isFull = a && b && !sel;
          return (
            <div key={p.id} onClick={()=>{ if(isFull) return; if(!a){setA(p);}else if(!b&&p.id!==a.id){setB(p);}else if(isA){setA(null);}else{setB(null);}}}
              style={{ background:sel?`${p.color}22`:T.glass, backdropFilter:"blur(10px)", border:`1.5px solid ${sel?p.color+"66":T.glassBorder}`, borderRadius:14, overflow:"hidden", cursor:isFull?"not-allowed":"pointer", opacity:isFull?0.4:1, transition:"all 0.2s" }}>
              <PartImg id={p.id} type={p.type} color={p.color} height={110} />
              <div style={{ padding:"8px 10px" }}>
                <div style={{ fontSize:8, color:T.text3, marginBottom:1 }}>{p.company}</div>
                <div style={{ fontWeight:800, fontSize:11, color:T.text, marginBottom:3 }}>{p.name}</div>
                <div style={{ fontWeight:900, fontSize:12, color:p.color, direction:"ltr", display:"inline-block" }}>{p.priceSAR.toLocaleString()} ر.س</div>
                {sel && <div style={{ fontSize:9, color:T.neon, fontWeight:700, marginTop:3 }}>{isA?"— الأول ✓":"— الثاني ✓"}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
 
function BuildPage({ build, setBuild, setPage }) {
  const buildList = Object.values(build).map(id=>allParts.find(p=>p.id===id)).filter(Boolean);
  const total = buildList.reduce((s,p)=>s+p.priceSAR,0);
  const bn = calcBottleneck({ GPU:allParts.find(p=>p.id===build.GPU), CPU:allParts.find(p=>p.id===build.CPU), RAM:allParts.find(p=>p.id===build.RAM) });
  const types = ["GPU","CPU","RAM","Motherboard","SSD","PSU","Cooler","Case"];
 
  return (
    <div style={{ maxWidth:700, margin:"0 auto", padding:"16px 20px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:T.text }}>🔧 تجميعتي</h2>
        {buildList.length>0&&<button onClick={()=>{const txt=buildList.map(p=>`${p.type}: ${p.name} — ${p.priceSAR.toLocaleString()} ر.س`).join("\n")+`\n\nالإجمالي: ${total.toLocaleString()} ر.س`;navigator.clipboard?.writeText(txt);alert("✅ تم نسخ التجميعة!");}} style={{ background:`linear-gradient(135deg,${T.neon},${T.neon2})`, border:"none", borderRadius:9, padding:"7px 14px", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:11 }}>📋 نسخ</button>}
      </div>
 
      <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:16 }}>
        {types.map(type=>{
          const part = build[type]?allParts.find(p=>p.id===build[type]):null;
          return (
            <GlassCard key={type} style={{ padding:"11px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", border:`1px solid ${part?part.color+"44":T.glassBorder}` }}>
              <div style={{ display:"flex", gap:10, alignItems:"center", flex:1 }}>
                <span style={{ fontSize:18 }}>{typeIcons[type]}</span>
                <div>
                  <div style={{ fontSize:9, color:part?part.color:T.text3, fontWeight:700 }}>{type}</div>
                  {part?<><div style={{ fontWeight:700, fontSize:13, color:T.text }}>{part.name}</div><div style={{ fontSize:10, color:T.text3 }}>{part.specs}</div></>:<div style={{ fontSize:12, color:T.text3 }}>لم تختر بعد</div>}
                </div>
              </div>
              <div style={{ display:"flex", gap:5, alignItems:"center" }}>
                {part&&<span style={{ fontWeight:800, fontSize:12, color:part.color, direction:"ltr", display:"inline-block" }}>{part.priceSAR.toLocaleString()} ر.س</span>}
                <button onClick={()=>setPage("parts")} style={{ background:T.glass, backdropFilter:"blur(10px)", border:`1px solid ${T.glassBorder}`, borderRadius:7, padding:"4px 8px", color:T.text2, cursor:"pointer", fontSize:10 }}>{part?"تغيير":"اختر"}</button>
                {part&&<button onClick={()=>setBuild(prev=>{const n={...prev};delete n[type];return n;})} style={{ background:"#ef444415", border:"1px solid #ef444433", borderRadius:7, padding:"4px 8px", color:"#ef4444", cursor:"pointer", fontSize:10 }}>✕</button>}
              </div>
            </GlassCard>
          );
        })}
      </div>
 
      {/* Bottleneck */}
      {bn && (
        <GlassCard style={{ padding:"18px 20px", marginBottom:14 }}>
          <div style={{ fontSize:11, color:T.text3, fontWeight:700, letterSpacing:1, marginBottom:14 }}>📊 تحليل أداء التجميعة</div>
          <div style={{ textAlign:"center", marginBottom:20, padding:"16px", background:`${T.neon}08`, border:`1px solid ${T.neon}22`, borderRadius:12 }}>
            <div style={{ fontSize:11, color:T.text3, marginBottom:6 }}>الأداء العام</div>
            <div style={{ fontSize:52, fontWeight:900, color:bn.overall>=85?"#22c55e":bn.overall>=70?"#fbbf24":"#ef4444", textShadow:`0 0 30px ${bn.overall>=85?"#22c55e":bn.overall>=70?"#fbbf24":"#ef4444"}44` }}>{bn.overall}%</div>
            <div style={{ fontSize:12, color:T.text2 }}>{bn.overall>=90?"تجميعة متوازنة ممتازة 🏆":bn.overall>=75?"تجميعة جيدة ✅":bn.overall>=60?"يوجد عنق زجاجي ⚠️":"عنق زجاجي شديد ❌"}</div>
          </div>
          {bn.mainBN&&(
            <div style={{ background:"#ef444415", border:"1px solid #ef444433", borderRadius:10, padding:"12px 14px", marginBottom:14, display:"flex", gap:10 }}>
              <span style={{ fontSize:20 }}>⚠️</span>
              <div><div style={{ fontWeight:700, fontSize:13, color:"#ef4444", marginBottom:2 }}>عنق زجاجي — {bn.mainBN.part}</div><div style={{ fontSize:11, color:"#fca5a5" }}>{bn.mainBN.msg}</div></div>
            </div>
          )}
          {Object.entries(bn.scores).map(([type,score])=>build[type]&&(
            <div key={type} style={{ marginBottom:7 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.text2, marginBottom:3 }}>
                <span>{typeIcons[type]} {type}</span>
                <span style={{ color:score>=85?"#22c55e":score>=70?"#fbbf24":"#ef4444", fontWeight:700 }}>{score}% {score<75&&"⚠️"}</span>
              </div>
              <div style={{ background:`${T.neon}08`, borderRadius:4, height:5 }}>
                <div style={{ width:`${score}%`, height:"100%", background:score>=85?"#22c55e":score>=70?"#fbbf24":"#ef4444", borderRadius:4, transition:"width 0.8s" }} />
              </div>
            </div>
          ))}
        </GlassCard>
      )}
 
      {buildList.length>0&&(
        <GlassCard style={{ padding:"16px 18px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <span style={{ fontWeight:700, color:T.text }}>💰 الإجمالي</span>
            <span style={{ fontWeight:900, fontSize:24, color:T.neon, direction:"ltr" }}>{total.toLocaleString()} ر.س</span>
          </div>
          {buildList.map(p=>(
            <div key={p.id} style={{ marginBottom:6 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:T.text2, marginBottom:3 }}>
                <span>{typeIcons[p.type]} {p.type}</span>
                <span style={{ color:p.color, direction:"ltr" }}>{Math.round(p.priceSAR/total*100)}% · {p.priceSAR.toLocaleString()} ر.س</span>
              </div>
              <div style={{ background:`${T.neon}08`, borderRadius:3, height:4 }}>
                <div style={{ width:`${p.priceSAR/total*100}%`, height:"100%", background:p.color, borderRadius:3 }} />
              </div>
            </div>
          ))}
        </GlassCard>
      )}
 
      {buildList.length===0&&(
        <GlassCard style={{ textAlign:"center", padding:"50px 20px" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔧</div>
          <div style={{ fontWeight:700, color:T.text, marginBottom:8 }}>تجميعتك فاضية</div>
          <button onClick={()=>setPage("parts")} style={{ background:`linear-gradient(135deg,${T.neon},${T.neon2})`, border:"none", borderRadius:11, padding:"10px 22px", color:"#fff", fontWeight:700, cursor:"pointer" }}>تصفح القطع</button>
        </GlassCard>
      )}
    </div>
  );
}
 
// ===================== APP =====================
export default function App() {
  const [page, setPage] = useState("home");
  const [build, setBuild] = useState({});
  const buildCount = Object.keys(build).length;
 
  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Tajawal',sans-serif", direction:"rtl", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:${T.neon}44;border-radius:3px;}
        button{font-family:'Tajawal',sans-serif;}
        @keyframes bounce{0%,100%{transform:translateY(0);opacity:0.3}50%{transform:translateY(-6px);opacity:1}}
      `}</style>
 
      {/* Background glow */}
      <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
        <div style={{ position:"absolute", top:-200, right:-200, width:600, height:600, background:`radial-gradient(circle, ${T.neon}08, transparent 70%)`, borderRadius:"50%" }} />
        <div style={{ position:"absolute", bottom:-200, left:-200, width:500, height:500, background:`radial-gradient(circle, ${T.neon2}08, transparent 70%)`, borderRadius:"50%" }} />
      </div>
 
      {/* NAVBAR */}
      <nav style={{ background:"rgba(13,0,21,0.85)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.glassBorder}`, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:56, position:"sticky", top:0, zIndex:100, flexShrink:0 }}>
        <div style={{ fontWeight:900, fontSize:16, color:T.neon, letterSpacing:1, textShadow:`0 0 20px ${T.neon}` }}>🖥️ PC BUILDER SA</div>
        <div style={{ display:"flex", gap:4 }}>
          {[["home","🏠","الرئيسية"],["parts","📋","القطع"],["compare","⚖️","مقارنة"],["build","🔧","تجميعتي"]].map(([p,ic,lb])=>(
            <button key={p} onClick={()=>setPage(p)} style={{ background:page===p?`${T.neon}18`:"none", border:`1px solid ${page===p?T.neon+"44":"transparent"}`, backdropFilter:"blur(10px)", borderRadius:9, padding:"6px 14px", color:page===p?T.neon:T.text3, cursor:"pointer", fontSize:12, fontWeight:page===p?700:400, display:"flex", alignItems:"center", gap:4, position:"relative", transition:"all 0.2s" }}>
              {ic} {lb}
              {p==="build"&&buildCount>0&&<span style={{ background:T.neon, color:"#000", borderRadius:"50%", width:16, height:16, fontSize:9, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900 }}>{buildCount}</span>}
            </button>
          ))}
        </div>
      </nav>
 
      <div style={{ flex:1, overflow:page==="parts"?"hidden":"auto", position:"relative", zIndex:1 }}>
        {page==="home"&&<div style={{ maxWidth:1100, margin:"0 auto", paddingTop:20, paddingBottom:40 }}><HomePage setPage={setPage} /></div>}
        {page==="parts"&&<PartsPage build={build} setBuild={setBuild} />}
        {page==="compare"&&<ComparePage />}
        {page==="build"&&<BuildPage build={build} setBuild={setBuild} setPage={setPage} />}
      </div>
    </div>
  );
}
