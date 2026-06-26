"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BauhausShape, BauhausComposition, BauhausAccentRow } from "@/components/ui/BauhausShape";
import { SavingsCounter } from "@/components/ui/SavingsCounter";
import { Zap, Play, Check, ArrowRight, Activity, ArrowUpRight } from "lucide-react";


function HomepageMiniCalculator() {
  const [requests, setRequests] = useState(2500000); // 2.5M
  const [provider, setProvider] = useState<"openai" | "anthropic">("openai");

  // Cost estimates:
  // OpenAI: ~ $3.00 per 1M tokens average (mix of input/output GPT-4o)
  // Anthropic: ~ $5.00 per 1M tokens average
  const ratePerMillion = provider === "openai" ? 3.0 : 5.0;
  const avgTokensPerReq = 1200; // Average tokens per request

  // Raw cost per request: (avgTokensPerReq / 1,000,000) * ratePerMillion
  const rawCostPerReq = (avgTokensPerReq / 1000000) * ratePerMillion;
  const rawMonthlyCost = requests * rawCostPerReq;
  
  // Throttle batch efficiency is around 80% cost reduction
  const savingsPct = 0.80;
  const totalSavings = rawMonthlyCost * savingsPct;
  const throttleCost = rawMonthlyCost - totalSavings;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Provider Selector */}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setProvider("openai")}
          style={{
            flex: 1,
            padding: "8px 12px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            border: provider === "openai" ? "2px solid var(--black)" : "1px solid var(--gray-200)",
            background: provider === "openai" ? "var(--black)" : "#fff",
            color: provider === "openai" ? "#fff" : "var(--black)",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          OpenAI (GPT-4o)
        </button>
        <button
          onClick={() => setProvider("anthropic")}
          style={{
            flex: 1,
            padding: "8px 12px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            border: provider === "anthropic" ? "2px solid var(--black)" : "1px solid var(--gray-200)",
            background: provider === "anthropic" ? "var(--black)" : "#fff",
            color: provider === "anthropic" ? "#fff" : "var(--black)",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          Anthropic (Claude)
        </button>
      </div>

      {/* Requests Slider */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--gray-500)", textTransform: "uppercase" }}>
            Monthly Requests
          </span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, color: "var(--black)" }}>
            {(requests / 1000000).toFixed(1)}M requests
          </span>
        </div>
        <input
          type="range"
          min={100000}
          max={10000000}
          step={100000}
          value={requests}
          onChange={(e) => setRequests(Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: "var(--red)",
            cursor: "pointer",
          }}
        />
      </div>

      <div style={{ borderTop: "1px solid var(--gray-100)", margin: "8px 0" }} />

      {/* Output Comparison */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ background: "var(--cream-dark)", padding: 12, borderRadius: 8 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase" }}>
            Raw API Spend
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--black)", textDecoration: "line-through", opacity: 0.6 }}>
            ${rawMonthlyCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div style={{ background: "rgba(46, 165, 90, 0.08)", padding: 12, borderRadius: 8, border: "1px solid rgba(46, 165, 90, 0.15)" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: "#2EA55A", textTransform: "uppercase" }}>
            With Throttle
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: "#2EA55A" }}>
            ${throttleCost.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "rgba(245, 158, 11, 0.08)",
          border: "1px solid rgba(245, 158, 11, 0.2)",
          borderRadius: 8,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: "var(--yellow-dark)", textTransform: "uppercase" }}>
            Monthly Savings
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
            At 80% batch efficiency
          </div>
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: "var(--yellow-dark)", letterSpacing: "-0.02em" }}>
          ${totalSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [savings, setSavings] = useState(148900);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time savings counter accumulating
      setSavings((prev) => prev + Math.floor(Math.random() * 12 + 4));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", color: "#1A1A1A", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "2px solid #1A1A1A",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          className="landing-header-container"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            height: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 36, height: 36 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 22, height: 22, borderRadius: "50%", background: "#E8391D" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 22, height: 22, background: "#1B4FD8" }} />
              <div style={{ position: "absolute", bottom: 6, left: 6, width: 14, height: 14, borderRadius: "50%", background: "#F5C800" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.02em", color: "#1A1A1A", textTransform: "uppercase" }}>
                Throttle
              </div>
            </div>
          </Link>

          {/* Links */}
          <nav className="landing-nav">
            <a href="#how-it-works" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
              How it works
            </a>
            <a href="#pricing" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
              Pricing
            </a>
            <Link href="/calculator" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
              Calculator
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="landing-auth-buttons">
            <Link href="/sign-in" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", padding: "8px 16px" }}>
              Sign In
            </Link>
            <Link href="/sign-up" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section style={{ borderBottom: "2px solid #1A1A1A", background: "#fff", position: "relative", overflow: "hidden" }}>
        <div className="landing-hero-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", alignItems: "center" }}>
          
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(27,79,216,0.08)", color: "#1B4FD8", border: "1.5px solid #1B4FD8", padding: "4px 10px", marginBottom: 20 }}>
              <Zap size={12} fill="#1B4FD8" />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                1-LINE PROXY INTEGRATION
              </span>
            </div>
            
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(48px, 6vw, 76px)", fontWeight: 800, letterSpacing: "-0.03em", textTransform: "uppercase", lineHeight: 0.95, marginBottom: 24 }}>
              One proxy.<br />
              <span style={{ color: "#E8391D" }}>80% less</span> spend.
            </h1>
            
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: "var(--gray-500)", lineHeight: 1.6, maxWidth: 520, marginBottom: 36 }}>
              Throttle intercepts parallel or near-simultaneous calls to OpenAI, Anthropic, Stripe, and other paid APIs. We batch them into single upstream requests and fan the responses back.
            </p>

            {/* Quickstart code block preview */}
            <div style={{ marginBottom: 36, border: "2px solid #1A1A1A", maxWidth: 540 }}>
              <div style={{ background: "#1A1A1A", padding: "8px 16px", display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8391D" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5C800" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2EA55A" }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, color: "#6B5E50", marginLeft: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  SDK Integration
                </span>
              </div>
              <div className="code-block" style={{ margin: 0, border: "none" }}>
                <span className="comment">// Instead of: const openai = new OpenAI()</span><br />
                <span className="keyword">const</span> openai = <span className="keyword">new</span> <span className="fn">Throttle</span>(&apos;openai&apos;, &#123; <span className="keyword">windowMs</span>: 10 &#125;);<br />
                <span className="keyword">const</span> res = <span className="keyword">await</span> openai.chat.completions.<span className="fn">create</span>(&#123; ... &#125;);
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href="/sign-up" className="btn btn-red btn-lg">
                Get Started Free <ArrowRight size={16} />
              </Link>
              <a href="#how-it-works" className="btn btn-outline btn-lg">
                See How It Works
              </a>
            </div>
          </div>

          {/* Large Bauhaus Graphic Composition */}
          <div className="landing-graphic-container">
            <div style={{ position: "absolute", top: "-10%", left: 0, transform: "rotate(-15deg)" }}>
              <BauhausShape variant="circle" color="#F5C800" style={{ width: "clamp(80px, 20vw, 140px)", height: "clamp(80px, 20vw, 140px)" }} />
            </div>
            <div style={{ position: "absolute", bottom: "-5%", right: 0, transform: "rotate(25deg)" }}>
              <BauhausShape variant="square" color="#1B4FD8" style={{ width: "clamp(60px, 15vw, 100px)", height: "clamp(60px, 15vw, 100px)" }} />
            </div>
            <BauhausComposition size={360} />
          </div>

        </div>
      </section>

      {/* Real-time Ticker banner */}
      <section style={{ borderBottom: "2px solid #1A1A1A", background: "#1A1A1A", color: "#F5F0E8", padding: "40px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 32 }}>
          <div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#F5C800" }}>
              ⚡ Cumulative Global Savings
            </span>
            <div style={{ marginTop: 8 }}>
              <SavingsCounter value={savings} prefix="$" size="xl" color="#F5F0E8" />
            </div>
          </div>

          <div className="landing-stats-grid">
            {[
              { label: "Requests Batched", value: "148.9M" },
              { label: "Average Saving",   value: "78%" },
              { label: "Uptime SLA",       value: "99.99%" },
            ].map((stat) => (
              <div key={stat.label} style={{ borderLeft: "2px solid rgba(245,240,232,0.15)", paddingLeft: 20 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 800, color: "#E8391D" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ borderBottom: "2px solid #1A1A1A", padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1B4FD8" }}>
              Architected for Performance & Cost
            </span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", marginTop: 8 }}>
              How Throttle Works
            </h2>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
              <BauhausAccentRow />
            </div>
          </div>

          <div className="landing-cards-grid">
            {[
              {
                step: "01",
                title: "Intercept Calls",
                desc: "Our drop-in SDK routes outgoing LLM or general API calls through the local/edge proxy. No changes to code variables necessary.",
                color: "#E8391D",
              },
              {
                step: "02",
                title: "Intelligent Batching",
                desc: "Throttle groups requests received in a custom window (e.g. 10ms) by project, user context, or model parameters.",
                color: "#1B4FD8",
              },
              {
                step: "03",
                title: "Upstream Execution",
                desc: "We make a single upstream call to the provider, split the response payload, and distribute responses back to each client.",
                color: "#F5C800",
              },
            ].map((card) => (
              <div
                key={card.step}
                style={{
                  border: "2px solid #1A1A1A",
                  background: "#fff",
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 280,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 48,
                      fontWeight: 800,
                      color: card.color,
                      lineHeight: 1,
                      marginBottom: 16,
                    }}
                  >
                    {card.step}
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, textTransform: "uppercase", marginBottom: 12 }}>
                    {card.title}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--gray-500)" }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ borderBottom: "2px solid #1A1A1A", padding: "80px 0", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8391D" }}>
              Pay as you save
            </span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", marginTop: 8 }}>
              Transparent Pricing Plans
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--gray-500)", marginTop: 8 }}>
              Slash up to 80% of API bills. Select the tier that matches your system scale.
            </p>
          </div>

          <div className="landing-pricing-grid">
            {[
              {
                name: "Free Developer",
                price: "₹0",
                period: "forever",
                desc: "Perfect for testing, builders and side apps.",
                features: ["Up to 50k requests / mo", "2 active projects", "10ms fixed window", "Standard overview dashboard"],
                color: "blue",
                btnText: "Start Free",
                link: "/sign-up",
              },
              {
                name: "Pro Optimizer",
                price: "₹399",
                period: "month",
                desc: "Designed for scaling startups & apps.",
                features: ["Up to 1M requests / mo", "Unlimited projects & keys", "Configurable batch window", "Slack & Webhook alerts", "Premium analytics"],
                color: "red",
                btnText: "Get Pro Plan",
                link: "/sign-up?plan=pro",
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "custom",
                desc: "High volume dedicated options & SLAs.",
                features: ["Unlimited requests / custom volume pricing", "Dedicated server clusters", "Enterprise SSO / SAML", "Guaranteed 99.99% uptime SLA"],
                color: "yellow",
                btnText: "Contact Us",
                link: "mailto:sales@throttle.dev",
              },
            ].map((tier) => {
              let accentColor = "#1B4FD8";
              if (tier.color === "red") accentColor = "#E8391D";
              if (tier.color === "yellow") accentColor = "#F5C800";

              return (
                <div
                  key={tier.name}
                  style={{
                    border: "2px solid #1A1A1A",
                    background: "#F5F0E8",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 32,
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: accentColor }} />
                  
                  <div>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
                      {tier.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800 }}>{tier.price}</span>
                      {tier.period !== "forever" && tier.period !== "custom" && (
                        <span style={{ fontSize: 13, color: "var(--gray-500)" }}>/ {tier.period}</span>
                      )}
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)", marginBottom: 24 }}>
                      {tier.desc}
                    </p>
                    
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                      {tier.features.map((f, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                          <Check size={14} color={accentColor} style={{ flexShrink: 0 }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={tier.link}
                    className={`btn ${tier.color === "red" ? "btn-red" : tier.color === "blue" ? "btn-blue" : "btn-outline"}`}
                    style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
                  >
                    {tier.btnText}
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Savings Calculator Teaser */}
      <section style={{ borderBottom: "2px solid #1A1A1A", padding: "80px 0" }}>
        <div className="landing-calculator-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          
          <div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)" }}>
              Cost Simulator
            </span>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", marginTop: 8, marginBottom: 16 }}>
              Estimate Your API Savings
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "var(--gray-500)", lineHeight: 1.6, marginBottom: 24 }}>
              Slide the parameters to match your application's current volume and see how much Throttle's request batching can slash from your API bills.
            </p>
            <Link href="/calculator" className="btn btn-outline">
              Open Full Calculator <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="card" style={{ padding: 24, background: "#fff", display: "flex", flexDirection: "column", gap: 20 }}>
            <HomepageMiniCalculator />
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#1A1A1A", color: "#F5F0E8", padding: "64px 0 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          
          <div className="landing-footer-grid">
            <div style={{ gridColumn: "span 2" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#F5C800", marginBottom: 16 }}>
                Throttle
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.5)", maxWidth: 360, lineHeight: 1.6 }}>
                Throttle is a request batching proxy designed to optimize outgoing API queries, reducing costs by up to 80%. Connect with a 1-line client initialization.
              </p>
            </div>
            
            <div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#E8391D", marginBottom: 16 }}>
                Navigation
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "rgba(245,240,232,0.6)" }}>
                <li><Link href="/">Home</Link></li>
                <li><a href="#how-it-works">How it works</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><Link href="/calculator">Calculator</Link></li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#1B4FD8", marginBottom: 16 }}>
                Resources
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: "rgba(245,240,232,0.6)" }}>
                <li><a href="#">Developer Documentation</a></li>
                <li><a href="#">API Status</a></li>
                <li><a href="#">GitHub Repository</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: "1.5px solid rgba(245,240,232,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, fontSize: 12, color: "rgba(245,240,232,0.4)" }}>
            <span>© 2026 design and engineered by Kaushik Dalvi</span>
            <div style={{ display: "flex", gap: 20 }}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Use</Link>
              <Link href="/security">Security</Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
