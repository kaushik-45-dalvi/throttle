"use client";

import React from "react";

interface BauhausShapeProps {
  variant?: "circle" | "square" | "semicircle" | "quarter";
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

export function BauhausShape({
  variant = "circle",
  size = 80,
  color = "#E8391D",
  className = "",
  style = {},
  animate = false,
}: BauhausShapeProps) {
  const base: React.CSSProperties = {
    width: size,
    height: size,
    flexShrink: 0,
    ...style,
  };

  if (variant === "circle") {
    return (
      <div
        className={`${className} ${animate ? "animate-spin-slow" : ""}`}
        style={{ ...base, borderRadius: "50%", background: color }}
      />
    );
  }

  if (variant === "square") {
    return (
      <div
        className={className}
        style={{ ...base, background: color }}
      />
    );
  }

  if (variant === "semicircle") {
    return (
      <div
        className={className}
        style={{
          ...base,
          height: size / 2,
          background: color,
          borderRadius: `${size}px ${size}px 0 0`,
        }}
      />
    );
  }

  if (variant === "quarter") {
    return (
      <div
        className={className}
        style={{
          ...base,
          background: color,
          borderRadius: `0 ${size}px 0 0`,
        }}
      />
    );
  }

  return null;
}

/* ── Bauhaus Hero Composition ────────────── */
export function BauhausComposition({ size = 320 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 360 360"
      width={size}
      height={size}
      style={{
        flexShrink: 0,
        width: "100%",
        height: "100%",
        maxWidth: size,
        maxHeight: size,
      }}
    >
      {/* Big blue circle — top left */}
      <circle cx="90" cy="90" r="90" fill="#1B4FD8" />
      {/* Red square — top right */}
      <rect x="180" y="0" width="180" height="180" fill="#E8391D" />
      {/* Yellow circle — bottom left */}
      <circle cx="90" cy="270" r="90" fill="#F5C800" />
      {/* Black square — bottom right */}
      <rect x="180" y="180" width="180" height="180" fill="#1A1A1A" />
      {/* White circle overlay — center */}
      <circle cx="180" cy="180" r="99" fill="#F5F0E8" />
      {/* Inner red circle */}
      <circle cx="180" cy="180" r="63" fill="#E8391D" />
    </svg>
  );
}

/* ── Small geometric accent row ─────────── */
export function BauhausAccentRow() {
  return (
    <div style={{ display: "flex", gap: 0 }}>
      <div style={{ width: 48, height: 8, background: "#E8391D" }} />
      <div style={{ width: 48, height: 8, background: "#1B4FD8" }} />
      <div style={{ width: 48, height: 8, background: "#F5C800" }} />
      <div style={{ width: 48, height: 8, background: "#1A1A1A" }} />
    </div>
  );
}
