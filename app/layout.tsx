import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Launchpad - Pre-Seed Founder Toolkit",
  description: "Generate landing pages, collect signups, and track metrics for your startup.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
