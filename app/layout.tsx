import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@/styles/globals.css'
import { Suspense } from "react"
import { ThemeProvider } from "@/providers/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { MainLayout } from "@/layouts/main-layout";
import { AppSidebar } from "@/components/app-sidebar";
import { AppAside } from "@/components/app-aside";
import { AppBottomNav } from "@/components/app-bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aivy - AI 자동식단생성",
  description: "AI 기반 맞춤형 식단 계획 서비스",
  generator: "aivy",
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="w-full relative min-h-[100vh]">
              <MainLayout>{children}</MainLayout>

              <AppSidebar />
              <AppAside />
              <AppBottomNav />
            </div>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
