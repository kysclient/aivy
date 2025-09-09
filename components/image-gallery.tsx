'use client'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'
import Image from 'next/image'
import { MouseEvent as ReactMouseEvent } from 'react'
import { cn } from '@/lib/utils'
import ImageCarouselModal from './image-carousel-modal'

interface ImageGalleryProps {
    images: string[]
    onModalOpenChange: Dispatch<SetStateAction<boolean>>
}

interface ImageMetadata {
    url: string
    aspectRatio: number
}

export default function ImageGallery({ images, onModalOpenChange }: ImageGalleryProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [metadata, setMetadata] = useState<ImageMetadata[]>([])

    const handleImageClick = (e: ReactMouseEvent<HTMLDivElement>, idx: number) => {
        e.stopPropagation()
        e.preventDefault()
        setSelectedIndex(idx)
        setIsOpen(true)
        if (onModalOpenChange) onModalOpenChange(true)
    }

    const handleModalClose = (open: boolean) => {
        setIsOpen(open)
        if (onModalOpenChange) onModalOpenChange(open)
    }

    useEffect(() => {
        const fetchMetadata = async () => {
            const limitedImages = images.slice(0, 4)
            const metadataPromises = limitedImages.map(async (url) => {
                try {
                    const img = new window.Image()
                    img.src = url
                    img.src = url
                    await new Promise((resolve, reject) => {
                        img.onload = resolve
                        img.onerror = reject
                    })
                    return {
                        url,
                        aspectRatio: img.width && img.height ? img.width / img.height : 1
                    }
                } catch {
                    return null
                }
            })
            const results = await Promise.all(metadataPromises)
            setMetadata(results.filter((item): item is ImageMetadata => item !== null))
        }

        if (images.length > 0) {
            fetchMetadata()
        }
    }, [images])

    return (
        <div className="relative">
            {metadata.length > 0 && (
                <div
                    className={cn('my-2 grid gap-0.5 border border-border rounded-[12px] overflow-hidden max-w-4xl mx-auto', {
                        'grid-cols-1': metadata.length === 1,
                        'grid-cols-2': metadata.length === 2,
                        'sm:grid-cols-[2fr_1fr] grid-cols-2': metadata.length === 3,
                        'grid-cols-2 grid-rows-2': metadata.length === 4
                    })}
                >
                    {metadata.map((item, idx) => (
                        <div
                            key={item.url}
                            className={cn('relative w-full cursor-pointer overflow-hidden', metadata.length === 3 && idx === 0 && 'row-span-2', metadata.length === 3 && idx > 0 && 'row-span-1')}
                            style={{
                                aspectRatio: item.aspectRatio,
                                maxHeight: metadata.length === 1 ? '32rem' : metadata.length === 3 && idx === 0 ? '24rem' : '12rem'
                            }}
                        >
                            <GalleryImage url={item.url} idx={idx} handleImageClick={handleImageClick} className="" />
                        </div>
                    ))}
                </div>
            )}
            <ImageCarouselModal images={metadata.map((item) => item.url)} isOpen={isOpen} setIsOpen={handleModalClose} initialIndex={selectedIndex} />
        </div>
    )
}

interface GalleryImageProps {
    url: string
    idx: number
    handleImageClick: (e: ReactMouseEvent<HTMLDivElement>, idx: number) => void
    className?: string
}

const GalleryImage = ({ url, idx, handleImageClick, className }: GalleryImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* 스켈레톤 */}
            <div className={cn('absolute inset-0 bg-muted transition-opacity duration-300', isLoaded ? 'opacity-0' : 'opacity-100 animate-pulse')} />

            <Image src={url} alt={`Gallery image ${idx + 1}`} fill className={cn('object-cover transition-all duration-700 ease-in-out', isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md', className)} sizes="(max-width: 640px) 50vw, 33vw" onClick={(e) => handleImageClick(e, idx)} style={{ objectPosition: 'center' }} onLoad={() => setIsLoaded(true)} loading="lazy" />
        </div>
    )
}
