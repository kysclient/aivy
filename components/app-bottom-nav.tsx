'use client';
import {
  AiFilledIcon,
  AiIcon,
  BellFilledIcon,
  BellIcon,
  ChatFilledIcon,
  ChatIcon,
  ExploreFilledIcon,
  ExploreIcon,
  HomeFilledIcon,
  HomeIcon,
  LiveFilledIcon,
  LiveIcon,
  PlanFilledIcon,
  PlanIcon,
  SearchIcon,
  SettingFilledIcon,
  SettingIcon,
  TiktokLogo,
  UserFilledIcon,
  UserIcon,
} from './icons';
import { useScreenSize } from '@/hooks/use-screen-size';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { MessageBadge } from './ui/alarm-badge';
import { useAuth } from '@/providers/auth-provider';

export function AppBottomNav() {
  const screenSize = useScreenSize();
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      {screenSize.isMobile && (
        <>
          {user ? (
            <nav
              style={{
                padding:
                  '0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
                WebkitBackdropFilter: 'blur(24px)',
                backdropFilter: 'blur(24px)',
              }}
              role="navigation"
              className="w-full h-16 border-t border-border bg-background/70 z-50 fixed bottom-0 left-0 right-0 p-0 bg-blur-[24px]"
            >
              <div className="grid grid-cols-5 h-full w-full">
                {mobileNavLinks.map((link, idx) => {
                  const path = user
                    ? link.href === '/profile'
                      ? `${link.href}/${user?.nickname}`
                      : link.href
                    : link.href;
                  const isActive =
                    link.href === '/profile'
                      ? pathname.includes('profile')
                      : link.href === pathname;
                  const icon = isActive ? link.iconFilled(26) : link.icon(26);
                  return (
                    <div
                      key={`${link.href}_${idx}`}
                      className="flex justify-center items-center w-full"
                    >
                      <Link
                        href={path}
                        className={cn(
                          'relative text-foreground hover:bg-muted rounded-xl p-2',
                          pathname === link.href && 'font-bold'
                        )}
                      >
                        {link.href === '/messages' && <MessageBadge className="top-1 right-0" />}
                        {icon}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </nav>
          ) : (
            <div
              style={{
                padding:
                  '0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
                WebkitBackdropFilter: 'blur(24px)',
                backdropFilter: 'blur(24px)',
              }}
              className="z-50 w-full h-16 border-t border-border fixed bottom-0 bg-background/70 p-0 left-0 right-0 flex justify-center"
            >
              <div className="w-full px-4  flex flex-row items-center justify-between">
                <div className="flex flex-row gap-1 items-center justify-center">
                  <h1 className="text-3xl font-kakao font-bold font-primary">aivy</h1>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <Link href={'/auth'}>
                    <Button>가입하기</Button>
                  </Link>
                  <Link href={'/auth'}>
                    <Button variant={'secondary'}>로그인</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export const mobileNavLinks = [
  {
    title: '홈',
    icon: (size: number) => <HomeIcon size={size} />,
    iconFilled: (size: number) => <HomeFilledIcon size={size} />,
    href: '/',
  },
  {
    title: '상품추천',
    icon: (size: number) => <ExploreIcon size={size} />,
    iconFilled: (size: number) => <ExploreFilledIcon size={size} />,
    href: '/products',
  },
  {
    title: '식단생성',
    icon: (size: number) => <AiIcon size={size} />,
    iconFilled: (size: number) => <AiFilledIcon size={size} />,
    href: '/meal-plan',
  },
  {
    title: '나만의 식단',
    icon: (size: number) => <PlanIcon size={size} />,
    iconFilled: (size: number) => <PlanFilledIcon size={size} />,
    href: '/plans',
  },
  {
    title: '설정',
    icon: (size: number) => <SettingIcon size={size} />,
    iconFilled: (size: number) => <SettingFilledIcon size={size} />,
    href: '/settings',
  },
];
