import { Suspense } from "react"
import { ThemeProvider } from "@/providers/theme-provider";
import { MainLayout } from "@/layouts/main-layout";
import { AppSidebar } from "@/components/app-sidebar";
import { AppAside } from "@/components/app-aside";
import { AppBottomNav } from "@/components/app-bottom-nav";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
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
        </>
    )
}