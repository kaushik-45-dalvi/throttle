"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useBilling } from "@/lib/useFirestore";
import {
  LayoutDashboard,
  List,
  FolderOpen,
  Key,
  Bell,
  CreditCard,
  Calculator,
  Zap,
  LogOut,
  Settings,
} from "lucide-react";
import { BauhausAccentRow } from "@/components/ui/BauhausShape";

const navItems = [
  {
    section: "Main",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/requests", label: "Requests", icon: List },
      { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
    ],
  },
  {
    section: "Config",
    items: [
      { href: "/dashboard/keys", label: "API Keys", icon: Key },
      { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
    ],
  },
  {
    section: "Tools",
    items: [
      { href: "/calculator", label: "Calculator", icon: Calculator },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { billing, loading: billingLoading } = useBilling();
  
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);
    window.addEventListener("toggle-sidebar", handleToggle);
    window.addEventListener("close-sidebar", handleClose);
    return () => {
      window.removeEventListener("toggle-sidebar", handleToggle);
      window.removeEventListener("close-sidebar", handleClose);
    };
  }, []);

  // User details from Clerk with fallback to mock data
  const userLoaded = isLoaded && isSignedIn && user;
  const userFullName = userLoaded 
    ? (user.fullName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.firstName || user.username || "User")))
    : "Kaushik Dalvi";
  const userEmail = userLoaded ? user.primaryEmailAddress?.emailAddress : "kaushik@throttle.dev";
  const userImageUrl = userLoaded ? user.imageUrl : null;
  const userInitials = userLoaded 
    ? (user.firstName && user.lastName 
        ? `${user.firstName[0]}${user.lastName[0]}` 
        : user.firstName 
          ? user.firstName[0] 
          : "U")
    : "K";

  const handleSignOut = async () => {
    try {
      await signOut({ redirectUrl: "/" });
    } catch (error) {
      console.error("Sign out error", error);
      window.location.href = "/";
    }
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  // Dynamic plan details
  const planId = billingLoading ? "free" : (billing?.plan || "free");
  const planInfo = {
    free: { name: "Free Plan", price: "Free", color: "var(--gray-400)" },
    pro: { name: "Pro Plan", price: "₹399/mo", color: "var(--yellow-dark)" },
    enterprise: { name: "Enterprise", price: "Custom", color: "var(--red)" }
  }[planId as "free" | "pro" | "enterprise"] || { name: "Free Plan", price: "Free", color: "var(--gray-400)" };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 45,
          }}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <Link href="/dashboard" onClick={closeMenu} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 36, height: 36 }}>
              <div
                style={{
                  position: "absolute", top: 0, left: 0,
                  width: 22, height: 22,
                  borderRadius: "50%",
                  background: "#E8391D",
                }}
              />
              <div
                style={{
                  position: "absolute", bottom: 0, right: 0,
                  width: 22, height: 22,
                  background: "#1B4FD8",
                }}
              />
              <div
                style={{
                  position: "absolute", bottom: 6, left: 6,
                  width: 14, height: 14,
                  borderRadius: "50%",
                  background: "#F5C800",
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: "-0.02em",
                  color: "var(--black)",
                  textTransform: "uppercase",
                }}
              >
                Throttle
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--gray-500)",
                }}
              >
                Cost Optimizer
              </div>
            </div>
          </Link>
        </div>

        {/* Plan badge */}
        <div
          style={{
            margin: "12px 16px",
            padding: "8px 12px",
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Zap size={14} color={planId === "free" ? "var(--gray-400)" : "var(--yellow)"} fill={planId === "free" ? "none" : "var(--yellow)"} />
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: planInfo.color,
            }}
          >
            {planInfo.name}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "var(--gray-500)",
            }}
          >
            {planInfo.price}
          </span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section}>
              <div className="sidebar-section-label">{section.section}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={`sidebar-link ${active ? "active" : ""}`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: "16px", borderTop: "1px solid var(--gray-200)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {userImageUrl ? (
              <img
                src={userImageUrl}
                alt={userFullName}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ) : (
              <div
                style={{
                  width: 32, height: 32,
                  borderRadius: "50%",
                  background: "var(--red)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: "#fff",
                  }}
                >
                  {userInitials}
                </span>
              </div>
            )}
            <div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--black)",
                }}
              >
                {userFullName}
              </div>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 10,
                  color: "var(--gray-500)",
                  letterSpacing: "0.04em",
                }}
              >
                {userEmail}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="sidebar-link" style={{ flex: 1, padding: "8px 10px", justifyContent: "center", border: "1px solid var(--gray-200)", borderRadius: 6 }}>
              <Settings size={14} />
            </button>
            <button onClick={handleSignOut} className="sidebar-link" style={{ flex: 1, padding: "8px 10px", justifyContent: "center", border: "1px solid var(--gray-200)", borderRadius: 6, cursor: "pointer" }}>
              <LogOut size={14} />
            </button>
          </div>
          <div style={{ marginTop: 12 }}>
            <BauhausAccentRow />
          </div>
          <div style={{ marginTop: 16, fontSize: 9, color: "var(--gray-400)", fontFamily: "var(--font-body)", textAlign: "center", lineHeight: 1.4 }}>
            © 2026 design and engineered by Kaushik Dalvi
          </div>
        </div>
      </aside>
    </>
  );
}
