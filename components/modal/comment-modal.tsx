'use client';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Post } from '@/repositoires/PostRepository';
import { User } from '@/types/user';
import { useCreatePost } from '@/hooks/use-posts';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ImagePreview from '../image-preview';

interface CommentModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | null;
  post: Post;
}

const MAX_LENGTH = 300;
const MAX_IMAGES = 4;

export default function CommentModal({ isOpen, setIsOpen, post, user }: CommentModalProps) {
  const [input, setInput] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { createPost, isCreating } = useCreatePost();

  const textLength = input.length;
  const progress = (textLength / MAX_LENGTH) * 100;
  const remaining = MAX_LENGTH - textLength;

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setInput(value);
    }
  }, []);

  const handleImageSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const fileArray = Array.from(files);
      const newImages = [...images, ...fileArray].slice(0, MAX_IMAGES);
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));

      setImages(newImages);
      setImagePreviews(newPreviews);
    },
    [images]
  );

  const handleImageRemove = useCallback(
    (index: number) => {
      const newImages = images.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);

      // 기존 URL 해제
      URL.revokeObjectURL(imagePreviews[index]);

      setImages(newImages);
      setImagePreviews(newPreviews);
    },
    [images, imagePreviews]
  );

  const handleSubmit = useCallback(async () => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (!input.trim() && images.length === 0) {
      toast.error('내용 또는 이미지를 입력해주세요.');
      return;
    }

    try {
      await createPost(
        {
          content: input.trim(),
          postType: post.postType, // 부모 게시글과 같은 타입
          parentId: post.id, // 댓글로 설정
        },
        images
      );

      toast.success('댓글이 작성되었습니다.');

      // 상태 초기화
      setInput('');
      setImages([]);
      setImagePreviews([]);
      setIsOpen(false);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      toast.error('댓글 작성에 실패했습니다.');
    }
  }, [user, input, images, post.postType, post.id, createPost, setIsOpen]);

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!isOpen) {
      setInput('');
      setImages([]);
      setImagePreviews([]);
    }
  }, [isOpen]);

  // 컴포넌트 언마운트 시 URL 해제
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTitle className="sr-only">댓글 작성</DialogTitle>
      <DialogContent className="w-full p-0 py-2.5 max-w-lg" showCloseButton={false}>
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-2.5 px-2.5">
          <Button
            variant="ghost"
            className="text-primary font-medium rounded-full p-2 hover:bg-primary/10"
            onClick={handleClose}
          >
            취소
          </Button>
          <Button
            className="rounded-full"
            onClick={handleSubmit}
            disabled={isCreating || (input.length < 1 && images.length === 0)}
          >
            {isCreating ? '게시 중...' : '답글 게시하기'}
          </Button>
        </div>

        {/* 원본 게시글 미리보기 */}
        <div className="flex gap-3 p-2.5 border-b border-border">
          <div className="relative w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
            <Image
              src={post.user.profileImage || `https://avatar.vercel.sh/${post.user.name}`}
              alt={post.user.name || 'User Avatar'}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm">{post.user.name || post.user.email}</div>
            <div className="line-clamp-3 text-sm text-muted-foreground mt-1">{post.content}</div>
          </div>
          {post.image && Array.isArray(post.image) && post.image.length > 0 && (
            <div className="relative w-16 h-16 rounded-md flex-shrink-0 overflow-hidden">
              <Image
                src={post.image[0]}
                alt="게시글 이미지"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* 댓글 작성 영역 */}
        <div className="flex gap-4 px-2.5 min-h-[120px]">
          <div className="relative w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
            <Image
              src={user.profileImage || `https://avatar.vercel.sh/${user.name}`}
              alt={user.name || 'User Avatar'}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={input}
              onChange={handleTextChange}
              className="w-full outline-none resize-none border-none placeholder:text-lg placeholder:text-muted-foreground"
              style={{
                minHeight: '100px',
                height: 'auto',
                maxHeight: '300px',
                overflowY: 'auto',
              }}
              placeholder="답글 작성하기"
            />
          </div>
        </div>

        {/* 이미지 미리보기 */}
        {imagePreviews.length > 0 && (
          <div className="px-2.5">
            <ImagePreview previews={imagePreviews} onRemove={handleImageRemove} />
          </div>
        )}

        {/* 하단 액션 바 */}
        <div className="border-t border-border px-2.5 pt-2.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
                id="comment-image-upload"
                disabled={images.length >= MAX_IMAGES}
              />
              <label
                htmlFor="comment-image-upload"
                className={cn(
                  'p-2 flex justify-center items-center text-primary hover:bg-primary/10 transition duration-100 rounded-full cursor-pointer',
                  images.length >= MAX_IMAGES && 'opacity-50 cursor-not-allowed'
                )}
              >
                <ImageIcon size={20} />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={cn('text-sm', remaining < 0 ? 'text-red-500' : 'text-muted-foreground')}
              >
                {textLength}/{MAX_LENGTH}
              </span>
              <svg width="20" height="20" viewBox="0 0 36 36" className="flex-shrink-0">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={remaining < 0 ? '#ef4444' : '#0ea5e9'}
                  strokeWidth="4"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                  transform="rotate(-90 18 18)"
                  className="transition-all duration-300 ease-in-out"
                />
              </svg>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
