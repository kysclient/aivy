'use client'
import { useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ImagePreviewProps {
    previews: string[]
    onRemove: (index: number) => void
}

export default function ImagePreview({ previews, onRemove }: ImagePreviewProps) {
    if (previews.length === 0) return null

    return (
        <div className="grid grid-cols-4 gap-4 mt-2 flex-wrap">
            {previews.map((preview, index) => (
                <div key={index} className="relative w-full h-[135px] rounded-md overflow-hidden">
                    <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                    <Button size="icon" className="border border-border absolute top-1 right-1 w-5 h-5 rounded-full bg-muted hover:bg-muted-hover" onClick={() => onRemove(index)} aria-label={`이미지 ${index + 1} 제거`}>
                        <X className="w-3 h-3 text-foreground" />
                    </Button>
                </div>
            ))}
        </div>
    )
}
