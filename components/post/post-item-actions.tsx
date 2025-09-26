'use client'

import { ChatIcon, HeartFillIcon, HeartIcon, MoreHorizontalIcon, WarningIcon } from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Post } from '@/repositoires/PostRepository'
import { useToggleLike, useDeletePost } from '@/hooks/use-posts'
import { MessageSquare, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { PopoverButton } from '../ui/popover-button'
import ReportModal from '../modal/report-modal'
import { toast } from 'sonner'
import { useAuth } from '@/providers/auth-provider'

export const PostItemActions = ({ isOnPost, post }: { isOnPost?: boolean; post: Post }) => {
    
    const { user } = useAuth();
    if(!user) return null
    const [animate, setAnimate] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openReportModal, setOpenReportModal] = useState(false)
    const [isPending, startTransition] = useTransition()
    
    const [liked, setLiked] = useState(post.likes ? post.likes.includes(user.id) : false);
    const [likeCnt, setLikeCnt] = useState(post.likes ? post.likes.length : 0)
    const router = useRouter()
    const { toggleLike, isMutating: isLikeMutating } = useToggleLike()
    const { deletePost, isDeleting } = useDeletePost()

    // TODO: 현재 사용자 정보와 비교해서 내 게시글인지 확인
    const isMe = false

    const handleToggleLike = useCallback(async () => {
        if (isLikeMutating) return

        try {
            const result = await toggleLike(post.id)

            // 좋아요가 추가된 경우에만 애니메이션
            if (result.isLiked) {
                setAnimate(true)
                setLiked(true)
                setLikeCnt(result.likeCnt)
                setTimeout(() => setAnimate(false), 500)
            } else {
                setLiked(false)
                setLikeCnt(result.likeCnt)
            }
        } catch (error) {
            toast.error('좋아요 처리 중 오류가 발생했습니다.')
        }
    }, [isLikeMutating, post.id, toggleLike])

    const handleDelete = useCallback(async () => {
        if (isDeleting) return

        if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return

        try {
            await deletePost(post.id)
            toast.success('게시글이 삭제되었습니다.')
            setOpenMenu(false)
        } catch (error) {
            toast.error('게시글 삭제 중 오류가 발생했습니다.')
        }
    }, [deletePost, isDeleting, post.id])

    const handleOnclick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, type: 'like' | 'comment' | 'menu') => {
            e.preventDefault()
            e.stopPropagation()

            if (type === 'like') {
                startTransition(handleToggleLike)
            }
            if (type === 'menu') {
                setOpenMenu(true)
            }
            if (type === 'comment') {
                router.push(`/post/${post.id}`)
            }
        },
        [handleToggleLike, router, post.id]
    )

    const popoverActions = [
        {
            type: 'report',
            label: '게시물 신고',
            icon: WarningIcon,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()
                setOpenReportModal(true)
                setOpenMenu(false)
            }
        },
        {
            type: 'delete',
            label: '게시물 삭제',
            icon: Trash,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()
                handleDelete()
            }
        }
    ]

    const formatNumber = (num: number) => {
        if (num >= 10000) {
            return `${(num / 10000).toFixed(0)}만`
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(0)}천`
        }
        return num.toString()
    }

    return (
        <>
            <div className={cn('flex flex-row items-center gap-12 pb-2', isOnPost && 'justify-end')}>
                <button
                    onClick={(e) => handleOnclick(e, 'comment')}
                    className="rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover"
                >
                    <MessageSquare className="" size={16} />
                    {formatNumber(post.commentCnt)}
                </button>

                <button
                    onClick={(e) => handleOnclick(e, 'like')}
                    disabled={isPending || isLikeMutating}
                    className={cn(
                        'rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover',
                        (isPending || isLikeMutating) && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <span className={cn(animate && 'animate-like', 'rounded-full')}>
                        {liked ? <HeartFillIcon className="text-[#ec4899]" /> : <HeartIcon />}
                    </span>
                    <span className={cn(liked && 'text-[#ec4899]')}>
                        {formatNumber(likeCnt)}
                    </span>
                </button>

                <Popover open={openMenu} onOpenChange={setOpenMenu}>
                    <PopoverTrigger
                        asChild
                        onClick={(e) => handleOnclick(e, 'menu')}
                    >
                        <div className="rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover cursor-pointer">
                            <MoreHorizontalIcon />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 text-foreground bg-background">
                        {popoverActions.map((action) => {
                            if (action.type === 'delete' && !isMe) return null
                            const className = action.type === 'delete' ? 'text-red-500' : ''
                            return (
                                <PopoverButton
                                    key={action.label}
                                    label={action.label}
                                    icon={action.icon}
                                    onClick={action.onClick}
                                    className={className}
                                    disabled={action.type === 'delete' && isDeleting}
                                />
                            )
                        })}
                    </PopoverContent>
                </Popover>
            </div>
            <ReportModal open={openReportModal} setOpen={setOpenReportModal} />
        </>
    )
}