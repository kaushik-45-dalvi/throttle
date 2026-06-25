import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Throttle — Request Batching & Cost Optimization Proxy",
  description:
    "Throttle slashes your API costs by up to 80% through intelligent request batching. One proxy. 80% less spend.",
  keywords: "API proxy, request batching, OpenAI cost, API optimization, cost reduction",
  authors: [{ name: "Kaushik Dalvi" }],
  openGraph: {
    title: "Throttle — One proxy. 80% less spend.",
    description: "Drop-in request batching proxy that slashes API costs for developers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
