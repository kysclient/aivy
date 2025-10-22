'use client';
import Particles from '@/components/particles';
import { Input } from '@/components/ui/input';
import { useScreenSize } from '@/hooks/use-screen-size';
import { cn } from '@/lib/utils';
import { Rocket, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

export function HomeMain() {
  const { theme, setTheme, systemTheme } = useTheme();
  const { isMobile } = useScreenSize();
  const [title, setTitle] = useState('');
  const router = useRouter();
  // 다크 모드 여부 판단
  const isDarkMode = useMemo(() => {
    if (theme === 'system') {
      return systemTheme === 'dark';
    }
    return theme === 'dark' || theme === 'deep-dark';
  }, [theme, systemTheme]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    // URL 인코딩하여 식단 생성 페이지로 이동
    router.push(`/v2/meal-plan?title=${encodeURIComponent(title.trim())}`);
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-2 mx-auto justify-center sm:p-4 sm:gap-9 isolate mt-16 sm:mt-0 overflow-hidden">
      <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={1000} />
      <div className="flex flex-col items-center gap-6 h-[450px] w-full @sm:pt-12 isolate transition-transform">
        {/* 로고섹션 */}
        <div className="flex flex-col items-center justify-center w-full sm:px-4 px-2 gap-6 sm:gap-4 xl:w-4/5 flex-initial pb-0 max-w-breakout">
          <h1 className="text-foreground text-5xl font-bold">aivy</h1>
        </div>
        {/* 메인섹션 */}
        <div className="absolute bottom-0 mx-auto inset-x-0 max-w-breakout sm:relative flex flex-col items-center w-full gap-1 sm:gap-5 sm:bottom-auto sm:inset-x-auto sm:max-w-full">
          {/* 컨텐츠 */}
          <div className="flex flex-col-reverse items-center justify-between flex-1 w-full gap-0 sm:gap-3 sm:flex-col relative p-2 sm:p-0">
            <div className="w-full mb-3">
              <form
                onSubmit={handleSubmit}

                className="w-full text-base flex flex-col gap-2 items-center justify-center relative z-10 mt-2">
                <div className="flex flex-col gap-0 justify-center w-full relative items-center xl:w-4/5 max-w-breakout">
                  <Rocket className="w-5 h-5 absolute left-4 top-5 z-10" />
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder={
                      isMobile
                        ? '식단제목 입력..'
                        : '식단제목을 입력하고 나만의 식단을 만들어보세요!'
                    }
                    style={{
                      container: 'input / inline-size',
                      paddingInlineEnd: '160px',
                    }}
                    className={cn(
                      'rounded-full h-[60px] rounded-10rem w-full  pr-[5rem] pl-[2.75rem] placeholder:text-description  relative',
                      isDarkMode ? 'bg-muted' : 'bg-muted'
                    )}
                  ></Input>
                </div>
              </form>
            </div>
          </div>

          {/* 푸터 */}
          <div className="text-[11px] sm:text-xs text-description text-nowrap">
            aivy에게 메시지를 보냄으로써, 우리의{' '}
            <Link className="text-foreground" href={'/terms'}>
              약관
            </Link>
            과{' '}
            <Link className="text-foreground" href={'/privacy-policy'}>
              개인정보 보호정책
            </Link>
            에 동의합니다.
          </div>
        </div>
      </div>
    </div>
  );
}
