"use client";

import { useEffect, useRef } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { RedirectToSignIn, useAuth, useUser } from "@clerk/clerk-react";
import { initUserIfNeeded } from "@/lib/firestore";
import { DashboardProvider } from "@/lib/DashboardContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const initRef = useRef(false);

  useEffect(() => {
    if (userId && user && !initRef.current) {
      initRef.current = true;
      initUserIfNeeded(
        userId,
        user.primaryEmailAddress?.emailAddress,
        user.fullName || user.firstName || undefined
      ).catch(console.error);
    }
  }, [userId, user]);

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
    <DashboardProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <div className="dashboard-main">{children}</div>
      </div>
    </DashboardProvider>
  );
}
