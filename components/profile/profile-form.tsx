'use client'
import { CertIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { User } from '@/types/user'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ProfileModal from '../modal/profile-modal'
import { useAuth } from '@/providers/auth-provider'

interface ProfileFormProps {
    isMe?: boolean
    postsTotal?: number
}
export function ProfileForm({ isMe, postsTotal }: ProfileFormProps) {
    const { user } = useAuth();
    const [openEditProfile, setOpenEditProfile] = useState<boolean>(false)
    const router = useRouter()

    if (!user) return

    return (
        <>
            <div className="flex flex-col font-medium">
                <div className="w-full h-[150px]">
                    <Image src={user.coverImage || `https://avatar.vercel.sh/${user.name}`} alt={user.name ?? 'User Cover Image'} width={1280} height={150} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 py-2 flex relative">
                    <div className="absolute -top-10 border border-border w-[60px] h-[60px] rounded-full flex-shrink-0 overflow-hidden">
                        <Image src={user.profileImage || `https://avatar.vercel.sh/${user.name}`} alt={user.name ?? 'User Avatar'} width={90} height={90} className="w-full h-full object-cover" />
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="flex flex-row gap-[12px] items-center">

                            {isMe && (
                                <Button
                                    onClick={() => {
                                        setOpenEditProfile(true)
                                    }}
                                    variant={'secondary'}
                                    className="rounded-full font-semibold justify-end self-end flex text-foreground"
                                >
                                    프로필 편집
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="flex flex-row items-center gap-2">
                        <span className="text-foreground text-2xl sm:text-3xl font-bold break-all line-clamp-1">{user.name}</span>
                        {user.role === 'adimin' && <CertIcon />}
                    </div>
                    <span className="text-description font-normal text-[15px]">{user.email}</span>
                    <div className="flex flex-row gap-2 mb-2">

                        <span className="text-description text-sm">
                            <span className="text-foreground">{postsTotal ?? 0} </span>게시물
                        </span>
                    </div>
                    <div
                        style={{
                            letterSpacing: 0,
                            whiteSpace: 'pre-wrap'
                        }}
                    >
                        {user.description}
                    </div>
                </div>
                <ProfileModal isOpen={openEditProfile} setIsOpen={setOpenEditProfile} user={user} isMe={isMe} />
            </div>
        </>
    )
}
