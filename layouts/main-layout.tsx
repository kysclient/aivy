'use client';

import { PostFloatingButton } from '@/components/post-floating-button';
import { useScreenSize } from '@/hooks/use-screen-size';
import TokenManager from '@/lib/token-manager';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-provider';
import { useSocket } from '@/providers/socket-provider';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

interface PaddingConfig {
  path: string;
  className: string;
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const screenSize = useScreenSize();
  const pathname = usePathname();
  const isProfile = pathname.startsWith('/profile');
  const paddingConfigs: PaddingConfig[] = [
    { path: '/posts', className: 'pt-[104px]' },
  ];

  const paddingClass = useMemo(() => {
    if (!screenSize.isMobile) return '';
    let config;
    config = paddingConfigs.find((item) => item.path === pathname);
    return config ? config.className : !isProfile ? 'pt-[53px]' : '';
  }, [pathname, screenSize.isMobile]);

  const desktopContainerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0px 0px 0px 50%',
    width: 607,
    transform: 'translateX(-51%)',
    height: 'full',
    // overflowY: 'auto'
  };

  return (
    <>
      <div
        className={cn('', screenSize.isMobile ? 'pb-16' : '', paddingClass)}
        style={screenSize.isMobile ? undefined : desktopContainerStyle}
      >
        {children}
      </div>
      {!screenSize.isDesktop && pathname === '/posts' && <PostFloatingButton user={user} />}
    </>
  );
}
