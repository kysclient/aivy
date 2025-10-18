import { Suspense } from 'react';
import { MainLayout } from '@/layouts/main-layout';
import { AppSidebar } from '@/components/app-sidebar';
import { AppAside } from '@/components/app-aside';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { PageLoading } from '@/components/page-loading';
import { Providers } from '@/providers/providers';
import { MainLayoutV2 } from '@/layouts/main-layout-v2';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Providers>
            <MainLayoutV2>{children}</MainLayoutV2>
        </Providers>
      </Suspense>
    </>
  );
}
