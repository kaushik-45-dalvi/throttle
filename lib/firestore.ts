// Firestore CRUD service layer for Throttle
// All data is scoped per Clerk userId under users/{userId}/...

import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";

// ─── Types ───────────────────────────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  provider: string;
  model: string;
  budget: number;
  spent: number;
  costToday: number;
  savedToday: number;
  requestsToday: number;
  color: string;
  createdAt: string;
}

export interface ApiKey {
  id: string;
  name: string;
  project: string;
  provider: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
  requestsTotal: number;
}

export interface Alert {
  id: string;
  project: string;
  type: string;
  limitUsd: number;
  currentUsd: number;
  pct: number;
  channels: string[];
  status: string;
  createdAt: string;
}

export interface RequestLog {
  id: string;
  batchId: string;
  project: string;
  provider: string;
  model: string;
  inputTokens: number;
  outputTokens: number;
  costUsd: number;
  savingsUsd: number;
  latencyMs: number;
  status: string;
  timestamp: string;
  batchSize: number;
}

export interface Overview {
  totalSaved: number;
  savedThisMonth: number;
  savedThisWeek: number;
  savedToday: number;
  actualSpend: number;
  projectedSpend: number;
  requestsToday: number;
  batchedToday: number;
  avgSavingPct: number;
}

export interface SpendDataPoint {
  date: string;
  actual: number;
  projected: number;
}

export interface RequestsTimelinePoint {
  time: string;
  batched: number;
  unbatched: number;
}

export interface BillingData {
  plan: string;
  requestsUsed: number;
  requestsLimit: number;
  paymentMethod: {
    type: string;
    last4: string;
    expiry: string;
  } | null;
  invoices: {
    id: string;
    date: string;
    amount: string;
    status: string;
  }[];
}

// ─── Helper ──────────────────────────────────────────────────────────
function userPath(userId: string) {
  return `users/${userId}`;
}

// ─── User Initialization ─────────────────────────────────────────────
export async function initUserIfNeeded(
  userId: string,
  email?: string,
  fullName?: string
): Promise<void> {
  const userRef = doc(db, userPath(userId));
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    // Create user doc
    await setDoc(userRef, {
      email: email || "",
      fullName: fullName || "",
      plan: "free",
      createdAt: new Date().toISOString(),
    });

    // Seed overview
    await setDoc(doc(db, userPath(userId), "data", "overview"), {
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

    // Seed billing
    await setDoc(doc(db, userPath(userId), "data", "billing"), {
      plan: "free",
      requestsUsed: 0,
      requestsLimit: 50000,
      paymentMethod: null,
      invoices: [],
    });

    // Seed spend chart data
    await setDoc(doc(db, userPath(userId), "data", "spendChart"), {
      data: [],
    });

    // Seed requests timeline data
    await setDoc(doc(db, userPath(userId), "data", "requestsTimeline"), {
      data: [],
    });
  }
}

// ─── Overview ────────────────────────────────────────────────────────
export async function getOverview(userId: string): Promise<Overview> {
  const snap = await getDoc(doc(db, userPath(userId), "data", "overview"));
  if (snap.exists()) return snap.data() as Overview;
  return {
    totalSaved: 0,
    savedThisMonth: 0,
    savedThisWeek: 0,
    savedToday: 0,
    actualSpend: 0,
    projectedSpend: 0,
    requestsToday: 0,
    batchedToday: 0,
    avgSavingPct: 0,
  };
}

export async function updateOverview(
  userId: string,
  data: Partial<Overview>
): Promise<void> {
  await updateDoc(doc(db, userPath(userId), "data", "overview"), data);
}

// ─── Spend Chart Data ────────────────────────────────────────────────
export async function getSpendChartData(
  userId: string
): Promise<SpendDataPoint[]> {
  const snap = await getDoc(doc(db, userPath(userId), "data", "spendChart"));
  if (snap.exists()) return (snap.data().data as SpendDataPoint[]) || [];
  return [];
}

// ─── Requests Timeline Data ─────────────────────────────────────────
export async function getRequestsTimelineData(
  userId: string
): Promise<RequestsTimelinePoint[]> {
  const snap = await getDoc(
    doc(db, userPath(userId), "data", "requestsTimeline")
  );
  if (snap.exists())
    return (snap.data().data as RequestsTimelinePoint[]) || [];
  return [];
}

// ─── Projects ────────────────────────────────────────────────────────
export async function getProjects(userId: string): Promise<Project[]> {
  const colRef = collection(db, userPath(userId), "projects");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
}

export async function addProject(
  userId: string,
  data: Omit<Project, "id">
): Promise<string> {
  const colRef = collection(db, userPath(userId), "projects");
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

export async function updateProject(
  userId: string,
  projectId: string,
  data: Partial<Project>
): Promise<void> {
  await updateDoc(doc(db, userPath(userId), "projects", projectId), data);
}

export async function deleteProject(
  userId: string,
  projectId: string
): Promise<void> {
  await deleteDoc(doc(db, userPath(userId), "projects", projectId));
}

// ─── API Keys ────────────────────────────────────────────────────────
export async function getApiKeys(userId: string): Promise<ApiKey[]> {
  const colRef = collection(db, userPath(userId), "apiKeys");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as ApiKey));
}

export async function addApiKey(
  userId: string,
  data: Omit<ApiKey, "id">
): Promise<string> {
  const colRef = collection(db, userPath(userId), "apiKeys");
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

export async function deleteApiKey(
  userId: string,
  keyId: string
): Promise<void> {
  await deleteDoc(doc(db, userPath(userId), "apiKeys", keyId));
}

// ─── Alerts ──────────────────────────────────────────────────────────
export async function getAlerts(userId: string): Promise<Alert[]> {
  const colRef = collection(db, userPath(userId), "alerts");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Alert));
}

export async function addAlert(
  userId: string,
  data: Omit<Alert, "id">
): Promise<string> {
  const colRef = collection(db, userPath(userId), "alerts");
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

export async function deleteAlert(
  userId: string,
  alertId: string
): Promise<void> {
  await deleteDoc(doc(db, userPath(userId), "alerts", alertId));
}

// ─── Requests ────────────────────────────────────────────────────────
export async function getRequests(userId: string): Promise<RequestLog[]> {
  const colRef = collection(db, userPath(userId), "requests");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as RequestLog));
}

export async function addRequest(
  userId: string,
  data: Omit<RequestLog, "id">
): Promise<string> {
  const colRef = collection(db, userPath(userId), "requests");
  const docRef = await addDoc(colRef, data);
  return docRef.id;
}

// ─── Billing ─────────────────────────────────────────────────────────
export async function getBilling(userId: string): Promise<BillingData> {
  const snap = await getDoc(doc(db, userPath(userId), "data", "billing"));
  if (snap.exists()) return snap.data() as BillingData;
  return {
    plan: "free",
    requestsUsed: 0,
    requestsLimit: 50000,
    paymentMethod: null,
    invoices: [],
  };
}

export async function updateBilling(
  userId: string,
  data: Partial<BillingData>
): Promise<void> {
  await updateDoc(doc(db, userPath(userId), "data", "billing"), data);
}
