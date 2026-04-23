//code 

import { useState, useEffect, useRef } from "react";

const C = {
  gold: "#D4A017",
  goldLt: "#F5C842",
  navy: "#0B0B25",
  navyMid: "#141438",
  navyLt: "#1E1E50",
  teal: "#0D9488",
  purple: "#7C3AED",
  amber: "#D97706",
  blue: "#1D4ED8",
  red: "#DC2626",
  green: "#16A34A",
  white: "#FFFFFF",
  gray: "#6B7280",
  grayLt: "#F3F4F6",
  slate: "#334155",
};

const BANDS = [
  {
    id: "DevOps Engineer",
    label: "DevOps Engineer",
    title: "Member Experience",
    color: C.teal,
    bg: "#CCFBF1",
    roles: "Customer Service · Claims · Care Enrollment",
    goal: "Optimize member interactions and claim efficiency",
    maxScore: 45,
    thresholds: [18, 29, 36, 45],
    stages: ["🐛 Crawl", "🚶 Walk", "🏃 Run", "✈️ Fly-Ready"],
    modules: [
      {
        name: "Member Interaction AI",
        questions: [
          "I use AI tools to assist in summarizing member calls or enrollment sessions.",
          "I can identify member pain points using AI-driven sentiment analysis.",
          "I use AI to help draft clear communications for Medicare Advantage members."
        ],
      },
      {
        name: "Claims & Processing",
        questions: [
          "I use AI tools to pre-screen claims for errors or potential fraud.",
          "I can explain how AI identifies anomalies in provider billing patterns.",
          "I understand data isolation when handling sensitive PII during claims processing."
        ],
      },
      {
        name: "Medicare Policy Assistance",
        questions: [
          "I use AI to quickly search and summarize CMS (Centers for Medicare & Medicaid Services) policy updates.",
          "I verify AI-generated summaries against official regulatory documents.",
          "I can prompt AI to compare current and past Medicare Advantage requirements."
        ]
      }
    ],
  },
  {
    id: "QA",
    label: "QA",
    title: "Patient Care Optimization",
    color: C.purple,
    bg: "#EDE9FE",
    roles: "Case Managers · Nurses · Care Coordinators",
    goal: "Enhance clinical outcomes with AI support",
    maxScore: 45,
    thresholds: [18, 29, 36, 45],
    stages: ["🐛 Crawl", "🚶 Walk", "🏃 Run", "✈️ Fly-Ready"],
    modules: [
      {
        name: "Clinical Documentation",
        questions: [
          "I use AI-assisted tools to summarize clinical notes or patient chart data.",
          "I apply AI for rapid extraction of key diagnosis codes from medical records.",
          "I verify all AI-generated clinical summaries for accuracy in patient charts."
        ],
      },
      {
        name: "Triage & Care Planning",
        questions: [
          "I use AI-powered predictive models to identify high-risk members for care management.",
          "I understand how AI filters patient flow to prioritize high-acuity cases.",
          "I use AI to identify social determinants of health (SDOH) in patient data."
        ],
      },
      {
        name: "Healthcare Governance",
        questions: [
          "I understand the safety protocols when using AI tools in clinical triage.",
          "I check for clinical hallucinations or errors in AI care recommendations.",
          "I am aware of my organization's policy on AI use in patient interactions."
        ]
      }
    ],
  },
  {
    id: "Manager",
    label: "Manager",
    title: "Strategic Analytics",
    color: C.amber,
    bg: "#FEF3C7",
    roles: "Data Analysts · Actuaries · Health Strategists",
    goal: "Improve population health metrics using AI insights",
    maxScore: 45,
    thresholds: [18, 29, 36, 45],
    stages: ["🐛 Crawl", "🚶 Walk", "🏃 Run", "✈️ Fly-Ready"],
    modules: [
      {
        name: "Population Analysis",
        questions: [
          "I use AI models to predict healthcare utilization trends across our member base.",
          "I interpret AI insights to adjust resource allocation for community health initiatives.",
          "I evaluate the reliability of AI-generated projections for member demographic shifts."
        ],
      },
      {
        name: "Risk Adjustment",
        questions: [
          "I use AI to ensure accurate capturing of member risk scores (HCC coding).",
          "I apply AI to identify gaps in captured diagnostic data within medical records.",
          "I track accuracy improvements in Hierarchical Condition Category (HCC) documentation via AI."
        ],
      },
      {
        name: "Operational Metrics",
        questions: [
          "I monitor the cost-effectiveness of AI tools across departmental initiatives.",
          "I use AI-powered dashboards to track plan performance and member outcomes.",
          "I report on ROI (Return on Investment) for AI implementations in member care."
        ]
      }
    ],
  },
];

const INDUSTRIES = [
  { id: "clin_ops", label: "🏥 Clinical Operations", color: C.red },
  { id: "member_serv", label: "📞 Member Services & Claims", color: C.teal },
  { id: "fin_risk", label: "📊 Finance & Risk Adjustment", color: C.purple },
  { id: "hr_ld", label: "👥 Human Resources & L&D", color: C.amber },
  { id: "it_infra", label: "💻 IT & Infrastructure", color: C.blue },
  { id: "comp_priv", label: "🛡️ Compliance & Privacy", color: C.green },
];

const IND_Q = {
  clin_ops: [
    "Clinical teams use AI tools to support triage, HEDIS reporting or clinical documentation.",
    "Operations teams use AI for nurse scheduling, patient flow or authorization volume forecasting.",
    "Our organization has a clear policy on AI use in clinical settings covering patient safety.",
    "Health plan leaders can distinguish between CMS-compliant AI tools versus experimental software.",
    "We have piloted AI in at least one clinical outcome use case (e.g. readmission prevention).",
  ],
  member_serv: [
    "Member services actively use AI agents to assist with FAQs about benefits or pharmacy networks.",
    "We have integrated AI into our claims pipeline for auto-adjudication support or error detection.",
    "Enrollment teams use AI for member outreach, onboarding flows or sentiment monitoring.",
    "We monitor AI-assisted interactions for accuracy and compliance with Medicare Advantage rules.",
    "Our member experience leaders can articulate an AI strategy focused on member satisfaction (NPS).",
  ],
  fin_risk: [
    "Risk adjustment teams use NLP to identify HCC coding opportunities in medical records.",
    "Payment integrity teams use AI models to detect overpayments or billing anomalies in real-time.",
    "We use AI for actuarial analysis, bid preparation or financial forecasting for Medicare plans.",
    "Our leadership understands the CMS regulatory environment for AI-assisted risk scoring.",
    "We have an AI fairness framework covering risk models to ensure equitable member coverage.",
  ],
  hr_ld: [
    "L&D teams use AI to personalize training paths for clinical and non-clinical staff cohorts.",
    "We have an AI literacy curriculum focused on HIPAA, PHI and US healthcare compliance.",
    "HR uses AI for recruitment of specialized medical talent or streamlining onboarding.",
    "Our leaders understand the ethical implications of AI for employee productivity monitoring.",
    "We track AI tool adoption across departments to measure upskilling progress.",
  ],
  it_infra: [
    "IT teams use AI to automate HIPAA-compliant cloud environment management and monitoring.",
    "We have AI-powered security logs analyzing for PHI exposure or anomalous access attempts.",
    "Our AI infrastructure supports RAG systems that only access authorized medical databases.",
    "Engineering teams use AI to optimize internal platform performance for claims volume peaks.",
    "We have an AI technology roadmap specifically tailored for healthcare interoperability.",
  ],
  comp_priv: [
    "Compliance teams use AI to monitor internal communications for HIPAA/privacy violations.",
    "We use AI-powered dashboards to track regulatory readiness for CMS audit cycles.",
    "Our AI governance includes model explainability and audit logs for all medical determinations.",
    "Privacy leaders oversee red-teaming of AI models to prevent 'jailbreaking' for PHI access.",
    "We have structured CMS compliance reviews for every AI model deployed in operations.",
  ],
};

function stageColor(s) {
  return { Crawl: "#EF4444", Walk: "#F59E0B", Run: "#3B82F6", Fly: "#10B981" }[s] || "#6B7280";
}
function stageBg(s) {
  return { Crawl: "#FEF2F2", Walk: "#FFFBEB", Run: "#EFF6FF", Fly: "#F0FDF4" }[s] || "#F3F4F6";
}
function getStage(score, max) {
  const p = (score / max) * 100;
  if (p < 40) return "Crawl";
  if (p < 65) return "Walk";
  if (p < 80) return "Run";
  return "Fly";
}

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: C.navy,
        borderBottom: `3px solid ${C.gold}`,
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ color: C.gold, fontWeight: 700, fontSize: 12 }}>Scan Health AI Readiness Assessment</span>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{pct}% Complete</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, height: 5 }}>
        <div
          style={{
            background: `linear-gradient(90deg,${C.gold},${C.goldLt})`,
            height: "100%",
            borderRadius: 4,
            width: `${pct}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  );
}

function ScoreBtn({ value, selected, onClick }) {
  const colors = { 1: "#EF4444", 2: "#F97316", 3: "#EAB308", 4: "#22C55E", 5: "#0EA5E9" };
  const labels = { 1: "Never", 2: "Rarely", 3: "Sometimes", 4: "Often", 5: "Expert" };
  const sel = selected === value;
  return (
    <button
      onClick={() => onClick(value)}
      style={{
        flex: 1,
        padding: "7px 3px",
        border: `2px solid ${sel ? colors[value] : "#E5E7EB"}`,
        borderRadius: 8,
        background: sel ? colors[value] : "#FAFAFA",
        color: sel ? "white" : "#6B7280",
        fontWeight: sel ? 700 : 500,
        fontSize: 11,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: sel ? `0 2px 8px ${colors[value]}55` : "none",
        fontFamily: "'Segoe UI',sans-serif",
      }}
    >
      <div style={{ fontSize: 15, marginBottom: 1 }}>{value}</div>
      <div style={{ fontSize: 9 }}>{labels[value]}</div>
    </button>
  );
}

function QCard({ qNum, text, value, onChange, bandColor }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        padding: "14px 18px",
        marginBottom: 10,
        boxShadow: value ? `0 2px 10px ${bandColor}22` : "0 1px 3px rgba(0,0,0,0.05)",
        borderLeft: `4px solid ${value ? bandColor : "#E5E7EB"}`,
        transition: "all 0.2s",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
        <div
          style={{
            minWidth: 24,
            height: 24,
            borderRadius: "50%",
            background: value ? bandColor : "#E5E7EB",
            color: value ? "white" : "#9CA3AF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            flexShrink: 0,
            transition: "all 0.2s",
          }}
        >
          {qNum}
        </div>
        <p style={{ margin: 0, color: "#1F2937", fontSize: 13, lineHeight: 1.6 }}>{text}</p>
      </div>
      <div style={{ display: "flex", gap: 5 }}>
        {[1, 2, 3, 4, 5].map((v) => (
          <ScoreBtn key={v} value={v} selected={value} onClick={onChange} />
        ))}
      </div>
      {!value && <div style={{ fontSize: 10, color: "#D97706", marginTop: 5, textAlign: "center" }}>Select a score above ↑</div>}
    </div>
  );
}

function ResultsPanel({ allScores, orgInfo, selectedBands, selectedIndustry, industryScores }) {
  const [tab, setTab] = useState("overview");
  const activeBands = BANDS.filter((b) => selectedBands.includes(b.id));
  const bandResults = activeBands.map((b) => {
    const scores = allScores[b.id] || [];
    const total = scores.reduce((a, x) => a + x, 0);
    const stage = getStage(total, b.maxScore);
    let offset = 0;
    const moduleTotals = b.modules.map((m) => {
      const s = scores.slice(offset, offset + m.questions.length);
      offset += m.questions.length;
      return { name: m.name, score: s.reduce((a, x) => a + x, 0), max: m.questions.length * 5 };
    });
    return { ...b, total, stage, moduleTotals };
  });
  const ind = INDUSTRIES.find((i) => i.id === selectedIndustry);
  const indTotal = (industryScores || []).reduce((a, b) => a + b, 0);
  const tabs = [
    { id: "overview", l: "📊 Overview" },
    { id: "bands", l: "🎯 Band Results" },
    { id: "matrix", l: "🔢 Matrix" },
    { id: "gaps", l: "📋 Gaps" },
    { id: "roadmap", l: "🗺️ Roadmap" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI',sans-serif" }}>
      <div
        style={{
          background: C.navy,
          borderRadius: "14px 14px 0 0",
          padding: "24px 28px",
          borderBottom: `4px solid ${C.gold}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 32 }}>🎯</div>
            <div>
              <h1 style={{ margin: 0, color: C.gold, fontSize: 22, fontWeight: 800 }}>
                AI Readiness Audit Output
              </h1>
              <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.65)", fontSize: 12 }}>
                {orgInfo.org || "Your Organization"} · {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, fontWeight: 800, letterSpacing: "0.1em", marginBottom: -2 }}>POWERED BY</div>
            <div style={{ color: C.gold, fontSize: 14, fontWeight: 900, opacity: 0.8 }}>AIGrev</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {bandResults.map((b) => (
            <div
              key={b.id}
              style={{
                background: `${b.color}22`,
                border: `1px solid ${b.color}66`,
                borderRadius: 20,
                padding: "5px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: stageColor(b.stage), display: "inline-block" }} />
              <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{b.id}</span>
              <span style={{ color: b.color, fontSize: 11 }}>{b.stage}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", background: "#F8F9FA", borderBottom: "2px solid #E5E7EB", overflowX: "auto" }}>
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "11px 16px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: tab === t.id ? 700 : 500,
              color: tab === t.id ? C.navy : "#6B7280",
              borderBottom: tab === t.id ? `3px solid ${C.gold}` : "3px solid transparent",
              whiteSpace: "nowrap",
              fontFamily: "'Segoe UI',sans-serif",
              transition: "all 0.2s",
            }}
          >
            {t.l}
          </button>
        ))}
      </div>
      <div style={{ padding: "24px 28px", background: "white", borderRadius: "0 0 14px 14px" }}>
        {tab === "overview" && (
          <div>
            <h2
              style={{
                color: C.navy,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 16,
                borderBottom: `2px solid ${C.gold}`,
                paddingBottom: 6,
              }}
            >
              Organisation AI Readiness Summary
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginBottom: 24 }}>
              {bandResults.map((b) => {
                const pct = Math.round((b.total / b.maxScore) * 100);
                return (
                  <div
                    key={b.id}
                    style={{
                      background: b.bg,
                      border: `2px solid ${b.color}44`,
                      borderRadius: 10,
                      padding: 16,
                      textAlign: "center",
                      borderTop: `4px solid ${b.color}`,
                    }}
                  >
                    <div style={{ fontSize: 10, color: b.color, fontWeight: 700, marginBottom: 3, textTransform: "uppercase" }}>
                      {b.id}
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: b.color, lineHeight: 1 }}>{pct}%</div>
                    <div style={{ fontSize: 11, color: "#374151", marginTop: 3 }}>
                      {b.total}/{b.maxScore}
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        display: "inline-block",
                        background: stageColor(b.stage),
                        color: "white",
                        borderRadius: 10,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {b.stage}
                    </div>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 4 }}>
                      {b.title.split("/")[0].trim()}
                    </div>
                  </div>
                );
              })}
            </div>
            {ind && (
              <div
                style={{
                  background: "#F8F9FA",
                  borderRadius: 10,
                  padding: 16,
                  border: "1px solid #E5E7EB",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ textAlign: "center", minWidth: 80 }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: ind.color }}>
                      {Math.round((indTotal / 25) * 100)}%
                    </div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>Industry</div>
                    <div style={{ fontSize: 11, color: "#6B7280" }}>{indTotal}/25</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
                      {ind.label} AI Readiness
                    </div>
                    {(IND_Q[selectedIndustry] || []).map((q, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                        <div style={{ flex: 1, fontSize: 11, color: "#374151" }}>{q.substring(0, 65)}...</div>
                        <div style={{ display: "flex", gap: 2 }}>
                          {[1, 2, 3, 4, 5].map((v) => (
                            <div
                              key={v}
                              style={{
                                width: 10,
                                height: 10,
                                borderRadius: 2,
                                background: v <= (industryScores[i] || 0) ? ind.color : "#E5E7EB",
                              }}
                            />
                          ))}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: ind.color, width: 20 }}>
                          {industryScores[i] || 0}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div
              style={{
                background: C.navy + "0A",
                borderRadius: 10,
                padding: 14,
                border: `1px solid ${C.gold}44`,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: C.navy, marginBottom: 8 }}>AI MATURITY SCALE</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  ["🐛 Crawl", "AI Awareness", "#EF4444"],
                  ["🚶 Walk", "AI Application", "#F59E0B"],
                  ["🏃 Run", "AI Scaling", "#3B82F6"],
                  ["✈️ Fly", "AI Leadership", "#10B981"],
                ].map(([s, d, c]) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      gap: 6,
                      alignItems: "center",
                      flex: "1 1 160px",
                      background: "white",
                      borderRadius: 8,
                      padding: "7px 10px",
                      border: `1px solid ${c}44`,
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#1F2937" }}>{s}</div>
                      <div style={{ fontSize: 10, color: "#6B7280" }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "bands" && (
          <div>
            <h2
              style={{
                color: C.navy,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 16,
                borderBottom: `2px solid ${C.gold}`,
                paddingBottom: 6,
              }}
            >
              Band-by-Band Detailed Results
            </h2>
            {bandResults.map((b) => (
              <div
                key={b.id}
                style={{
                  marginBottom: 20,
                  border: `1px solid ${b.color}44`,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <div style={{ background: b.color, padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>
                      {b.id} — {b.title}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{b.roles}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "white", fontSize: 22, fontWeight: 800 }}>
                      {Math.round((b.total / b.maxScore) * 100)}%
                    </div>
                    <div
                      style={{
                        background: stageColor(b.stage),
                        color: "white",
                        borderRadius: 8,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                        display: "inline-block",
                      }}
                    >
                      {b.stage}
                    </div>
                  </div>
                </div>
                <div style={{ padding: 14, background: b.bg }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 10 }}>
                    {b.moduleTotals.map((m, i) => {
                      const mp = Math.round((m.score / m.max) * 100);
                      return (
                        <div key={i} style={{ background: "white", borderRadius: 8, padding: 12, border: `1px solid ${b.color}33` }}>
                          <div style={{ fontSize: 10, color: b.color, fontWeight: 700, marginBottom: 4 }}>Module {i + 1}</div>
                          <div style={{ fontSize: 11, color: "#1F2937", fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>
                            {m.name}
                          </div>
                          <div style={{ background: "#E5E7EB", borderRadius: 4, height: 7, marginBottom: 4 }}>
                            <div
                              style={{
                                background: b.color,
                                height: "100%",
                                borderRadius: 4,
                                width: `${mp}%`,
                                transition: "width 1s ease",
                              }}
                            />
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
                            <span style={{ color: b.color, fontWeight: 700 }}>
                              {m.score}/{m.max}
                            </span>
                            <span style={{ color: "#6B7280" }}>{mp}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      background: "white",
                      borderRadius: 8,
                      padding: "9px 12px",
                      border: `1px solid ${b.color}33`,
                      fontSize: 11,
                      color: "#374151",
                    }}
                  >
                    <span style={{ fontWeight: 700, color: b.color }}>📌 Recommendation: </span>
                    {b.stage === "Crawl" &&
                      "Priority: AI Literacy Program (1–2 days). Deploy daily flash cards. Assign AI awareness champions."}
                    {b.stage === "Walk" &&
                      "Priority: AI Productivity Bootcamp (3–5 days). OTS coaching x2. Build prompt template library."}
                    {b.stage === "Run" &&
                      "Priority: Specialist/Manager Program (4–6 weeks). Real-time scenario sprints. Launch team AI pilot."}
                    {b.stage === "Fly" &&
                      "Priority: Leadership Program. Capstone + board presentation. Annual re-certification."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "matrix" && (
          <div>
            <h2
              style={{
                color: C.navy,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 8,
                borderBottom: `2px solid ${C.gold}`,
                paddingBottom: 6,
              }}
            >
              Band × Industry AI Readiness Matrix
            </h2>
            <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 16 }}>
              AI readiness per band in the context of your selected industry. Highlighted column = your industry.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th
                      style={{
                        background: C.navy,
                        color: C.gold,
                        padding: "9px 12px",
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: 11,
                      }}
                    >
                      Band
                    </th>
                    {INDUSTRIES.map((i) => (
                      <th
                        key={i.id}
                        style={{
                          background: i.color,
                          color: "white",
                          padding: "9px 10px",
                          textAlign: "center",
                          fontWeight: 700,
                          fontSize: 10,
                          minWidth: 85,
                        }}
                      >
                        {i.label}
                      </th>
                    ))}
                    <th
                      style={{
                        background: C.gold,
                        color: C.navy,
                        padding: "9px 10px",
                        textAlign: "center",
                        fontWeight: 800,
                        fontSize: 11,
                      }}
                    >
                      Stage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bandResults.map((b, bi) => {
                    const op = Math.round((b.total / b.maxScore) * 100);
                    return (
                      <tr key={b.id}>
                        <td
                          style={{
                            padding: "9px 12px",
                            background: b.bg,
                            borderBottom: "1px solid #E5E7EB",
                            fontWeight: 700,
                            color: b.color,
                            fontSize: 11,
                          }}
                        >
                          {b.id}
                          <br />
                          <span style={{ fontWeight: 400, color: "#6B7280", fontSize: 10 }}>
                            {b.title.split("/")[0].trim()}
                          </span>
                        </td>
                        {INDUSTRIES.map((i, ii) => {
                          const isSel = i.id === selectedIndustry;
                          const variation = [0.9, 1.0, 0.95, 1.05, 0.88][bi] || 1.0;
                          const cp = isSel
                            ? Math.round((indTotal / 25) * 100)
                            : Math.min(100, Math.round(op * variation * (0.85 + ii * 0.04)));
                          const cs = cp < 40 ? "critical" : cp < 65 ? "developing" : cp < 80 ? "capable" : "advanced";
                          const cbg = { critical: "#FEF2F2", developing: "#FFFBEB", capable: "#EFF6FF", advanced: "#F0FDF4" }[cs];
                          const cc = { critical: C.red, developing: C.amber, capable: C.blue, advanced: C.green }[cs];
                          const dot = { critical: "🔴", developing: "🟡", capable: "🟢", advanced: "✅" }[cs];
                          return (
                            <td
                              key={i.id}
                              style={{
                                padding: "9px 10px",
                                background: isSel ? cbg : bi % 2 === 0 ? "#FAFAFA" : "white",
                                borderBottom: "1px solid #E5E7EB",
                                textAlign: "center",
                                border: isSel ? `2px solid ${i.color}` : "1px solid #E5E7EB",
                                fontWeight: isSel ? 700 : 400,
                              }}
                            >
                              <div style={{ fontSize: 14 }}>{dot}</div>
                              <div style={{ fontSize: 11, fontWeight: 700, color: cc }}>{cp}%</div>
                            </td>
                          );
                        })}
                        <td
                          style={{
                            padding: "9px 10px",
                            background: stageBg(b.stage),
                            borderBottom: "1px solid #E5E7EB",
                            textAlign: "center",
                            fontWeight: 800,
                            color: stageColor(b.stage),
                            fontSize: 12,
                          }}
                        >
                          {b.stage}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
              {[
                ["🔴 Critical", "<40%", C.red, "#FEF2F2"],
                ["🟡 Developing", "40–64%", C.amber, "#FFFBEB"],
                ["🟢 Capable", "65–79%", C.blue, "#EFF6FF"],
                ["✅ Advanced", "80%+", C.green, "#F0FDF4"],
              ].map(([l, r, c, bg]) => (
                <div
                  key={l}
                  style={{
                    background: bg,
                    border: `1px solid ${c}44`,
                    borderRadius: 8,
                    padding: "7px 10px",
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    flex: "1 1 140px",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: c }}>{l}</div>
                  <div style={{ fontSize: 10, color: "#6B7280" }}>{r}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "gaps" && (
          <div>
            <h2
              style={{
                color: C.navy,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 16,
                borderBottom: `2px solid ${C.gold}`,
                paddingBottom: 6,
              }}
            >
              Gap Analysis & Priority Training Investment
            </h2>
            {bandResults.map((b) => {
              const weakest = [...b.moduleTotals].sort((a, b) => (a.score / a.max) - (b.score / b.max)).slice(0, 2);
              const isPerfect = b.total === b.maxScore;

              // Role-based recommendations logic
              const getRoleActions = (role, stage) => {
                const actions = {
                  "DevOps Engineer": {
                    Crawl: ["1. Basic Prompt Engineering for Documentation", "2. Explore claims-automation pilots", "3. Weekly AI sentiment sync"],
                    Walk: ["1. Deploy Claim-Audit templates", "2. Advanced RAG training", "3. Sentiment analysis optimization"],
                    Run: ["1. Full claims-flow AI integration", "2. Cross-team AI mentorship", "3. ROI dashboard for AI automation"],
                    Fly: ["1. Industry lead in AI member-exp", "2. Annual AI security re-cert", "3. Innovation lab participation"]
                  },
                  "QA": {
                    Crawl: ["1. Clinical AI documentation basics", "2. Patient chart summary training", "3. Verification of AI notes workshop"],
                    Walk: ["1. Predictive triage workflow training", "2. SDOH data extraction bootcamp", "3. Clinical note audit sessions"],
                    Run: ["1. Lead clinical triage AI pilot", "2. Hallucination detection training", "3. Safety protocol optimization"],
                    Fly: ["1. Board-level clinical AI strategy", "2. Mentoring junior nursing staff on AI", "3. Ethics committee leadership"]
                  },
                  "Manager": {
                    Crawl: ["1. Data literacy for health metrics", "2. Resource allocation AI basics", "3. Evaluating AI reliability (101)"],
                    Walk: ["1. Predictive modeling for analysts", "2. Risk score (HCC) AI bootcamp", "3. ROI analysis for AI pilots"],
                    Run: ["1. Strategy sprint for risk adj.", "2. Manager-led AI ROI reporting", "3. Launch cross-dept AI analytics"],
                    Fly: ["1. Executive AI Health Leadership", "2. Annual metrics re-evaluation", "3. Capstone board presentation"]
                  }
                };
                const roleKey = role === "DevOps Engineer" || role === "QA" || role === "Manager" ? role : "Manager";
                return actions[roleKey][stage] || actions["Manager"][stage];
              };

              const recommendations = getRoleActions(b.id, b.stage.replace(/[^a-zA-Z]/g, ""));

              return (
                <div
                  key={b.id}
                  style={{
                    marginBottom: 16,
                    background: "#FAFAFA",
                    borderRadius: 10,
                    padding: 16,
                    border: `1px solid ${b.color}44`,
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                    <div
                      style={{
                        background: b.color,
                        color: "white",
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      {b.id}
                    </div>
                    <div style={{ fontWeight: 700, color: "#1F2937", fontSize: 13 }}>{b.title}</div>
                    <div
                      style={{
                        marginLeft: "auto",
                        background: stageColor(b.stage.replace(/[^a-zA-Z]/g, "")),
                        color: "white",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                      }}
                    >
                      {b.stage}
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.red, marginBottom: 6 }}>⚠️ BIGGEST GAPS</div>
                      {isPerfect ? (
                        <div style={{ background: "white", borderRadius: 7, padding: "12px", border: "1px solid #BBF7D0", textAlign: "center" }}>
                          <span style={{ fontSize: 11, color: C.green, fontWeight: 700 }}>🌟 No gaps identified! 100% Score achieved.</span>
                        </div>
                      ) : (
                        weakest.map((m, i) => {
                          const p = Math.round((m.score / m.max) * 100);
                          return (
                            <div
                              key={i}
                              style={{
                                background: "white",
                                borderRadius: 7,
                                padding: "8px 10px",
                                marginBottom: 5,
                                border: "1px solid #FCA5A5",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                                <span style={{ fontSize: 11, color: "#374151", fontWeight: 600 }}>{m.name}</span>
                                <span style={{ fontSize: 11, color: C.red, fontWeight: 700 }}>{p}%</span>
                              </div>
                              <div style={{ background: "#E5E7EB", borderRadius: 4, height: 6 }}>
                                <div style={{ background: C.red, height: "100%", borderRadius: 4, width: `${p}%` }} />
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 6 }}>✅ RECOMMENDED ACTIONS (ROLE-BASED)</div>
                      <div
                        style={{
                          background: "white",
                          borderRadius: 7,
                          padding: "9px 11px",
                          border: "1px solid #BBF7D0",
                          fontSize: 11,
                          color: "#374151",
                          lineHeight: 1.7,
                        }}
                      >
                        {recommendations.map((action, idx) => (
                          <div key={idx}>{action}</div>
                        ))}
                      </div>
                      <div
                        style={{
                          marginTop: 8,
                          background: `${C.gold}22`,
                          border: `1px solid ${C.gold}`,
                          borderRadius: 7,
                          padding: "7px 10px",
                          fontSize: 11,
                        }}
                      >
                        <span style={{ fontWeight: 700, color: C.navy }}>⏱ Time to next stage: </span>
                        <span style={{ color: C.navy }}>
                          {isPerfect ? "Ongoing excellence" :
                            b.stage.includes("Crawl") ? "3–5 weeks" :
                            b.stage.includes("Walk") ? "4–6 weeks" :
                            b.stage.includes("Run") ? "3–4 weeks" : "Ongoing excellence"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "roadmap" && (
          <div>
            <h2
              style={{
                color: C.navy,
                fontSize: 16,
                fontWeight: 700,
                marginBottom: 8,
                borderBottom: `2px solid ${C.gold}`,
                paddingBottom: 6,
              }}
            >
              AIGrev Recommended Training Roadmap
            </h2>
            <p style={{ color: "#6B7280", fontSize: 12, marginBottom: 18 }}>
              Your personalized APEX training engagement sequence based on audit scores.
            </p>
            {[
              {
                n: "01",
                phase: "ASSESS",
                color: C.teal,
                label: "Completed ✓",
                desc: "AI Readiness Assessment & Band Audit complete. Share results with your CHRO, CTO and L&D lead.",
                timeline: "Weeks 1–2",
                done: true,
              },
              {
                n: "02",
                phase: "ASSESS",
                color: C.teal,
                label: "Book Workshop",
                desc: "Schedule your Custom AI Training Roadmap Workshop with AIGrev (3 hours, virtual or in-person).",
                timeline: "Week 2–3",
                done: false,
              },
              {
                n: "03",
                phase: "PILOT",
                color: C.purple,
                label: "Launch Pilot",
                desc: "Select 20–50 learners from lowest-scoring bands. Begin CRAWL + WALK modules. Target quick wins.",
                timeline: "Weeks 3–8",
                done: false,
              },
              {
                n: "04",
                phase: "PILOT",
                color: C.purple,
                label: "Measure",
                desc: "Document outcomes: use cases launched, time saved, adoption rate. Present results to stakeholders.",
                timeline: "Week 8",
                done: false,
              },
              {
                n: "05",
                phase: "EXPAND",
                color: C.amber,
                label: "Scale Org-Wide",
                desc: "Deploy band-specific tracks across all five levels. Train internal AI champions. Integrate with LMS.",
                timeline: "Weeks 9–20",
                done: false,
              },
              {
                n: "06",
                phase: "EXCEL",
                color: C.red,
                label: "Drive Excellence",
                desc: "RUN + FLY tracks for L3–L5. Capstone projects. Board-level AI reporting. AI KPI dashboards live.",
                timeline: "Weeks 12–24",
                done: false,
              },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: s.done ? C.green : s.color,
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: 13,
                      flexShrink: 0,
                    }}
                  >
                    {s.done ? "✓" : s.n}
                  </div>
                  {i < 5 && <div style={{ width: 2, height: 20, background: "#E5E7EB", marginTop: 3 }} />}
                </div>
                <div
                  style={{
                    flex: 1,
                    background: s.done ? "#F0FDF4" : "#FAFAFA",
                    border: `1px solid ${s.done ? C.green + "44" : "#E5E7EB"}`,
                    borderRadius: 9,
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                    <span
                      style={{
                        background: s.color,
                        color: "white",
                        borderRadius: 5,
                        padding: "2px 7px",
                        fontSize: 9,
                        fontWeight: 700,
                      }}
                    >
                      {s.phase}
                    </span>
                    <span style={{ fontWeight: 700, color: "#1F2937", fontSize: 13 }}>{s.label}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontSize: 10,
                        color: "#6B7280",
                        background: "#E5E7EB",
                        borderRadius: 5,
                        padding: "2px 7px",
                      }}
                    >
                      {s.timeline}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
            <div
              style={{
                background: C.navy,
                borderRadius: 10,
                padding: 20,
                marginTop: 8,
                textAlign: "center",
              }}
            >
              <div style={{ color: C.gold, fontSize: 16, fontWeight: 800, marginBottom: 6 }}>
                Ready to Start Your AI Training Journey?
              </div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 14 }}>
                Share this audit with your Scan Health consultant to receive a custom proposal within 48 hours.
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <div
                  style={{
                    background: C.gold,
                    color: C.navy,
                    borderRadius: 7,
                    padding: "9px 20px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  📧 hello@scanhealth.com
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    borderRadius: 7,
                    padding: "9px 20px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  🌐 www.scanhealth.com
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminDashboard({ onBack, googleScriptUrl }) {
  const [filterId, setFilterId] = useState("");
  const [filterName, setFilterName] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      // 1. Load from local first (instant)
      const localData = JSON.parse(localStorage.getItem("scan_health_assessments") || "[]");
      setSubmissions(localData);

      // 2. Try to fetch fresh data from Cloud
      if (googleScriptUrl) {
        try {
          const res = await fetch(googleScriptUrl);
          const cloudData = await res.json();
          if (Array.isArray(cloudData)) {
            setSubmissions(cloudData);
            // Sync local storage with cloud data for offline use
            localStorage.setItem("scan_health_assessments", JSON.stringify(cloudData));
          }
        } catch (e) {
          console.error("Cloud sync failed:", e);
        }
      }
      setIsLoading(false);
    };

    loadData();
  }, [googleScriptUrl]);

  const filtered = submissions.filter(s => {
    const sid = s.surveyId || s["Survey ID"] || "";
    const sname = s.surveyName || s["Survey Name"] || "";
    return (
      (filterId === "" || sid.toString().toLowerCase().includes(filterId.toLowerCase())) &&
      (filterName === "" || sname.toString().toLowerCase().includes(filterName.toLowerCase()))
    );
  });

  const teams = [...new Set(submissions.map(s => {
    const key = Object.keys(s).find(k => k.toLowerCase().replace(/\s/g, "") === "team");
    return key ? s[key] : (s.team || s.Team);
  }))].filter(Boolean);
  const industries = [...new Set(submissions.map(s => {
    const key = Object.keys(s).find(k => k.toLowerCase().replace(/\s/g, "") === "industry");
    return key ? s[key] : (s.industry || s.Industry);
  }))].filter(Boolean);

  const getAvgScore = (list) => {
    if (!list.length) return "0.0";
    const sum = list.reduce((a, b) => {
      // Aggressive key search: finds any key that looks like "totalscore" or "score"
      const scoreKey = Object.keys(b).find(k => 
        k.toLowerCase().replace(/\s/g, "") === "totalscore" || 
        k.toLowerCase() === "score"
      );
      const val = scoreKey ? b[scoreKey] : (b.score || b.Score || 0);
      return a + Number(val || 0);
    }, 0);
    return (sum / list.length).toFixed(1);
  };

  return (
    <div style={{
      padding: "40px 20px",
      maxWidth: 1100,
      margin: "0 auto",
      fontFamily: "'Segoe UI',sans-serif",
      background: `linear-gradient(135deg, ${C.navy} 0%, #1a1a4e 100%)`,
      minHeight: "100vh",
      color: "white"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <div>
          <h1 style={{ color: C.gold, margin: 0, fontSize: 32, fontWeight: 900 }}>Scan Health Hub</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, fontSize: 13, letterSpacing: "0.1em" }}>
            ADMINISTRATION DASHBOARD - CRAIG {isLoading && <span style={{ color: C.gold, marginLeft: 10, fontSize: 10 }}>[ SYNCING... ]</span>}
          </p>
        </div>
        <button
          onClick={onBack}
          style={{
            padding: "12px 24px",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLt})`,
            border: "none",
            borderRadius: 12,
            cursor: "pointer",
            fontWeight: 800,
            color: C.navy,
            boxShadow: "0 4px 15px rgba(212, 160, 23, 0.4)",
            transition: "0.3s"
          }}
        >
          ↩ Return to Survey
        </button>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        padding: 25,
        borderRadius: 18,
        border: `1px solid ${C.gold}33`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        marginBottom: 30
      }}>
        <h3 style={{ marginTop: 0, color: C.gold, fontSize: 18, marginBottom: 15 }}>🔍 Search & Filter</h3>
        <div style={{ display: "flex", gap: 15 }}>
          <input
            placeholder="Filter by Survey ID..."
            value={filterId}
            onChange={e => setFilterId(e.target.value)}
            style={{
              padding: "12px 16px",
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "white",
              outline: "none"
            }}
          />
          <input
            placeholder="Filter by Survey Name..."
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            style={{
              padding: "12px 16px",
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 10,
              color: "white",
              outline: "none"
            }}
          />
        </div>
      </div>

      <div style={{ marginBottom: 30 }}>
        <div style={{
          background: "rgba(255,255,255,0.05)",
          padding: 25,
          borderRadius: 18,
          border: `1px solid ${C.teal}33`,
        }}>
          <h3 style={{ marginTop: 0, color: C.teal, fontSize: 20, display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            👥 Team-wise Analysis
          </h3>
          {teams.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", padding: "20px 0" }}>No team data available</p>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
              gap: 20 
            }}>
              {teams.map(t => {
                const tSubs = filtered.filter(s => {
                  const key = Object.keys(s).find(k => k.toLowerCase().replace(/\s/g, "") === "team");
                  return (key ? s[key] : (s.team || s.Team)) === t;
                });
                const pre = tSubs.filter(s => (s.assessmentType || s["Assessment Type"] || "").includes("Pre"));
                const post = tSubs.filter(s => (s.assessmentType || s["Assessment Type"] || "").includes("Post"));
                return (
                  <div key={t} style={{ 
                    background: "rgba(255,255,255,0.05)", 
                    padding: 20, 
                    borderRadius: 12, 
                    border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <h4 style={{ margin: 0, fontSize: 18, color: "white" }}>{t || "Unassigned"}</h4>
                      <div style={{ color: C.gold, fontWeight: 900, fontSize: 24 }}>{getAvgScore(tSubs)}</div>
                    </div>
                    <div style={{ 
                      fontSize: 13, 
                      color: "rgba(255,255,255,0.5)", 
                      display: "flex", 
                      gap: 20,
                      borderTop: "1px solid rgba(255,255,255,0.05)",
                      paddingTop: 12
                    }}>
                      <span>PRE: <b style={{ color: C.teal }}>{getAvgScore(pre)}</b></span>
                      <span>POST: <b style={{ color: C.purple }}>{getAvgScore(post)}</b></span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div style={{
        background: "rgba(255,255,255,0.05)",
        padding: 30,
        borderRadius: 20,
        border: `1px solid ${C.gold}22`,
      }}>
        <h3 style={{ marginTop: 0, color: C.gold, fontSize: 22, textAlign: "center", marginBottom: 30, display: "flex", alignItems: "center", justifyContent: "center", gap: 15 }}>
          📊 Detailed Submission Logs
        </h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
            <thead>
              <tr style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                <th style={{ textAlign: "left", padding: "0 20px" }}>Respondent</th>
                <th style={{ textAlign: "left" }}>Team</th>
                <th style={{ textAlign: "left" }}>Phase</th>
                <th style={{ textAlign: "left" }}>Result</th>
                <th style={{ textAlign: "left" }}>Audit ID</th>
                <th style={{ textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.3)" }}>
                    No assessment logs found matching filters
                  </td>
                </tr>
              ) : (
                filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((s, idx) => (
                  <tr key={idx} style={{ background: "rgba(255,255,255,0.05)", transition: "0.2s" }}>
                    <td style={{ padding: "20px", borderRadius: "12px 0 0 12px", fontWeight: 800 }}>{s.name}</td>
                    <td>{(() => {
                      const key = Object.keys(s).find(k => k.toLowerCase().replace(/\s/g, "") === "team");
                      return key ? s[key] : (s.team || s.Team);
                    })()}</td>
                    <td>
                      <span style={{
                        background: (s.assessmentType || s["Assessment Type"] || "").includes("Pre") ? "#134e4a" : "#4c1d95",
                        color: (s.assessmentType || s["Assessment Type"] || "").includes("Pre") ? "#2dd4bf" : "#c084fc",
                        padding: "4px 10px", borderRadius: 8, fontSize: 10, fontWeight: 800
                      }}>
                        {(s.assessmentType || s["Assessment Type"] || "").includes("Pre") ? "PRE" : "POST"}
                      </span>
                    </td>
                    <td style={{ color: C.gold, fontWeight: 900, fontSize: 18 }}>
                      {(() => {
                        const scoreKey = Object.keys(s).find(k => 
                          k.toLowerCase().replace(/\s/g, "") === "totalscore" || 
                          k.toLowerCase() === "score"
                        );
                        return scoreKey ? s[scoreKey] : (s.score || s.Score || "0");
                      })()}
                    </td>
                    <td style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{s.surveyId}</td>
                    <td style={{ padding: "0 20px", borderRadius: "0 12px 12px 0", color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
                      {s.timestamp ? new Date(s.timestamp).toLocaleDateString("en-GB") : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxwS1PgaHyW6e9PYeyJpiJCZQ4Ul6ZRI_2f-sRm3WeU-9Msdz1maGepBRl3pYktVHFz/exec";
  const [step, setStep] = useState("intro");

  // Dynamic pre-fill from URL parameters
  const params = new URLSearchParams(window.location.search);
  const [orgInfo, setOrgInfo] = useState({
    name: "",
    email: "",
    surveyId: params.get("sid") || "SCAN-001",
    surveyName: params.get("sname") || "Medicare AI Audit",
    assessmentType: "Pre-assessment",
    team: ""
  });
  const [selectedBands, setSelectedBands] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("clin_ops");
  const [curBand, setCurBand] = useState(0);
  const [curMod, setCurMod] = useState(0);
  const [allScores, setAllScores] = useState({});
  const [indScores, setIndScores] = useState([]);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassAttempt, setAdminPassAttempt] = useState("");
  const ADMIN_PASSWORD = "admin123";
  const topRef = useRef(null);
  const [feedback, setFeedback] = useState({ clarity: 0, knowledge: 0, quality: 0, workedWell: "", improved: "" });
  const [comment, setComment] = useState("");
  const [aiQuestions, setAiQuestions] = useState({ q1: "", q2: "", q3: "" });

  const activeBands = BANDS.filter((b) => selectedBands.includes(b.id));
  const cb = activeBands[curBand];
  const totalSteps = 2 + activeBands.length + (selectedIndustry ? 1 : 0);
  const curStepNum = step === "intro" ? 0 : step === "setup" ? 1 : step === "band" ? 2 + curBand : step === "industry" ? 2 + activeBands.length : totalSteps;

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, curBand, curMod]);

  function getScore(bid, mi, qi) {
    return allScores[bid]?.[mi * 100 + qi] || 0;
  }
  function setScore(bid, mi, qi, v) {
    setAllScores((p) => ({ ...p, [bid]: { ...(p[bid] || {}), [mi * 100 + qi]: v } }));
  }
  function modDone(bid, mi) {
    const b = BANDS.find((x) => x.id === bid);
    return b?.modules[mi]?.questions.every((_, qi) => allScores[bid]?.[mi * 100 + qi] > 0) || false;
  }
  function bandDone(bid) {
    const b = BANDS.find((x) => x.id === bid);
    return b?.modules.every((_, mi) => modDone(bid, mi)) || false;
  }
  function indDone() {
    return (IND_Q[selectedIndustry] || []).every((_, i) => indScores[i] > 0);
  }
  function getFlatScores(bid) {
    const b = BANDS.find((x) => x.id === bid);
    if (!b) return [];
    const out = [];
    b.modules.forEach((m, mi) =>
      m.questions.forEach((_, qi) => out.push(allScores[bid]?.[mi * 100 + qi] || 0))
    );
    return out;
  }

  async function submitSurvey() {
    if (!orgInfo.name || !orgInfo.email) {
      alert("Please fill in Name and Email.");
      return;
    }

    const totalScore = activeBands.reduce((sum, b) => sum + getFlatScores(b.id).reduce((a, x) => a + x, 0), 0);
    const totalMax = activeBands.reduce((sum, b) => sum + b.maxScore, 0);
    const stage = getStage(totalScore, totalMax);

    const isPre = orgInfo.assessmentType === "Pre-assessment";
    const data = {
      ...orgInfo,
      type: orgInfo.assessmentType, // Maps to the "Assessment Type" column in your script
      industry: selectedIndustry,  // Added this so it shows in the Admin Dashboard!
      score: totalScore,
      maxScore: totalMax,
      stage,
      // Clear out feedback for pre-assessments so they don't show as "0" in your sheet
      feedback: isPre ? { clarity: "", knowledge: "", quality: "", workedWell: "", improved: "" } : feedback,
      comment,
      aiQuestions,
      timestamp: new Date().toISOString()
    };

    try {
      // 1. Save to Local Storage (Primary Backup)
      const history = JSON.parse(localStorage.getItem("scan_health_assessments") || "[]");
      history.push(data);
      localStorage.setItem("scan_health_assessments", JSON.stringify(history));

      // 2. Submit to Google Sheets (Async)
      if (GOOGLE_SCRIPT_URL) {
        fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", // Required for Google Script CORS
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }).catch(e => console.error("Cloud sync failed:", e));
      }

      alert('Assessment submitted and saved successfully! 🎉');
      window.location.href = window.location.pathname; // Reloads to home and clears state
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Error saving assessment locally');
    }
  }

  if (step === "intro")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg,${C.navy} 0%,#1a1a4e 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          fontFamily: "'Segoe UI',sans-serif",
        }}
      >
        <div style={{ maxWidth: 620, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 48, marginBottom: 6 }}>🤖</div>
            <h1 style={{ color: C.gold, fontSize: 34, fontWeight: 900, margin: "0 0 6px" }}>SCAN Health Plan</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0, letterSpacing: "0.12em" }}>
              US-BASED MEDICARE ADVANTAGE SERVICES
            </p>
            <p style={{ color: C.gold, fontSize: 10, marginTop: 10, opacity: 0.6, fontWeight: 700, letterSpacing: "0.05em" }}>
              POWERED BY AIGREV
            </p>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${C.gold}44`,
              borderRadius: 18,
              padding: 36,
            }}
          >
            <h2 style={{ color: "white", fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>
              AI Readiness Assessment
            </h2>
            <h3 style={{ color: C.gold, fontSize: 17, fontWeight: 600, margin: "0 0 16px" }}>
              & Healthcare Framework
            </h3>
            <p style={{ color: "rgba(255,255,255,0.72)", fontSize: 13, lineHeight: 1.8, marginBottom: 24 }}>
              Measure your organization's AI readiness across critical clinical and operational roles. Receive an instant audit
              report showing maturity stages, capability gaps, and a prioritized training roadmap.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                ["📋", "Questions", "Across 3 roles"],
                ["🏥", "Healthcare", "Integrated context"],
                ["📊", "Live Scoring", "Instant maturity mapping"],
                ["🗺️", "Roadmap", "APEX recommendations"],
              ].map(([e, t, d]) => (
                <div
                  key={t}
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{e}</span>
                  <div>
                    <div style={{ color: "white", fontWeight: 700, fontSize: 12 }}>{t}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                background: `${C.gold}22`,
                border: `1px solid ${C.gold}66`,
                borderRadius: 9,
                padding: "10px 14px",
                marginBottom: 24,
                fontSize: 12,
                color: C.goldLt,
              }}
            >
              ⏱ <strong>Estimated time:</strong> 15–25 minutes. All scores calculated automatically.
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button
                onClick={() => setStep("setup")}
                style={{
                  flex: 1,
                  background: `linear-gradient(135deg,${C.gold},${C.goldLt})`,
                  color: C.navy,
                  border: "none",
                  borderRadius: 11,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "'Segoe UI',sans-serif",
                }}
              >
                Begin Assessment →
              </button>
              <button
                onClick={() => setShowAdminLogin(true)}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: 11,
                  padding: "14px 28px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Segoe UI',sans-serif",
                }}
              >
                Admin View 🔒
              </button>
            </div>
          </div>

          {/* Confidential Admin Login Overlay */}
          {showAdminLogin && (
            <div style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20
            }}>
              <div style={{
                background: "#1a1a4e", padding: 40, borderRadius: 20, maxWidth: 400, width: "100%",
                border: `1px solid ${C.gold}44`, textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
              }}>
                <div style={{ fontSize: 40, marginBottom: 20 }}>🔐</div>
                <h2 style={{ color: C.gold, margin: "0 0 10px", fontSize: 24, fontWeight: 900 }}>Confidential Access</h2>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 25 }}>
                  This dashboard is for authorized administrators only. Please enter the access key.
                </p>
                <input
                  type="password"
                  placeholder="Enter access key..."
                  value={adminPassAttempt}
                  onChange={e => setAdminPassAttempt(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && (adminPassAttempt === ADMIN_PASSWORD ? setStep("admin") : alert("Incorrect Key"))}
                  style={{
                    width: "100%", padding: "14px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.05)", color: "white", fontSize: 16, textAlign: "center", marginBottom: 20, outline: "none"
                  }}
                  autoFocus
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15 }}>
                  <button
                    onClick={() => { setShowAdminLogin(false); setAdminPassAttempt(""); }}
                    style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "none", padding: "12px", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (adminPassAttempt === ADMIN_PASSWORD) {
                        setStep("admin");
                        setShowAdminLogin(false);
                      } else {
                        alert("Incorrect access key. Access denied.");
                        setAdminPassAttempt("");
                      }
                    }}
                    style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLt})`, color: C.navy, border: "none", padding: "12px", borderRadius: 10, cursor: "pointer", fontWeight: 800 }}
                  >
                    Access Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  if (step === "setup")
    return (
      <div style={{ minHeight: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI',sans-serif" }}>
        <ProgressBar current={1} total={totalSteps} />
        <div ref={topRef} style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px" }}>
          <div
            style={{
              background: "white",
              borderRadius: 14,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                background: C.navy,
                padding: "22px 28px",
                borderBottom: `4px solid ${C.gold}`,
              }}
            >
              <h2 style={{ color: C.gold, margin: 0, fontSize: 20, fontWeight: 800 }}>Organization Setup</h2>
              <p style={{ color: "rgba(255,255,255,0.65)", margin: "3px 0 0", fontSize: 12 }}>
                Personalize your audit report with your organization details.
              </p>
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                {[
                  ["name", "Name (Mandatory)", "Your full name"],
                  ["email", "Email (Mandatory)", "Your email address"],
                  ["surveyId", "Survey ID (Pre-filled)", "e.g. S-001"],
                  ["surveyName", "Survey Name (Pre-filled)", "e.g. Q1 Check"],
                  ["team", "Team", "e.g. Team 1"],
                  ["assessmentType", "Assessment Type", "Pre-assessment or Post-assessment"],
                ].map(([k, l, ph]) => (
                  <div key={k}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 5 }}>
                      {l}
                    </label>
                    {k === "team" ? (
                      <select
                        value={orgInfo[k]}
                        onChange={(e) => setOrgInfo((p) => ({ ...p, [k]: e.target.value }))}
                        style={{
                          width: "100%",
                          border: "1.5px solid #E5E7EB",
                          borderRadius: 7,
                          padding: "9px 11px",
                          fontSize: 12,
                          fontFamily: "'Segoe UI',sans-serif",
                          outline: "none",
                          background: "white",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="">Select Team</option>
                        <option value="Team 1">Team 1</option>
                        <option value="Team 2">Team 2</option>
                        <option value="Team 3">Team 3</option>
                        <option value="Team 4">Team 4</option>
                        <option value="Team 5">Team 5</option>
                      </select>
                    ) : k === "assessmentType" ? (
                      <select
                        value={orgInfo[k]}
                        onChange={(e) => setOrgInfo((p) => ({ ...p, [k]: e.target.value }))}
                        style={{
                          width: "100%",
                          border: "1.5px solid #E5E7EB",
                          borderRadius: 7,
                          padding: "9px 11px",
                          fontSize: 12,
                          fontFamily: "'Segoe UI',sans-serif",
                          outline: "none",
                          background: "white",
                          boxSizing: "border-box",
                        }}
                      >
                        <option value="Pre-assessment">Pre-assessment (Before Training)</option>
                        <option value="Post-assessment">Post-assessment (After Training)</option>
                      </select>
                    ) : (
                      <input
                        value={orgInfo[k]}
                        onChange={(e) => setOrgInfo((p) => ({ ...p, [k]: e.target.value }))}
                        placeholder={ph}
                        readOnly={k === "surveyId" || k === "surveyName"} /* Pre-filled and read-only */
                        style={{
                          width: "100%",
                          border: "1.5px solid #E5E7EB",
                          borderRadius: 7,
                          padding: "9px 11px",
                          fontSize: 12,
                          fontFamily: "'Segoe UI',sans-serif",
                          outline: "none",
                          boxSizing: "border-box",
                          backgroundColor: (k === "surveyId" || k === "surveyName") ? "#F3F4F6" : "white",
                          color: (k === "surveyId" || k === "surveyName") ? "#6B7280" : "#111827",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: C.navy, marginBottom: 3 }}>
                  Select Healthcare Roles to Assess
                </label>
                <p style={{ fontSize: 11, color: "#6B7280", marginBottom: 10 }}>
                  Choose which roles are present in your organization.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(185px,1fr))", gap: 9 }}>
                  {BANDS.map((b) => {
                    const sel = selectedBands.includes(b.id);
                    return (
                      <div
                        key={b.id}
                        onClick={() =>
                          setSelectedBands((p) => (sel ? p.filter((x) => x !== b.id) : [...p, b.id]))
                        }
                        style={{
                          border: `2px solid ${sel ? b.color : "#E5E7EB"}`,
                          borderRadius: 9,
                          padding: "11px 13px",
                          cursor: "pointer",
                          background: sel ? b.bg : "white",
                          transition: "all 0.2s",
                        }}
                      >
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <div
                            style={{
                              width: 18,
                              height: 18,
                              borderRadius: 4,
                              background: sel ? b.color : "#E5E7EB",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              color: "white",
                            }}
                          >
                            {sel ? "✓" : ""}
                          </div>
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, color: sel ? b.color : "#374151" }}>
                              {b.label}
                            </div>
                            <div style={{ fontSize: 10, color: "#6B7280" }}>{b.title.split("/")[0].trim()}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {selectedBands.length === 0 && (
                  <p style={{ color: C.red, fontSize: 11, marginTop: 6 }}>Please select at least one band.</p>
                )}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setStep("intro")}
                  style={{
                    flex: 1,
                    background: "#F3F4F6",
                    color: "#374151",
                    border: "1px solid #E5E7EB",
                    borderRadius: 10,
                    padding: "13px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "'Segoe UI',sans-serif",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (!orgInfo.name || !orgInfo.email || !orgInfo.team) {
                      alert("Name, Email, and Team are mandatory.");
                      return;
                    }

                    // Check for duplicate submission
                    const history = JSON.parse(localStorage.getItem("scan_health_assessments") || "[]");
                    const duplicate = history.find(h =>
                      h.email.toLowerCase() === orgInfo.email.toLowerCase() &&
                      h.surveyId === orgInfo.surveyId
                    );

                    if (duplicate) {
                      alert("A submission for this Email and Survey ID already exists.");
                      return;
                    }

                    if (selectedBands.length > 0) {
                      setCurBand(0);
                      setCurMod(0);
                      setStep("band");
                    }
                  }}
                  disabled={selectedBands.length === 0}
                  style={{
                    flex: 2,
                    background: selectedBands.length > 0 ? `linear-gradient(135deg,${C.navy},${C.navyLt})` : "#E5E7EB",
                    color: selectedBands.length > 0 ? "white" : "#9CA3AF",
                    border: "none",
                    borderRadius: 10,
                    padding: "13px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: selectedBands.length > 0 ? "pointer" : "not-allowed",
                    fontFamily: "'Segoe UI',sans-serif",
                  }}
                >
                  Start Assessment →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (step === "band" && cb) {
    const mod = cb.modules[curMod];
    const totMods = cb.modules.length;
    const mDone = modDone(cb.id, curMod);
    return (
      <div style={{ minHeight: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI',sans-serif" }}>
        <ProgressBar current={2 + curBand} total={totalSteps} />
        <div ref={topRef} style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px" }}>
          <div style={{ background: cb.color, borderRadius: "12px 12px 0 0", padding: "18px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Band Assessment
                </div>
                <h2 style={{ color: "white", margin: "3px 0 2px", fontSize: 18, fontWeight: 800 }}>
                  {cb.id} — {cb.title}
                </h2>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{cb.roles}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10 }}>Module</div>
                <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>
                  {curMod + 1}/{totMods}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 5, marginTop: 12, overflowX: "auto" }}>
              {cb.modules.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setCurMod(i)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: 16,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: "'Segoe UI',sans-serif",
                    background: i === curMod ? "white" : modDone(cb.id, i) ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
                    color: i === curMod ? cb.color : "white",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {modDone(cb.id, i) ? "✓ " : ""}{i + 1}. {m.name.split(" ").slice(0, 3).join(" ")}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "0 0 12px 12px",
              border: "1px solid #E5E7EB",
              borderTop: "none",
              padding: "22px 24px",
              boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div
                  style={{
                    fontSize: 10,
                    color: cb.color,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Module {curMod + 1}
                </div>
                <h3 style={{ margin: "2px 0 0", color: C.navy, fontSize: 15, fontWeight: 800 }}>{mod.name}</h3>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#6B7280",
                  background: "#F3F4F6",
                  borderRadius: 7,
                  padding: "3px 9px",
                }}
              >
                {mod.questions.filter((_, qi) => allScores[cb.id]?.[curMod * 100 + qi] > 0).length}/{mod.questions.length} answered
              </div>
            </div>
            <div
              style={{
                background: "#F8F9FA",
                borderRadius: 7,
                padding: "9px 12px",
                marginBottom: 16,
                fontSize: 11,
                color: "#374151",
                borderLeft: `3px solid ${cb.color}`,
              }}
            >
              <strong>Scoring:</strong> 1=Never &nbsp;·&nbsp; 2=Rarely &nbsp;·&nbsp; 3=Sometimes &nbsp;·&nbsp; 4=Often &nbsp;·&nbsp; 5=Expert
            </div>
            {mod.questions.map((q, qi) => {
              const prevBandsQ = activeBands.slice(0, curBand).reduce((acc, b) => acc + b.modules.reduce((a, m) => a + m.questions.length, 0), 0);
              const prevModsQ = cb.modules.slice(0, curMod).reduce((acc, m) => acc + m.questions.length, 0);
              return (
                <QCard
                  key={qi}
                  qNum={prevBandsQ + prevModsQ + qi + 1}
                  text={q}
                  value={getScore(cb.id, curMod, qi)}
                  onChange={(v) => setScore(cb.id, curMod, qi, v)}
                  bandColor={cb.color}
                />
              );
            })}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  onClick={() => {
                    if (curMod > 0) setCurMod((i) => i - 1);
                    else if (curBand > 0) {
                      setCurBand((i) => i - 1);
                      setCurMod(activeBands[curBand - 1].modules.length - 1);
                    } else {
                      setStep("setup");
                    }
                  }}
                  style={{
                    flex: 1,
                    background: "#F3F4F6",
                    color: "#374151",
                    border: "1px solid #E5E7EB",
                    borderRadius: 9,
                    padding: "11px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Segoe UI',sans-serif",
                  }}
                >
                  ← Back
                </button>
              <button
                onClick={() => {
                  if (!mDone) return;
                  if (curMod < totMods - 1) setCurMod((i) => i + 1);
                  else if (curBand < activeBands.length - 1) {
                    setCurBand((i) => i + 1);
                    setCurMod(0);
                  } else if (selectedIndustry) setStep("industry");
                  else setStep("results");
                }}
                style={{
                  flex: 2,
                  background: mDone ? `linear-gradient(135deg,${cb.color},${cb.color}CC)` : "#E5E7EB",
                  color: mDone ? "white" : "#9CA3AF",
                  border: "none",
                  borderRadius: 9,
                  padding: "11px",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: mDone ? "pointer" : "not-allowed",
                  fontFamily: "'Segoe UI',sans-serif",
                }}
              >
                {!mDone
                  ? `Answer all ${mod.questions.length} questions to continue`
                  : curMod < totMods - 1
                    ? `Next Module →`
                    : curBand < activeBands.length - 1
                      ? `Next Band: ${activeBands[curBand + 1].id} →`
                      : selectedIndustry
                        ? `Industry Questions →`
                        : `View Audit Report 📊 →`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "industry" && selectedIndustry) {
    const ind = INDUSTRIES.find((i) => i.id === selectedIndustry);
    const qs = IND_Q[selectedIndustry] || [];
    const done = indDone();
    return (
      <div style={{ minHeight: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI',sans-serif" }}>
        <ProgressBar current={2 + activeBands.length} total={totalSteps} />
        <div ref={topRef} style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px" }}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #E5E7EB",
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
            }}
          >
            <div style={{ background: ind?.color, padding: "18px 24px" }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Industry Module
              </div>
              <h2 style={{ color: "white", margin: "3px 0 2px", fontSize: 18, fontWeight: 800 }}>
                {ind?.label} AI Readiness
              </h2>
              <p style={{ color: "rgba(255,255,255,0.8)", margin: 0, fontSize: 11 }}>
                5 sector-specific questions measured against real AI use cases.
              </p>
            </div>
            <div style={{ padding: "22px 24px" }}>
              {qs.map((q, i) => {
                const totalBandQs = activeBands.reduce((acc, b) => acc + b.modules.reduce((a, m) => a + m.questions.length, 0), 0);
                return (
                  <QCard
                    key={i}
                    qNum={totalBandQs + i + 1}
                    text={q}
                    value={indScores[i] || 0}
                    onChange={(v) => setIndScores((p) => { const n = [...p]; n[i] = v; return n; })}
                    bandColor={ind?.color}
                  />
                );
              })}
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button
                  onClick={() => {
                    setCurBand(activeBands.length - 1);
                    setCurMod(activeBands[activeBands.length - 1].modules.length - 1);
                    setStep("band");
                  }}
                  style={{
                    flex: 1,
                    background: "#F3F4F6",
                    color: "#374151",
                    border: "1px solid #E5E7EB",
                    borderRadius: 9,
                    padding: "11px",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    fontFamily: "'Segoe UI',sans-serif",
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => {
                    if (done) setStep("results");
                  }}
                  style={{
                    flex: 2,
                    background: done ? `linear-gradient(135deg,${ind?.color},${ind?.color}BB)` : "#E5E7EB",
                    color: done ? "white" : "#9CA3AF",
                    border: "none",
                    borderRadius: 9,
                    padding: "11px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: done ? "pointer" : "not-allowed",
                    fontFamily: "'Segoe UI',sans-serif",
                  }}
                >
                  View Audit Report 📊 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "admin") {
    return <AdminDashboard onBack={() => setStep("intro")} googleScriptUrl={GOOGLE_SCRIPT_URL} />;
  }

  if (step === "results") {
    const fs = {};
    activeBands.forEach((b) => {
      fs[b.id] = getFlatScores(b.id);
    });

    // Check for previous assessment to show comparison
    const history = JSON.parse(localStorage.getItem("scan_health_assessments") || "[]");
    const previous = history.filter(h =>
      h.name.toLowerCase() === orgInfo.name.toLowerCase() &&
      h.surveyId === orgInfo.surveyId &&
      h.timestamp !== (history[history.length - 1]?.timestamp) // last saved is current
    ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

    const currentScore = activeBands.reduce((sum, b) => sum + getFlatScores(b.id).reduce((a, x) => a + x, 0), 0);

    return (
      <div style={{ minHeight: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI',sans-serif", padding: "20px 16px" }}>
        <div ref={topRef} style={{ maxWidth: 860, margin: "0 auto" }}>
          <ResultsPanel
            allScores={fs}
            orgInfo={orgInfo}
            selectedBands={selectedBands}
            selectedIndustry={selectedIndustry}
            industryScores={indScores}
          />

          <div style={{ background: "white", padding: 25, borderRadius: 14, marginTop: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
            <h3 style={{ color: C.navy, borderBottom: `2px solid ${C.gold}`, paddingBottom: 10 }}>Final Review & Feedback</h3>

            {previous && (
              <div style={{ background: "#f8f9fa", padding: 15, borderRadius: 8, marginBottom: 20, borderLeft: `5px solid ${C.teal}` }}>
                <div style={{ fontWeight: 700, color: C.teal, fontSize: 14 }}>Comparison Detected!</div>
                <div style={{ fontSize: 13, marginTop: 5 }}>
                  Last Assessment Score: <strong>{previous.score}</strong> | Current Score: <strong>{currentScore}</strong>
                  <br />
                  Change: <span style={{ color: currentScore >= previous.score ? C.green : C.red, fontWeight: 700 }}>
                    {currentScore >= previous.score ? "+" : ""}{currentScore - previous.score} ({((currentScore - previous.score) / previous.score * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            )}

            {orgInfo.assessmentType === "Post-assessment" && (
              <>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Training Feedback</label>
                  <div style={{ display: "grid", gap: 15 }}>
                    {["Clarity of training", "Knowledge of trainer", "Quality of data presented"].map((label, idx) => {
                      const key = idx === 0 ? "clarity" : idx === 1 ? "knowledge" : "quality";
                      return (
                        <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 12 }}>{label}</span>
                          <div style={{ display: "flex", gap: 5 }}>
                            {[1, 2, 3, 4, 5].map(v => (
                              <button
                                key={v}
                                onClick={() => setFeedback(f => ({ ...f, [key]: v }))}
                                style={{
                                  width: 30, height: 30, borderRadius: "50%", border: "1px solid #ddd",
                                  background: feedback[key] === v ? C.gold : "white",
                                  color: feedback[key] === v ? C.navy : "#666",
                                  fontSize: 11, cursor: "pointer", transition: "0.2s"
                                }}
                              >{v}</button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>What worked well?</label>
                  <textarea
                    value={feedback.workedWell}
                    onChange={e => setFeedback(f => ({ ...f, workedWell: e.target.value }))}
                    style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", minHeight: 60 }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>What can be improved?</label>
                  <textarea
                    value={feedback.improved}
                    onChange={e => setFeedback(f => ({ ...f, improved: e.target.value }))}
                    style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", minHeight: 60 }}
                  />
                </div>
              </>
            )}

            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 14, color: C.navy, marginBottom: 10 }}>General AI Questions</h4>
              <div style={{ display: "grid", gap: 15 }}>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "#666" }}>1. How often do you use AI tools outside of work?</label>
                  <input value={aiQuestions.q1} onChange={e => setAiQuestions(q => ({ ...q, q1: e.target.value }))} style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "#666" }}>2. What AI tool is most exciting to you right now?</label>
                  <input value={aiQuestions.q2} onChange={e => setAiQuestions(q => ({ ...q, q2: e.target.value }))} style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4 }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, color: "#666" }}>3. Do you feel AI will significantly change your role this year?</label>
                  <input value={aiQuestions.q3} onChange={e => setAiQuestions(q => ({ ...q, q3: e.target.value }))} style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4 }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>Final Comments</label>
              <textarea
                value={comment}
                onChange={e => setComment(e.target.value)}
                style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", minHeight: 60 }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => {
                  if (selectedIndustry) setStep("industry");
                  else {
                    setCurBand(activeBands.length - 1);
                    setCurMod(activeBands[activeBands.length - 1].modules.length - 1);
                    setStep("band");
                  }
                }}
                style={{
                  flex: 1,
                  background: "#F3F4F6",
                  color: "#374151",
                  border: "1px solid #E5E7EB",
                  borderRadius: 9,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Segoe UI',sans-serif",
                }}
              >
                ← Back
              </button>
              <button
                onClick={submitSurvey}
                style={{
                  flex: 2,
                  background: C.navy,
                  color: "white",
                  border: "none",
                  borderRadius: 9,
                  padding: "14px",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                }}
              >
                Submit Final Assessment & Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}