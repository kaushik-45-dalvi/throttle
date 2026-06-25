"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
        <div className="shimmer" style={{ width: 100, height: 20, borderRadius: 4 }} />
      </div>
    );
  }

  if (!userId) {
    return <RedirectToSignIn />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div className="dashboard-main">{children}</div>
    </div>
  );
}
