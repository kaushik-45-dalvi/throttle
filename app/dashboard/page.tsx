"use client";

import React, { useState, useEffect } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { SavingsCounter } from "@/components/ui/SavingsCounter";
import { BauhausShape } from "@/components/ui/BauhausShape";
import { SpendComparisonChart, RequestsTimelineChart } from "@/components/charts/DashboardCharts";
import { mockOverview, mockProjects, formatUSD } from "@/lib/mock-data";
import { TrendingDown, Zap, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";

/* Metric card */
function MetricCard({
  label,
  value,
  sub,
  change,
  accent,
  geo,
}: {
  label: string;
  value: string;
  sub?: string;
  change?: string;
  accent?: "red" | "blue" | "yellow" | "black";
  geo?: React.ReactNode;
}) {
  const accentColorMap = {
    red:    "var(--red)",
    blue:   "var(--blue-dark)",
    yellow: "var(--yellow)",
    black:  "var(--black)",
  };
  const accentColor = accent ? accentColorMap[accent] : "var(--gray-200)";

  // Render geometric shape with soft background color
  const geoColorMap = {
    red:    "rgba(239, 68, 68, 0.05)",
    blue:   "rgba(59, 130, 246, 0.05)",
    yellow: "rgba(245, 158, 11, 0.05)",
    black:  "rgba(15, 23, 42, 0.05)",
  };
  const geoColor = accent ? geoColorMap[accent] : "rgba(0,0,0,0.02)";
  
  // Clone geo element with soft color
  const clonedGeo = geo && React.isValidElement(geo)
    ? React.cloneElement(geo as React.ReactElement<any>, { color: geoColor })
    : null;

  return (
    <div
      className="card card-hover"
      style={{
        borderTop: `4px solid ${accentColor}`,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: 140,
        padding: 24,
      }}
    >
      {clonedGeo && (
        <div style={{ position: "absolute", bottom: -16, right: -16 }}>
          {clonedGeo}
        </div>
      )}
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--gray-500)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1,
          color: "var(--black)",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: "var(--gray-500)", fontFamily: "'Inter', sans-serif" }}>{sub}</div>
      )}
      {change && (
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#10B981",
          }}
        >
          <TrendingDown size={12} />
          {change}
        </div>
      )}
    </div>
  );
}

/* Live savings ticker */
function LiveTicker({ base }: { base: number }) {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => v + Math.floor(Math.random() * 8 + 2));
    }, 2000);
    return () => clearInterval(interval);
  }, [base]);
  return <SavingsCounter value={value} prefix="$" size="xl" duration={1800} />;
}

export default function DashboardPage() {
  const { totalSaved, savedThisMonth, savedThisWeek, savedToday, actualSpend, projectedSpend, requestsToday, batchedToday, avgSavingPct } = mockOverview;

  return (
    <>
      <TopNav
        title="Overview"
        subtitle={`Last updated: ${new Date().toLocaleTimeString()}`}
        action={{ label: "New Project", href: "/dashboard/projects" }}
      />

      <div className="dashboard-content">

        {/* Hero Savings Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, var(--cream-dark) 100%)",
            border: "1px solid var(--gray-200)",
            borderRadius: 16,
            padding: 40,
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            position: "relative",
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Geometric accents */}
          <div style={{ position: "absolute", top: -40, right: 120, opacity: 0.05 }}>
            <BauhausShape variant="circle" size={200} color="var(--red)" />
          </div>
          <div style={{ position: "absolute", bottom: -30, right: 280, opacity: 0.04 }}>
            <BauhausShape variant="square" size={120} color="var(--yellow)" />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--blue-dark)",
                marginBottom: 12,
              }}
            >
              ⚡ Total Lifetime Savings
            </div>
            <LiveTicker base={totalSaved} />
            <div style={{ marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)" }}>
                Without Throttle: <span style={{ color: "var(--red)", fontWeight: 600 }}>{formatUSD(projectedSpend / 100)}</span>
              </div>
              <div style={{ color: "var(--gray-300)" }}>|</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)" }}>
                Actual spend: <span style={{ color: "var(--blue-dark)", fontWeight: 600 }}>{formatUSD(actualSpend / 100)}</span>
              </div>
              <div style={{ color: "var(--gray-300)" }}>|</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)" }}>
                Avg saving: <span style={{ color: "var(--yellow-dark)", fontWeight: 600 }}>{avgSavingPct}%</span>
              </div>
            </div>
          </div>

          {/* Right stat cluster */}
          <div style={{ display: "flex", gap: 12, position: "relative", zIndex: 1, flexShrink: 0 }}>
            {[
              { label: "This Month", value: formatUSD(savedThisMonth / 100) },
              { label: "This Week",  value: formatUSD(savedThisWeek / 100)  },
              { label: "Today",      value: formatUSD(savedToday / 100)     },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--white)",
                  border: "1px solid var(--gray-200)",
                  borderRadius: 12,
                  padding: "16px 20px",
                  textAlign: "center",
                  boxShadow: "var(--shadow-sm)",
                  minWidth: 110,
                }}
              >
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, color: "var(--black)", letterSpacing: "-0.02em" }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gray-400)", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metric Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <MetricCard
            label="Requests Today"
            value={requestsToday.toLocaleString()}
            sub="Proxied through Throttle"
            change="-78% upstream calls"
            accent="red"
            geo={<BauhausShape variant="circle" size={80} />}
          />
          <MetricCard
            label="Batched Calls"
            value={batchedToday.toLocaleString()}
            sub={`vs ${requestsToday.toLocaleString()} raw`}
            change="92% batch efficiency"
            accent="blue"
            geo={<BauhausShape variant="square" size={80} />}
          />
          <MetricCard
            label="Avg Saving"
            value={`${avgSavingPct}%`}
            sub="Per request cost reduction"
            change="↑ 4% from last week"
            accent="yellow"
            geo={<BauhausShape variant="circle" size={80} />}
          />
          <MetricCard
            label="Projects"
            value={mockProjects.length.toString()}
            sub="Active this month"
            accent="black"
            geo={<BauhausShape variant="square" size={80} />}
          />
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
          {/* Spend chart */}
          <div className="card" style={{ padding: 0 }}>
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--gray-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Spend Comparison
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
                  Actual vs projected without Throttle
                </div>
              </div>
              <div style={{ display: "flex", gap: 4, background: "var(--cream-dark)", padding: 4, borderRadius: 8 }}>
                {["Week", "Month", "All"].map((t, i) => (
                  <button
                    key={t}
                    style={{
                      padding: "6px 12px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderRadius: 6,
                      background: i === 1 ? "var(--white)" : "transparent",
                      color: i === 1 ? "var(--black)" : "var(--gray-500)",
                      boxShadow: i === 1 ? "var(--shadow-sm)" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <SpendComparisonChart height={260} />
            </div>
          </div>

          {/* Requests timeline */}
          <div className="card" style={{ padding: 0 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--gray-200)" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Today&apos;s Requests
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
                Batched vs upstream calls
              </div>
            </div>
            <div style={{ padding: 20 }}>
              <RequestsTimelineChart height={260} />
            </div>
          </div>
        </div>

        {/* Top Projects */}
        <div className="card" style={{ padding: 0, marginBottom: 24 }}>
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid var(--gray-200)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Top Projects by Savings
            </div>
            <Link
              href="/dashboard/projects"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--blue-dark)",
              }}
            >
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {mockProjects.map((proj) => {
              const colorMap: Record<string, string> = {
                red: "var(--red)",
                blue: "var(--blue-dark)",
                yellow: "var(--yellow)",
                black: "var(--black)",
              };
              const barColor = colorMap[proj.color];
              const pct = Math.round((proj.spent / proj.budget) * 100);
              return (
                <div key={proj.id}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div
                        style={{
                          width: 32, height: 32,
                          background: barColor,
                          borderRadius: 8,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 13, color: proj.color === "yellow" ? "#1A1A1A" : "#fff" }}>
                          {proj.name[0]}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700 }}>{proj.name}</div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
                          {proj.provider} · {proj.model}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#10B981" }}>
                          +{formatUSD(proj.savedToday)} saved
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "var(--gray-500)" }}>
                          {proj.requestsToday.toLocaleString()} requests
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600 }}>
                          ${proj.spent} / ${proj.budget}
                        </div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "var(--gray-500)" }}>
                          {pct}% of budget
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, background: barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA: upgrade / share */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.01) 100%)",
              border: "1px solid rgba(239, 68, 68, 0.15)",
              padding: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--black)", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                Share Your Savings
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>
                Show the world how much you saved this month
              </div>
            </div>
            <button
              className="btn btn-red btn-sm"
              style={{ flexShrink: 0 }}
            >
              Share Card <ArrowUpRight size={14} />
            </button>
          </div>
          <div
            className="card"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0.01) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.15)",
              padding: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 800, color: "var(--black)", textTransform: "uppercase", letterSpacing: "-0.01em" }}>
                SDK Quickstart
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>
                One line to integrate Throttle into your app
              </div>
            </div>
            <Link
              href="/dashboard/keys"
              className="btn btn-primary btn-sm"
              style={{ flexShrink: 0 }}
            >
              Get API Key
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
