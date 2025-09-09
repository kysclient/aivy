import Image from 'next/image'
import { Button } from './ui/button'
import { ChatIcon, TiktokLogo } from './icons'
import { Separator } from './ui/separator'
import { SidebarNavLinks } from './sidebar-nav-links'
import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { userPopOverContents } from './sidebar-user-nav'

export function AppMobileSidebar() {

    const user = {
        user_id: 1,
        profile_image: '/placeholder-user.jpg',
        nickname: 'admin',
        email: 'admin@aivy.com'
    }
    return (
        <nav role="navigation" className="min-h-[100dvh] sm:min-h-screen  overflow-y-auto">
            <div className="p-4 flex flex-col justify-between h-full pb-8">
                <div>
                    {user && (
                        <>
                            <div className="">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className="mb-[10px] relative w-[48px] h-[48px] rounded-full flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-75">
                                            <Image src={user.profile_image || `https://avatar.vercel.sh/${user.user_id}`} alt={user.nickname ?? 'User Avatar'} width={48} height={48} className="w-full h-full object-cover" />
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-36 p-1">
                                        <div className="flex flex-col space-y-[10px]">
                                            {userPopOverContents.map((item, idx) => (
                                                <button onClick={item.action} key={idx} className="w-full rounded-md p-2 flex flex-row items-center gap-4 hover:bg-muted-hover">
                                                    {item.icon}
                                                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <div>
                                    <h1 className="font-bold text-xl">{user.nickname}</h1>
                                    <p className="text-description">{user.email}</p>
                                    <p className="text-description text-sm">
                                        <span className="text-foreground">0 </span>팔로워{' · '}
                                        <span className="text-foreground">1 </span>팔로우 중
                                    </p>
                                </div>
                            </div>
                            <Separator className="my-[12px] sm:my-[20px]" />
                        </>
                    )}
                    {!user && (
                        <div className="flex flex-col gap-[10px] w-full my-[12px]">
                            <h1>Aivy</h1>
                            <h1 className="text-2xl font-bold">대화에 참여하기</h1>
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
                    <SidebarNavLinks />
                    <Separator className="my-[12px] sm:my-[20px]" />
                    <div className="flex flex-col gap-[10px]">
                        <Link href="/terms-of-service" className="hover:underline text-primary text-sm">
                            서비스 이용약관
                        </Link>
                        <Link href={'/privacy-policy'} className="hover:underline text-primary text-sm">
                            개인정보 처리방침
                        </Link>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-2 py-4 text-xs sm:text-sm md:text-md">
                    <Button variant={'secondary'} className="">
                        <ChatIcon size={9} />
                        피드백
                    </Button>
                    <Button variant={'outline'}>도움말</Button>
                </div>
            </div>
        </nav>
    )
}
