'use client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from '../icons'

const BackButton = ({ className }: { className?: string }) => {
    const router = useRouter()

    const handleBack = useCallback(() => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }
    }, [router])
    return (
        <button onClick={handleBack} className={cn('hover:bg-muted-hover p-1 rounded-md', className)}>
            <ArrowLeftIcon size={24} />
        </button>
    )
}

export default BackButton
