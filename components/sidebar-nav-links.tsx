'use client'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useScreenSize } from '@/hooks/use-screen-size'
import { BellFilledIcon, BellIcon, ChatFilledIcon, ChatIcon, ExploreFilledIcon, ExploreIcon, HomeFilledIcon, HomeIcon, LiveFilledIcon, LiveIcon, SettingFilledIcon, SettingIcon, UserFilledIcon, UserIcon } from './icons'
import { JSX, useEffect, useMemo, useState } from 'react'

interface NavLink {
    title: string
    icon: ({ size }: { size?: number }) => JSX.Element
    iconFilled: ({ size }: { size?: number }) => JSX.Element
    href: string
    hasSubPaths?: boolean
    authRequired: boolean
}

export const navLinks: NavLink[] = [
    { title: '홈', icon: HomeIcon, iconFilled: HomeFilledIcon, href: '/', authRequired: false },
    { title: '상품추천', icon: ExploreIcon, iconFilled: ExploreFilledIcon, href: '/products', authRequired: false },
    { title: '식단생성', icon: LiveIcon, iconFilled: LiveFilledIcon, href: '/meal-plan', authRequired: false },
    //   { title: '알림', icon: BellIcon, iconFilled: BellFilledIcon, href: '/notifications', hasSubPaths: true, authRequired: true },
    //   { title: '메세지', icon: ChatIcon, iconFilled: ChatFilledIcon, href: '/messages', hasSubPaths: true, authRequired: true },
    //   { title: '프로필', icon: UserIcon, iconFilled: UserFilledIcon, href: '/profile', hasSubPaths: true, authRequired: true },
    { title: '설정', icon: SettingIcon, iconFilled: SettingFilledIcon, href: '/settings', hasSubPaths: true, authRequired: false }
]

export function SidebarNavLinks() {
    const pathname = usePathname()
    const { isDesktop, isMobile, isTablet } = useScreenSize()
    const iconSize = useMemo(() => (isDesktop ? 24 : 26), [isDesktop])

    return (
        <nav className="flex flex-col gap-2 w-full">
            {navLinks.map((link) => {
                // if (link.authRequired && !user) {
                //     return
                // }
                // const path = user && link.href === '/profile' ? `${link.href}/${user?.nickname}` : link.href
                const path = link.href
                const isActive = link.hasSubPaths ? pathname.startsWith(link.href) : pathname === link.href
                const IconComponent = isActive ? link.iconFilled : link.icon

                return (
                    <Link href={path} key={link.href} className={cn('w-full text-sm sm:text-lg flex text-foreground font-medium flex-row items-center px-[10px] py-[8px] sm:py-[12px] rounded-[8px] hover:bg-muted gap-[8px]', isActive && 'font-bold')} aria-current={isActive ? 'page' : undefined}>
                        <span className="relative">
                            <IconComponent size={iconSize} />
                            {/* {link.href === '/messages' && <MessageBadge className="top-[0.5] right-0 md:top-1" />} */}
                        </span>

                        {(isDesktop || isMobile) && link.title}
                    </Link>
                )
            })}
        </nav>
    )
}

export default SidebarNavLinks
