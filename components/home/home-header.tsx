'use client'

import { useScreenSize } from '@/hooks/use-screen-size'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { BellIcon, TiktokLogo } from '@/components/icons'
import Link from 'next/link'
import { AppMobileSidebar } from '../sidebar-mobile'

export function HomeHeader({ children }: { children?: React.ReactNode }) {
    const screenSize = useScreenSize()
    const [headerVisible, setHeaderVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setHeaderVisible(false)
            } else if (currentScrollY < lastScrollY) {
                setHeaderVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])
    return (
        <>
            {/* pc  */}
            <div
                className="flex flex-row items-center"
                style={{
                    padding: '12px 20px 8px',
                    display: screenSize.isMobile ? 'none' : 'flex'
                }}
            >
                <div className="w-[34px]"></div>
                <div
                    className="items-center justify-center flex"
                    style={{
                        flex: '1 1 0%'
                    }}
                >
                    <h1>Aivy</h1>
                </div>
                <div className="w-[34px]"></div>
            </div>

            <div
                className="w-full"
                style={{
                    display: screenSize.isMobile ? 'none' : 'block'
                }}
            >
                {children}
            </div>

            {/*  */}

            {/* mobile */}
            <div
                style={{
                    display: !screenSize.isMobile ? 'none' : 'flex'
                }}
                className={`bg-background fixed flex flex-col  top-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div
                    className="flex flex-row items-center w-full"
                    style={{
                        padding: '12px 20px 8px'
                    }}
                >
                    <div className="justify-center">
                        <Sheet key={'mobile-sidebar'}>
                            <SheetTrigger asChild>
                                <Menu className="w-[28px] h-[28px] text-description" />
                            </SheetTrigger>
                            <SheetContent side={'left'}>
                                <SheetTitle></SheetTitle>
                                <AppMobileSidebar />
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div
                        className="items-center justify-center flex"
                        style={{
                            flex: '1 1 0%'
                        }}
                    >
                        <h1>Aivy</h1>
                    </div>
                    <div className="w-[34px] text-description">
                        <Link href={'/notifications'}>
                            <BellIcon size={24} />
                        </Link>
                    </div>
                </div>
                {children}
            </div>
            {/*  */}
        </>
    )
}
