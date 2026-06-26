"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { useDashboard } from "@/lib/DashboardContext";
import { ChevronDown, ExternalLink, AlertCircle, CheckCircle, Clock } from "lucide-react";

const STATUS_MAP = {
  success:      { label: "Success",      color: "#2EA55A", bg: "rgba(46,165,90,0.1)",   icon: CheckCircle  },
  error:        { label: "Error",        color: "#E8391D", bg: "rgba(232,57,29,0.1)",  icon: AlertCircle  },
  rate_limited: { label: "Rate Limited", color: "#9B7E00", bg: "rgba(245,200,0,0.15)", icon: Clock        },
};

const PROVIDER_COLOR: Record<string, string> = {
  openai: "#1B4FD8",
  anthropic: "#E8391D",
};

export default function RequestsPage() {
  const { requests, loading } = useDashboard();
  const [filter, setFilter] = useState({ provider: "all", status: "all", project: "all" });
  const [selectedReq, setSelectedReq] = useState<any | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  const filtered = requests.filter((r) => {
    if (filter.provider !== "all" && r.provider !== filter.provider) return false;
    if (filter.status !== "all" && r.status !== filter.status) return false;
    if (filter.project !== "all" && r.project !== filter.project) return false;
    return true;
  });

  if (loading && !timedOut) {
    return (
      <>
        <TopNav title="Requests" subtitle="Loading requests log..." />
        <div className="dashboard-content">
          <div className="card shimmer" style={{ height: 50, marginBottom: 20 }} />
          <div className="card shimmer" style={{ height: 400 }} />
        </div>
      </>
    );
  }

  return (
    <>
      <TopNav title="Requests" subtitle="All proxied requests with batch details" />

      <div className="dashboard-content">

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              key: "provider",
              label: "Provider",
              options: ["all", "openai", "anthropic"],
            },
            {
              key: "status",
              label: "Status",
              options: ["all", "success", "error", "rate_limited"],
            },
            {
              key: "project",
              label: "Project",
              options: ["all", ...Array.from(new Set(requests.map((r) => r.project)))],
            },
          ].map(({ key, label, options }) => (
            <div key={key} style={{ position: "relative" }}>
              <select
                className="input"
                style={{ paddingRight: 32, minWidth: 140, fontSize: 12, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}
                value={(filter as any)[key]}
                onChange={(e) => setFilter((f) => ({ ...f, [key]: e.target.value }))}
              >
                {options.map((o) => (
                  <option key={o} value={o}>{o === "all" ? `All ${label}s` : o}</option>
                ))}
              </select>
            </div>
          ))}

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-500)" }}>
              {filtered.length} results
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper" style={{ marginBottom: 20 }}>
          {requests.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--gray-400)", fontFamily: "'Space Grotesk', sans-serif" }}>
              No API requests processed yet. Logs will appear here as your keys make calls.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Project</th>
                  <th>Provider / Model</th>
                  <th>Batch</th>
                  <th>Tokens In</th>
                  <th>Tokens Out</th>
                  <th>Cost</th>
                  <th>Saved</th>
                  <th>Latency</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((req) => {
                  const st = STATUS_MAP[req.status as keyof typeof STATUS_MAP] || { label: req.status, color: "var(--black)", bg: "var(--gray-200)", icon: Clock };
                  const Icon = st.icon;
                  const provColor = PROVIDER_COLOR[req.provider] || "#1A1A1A";
                  const time = new Date(req.timestamp).toLocaleTimeString();
                  return (
                    <tr key={req.id} onClick={() => setSelectedReq(req)} style={{ cursor: "pointer" }}>
                      <td>
                        <span className="mono" style={{ color: "var(--gray-500)" }}>{time}</span>
                      </td>
                      <td>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13 }}>{req.project}</span>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span
                            style={{
                              display: "inline-block",
                              width: 8, height: 8,
                              borderRadius: "50%",
                              background: provColor,
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12 }}>
                            {req.provider} / {req.model}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="mono" style={{ fontSize: 11, color: "var(--gray-500)" }}>{req.batchId}</span>
                        {req.batchSize > 1 && (
                          <span
                            style={{
                              marginLeft: 6,
                              background: "rgba(59, 130, 246, 0.1)",
                              color: "var(--blue-dark)",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontFamily: "'Space Grotesk', sans-serif",
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            ×{req.batchSize}
                          </span>
                        )}
                      </td>
                      <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{req.inputTokens.toLocaleString()}</span></td>
                      <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{req.outputTokens.toLocaleString()}</span></td>
                      <td>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13 }}>
                          ${req.costUsd.toFixed(4)}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13, color: "#2EA55A" }}>
                          +${req.savingsUsd.toFixed(4)}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{req.latencyMs}ms</span>
                      </td>
                      <td>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "4px 10px",
                            borderRadius: "12px",
                            background: st.bg,
                            color: st.color,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          <Icon size={10} />
                          {st.label}
                        </div>
                      </td>
                      <td>
                        <ExternalLink size={14} color="var(--gray-400)" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "var(--gray-500)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Showing {filtered.length} of {requests.length}
            </span>
            <div style={{ display: "flex", gap: 4 }}>
              {["←", "1", "→"].map((p, i) => (
                <button
                  key={i}
                  style={{
                    width: 36, height: 36,
                    border: "1px solid var(--gray-200)",
                    borderRadius: "6px",
                    background: i === 1 ? "var(--blue-dark)" : "var(--white)",
                    color: i === 1 ? "var(--white)" : "var(--gray-500)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== 1) {
                      e.currentTarget.style.background = "var(--cream-dark)";
                      e.currentTarget.style.color = "var(--black)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (i !== 1) {
                      e.currentTarget.style.background = "var(--white)";
                      e.currentTarget.style.color = "var(--gray-500)";
                    }
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReq && (
        <div className="modal-overlay" onClick={() => setSelectedReq(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                  Request Detail
                </div>
                <div className="mono" style={{ color: "var(--gray-500)", marginTop: 4 }}>{selectedReq.id}</div>
              </div>
              <button onClick={() => setSelectedReq(null)} style={{ fontSize: 20, color: "var(--gray-400)", cursor: "pointer", border: "none", background: "none" }}>×</button>
            </div>

            <div className="modal-grid" style={{ gap: 12, marginBottom: 20 }}>
              {[
                { l: "Project",   v: selectedReq.project },
                { l: "Provider",  v: selectedReq.provider },
                { l: "Model",     v: selectedReq.model },
                { l: "Batch ID",  v: selectedReq.batchId },
                { l: "Batch Size",v: `×${selectedReq.batchSize}` },
                { l: "Latency",   v: `${selectedReq.latencyMs}ms` },
                { l: "Cost",      v: `$${selectedReq.costUsd.toFixed(6)}` },
                { l: "Saved",     v: `$${selectedReq.savingsUsd.toFixed(6)}` },
                { l: "In Tokens", v: selectedReq.inputTokens.toLocaleString() },
                { l: "Out Tokens",v: selectedReq.outputTokens.toLocaleString() },
              ].map(({ l, v }) => (
                <div key={l} style={{ borderBottom: "1px solid var(--gray-200)", paddingBottom: 8 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: 2 }}>{l}</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedReq(null)}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
