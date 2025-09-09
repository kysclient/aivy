'use client'
import { useScreenSize } from '@/hooks/use-screen-size'
import { Button } from './ui/button'
import Link from 'next/link'
import { FeatherIcon } from './icons'
import { SidebarUserNav } from './sidebar-user-nav'
import SidebarNavLinks from './sidebar-nav-links'

export function AppSidebar() {
    const screenSize = useScreenSize()
    const user = true;
    return (
        <nav
            role="navigation"
            className="sidebar-nav min-h-[100dvh] sm:min-h-screen left-[50%] py-[10px] fixed overflow-y-auto top-0 border-r h-full border-border"
            style={{
                transform: 'translateX(-310px) translateX(-100%)',
                paddingLeft: '20px',
                paddingRight: '18px',
                width: screenSize.isTablet ? 86 : 240,
                display: user ? (screenSize.isMobile ? 'none' : 'block') : screenSize.isDesktop ? 'block' : 'none'
            }}
        >

            {user ? (
                <>
                    {/* <h1 className='font-bold text-3xl p-2 mb-2'>Aivy</h1> */}
                    {user && <SidebarUserNav />}

                    <SidebarNavLinks />

                    {screenSize.isDesktop && (
                        <div className="flex pl-[12px] pt-[20px]">
                            <Link href={'/meal-plan'}
                                className="rounded-full text-white px-[20px] py-[13px] gap-[8px] flex flex-row items-center bg-primary font-bold hover:bg-primary/90 transition duration-200"
                            >
                                <FeatherIcon className="text-white w-5 h-5" />식단생성
                            </Link>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col gap-[10px] w-full my-[12px]">
                    <h1 className="font-serif text-5xl italic">
                        Aivy
                    </h1>
                    <h1 className="text-2xl font-bold">대화에 참여하기</h1>
                    <div className="flex flex-row gap-2 items-center">
                        <Link href={'/register'}>
                            <Button>가입하기</Button>
                        </Link>
                        <Link href={'/login'}>
                            <Button variant={'secondary'}>로그인</Button>
                        </Link>
                    </div>
                    <SidebarNavLinks />
                </div>
            )}
        </nav>
    )
}
