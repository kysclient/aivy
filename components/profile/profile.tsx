'use client'
import { useAuth } from '@/providers/auth-provider'
import BackButton from '../ui/back-button'
import { ProfileForm } from './profile-form';
import { ProfileInfo } from './profile-info';
import { useState } from 'react';
import { useMyPosts } from '@/hooks/use-posts';

interface ProfileProps {
    name: string;
}

export function Profile({ name }: ProfileProps) {

    const { user } = useAuth();
    const [page, setPage] = useState(1);
    const limit = 9999;
    const { posts, hasNext, isLoading, error, refresh, total } = useMyPosts(page, limit);

    const isMe = user?.name === decodeURIComponent(name)

    if (!user) return null


    return (
        <div className="relative">
            <BackButton className="fixed left-4 top-4 bg-muted text-foreground rounded-full z-20" />
            {isMe ? (
                <>
                    {user && <ProfileForm isMe={isMe} postsTotal={total} />}
                    {user && <ProfileInfo posts={posts} isLoading={isLoading} />}
                </>
            ) : (
                <>
                    {user && <ProfileForm postsTotal={total} />}
                    {user && <ProfileInfo posts={posts} isLoading={isLoading} />}
                </>
            )}
        </div>
    )
}
