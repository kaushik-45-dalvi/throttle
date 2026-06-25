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
  const u = size / 4; // unit
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Big blue circle — top left */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: u * 2, height: u * 2,
          borderRadius: "50%",
          background: "#1B4FD8",
        }}
      />
      {/* Red square — top right */}
      <div
        style={{
          position: "absolute",
          top: 0, left: u * 2,
          width: u * 2, height: u * 2,
          background: "#E8391D",
        }}
      />
      {/* Yellow circle — bottom left */}
      <div
        style={{
          position: "absolute",
          top: u * 2, left: 0,
          width: u * 2, height: u * 2,
          borderRadius: "50%",
          background: "#F5C800",
        }}
      />
      {/* Black square — bottom right */}
      <div
        style={{
          position: "absolute",
          top: u * 2, left: u * 2,
          width: u * 2, height: u * 2,
          background: "#1A1A1A",
        }}
      />
      {/* White circle overlay — center */}
      <div
        style={{
          position: "absolute",
          top: u * 0.9, left: u * 0.9,
          width: u * 2.2, height: u * 2.2,
          borderRadius: "50%",
          background: "#F5F0E8",
        }}
      />
      {/* Inner red circle */}
      <div
        style={{
          position: "absolute",
          top: u * 1.3, left: u * 1.3,
          width: u * 1.4, height: u * 1.4,
          borderRadius: "50%",
          background: "#E8391D",
        }}
      />
    </div>
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
