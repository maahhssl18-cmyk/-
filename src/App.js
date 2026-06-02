<button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "14px auto 0" }}>← رجوع</button>
              </div>
            )}

            {/* Step 2 for CPU/RAM: budget */}
            {step === 2 && (singleType === "cpu" || singleType === "ram") && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#94a3b8" }}>كم ميزانيتك للقطعة؟</h2>
                {budgetRanges.map(b => (
                  <button key={b.id} onClick={() => { setBudget(b.id); setShowResult(true); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{b.label}</span>
                    <span style={{ color: "#8b5cf6" }}>←</span>
                  </button>
                ))}
                <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "8px auto 0" }}>← رجوع</button>
              </div>
            )}

            {/* Step 3: budget (GPU and MB) */}
            {step === 3 && (singleType === "gpu" || singleType === "mb") && (
              <div>
                <h2 style={{ textAlign: "center", fontSize: 16, fontWeight: 700, marginBottom: 14, color: "#94a3b8" }}>كم ميزانيتك للقطعة؟</h2>
                {budgetRanges.map(b => (
                  <button key={b.id} onClick={() => { setBudget(b.id); setShowResult(true); }} style={{ background: "rgba(15,23,42,0.8)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "13px 18px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: "#e2e8f0" }}>{b.label}</span>
                    <span style={{ color: "#8b5cf6" }}>←</span>
                  </button>
                ))}
                <button onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 12, display: "block", margin: "8px auto 0" }}>← رجوع</button>
              </div>
            )}
          </>
        )}

        {/* ── SINGLE RESULTS ── */}
        {screen === "single" && showResult && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ color: typeColors[singleType] || "#8b5cf6", fontWeight: 700, fontSize: 13 }}>
                {typeIcons[singleType]} {typeLabels[singleType]}
              </div>
            </div>

            {(() => {
              const lists = { gpu: gpuRecs, cpu: cpuRecs, psu: psuRecs, mb: mbRecs, ram: ramRecs };
              const items = lists[singleType] || [];
              if (items.length === 0) {
                return (
                  <div style={{ textAlign: "center", padding: "30px 20px", color: "#64748b" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>😕</div>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>ما لقينا نتائج بهالميزانية</div>
                    <div style={{ fontSize: 12 }}>جرب تختار ميزانية أعلى</div>
                  </div>
                );
              }
              return items.map((item, i) => (
                <div key={item.id}>
                  {i === 0 && <div style={{ fontSize: 10, color: "#06b6d4", fontWeight: 700, marginBottom: 5 }}>✅ الاختيار الأمثل</div>}
                  <CardBig
                    item={item}
                    type={singleType}
                    usage={["gpu","cpu"].includes(singleType) ? usage : null}
                    onViewCompat={["gpu","cpu"].
