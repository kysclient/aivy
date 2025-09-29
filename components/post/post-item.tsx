'use client'

import { memo, useCallback, useState } from 'react'
import equal from 'fast-deep-equal'
import { useRouter } from 'next/navigation'
import { MouseEvent as ReactMouseEvent } from 'react'
import { CertIcon, ChatIcon, HeartFillIcon, HeartIcon, MoreHorizontalIcon, WarningIcon } from '../icons'
import Image from 'next/image'
import { cn, formatKoreanDate, formatTimeago } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Post } from '@/repositoires/PostRepository'
import { Separator } from '../ui/separator'
import ImageGallery from '../image-gallery'
import { PostItemActions } from './post-item-actions'
import { PostType } from '@/types/posts'

interface PostItemProps {
  post: Post
  isOnPost?: boolean
  isChild?: boolean
  isParent?: boolean
  postType: PostType
}

function PurePostItem({ postType, post, isOnPost = false, isChild = false, isParent = false }: PostItemProps) {
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

  const formatDate = (dateString: string) => {
    try {
      return formatTimeago(dateString)
    } catch {
      return new Date(dateString).toLocaleDateString()
    }
  }

  return (
    <div className={cn(' relative', !isOnPost && 'hover:bg-muted', !isChild && 'border-t border-border')} onClick={(e) => !isOnPost && postBodyOnClick(e, post.id)}>
      {isChild && <div className="absolute left-[41px] top-0 h-[16px] w-[2px] bg-border" />}

      <div className={cn('flex flex-row px-[15px] pt-[12px]', isOnPost && 'flex-row')}>
        <div className="relative flex flex-col items-center w-[50px] flex-shrink-0">
          <button onClick={(e) => profileOnClick(e, post.user.id)} className="relative z-10">
            <div className="border border-border w-[42px] h-[42px] rounded-full overflow-hidden">
              <Image src={post.user.profileImage || `https://avatar.vercel.sh/${post.user.id}`} alt={post.user.nickname || 'User Avatar'} width={42} height={42} className="w-full h-full object-cover" />
            </div>
          </button>
          {isParent && <div className="absolute top-[42px] left-[26px] w-[2px] h-[calc(100%-6.5px)] bg-border" />}
        </div>

        <div className="flex-1 ml-[10px] flex flex-col gap-2 pb-4">
          <div className="flex flex-row items-center gap-2">
            <span className="flex items-center text-foreground font-bold truncate">
              <span className="truncate">{post.user.name || post.user.nickname}</span>
              {post.postType === 'health_tip' && <CertIcon className="w-4 h-4 flex-shrink-0 ml-1" />}
            </span>
            <span className="text-description text-sm flex-shrink-0"> · {formatDate(post.createdAt)}</span>
          </div>

          <div className="text-foreground whitespace-pre-wrap">{post.content}</div>

          {post.image && (
            <div
              className="relative"
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              {Array.isArray(post.image) ? <ImageGallery images={post.image} onModalOpenChange={setOpenImageModal} /> : <ImageGallery images={[post.image]} onModalOpenChange={setOpenImageModal} />}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-end px-[15px]">
        <PostItemActions isOnPost={isOnPost} post={post} />
      </div>

      {!isParent && <Separator />}
    </div>
  )
}

export const PostItem = memo(PurePostItem, (prevProps, nextProps) => {
  return equal(prevProps, nextProps)
})
