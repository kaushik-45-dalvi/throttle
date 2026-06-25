"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { mockProjects, formatUSD } from "@/lib/mock-data";
import { Plus, X, Zap } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  red: "#E8391D", blue: "#1B4FD8", yellow: "#F5C800", black: "#1A1A1A",
};

export default function ProjectsPage() {
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBudget, setNewBudget] = useState("");

  return (
    <>
      <TopNav
        title="Projects"
        subtitle="Manage your API projects and budgets"
        action={{ label: "New Project", onClick: () => setShowModal(true) }}
      />

      <div className="dashboard-content">

        {/* Summary bar */}
        <div
          className="card"
          style={{
            padding: "16px 24px",
            display: "flex",
            gap: 48,
            marginBottom: 24,
            border: "1px solid var(--gray-200)",
            background: "var(--white)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {[
            { label: "Total Projects", value: mockProjects.length },
            { label: "Total Budget", value: "$" + mockProjects.reduce((a, p) => a + p.budget, 0) },
            { label: "Total Spent", value: "$" + mockProjects.reduce((a, p) => a + p.spent, 0) },
            { label: "Total Saved Today", value: "+$" + mockProjects.reduce((a, p) => a + p.savedToday, 0).toFixed(2) },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", marginBottom: 4 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--black)", letterSpacing: "-0.02em" }}>
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Project grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 16,
          }}
        >
          {mockProjects.map((proj) => {
            const accentColor = COLOR_MAP[proj.color];
            const pct = Math.round((proj.spent / proj.budget) * 100);
            const savingsPct = Math.round((proj.savedToday / (proj.savedToday + proj.costToday)) * 100);
            return (
              <div
                key={proj.id}
                className="card card-hover"
                style={{
                  overflow: "hidden",
                  padding: 0,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {/* Color bar */}
                <div style={{ height: 6, background: accentColor }} />

                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 44, height: 44,
                          background: accentColor,
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, color: proj.color === "yellow" ? "#1A1A1A" : "#fff" }}>
                          {proj.name[0]}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.01em" }}>
                          {proj.name}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)", marginTop: 2 }}>
                          {proj.provider} · {proj.model}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 10px",
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10B981",
                        borderRadius: "12px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      <Zap size={10} fill="#10B981" />
                      {savingsPct}% saved
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginBottom: 20, border: "1px solid var(--gray-200)" }}>
                    {[
                      { label: "Requests", value: proj.requestsToday.toLocaleString() },
                      { label: "Cost Today", value: `$${proj.costToday.toFixed(2)}` },
                      { label: "Saved Today", value: `$${proj.savedToday.toFixed(2)}` },
                    ].map((s, i) => (
                      <div
                        key={s.label}
                        style={{
                          padding: "12px 16px",
                          borderLeft: i > 0 ? "1px solid var(--gray-200)" : "none",
                        }}
                      >
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: 4 }}>
                          {s.label}
                        </div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700 }}>
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Budget progress */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--gray-500)" }}>
                        Monthly Budget
                      </span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700 }}>
                        ${proj.spent} / ${proj.budget} ({pct}%)
                      </span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${pct}%`,
                          background: pct > 85 ? "#E8391D" : pct > 65 ? "#F5C800" : "#2EA55A",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add project card */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              border: "2px dashed var(--gray-300)",
              borderRadius: "12px",
              background: "var(--white)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              minHeight: 280,
              cursor: "pointer",
              transition: "all 0.15s",
              boxShadow: "var(--shadow-sm)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--blue)";
              e.currentTarget.style.background = "var(--cream-dark)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--gray-300)";
              e.currentTarget.style.background = "var(--white)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{ width: 48, height: 48, border: "1px solid var(--gray-300)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream-dark)", color: "var(--gray-500)" }}>
              <Plus size={20} />
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gray-500)" }}>
              New Project
            </div>
          </button>
        </div>
      </div>

      {/* Create project modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                Create Project
              </div>
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Project Name
                </label>
                <input
                  className="input"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. SearchBot"
                />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Provider
                </label>
                <select className="input">
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Monthly Budget (USD)
                </label>
                <input
                  className="input"
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  placeholder="e.g. 100"
                />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
