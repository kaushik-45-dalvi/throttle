"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Calculator, Check, Info, Settings, HelpCircle } from "lucide-react";
import { BauhausShape } from "@/components/ui/BauhausShape";

// Model rates per 1 million tokens (Input / Output) in USD
const PROVIDER_MODELS = {
  openai: [
    { id: "gpt-4o", name: "GPT-4o", inputRate: 2.50, outputRate: 10.00 },
    { id: "gpt-4o-mini", name: "GPT-4o-mini", inputRate: 0.150, outputRate: 0.600 },
  ],
  anthropic: [
    { id: "claude-3-5-sonnet", name: "Claude 3.5 Sonnet", inputRate: 3.00, outputRate: 15.00 },
    { id: "claude-3-5-haiku", name: "Claude 3.5 Haiku", inputRate: 0.80, outputRate: 4.00 },
  ],
  gemini: [
    { id: "gemini-1-5-pro", name: "Gemini 1.5 Pro", inputRate: 1.25, outputRate: 5.00 },
    { id: "gemini-1-5-flash", name: "Gemini 1.5 Flash", inputRate: 0.075, outputRate: 0.300 },
  ],
};

export default function CalculatorPage() {
  const [provider, setProvider] = useState<"openai" | "anthropic" | "gemini" | "custom">("openai");
  const [selectedModelId, setSelectedModelId] = useState("gpt-4o");
  
  // Custom rate overrides
  const [customInputRate, setCustomInputRate] = useState(2.00);
  const [customOutputRate, setCustomOutputRate] = useState(8.00);

  // Sliders
  const [monthlyRequests, setMonthlyRequests] = useState(2000000); // Default 2M
  const [avgInputTokens, setAvgInputTokens] = useState(1500);      // Default 1500 tokens
  const [avgOutputTokens, setAvgOutputTokens] = useState(600);      // Default 600 tokens
  const [efficiency, setEfficiency] = useState(80);                // Default 80% batch savings

  // Update selected model when provider changes
  const handleProviderChange = (prov: "openai" | "anthropic" | "gemini" | "custom") => {
    setProvider(prov);
    if (prov !== "custom") {
      setSelectedModelId(PROVIDER_MODELS[prov][0].id);
    }
  };

  // Get current rates
  let inputRate = customInputRate;
  let outputRate = customOutputRate;
  let modelName = "Custom Model";

  if (provider !== "custom") {
    const model = PROVIDER_MODELS[provider].find(m => m.id === selectedModelId);
    if (model) {
      inputRate = model.inputRate;
      outputRate = model.outputRate;
      modelName = model.name;
    }
  }

  // Calculations
  const millionRequests = monthlyRequests / 1000000;
  const inputCost = millionRequests * avgInputTokens * inputRate;
  const outputCost = millionRequests * avgOutputTokens * outputRate;
  const rawMonthlyCost = inputCost + outputCost;

  const savingsPct = efficiency / 100;
  const monthlySaved = rawMonthlyCost * savingsPct;
  const throttleCost = rawMonthlyCost - monthlySaved;
  const annualSaved = monthlySaved * 12;

  // Formatting helpers
  const formatCost = (val: number) => {
    if (val === 0) return "$0";
    if (val < 1) return `$${val.toFixed(3)}`;
    return `$${val.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--gray-200)",
          background: "var(--white)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 72,
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 36, height: 36 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 22, height: 22, borderRadius: "50%", background: "var(--red)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: "var(--blue)" }} />
              <div style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderRadius: "50%", background: "var(--yellow)" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "var(--black)", textTransform: "uppercase" }}>
                Throttle
              </div>
            </div>
          </Link>

          {/* Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
              Home
            </Link>
            <Link href="/calculator" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--red)" }}>
              Calculator
            </Link>
            <Link href="/dashboard" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
              Dashboard
            </Link>
          </nav>

          <Link href="/sign-in" className="btn btn-primary btn-sm">
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, maxWidth: 1200, width: "100%", margin: "48px auto", padding: "0 24px" }}>
        
        {/* Back navigation */}
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--gray-500)",
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>

        {/* Hero Section */}
        <div
          style={{
            borderRadius: 16,
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
            padding: "40px",
            position: "relative",
            overflow: "hidden",
            marginBottom: 32,
            color: "var(--white)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ position: "absolute", bottom: -60, right: -60, opacity: 0.1 }}>
            <BauhausShape variant="circle" size={200} color="var(--yellow)" />
          </div>
          <div style={{ position: "absolute", top: -20, right: 120, opacity: 0.08 }}>
            <BauhausShape variant="square" size={120} color="var(--red)" />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--yellow)",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Calculator size={14} /> Dynamic Cost Simulator
            </div>
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 36,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              Estimate Your API Savings
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", maxWidth: 650 }}>
              Adjust monthly volumes, average payload token sizes, upstream models, and target batch windows to evaluate Throttle's cost efficiency. Most developers save between 65% and 85%.
            </p>
          </div>
        </div>

        {/* Interactive Layout */}
        <div className="calculator-grid">
          
          {/* Left Column: Sliders & Settings */}
          <div className="card" style={{ padding: 32, background: "#fff", display: "flex", flexDirection: "column", gap: 28 }}>
            
            {/* 1. API Provider & Model Selection */}
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)", marginBottom: 12 }}>
                1. Select Provider & Model
              </h3>
              
              {/* Tabs */}
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {(["openai", "anthropic", "gemini", "custom"] as const).map((prov) => (
                  <button
                    key={prov}
                    onClick={() => handleProviderChange(prov)}
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      border: provider === prov ? "1.5px solid var(--black)" : "1px solid var(--gray-200)",
                      background: provider === prov ? "var(--black)" : "#fff",
                      color: provider === prov ? "#fff" : "var(--black)",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {prov === "openai" ? "OpenAI" : prov === "anthropic" ? "Anthropic" : prov === "gemini" ? "Gemini" : "Custom"}
                  </button>
                ))}
              </div>

              {/* Model Dropdown or Custom Inputs */}
              {provider !== "custom" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "var(--gray-500)" }}>
                    Upstream Model
                  </label>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid var(--gray-200)",
                      borderRadius: 8,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      color: "var(--black)",
                      fontSize: 14,
                      width: "100%",
                      outline: "none",
                      background: "var(--cream-dark)",
                      cursor: "pointer",
                    }}
                  >
                    {PROVIDER_MODELS[provider].map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} (In: ${m.inputRate.toFixed(2)}/M, Out: ${m.outputRate.toFixed(2)}/M)
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="bottom-cta-grid">
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "var(--gray-500)" }}>
                      Input Rate ($/1M tokens)
                    </label>
                    <input
                      type="number"
                      value={customInputRate}
                      onChange={(e) => setCustomInputRate(Math.max(0, Number(e.target.value)))}
                      step={0.01}
                      style={{
                        padding: "10px 12px",
                        border: "1px solid var(--gray-200)",
                        borderRadius: 8,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        outline: "none",
                        fontSize: 14,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 11, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, textTransform: "uppercase", color: "var(--gray-500)" }}>
                      Output Rate ($/1M tokens)
                    </label>
                    <input
                      type="number"
                      value={customOutputRate}
                      onChange={(e) => setCustomOutputRate(Math.max(0, Number(e.target.value)))}
                      step={0.01}
                      style={{
                        padding: "10px 12px",
                        border: "1px solid var(--gray-200)",
                        borderRadius: 8,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 600,
                        outline: "none",
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={{ borderTop: "1px solid var(--gray-100)" }} />

            {/* 2. Monthly Requests slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
                  2. Monthly Request Volume
                </h3>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: "var(--blue)" }}>
                  {monthlyRequests.toLocaleString()} requests
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={20000000}
                step={50000}
                value={monthlyRequests}
                onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--blue)", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--gray-400)", fontFamily: "'Space Grotesk', sans-serif", marginTop: 4 }}>
                <span>50K</span>
                <span>5M</span>
                <span>10M</span>
                <span>15M</span>
                <span>20M</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--gray-100)" }} />

            {/* 3. Avg tokens sliders */}
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)", marginBottom: 16 }}>
                3. Average Payload Token Size
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Input Tokens */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "var(--gray-600)", display: "flex", alignItems: "center", gap: 4 }}>
                      Input Tokens (Prompts, System Instructions)
                    </span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>
                      {avgInputTokens} tokens
                    </span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={15000}
                    step={100}
                    value={avgInputTokens}
                    onChange={(e) => setAvgInputTokens(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--red)", cursor: "pointer" }}
                  />
                </div>

                {/* Output Tokens */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "var(--gray-600)" }}>
                      Output Tokens (LLM Generation)
                    </span>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>
                      {avgOutputTokens} tokens
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={8000}
                    step={50}
                    value={avgOutputTokens}
                    onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--red)", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--gray-100)" }} />

            {/* 4. Batch Efficiency slider */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, alignItems: "baseline" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
                  4. Batch Efficiency
                </h3>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, color: "var(--yellow-dark)" }}>
                  {efficiency}% reduction
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={95}
                step={5}
                value={efficiency}
                onChange={(e) => setEfficiency(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--yellow)", cursor: "pointer" }}
              />
              <p style={{ fontSize: 11, color: "var(--gray-400)", fontFamily: "'Inter', sans-serif", marginTop: 6, lineHeight: 1.4 }}>
                * Efficiency depends on model redundancy and concurrency window (e.g. 10ms window vs 50ms window). Standard API optimization maps to 70%-85% cost saving.
              </p>
            </div>

          </div>

          {/* Right Column: Dynamic Savings Dashboard */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 100 }}>
            
            {/* Total Savings Hero Card */}
            <div
              className="card"
              style={{
                background: "linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.02) 100%)",
                border: "2.5px solid var(--yellow)",
                borderRadius: 16,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--yellow-dark)" }}>
                  Estimated Monthly Savings
                </span>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 44, fontWeight: 800, color: "var(--yellow-dark)", letterSpacing: "-0.03em", marginTop: 4, lineHeight: 1 }}>
                  {formatCost(monthlySaved)}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)", marginTop: 6 }}>
                  Or <span style={{ fontWeight: 600, color: "var(--black)" }}>{formatCost(annualSaved)} / year</span> back in your pocket.
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(245, 158, 11, 0.2)", margin: "4px 0" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--gray-500)" }}>Upstream request drop:</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#2EA55A" }}>-{efficiency}% calls</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <span style={{ color: "var(--gray-500)" }}>Estimated latency impact:</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "var(--black)" }}>+12ms average</span>
                </div>
              </div>
            </div>

            {/* Side-by-side Cost Cards */}
            <div className="card" style={{ padding: 24, background: "#fff", display: "flex", flexDirection: "column", gap: 16 }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--gray-500)" }}>
                Cost Comparison
              </h4>

              {/* Raw Cost */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "var(--black)", fontWeight: 600 }}>Raw API Provider spend:</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{formatCost(rawMonthlyCost)}</span>
                </div>
                <div style={{ background: "var(--cream-dark)", height: 8, borderRadius: 4, width: "100%", overflow: "hidden" }}>
                  <div style={{ background: "var(--red)", height: "100%", width: "100%" }} />
                </div>
              </div>

              {/* Throttle Cost */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "#2EA55A", fontWeight: 700 }}>Throttle Batched spend:</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#2EA55A" }}>{formatCost(throttleCost)}</span>
                </div>
                <div style={{ background: "var(--cream-dark)", height: 8, borderRadius: 4, width: "100%", overflow: "hidden" }}>
                  <div style={{ background: "#2EA55A", height: "100%", width: `${100 - efficiency}%` }} />
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--gray-100)", margin: "4px 0" }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "var(--gray-500)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Input Token Spend:</span>
                  <span>{formatCost(inputCost)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Output Token Spend:</span>
                  <span>{formatCost(outputCost)}</span>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div
              className="card"
              style={{
                padding: 24,
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.01) 100%)",
                border: "1px solid rgba(37, 99, 235, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 800, textTransform: "uppercase", color: "var(--black)" }}>
                Ready to cut your costs?
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)", lineHeight: 1.5 }}>
                Integrating Throttle takes exactly one line of code change in your SDK initialization. Start for free.
              </p>
              <Link href="/sign-up" className="btn btn-blue btn-sm" style={{ textAlign: "center", justifyContent: "center" }}>
                Get Started Free <ArrowUpRight size={14} />
              </Link>
            </div>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--gray-200)",
          background: "var(--black)",
          color: "rgba(245,240,232,0.6)",
          padding: "48px 0 24px",
          marginTop: "64px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", textTransform: "uppercase", color: "var(--yellow)", marginBottom: 12 }}>
                Throttle
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "rgba(245,240,232,0.5)", maxWidth: 280 }}>
                Drop-in request batching and cost optimization proxy dashboard. Save up to 80% on paid API calls.
              </p>
            </div>
            <div style={{ display: "flex", gap: 64 }}>
              <div>
                <h5 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--red)", marginBottom: 12 }}>
                  Product
                </h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "rgba(245,240,232,0.6)" }}>
                  <li><Link href="/">Pricing</Link></li>
                  <li><Link href="/calculator">Calculator</Link></li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                </ul>
              </div>
              <div>
                <h5 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 12 }}>
                  Docs
                </h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, fontSize: 12, color: "rgba(245,240,232,0.6)" }}>
                  <li><a href="#">SDK Reference</a></li>
                  <li><a href="#">Supported APIs</a></li>
                  <li><a href="#">Cost Model</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1.5px solid rgba(245,240,232,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "rgba(245,240,232,0.4)" }}>
            <span>© 2026 design and engineered by Kaushik Dalvi</span>
            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/privacy">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms">Terms of Use</Link>
              <span>·</span>
              <Link href="/security">Security</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
