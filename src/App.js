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
  { id: "budget_low", label: "أقل من 1,500 ريال", min: 0, max: 1500 },
  { id: "budget_mid", label: "1,500 – 2,500 ريال", min: 1500, max: 2500 },
  { id: "budget_high", label: "2,500 – 4,000 ريال", min: 2500, max: 4000 },
  { id: "budget_ultra", label: "4,000 – 7,000 ريال", min: 4000, max: 7000 },
  { id: "budget_flagship", label: "أكثر من 7,000 ريال", min: 7000, max: 99999 },
];

const gpuDatabase = [
  { id: "rtx5060", name: "RTX 5060", vram: "8GB GDDR7", priceUSD: 300, priceSAR: 1125, tier: "entry", badge: "اقتصادي", badgeColor: "#22c55e", bestFor: ["casual_gaming", "study"], resolutions: ["1080p"], pros: ["سعر ممتاز", "موفر للكهرباء", "DLSS 4"], cons: ["8GB VRAM محدودة", "ليست لـ 1440p بشكل مريح"], score: { casual_gaming: 80, study: 90, pro_gaming: 55, design: 50, ai_ml: 40, "4k_content": 30 }, tag: "الأفضل للميزانية المحدودة" },
  { id: "rtx5060ti_8", name: "RTX 5060 Ti 8GB", vram: "8GB GDDR7", priceUSD: 380, priceSAR: 1425, tier: "mid-low", badge: "قيمة جيدة", badgeColor: "#3b82f6", bestFor: ["casual_gaming", "study"], resolutions: ["1080p", "1440p"], pros: ["أداء أفضل من 5060", "سعر معقول"], cons: ["8GB قد تكون محدودة مستقبلاً"], score: { casual_gaming: 85, study: 88, pro_gaming: 65, design: 58, ai_ml: 45, "4k_content": 40 }, tag: "وسط اقتصادي" },
  { id: "rtx5060ti_16", name: "RTX 5060 Ti 16GB", vram: "16GB GDDR7", priceUSD: 430, priceSAR: 1612, tier: "mid", badge: "موصى به", badgeColor: "#f59e0b", bestFor: ["casual_gaming", "design", "study"], resolutions: ["1080p", "1440p"], pros: ["16GB VRAM ممتازة", "مناسب للتصميم", "أداء 1440p مريح"], cons: ["أغلى من النسخة 8GB"], score: { casual_gaming: 88, study: 90, pro_gaming: 70, design: 75, ai_ml: 60, "4k_content": 55 }, tag: "الأفضل بين 1500-2500 ريال" },
  { id: "rtx5070", name: "RTX 5070", vram: "12GB GDDR7", priceUSD: 549, priceSAR: 2060, tier: "mid-high", badge: "الأكثر توازناً", badgeColor: "#8b5cf6", bestFor: ["casual_gaming", "pro_gaming", "design"], resolutions: ["1080p", "1440p", "4k"], pros: ["1440p مثالي", "DLSS 4 رهيب", "توازن سعر/أداء ممتاز"], cons: ["12GB تكفي لكن ليست الأكثر"], score: { casual_gaming: 93, study: 85, pro_gaming: 88, design: 82, ai_ml: 70, "4k_content": 75 }, tag: "⭐ الخيار الذهبي للأغلبية" },
  { id: "rtx5070ti", name: "RTX 5070 Ti", vram: "16GB GDDR7", priceUSD: 749, priceSAR: 2810, tier: "high", badge: "قوي جداً", badgeColor: "#ef4444", bestFor: ["pro_gaming", "design", "4k_content"], resolutions: ["1440p", "4k"], pros: ["16GB VRAM", "1440p بأعلى FPS", "4K مريح", "ممتاز للتصميم"], cons: ["سعره مرتفع نسبياً"], score: { casual_gaming: 90, study: 82, pro_gaming: 96, design: 92, ai_ml: 82, "4k_content": 90 }, tag: "للمحترفين والجادين" },
  { id: "rtx5080", name: "RTX 5080", vram: "16GB GDDR7", priceUSD: 999, priceSAR: 3745, tier: "ultra", badge: "فئة عليا", badgeColor: "#f97316", bestFor: ["pro_gaming", "4k_content", "ai_ml", "design"], resolutions: ["4k"], pros: ["4K سلس تماماً", "أداء استثنائي", "مناسب لـ AI"], cons: ["سعر مرتفع", "لا يستحق للألعاب العادية"], score: { casual_gaming: 85, study: 75, pro_gaming: 98, design: 97, ai_ml: 92, "4k_content": 97 }, tag: "لمن يريد الأفضل بدون 5090" },
  { id: "rtx5090", name: "RTX 5090", vram: "32GB GDDR7", priceUSD: 1999, priceSAR: 7495, tier: "flagship", badge: "الفلاقشيب", badgeColor: "#6366f1", bestFor: ["ai_ml", "4k_content", "pro_gaming"], resolutions: ["4k"], pros: ["32GB VRAM", "الأقوى في السوق", "4K/8K بسهولة"], cons: ["سعر خرافي", "معظم الناس لا تحتاجه"], score: { casual_gaming: 80, study: 70, pro_gaming: 99, design: 99, ai_ml: 99, "4k_content": 99 }, tag: "للمحترفين فقط" },
];

function getRecommendations(usage, resolution, budget) {
  if (!usage || !resolution || !budget) return [];
  const budgetObj = budgetRanges.find((b) => b.id === budget);
  return gpuDatabase.filter((gpu) => gpu.priceSAR <= budgetObj.max * 1.15 && gpu.priceSAR >= budgetObj.min * 0.85 && gpu.resolutions.includes(resolution)).sort((a, b) => b.score[usage] - a.score[usage]).slice(0, 3);
}

export default function GPUPicker() {
  const [step, setStep] = useState(1);
  const [usage, setUsage] = useState(null);
  const [resolution, setResolution] = useState(null);
  const [budget, setBudget] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const recommendations = showResult ? getRecommendations(usage, resolution, budget) : [];
  const topPick = recommendations[0];
  const reset = () => { setStep(1); setUsage(null); setResolution(null); setBudget(null); setShowResult(false); };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1a 100%)", fontFamily: "'Tajawal', sans-serif", direction: "rtl", color: "#e2e8f0", padding: "20px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 38px)", fontWeight: 800, background: "linear-gradient(90deg, #e2e8f0, #06b6d4, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>وش كرت الشاشة المناسب لك؟</h1>
          <p style={{ color: "#64748b", fontSize: 14 }}>ثلاث أسئلة بس وراح نختار لك الكرت المناسب</p>
        </div>

        {!showResult && <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>{[1,2,3].map(s => <div key={s} style={{ width: s===step?32:10, height: 10, borderRadius: 5, background: s===step?"linear-gradient(90deg,#6366f1,#06b6d4)":s<step?"#6366f1":"#1e293b", transition: "all 0.4s" }} />)}</div>}

        {!showResult && step === 1 && (
          <div>
            <h2 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#94a3b8" }}>شو راح تستخدم الجهاز فيه؟</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {usageProfiles.map(u => <button key={u.id} onClick={() => { setUsage(u.id); setStep(2); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "18px 16px", cursor: "pointer", textAlign: "right" }}><div style={{ fontSize: 28, marginBottom: 6 }}>{u.icon}</div><div style={{ fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 4 }}>{u.label}</div><div style={{ fontSize: 11, color: "#64748b" }}>{u.desc}</div></button>)}
            </div>
          </div>
        )}

        {!showResult && step === 2 && (
          <div>
            <h2 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#94a3b8" }}>شاشتك وش دقتها؟</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {resolutions.map(r => <button key={r.id} onClick={() => { setResolution(r.id); setStep(3); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}><div><div style={{ fontWeight: 800, fontSize: 20, color: "#e2e8f0" }}>{r.label}</div><div style={{ fontSize: 13, color: "#64748b" }}>{r.desc}</div></div><div style={{ color: "#06b6d4", fontSize: 20 }}>←</div></button>)}
            </div>
            <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", marginTop: 16, fontSize: 13, display: "block", margin: "16px auto 0" }}>← رجوع</button>
          </div>
        )}

        {!showResult && step === 3 && (
          <div>
            <h2 style={{ textAlign: "center", fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#94a3b8" }}>كم ميزانيتك؟</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {budgetRanges.map(b => <button key={b.id} onClick={() => { setBudget(b.id); setShowResult(true); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}><span style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>{b.label}</span><span style={{ color: "#8b5cf6", fontSize: 18 }}>←</span></button>)}
            </div>
            <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", marginTop: 16, fontSize: 13, display: "block", margin: "16px auto 0" }}>← رجوع</button>
          </div>
        )}

        {showResult && recommendations.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, background: "rgba(15,23,42,0.8)", borderRadius: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😅</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>ما لقينا كرت مناسب</div>
            <button onClick={reset} style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 12, padding: "12px 24px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>ابدأ من جديد</button>
          </div>
        )}

        {showResult && topPick && (
          <>
            <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(6,182,212,0.1))", border: "1.5px solid rgba(99,102,241,0.4)", borderRadius: 24, padding: "28px 24px", marginBottom: 16 }}>
              <div style={{ display: "inline-block", background: "linear-gradient(135deg,#6366f1,#06b6d4)", borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#fff", marginBottom: 16 }}>✅ الاختيار الأمثل لك</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 32, fontWeight: 900, color: "#e2e8f0" }}>NVIDIA {topPick.name}</h2>
                  <div style={{ color: "#06b6d4", fontSize: 14, marginTop: 4 }}>{topPick.vram}</div>
                  <div style={{ display: "inline-block", marginTop: 10, background: topPick.badgeColor+"22", border: `1px solid ${topPick.badgeColor}55`, borderRadius: 8, padding: "3px 10px", fontSize: 12, color: topPick.badgeColor }}>{topPick.tag}</div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#e2e8f0" }}>~{topPick.priceSAR.toLocaleString()} ريال</div>
                </div>
              </div>
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 }}><span>مدى ملاءمته</span><span style={{ color: "#06b6d4", fontWeight: 700 }}>{topPick.score[usage]}%</span></div>
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, height: 8 }}><div style={{ height: "100%", width: `${topPick.score[usage]}%`, background: "linear-gradient(90deg,#6366f1,#06b6d4)", borderRadius: 8 }} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
                <div><div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700, marginBottom: 8 }}>✅ المميزات</div>{topPick.pros.map((p,i) => <div key={i} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>• {p}</div>)}</div>
                <div><div style={{ fontSize: 12, color: "#ef4444", fontWeight: 700, marginBottom: 8 }}>⚠️ يستاهل تعرف</div>{topPick.cons.map((c,i) => <div key={i} style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>• {c}</div>)}</div>
              </div>
            </div>
            {recommendations.slice(1).map(gpu => (
              <div key={gpu.id} style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div><div style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>NVIDIA {gpu.name}</div><div style={{ fontSize: 11, color: "#475569" }}>{gpu.vram}</div></div>
                <div style={{ textAlign: "left" }}><div style={{ fontSize: 16, fontWeight: 800, color: "#e2e8f0" }}>~{gpu.priceSAR.toLocaleString()} ريال</div><div style={{ fontSize: 11, color: "#06b6d4" }}>ملاءمة: {gpu.score[usage]}%</div></div>
              </div>
            ))}
            <button onClick={reset} style={{ width: "100%", background: "linear-gradient(135deg,#6366f1,#06b6d4)", border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontWeight: 800, cursor: "pointer", fontSize: 15, marginTop: 8 }}>🔄 ابدأ من جديد</button>
          </>
        )}
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;800;900&display=swap');`}</style>
    </div>
  );
}
