import type { Metadata } from "next";
import { ClerkClientProvider } from "@/components/providers/ClerkClientProvider";
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
    <ClerkClientProvider>
      <html lang="en">
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var hostname = window.location.hostname;
                  var isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]" || hostname.endsWith(".local");
                  if (!isLocalhost && hostname !== "throttle.web.app") {
                    window.location.replace("https://throttle.web.app" + window.location.pathname + window.location.search);
                  }
                })();
              `
            }}
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkClientProvider>
  );
}
