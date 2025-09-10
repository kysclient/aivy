'use client'
import { AiFilledIcon, AiIcon, BellFilledIcon, BellIcon, ChatFilledIcon, ChatIcon, ExploreFilledIcon, ExploreIcon, HomeFilledIcon, HomeIcon, LiveFilledIcon, LiveIcon, SearchIcon, SettingFilledIcon, SettingIcon, TiktokLogo, UserFilledIcon, UserIcon } from './icons'
import { useScreenSize } from '@/hooks/use-screen-size'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { MessageBadge } from './ui/alarm-badge'

export function AppBottomNav() {
    const screenSize = useScreenSize()
    const pathname = usePathname()
    const user = {
        profile_image: '/placeholder-user.jpg',
        nickname: 'admin',
        email: 'admin@aivy.com'
    }

    return (
        <>
            {screenSize.isMobile && (
                <>
                    {user ? (
                        <nav role="navigation" className="w-full h-16 border-t border-border fixed bottom-0 left-0 bg-background z-50">
                            <div className="grid grid-cols-4 h-full w-full">
                                {mobileNavLinks.map((link, idx) => {
                                    const path = user ? (link.href === '/profile' ? `${link.href}/${user?.nickname}` : link.href) : link.href
                                    const isActive = link.href === '/profile' ? pathname.includes('profile') : link.href === pathname
                                    const icon = isActive ? link.iconFilled(26) : link.icon(26)
                                    return (
                                        <div key={`${link.href}_${idx}`} className="flex justify-center items-center w-full">
                                            <Link href={path} className={cn('relative text-foreground hover:bg-muted rounded-xl p-2', pathname === link.href && 'font-bold')}>
                                                {link.href === '/messages' && <MessageBadge className="top-1 right-0" />}
                                                {icon}
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </nav>
                    ) : (
                        <div className="z-50 w-full h-16 border-t border-border px-4 fixed bottom-0 left-0 bg-background flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-1 items-center">
                                <h1 className="font-serif text-5xl italic">
                                    Aivy
                                </h1>
                            </div>
                            <div className="flex flex-row gap-2 items-center">
                                <Link href={'/register'}>
                                    <Button>가입하기</Button>
                                </Link>
                                <Link href={'/login'}>
                                    <Button variant={'secondary'}>로그인</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export const mobileNavLinks = [
    {
        title: '홈',
        icon: (size: number) => <HomeIcon size={size} />,
        iconFilled: (size: number) => <HomeFilledIcon size={size} />,
        href: '/'
    },
    {
        title: '상품추천',
        icon: (size: number) => <ExploreIcon size={size} />,
        iconFilled: (size: number) => <ExploreFilledIcon size={size} />,
        href: '/products'
    },
    {
        title: '식단생성',
        icon: (size: number) => <AiIcon size={size} />,
        iconFilled: (size: number) => <AiFilledIcon size={size} />,
        href: '/meal-plan'
    },
    {
        title: '설정',
        icon: (size: number) => <SettingIcon size={size} />,
        iconFilled: (size: number) => <SettingFilledIcon size={size} />,
        href: '/settings'
    },
]
