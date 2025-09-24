'use client'

import { ChatIcon, HeartFillIcon, HeartIcon, MoreHorizontalIcon, WarningIcon } from '@/components/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Post } from '@/types/posts'
import { MessageSquare, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { PopoverButton } from '../ui/popover-button'
import ReportModal from '../modal/report-modal'

export const PostActions = ({ isOnPost, post }: { isOnPost?: boolean; post: Post }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [animate, setAnimate] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [openReportModal, setOpenReportModal] = useState(false)
    const router = useRouter()

    //   const isMe = user?.user_id === post.user.user_id.toString()
    const isMe = false

    const handleOnclick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>, type: 'like' | 'comment' | 'menu') => {
            e.preventDefault()
            e.stopPropagation()
            if (type === 'like') {
                setIsLiked((prev) => !prev)
                if (!isLiked) {
                    setAnimate(true)
                    setTimeout(() => setAnimate(false), 500)
                }
            }
            if (type === 'menu') {
                setOpenMenu(true)
            }
            if (type === 'comment') {
                router.push(`/post/${post.id}`)
            }
        },
        [isLiked, openMenu]
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
            }
        },
        {
            type: 'delete',
            label: '게시물 삭제',
            icon: Trash,
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault()
                e.stopPropagation()
            }
        }
    ]

    return (
        <>
            <div className={cn('flex flex-row items-center gap-12 pb-2', isOnPost && 'justify-end')}>
                <button
                    onClick={(e) => {
                        handleOnclick(e, 'comment')
                    }}
                    className="rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover"
                >
                    <MessageSquare className="" size={16} />
                    1천
                </button>
                <button
                    onClick={(e) => {
                        handleOnclick(e, 'like')
                    }}
                    className={cn('rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover')}
                >
                    <span className={cn(animate && 'animate-like', 'rounded-full')}>{isLiked ? <HeartFillIcon className="text-[#ec4899]" /> : <HeartIcon />}</span>
                    <span className={cn(isLiked && 'text-[#ec4899]')}>1만</span>
                </button>

                <Popover open={openMenu} onOpenChange={setOpenMenu}>
                    <PopoverTrigger
                        asChild
                        onClick={(e) => {
                            handleOnclick(e, 'menu')
                        }}
                    >
                        <div className="rounded-full p-1 text-sm text-description flex flex-row items-center gap-1 hover:bg-muted-hover">
                            <MoreHorizontalIcon />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 text-foreground bg-background">
                        {popoverActions.map((action, idx) => {
                            if (action.type === 'delete' && !isMe) return null
                            const className = action.type === 'delete' ? 'text-red-500' : ''
                            return (
                                <PopoverButton
                                    key={action.label}
                                    label={action.label}
                                    icon={action.icon}
                                    onClick={(e) => {
                                        action.onClick(e)
                                    }}
                                    className={className}
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


