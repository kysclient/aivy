'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { usePost, useAllReplies } from '@/hooks/use-posts';
import { PostItem } from './post-item';
import { DefaultHeader } from '@/layouts/default-header';
import { Separator } from '../ui/separator';
import { ReplyButton } from '../reply-button';
import CommentModal from '../modal/comment-modal';
import PostSkeleton from '../home/post-skeleton';
import { useAuth } from '@/providers/auth-provider';
import { CommentTree } from './comment-tree';

interface PostDetailProps {}

export function PostDetail({}: PostDetailProps) {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const params = useParams();
  const postId = params?.slug as string;
  const { user } = useAuth();
  const { post, isLoading: postLoading, error: postError } = usePost(postId);
  const { allReplies, isLoading: repliesLoading } = useAllReplies(postId || '');

  if (postLoading) {
    return (
      <>
        <DefaultHeader title="게시글" />
        <PostSkeleton count={1} />
      </>
    );
  }

  if (postError || !post) {
    return (
      <>
        <DefaultHeader title="게시글" />
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-red-500 mb-4">게시글을 불러올 수 없습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <DefaultHeader title="게시글" />
      <PostItem post={post} isOnPost={true} />

      <Separator />
      <div className="p-2 border-b border-border w-full">
        <ReplyButton
          onClickHandler={() => {
            setOpenCommentModal(true);
          }}
          user={user}
        />
      </div>

      <CommentTree replies={allReplies} rootPostId={postId} isLoading={repliesLoading} />

      <CommentModal
        isOpen={openCommentModal}
        setIsOpen={setOpenCommentModal}
        post={post}
        user={user}
      />
    </>
  );
}
