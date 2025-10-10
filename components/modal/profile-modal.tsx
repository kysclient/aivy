'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Image from 'next/image'
import { Paperclip, Trash, X } from 'lucide-react'
import { Separator } from '../ui/separator'
import { CameraIcon } from '../icons'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { memo } from 'react'
import { z } from 'zod'
import { PopoverButton } from '../ui/popover-button'
import { User } from '@/types/user'
import { useProfileForm } from '@/hooks/use-profile-form'

export const profileSchema = z.object({
    name: z.string().min(1, '이름은 필수입니다').max(10, '이름은 10자 이내로 입력하세요'),
    description: z.string().max(200, '설명은 200자 이내로 입력하세요').optional(),
    coverImage: z.any().optional(),
    profileImage: z.any().optional()
})


interface ProfileModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    user: User
    isMe: boolean | undefined
}

export const ProfileModal = memo(({ isOpen, setIsOpen, user, isMe }: ProfileModalProps) => {
    const { formData, setFormData, errors, submitting, fileInputRef, handleImageUpload, handleImageRemove, handleSubmit, triggerFileInput } = useProfileForm({
        user,
        onSuccess: () => setIsOpen(false),
        isMe
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTitle></DialogTitle>
            <DialogContent className="w-full max-w-md p-0 rounded-lg border border-border shadow-lg bg-background" showCloseButton={false}>
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h1 className="text-xl font-semibold text-foreground">프로필 편집</h1>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-full">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>
                <div className="relative w-full h-32 overflow-hidden">
                    <Image src={formData.coverImage || `https://avatar.vercel.sh/${user.name}`} alt="Cover" width={1280} height={150} className="w-full h-full object-cover" priority />
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="absolute right-4 bottom-4 bg-background/80 p-2 rounded-full shadow-md hover:bg-background z-10">
                                <CameraIcon className="w-5 h-5 text-foreground" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2">
                            <PopoverButton label="파일 업로드" icon={Paperclip} onClick={() => triggerFileInput('coverImage')} />
                            <Separator className="my-1" />
                            <PopoverButton label="이미지 제거" icon={Trash} onClick={() => handleImageRemove('coverImage')} />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="relative -mt-14 px-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-background">
                        <Image src={formData.profileImage || `https://avatar.vercel.sh/${user.name}`} alt="Profile" width={96} height={96} className="w-full h-full object-cover" priority />
                    </div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="absolute left-21 bottom-2 bg-background/80 p-2 rounded-full shadow-md hover:bg-background">
                                <CameraIcon className="w-5 h-5 text-foreground" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2">
                            <PopoverButton label="파일 업로드" icon={Paperclip} onClick={() => triggerFileInput('profileImage')} />
                            <Separator className="my-1" />
                            <PopoverButton label="이미지 제거" icon={Trash} onClick={() => handleImageRemove('profileImage')} />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="p-4 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-sm text-muted-foreground">
                            표시 이름
                        </Label>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))} placeholder="예: 라나" className="h-10 bg-muted text-foreground" />
                        {errors?.name && <span className="text-sm text-red-500">{errors.name[0]}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description" className="text-sm text-muted-foreground">
                            설명
                        </Label>
                        <Textarea id="description" value={formData.description} onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))} placeholder="예: 예술가, 개 애호가" className="min-h-[100px] max-h-40 bg-muted text-foreground" />
                        {errors?.description && <span className="text-sm text-red-500">{errors.description[0]}</span>}
                    </div>
                    {errors?.general && <span className="text-sm text-red-500">{errors.general[0]}</span>}
                </div>

                <div className="p-4 flex flex-col gap-2 border-t border-border">
                    <Button onClick={handleSubmit} disabled={submitting} className="w-full rounded-full bg-primary text-white hover:bg-primary/90">
                        {submitting ? '저장 중...' : '저장'}
                    </Button>
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                        }}
                        variant="ghost"
                        className="w-full rounded-full text-muted-foreground"
                    >
                        취소
                    </Button>
                </div>

                <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(fileInputRef.current?.dataset.type as 'coverImage' | 'profileImage', e)} accept="image/*" className="hidden" />
            </DialogContent>
        </Dialog>
    )
})

ProfileModal.displayName = 'ProfileModal'
export default ProfileModal
