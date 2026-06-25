"use client";

import Link from "next/link";

export default function SecurityPage() {
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
            <Link href="/calculator" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--black)" }}>
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
      <main style={{ flex: 1, maxWidth: 800, width: "100%", margin: "48px auto", padding: "0 24px" }}>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            color: "var(--black)",
            marginBottom: 8,
          }}
        >
          Security
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--gray-500)", marginBottom: 32 }}>
          Last Updated: June 21, 2026
        </p>

        <div className="card" style={{ padding: 40, background: "#fff", display: "flex", flexDirection: "column", gap: 24, lineHeight: 1.6, fontFamily: "'Inter', sans-serif", color: "var(--black)" }}>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "var(--black)", marginBottom: 12 }}>
              1. Encryption Protocols
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray-700)" }}>
              Throttle uses industry-standard TLS 1.3 encryption for all request payloads in transit. All credentials and third-party API keys configured in the database are fully encrypted at rest using AES-256-GCM.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "var(--black)", marginBottom: 12 }}>
              2. Payload Processing in Memory
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray-700)" }}>
              To ensure data protection, prompt batching is processed entirely in volatile memory. Payloads are instantly deleted from RAM once they are combined and dispatched to upstream providers. Throttle does not write prompt contents to permanent disk storage.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "var(--black)", marginBottom: 12 }}>
              3. Authentication & Key Management
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray-700)" }}>
              We leverage Clerk for secure authentication, token generation, session validation, and Multi-Factor Authentication (MFA). API Keys issued for proxy routing have restricted permissions and can be instantly revoked from the dashboard.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, textTransform: "uppercase", color: "var(--black)", marginBottom: 12 }}>
              4. Vulnerability Disclosures
            </h2>
            <p style={{ fontSize: 14, color: "var(--gray-700)" }}>
              We welcome security reports. If you find any vulnerabilities or security issues in our SDK or proxy systems, please reach out directly at <a href="mailto:security@throttle.dev" style={{ color: "var(--blue)" }}>security@throttle.dev</a> for coordinate disclosures.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--gray-200)",
          background: "var(--black)",
          color: "rgba(245,240,232,0.6)",
          padding: "48px 0 24px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
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
