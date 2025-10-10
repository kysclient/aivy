'use client';
import { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useScreenSize } from '@/hooks/use-screen-size';
import { mutate } from 'swr';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import ImagePreview from '../image-preview';
import ImageUploader from '../image-uploader';
import { User } from '@/types/user';
import { useCreatePost } from '@/hooks/use-posts';
import { PostType } from '@/repositoires/PostRepository';

interface PostModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  user: User | undefined;
}

const MAX_LENGTH = 300;
const MAX_IMAGES = 4;

export default function PostModal({ isOpen, setIsOpen, user }: PostModalProps) {
  const [input, setInput] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isMobile } = useScreenSize();
  const pathname = usePathname();
  const { createPost } = useCreatePost();

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
    (files: File[]) => {
      // 기존 URL 해제
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      const newImages = [...images, ...files].slice(0, MAX_IMAGES);
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImages(newImages);
      setImagePreviews(newPreviews);
    },
    [images, imagePreviews]
  );

  const handleImageRemove = useCallback(
    (index: number) => {
      // 제거될 URL 해제
      URL.revokeObjectURL(imagePreviews[index]);

      const newImages = images.filter((_, i) => i !== index);
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImages(newImages);
      setImagePreviews(newPreviews);
    },
    [images, imagePreviews]
  );

  const handleSubmit = useCallback(async () => {
    if (!user?.id) {
      toast.error('사용자 정보가 없습니다.');
      return;
    }

    if (!input.trim() && images.length === 0) {
      toast.error('내용 또는 이미지를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      await createPost(
        {
          content: input.trim(),
          postType: PostType.GENERAL, // 기본값을 general로 설정 (필요시 props로 받을 수 있음)
        },
        images
      );

      toast.success('게시물이 성공적으로 작성되었습니다.');
      await mutate(undefined, { revalidate: true });

      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setInput('');
      setImages([]);
      setImagePreviews([]);
      setIsOpen(false);
    } catch (error) {
      console.error('Error submitting post:', error);
      toast.error('게시물 작성에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [user, input, images, setIsOpen]);

  useEffect(() => {
    if (!isOpen) {
      setInput('');
      setImages([]);
      setImagePreviews([]);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle className="sr-only">게시물 작성</DialogTitle>
        <DialogContent showCloseButton={false} className="w-full p-0 py-2.5 max-w-lg">
          <div className="flex items-center justify-between px-2.5 mb-2.5">
            <Button
              variant="ghost"
              className="text-primary font-medium rounded-full p-2"
              onClick={handleClose}
              aria-label="모달 닫기"
            >
              취소
            </Button>
            <Button
              className="rounded-full"
              onClick={handleSubmit}
              disabled={isLoading || (textLength < 1 && images.length === 0)}
              aria-label="게시물 작성"
            >
              {isLoading ? '게시 중...' : '게시하기'}
            </Button>
          </div>

          <div className="flex gap-4 px-2.5 min-h-[180px]">
            <div className="relative w-12 h-12 rounded-full flex-shrink-0 overflow-hidden">
              <Image
                src={user?.profileImage || `https://avatar.vercel.sh/${user?.name || 'user'}`}
                alt={user?.name || '사용자 아바타'}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={input}
                onChange={handleTextChange}
                className="w-full outline-none resize-none border-none placeholder:text-lg placeholder:text-muted-foreground"
                style={{
                  minHeight: isMobile ? '120px' : '180px',
                  height: 'auto',
                  overflowY: 'auto',
                }}
                placeholder="무슨 일이 일어나고 있나요?"
                aria-label="게시물 내용 입력"
              />
            </div>
          </div>
          <div className="px-2.5">
            <ImagePreview previews={imagePreviews} onRemove={handleImageRemove} />
          </div>

          <div className="border-t border-border px-2.5 pt-2.5">
            <div className="flex justify-between items-center">
              <ImageUploader onSelect={handleImageSelect} disabled={images.length >= MAX_IMAGES} />
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-sm',
                    remaining < 0 ? 'text-red-500' : 'text-muted-foreground'
                  )}
                >
                  {textLength}/{MAX_LENGTH}
                </span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 36 36"
                  className="flex-shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    strokeWidth="2"
                    className="stroke-muted-foreground"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="none"
                    stroke="#FF3263"
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
    </>
  );
}
