import type { Metadata, Viewport } from "next";
import DevToggle from "@/components/DevToggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "pra voce",
  description: "uma surpresa especial",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f5efe6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <DevToggle />
        <div className="paper-texture" />
        <main className="relative z-10 min-h-dvh">{children}</main>
      </body>
    </html>
  );
}
