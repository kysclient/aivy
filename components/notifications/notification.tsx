

import { ChatFilledIcon } from '@/components/icons'
import { cn, formatTimeago } from '@/lib/utils'
import { ArrowDownLeft, UserPlus, MoreVertical, Trash2, Check } from 'lucide-react'
import Image from 'next/image'
import { JSX } from 'react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Notification as NotificationType, NotificationType as NotificationTypeEnum } from '@/repositoires/NotificationRepository'

interface NotificationProps {
    notification: NotificationType
    onMarkAsRead?: () => void
    onDelete?: () => void
}

export function Notification({ notification, onMarkAsRead, onDelete }: NotificationProps) {
    return (
        <div className={`flex items-center p-4 hover:bg-muted transition-colors duration-200 ${!notification.isRead ? 'bg-muted/50' : ''}`}>
            <div className="flex-shrink-0">
                <div className={cn('inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border', getTypeColor(notification.type))}>
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    {getTypeText(notification.type)}
                </div>
            </div>

            <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-foreground">{notification.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-description mt-1">{formatTimeago(notification.createdAt)}</p>
            </div>

            <div className="flex items-center gap-2">
                {!notification.isRead && <div className="w-2 h-2 rounded-full bg-primary" />}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {!notification.isRead && onMarkAsRead && (
                            <DropdownMenuItem onClick={onMarkAsRead}>
                                <Check className="mr-2 h-4 w-4" />
                                읽음 처리
                            </DropdownMenuItem>
                        )}
                        {onDelete && (
                            <DropdownMenuItem onClick={onDelete} className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                삭제
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}


const getTypeColor = (type: NotificationTypeEnum) => {
    switch (type) {
        case NotificationTypeEnum.MEAL_PLAN_REMINDER:
            return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
        case NotificationTypeEnum.NUTRITION_ALERT:
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
        case NotificationTypeEnum.RECIPE_RECOMMENDATION:
            return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        case NotificationTypeEnum.SYSTEM:
            return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
        default:
            return 'bg-muted/50 text-muted-foreground border-border'
    }
}

const getTypeText = (type: NotificationTypeEnum) => {
    switch (type) {
        case NotificationTypeEnum.MEAL_PLAN_REMINDER:
            return '식단 알림'
        case NotificationTypeEnum.NUTRITION_ALERT:
            return '영양 알림'
        case NotificationTypeEnum.RECIPE_RECOMMENDATION:
            return '레시피 추천'
        case NotificationTypeEnum.SYSTEM:
            return '시스템'
        default:
            return '알림'
    }
}