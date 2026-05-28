import { useState } from "react";

const usageProfiles = [
  { id: "casual_gaming", icon: "🎮", label: "ألعاب عادية", desc: "تلعب بدون احتراف، ألعاب متنوعة" },
  { id: "pro_gaming", icon: "🏆", label: "ألعاب احترافية", desc: "تنافسي، FPS، أعلى فريم ريت ممكن" },
  { id: "design", icon: "🎨", label: "تصميم وإبداع", desc: "Adobe، Blender، فيديو، ثري دي" },
  { id: "ai_ml", icon: "🤖", label: "ذكاء اصطناعي / ML", desc: "تدريب نماذج، Python، CUDA" },
  { id: "study", icon: "📚", label: "دراسة وعمل", desc: "برامج عادية، شاشات متعددة، إنتاجية" },
  { id: "4k_content", icon: "🎬", label: "محتوى 4K وVR", desc: "تصوير، مونتاج، واقع افتراضي" },
];

const resolutions = [
  { id: "1080p", label: "1080p", desc: "Full HD" },
  { id: "1440p", label: "1440p", desc: "2K - القياسي الأفضل الآن" },
  { id: "4k", label: "4K", desc: "Ultra HD" },
];

const budgetRanges = [
  { id: "b1", label: "أقل من 1,500 ريال", min: 0, max: 1500 },
  { id: "b2", label: "1,500 – 2,500 ريال", min: 1500, max: 2500 },
  { id: "b3", label: "2,500 – 4,000 ريال", min: 2500, max: 4000 },
  { id: "b4", label: "4,000 – 7,000 ريال", min: 4000, max: 7000 },
  { id: "b5", label: "أكثر من 7,000 ريال", min: 7000, max: 99999 },
];

const cpuDatabase = [
  { id: "i5_14400f", brand: "Intel", name: "Core i5-14400F", socket: "LGA1700", gen: "14th Gen", priceSAR: 700, tier: "entry", score: { casual_gaming: 80, pro_gaming: 72, design: 70, ai_ml: 55, study: 88, "4k_content": 68 }, compatibleGPUs: ["rtx5060", "rtx5060ti_8", "rtx5060ti_16", "rtx5070"], pros: ["سعر ممتاز", "أداء جيد للألعاب العادية", "لا يحتاج تبريد مكلف"], cons: ["لا يدعم الرسوم المدمجة", "لا يدعم Overclocking"], tag: "الأفضل للميزانية المحدودة", color: "#3b82f6" },
  { id: "i5_14600k", brand: "Intel", name: "Core i5-14600K", socket: "LGA1700", gen: "14th Gen", priceSAR: 900, tier: "mid", score: { casual_gaming: 87, pro_gaming: 83, design: 80, ai_ml: 65, study: 85, "4k_content": 78 }, compatibleGPUs: ["rtx5060ti_8", "rtx5060ti_16", "rtx5070", "rtx5070ti"], pros: ["أداء ممتاز بسعر معقول", "يدعم Overclocking", "14 نواة"], cons: ["يحتاج تبريد جيد", "لا رسوم مدمجة (KF)"], tag: "توازن ممتاز", color: "#3b82f6" },
  { id: "i7_14700k", brand: "Intel", name: "Core i7-14700K", socket: "LGA1700", gen: "14th Gen", priceSAR: 1400, tier: "high", score: { casual_gaming: 90, pro_gaming: 88, design: 90, ai_ml: 78, study: 88, "4k_content": 88 }, compatibleGPUs: ["rtx5070", "rtx5070ti", "rtx5080"], pros: ["20 نواة", "ممتاز للتصميم والألعاب", "أداء متعدد المهام رهيب"], cons: ["يحتاج تبريد مكلف", "استهلاك كهرباء مرتفع"], tag: "للمحترفين", color: "#3b82f6" },
  { id: "i9_14900k", brand: "Intel", name: "Core i9-14900K", socket: "LGA1700", gen: "14th Gen", priceSAR: 2100, tier: "ultra", score: { casual_gaming: 88, pro_gaming: 90, design: 96, ai_ml: 88, study: 85, "4k_content": 95 }, compatibleGPUs: ["rtx5070ti", "rtx5080", "rtx5090"], pros: ["24 نواة", "الأقوى من Intel للإنتاجية", "أداء استثنائي"], cons: ["حرارة مرتفعة جداً", "يحتاج AIO 360mm", "سعر مرتفع"], tag: "فلاقشيب Intel", color: "#3b82f6" },
  { id: "r5_9600x", brand: "AMD", name: "Ryzen 5 9600X", socket: "AM5", gen: "Ryzen 9000", priceSAR: 1050, tier: "mid", score: { casual_gaming: 85, pro_gaming: 82, design: 75, ai_ml: 62, study: 86, "4k_content": 72 }, compatibleGPUs: ["rtx5060ti_8", "rtx5060ti_16", "rtx5070"], pros: ["كفاءة ممتازة", "حرارة منخفضة", "6 نواة قوية"], cons: ["6 نوى فقط", "ليس الأقوى للتصميم"], tag: "كفاءة عالية", color: "#ef4444" },
  { id: "r7_9700x", brand: "AMD", name: "Ryzen 7 9700X", socket: "AM5", gen: "Ryzen 9000", priceSAR: 1350, tier: "mid-high", score: { casual_gaming: 88, pro_gaming: 86, design: 84, ai_ml: 72, study: 88, "4k_content": 82 }, compatibleGPUs: ["rtx5060ti_16", "rtx5070", "rtx5070ti"], pros: ["8 نوى", "حرارة منخفضة 65W", "ممتاز للإنتاجية"], cons: ["ليس للـ X3D للألعاب"], tag: "توازن AMD الذهبي", color: "#ef4444" },
  { id: "r7_9800x3d", brand: "AMD", name: "Ryzen 7 9800X3D", socket: "AM5", gen: "Ryzen 9000", priceSAR: 1575, tier: "high", score: { casual_gaming: 98, pro_gaming: 99, design: 82, ai_ml: 70, study: 85, "4k_content": 80 }, compatibleGPUs: ["rtx5070", "rtx5070ti", "rtx5080", "rtx5090"], pros: ["الأفضل في العالم للألعاب", "3D V-Cache تقنية فريدة", "96MB Cache"], cons: ["غالي نسبياً", "ليس الأفضل للـ AI"], tag: "⭐ ملك الألعاب", color: "#ef4444" },
  { id: "r9_9950x", brand: "AMD", name: "Ryzen 9 9950X", socket: "AM5", gen: "Ryzen 9000", priceSAR: 2440, tier: "ultra", score: { casual_gaming: 88, pro_gaming: 86, design: 98, ai_ml: 96, study: 88, "4k_content": 97 }, compatibleGPUs: ["rtx5080", "rtx5090"], pros: ["16 نواة", "الأفضل لـ AI والتصميم", "أداء workstation"], cons: ["سعر مرتفع", "لا يستحق للألعاب فقط"], tag: "فلاقشيب AMD", color: "#ef4444" },
];

const gpuDatabase = [
  { id: "rtx5060", name: "RTX 5060", vram: "8GB GDDR7", priceSAR: 1125, compatibleCPUs: ["i5_14400f", "i5_14600k"], score: { casual_gaming: 80, study: 90, pro_gaming: 55, design: 50, ai_ml: 40, "4k_content": 30 }, resolutions: ["1080p"], tag: "اقتصادي", color: "#22c55e", pros: ["سعر ممتاز", "موفر للكهرباء", "DLSS 4"], cons: ["8GB VRAM محدودة", "ليست لـ 1440p بشكل مريح"] },
  { id: "rtx5060ti_8", name: "RTX 5060 Ti 8GB", vram: "8GB GDDR7", priceSAR: 1425, compatibleCPUs: ["i5_14400f", "i5_14600k", "r5_9600x"], score: { casual_gaming: 85, study: 88, pro_gaming: 65, design: 58, ai_ml: 45, "4k_content": 40 }, resolutions: ["1080p", "1440p"], tag: "قيمة جيدة", color: "#3b82f6", pros: ["أداء أفضل من 5060", "سعر معقول"], cons: ["8GB قد تكون محدودة مستقبلاً"] },
  { id: "rtx5060ti_16", name: "RTX 5060 Ti 16GB", vram: "16GB GDDR7", priceSAR: 1612, compatibleCPUs: ["i5_14400f", "i5_14600k", "r5_9600x", "r7_9700x"], score: { casual_gaming: 88, study: 90, pro_gaming: 70, design: 75, ai_ml: 60, "4k_content": 55 }, resolutions: ["1080p", "1440p"], tag: "موصى به", color: "#f59e0b", pros: ["16GB VRAM ممتازة", "مناسب للتصميم"], cons: ["أغلى من النسخة 8GB"] },
  { id: "rtx5070", name: "RTX 5070", vram: "12GB GDDR7", priceSAR: 2060, compatibleCPUs: ["i5_14600k", "i7_14700k", "r5_9600x", "r7_9700x", "r7_9800x3d"], score: { casual_gaming: 93, study: 85, pro_gaming: 88, design: 82, ai_ml: 70, "4k_content": 75 }, resolutions: ["1080p", "1440p", "4k"], tag: "⭐ الخيار الذهبي", color: "#8b5cf6", pros: ["1440p مثالي", "DLSS 4 رهيب", "توازن ممتاز"], cons: ["12GB تكفي لكن ليست الأكثر"] },
  { id: "rtx5070ti", name: "RTX 5070 Ti", vram: "16GB GDDR7", priceSAR: 2810, compatibleCPUs: ["i7_14700k", "r7_9700x", "r7_9800x3d"], score: { casual_gaming: 90, study: 82, pro_gaming: 96, design: 92, ai_ml: 82, "4k_content": 90 }, resolutions: ["1440p", "4k"], tag: "للمحترفين", color: "#ef4444", pros: ["16GB VRAM", "1440p بأعلى FPS", "ممتاز للتصميم"], cons: ["سعره مرتفع نسبياً"] },
  { id: "rtx5080", name: "RTX 5080", vram: "16GB GDDR7", priceSAR: 3745, compatibleCPUs: ["i9_14900k", "r7_9800x3d", "r9_9950x"], score: { casual_gaming: 85, study: 75, pro_gaming: 98, design: 97, ai_ml: 92, "4k_content": 97 }, resolutions: ["4k"], tag: "فئة عليا", color: "#f97316", pros: ["4K سلس تماماً", "أداء استثنائي"], cons: ["سعر مرتفع", "لا يستحق للألعاب العادية"] },
  { id: "rtx5090", name: "RTX 5090", vram: "32GB GDDR7", priceSAR: 7495, compatibleCPUs: ["i9_14900k", "r9_9950x"], score: { casual_gaming: 80, study: 70, pro_gaming: 99, design: 99, ai_ml: 99, "4k_content": 99 }, resolutions: ["4k"], tag: "الفلاقشيب", color: "#6366f1", pros: ["32GB VRAM", "الأقوى في السوق"], cons: ["سعر خرافي", "معظم الناس لا تحتاجه"] },
];

function getGPURecs(usage, resolution, budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return gpuDatabase.filter(g => g.priceSAR <= b.max * 1.15 && g.priceSAR >= b.min * 0.85 && g.resolutions.includes(resolution)).sort((a, c) => c.score[usage] - a.score[usage]).slice(0, 3);
}

function getCPURecs(usage, budget) {
  const b = budgetRanges.find(x => x.id === budget);
  return cpuDatabase.filter(c => c.priceSAR <= b.max * 0.6).sort((a, c) => c.score[usage] - a.score[usage]).slice(0, 3);
}

function getCompatibleGPUs(cpuId) { return gpuDatabase.filter(g => g.compatibleCPUs.includes(cpuId)); }
function getCompatibleCPUs(gpuId) { return cpuDatabase.filter(c => c.compatibleGPUs.includes(gpuId)); }

function ScoreBar({ score, color }) {
  return <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 7, overflow: "hidden", marginTop: 4 }}><div style={{ height: "100%", width: `${score}%`, background: color, borderRadius: 8 }} /></div>;
}

function CardBig({ item, type, usage, onViewCompat }) {
  const score = item.score[usage];
  const color = item.color || "#8b5cf6";
  return (
    <div style={{ background: "rgba(15,23,42,0.85)", border: `1.5px solid ${color}55`, borderRadius: 20, padding: "20px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontSize: 11, color, fontWeight: 700, marginBottom: 4 }}>{item.brand || "NVIDIA"} · {item.gen || item.vram}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#e2e8f0" }}>{type === "gpu" ? "NVIDIA " : ""}{item.name}</div>
          <div style={{ display: "inline-block", marginTop: 6, background: color + "22", border: `1px solid ${color}55`, borderRadius: 8, padding: "3px 10px", fontSize: 11, color }}>{item.tag}</div>
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#e2e8f0" }}>~{item.priceSAR.toLocaleString()} ر.س</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>ملاءمة: {score}%</div>
          <ScoreBar score={score} color={color} />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
        <div><div style={{ fontSize: 11, color: "#22c55e", fontWeight: 700, marginBottom: 6 }}>✅ مميزات</div>{item.pros.map((p, i) => <div key={i} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>• {p}</div>)}</div>
        <div><div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, marginBottom: 6 }}>⚠️ ملاحظات</div>{item.cons.map((c, i) => <div key={i} style={{ fontSize: 11, color: "#94a3b8", marginBottom: 3 }}>• {c}</div>)}</div>
      </div>
      <button onClick={() => onViewCompat(item, type)} style={{ marginTop: 14, width: "100%", background: color + "15", border: `1px solid ${color}44`, borderRadius: 10, padding: "9px", color, fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
        🔗 وش يتوافق مع هذا {type === "gpu" ? "الكرت" : "المعالج"}؟
      </button>
    </div>
  );
}

function CompatModal({ item, type, onClose }) {
  const list = type === "gpu" ? getCompatibleCPUs(item.id) : getCompatibleGPUs(item.id);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#0d1117", border: "1.5px solid rgba(99,102,241,0.4)", borderRadius: 24, padding: 24, maxWidth: 500, width: "100%", maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#e2e8f0" }}>{type === "gpu" ? `معالجات تشتغل مع ${item.name}` : `كروت تشتغل مع ${item.name}`}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontSize: 20 }}>✕</button>
        </div>
        {list.length === 0 && <div style={{ color: "#64748b", textAlign: "center", padding: 20 }}>لا يوجد في قاعدة البيانات</div>}
        {list.map(x => (
          <div key={x.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "12px 16px", marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>{type === "gpu" ? "" : "NVIDIA "}{x.name}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{x.brand || x.vram} {x.gen || ""}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#06b6d4" }}>~{x.priceSAR.toLocaleString()} ر.س</div>
          </div>
        ))}
        <button onClick={onClose} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 12, padding: "12px", color: "#fff", fontWeight: 700, cursor: "pointer", marginTop: 8 }}>إغلاق</button>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState(null);
  const [step, setStep] = useState(1);
  const [usages, setUsages] = useState([]);
  const [resolution, setResolution] = useState(null);
  const [budget, setBudget] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [compatItem, setCompatItem] = useState(null);

  const primaryUsage = usages[0] || null;
  const gpuRecs = showResult ? getGPURecs(primaryUsage, resolution || "1440p", budget) : [];
  const cpuRecs = showResult ? getCPURecs(primaryUsage, budget) : [];

  const reset = () => { setMode(null); setStep(1); setUsages([]); setResolution(null); setBudget(null); setShowResult(false); setCompatItem(null); };
  const toggleUsage = (id) => setUsages(prev => prev.includes(id) ? prev.filter(u => u !== id) : prev.length < 3 ? [...prev, id] : prev);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0a0a0f,#0d1117,#0a0f1a)", fontFamily: "'Tajawal',sans-serif", direction: "rtl", color: "#e2e8f0", padding: "20px 16px" }}>
      {compatItem && <CompatModal item={compatItem.item} type={compatItem.type} onClose={() => setCompatItem(null)} />}
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, margin: 0, background: "linear-gradient(90deg,#e2e8f0,#06b6d4,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🖥️ مساعد اختيار المكونات</h1>
          <p style={{ color: "#64748b", fontSize: 13, marginTop: 6 }}>كروت RTX 50 + معالجات Intel & AMD Ryzen</p>
        </div>

        {!mode && (
          <div>
            <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700, color: "#94a3b8", marginBottom: 16 }}>وش تبي تختار؟</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[{ id: "gpu", icon: "🎮", label: "كرت شاشة فقط" }, { id: "cpu", icon: "⚡", label: "معالج فقط" }, { id: "both", icon: "🔧", label: "الاثنين معاً" }].map(m => (
                <button key={m.id} onClick={() => setMode(m.id)} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 12px", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{m.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {mode && !showResult && (
          <>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24 }}>
              {[1, 2, 3].map(s => <div key={s} style={{ width: s === step ? 32 : 10, height: 10, borderRadius: 5, background: s === step ? "linear-gradient(90deg,#6366f1,#06b6d4)" : s < step ? "#6366f1" : "#1e293b", transition: "all 0.4s" }} />)}
            </div>

            {step === 1 && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 17, fontWeight: 700, marginBottom: 6, color: "#94a3b8" }}>وش راح تستخدم الجهاز فيه؟</h2>
                <p style={{ textAlign: "center", fontSize: 12, color: "#475569", marginBottom: 16 }}>اختر حتى 3 استخدامات</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {usageProfiles.map(u => {
                    const sel = usages.includes(u.id);
                    return <button key={u.id} onClick={() => toggleUsage(u.id)} style={{ background: sel ? "rgba(99,102,241,0.2)" : "rgba(15,23,42,0.8)", border: sel ? "1.5px solid #6366f1" : "1.5px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "14px 12px", cursor: "pointer", textAlign: "right" }}>
                      <div style={{ fontSize: 24, marginBottom: 4 }}>{u.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0", marginBottom: 2 }}>{u.label}</div>
                      <div style={{ fontSize: 10, color: "#64748b" }}>{u.desc}</div>
                      {sel && <div style={{ fontSize: 10, color: "#6366f1", marginTop: 4, fontWeight: 700 }}>✓ محدد</div>}
                    </button>;
                  })}
                </div>
                <button disabled={usages.length === 0} onClick={() => setStep(2)} style={{ width: "100%", marginTop: 14, background: usages.length ? "linear-gradient(135deg,#6366f1,#06b6d4)" : "#1e293b", border: "none", borderRadius: 12, padding: "13px", color: usages.length ? "#fff" : "#475569", fontWeight: 700, cursor: usages.length ? "pointer" : "default", fontSize: 14 }}>التالي ←</button>
              </div>
            )}

            {step === 2 && mode !== "cpu" && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 17, fontWeight: 700, marginBottom: 16, color: "#94a3b8" }}>دقة شاشتك؟</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
                  {resolutions.map(r => <button key={r.id} onClick={() => { setResolution(r.id); setStep(3); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "18px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div><div style={{ fontWeight: 800, fontSize: 18, color: "#e2e8f0" }}>{r.label}</div><div style={{ fontSize: 12, color: "#64748b" }}>{r.desc}</div></div>
                    <div style={{ color: "#06b6d4", fontSize: 18 }}>←</div>
                  </button>)}
                </div>
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 13, display: "block", margin: "0 auto" }}>← رجوع</button>
              </div>
            )}

            {step === 2 && mode === "cpu" && (() => { setResolution("1440p"); setStep(3); return null; })()}

            {step === 3 && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 17, fontWeight: 700, marginBottom: 16, color: "#94a3b8" }}>كم ميزانيتك الإجمالية؟</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {budgetRanges.map(b => <button key={b.id} onClick={() => { setBudget(b.id); setShowResult(true); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "#e2e8f0" }}>{b.label}</span>
                    <span style={{ color: "#8b5cf6", fontSize: 16 }}>←</span>
                  </button>)}
                </div>
                <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 13, display: "block", margin: "14px auto 0" }}>← رجوع</button>
              </div>
            )}
          </>
        )}

        {showResult && (
          <div>
            {(mode === "gpu" || mode === "both") && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ textAlign: "center", fontSize: 13, color: "#8b5cf6", fontWeight: 700, marginBottom: 12 }}>🖥️ كروت الشاشة الموصى بها</div>
                {gpuRecs.length === 0 ? <div style={{ background: "rgba(15,23,42,0.8)", borderRadius: 16, padding: 24, textAlign: "center", color: "#64748b" }}>ما لقينا كرت مناسب 😅</div>
                  : gpuRecs.map((g, i) => <div key={g.id}>{i === 0 && <div style={{ fontSize: 11, color: "#06b6d4", fontWeight: 700, marginBottom: 6 }}>✅ الاختيار الأمثل</div>}{i === 1 && <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, marginTop: 4 }}>بدائل موصى بها</div>}<CardBig item={g} type="gpu" usage={primaryUsage} onViewCompat={(item, type) => setCompatItem({ item, type })} /></div>)}
              </div>
            )}
            {(mode === "cpu" || mode === "both") && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ textAlign: "center", fontSize: 13, color: "#ef4444", fontWeight: 700, marginBottom: 12 }}>⚡ المعالجات الموصى بها</div>
                {cpuRecs.length === 0 ? <div style={{ background: "rgba(15,23,42,0.8)", borderRadius: 16, padding: 24, textAlign: "center", color: "#64748b" }}>ما لقينا معالج مناسب 😅</div>
                  : cpuRecs.map((c, i) => <div key={c.id}>{i === 0 && <div style={{ fontSize: 11, color: "#06b6d4", fontWeight: 700, marginBottom: 6 }}>✅ الاختيار الأمثل</div>}{i === 1 && <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700, marginBottom: 6, marginTop: 4 }}>بدائل موصى بها</div>}<CardBig item={c} type="cpu" usage={primaryUsage} onViewCompat={(item, type) => setCompatItem({ item, type })} /></div>)}
              </div>
            )}
            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "12px 16px", fontSize: 11, color: "#475569", textAlign: "center", marginBottom: 14 }}>
              💡 الأسعار تقريبية · 1$ ≈ 3.75 ريال · قد تختلف حسب المتجر
            </div>
            <button onClick={reset} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 14 }}>🔄 ابدأ من جديد</button>
          </div>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}button:active{transform:scale(0.97)}`}</style>
    </div>
  );
}
