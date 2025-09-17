import { Suspense } from 'react'
import { MainLayout } from '@/layouts/main-layout'
import { AppSidebar } from '@/components/app-sidebar'
import { AppAside } from '@/components/app-aside'
import { AppBottomNav } from '@/components/app-bottom-nav'
import { PageLoading } from '@/components/page-loading'
import { SocketProvider } from '@/providers/socket-provider'
import { Providers } from '@/providers/providers'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Providers>
          <div className="w-full relative min-h-[100vh]">
            <MainLayout>{children}</MainLayout>
            <AppSidebar />
            <AppAside />
            <AppBottomNav />
          </div>
        </Providers>
      </Suspense>
    </>
  )
}
