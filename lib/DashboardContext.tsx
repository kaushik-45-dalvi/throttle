"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  getOverview, getSpendChartData, getRequestsTimelineData,
  getProjects, addProject, updateProject, deleteProject,
  getApiKeys, addApiKey, deleteApiKey,
  getAlerts, addAlert, deleteAlert,
  getRequests,
  getBilling, updateBilling,
  type Project, type ApiKey, type Alert, type RequestLog,
  type Overview, type BillingData, type SpendDataPoint, type RequestsTimelinePoint,
} from "./firestore";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DashboardData {
  // Overview
  overview: Overview;
  spendData: SpendDataPoint[];
  timelineData: RequestsTimelinePoint[];
  // Projects
  projects: Project[];
  // API Keys
  apiKeys: ApiKey[];
  // Alerts
  alerts: Alert[];
  // Requests
  requests: RequestLog[];
  // Billing
  billing: BillingData;
  // State
  loading: boolean;
  // Actions — projects
  addProject: (data: Omit<Project, "id">) => Promise<void>;
  updateProject: (id: string, data: Partial<Project>) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  // Actions — keys
  addApiKey: (data: Omit<ApiKey, "id">) => Promise<void>;
  removeApiKey: (id: string) => Promise<void>;
  // Actions — alerts
  addAlert: (data: Omit<Alert, "id">) => Promise<void>;
  removeAlert: (id: string) => Promise<void>;
  // Actions — billing
  updateBilling: (data: Partial<BillingData>) => Promise<void>;
}

const defaultOverview: Overview = {
  totalSaved: 0, savedThisMonth: 0, savedThisWeek: 0, savedToday: 0,
  actualSpend: 0, projectedSpend: 0, requestsToday: 0, batchedToday: 0, avgSavingPct: 0,
};
const defaultBilling: BillingData = {
  plan: "free", requestsUsed: 0, requestsLimit: 50000, paymentMethod: null, invoices: [],
};

const DashboardContext = createContext<DashboardData>({
  overview: defaultOverview, spendData: [], timelineData: [],
  projects: [], apiKeys: [], alerts: [], requests: [], billing: defaultBilling,
  loading: true,
  addProject: async () => {}, updateProject: async () => {}, removeProject: async () => {},
  addApiKey: async () => {}, removeApiKey: async () => {},
  addAlert: async () => {}, removeAlert: async () => {},
  updateBilling: async () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────
export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const [overview, setOverview] = useState<Overview>(defaultOverview);
  const [spendData, setSpendData] = useState<SpendDataPoint[]>([]);
  const [timelineData, setTimelineData] = useState<RequestsTimelinePoint[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [requests, setRequests] = useState<RequestLog[]>([]);
  const [billing, setBilling] = useState<BillingData>(defaultBilling);

  // Fetch everything once when userId is available
  useEffect(() => {
    if (!userId || hasFetched.current) return;
    hasFetched.current = true;

    // Timeout fallback — never stay loading forever
    const timeout = setTimeout(() => setLoading(false), 6000);

    Promise.all([
      getOverview(userId),
      getSpendChartData(userId),
      getRequestsTimelineData(userId),
      getProjects(userId),
      getApiKeys(userId),
      getAlerts(userId),
      getRequests(userId),
      getBilling(userId),
    ])
      .then(([ov, spend, timeline, projs, keys, alts, reqs, bill]) => {
        setOverview(ov);
        setSpendData(spend);
        setTimelineData(timeline);
        setProjects(projs);
        setApiKeys(keys);
        setAlerts(alts);
        setRequests(reqs);
        setBilling(bill);
      })
      .catch(console.error)
      .finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });

    return () => clearTimeout(timeout);
  }, [userId]);

  // ─── Project actions ───────────────────────────────────────────────────────
  const handleAddProject = useCallback(async (data: Omit<Project, "id">) => {
    if (!userId) return;
    const id = await addProject(userId, data);
    setProjects(prev => [...prev, { ...data, id }]);
  }, [userId]);

  const handleUpdateProject = useCallback(async (id: string, data: Partial<Project>) => {
    if (!userId) return;
    await updateProject(userId, id, data);
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, [userId]);

  const handleRemoveProject = useCallback(async (id: string) => {
    if (!userId) return;
    await deleteProject(userId, id);
    setProjects(prev => prev.filter(p => p.id !== id));
  }, [userId]);

  // ─── API Key actions ───────────────────────────────────────────────────────
  const handleAddApiKey = useCallback(async (data: Omit<ApiKey, "id">) => {
    if (!userId) return;
    const id = await addApiKey(userId, data);
    setApiKeys(prev => [...prev, { ...data, id }]);
  }, [userId]);

  const handleRemoveApiKey = useCallback(async (id: string) => {
    if (!userId) return;
    await deleteApiKey(userId, id);
    setApiKeys(prev => prev.filter(k => k.id !== id));
  }, [userId]);

  // ─── Alert actions ─────────────────────────────────────────────────────────
  const handleAddAlert = useCallback(async (data: Omit<Alert, "id">) => {
    if (!userId) return;
    const id = await addAlert(userId, data);
    setAlerts(prev => [...prev, { ...data, id }]);
  }, [userId]);

  const handleRemoveAlert = useCallback(async (id: string) => {
    if (!userId) return;
    await deleteAlert(userId, id);
    setAlerts(prev => prev.filter(a => a.id !== id));
  }, [userId]);

  // ─── Billing actions ───────────────────────────────────────────────────────
  const handleUpdateBilling = useCallback(async (data: Partial<BillingData>) => {
    if (!userId) return;
    await updateBilling(userId, data);
    setBilling(prev => ({ ...prev, ...data }));
  }, [userId]);

  return (
    <DashboardContext.Provider value={{
      overview, spendData, timelineData,
      projects, apiKeys, alerts, requests, billing,
      loading,
      addProject: handleAddProject,
      updateProject: handleUpdateProject,
      removeProject: handleRemoveProject,
      addApiKey: handleAddApiKey,
      removeApiKey: handleRemoveApiKey,
      addAlert: handleAddAlert,
      removeAlert: handleRemoveAlert,
      updateBilling: handleUpdateBilling,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────
export function useDashboard() {
  return useContext(DashboardContext);
}
