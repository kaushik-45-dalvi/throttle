"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { useDashboard } from "@/lib/DashboardContext";
import { formatUSD, pickProjectColor } from "@/lib/utils";
import { Plus, X, Zap, Trash2 } from "lucide-react";

const COLOR_MAP: Record<string, string> = {
  red: "#E8391D", blue: "#1B4FD8", yellow: "#F5C800", black: "#1A1A1A",
};

export default function ProjectsPage() {
  const { projects, loading, addProject: add, removeProject: remove } = useDashboard();
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newProvider, setNewProvider] = useState("openai");
  const [newModel, setNewModel] = useState("GPT-4o");
  const [newBudget, setNewBudget] = useState("");
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const handleCreate = async () => {
    if (!newName.trim() || !newBudget) return;
    await add({
      name: newName,
      provider: newProvider,
      model: newModel,
      budget: Number(newBudget),
      spent: 0,
      costToday: 0,
      savedToday: 0,
      requestsToday: 0,
      color: pickProjectColor(),
      createdAt: new Date().toISOString(),
    });
    setNewName("");
    setNewBudget("");
    setNewProvider("openai");
    setNewModel("GPT-4o");
    setShowModal(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await remove(id);
    }
  };

  if (loading && !timedOut) {
    return (
      <>
        <TopNav title="Projects" subtitle="Loading projects..." />
        <div className="dashboard-content">
          <div className="card shimmer" style={{ height: 60, marginBottom: 24 }} />
          <div className="projects-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card shimmer" style={{ height: 280 }} />
            ))}
          </div>
        </div>
      </>
    );
  }

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
            flexWrap: "wrap",
            gap: "16px 32px",
            marginBottom: 24,
            border: "1px solid var(--gray-200)",
            background: "var(--white)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {[
            { label: "Total Projects", value: projects.length },
            { label: "Total Budget", value: "$" + projects.reduce((a, p) => a + p.budget, 0) },
            { label: "Total Spent", value: "$" + projects.reduce((a, p) => a + p.spent, 0) },
            { label: "Total Saved Today", value: formatUSD(projects.reduce((a, p) => a + p.savedToday, 0)) },
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
        <div className="projects-grid">
          {projects.map((proj) => {
            const accentColor = COLOR_MAP[proj.color] || "var(--blue-dark)";
            const pct = proj.budget > 0 ? Math.min(Math.round((proj.spent / proj.budget) * 100), 100) : 0;
            const totalCostToday = (proj.savedToday || 0) + (proj.costToday || 0);
            const savingsPct = totalCostToday > 0 ? Math.round(((proj.savedToday || 0) / totalCostToday) * 100) : 0;
            return (
              <div
                key={proj.id}
                className="card card-hover"
                style={{
                  overflow: "hidden",
                  padding: 0,
                  boxShadow: "var(--shadow-sm)",
                  position: "relative",
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
                          {proj.name ? proj.name[0] : "P"}
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
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                      <button
                        onClick={() => handleDelete(proj.id)}
                        style={{
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--gray-400)",
                          padding: 4,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "4px",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--red)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--gray-400)"; }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginBottom: 20, border: "1px solid var(--gray-200)" }}>
                    {[
                      { label: "Requests", value: (proj.requestsToday || 0).toLocaleString() },
                      { label: "Cost Today", value: formatUSD(proj.costToday || 0) },
                      { label: "Saved Today", value: formatUSD(proj.savedToday || 0) },
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
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer", border: "none", background: "none" }}>
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
                <select
                  className="input"
                  value={newProvider}
                  onChange={(e) => {
                    setNewProvider(e.target.value);
                    if (e.target.value === "openai") setNewModel("GPT-4o");
                    else if (e.target.value === "anthropic") setNewModel("Claude-3.5-Sonnet");
                    else setNewModel("Llama-3");
                  }}
                >
                  <option value="openai">OpenAI</option>
                  <option value="anthropic">Anthropic</option>
                  <option value="meta">Meta (Llama)</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Model
                </label>
                <input
                  className="input"
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  placeholder="e.g. GPT-4o"
                />
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
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleCreate}>
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
