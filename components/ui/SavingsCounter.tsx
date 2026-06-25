"use client";

import { useEffect, useRef, useState } from "react";

interface SavingsCounterProps {
  value: number;       // in USD cents
  label?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

export function SavingsCounter({
  value,
  label,
  prefix = "$",
  duration = 2000,
  className = "",
  size = "lg",
  color,
}: SavingsCounterProps) {
  const [display, setDisplay] = useState(0);
  const [ticking, setTicking] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    startRef.current = start;
    setTicking(true);

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * value));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
        setTicking(false);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  // Format display value
  const dollars = display / 100;
  let formatted: string;
  if (dollars >= 1000) {
    formatted = `${prefix}${(dollars / 1000).toFixed(1)}k`;
  } else {
    formatted = `${prefix}${dollars.toFixed(0)}`;
  }

  const sizeMap = {
    sm: "28px",
    md: "40px",
    lg: "64px",
    xl: "96px",
  };

  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: sizeMap[size],
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: color || "var(--black)",
          transition: "color 0.2s",
        }}
      >
        {formatted}
      </div>
      {label && (
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: color ? "rgba(255,255,255,0.7)" : "var(--gray-500)",
          }}
        >
          {label}
        </div>
      )}
      {ticking && (
        <div
          style={{
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#2EA55A",
            animation: "pulse-dot 1s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}
