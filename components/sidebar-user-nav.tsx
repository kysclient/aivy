'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'
import { SignOutIcon } from './icons'
import { useScreenSize } from '@/hooks/use-screen-size'
import { MoreHorizontal } from 'lucide-react'

export function SidebarUserNav() {
    const screenSize = useScreenSize()
    const user = {
        profile_image: '/placeholder.svg',
        nickname: 'admin',
        email: 'admin@aivy.com'
    }
    return (
        <div className="w-full my-[12px] items-start">
            <Popover>
                <PopoverTrigger asChild>
                    {screenSize.isDesktop ? (
                        <button className="group flex items-center justify-between gap-2 transition-all duration-200 ease-in-out hover:bg-muted rounded-full p-1 w-full">
                            <div className="pl-[16px] group-hover:pl-0  flex flex-row items-center gap-2">
                                <div className="relative w-[48px] h-[48px] rounded-full flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-75">
                                    <Image src={user.profile_image || `https://avatar.vercel.sh/${user.nickname}`} alt={user.nickname ?? 'User Avatar'} width={48} height={48} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start opacity-0  group-hover:opacity-100">
                                    <span className="text-sm font-bold text-foreground break-all line-clamp-1">{user.nickname}</span>
                                    <span className="text-xs text-description break-all line-clamp-1">{user.email}</span>
                                </div>
                            </div>

                            <i className="text-muted-foreground opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 flex-shrink-0 pr-1">
                                <MoreHorizontal className="w-4 h-4" />
                            </i>
                        </button>
                    ) : (
                        <button className="p-1 group bg-muted rounded-full">
                            <div className="relative w-[48px] h-[48px] rounded-full flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-75">
                                <Image src={user.profile_image || `https://avatar.vercel.sh/${user.nickname}`} alt={user.nickname ?? 'User Avatar'} width={48} height={48} className="w-full h-full object-cover" />
                            </div>
                        </button>
                    )}
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
        </div>
    )
}

export const userPopOverContents = [
    {
        title: '로그아웃',
        icon: (
            <i>
                <SignOutIcon />
            </i>
        ),
        action: () => {
            // signOut({
            //     redirectTo: '/login'
            // })
        }
    }
]
