import type { Metadata, Viewport } from "next";
import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "0°C的衣柜",
  description: "从工厂打样到上架，记录每一件衣服的诞生",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body className="min-h-screen bg-bg text-text-primary pb-[68px]">
        <main className="max-w-lg mx-auto w-full">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
