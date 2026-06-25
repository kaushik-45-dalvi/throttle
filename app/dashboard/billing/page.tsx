"use client";

import { useState } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { CreditCard, Check, ShieldAlert, Award, FileText, Download } from "lucide-react";

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("pro"); // 'free' | 'pro' | 'enterprise'

  const plans = [
    {
      id: "free",
      name: "Free Developer",
      price: "₹0",
      period: "forever",
      desc: "For hobbyists and side projects",
      features: [
        "Up to 50k requests / mo",
        "2 active projects",
        "10ms fixed batch window",
        "Basic overview dashboard",
      ],
      color: "blue",
    },
    {
      id: "pro",
      name: "Pro Optimizer",
      price: "₹399",
      period: "month",
      desc: "For production apps scaling fast",
      features: [
        "Up to 1M requests / mo",
        "Unlimited projects & keys",
        "Configurable batch window",
        "Budget alerts (Slack/Webhooks)",
        "Premium support",
      ],
      color: "red",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      period: "custom",
      desc: "For high-volume dedicated setups",
      features: [
        "Unlimited requests / volume pricing",
        "Dedicated cluster hosting",
        "Custom SLAs & 24/7 support",
        "SSO / SAML authentication",
      ],
      color: "yellow",
    },
  ];

  const invoices = [
    { id: "INV-2026-001", date: "June 1, 2026", amount: "₹399.00", status: "Paid" },
    { id: "INV-2026-002", date: "May 1, 2026", amount: "₹399.00", status: "Paid" },
    { id: "INV-2026-003", date: "April 1, 2026", amount: "₹399.00", status: "Paid" },
  ];

  return (
    <>
      <TopNav
        title="Billing & Plan"
        subtitle="Manage your subscription, usage, and payments"
      />

      <div className="dashboard-content">
        {/* Usage meters */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Quota Usage */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)" }}>
                  Monthly request usage
                </span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4 }}>
                  482,910 / 1,000,000 requests
                </h3>
              </div>
              <div
                style={{
                  padding: "4px 10px",
                  background: "rgba(245, 158, 11, 0.1)",
                  color: "var(--yellow-dark)",
                  borderRadius: "12px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                48.2% Used
              </div>
            </div>

            <div className="progress-track" style={{ height: 12, marginBottom: 12 }}>
              <div className="progress-fill" style={{ width: "48.2%", background: "var(--blue-dark)" }} />
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
              Your billing period resets on <strong>July 1, 2026</strong>. If you exceed 1,000,000 requests, additional requests are billed at ₹40 per 50k requests.
            </p>
          </div>

          {/* Payment Method */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)" }}>
                Payment method
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                <div style={{ width: 48, height: 32, border: "1px solid var(--black)", borderRadius: "6px", display: "flex", alignItems: "center", background: "var(--black)", color: "#fff", fontWeight: "bold", fontSize: 11, letterSpacing: "0.04em", flexShrink: 0, justifyContent: "center" }}>
                  VISA
                </div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>Visa ending in 4242</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--gray-500)" }}>Expires 12/28</div>
                </div>
              </div>
            </div>

            <button
              className="btn btn-outline btn-sm"
              style={{ width: "100%", textAlign: "center", justifyContent: "center", marginTop: 16 }}
            >
              Update Payment Details
            </button>
          </div>
        </div>

        {/* Plan upgrade options */}
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: 16 }}>
          Choose your plan
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {plans.map((p) => {
            const isCurrent = currentPlan === p.id;
            const cardBg = "var(--white)";
            const cardTextColor = "var(--black)";
            const borderAccent = isCurrent ? "var(--blue-dark)" : "var(--gray-200)";

            let bannerColor = "var(--blue)";
            if (p.color === "red") bannerColor = "var(--red)";
            if (p.color === "yellow") bannerColor = "var(--yellow)";

            return (
              <div
                key={p.id}
                className="card card-hover"
                style={{
                  border: isCurrent ? `2px solid ${borderAccent}` : `1px solid ${borderAccent}`,
                  background: cardBg,
                  color: cardTextColor,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  padding: 0,
                  boxShadow: isCurrent ? "var(--shadow-lg)" : "var(--shadow-sm)",
                }}
              >
                <div style={{ height: 6, background: bannerColor }} />

                <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                      {p.name}
                    </h3>
                    {isCurrent && (
                      <span
                        style={{
                          background: "var(--blue-dark)",
                          color: "var(--white)",
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: 9,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "4px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        Active
                      </span>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800 }}>{p.price}</span>
                    {p.period !== "forever" && p.period !== "custom" && (
                      <span style={{ fontSize: 13, opacity: 0.6 }}>/ {p.period}</span>
                    )}
                  </div>

                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, opacity: 0.7, marginBottom: 20 }}>
                    {p.desc}
                  </p>

                  <div style={{ borderTop: "1px solid var(--gray-200)", paddingTop: 20, marginBottom: 24, flex: 1 }}>
                    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {p.features.map((f, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                          <Check size={14} color={bannerColor} style={{ flexShrink: 0 }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!isCurrent ? (
                    <button
                      onClick={() => setCurrentPlan(p.id)}
                      className={`btn btn-${p.color === "yellow" ? "outline" : p.color === "red" ? "red" : "blue"}`}
                      style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
                    >
                      {p.id === "enterprise" ? "Contact Sales" : "Upgrade"}
                    </button>
                  ) : (
                    <div
                      style={{
                        padding: "12px",
                        background: "rgba(59, 130, 246, 0.08)",
                        color: "var(--blue-dark)",
                        border: "1px solid var(--blue)",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                      }}
                    >
                      Plan Active
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Invoice History */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--gray-200)", display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={16} />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Billing Invoices
            </h3>
          </div>
          <div className="table-wrapper" style={{ border: "none", boxShadow: "none", borderRadius: 0 }}>
            <table>
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id}>
                    <td style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{inv.id}</td>
                    <td>{inv.date}</td>
                    <td style={{ fontWeight: 600 }}>{inv.amount}</td>
                    <td>
                      <span className="badge badge-green">{inv.status}</span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        title="Download PDF Invoice"
                        style={{
                          width: 32,
                          height: 32,
                          border: "1px solid var(--gray-200)",
                          borderRadius: "8px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "var(--gray-500)",
                          background: "var(--white)",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--cream-dark)";
                          e.currentTarget.style.color = "var(--black)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "var(--white)";
                          e.currentTarget.style.color = "var(--gray-500)";
                        }}
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
