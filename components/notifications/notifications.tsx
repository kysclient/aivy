'use client';
import { DefaultHeader } from '@/layouts/default-header';
import { NotificationIcon } from '@/components/icons';
import { Notification } from './notification';
import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllAsRead,
  useDeleteNotification,
} from '@/hooks/use-notifications';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Loading } from '../loading';

interface NotificationsProps {}

export function Notifications({}) {
  const [page, setPage] = useState(1);
  const { notifications, isLoading, hasNext, hasPrev, refresh } = useNotifications(page, 10);
  const { markAsRead } = useMarkNotificationAsRead();
  const { markAllAsRead } = useMarkAllAsRead();
  const { deleteNotification } = useDeleteNotification();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id);
      refresh();
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      refresh();
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      refresh();
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <DefaultHeader title="알림" />
        <div className="flex justify-center items-center py-8">
          <Loading />
        </div>
      </>
    );
  }

  return (
    <>
      <DefaultHeader title="알림" />
      {notifications.length > 0 && (
        <div className="p-4 border-b">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} className="w-full">
            모두 읽음 처리
          </Button>
        </div>
      )}
      {notifications.length === 0 ? (
        <div className="py-[40px]">
          <div className="mt-[50px] mx-auto w-[100px] rounded-full overflow-hidden h-[100px] flex flex-row items-center justify-center bg-muted text-description">
            <NotificationIcon />
          </div>
          <div className="pt-[20px] text-center text-[16px] text-description">
            아직 알림이 없습니다
          </div>
        </div>
      ) : (
        <>
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              notification={notification}
              onMarkAsRead={() => handleMarkAsRead(notification.id)}
              onDelete={() => handleDelete(notification.id)}
            />
          ))}
          {(hasNext || hasPrev) && (
            <div className="flex justify-center gap-2 p-4">
              <Button variant="outline" disabled={!hasPrev} onClick={() => setPage((p) => p - 1)}>
                이전
              </Button>
              <Button variant="outline" disabled={!hasNext} onClick={() => setPage((p) => p + 1)}>
                다음
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
