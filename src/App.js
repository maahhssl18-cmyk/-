cat > /mnt/user-data/outputs/App.js << 'ENDOFFILE'
import { useState } from "react";

// ===================== DATA =====================

const usageProfiles = [
  { id: "casual_gaming", icon: "🎮", label: "ألعاب عادية", desc: "تلعب بدون احتراف" },
  { id: "pro_gaming", icon: "🏆", label: "ألعاب احترافية", desc: "تنافسي، FPS، أعلى فريم ريت" },
  { id: "design", icon: "🎨", label: "تصميم وإبداع", desc: "Adobe، Blender، فيديو، ثري دي" },
  { id: "ai_ml", icon: "🤖", label: "ذكاء اصطناعي / ML", desc: "تدريب نماذج، Python، CUDA" },
  { id: "study", icon: "📚", label: "دراسة وعمل", desc: "برامج عادية، إنتاجية" },
  { id: "4k_content", icon: "🎬", label: "محتوى 4K وVR", desc: "تصوير، مونتاج، واقع افتراضي" },
];

const resolutions = [
  { id: "1080p", label: "1080p", desc: "Full HD" },
  { id: "1440p", label: "1440p", desc: "2K - القياسي الأفضل" },
  { id: "4k", label: "4K", desc: "Ultra HD" },
];

const budgetRanges = [
  { id: "b1", label: "أقل من 1,500 ريال", min: 0, max: 1500 },
  { id: "b2", label: "1,500 – 2,500 ريال", min: 1500, max: 2500 },
  { id: "b3", label: "2,500 – 4,000 ريال", min: 2500, max: 4000 },
  { id: "b4", label: "4,000 – 7,000 ريال", min: 4000, max: 7000 },
  { id: "b5", label: "أكثر من 7,000 ريال", min: 7000, max: 99999 },
];

const fullBuildBudgets = [
  { id: "fb1", label: "3,000 – 5,000 ريال", min: 3000, max: 5000 },
  { id: "fb2", label: "5,000 – 8,000 ريال", min: 5000, max: 8000 },
  { id: "fb3", label: "8,000 – 12,000 ريال", min: 8000, max: 12000 },
  { id: "fb4", label: "12,000 – 18,000 ريال", min: 12000, max: 18000 },
  { id: "fb5", label: "أكثر من 18,000 ريال", min: 18000, max: 99999 },
];

const cpuDatabase = [
  { id: "i5_14400f", brand: "Intel", name: "Core i5-14400F", socket: "LGA1700", gen: "14th Gen", priceSAR: 700, score: { casual_gaming: 80, pro_gaming: 72, design: 70, ai_ml: 55, study: 88, "4k_content": 68 }, compatibleGPUs: ["rtx5060", "rtx5060ti_8", "rtx5060ti_16", "rtx5070"], pros: ["سعر ممتاز", "أداء جيد للألعاب", "لا يحتاج تبريد مكلف"], cons: ["لا رسوم مدمجة", "لا Overclocking"], tag: "الأفضل للميزانية", color: "#3b82f6", tier: 1 },
  { id: "i5_14600k", brand: "Intel", name: "Core i5-14600K", socket: "LGA1700", gen: "14th Gen", priceSAR: 900, score: { casual_gaming: 87, pro_gaming: 83, design: 80, ai_ml: 65, study: 85, "4k_content": 78 }, compatibleGPUs: ["rtx5060ti_8", "rtx5060ti_16", "rtx5070", "rtx5070ti"], pros: ["14 نواة", "Overclocking", "أداء ممتاز"], cons: ["يحتاج تبريد جيد"], tag: "توازن ممتاز", color: "#3b82f6", tier: 2 },
  { id: "i7_14700k", brand: "Intel", name: "Core i7-14700K", socket: "LGA1700", gen: "14th Gen", priceSAR: 1400, score: { casual_gaming: 90, pro_gaming: 88, design: 90, ai_ml: 78, study: 88, "4k_content": 88 }, compatibleGPUs: ["rtx5070", "rtx5070ti", "rtx5080"], pros: ["20 نواة", "ممتاز للتصميم"], cons: ["يحتاج تبريد مكلف"], tag: "للمحترفين", color: "#3b82f6", tier: 3 },
  { id: "i9_14900k", brand: "Intel", name: "Core i9-14900K", socket: "LGA1700", gen: "14th Gen", priceSAR: 2100, score: { casual_gaming: 88, pro_gaming: 90, design: 96, ai_ml: 88, study: 85, "4k_content": 95 }, compatibleGPUs: ["rtx5070ti", "rtx5080", "rtx5090"], pros: ["24 نواة", "الأقوى من Intel"], cons: ["حرارة مرتفعة جداً"], tag: "فلاقشيب Intel", color: "#3b82f6", tier: 4 },
  { id: "r5_9600x", brand: "AMD", name: "Ryzen 5 9600X", socket: "AM5", gen: "Ryzen 9000", priceSAR: 1050, score: { casual_gaming: 85, pro_gaming: 82, design: 75, ai_ml: 62, study: 86, "4k_content": 72 }, compatibleGPUs: ["rtx5060ti_8", "rtx5060ti_16", "rtx5070"], pros: ["كفاءة ممتازة", "حرارة منخفضة"], cons: ["6 نوى فقط"], tag: "كفاءة عالية", color: "#ef4444", tier: 2 },
  { id: "r7_9700x", brand: "AMD", name: "Ryzen 7 9700X", socket: "AM5", gen: "Ryzen 9000", priceSAR: 1350, score: { casual_gaming: 88, pro_gaming: 86, design: 84, ai_ml: 72, study: 88, "4k_content": 82 }, compatibleGPUs: ["rtx5060ti_16", "rtx5070", "rtx5070ti"], pros: ["8 نوى", "65W حرارة منخفضة"], cons: ["ليس X3D"], tag: "توازن AMD", color: "#ef4444", tier: 2 },
  { id: "r7_9800x3d", brand: "AMD", name: "Ryzen 7 9800X3D", socket: "AM5", gen: "Ryzen 9000", priceSAR: 1575, score: { casual_gaming: 98, pro_gaming: 99, design: 82, ai_ml: 70, study: 85, "4k_content": 80 }, compatibleGPUs: ["rtx5070", "rtx5070ti", "rtx5080", "rtx5090"], pros: ["الأفضل للألعاب عالمياً", "3D V-Cache"], cons: ["غالي نسبياً"], tag: "⭐ ملك الألعاب", color: "#ef4444", tier: 3 },
  { id: "r9_9950x", brand: "AMD", name: "Ryzen 9 9950X", socket: "AM5", gen: "Ryzen 9000", priceSAR: 2440, score: { casual_gaming: 88, pro_gaming: 86, design: 98, ai_ml: 96, study: 88, "4k_content": 97 }, compatibleGPUs: ["rtx5080", "rtx5090"], pros: ["16 نواة", "الأفضل لـ AI"], cons: ["سعر مرتفع"], tag: "فلاقشيب AMD", color: "#ef4444", tier: 4 },
];

const gpuDatabase = [
  { id: "rtx5060", name: "RTX 5060", vram: "8GB GDDR7", priceSAR: 1125, compatibleCPUs: ["i5_14400f", "i5_14600k"], score: { casual_gaming: 80, study: 90, pro_gaming: 55, design: 50, ai_ml: 40, "4k_content": 30 }, resolutions: ["1080p"], tag: "اقتصادي", color: "#22c55e", tier: 1, pros: ["سعر ممتاز", "DLSS 4"], cons: ["8GB محدودة"] },
  { id: "rtx5060ti_8", name: "RTX 5060 Ti 8GB", vram: "8GB GDDR7", priceSAR: 1425, compatibleCPUs: ["i5_14400f", "i5_14600k", "r5_9600x"], score: { casual_gaming: 85, study: 88, pro_gaming: 65, design: 58, ai_ml: 45, "4k_content": 40 }, resolutions: ["1080p", "1440p"], tag: "قيمة جيدة", color: "#3b82f6", tier: 1, pros: ["أداء أفضل من 5060"], cons: ["8GB محدودة"] },
  { id: "rtx5060ti_16", name: "RTX 5060 Ti 16GB", vram: "16GB GDDR7", priceSAR: 1612, compatibleCPUs: ["i5_14400f", "i5_14600k", "r5_9600x", "r7_9700x"], score: { casual_gaming: 88, study: 90, pro_gaming: 70, design: 75, ai_ml: 60, "4k_content": 55 }, resolutions: ["1080p", "1440p"], tag: "موصى به", color: "#f59e0b", tier: 2, pros: ["16GB VRAM ممتازة"], cons: ["أغلى من 8GB"] },
  { id: "rtx5070", name: "RTX 5070", vram: "12GB GDDR7", priceSAR: 2060, compatibleCPUs: ["i5_14600k", "i7_14700k", "r5_9600x", "r7_9700x", "r7_9800x3d"], score: { casual_gaming: 93, study: 85, pro_gaming: 88, design: 82, ai_ml: 70, "4k_content": 75 }, resolutions: ["1080p", "1440p", "4k"], tag: "⭐ الخيار الذهبي", color: "#8b5cf6", tier: 3, pros: ["1440p مثالي", "DLSS 4"], cons: ["12GB تكفي"] },
  { id: "rtx5070ti", name: "RTX 5070 Ti", vram: "16GB GDDR7", priceSAR: 2810, compatibleCPUs: ["i7_14700k", "r7_9700x", "r7_9800x3d"], score: { casual_gaming: 90, study: 82, pro_gaming: 96, design: 92, ai_ml: 82, "4k_content": 90 }, resolutions: ["1440p", "4k"], tag: "للمحترفين", color: "#ef4444", tier: 3, pros: ["16GB VRAM", "أعلى FPS"], cons: ["سعر مرتفع"] },
  { id: "rtx5080", name: "RTX 5080", vram: "16GB GDDR7", priceSAR: 3745, compatibleCPUs: ["i9_14900k", "r7_9800x3d", "r9_9950x"], score: { casual_gaming: 85, study: 75, pro_gaming: 98, design: 97, ai_ml: 92, "4k_content": 97 }, resolutions: ["4k"], tag: "فئة عليا", color: "#f97316", tier: 4, pros: ["4K سلس", "أداء استثنائي"], cons: ["سعر مرتفع"] },
  { id: "rtx5090", name: "RTX 5090", vram: "32GB GDDR7", priceSAR: 7495, compatibleCPUs: ["i9_14900k", "r9_9950x"], score: { casual_gaming: 80, study: 70, pro_gaming: 99, design: 99, ai_ml: 99, "4k_content": 99 }, resolutions: ["4k"], tag: "الفلاقشيب", color: "#6366f1", tier: 4, pros: ["32GB VRAM", "الأقوى"], cons: ["سعر خرافي"] },
];

const psuDatabase = [
  { id: "coolermaster_650", brand: "Cooler Master", name: "MWE Gold 650W", watt: 650, priceSAR: 280, cert: "80+ Gold", tier: 1, compatibleTiers: [1, 2], pros: ["سعر ممتاز", "80+ Gold"], cons: ["لا يكفي للكروت العالية"], tag: "اقتصادي", color: "#22c55e" },
  { id: "corsair_750", brand: "Corsair", name: "RM750e 750W", watt: 750, priceSAR: 380, cert: "80+ Gold", tier: 2, compatibleTiers: [1, 2, 3], pros: ["Fully Modular", "هادئ جداً", "ATX 3.0"], cons: ["لا يكفي لـ 5080/5090"], tag: "توازن ممتاز", color: "#3b82f6" },
  { id: "seasonic_850", brand: "Seasonic", name: "Focus GX-850W", watt: 850, priceSAR: 530, cert: "80+ Gold", tier: 3, compatibleTiers: [2, 3, 4], pros: ["الأموثوقية الأعلى", "ضمان 10 سنوات"], cons: ["سعر أعلى نسبياً"], tag: "⭐ الأفضل جودة", color: "#8b5cf6" },
  { id: "bequiet_1000", brand: "be quiet!", name: "Pure Power 13 1000W", watt: 1000, priceSAR: 650, cert: "80+ Gold", tier: 4, compatibleTiers: [3, 4], pros: ["1000W كافية لأي تجميعة", "صامت جداً", "ATX 3.1"], cons: ["سعر مرتفع"], tag: "للتجميعات القوية", color: "#ef4444" },
  { id: "corsair_1000", brand: "Corsair", name: "HX1000 1000W", watt: 1000, priceSAR: 750, cert: "80+ Platinum", tier: 4, compatibleTiers: [3, 4], pros: ["Platinum كفاءة عالية", "ضمان 10 سنوات"], cons: ["سعر مرتفع"], tag: "بلاتينيوم", color: "#f97316" },
];

const mbDatabase = [
  { id: "msi_b760", brand: "MSI", name: "PRO B760M-P DDR5", socket: "LGA1700", chipset: "B760", priceSAR: 659, compatibleCPUs: ["i5_14400f", "i5_14600k"], pros: ["سعر ممتاز", "DDR5"], cons: ["ميزات محدودة"], tag: "اقتصادي Intel", color: "#3b82f6", tier: 1 },
  { id: "asus_z790", brand: "ASUS", name: "TUF Gaming Z790-Plus", socket: "LGA1700", chipset: "Z790", priceSAR: 1629, compatibleCPUs: ["i5_14600k", "i7_14700k", "i9_14900k"], pros: ["Z790 كامل", "WiFi", "OC ممتاز"], cons: ["سعر أعلى"], tag: "Gaming Intel", color: "#3b82f6", tier: 2 },
  { id: "asus_rog_z790", brand: "ASUS", name: "ROG Strix Z790-F WiFi", socket: "LGA1700", chipset: "Z790", priceSAR: 2149, compatibleCPUs: ["i7_14700k", "i9_14900k"], pros: ["ROG أعلى جودة", "WiFi 6E", "ممتاز للـ OC"], cons: ["سعر مرتفع"], tag: "ROG فلاقشيب", color: "#3b82f6", tier: 3 },
  { id: "gigabyte_b850", brand: "Gigabyte", name: "B850 Aorus Elite WiFi7", socket: "AM5", chipset: "B850", priceSAR: 935, compatibleCPUs: ["r5_9600x", "r7_9700x", "r7_9800x3d"], pros: ["WiFi 7", "PCIe 5.0", "DDR5"], cons: ["B850 متوسط"], tag: "⭐ أفضل قيمة AMD", color: "#ef4444", tier: 2 },
  { id: "asus_x870", brand: "ASUS", name: "PRIME X870-P WiFi", socket: "AM5", chipset: "X870", priceSAR: 1499, compatibleCPUs: ["r5_9600x", "r7_9700x", "r7_9800x3d", "r9_9950x"], pros: ["X870 كامل", "WiFi 6E", "DDR5"], cons: ["سعر أعلى"], tag: "X870 AMD", color: "#ef4444", tier: 3 },
  { id: "msi_x870e", brand: "MSI", name: "MEG X870E ACE", socket: "AM5", chipset: "X870E", priceSAR: 2199, compatibleCPUs: ["r7_9800x3d", "r9_9950x"], pros: ["X870E فلاقشيب", "أعلى أداء", "PCIe 5.0"], cons: ["سعر مرتفع"], tag: "فلاقشيب AMD", color: "#ef4444", tier: 4 },
];

const ramDatabase = [
  { id: "kingston_16", brand: "Kingston", name: "FURY Beast 16GB DDR5-5600", size: "16GB", speed: "5600MHz", priceSAR: 280, tier: 1, pros: ["سعر ممتاز", "موثوقية عالية"], cons: ["16GB قد لا تكفي للتصميم"], tag: "اقتصادي", color: "#22c55e" },
  { id: "corsair_32", brand: "Corsair", name: "Vengeance 32GB DDR5-6000", size: "32GB", speed: "6000MHz", priceSAR: 420, tier: 2, pros: ["32GB مثالية للعمل", "DDR5-6000 سرعة ممتازة"], cons: ["سعر أعلى من 16GB"], tag: "⭐ الأفضل للأغلبية", color: "#8b5cf6" },
  { id: "gskill_32", brand: "G.Skill", name: "Trident Z5 32GB DDR5-6000", size: "32GB", speed: "6000MHz", priceSAR: 490, tier: 2, pros: ["أداء عالٍ", "RGB رائع", "XMP 3.0"], cons: ["أغلى من Corsair"], tag: "RGB ممتاز", color: "#f59e0b" },
  { id: "corsair_64", brand: "Corsair", name: "Vengeance 64GB DDR5-6000", size: "64GB", speed: "6000MHz", priceSAR: 850, tier: 3, pros: ["64GB للـ AI والتصميم", "EXPO دعم"], cons: ["سعر مرتفع"], tag: "للمحترفين", color: "#ef4444" },
  { id: "gskill_64", brand: "G.Skill", name: "Flare X5 64GB DDR5-6000", size: "64GB", speed: "6000MHz", priceSAR: 950, tier: 3, pros: ["AMD EXPO", "أداء استثنائي"], cons: ["سعر مرتفع"], tag: "فلاقشيب رام", color: "#6366f1" },
];

// ===================== HELPERS =====================
function getGPURecs(usage, res, budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return gpuDatabase.filter(g => g.priceSAR <= b.max * 1.15 && g.priceSAR >= b.min * 0.85 && g.resolutions.includes(res)).sort((a, c) => c.score[usage] - a.score[usage]).slice(0, 3);
}
function getCPURecs(usage, budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return cpuDatabase.filter(c => c.priceSAR <= b.max * 0.6).sort((a, c) => c.score[usage] - a.score[usage]).slice(0, 3);
}
function getPSURecs(budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return psuDatabase.filter(p => p.priceSAR <= b.max * 0.3).sort((a, c) => c.watt - a.watt).slice(0, 2);
}
function getMBRecs(cpuSocket, budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return mbDatabase.filter(m => m.socket === cpuSocket && m.priceSAR <= b.max * 0.4).sort((a, c) => c.priceSAR - a.priceSAR).slice(0, 2);
}
function getRAMRecs(budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return ramDatabase.filter(r => r.priceSAR <= b.max * 0.2).sort((a, c) => c.priceSAR - a.priceSAR).slice(0, 2);
}
function getCompatibleGPUs(cpuId) { return gpuDatabase.filter(g => g.compatibleCPUs.includes(cpuId)); }
function getCompatibleCPUs(gpuId) { return cpuDatabase.filter(c => c.compatibleGPUs.includes(gpuId)); }

// Full build recommendation
function getFullBuild(usage, fbBudget) {
  const b = fullBuildBudgets.find(x => x.id === fbBudget);
  const total = b.max;

  // allocate budget: GPU 40%, CPU 20%, MB 12%, RAM 10%, PSU 8%, rest buffer
  const gpuMax = total * 0.42;
  const cpuMax = total * 0.22;
  const mbMax = total * 0.14;
  const ramMax = total * 0.12;
  const psuMax = total * 0.10;

  const gpu = gpuDatabase.filter(g => g.priceSAR <= gpuMax).sort((a, c) => c.score[usage] - a.score[usage])[0];
  const cpu = cpuDatabase.filter(c => c.priceSAR <= cpuMax).sort((a, c) => c.score[usage] - a.score[usage])[0];
  const mb = cpu ? mbDatabase.filter(m => m.socket === cpu.socket && m.priceSAR <= mbMax).sort((a, c) => c.priceSAR - a.priceSAR)[0] : null;
  const ram = ramDatabase.filter(r => r.priceSAR <= ramMax).sort((a, c) => c.priceSAR - a.priceSAR)[0];
  const psu = psuDatabase.filter(p => p.priceSAR <= psuMax).sort((a, c) => c.watt - a.watt)[0];

  const totalPrice = (gpu?.priceSAR || 0) + (cpu?.priceSAR || 0) + (mb?.priceSAR || 0) + (ram?.priceSAR || 0) + (psu?.priceSAR || 0);
  return { gpu, cpu, mb, ram, psu, totalPrice };
}

// ===================== COMPONENTS =====================
function ScoreBar({ score, color }) {
  return <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 7, overflow: "hidden", marginTop: 4 }}><div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 8 }} /></div>;
}

function MiniCard({ label, name, price, color, extra }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33`, borderRadius: 12, padding: "12px 14px", marginBottom: 8 }}>
      <div style={{ fontSize: 10, color, fontWeight: 700, marginBottom: 2 }}>{label}</div>
      <div style={{ fontWeight: 800, fontSize: 13, color: "#e2e8f0" }}>{name}</div>
      {extra && <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{extra}</div>}
      <div style={{ fontSize: 13, fontWeight: 800, color, marginTop: 4 }}>~{price?.toLocaleString()} ر.س</div>
    </div>
  );
}

function CardBig({ item, type, usage, onViewCompat }) {
  const score = usage ? item.score?.[usage] : null;
  const color = item.color || "#8b5cf6";
  return (
    <div style={{ background: "rgba(15,23,42,0.85)", border: `1.5px solid ${color}55`, borderRadius: 20, padding: "18px", marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 10, color, fontWeight: 700, marginBottom: 3 }}>{item.brand || "NVIDIA"} · {item.gen || item.vram || item.cert || item.chipset || item.speed}</div>
          <div style={{ fontSize: 19, fontWeight: 900, color: "#e2e8f0" }}>{type === "gpu" ? "NVIDIA " : ""}{item.name}</div>
          <div style={{ display: "inline-block", marginTop: 5, background: color + "22", border: `1px solid ${color}44`, borderRadius: 7, padding: "2px 9px", fontSize: 10, color }}>{item.tag}</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#e2e8f0" }}>~{item.priceSAR?.toLocaleString()} ر.س</div>
          {score && <><div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>ملاءمة: {score}%</div><ScoreBar score={score} color={color} /></>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
        <div><div style={{ fontSize: 10, color: "#22c55e", fontWeight: 700, marginBottom: 5 }}>✅ مميزات</div>{item.pros?.map((p, i) => <div key={i} style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2 }}>• {p}</div>)}</div>
        <div><div style={{ fontSize: 10, color: "#ef4444", fontWeight: 700, marginBottom: 5 }}>⚠️ ملاحظات</div>{item.cons?.map((c, i) => <div key={i} style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2 }}>• {c}</div>)}</div>
      </div>
      {onViewCompat && <button onClick={() => onViewCompat(item, type)} style={{ marginTop: 12, width: "100%", background: color + "15", border: `1px solid ${color}44`, borderRadius: 9, padding: "8px", color, fontWeight: 700, cursor: "pointer", fontSize: 11 }}>🔗 وش يتوافق مع هذا {type === "gpu" ? "الكرت" : "المعالج"}؟</button>}
    </div>
  );
}

function CompatModal({ item, type, onClose }) {
  const list = type === "gpu" ? getCompatibleCPUs(item.id) : getCompatibleGPUs(item.id);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#0d1117", border: "1.5px solid rgba(99,102,241,0.4)", borderRadius: 22, padding: 22, maxWidth: 480, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: "#e2e8f0" }}>{type === "gpu" ? `معالجات تشتغل مع ${item.name}` : `كروت تشتغل مع ${item.name}`}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        {list.length === 0 && <div style={{ color: "#64748b", textAlign: "center", padding: 20 }}>لا يوجد في قاعدة البيانات</div>}
        {list.map(x => <div key={x.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 11, padding: "11px 14px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{type === "gpu" ? "" : "NVIDIA "}{x.name}</div><div style={{ fontSize: 10, color: "#64748b" }}>{x.brand || x.vram} {x.gen || ""}</div></div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#06b6d4" }}>~{x.priceSAR?.toLocaleString()} ر.س</div>
        </div>)}
        <button onClick={onClose} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 11, padding: "11px", color: "#fff", fontWeight: 700, cursor: "pointer", marginTop: 6 }}>إغلاق</button>
      </div>
    </div>
  );
}

// ===================== MAIN =====================
export default function App() {
  const [screen, setScreen] = useState("home"); // home | single | full
  const [singleType, setSingleType] = useState(null);
  const [step, setStep] = useState(1);
  const [usages, setUsages] = useState([]);
  const [resolution, setResolution] = useState(null);
  const [budget, setBudget] = useState(null);
  const [fbBudget, setFbBudget] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [compatItem, setCompatItem] = useState(null);

  const usage = usages[0] || null;

  const gpuRecs = showResult && (singleType === "gpu") ? getGPURecs(usage, resolution || "1440p", budget) : [];
  const cpuRecs = showResult && (singleType === "cpu") ? getCPURecs(usage, budget) : [];
  const psuRecs = showResult && (singleType === "psu") ? getPSURecs(budget) : [];
  const mbRecs = showResult && (singleType === "mb") ? getMBRecs(usage?.includes("amd") ? "AM5" : "LGA1700", budget) : [];
  const ramRecs = showResult && (singleType === "ram") ? getRAMRecs(budget) : [];
  const fullBuild = showResult && screen === "full" && fbBudget ? getFullBuild(usage, fbBudget) : null;

  const reset = () => { setScreen("home"); setSingleType(null); setStep(1); setUsages([]); setResolution(null); setBudget(null); setFbBudget(null); setShowResult(false); setCompatItem(null); };
  const toggleUsage = (id) => setUsages(prev => prev.includes(id) ? prev.filter(u => u !== id) : prev.length < 3 ? [...prev, id] : prev);

  const singleTypes = [
    { id: "gpu", icon: "🖥️", label: "كرت شاشة" },
    { id: "cpu", icon: "⚡", label: "معالج" },
    { id: "psu", icon: "🔌", label: "باور سبلاي" },
    { id: "mb", icon: "🔧", label: "مذربورد" },
    { id: "ram", icon: "💾", label: "رامات" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a0f,#0d1117,#0a0f1a)", fontFamily: "'Tajawal',sans-serif", direction: "rtl", color: "#e2e8f0", padding: "20px 16px" }}>
      {compatItem && <CompatModal item={compatItem.item} type={compatItem.type} onClose={() => setCompatItem(null)} />}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <h1 style={{ fontSize: "clamp(20px,5vw,34px)", fontWeight: 900, margin: 0, background: "linear-gradient(90deg,#e2e8f0,#06b6d4,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🖥️ مساعد اختيار المكونات</h1>
          <p style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>GPU · CPU · PSU · Motherboard · RAM</p>
        </div>

        {/* HOME */}
        {screen === "home" && (
          <div>
            <div style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: "#94a3b8", marginBottom: 14 }}>وش تبي؟</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <button onClick={() => setScreen("single")} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(99,102,241,0.3)", borderRadius: 18, padding: "22px 16px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#e2e8f0", marginBottom: 4 }}>اختيار قطعة واحدة</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>كرت / معالج / رامات / باور / مذربورد</div>
              </button>
              <button onClick={() => setScreen("full")} style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.15),rgba(6,182,212,0.1))", border: "1.5px solid rgba(99,102,241,0.5)", borderRadius: 18, padding: "22px 16px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🚀</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#e2e8f0", marginBottom: 4 }}>تجميعة كاملة</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>كل القطع مع بعض بميزانية واحدة</div>
              </button>
            </div>
          </div>
        )}

        {/* SINGLE PART */}
        {screen === "single" && !showResult && (
          <>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              {[1, 2, 3].map(s => <div key={s} style={{ width: s === step ? 30 : 9, height: 9, borderRadius: 5, background: s === step ? "linear-gradient(90deg,#6366f1,#06b6d4)" : s < step ? "#6366f1" : "#1e293b", transition: "all 0.4s" }} />)}
            </div>

            {step === 1 && !singleType && (
              <div>
                <div style={{ textAlign: "center", fontSize: 15, fontWeight: 700, color: "#94a3b8", marginBottom: 14 }}>وش القطعة؟</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 9 }}>
                  {singleTypes.map(t => <button key={t.id} onClick={() => setSingleType(t.id)} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 10px", cursor: "pointer", textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>{t.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#e2e8f0" }}>{t.label}</div>
                  </button>)}
                </div>
                <button onClick={() => { setScreen("home"); setStep(1); }} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "14px auto 0" }}>← رجوع</button>
              </div>
            )}

            {step === 1 && singleType && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#94a3b8" }}>وش راح تستخدم الجهاز فيه؟</h2>
                <p style={{ textAlign: "center", fontSize: 11, color: "#475569", marginBottom: 14 }}>اختر حتى 3 استخدامات</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                  {usageProfiles.map(u => { const sel = usages.includes(u.id); return <button key={u.id} onClick={() => toggleUsage(u.id)} style={{ background: sel ? "rgba(99,102,241,0.2)" : "rgba(15,23,42,0.8)", border: sel ? "1.5px solid #6366f1" : "1.5px solid rgba(255,255,255,0.06)", borderRadius: 13, padding: "12px 10px", cursor: "pointer", textAlign: "right" }}>
                    <div style={{ fontSize: 22, marginBottom: 3 }}>{u.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#e2e8f0", marginBottom: 1 }}>{u.label}</div>
                    <div style={{ fontSize: 10, color: "#64748b" }}>{u.desc}</div>
                    {sel && <div style={{ fontSize: 9, color: "#6366f1", marginTop: 3, fontWeight: 700 }}>✓ محدد</div>}
                  </button>; })}
                </div>
                <button disabled={usages.length === 0} onClick={() => setStep(singleType === "gpu" ? 2 : 3)} style={{ width: "100%", marginTop: 12, background: usages.length ? "linear-gradient(135deg,#6366f1,#06b6d4)" : "#1e293b", border: "none", borderRadius: 11, padding: "12px", color: usages.length ? "#fff" : "#475569", fontWeight: 700, cursor: usages.length ? "pointer" : "default", fontSize: 13 }}>التالي ←</button>
              </div>
            )}

            {step === 2 && singleType === "gpu" && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#94a3b8" }}>دقة شاشتك؟</h2>
                {resolutions.map(r => <button key={r.id} onClick={() => { setResolution(r.id); setStep(3); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 13, padding: "16px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 9 }}>
                  <div><div style={{ fontWeight: 800, fontSize: 16, color: "#e2e8f0" }}>{r.label}</div><div style={{ fontSize: 11, color: "#64748b" }}>{r.desc}</div></div>
                  <div style={{ color: "#06b6d4" }}>←</div>
                </button>)}
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "8px auto 0" }}>← رجوع</button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#94a3b8" }}>كم ميزانيتك للقطعة؟</h2>
                {budgetRanges.map(b => <button key={b.id} onClick={() => { setBudget(b.id); setShowResult(true); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{b.label}</span>
                  <span style={{ color: "#8b5cf6" }}>←</span>
                </button>)}
                <button onClick={() => setStep(singleType === "gpu" ? 2 : 1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "8px auto 0" }}>← رجوع</button>
              </div>
            )}
          </>
        )}

        {/* SINGLE RESULTS */}
        {screen === "single" && showResult && (
          <div>
            <div style={{ textAlign: "center", fontSize: 12, color: "#64748b", marginBottom: 14 }}>
              {singleType === "gpu" && <div style={{ color: "#8b5cf6", fontWeight: 700, fontSize: 13 }}>🖥️ كروت الشاشة الموصى بها</div>}
              {singleType === "cpu" && <div style={{ color: "#ef4444", fontWeight: 700, fontSize: 13 }}>⚡ المعالجات الموصى بها</div>}
              {singleType === "psu" && <div style={{ color: "#22c55e", fontWeight: 700, fontSize: 13 }}>🔌 باور سبلاي الموصى به</div>}
              {singleType === "mb" && <div style={{ color: "#3b82f6", fontWeight: 700, fontSize: 13 }}>🔧 المذربورد الموصى به</div>}
              {singleType === "ram" && <div style={{ color: "#f59e0b", fontWeight: 700, fontSize: 13 }}>💾 الرامات الموصى بها</div>}
            </div>

            {singleType === "gpu" && gpuRecs.map((g, i) => <div key={g.id}>{i === 0 && <div style={{ fontSize: 10, color: "#06b6d4", fontWeight: 700, marginBottom: 5 }}>✅ الاختيار الأمثل</div>}<CardBig item={g} type="gpu" usage={usage} onViewCompat={(item, type) => setCompatItem({ item, type })} /></div>)}
            {singleType === "cpu" && cpuRecs.map((c, i) => <div key={c.id}>{i === 0 && <div style={{ fontSize: 10, color: "#06b6d4", fontWeight: 700, marginBottom: 5 }}>✅ الاختيار الأمثل</div>}<CardBig item={c} type="cpu" usage={usage} onViewCompat={(item, type) => setCompatItem({ item, type })} /></div>)}
            {singleType === "psu" && psuRecs.map((p, i) => <div key={p.id}>{i === 0 && <div style={{ fontSize: 10, color: "#06b6d4", fontWeight: 700, marginBottom: 5 }}>✅ الاختيار الأمثل</div>}<CardBig item={p} type="psu" usage={null} onViewCompat={null} /></div>)}
            {singleType === "mb" && mbRecs.map((m, i) => <div key={m.id}>{i === 0 && <div style={{ fontSize: 10, color: "#06b6d4", fontWeight: 700, marginBottom: 5 }}>✅ الاختيار الأمثل</div>}<CardBig item={m} type="mb" usage={null} onViewCompat={null} /></div>)}
            {singleType === "ram" && ramRecs.map((r, i) => <div key={r.id}>{i === 0 && <div style={{ fontSize: 10, color: "#06b6d4", fontWeight: 700, marginBottom: 5 }}>✅ الاختيار الأمثل</div>}<CardBig item={r} type="ram" usage={null} onViewCompat={null} /></div>)}

            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 11, padding: "10px 14px", fontSize: 10, color: "#475569", textAlign: "center", marginBottom: 12 }}>
              💡 الأسعار تقريبية · قد تختلف حسب المتجر
            </div>
            <button onClick={reset} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 13, padding: "13px", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>🔄 ابدأ من جديد</button>
          </div>
        )}

        {/* FULL BUILD */}
        {screen === "full" && !showResult && (
          <div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              {[1, 2].map(s => <div key={s} style={{ width: s === step ? 30 : 9, height: 9, borderRadius: 5, background: s === step ? "linear-gradient(90deg,#6366f1,#06b6d4)" : s < step ? "#6366f1" : "#1e293b", transition: "all 0.4s" }} />)}
            </div>

            {step === 1 && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#94a3b8" }}>وش راح تستخدم الجهاز فيه؟</h2>
                <p style={{ textAlign: "center", fontSize: 11, color: "#475569", marginBottom: 14 }}>اختر حتى 3 استخدامات</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                  {usageProfiles.map(u => { const sel = usages.includes(u.id); return <button key={u.id} onClick={() => toggleUsage(u.id)} style={{ background: sel ? "rgba(99,102,241,0.2)" : "rgba(15,23,42,0.8)", border: sel ? "1.5px solid #6366f1" : "1.5px solid rgba(255,255,255,0.06)", borderRadius: 13, padding: "12px 10px", cursor: "pointer", textAlign: "right" }}>
                    <div style={{ fontSize: 22, marginBottom: 3 }}>{u.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "#e2e8f0" }}>{u.label}</div>
                    {sel && <div style={{ fontSize: 9, color: "#6366f1", marginTop: 3, fontWeight: 700 }}>✓ محدد</div>}
                  </button>; })}
                </div>
                <button disabled={usages.length === 0} onClick={() => setStep(2)} style={{ width: "100%", marginTop: 12, background: usages.length ? "linear-gradient(135deg,#6366f1,#06b6d4)" : "#1e293b", border: "none", borderRadius: 11, padding: "12px", color: usages.length ? "#fff" : "#475569", fontWeight: 700, cursor: usages.length ? "pointer" : "default", fontSize: 13 }}>التالي ←</button>
                <button onClick={() => { setScreen("home"); setStep(1); setUsages([]); }} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "10px auto 0" }}>← رجوع</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#94a3b8" }}>كم ميزانيتك الإجمالية للتجميعة؟</h2>
                {fullBuildBudgets.map(b => <button key={b.id} onClick={() => { setFbBudget(b.id); setShowResult(true); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{b.label}</span>
                  <span style={{ color: "#8b5cf6" }}>←</span>
                </button>)}
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "8px auto 0" }}>← رجوع</button>
              </div>
            )}
          </div>
        )}

        {/* FULL BUILD RESULT */}
        {screen === "full" && showResult && fullBuild && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#06b6d4", fontWeight: 700 }}>🚀 أفضل تجميعة لك</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#e2e8f0", marginTop: 4 }}>{fullBuild.totalPrice.toLocaleString()} ر.س</div>
              <div style={{ fontSize: 11, color: "#64748b" }}>السعر الإجمالي التقريبي</div>
            </div>

            <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(6,182,212,0.07))", border: "1.5px solid rgba(99,102,241,0.3)", borderRadius: 20, padding: "18px", marginBottom: 14 }}>
              {fullBuild.gpu && <MiniCard label="🖥️ كرت الشاشة" name={`NVIDIA ${fullBuild.gpu.name}`} price={fullBuild.gpu.priceSAR} color={fullBuild.gpu.color} extra={fullBuild.gpu.vram} />}
              {fullBuild.cpu && <MiniCard label="⚡ المعالج" name={fullBuild.cpu.name} price={fullBuild.cpu.priceSAR} color={fullBuild.cpu.color} extra={`${fullBuild.cpu.brand} · ${fullBuild.cpu.socket}`} />}
              {fullBuild.mb && <MiniCard label="🔧 المذربورد" name={fullBuild.mb.name} price={fullBuild.mb.priceSAR} color={fullBuild.mb.color} extra={`${fullBuild.mb.brand} · ${fullBuild.mb.chipset}`} />}
              {fullBuild.ram && <MiniCard label="💾 الرامات" name={fullBuild.ram.name} price={fullBuild.ram.priceSAR} color={fullBuild.ram.color} extra={fullBuild.ram.size} />}
              {fullBuild.psu && <MiniCard label="🔌 باور سبلاي" name={fullBuild.psu.name} price={fullBuild.psu.priceSAR} color={fullBuild.psu.color} extra={`${fullBuild.psu.watt}W · ${fullBuild.psu.cert}`} />}
            </div>

            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 11, padding: "10px 14px", fontSize: 10, color: "#475569", textAlign: "center", marginBottom: 12 }}>
              💡 الأسعار تقريبية · لا تشمل الكيس والتبريد والـ SSD · قد تختلف حسب المتجر
            </div>
            <button onClick={reset} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 13, padding: "13px", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>🔄 ابدأ من جديد</button>
          </div>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}button:active{transform:scale(0.97)}`}</style>
    </div>
  );
}
ENDOFFILE
echo "Done - $(wc -l < /mnt/user-data/outputs/App.js) lines"
الناتج
