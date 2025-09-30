import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

export function MessageBadge({ className }: Props) {
  // const { on, off } = useSocketContext()
  // const [hasNewMessage, setHasNewMessage] = useState(false)

  // useEffect(() => {
  //     const handler = (data: { event: string; data: any }) => {
  //         if (data.event === SocketEvent.RECEIVE_MESSAGE) {
  //             setHasNewMessage(true)
  //         }
  //     }

  //     on(SocketEvent.RECEIVE_MESSAGE, handler)
  //     return () => {
  //         off(SocketEvent.RECEIVE_MESSAGE, handler)
  //     }
  // }, [on, off])

  // if (!hasNewMessage) return null

  return <span className={cn('absolute w-2 h-2 bg-red-500 rounded-full', className)} />;
}
