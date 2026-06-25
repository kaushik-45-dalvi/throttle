import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { BauhausComposition } from "@/components/ui/BauhausShape";
import Link from "next/link";

function SignUpSkeleton() {
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
      <div className="shimmer" style={{ height: 38, borderRadius: 8, marginTop: 12, background: "rgba(59, 130, 246, 0.4)" }} />

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <div className="shimmer" style={{ width: 180, height: 14, borderRadius: 4 }} />
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* Left panel — Bauhaus illustration */}
      <div
        style={{
          background: "#1B4FD8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "#F5C800", opacity: 0.15 }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 160, height: 160, background: "#E8391D", opacity: 0.15 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
            <div style={{ position: "relative", width: 44, height: 44 }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 26, height: 26, borderRadius: "50%", background: "#E8391D" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, background: "#1A1A1A" }} />
              <div style={{ position: "absolute", bottom: 7, left: 7, width: 18, height: 18, borderRadius: "50%", background: "#F5C800" }} />
            </div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 22, letterSpacing: "-0.02em", color: "#fff", textTransform: "uppercase" }}>
              Throttle
            </span>
          </Link>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
            <BauhausComposition size={220} />
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 36,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            Free to start.
            <br />
            <span style={{ color: "#F5C800" }}>Instant</span> savings.
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 40px" }}>
            No credit card required. Free tier includes 1,000 proxied requests/day.
            Start saving in under 5 minutes.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, textAlign: "left" }}>
            {[
              { icon: "⚡", text: "1-line SDK integration" },
              { icon: "📊", text: "Real-time savings dashboard" },
              { icon: "🔔", text: "Budget alerts via email" },
              { icon: "🏆", text: "Public savings leaderboard" },
            ].map((f) => (
              <div
                key={f.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 16px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <span style={{ fontSize: 16 }}>{f.icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — Clerk Sign Up */}
      <div
        style={{
          background: "var(--cream)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 6,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "var(--blue)" }} />
          <div style={{ flex: 1, background: "var(--red)" }} />
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
              Create Account
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--gray-500)" }}>
              Start saving on API costs in minutes
            </div>
          </div>

          <ClerkLoading>
            <SignUpSkeleton />
          </ClerkLoading>
          <ClerkLoaded>
            <SignUp
              path="/sign-up"
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
                  headerTitle: { display: "none" },
                  headerSubtitle: { display: "none" },
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
                    background: "var(--blue)",
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
                    color: "var(--red)",
                    fontWeight: 600,
                  },
                  dividerLine: { background: "var(--gray-200)" },
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
                  colorPrimary: "#2563EB",
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
