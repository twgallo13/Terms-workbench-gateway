import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Terms Workbench Gateway",
  description: "Vendor onboarding and terms management platform for Shiekh Shoes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Idempotent SW unregister — ensures no stale service worker interferes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  regs.forEach(function(r) { r.unregister(); });
                });
                caches.keys().then(function(names) {
                  names.forEach(function(name) { caches.delete(name); });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
