import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import { Globe, ImageIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Post } from '@/types/posts'
import { User } from '@/types/user'

interface CommentModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    user: User | undefined
    post: Post
}

export default function CommentModal({ isOpen, setIsOpen, post, user }: CommentModalProps) {
    const maxLength = 300
    const [input, setInput] = useState('')

    const textLength = input.length
    const progress = (textLength / maxLength) * 100
    const remaining = maxLength - textLength

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(false)
    }

    useEffect(() => {
        setInput('')
    }, [isOpen])

    if(!user) {
        return
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
            <DialogTitle></DialogTitle>
            <DialogClose onClick={handleClose} className="opacity-0"></DialogClose>
            <DialogContent className=" w-full p-0 py-[10px]" showCloseButton={false}>
                <div className="flex flex-row justify-between items-center mb-[10px] px-[10px]">
                    <button className="text-primary hover:bg-primary-hover font-medium rounded-full p-1" onClick={handleClose}>
                        취소
                    </button>
                    <Button className="rounded-full" disabled={input.length < 1}>
                        답글 게시하기
                    </Button>
                </div>

                <div className="flex flex-row gap-[12px] p-[10px] border-b border-border">
                    <div className="relative w-[48px] h-[48px] rounded-full flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-75">
                        <Image src={user.profileImage || `https://avatar.vercel.sh/${post.user?.id}`} alt={user?.email ?? 'User Avatar'} width={48} height={48} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="font-bold">{user.name || '관리자'}</div>
                        <div className="line-clamp-3 text-[15px]">{post.content}</div>
                    </div>

                    {post.image.length > 0 && (
                        <div className="relative w-[64px] h-[64px] rounded-md flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out">
                            <Image src={post.image[0] || `https://avatar.vercel.sh/${post.user.id}`} alt={post.content} width={64} height={64} className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="flex flex-row gap-4 min-h-[180px] max-h-[70vh] overflow-y-auto px-[10px] pt-[10px]">
                    <div className="relative w-[48px] h-[48px] rounded-full flex-shrink-0 overflow-hidden transition-transform duration-200 ease-in-out group-hover:scale-75">
                        {user && <Image src={user?.profileImage || `https://avatar.vercel.sh/${user?.name}`} alt={user?.name ?? 'User Avatar'} width={48} height={48} className="w-full h-full object-cover" />}
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => {
                            if (e.target.value.length > maxLength) return
                            setInput(e.target.value)
                        }}
                        className="w-full outline-none resize-none border-none placeholder:text-lg placeholder:text-muted-foreground"
                        style={{
                            minHeight: '140px',
                            height: 'auto',
                            maxHeight: '70vh',
                            overflowY: 'auto'
                        }}
                        placeholder="답글 작성하기"
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            target.style.height = 'auto'
                            target.style.height = `${target.scrollHeight}px`
                        }}
                    />
                </div>

                <div className="border-t border-border px-[10px] pt-[10px] items-center">
                    <div className="flex flex-row justify-between items-center">
                        <button className="p-2 flex justify-center items-center text-primary hover:bg-primary-hover transition duration-100 rounded-full">
                            <ImageIcon size={24} />
                        </button>
                        <div className="flex items-center justify-end mt-2 gap-2">
                            <span className={`text-sm ${remaining < 0 ? 'text-red-500' : 'text-description'}`}>
                                {textLength}/{maxLength}
                            </span>

                            <svg width="24" height="24" viewBox="0 0 36 36" className="flex-shrink-0">
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#2e4052" strokeWidth="2" className="" />
                                <circle cx="18" cy="18" r="16" fill="none" stroke="#1eab53" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - progress} transform="rotate(-90 18 18)" className="transition-all duration-300 ease-in-out" />
                            </svg>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
