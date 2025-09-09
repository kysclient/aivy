'use client'

import { useScreenSize } from '@/hooks/use-screen-size'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

interface PaddingConfig {
  path: string
  className: string
}

export function MainLayout({ children }: { children: React.ReactNode }) {
  const screenSize = useScreenSize()
  const pathname = usePathname()
  const isProfile = pathname.startsWith('/profile')
  const paddingConfigs: PaddingConfig[] = [
    { path: '/', className: 'pt-[108px]' },
    { path: '/live', className: 'pt-[113px]' }
  ]

  const paddingClass = useMemo(() => {
    if (!screenSize.isMobile) return ''
    let config
    config = paddingConfigs.find((item) => item.path === pathname)
    return config ? config.className : !isProfile ? 'pt-[53px]' : ''
  }, [pathname, screenSize.isMobile])

  const desktopContainerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '0px 0px 0px 50%',
    width: 607,
    transform: 'translateX(-51%)',
    height: 'full'
    // overflowY: 'auto'
  }

  return (
    <>
      <div className={cn('', screenSize.isMobile ? 'pb-16' : '', paddingClass)} style={screenSize.isMobile ? undefined : desktopContainerStyle}>
        {children}
      </div>
    </>
  )
}
