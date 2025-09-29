'use client'

import { useState } from 'react'
import { FeatherIcon } from './icons'
import { User } from '@/types/user'
import PostModal from './modal/post-modal'

interface PostFloatingButtonProps {
    user: User | null
}

export function PostFloatingButton({ user }: PostFloatingButtonProps) {
    const [openPost, setOpenPost] = useState(false)

    if (!user) return
    return (
        <>
            <button
                className="w-[60px] h-[60px] rounded-full flex justify-center items-center fixed bottom-[38px] right-[24px] transform -translate-y-[44px] z-40 text-white bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                    setOpenPost(true)
                }}
            >
                <FeatherIcon size={29} className="text-white" />
            </button>
            <PostModal isOpen={openPost} setIsOpen={setOpenPost} user={user} />
        </>
    )
}
