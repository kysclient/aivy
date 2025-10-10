'use client';
import { FC } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';

interface ReplyButtonProps {
  user: User | null;
  onClickHandler: () => void;
}

export const ReplyButton: FC<ReplyButtonProps> = ({ user, onClickHandler }) => {
  return (
    <Button
      onClick={onClickHandler}
      variant="ghost"
      className="flex flex-row gap-[12px] w-full items-start justify-start rounded-full"
    >
      <div className="relative w-[24px] h-[24px] rounded-full overflow-hidden">
        {user && (
          <Image
            width={24}
            height={24}
            src={user.profileImage || `https://avatar.vercel.sh/${user.name}`}
            alt={user.name || 'User avatar'}
            className="object-cover"
          />
        )}
      </div>
      <span>답글 작성하기</span>
    </Button>
  );
};
