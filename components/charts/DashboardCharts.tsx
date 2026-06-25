"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { mockSpendData, mockRequestsTimeline } from "@/lib/mock-data";

interface SpendChartProps { height?: number; }
interface TimelineChartProps { height?: number; }

const CustomTooltipSpend = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--gray-200)",
        borderRadius: "8px",
        padding: "12px 16px",
        fontFamily: "'Space Grotesk', sans-serif",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div style={{ color: "var(--black)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, fontSize: 13, fontWeight: 600, display: "flex", gap: 8 }}>
          <span style={{ opacity: 0.7, color: "var(--gray-500)" }}>{p.name}:</span>
          <span>${p.value}</span>
        </div>
      ))}
    </div>
  );
};

const CustomTooltipTimeline = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--white)",
        border: "1px solid var(--gray-200)",
        borderRadius: "8px",
        padding: "12px 16px",
        fontFamily: "'Space Grotesk', sans-serif",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div style={{ color: "var(--black)", fontSize: 12, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, fontSize: 13, fontWeight: 600, display: "flex", gap: 8 }}>
          <span style={{ opacity: 0.7, color: "var(--gray-500)" }}>{p.name}:</span>
          <span>{p.value} calls</span>
        </div>
      ))}
    </div>
  );
};

const tickStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: 11,
  fontWeight: 700,
  fill: "var(--gray-500)",
  letterSpacing: "0.06em",
};

export function SpendComparisonChart({ height = 280 }: SpendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={mockSpendData} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
        <defs>
          <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--red)" stopOpacity={0.15} />
            <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="0" stroke="var(--gray-200)" strokeWidth={1} vertical={false} />
        <XAxis dataKey="date" tick={tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltipSpend />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 12 }}
        />
        <Area
          type="monotone"
          dataKey="projected"
          name="Without Throttle"
          stroke="var(--red)"
          strokeWidth={2}
          fill="url(#projGrad)"
          strokeDasharray="6 3"
        />
        <Area
          type="monotone"
          dataKey="actual"
          name="With Throttle"
          stroke="var(--blue-dark)"
          strokeWidth={2.5}
          fill="url(#actualGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RequestsTimelineChart({ height = 220 }: TimelineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={mockRequestsTimeline} margin={{ top: 8, right: 8, bottom: 0, left: -8 }} barGap={4}>
        <CartesianGrid strokeDasharray="0" stroke="var(--gray-200)" strokeWidth={1} vertical={false} />
        <XAxis dataKey="time" tick={tickStyle} axisLine={false} tickLine={false} />
        <YAxis tick={tickStyle} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltipTimeline />} />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", paddingTop: 12 }}
        />
        <Bar dataKey="batched" name="Batched Calls" fill="var(--blue-dark)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="unbatched" name="Upstream Calls" fill="var(--red)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
