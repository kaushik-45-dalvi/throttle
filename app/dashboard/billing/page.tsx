"use client";

import { useState, useEffect } from "react";
import { useDashboard } from "@/lib/DashboardContext";
import { TopNav } from "@/components/layout/TopNav";
import { CreditCard, Check, FileText, Download } from "lucide-react";

export default function BillingPage() {
  const { billing, loading, updateBilling: update } = useDashboard();

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
      limit: 50000,
    },
    {
      id: "pro",
      name: "Pro Optimizer",
      price: "$20",
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
      limit: 1000000,
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
      limit: 99999999,
    },
  ];

  const handlePlanChange = async (planId: string, limit: number) => {
    if (planId === "enterprise") {
      alert("Please contact our sales team at sales@throttle.dev to set up an Enterprise contract.");
      return;
    }
    
    // Simulate updating billing info in Firestore
    await update({
      plan: planId,
      requestsLimit: limit,
      paymentMethod: planId === "free" ? null : {
        type: "VISA",
        last4: "4242",
        expiry: "12/28"
      },
      // Seed a simulated invoice for this plan upgrade
      invoices: [
        {
          id: `INV-2026-${Math.floor(Math.random() * 900 + 100)}`,
          date: new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
          amount: planId === "pro" ? "$20.00" : "$0.00",
          status: "Paid"
        },
        ...(billing.invoices || [])
      ]
    });
  };

  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), 5000);
    return () => clearTimeout(t);
  }, []);

  if (loading && !timedOut) {
    return (
      <>
        <TopNav title="Billing & Plan" subtitle="Loading billing profile..." />
        <div className="dashboard-content">
          <div className="card shimmer" style={{ height: 160, marginBottom: 24 }} />
          <div className="plans-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card shimmer" style={{ height: 350 }} />
            ))}
          </div>
        </div>
      </>
    );
  }

  const { plan: currentPlan, requestsUsed, requestsLimit, paymentMethod, invoices } = billing;
  const usePercentage = requestsLimit > 0 ? Math.min(Math.round((requestsUsed / requestsLimit) * 100), 100) : 0;

  return (
    <>
      <TopNav
        title="Billing & Plan"
        subtitle="Manage your subscription, usage, and payments"
      />

      <div className="dashboard-content">
        {/* Usage meters */}
        <div className="billing-usage-grid">
          {/* Quota Usage */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)" }}>
                  Monthly request usage
                </span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4 }}>
                  {requestsUsed.toLocaleString()} / {requestsLimit >= 99999999 ? "Unlimited" : `${requestsLimit.toLocaleString()} requests`}
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
                {requestsLimit >= 99999999 ? "0%" : `${usePercentage}%`} Used
              </div>
            </div>

            <div className="progress-track" style={{ height: 12, marginBottom: 12 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${requestsLimit >= 99999999 ? 0 : usePercentage}%`,
                  background: "var(--blue-dark)"
                }}
              />
            </div>

            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
              Your billing period resets on <strong>{new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</strong>.
            </p>
          </div>

          {/* Payment Method */}
          <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-500)" }}>
                Payment method
              </span>
              {paymentMethod ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12 }}>
                  <div style={{ width: 48, height: 32, border: "1px solid var(--black)", borderRadius: "6px", display: "flex", alignItems: "center", background: "var(--black)", color: "#fff", fontWeight: "bold", fontSize: 11, letterSpacing: "0.04em", flexShrink: 0, justifyContent: "center" }}>
                    {paymentMethod.type}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>{paymentMethod.type} ending in {paymentMethod.last4}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--gray-500)" }}>Expires {paymentMethod.expiry}</div>
                  </div>
                </div>
              ) : (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)", marginTop: 12 }}>
                  No payment method configured. Active subscription plans require a card.
                </div>
              )}
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
        <div className="plans-grid">
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
                      onClick={() => handlePlanChange(p.id, p.limit)}
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
            {(!invoices || invoices.length === 0) ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--gray-400)", fontFamily: "'Space Grotesk', sans-serif" }}>
                No invoices recorded yet. Upgraded plans will show invoices here.
              </div>
            ) : (
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
                            borderStyle: "solid",
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
