'use client'

import { Skeleton } from '@/components/ui/skeleton'

interface PostSkeletonProps {
  count?: number
}

export function PostSkeleton({ count = 5 }: PostSkeletonProps) {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 border-border border-t">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex space-x-4">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
            </div>
            <div className="flex flex-row items-center gap-12 pt-2 text-muted animate-pulse">
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
              <Skeleton className="h-2.5 w-2.5 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostSkeleton