"use client";

import { useState } from "react";
import { Bell, Plus, Search, Menu } from "lucide-react";
import Link from "next/link";

interface TopNavProps {
  title: string;
  subtitle?: string;
  action?: { label: string; onClick?: () => void; href?: string };
}

export function TopNav({ title, subtitle, action }: TopNavProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="topnav">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-sidebar"))}
          className="mobile-menu-btn"
          style={{
            width: 36, height: 36,
            border: "1px solid var(--gray-200)",
            borderRadius: "8px",
            background: "var(--white)",
            color: "var(--gray-500)",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          <Menu size={16} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              color: "var(--black)",
              lineHeight: 1,
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mobile-subtitle" style={{ fontSize: 12, color: "var(--gray-500)", fontFamily: "'Inter', sans-serif" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>


      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Live dot */}
        <div className="topnav-live" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8, height: 8,
              borderRadius: "50%",
              background: "#2EA55A",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#2EA55A",
            }}
          >
            Live
          </span>
        </div>

        {/* Search */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          style={{
            width: 36, height: 36,
            border: "1px solid var(--gray-200)",
            borderRadius: "8px",
            background: "var(--white)",
            color: "var(--gray-500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
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
          <Search size={14} />
        </button>

        {/* Notifications */}
        <button
          style={{
            width: 36, height: 36,
            border: "1px solid var(--gray-200)",
            borderRadius: "8px",
            background: "var(--white)",
            color: "var(--gray-500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
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
          <Bell size={14} />
          <div
            style={{
              position: "absolute",
              top: 8, right: 8,
              width: 6, height: 6,
              borderRadius: "50%",
              background: "var(--red)",
            }}
          />
        </button>

        {/* CTA */}
        {action && (
          action.href ? (
            <Link href={action.href} className="btn btn-red btn-sm">
              <Plus size={14} />
              <span className="topnav-btn-text">{action.label}</span>
            </Link>
          ) : (
            <button className="btn btn-red btn-sm" onClick={action.onClick}>
              <Plus size={14} />
              <span className="topnav-btn-text">{action.label}</span>
            </button>
          )
        )}
      </div>
    </header>
  );
}
