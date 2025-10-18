import { useRouter } from 'next/navigation';
import {  UserIcon } from '../icons';
import { Button } from '../ui/button';
import { Settings } from 'lucide-react';

export function HeaderV2() {
  const router = useRouter();

  const handleAuthNav = (path: string) => {
    router.push(`/auth?mode=${path}`);
  };
  return (
    <div className="w-full relative @container/nav z-[25] flex-shrink-0 print:hidden">
      <div className="h-16 top-0 flex items-center justify-center z-10 flex-row w-full">
       
        <div className="absolute flex flex-row items-center gap-0.5 ms-auto end-3">
             <Button variant={'ghost'} size={'icon'} className='rounded-full'>
            <Settings className='text-description w-9 h-9'  />
        </Button>
          <div className="flex flex-row items-center gap-2">
            <Button
              onClick={() => {
                handleAuthNav('signup');
              }}
              className="bg-foreground text-background hover:bg-foreground/90 rounded-full"
            >
              <UserIcon /> 가입하기
            </Button>
            <Button
              onClick={() => {
                handleAuthNav('signin');
              }}
              className="bg-background border border-border rounded-full hover:bg-muted text-foreground"
            >
              로그인{' '}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
