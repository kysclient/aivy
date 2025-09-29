'use client'
import { useCallback } from 'react'
import { ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface ImageUploaderProps {
    onSelect: (files: File[]) => void
    disabled: boolean
}

export default function ImageUploader({ onSelect, disabled }: ImageUploaderProps) {
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files || [])
            if (files.length > 0) {
                onSelect(files)
                e.target.value = ''
            }
        },
        [onSelect]
    )

    return (
        <div>
            <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleChange}
            />
            <label
                htmlFor="image-upload"
                className={`p-2 flex justify-center items-center text-primary hover:bg-primary/10 transition duration-100 rounded-full cursor-pointer ${
                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={(e) => {
                    if (disabled) {
                        e.preventDefault()
                        toast.error('이미지는 최대 4장까지 업로드 가능합니다.')
                    }
                }}
                aria-label="이미지 업로드"
            >
                <ImageIcon size={24} />
            </label>
        </div>
    )
}
