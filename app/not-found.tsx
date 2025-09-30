import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-[20px]">
        <Link href={'/'}>
          <h1 className="text-3xl font-kakao font-bold font-primary">aivy</h1>
        </Link>
        <p className="text-xl font-bold">페이지를 찾을 수 없습니다</p>
        <Link
          className="px-4 py-1.5 rounded-xl bg-primary flex justify-center items-center text-white font-semibold"
          href={'/'}
        >
          뒤로 돌아가기
        </Link>
      </div>
    </div>
  );
}
