"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { useDashboard } from "@/lib/DashboardContext";
import { Plus, X, Bell, Mail, Globe, AlertTriangle } from "lucide-react";

const Slack = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.522v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.522zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.761a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522h-2.522v-2.522zm-1.262 0a2.528 2.528 0 0 1-2.52 2.522H10.13a2.528 2.528 0 0 1-2.52-2.522V5.043a2.528 2.528 0 0 1 2.52-2.52h5.044a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.76 10.135a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.044a2.528 2.528 0 0 1 2.522-2.52h5.042a2.528 2.528 0 0 1 2.52 2.52v5.044a2.528 2.528 0 0 1-2.52 2.52h-5.042z" />
  </svg>
);

export default function AlertsPage() {
  const { alerts, projects, loading: dashLoading, addAlert: add, removeAlert: remove } = useDashboard();

  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState("");
  const [limitUsd, setLimitUsd] = useState("");
  const [type, setType] = useState("monthly");
  const [channels, setChannels] = useState<string[]>(["email"]);

  // Set default project when projects load
  useEffect(() => {
    if (projects.length > 0 && !project) {
      setProject(projects[0].name);
    }
  }, [projects, project]);

  const toggleChannel = (ch: string) => {
    if (channels.includes(ch)) {
      setChannels(channels.filter((c) => c !== ch));
    } else {
      setChannels([...channels, ch]);
    }
  };

  const handleCreateAlert = async () => {
    if (!limitUsd || !project) return;
    await add({
      project,
      type,
      limitUsd: parseFloat(limitUsd),
      currentUsd: 0,
      pct: 0,
      channels,
      status: "ok",
      createdAt: new Date().toISOString(),
    });
    setShowModal(false);
    setLimitUsd("");
    setChannels(["email"]);
  };

  const handleDeleteAlert = async (id: string) => {
    if (confirm("Are you sure you want to delete this alert rule?")) {
      await remove(id);
    }
  };

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const loading = dashLoading && !timedOut;

  if (loading) {
    return (
      <>
        <TopNav title="Budget Alerts" subtitle="Loading alerts..." />
        <div className="dashboard-content">
          <div className="card shimmer" style={{ height: 120, marginBottom: 24 }} />
          <div className="alerts-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card shimmer" style={{ height: 220 }} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav
        title="Budget Alerts"
        subtitle="Configure budget thresholds and notifications"
        action={{ label: "New Alert Rule", onClick: () => {
          if (projects.length > 0) {
            setProject(projects[0].name);
          }
          setShowModal(true);
        }}}
      />

      <div className="dashboard-content">
        {/* Banner */}
        <div
          className="card"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: 12,
            padding: "24px 32px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--black)", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
              Keep costs under control
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>
              Define budget thresholds per project. We will alert your team via Slack, email, or custom webhooks when limits are approached.
            </p>
          </div>
          <Bell size={40} color="var(--yellow)" style={{ flexShrink: 0 }} />
        </div>

        {/* Alerts Grid */}
        <div className="alerts-grid">
          {alerts.map((alert) => {
            const isNearLimit = (alert.pct || 0) >= 75;
            const statusColor = isNearLimit ? "#E8391D" : "#2EA55A";
            const borderAccent = (alert.pct || 0) >= 75 ? "#E8391D" : "#1A1A1A";
            return (
              <div
                key={alert.id}
                className="card card-hover"
                style={{
                  borderTop: `4px solid ${borderAccent === "#1A1A1A" ? "var(--black)" : borderAccent}`,
                  background: "var(--white)",
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  minHeight: 220,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div>
                      <span
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--gray-500)",
                        }}
                      >
                        {alert.type} Alert rule
                      </span>
                      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4 }}>
                        {alert.project}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDeleteAlert(alert.id)}
                      style={{
                        width: 28,
                        height: 28,
                        border: "1px solid var(--gray-200)",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        color: "var(--gray-400)",
                        background: "none",
                        transition: "all 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--red)";
                        e.currentTarget.style.color = "var(--red)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--gray-200)";
                        e.currentTarget.style.color = "var(--gray-400)";
                      }}
                    >
                      <X size={14} />
                    </button>
                  </div>
 
                  {/* Progress bar */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                        ${alert.currentUsd || 0} / ${alert.limitUsd} limit
                      </span>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: statusColor }}>
                        {alert.pct || 0}%
                      </span>
                    </div>
                    <div className="progress-track" style={{ height: 10 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${alert.pct || 0}%`,
                          background: statusColor,
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom section with channels and status badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--gray-200)", paddingTop: 16 }}>
                  {/* Channels */}
                  <div style={{ display: "flex", gap: 8 }}>
                    {(alert.channels || []).includes("email") && (
                      <div title="Email Notification" style={{ width: 32, height: 32, border: "1px solid var(--gray-200)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream-dark)", color: "var(--black)" }}>
                        <Mail size={14} />
                      </div>
                    )}
                    {(alert.channels || []).includes("slack") && (
                      <div title="Slack Channel" style={{ width: 32, height: 32, border: "1px solid rgba(59, 130, 246, 0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(59, 130, 246, 0.1)", color: "var(--blue-dark)" }}>
                        <Slack size={14} />
                      </div>
                    )}
                    {(alert.channels || []).includes("webhook") && (
                      <div title="Webhook Callback" style={{ width: 32, height: 32, border: "1px solid rgba(245, 158, 11, 0.2)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(245, 158, 11, 0.1)", color: "var(--yellow-dark)" }}>
                        <Globe size={14} />
                      </div>
                    )}
                  </div>
 
                  {/* Status Badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 10px",
                      borderRadius: "12px",
                      background: isNearLimit ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)",
                      color: isNearLimit ? "var(--red)" : "#10B981",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {isNearLimit ? (
                      <>
                        <AlertTriangle size={10} /> Warning
                      </>
                    ) : (
                      "Active"
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add Alert card placeholder */}
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
              minHeight: 220,
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
            <div style={{ width: 44, height: 44, border: "1px solid var(--gray-300)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream-dark)", color: "var(--gray-500)" }}>
              <Plus size={18} />
            </div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--gray-500)" }}>
              Add Budget Alert Rule
            </div>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                Add Alert Rule
              </div>
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer", border: "none", background: "none" }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Target Project
                </label>
                {projects.length === 0 ? (
                  <div style={{ color: "var(--red)", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
                    ⚠️ You must create a project first!
                  </div>
                ) : (
                  <select className="input" value={project} onChange={(e) => setProject(e.target.value)}>
                    {projects.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Alert Type
                </label>
                <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="monthly">Monthly Resetting Budget</option>
                  <option value="rolling">Rolling 30-Day Limit</option>
                  <option value="daily">Daily Spending Cap</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Alert Threshold (USD)
                </label>
                <input
                  className="input"
                  type="number"
                  placeholder="e.g. 100"
                  value={limitUsd}
                  onChange={(e) => setLimitUsd(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                  Notification Channels
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { key: "email", label: "Email", icon: Mail },
                    { key: "slack", label: "Slack", icon: Slack },
                    { key: "webhook", label: "Webhook", icon: Globe },
                  ].map((c) => {
                    const Icon = c.icon;
                    const isSelected = channels.includes(c.key);
                    return (
                      <button
                        key={c.key}
                        onClick={() => toggleChannel(c.key)}
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          border: isSelected ? "1px solid var(--black)" : "1px solid var(--gray-200)",
                          borderRadius: "8px",
                          background: isSelected ? "var(--black)" : "var(--white)",
                          color: isSelected ? "var(--white)" : "var(--black)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        <Icon size={14} />
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={handleCreateAlert}
                  disabled={projects.length === 0 || !limitUsd}
                >
                  Create Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
