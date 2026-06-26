// Custom React hooks for Firestore data entities
// Each hook provides data, loading, error states + CRUD actions

"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getApiKeys,
  addApiKey,
  deleteApiKey,
  getAlerts,
  addAlert,
  deleteAlert,
  getRequests,
  getOverview,
  updateOverview,
  getBilling,
  updateBilling,
  getSpendChartData,
  getRequestsTimelineData,
  type Project,
  type ApiKey,
  type Alert,
  type RequestLog,
  type Overview,
  type BillingData,
  type SpendDataPoint,
  type RequestsTimelinePoint,
} from "./firestore";

// Helper to format catch error messages
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// ─── useProjects ─────────────────────────────────────────────────────
export function useProjects() {
  const { userId } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getProjects(userId);
      setProjects(data);
      setError(null);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getProjects(userId)
      .then((data) => {
        if (active) {
          setProjects(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (active) setError(getErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const add = async (data: Omit<Project, "id">) => {
    if (!userId) return;
    try {
      const id = await addProject(userId, data);
      setProjects((prev) => [...prev, { ...data, id }]);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const update = async (projectId: string, data: Partial<Project>) => {
    if (!userId) return;
    try {
      await updateProject(userId, projectId, data);
      setProjects((prev) =>
        prev.map((p) => (p.id === projectId ? { ...p, ...data } : p))
      );
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const remove = async (projectId: string) => {
    if (!userId) return;
    try {
      await deleteProject(userId, projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return { projects, loading, error, add, update, remove, refetch: fetch };
}

// ─── useApiKeys ──────────────────────────────────────────────────────
export function useApiKeys() {
  const { userId } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getApiKeys(userId);
      setApiKeys(data);
      setError(null);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getApiKeys(userId)
      .then((data) => {
        if (active) {
          setApiKeys(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (active) setError(getErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const add = async (data: Omit<ApiKey, "id">) => {
    if (!userId) return;
    try {
      const id = await addApiKey(userId, data);
      setApiKeys((prev) => [...prev, { ...data, id }]);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const remove = async (keyId: string) => {
    if (!userId) return;
    try {
      await deleteApiKey(userId, keyId);
      setApiKeys((prev) => prev.filter((k) => k.id !== keyId));
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return { apiKeys, loading, error, add, remove, refetch: fetch };
}

// ─── useAlerts ───────────────────────────────────────────────────────
export function useAlerts() {
  const { userId } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getAlerts(userId);
      setAlerts(data);
      setError(null);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getAlerts(userId)
      .then((data) => {
        if (active) {
          setAlerts(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (active) setError(getErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const add = async (data: Omit<Alert, "id">) => {
    if (!userId) return;
    try {
      const id = await addAlert(userId, data);
      setAlerts((prev) => [...prev, { ...data, id }]);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  const remove = async (alertId: string) => {
    if (!userId) return;
    try {
      await deleteAlert(userId, alertId);
      setAlerts((prev) => prev.filter((a) => a.id !== alertId));
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return { alerts, loading, error, add, remove, refetch: fetch };
}

// ─── useRequests ─────────────────────────────────────────────────────
export function useRequests() {
  const { userId } = useAuth();
  const [requests, setRequests] = useState<RequestLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getRequests(userId);
      setRequests(data);
      setError(null);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getRequests(userId)
      .then((data) => {
        if (active) {
          setRequests(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (active) setError(getErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  return { requests, loading, error, refetch: fetch };
}

// ─── useOverview ─────────────────────────────────────────────────────
export function useOverview() {
  const { userId } = useAuth();
  const [overview, setOverview] = useState<Overview>({
    totalSaved: 0,
    savedThisMonth: 0,
    savedThisWeek: 0,
    savedToday: 0,
    actualSpend: 0,
    projectedSpend: 0,
    requestsToday: 0,
    batchedToday: 0,
    avgSavingPct: 0,
  });
  const [spendData, setSpendData] = useState<SpendDataPoint[]>([]);
  const [timelineData, setTimelineData] = useState<RequestsTimelinePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const [ov, spend, timeline] = await Promise.all([
        getOverview(userId),
        getSpendChartData(userId),
        getRequestsTimelineData(userId),
      ]);
      setOverview(ov);
      setSpendData(spend);
      setTimelineData(timeline);
      setError(null);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      getOverview(userId),
      getSpendChartData(userId),
      getRequestsTimelineData(userId),
    ])
      .then(([ov, spend, timeline]) => {
        if (active) {
          setOverview(ov);
          setSpendData(spend);
          setTimelineData(timeline);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (active) setError(getErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const update = async (data: Partial<Overview>) => {
    if (!userId) return;
    try {
      await updateOverview(userId, data);
      setOverview((prev) => ({ ...prev, ...data }));
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return { overview, spendData, timelineData, loading, error, update, refetch: fetch };
}

// ─── useBilling ──────────────────────────────────────────────────────
export function useBilling() {
  const { userId } = useAuth();
  const [billing, setBilling] = useState<BillingData>({
    plan: "free",
    requestsUsed: 0,
    requestsLimit: 50000,
    paymentMethod: null,
    invoices: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await getBilling(userId);
      setBilling(data);
      setError(null);
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    let active = true;
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getBilling(userId)
      .then((data) => {
        if (active) {
          setBilling(data);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (active) setError(getErrorMessage(e));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const update = async (data: Partial<BillingData>) => {
    if (!userId) return;
    try {
      await updateBilling(userId, data);
      setBilling((prev) => ({ ...prev, ...data }));
    } catch (e: unknown) {
      setError(getErrorMessage(e));
    }
  };

  return { billing, loading, error, update, refetch: fetch };
}
