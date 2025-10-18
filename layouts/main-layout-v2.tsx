'use client';

import { PostFloatingButton } from '@/components/post-floating-button';
import { HeaderV2 } from '@/components/v2/header-v2';
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

export function MainLayoutV2({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const screenSize = useScreenSize();

  return (
    <>
      <div className="group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar isolate">
        <div
          style={{
            containerType: 'inline-size',
          }}
          className="flex w-full h-full overflow-hidden @container/mainview"
        >
          <main
            style={{
              containerType: 'inline-size',
            }}
            className={
              'h-dvh flex-grow flex-shrink relative selection:bg-background isolate print:h-full print:prose print:max-w-none'
            }
          >
            <HeaderV2 />
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
