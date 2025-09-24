import { DefaultHeader } from '@/layouts/default-header'
import { NotificationIcon } from '@/components/icons'
import { Notification } from './notification'

interface NotificationsProps {
}

export function Notifications({ }) {
    return (
        <>
            <DefaultHeader title="알림" />
            {mockNotifications.length === 0 ? (
                <div className="py-[40px]">
                    <div className="mt-[50px] mx-auto w-[100px] rounded-full overflow-hidden h-[100px] flex flex-row items-center justify-center bg-muted text-description">
                        <NotificationIcon />
                    </div>
                    <div className="pt-[20px] text-center text-[16px] text-description">아직 알림이 없습니다</div>
                </div>
            ) : (
                mockNotifications.map((notification) => <Notification key={notification.id} notification={notification} />)
            )}
        </>
    )
}

const mockNotifications: any[] = [
    {
        id: '1',
        status: 'pending',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        isRead: false,
        title: '안녕하세요 테스트입니다.'
    },
    {
        id: '2',
        status: 'completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        isRead: true,
        title: '안녕하세요 테스트입니다.'

    },
    {
        id: '3',
        status: 'upcoming',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        isRead: false,
        title: '안녕하세요 테스트입니다.'

    },
]
