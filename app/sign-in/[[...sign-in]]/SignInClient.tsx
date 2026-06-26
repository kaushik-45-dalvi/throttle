"use client";

import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/clerk-react";
import { BauhausComposition } from "@/components/ui/BauhausShape";
import Link from "next/link";

function SignInSkeleton() {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid var(--gray-200)",
        borderRadius: "12px",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "'Inter', sans-serif",
        padding: "32px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {/* Social Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="shimmer" style={{ height: 38, borderRadius: 8 }} />
        <div className="shimmer" style={{ height: 38, borderRadius: 8 }} />
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "8px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--gray-200)" }} />
        <div style={{ width: 16, height: 12, borderRadius: 2 }} className="shimmer" />
        <div style={{ flex: 1, height: 1, background: "var(--gray-200)" }} />
      </div>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div className="shimmer" style={{ width: 100, height: 12, borderRadius: 4 }} />
          <div className="shimmer" style={{ height: 38, borderRadius: 8 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div className="shimmer" style={{ width: 100, height: 12, borderRadius: 4 }} />
          <div className="shimmer" style={{ height: 38, borderRadius: 8 }} />
        </div>
      </div>

      {/* Submit Button */}
      <div className="shimmer" style={{ height: 38, borderRadius: 8, marginTop: 12, background: "rgba(239, 68, 68, 0.4)" }} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <div className="shimmer" style={{ width: 180, height: 14, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="auth-container">
      {/* Left panel — Bauhaus illustration */}
      <div className="auth-sidebar">
        {/* Geometric corner accents */}
        <div style={{ position: "absolute", top: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "#E8391D", opacity: 0.12 }} />
        <div style={{ position: "absolute", bottom: -40, right: -40, width: 160, height: 160, background: "#1B4FD8", opacity: 0.12 }} />
        <div style={{ position: "absolute", top: 48, right: 48, width: 48, height: 48, background: "#F5C800", opacity: 0.3 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* Logo */}
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 64 }}>
            <div style={{ position: "relative", width: 44, height: 44 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 26, height: 26, borderRadius: "50%", background: "#E8391D" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, background: "#1B4FD8" }} />
              <div style={{ position: "absolute", bottom: 7, left: 7, width: 18, height: 18, borderRadius: "50%", background: "#F5C800" }} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", color: "#F5F0E8", textTransform: "uppercase" }}>
              Throttle
            </span>
          </Link>

          {/* Bauhaus composition */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            <BauhausComposition size={240} />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#F5F0E8",
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            One proxy.
            <br />
            <span style={{ color: "#E8391D" }}>80% less</span>
            <br />
            spend.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "rgba(245,240,232,0.6)", lineHeight: 1.6, maxWidth: 320, margin: "0 auto" }}>
            Drop-in request batching that slashes your API costs the moment you integrate.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 0,
              marginTop: 48,
              border: "2px solid rgba(245,240,232,0.12)",
            }}
          >
            {[
              { v: "80%", l: "Cost Reduction" },
              { v: "10ms", l: "Batch Window" },
              { v: "∞",   l: "Requests/Day" },
            ].map((s, i) => (
              <div
                key={s.l}
                style={{
                  flex: 1,
                  padding: "16px 12px",
                  borderLeft: i > 0 ? "2px solid rgba(245,240,232,0.12)" : "none",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 800, color: "#F5C800" }}>{s.v}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — Clerk Sign In */}
      <div className="auth-main">
        {/* Top geometric accent */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 6,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "var(--red)" }} />
          <div style={{ flex: 1, background: "var(--blue)" }} />
          <div style={{ flex: 1, background: "var(--yellow)" }} />
          <div style={{ flex: 1, background: "var(--black)" }} />
        </div>

        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                color: "var(--black)",
                marginBottom: 8,
              }}
            >
              Welcome Back
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--gray-500)" }}>
              Sign in to your Throttle dashboard
            </div>
          </div>

          <ClerkLoading>
            <SignInSkeleton />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn
              routing="hash"
              appearance={{
                elements: {
                  rootBox: { width: "100%" },
                  card: {
                    background: "#ffffff",
                    border: "1px solid var(--gray-200)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow-sm)",
                    fontFamily: "'Inter', sans-serif",
                    padding: "32px",
                  },
                  headerTitle: {
                    display: "none",
                  },
                  headerSubtitle: {
                    display: "none",
                  },
                  socialButtonsBlockButton: {
                    border: "1px solid var(--gray-200)",
                    borderRadius: "8px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    boxShadow: "none",
                    background: "#ffffff",
                    color: "var(--black)",
                    transition: "all 0.15s",
                  },
                  formFieldInput: {
                    border: "1px solid var(--gray-200)",
                    borderRadius: "8px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    background: "#ffffff",
                    outline: "none",
                  },
                  formFieldLabel: {
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--black)",
                  },
                  formButtonPrimary: {
                    background: "var(--red)",
                    border: "none",
                    borderRadius: "8px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    boxShadow: "none",
                    transition: "all 0.15s",
                  },
                  footerActionLink: {
                    color: "var(--blue)",
                    fontWeight: 600,
                  },
                  dividerLine: {
                    background: "var(--gray-200)",
                  },
                  dividerText: {
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gray-500)",
                  },
                },
                variables: {
                  colorPrimary: "#EF4444",
                  colorBackground: "#ffffff",
                  colorForeground: "#0F172A",
                  colorMutedForeground: "#64748B",
                  colorInput: "#ffffff",
                  colorInputForeground: "#0F172A",
                  borderRadius: "8px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
            />
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}
