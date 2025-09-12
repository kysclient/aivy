'use client'
import { useState } from 'react'
import { Post } from '../home/post'
import { DefaultHeader } from '@/layouts/default-header'
import { Separator } from '../ui/separator'
import { ReplyButton } from '../reply-button'
import CommentModal from '../modal/comment-modal'

interface PostDetailProps {
}

export function PostDetail({ }: PostDetailProps) {
    const [openCommentModal, setOpenCommentModal] = useState(false)

    return (
        <>
            <DefaultHeader title={post.title} />
            <Post post={post} isOnPost={true} />

            <Separator />
            <div className="p-2 border-b border-border w-full">
                <ReplyButton
                    onClickHandler={() => {
                        setOpenCommentModal(true)
                    }}
                    user={null}
                />
            </div>
            {Array.from({ length: 5 }, (_, idx) => {
                const isLast = idx === 4
                return (

                    <Post key={idx} post={post} isOnPost={false} isChild={true} isParent={!isLast} />
                )
            })}
            <CommentModal isOpen={openCommentModal} setIsOpen={setOpenCommentModal} post={post} user={undefined} />
        </>
    )
}


const post = {
    id: "1",
    feed_list_id: "feed_001",
    title: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
    content: '아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.',
    image: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb"],
    is_drug: 0,
    membership: 1,
    point: 10,
    is_audlt: 0,
    created_at: "2025-09-01T08:30:00Z",
    likecnt: 23,
    comments: [],
    commentcnt: 5,
    user: { id: "u1", name: "홍길동", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
}