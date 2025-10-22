'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { useScreenSize } from '@/hooks/use-screen-size';
import { useAuth } from '@/providers/auth-provider';
import { cn } from '@/lib/utils';
import { SignOutIcon } from '../icons';

export function UserAvatar({ iconClassName }: { iconClassName?: string }) {
    const { user, logout } = useAuth();

    const screenSize = useScreenSize();

    const userPopOverContents = [
        {
            title: '로그아웃',
            icon: (
                <i>
                    <SignOutIcon />
                </i>
            ),
            action: () => {
                logout();
            },
        },
    ];

    return (
        <div className="w-full my-[12px] items-start">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="p-1 group bg-muted rounded-full">
                        <div className={cn("relative w-[24px] h-[24px] rounded-full flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-75", iconClassName)}>
                            <Image
                                src={user?.profileImage || `https://avatar.vercel.sh/${user?.name}`}
                                alt={user?.name ?? user?.nickname ?? 'User Avatar'}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-36 p-1">
                    <div className="flex flex-col space-y-[10px]">
                        {userPopOverContents.map((item, idx) => (
                            <button
                                onClick={item.action}
                                key={idx}
                                className="w-full rounded-md p-2 flex flex-row items-center gap-4 hover:bg-muted-hover"
                            >
                                {item.icon}
                                <span className="text-sm font-semibold text-foreground">{item.title}</span>
                            </button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
