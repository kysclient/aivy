

import { ChatFilledIcon } from '@/components/icons'
import { cn, formatTimeago } from '@/lib/utils'
import { ArrowDownLeft, UserPlus } from 'lucide-react'
import Image from 'next/image'
import { JSX } from 'react'

interface NotificationProps {
    notification: any
}

export function Notification({ notification }: any) {
    return (
        <div className={`flex items-center p-4 hover:bg-muted transition-colors duration-200 ${!notification.isRead ? 'bg-muted' : ''}`}>
            <div className="flex-shrink-0">
                <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border', getStatusColor(notification.status))}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {getStatusText(notification.status)}
                </div>
            </div>

            <div className="ml-3 flex-1">
                <p className="text-sm text-foreground">{notification.title}</p>
                <p className="text-xs text-description">{formatTimeago(notification.timestamp)}</p>
            </div>

            {!notification.isRead && <div className="w-2 h-2 rounded-full bg-primary" />}
        </div>
    )
}


const getStatusColor = (status?: string) => {
    switch (status) {
        case 'completed':
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        case 'generating':
            return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        case 'upcoming':
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        case 'failed':
            return 'bg-red-500/10 text-red-400 border-red-500/20'
        default:
            return 'bg-muted/50 text-muted-foreground border-border'
    }
}

const getStatusText = (status?: string) => {
    switch (status) {
        case 'generating':
            return '진행중'
        case 'completed':
            return '완료'
        case 'upcoming':
            return '예정'
        case 'failed':
            return '실패'
        default:
            return '대기'
    }
}