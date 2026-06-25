"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { mockApiKeys } from "@/lib/mock-data";
import { Eye, EyeOff, Copy, Plus, X, Trash2, Check } from "lucide-react";

const PROVIDER_COLOR: Record<string, string> = {
  openai:    "#1B4FD8",
  anthropic: "#E8391D",
  custom:    "#6B5E50",
};

export default function KeysPage() {
  const [showModal, setShowModal] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const toggleReveal = (id: string) => {
    setRevealed((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <>
      <TopNav
        title="API Keys"
        subtitle="Manage your Throttle keys and upstream provider connections"
        action={{ label: "Generate Key", onClick: () => { setShowModal(true); setStep(1); } }}
      />

      <div className="dashboard-content">

        {/* Integration quickstart */}
        <div
          style={{
            border: "1px solid var(--black)",
            borderRadius: 12,
            background: "var(--black)",
            marginBottom: 24,
            overflow: "hidden",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div
            style={{
              padding: "12px 20px",
              borderBottom: "1px solid rgba(245,240,232,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8391D" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5C800" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2EA55A" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginLeft: 8 }}>
              quickstart.js
            </span>
          </div>
          <div style={{ padding: "20px 24px" }}>
            <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.8, color: "#F5F0E8", margin: 0 }}>
              <span style={{ color: "#6B5E50" }}>// 1. Install</span>{"\n"}
              <span style={{ color: "#F5C800" }}>npm install throttle</span>{"\n\n"}
              <span style={{ color: "#6B5E50" }}>// 2. Wrap your client — one line</span>{"\n"}
              <span style={{ color: "#C8BFB0" }}>const </span>
              <span style={{ color: "#F5F0E8" }}>openai </span>
              <span style={{ color: "#C8BFB0" }}>= </span>
              <span style={{ color: "#1B4FD8", filter: "brightness(1.8)" }}>Throttle</span>
              <span style={{ color: "#F5F0E8" }}>(</span>
              <span style={{ color: "#F5C800" }}>new OpenAI</span>
              <span style={{ color: "#F5F0E8" }}>({"{"} apiKey {"}"}), {"{"}</span>{"\n"}
              <span style={{ color: "#F5F0E8" }}>{"  "}window: </span>
              <span style={{ color: "#E8391D" }}>15</span>
              <span style={{ color: "#F5F0E8" }}>,  </span>
              <span style={{ color: "#6B5E50" }}>// ms</span>{"\n"}
              <span style={{ color: "#F5F0E8" }}>{"  "}apiKey: </span>
              <span style={{ color: "#98D8A0" }}>&apos;ab_live_xK8p...&apos;</span>{"\n"}
              <span style={{ color: "#F5F0E8" }}>{"}"});</span>{"\n\n"}
              <span style={{ color: "#6B5E50" }}>// 3. All existing calls work unchanged ✓</span>{"\n"}
              <span style={{ color: "#C8BFB0" }}>const </span>
              <span style={{ color: "#F5F0E8" }}>res = </span>
              <span style={{ color: "#C8BFB0" }}>await </span>
              <span style={{ color: "#F5F0E8" }}>openai.chat.completions.</span>
              <span style={{ color: "#1B4FD8", filter: "brightness(1.8)" }}>create</span>
              <span style={{ color: "#F5F0E8" }}>({"{ ... }"});</span>
            </pre>
          </div>
        </div>

        {/* Keys table */}
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Project</th>
                <th>Provider</th>
                <th>Key</th>
                <th>Created</th>
                <th>Last Used</th>
                <th>Requests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockApiKeys.map((key) => {
                const isRevealed = revealed.has(key.id);
                const isCopied = copied === key.id;
                const provColor = PROVIDER_COLOR[key.provider] || "#6B5E50";
                return (
                  <tr key={key.id}>
                    <td>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13 }}>{key.name}</span>
                    </td>
                    <td>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{key.project}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: provColor }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, textTransform: "capitalize" }}>{key.provider}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span className="mono" style={{ background: "var(--cream-dark)", padding: "2px 8px", borderRadius: "4px", fontSize: 12 }}>
                          {isRevealed ? `${key.prefix}••••••••••••` : `${key.prefix}••••`}
                        </span>
                        <button onClick={() => toggleReveal(key.id)} style={{ cursor: "pointer", color: "var(--gray-400)" }}>
                          {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => handleCopy(key.id, `${key.prefix}••••••••••••`)} style={{ cursor: "pointer", color: isCopied ? "#10B981" : "var(--gray-400)" }}>
                          {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </td>
                    <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)" }}>{key.createdAt}</span></td>
                    <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{key.lastUsed}</span></td>
                    <td>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13 }}>
                        {key.requestsTotal.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <button style={{ cursor: "pointer", color: "var(--red)" }}>
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate key modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>
                Generate API Key
              </div>
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer" }}><X size={20} /></button>
            </div>

            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Key Name
                  </label>
                  <input className="input" placeholder="e.g. Production Key" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Project
                  </label>
                  <select className="input">
                    <option>SearchBot</option>
                    <option>DocClassifier</option>
                    <option>EmailEnricher</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Upstream Provider
                  </label>
                  <select className="input">
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Upstream API Key (encrypted at rest)
                  </label>
                  <input className="input" type="password" placeholder="sk-..." />
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)", marginTop: 6 }}>
                    🔒 AES-256 encrypted. Never stored in plaintext.
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep(2)}>Generate →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div
                  style={{
                    background: "rgba(16, 185, 129, 0.08)",
                    border: "1px solid #10B981",
                    borderRadius: "8px",
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Check size={20} color="#10B981" />
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#10B981" }}>
                    Key generated successfully!
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Your API Key — copy now, shown once
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--black)",
                      padding: "12px 16px",
                      border: "1px solid var(--black)",
                      borderRadius: "8px",
                    }}
                  >
                    <span className="mono" style={{ color: "#F5C800", flex: 1, fontSize: 13 }}>
                      ab_live_xK8p••••••••••••••••••••••
                    </span>
                    <button style={{ color: "var(--gray-300)", cursor: "pointer" }}>
                      <Copy size={16} />
                    </button>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setShowModal(false)}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
