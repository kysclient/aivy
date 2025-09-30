'use client';
import { useRouter } from 'next/navigation';

export function Fallback() {
  const router = useRouter();
  return (
    <div className="transition duration-200 w-full flex pt-40" aria-label="페이지 로딩">
      <div className="flex flex-col gap-[40px] w-full items-center justify-center">
        <div className="flex flex-col gap-[16px] items-center">
          <p className="text-foreground font-semibold text-2xl">이런!</p>
          <p className="text-description">Internal Server Error</p>
        </div>

        <div className="flex flex-col gap-[12px] !w-[350px]">
          <button
            onClick={() => {
              router.refresh();
            }}
            className="bg-primary font-semibold w-full text-white py-[10px] px-[20px] rounded-[8px] items-center"
          >
            다시 시도
          </button>
          <button
            onClick={() => {
              router.back();
            }}
            className="bg-muted font-semibold w-full text-description py-[10px] px-[20px] rounded-[8px] items-center"
          >
            뒤로
          </button>
        </div>
      </div>
    </div>
  );
}
