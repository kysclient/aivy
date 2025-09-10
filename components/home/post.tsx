'use client'

import { memo, useCallback, useState } from 'react'
import equal from 'fast-deep-equal'
import { useRouter } from 'next/navigation'
import { MouseEvent as ReactMouseEvent } from 'react'
import { CertIcon, ChatIcon, HeartFillIcon, HeartIcon, MoreHorizontalIcon, WarningIcon } from '../icons'
import Image from 'next/image'
import { cn, formatKoreanDate, formatTimeago } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Post as PostType } from '@/types/posts'
import { Separator } from '../ui/separator'
import ImageGallery from '../image-gallery'
import { PostActions } from './post-actions'

interface PostProps {
    post: PostType
    isOnPost?: boolean
    isChild?: boolean // 댓글 여부
    isParent?: boolean // 부모 포스트 여부
}

function PurePost({ post, isOnPost = false, isChild = false, isParent = false }: PostProps) {
    const router = useRouter()
    const [openImageModal, setOpenImageModal] = useState(false)

    const profileOnClick = (e: ReactMouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation()
        e.preventDefault()
        router.push(`/profile/${id}`)
    }

    const postBodyOnClick = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        e.stopPropagation()
        e.preventDefault()
        if (!openImageModal) {
            router.push(`/post/${id}`)
        }
    }

    return (
        <div className={cn('relative', !isOnPost && 'hover:bg-muted', !isChild && 'border-t border-border')} onClick={(e) => !isOnPost && postBodyOnClick(e, post.feed_list_id)}>
            {/* 댓글 트리 수직선: isChild일 때 상단에 표시 */}
            {isChild && <div className="absolute left-[41px] top-0 h-[16px] w-[2px] bg-border" />}

            <div className={cn('flex flex-row px-[15px] pt-[12px]', isOnPost && 'flex-row')}>
                {/* 프로필 이미지와 수직선 컨테이너 */}
                <div className="relative flex flex-col items-center w-[50px] flex-shrink-0">
                    <button onClick={(e) => profileOnClick(e, post.user.name!)} className="relative z-10">
                        <div className="border border-border w-[42px] h-[42px] rounded-full overflow-hidden">
                            <Image src={post.user.profileImage || `https://avatar.vercel.sh/${post.user.id}`} alt={post.user.name ?? 'User Avatar'} width={42} height={42} className="w-full h-full object-cover" />
                        </div>
                    </button>

                    {/* 부모 포스트일 때 하단 수직선 */}
                    {isParent && <div className="absolute top-[42px] left-[26px] w-[2px] h-[calc(100%-0px)] bg-border" />}
                </div>

                {/* 포스트 본문 */}
                <div className="flex-1 ml-[10px] flex flex-col gap-2">
                    {/* 사용자 정보 */}
                    <div className="flex flex-row items-center gap-2">
                        <span className="flex items-center text-foreground font-bold truncate">
                            <span className="truncate">{post.user.name}</span>
                            <CertIcon className="w-4 h-4 flex-shrink-0 ml-1" />
                        </span>
                        <span className="text-description text-sm flex-shrink-0"> · {formatTimeago(post.created_at)}</span>
                    </div>

                    {/* 포스트 내용 */}
                    <div className="text-foreground whitespace-pre-wrap">{post.content}</div>

                    {/* 이미지 갤러리 및 잠금 콘텐츠 */}
                    <div
                        className="relative"
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}
                    >
                        <ImageGallery images={['/examples/image-1.png', '/examples/image-2.png', '/examples/image-3.png', '/examples/image-4.png']} onModalOpenChange={setOpenImageModal} />
                    </div>

                </div>
            </div>
            <div className='w-full flex justify-end px-[15px]'>
                <PostActions isOnPost={isOnPost} post={post} />
            </div>

            {
                !isParent &&
                <Separator />
            }


        </div>
    )
}

export const Post = memo(PurePost, (prevProps, nextProps) => {
    return equal(prevProps, nextProps)
})
