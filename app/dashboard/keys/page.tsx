"use client";

import { useState, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { useDashboard } from "@/lib/DashboardContext";
import { Eye, EyeOff, Copy, Plus, X, Trash2, Check, Terminal, Zap, Key, Code2, ChevronRight } from "lucide-react";

const PROVIDER_COLOR: Record<string, string> = {
  openai:    "#1B4FD8",
  anthropic: "#E8391D",
  custom:    "#6B5E50",
};

function generateFullKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let i = 0; i < 32; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `th_live_${suffix}`;
}

// ─── Code Snippets ────────────────────────────────────────────────────────────
function getSnippets(apiKey: string, provider: string) {
  const keyDisplay = apiKey || "th_live_YOUR_KEY_HERE";
  const providerName = provider === "anthropic" ? "Anthropic" : "OpenAI";
  const model = provider === "anthropic" ? "claude-3-5-sonnet-20241022" : "gpt-4o";
  const baseUrl = provider === "anthropic"
    ? "https://api.throttle.dev/anthropic"
    : "https://api.throttle.dev/openai";

  return {
    node: `// 1. Install
npm install openai  # or anthropic

// 2. Just change the baseURL — zero other changes
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "${keyDisplay}",      // your Throttle key
  baseURL: "${baseUrl}/v1",
});

// 3. All your existing calls work unchanged ✓
const response = await client.chat.completions.create({
  model: "${model}",
  messages: [{ role: "user", content: "Hello!" }],
});

console.log(response.choices[0].message.content);`,

    python: `# 1. Install
pip install openai  # or anthropic

# 2. Just change the base_url — zero other changes
from openai import OpenAI

client = OpenAI(
    api_key="${keyDisplay}",    # your Throttle key
    base_url="${baseUrl}/v1",
)

# 3. All your existing calls work unchanged ✓
response = client.chat.completions.create(
    model="${model}",
    messages=[{"role": "user", "content": "Hello!"}],
)

print(response.choices[0].message.content)`,

    curl: `# Simple curl — just point to Throttle's endpoint
curl ${baseUrl}/v1/chat/completions \\
  -H "Authorization: Bearer ${keyDisplay}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model}",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`,
  };
}

// ─── Syntax-highlighted code block ────────────────────────────────────────────
function CodeBlock({ code, language, onCopy }: { code: string; language: string; onCopy: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy();
  };

  return (
    <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", background: "#0F1117" }}>
      {/* Header bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px", background: "#1A1D27",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8391D" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5C800" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2EA55A" }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: copied ? "rgba(16,185,129,0.15)" : "rgba(245,240,232,0.07)",
            border: `1px solid ${copied ? "rgba(16,185,129,0.3)" : "rgba(245,240,232,0.12)"}`,
            borderRadius: 6, padding: "3px 10px", cursor: "pointer",
            color: copied ? "#10B981" : "rgba(245,240,232,0.5)",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
            transition: "all 0.15s",
          }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Code */}
      <pre style={{
        margin: 0, padding: "20px 20px", overflowX: "auto",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        fontSize: 12.5, lineHeight: 1.7, color: "#C8BFB0",
        whiteSpace: "pre",
      }}>
        {code.split("\n").map((line, i) => {
          // Simple syntax highlighting
          const highlighted = line
            .replace(/(\/\/.*|#.*)/g, '<span style="color:#5A6272">$1</span>')
            .replace(/("(?:[^"\\]|\\.)*")/g, '<span style="color:#98D8A0">$1</span>')
            .replace(/\b(import|from|const|let|var|async|await|return|print|pip|npm|curl)\b/g, '<span style="color:#C792EA">$1</span>')
            .replace(/\b(th_live_[A-Za-z0-9_]+)/g, '<span style="color:#F5C800">$1</span>');
          return (
            <span key={i} style={{ display: "block" }}>
              <span style={{ color: "#3A3F52", userSelect: "none", marginRight: 16, fontSize: 11 }}>{String(i + 1).padStart(2, " ")}</span>
              <span dangerouslySetInnerHTML={{ __html: highlighted }} />
            </span>
          );
        })}
      </pre>
    </div>
  );
}

export default function KeysPage() {
  const { apiKeys, projects, loading: dashLoading, addApiKey: add, removeApiKey: remove } = useDashboard();

  const [showModal, setShowModal] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [sdkTab, setSdkTab] = useState<"node" | "python" | "curl">("node");
  const [selectedKey, setSelectedKey] = useState<string>("");

  // Form states
  const [newName, setNewName] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newProvider, setNewProvider] = useState("openai");
  const [newUpstreamKey, setNewUpstreamKey] = useState("");
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState("");

  const [timedOut, setTimedOut] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-select the first key for SDK preview
  useEffect(() => {
    if (apiKeys.length > 0 && !selectedKey) {
      setSelectedKey(apiKeys[0].prefix);
    }
  }, [apiKeys, selectedKey]);

  const loading = dashLoading && !timedOut;

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

  const handleGenerate = async () => {
    if (!newName.trim()) return;
    const projName = newProject || (projects[0]?.name || "Default Project");
    const fullKey = generateFullKey();
    const prefix = fullKey.substring(0, 15);
    await add({
      name: newName,
      project: projName,
      provider: newProvider,
      prefix: prefix,
      createdAt: new Date().toLocaleDateString(),
      lastUsed: "Never",
      requestsTotal: 0,
    });
    setNewlyGeneratedKey(fullKey);
    setSelectedKey(prefix);
    setStep(2);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this API Key?")) {
      await remove(id);
    }
  };

  const startGenerationFlow = () => {
    setNewName("");
    setNewProject(projects[0]?.name || "");
    setNewProvider("openai");
    setNewUpstreamKey("");
    setNewlyGeneratedKey("");
    setStep(1);
    setShowModal(true);
  };

  if (loading) {
    return (
      <>
        <TopNav title="API Keys" subtitle="Loading API keys..." />
        <div className="dashboard-content">
          <div className="card shimmer" style={{ height: 160, marginBottom: 24 }} />
          <div className="card shimmer" style={{ height: 300 }} />
        </div>
      </>
    );
  }

  // Selected key info for SDK preview
  const activeKey = apiKeys.find(k => k.prefix === selectedKey) || apiKeys[0];
  const snippets = getSnippets(
    activeKey ? `${activeKey.prefix}••••••••••••••••••` : "",
    activeKey?.provider || "openai"
  );

  return (
    <>
      <TopNav
        title="API Keys"
        subtitle="Manage keys and integrate with one line of code"
        action={{ label: "Generate Key", onClick: startGenerationFlow }}
      />

      <div className="dashboard-content">

        {/* ── SDK Integration Guide ───────────────────────────────── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
            textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-500)",
            marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
          }}>
            <Code2 size={14} /> SDK Integration
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[
              { icon: <Key size={18} />, title: "1. Get Your Key", desc: "Generate a Throttle API key below", color: "var(--red)" },
              { icon: <Code2 size={18} />, title: "2. Change Base URL", desc: "Point your SDK to Throttle's endpoint", color: "var(--blue-dark)" },
              { icon: <Zap size={18} />, title: "3. Save Instantly", desc: "All requests are batched automatically", color: "#10B981" },
            ].map((s) => (
              <div key={s.title} style={{
                background: "var(--white)", border: "1px solid var(--gray-200)",
                borderRadius: 10, padding: "16px 20px",
                display: "flex", alignItems: "flex-start", gap: 12,
                boxShadow: "var(--shadow-sm)",
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                  background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: s.color,
                }}>{s.icon}</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700 }}>{s.title}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)", marginTop: 3 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Key selector + language tabs */}
          <div style={{ background: "var(--white)", border: "1px solid var(--gray-200)", borderRadius: 12, overflow: "hidden", boxShadow: "var(--shadow-sm)" }}>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", borderBottom: "1px solid var(--gray-200)",
              background: "var(--cream-dark)", flexWrap: "wrap", gap: 10,
            }}>
              {/* Key selector */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-500)" }}>
                  Active Key:
                </span>
                {apiKeys.length === 0 ? (
                  <button
                    onClick={startGenerationFlow}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      background: "var(--red)", color: "#fff", border: "none",
                      borderRadius: 6, padding: "4px 12px", cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
                    }}
                  >
                    <Plus size={11} /> Generate a key first
                  </button>
                ) : (
                  <select
                    value={selectedKey}
                    onChange={(e) => setSelectedKey(e.target.value)}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                      background: "var(--white)", border: "1px solid var(--gray-200)",
                      borderRadius: 6, padding: "3px 8px", color: "var(--black)", cursor: "pointer",
                    }}
                  >
                    {apiKeys.map(k => (
                      <option key={k.id} value={k.prefix}>{k.name} — {k.prefix}•••</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Language tabs */}
              <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.05)", padding: 3, borderRadius: 8 }}>
                {(["node", "python", "curl"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSdkTab(lang)}
                    style={{
                      padding: "5px 14px",
                      fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      borderRadius: 6, border: "none", cursor: "pointer",
                      background: sdkTab === lang ? "var(--white)" : "transparent",
                      color: sdkTab === lang ? "var(--black)" : "var(--gray-400)",
                      boxShadow: sdkTab === lang ? "var(--shadow-sm)" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {lang === "node" ? "Node.js" : lang === "python" ? "Python" : "cURL"}
                  </button>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div style={{ padding: 16 }}>
              <CodeBlock
                code={snippets[sdkTab]}
                language={sdkTab === "node" ? "javascript" : sdkTab === "python" ? "python" : "bash"}
                onCopy={() => {}}
              />
            </div>

            {/* Endpoint info */}
            <div style={{
              padding: "12px 16px", borderTop: "1px solid var(--gray-200)",
              display: "flex", flexWrap: "wrap", gap: 16,
              background: "var(--cream-dark)",
            }}>
              {[
                { label: "OpenAI endpoint", value: "https://api.throttle.dev/openai/v1" },
                { label: "Anthropic endpoint", value: "https://api.throttle.dev/anthropic/v1" },
                { label: "Batch window", value: "10–50ms (configurable)" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-400)" }}>{item.label}:</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "var(--blue-dark)", background: "rgba(27,79,216,0.08)", padding: "1px 7px", borderRadius: 4 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Keys Table ──────────────────────────────────────────── */}
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--gray-500)",
          marginBottom: 16, display: "flex", alignItems: "center", gap: 8,
        }}>
          <Key size={14} /> Your Keys ({apiKeys.length})
        </div>

        <div className="table-wrapper">
          {apiKeys.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div style={{ marginBottom: 12, color: "var(--gray-300)" }}><Key size={32} /></div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, color: "var(--gray-500)", marginBottom: 8 }}>No API Keys yet</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-400)", marginBottom: 20 }}>Generate your first key to start integrating Throttle.</div>
              <button className="btn btn-primary" onClick={startGenerationFlow} style={{ margin: "0 auto" }}>
                <Plus size={14} /> Generate Key
              </button>
            </div>
          ) : (
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
                {apiKeys.map((key) => {
                  const isRevealed = revealed.has(key.id);
                  const isCopied = copied === key.id;
                  const provColor = PROVIDER_COLOR[key.provider] || "#6B5E50";
                  const isActive = key.prefix === selectedKey;
                  return (
                    <tr
                      key={key.id}
                      onClick={() => setSelectedKey(key.prefix)}
                      style={{ cursor: "pointer", background: isActive ? "rgba(27,79,216,0.04)" : undefined }}
                    >
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--blue-dark)", flexShrink: 0 }} />}
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 13 }}>{key.name}</span>
                        </div>
                      </td>
                      <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{key.project}</span></td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: provColor }} />
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, textTransform: "capitalize" }}>{key.provider}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={e => e.stopPropagation()}>
                          <span className="mono" style={{ background: "var(--cream-dark)", padding: "2px 8px", borderRadius: "4px", fontSize: 12 }}>
                            {isRevealed ? `${key.prefix}••••••••••••` : `${key.prefix}••••`}
                          </span>
                          <button onClick={() => toggleReveal(key.id)} style={{ cursor: "pointer", color: "var(--gray-400)", border: "none", background: "none" }}>
                            {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button onClick={() => handleCopy(key.id, `${key.prefix}••••••••••••`)} style={{ cursor: "pointer", color: isCopied ? "#10B981" : "var(--gray-400)", border: "none", background: "none" }}>
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </div>
                      </td>
                      <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)" }}>{key.createdAt}</span></td>
                      <td><span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>{key.lastUsed}</span></td>
                      <td><span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13 }}>{(key.requestsTotal || 0).toLocaleString()}</span></td>
                      <td onClick={e => e.stopPropagation()}>
                        <button onClick={() => handleDelete(key.id)} style={{ cursor: "pointer", color: "var(--red)", border: "none", background: "none" }}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Generate key modal ─────────────────────────────────────── */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, textTransform: "uppercase" }}>
                {step === 1 ? "Generate API Key" : "Key Generated!"}
              </div>
              <button onClick={() => setShowModal(false)} style={{ cursor: "pointer", border: "none", background: "none" }}><X size={20} /></button>
            </div>

            {step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Key Name
                  </label>
                  <input className="input" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Production Key" />
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Project
                  </label>
                  {projects.length === 0 ? (
                    <div style={{ fontSize: 13, color: "var(--red)", fontWeight: 600, padding: "10px 14px", background: "rgba(232,57,29,0.06)", borderRadius: 8, border: "1px solid rgba(232,57,29,0.2)" }}>
                      ⚠️ Create a project first before generating a key.
                    </div>
                  ) : (
                    <select className="input" value={newProject} onChange={(e) => setNewProject(e.target.value)}>
                      {projects.map((p) => (<option key={p.id} value={p.name}>{p.name}</option>))}
                    </select>
                  )}
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Upstream Provider
                  </label>
                  <select className="input" value={newProvider} onChange={(e) => setNewProvider(e.target.value)}>
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
                    Upstream API Key <span style={{ color: "var(--gray-400)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(encrypted at rest)</span>
                  </label>
                  <input className="input" type="password" value={newUpstreamKey} onChange={(e) => setNewUpstreamKey(e.target.value)} placeholder="sk-... or sk-ant-..." />
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)", marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
                    🔒 AES-256 encrypted. Never stored in plaintext.
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                  <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                  <button
                    className="btn btn-primary" style={{ flex: 1 }}
                    onClick={handleGenerate}
                    disabled={projects.length === 0 || !newName.trim()}
                  >
                    Generate Key <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid #10B981", borderRadius: 8, padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
                  <Check size={20} color="#10B981" />
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#10B981" }}>
                    Key generated successfully!
                  </div>
                </div>

                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, color: "var(--red)" }}>
                    ⚠️ Copy now — shown only once
                  </div>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: "var(--black)", padding: "14px 16px",
                    borderRadius: 8,
                  }}>
                    <span className="mono" style={{ color: "#F5C800", flex: 1, fontSize: 13, wordBreak: "break-all" }}>
                      {newlyGeneratedKey}
                    </span>
                    <button
                      onClick={() => handleCopy("newly-generated", newlyGeneratedKey)}
                      style={{ color: copied === "newly-generated" ? "#10B981" : "var(--gray-300)", cursor: "pointer", border: "none", background: "none", flexShrink: 0 }}
                    >
                      {copied === "newly-generated" ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                {/* Inline integration hint */}
                <div style={{ background: "var(--cream-dark)", borderRadius: 8, padding: "14px 16px", border: "1px solid var(--gray-200)" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gray-500)", marginBottom: 10 }}>
                    Quick integration
                  </div>
                  <pre style={{ margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, lineHeight: 1.6, color: "var(--gray-600)", whiteSpace: "pre-wrap" }}>
{`// Node.js — just change the baseURL
const client = new OpenAI({
  apiKey: "${newlyGeneratedKey.substring(0, 20)}...",
  baseURL: "https://api.throttle.dev/openai/v1",
});`}
                  </pre>
                </div>

                <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setShowModal(false)}>
                  Done — View Integration Guide
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
