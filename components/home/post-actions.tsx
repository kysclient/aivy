'use client';

import {
  ChatIcon,
  HeartFillIcon,
  HeartIcon,
  MoreHorizontalIcon,
  WarningIcon,
} from '@/components/icons';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatNumber } from '@/lib/utils';
import { MessageSquare, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { PopoverButton } from '../ui/popover-button';
import ReportModal from '../modal/report-modal';
import { useAuth } from '@/providers/auth-provider';
import { useDeletePost } from '@/hooks/use-posts';
import { toast } from 'sonner';
import { ConfirmDialog } from '../ui/confirm-dialog';
import { Post } from '@/repositoires/PostRepository';

export const PostActions = ({ isOnPost, post }: { isOnPost?: boolean; post: Post }) => {
  const { user } = useAuth();
  if (!user) return null;

  const [isLiked, setIsLiked] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const router = useRouter();
  const { deletePost, isDeleting } = useDeletePost();
  const [liked, setLiked] = useState(post.likes ? post.likes.includes(user?.id) : false);

  const [likeCnt, setLikeCnt] = useState(post.likes ? post.likes.length : 0);

  const isMe = user?.id === post.user.id.toString()

  const handleOnclick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, type: 'like' | 'comment' | 'menu') => {
      e.preventDefault();
      e.stopPropagation();
      if (type === 'like') {
        setIsLiked((prev) => !prev);
        if (!isLiked) {
          setAnimate(true);
          setTimeout(() => setAnimate(false), 500);
        }
      }
      if (type === 'menu') {
        setOpenMenu(true);
      }
      if (type === 'comment') {
        router.push(`/post/${post.id}`);
      }
    },
    [isLiked, openMenu]
  );

  const popoverActions = [
    {
      type: 'report',
      label: '게시물 신고',
      icon: WarningIcon,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenReportModal(true);
      },
    },
    {
      type: 'delete',
      label: '게시물 삭제',
      icon: Trash,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleDeleteClick();
      },
    },
  ];

  const handleDeleteClick = useCallback(() => {
    setOpenDeleteDialog(true);
    setOpenMenu(false);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    if (isDeleting) return;

    try {
      await deletePost(post.id);
      toast.success('게시글이 삭제되었습니다.');

      // 게시글 상세 페이지에서 삭제한 경우 홈으로 이동
      if (isOnPost) {
        router.push('/');
      }
    } catch (error) {
      toast.error('게시글 삭제 중 오류가 발생했습니다.');
    }
  }, [deletePost, isDeleting, post.id, isOnPost, router]);


  return (
    <>
      <div className={cn('flex flex-row items-center gap-12 pb-2', isOnPost && 'justify-end')}>
        <button
          onClick={(e) => {
            handleOnclick(e, 'comment');
          }}
          className="rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover"
        >
          <MessageSquare className="" size={16} />
          {formatNumber(post.commentCnt)}

        </button>
        <button
          onClick={(e) => {
            handleOnclick(e, 'like');
          }}
          className={cn(
            'rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover'
          )}
        >
          <span className={cn(animate && 'animate-like', 'rounded-full')}>
            {liked ? <HeartFillIcon className="text-[#ec4899]" /> : <HeartIcon />}
          </span>
          <span className={cn(liked && 'text-[#ec4899]')}>{formatNumber(likeCnt)}</span>
        </button>

        <Popover open={openMenu} onOpenChange={setOpenMenu}>
          <PopoverTrigger
            asChild
            onClick={(e) => {
              handleOnclick(e, 'menu');
            }}
          >
            <div className="rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover">
              <MoreHorizontalIcon />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2 text-foreground bg-background">
            {popoverActions.map((action, idx) => {
              if (action.type === 'delete' && !isMe) return null;
              const className = action.type === 'delete' ? 'text-red-500' : '';
              return (
                <PopoverButton
                  key={action.label}
                  label={action.label}
                  icon={action.icon}
                  onClick={(e) => {
                    action.onClick(e);
                  }}
                  className={className}
                />
              );
            })}
          </PopoverContent>
        </Popover>
      </div>
      <ReportModal open={openReportModal} setOpen={setOpenReportModal} />
      <ConfirmDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={handleDeleteConfirm}
        title="게시글 삭제"
        description="정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        variant="destructive"
        isLoading={isDeleting}
      />
    </>
  );
};
