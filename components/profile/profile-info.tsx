'use client'
import { Tabs } from '@/components/tabs'
import { useState } from 'react'
import { ProfilePost } from './profile-post'
import { Post } from '@/repositoires/PostRepository'

interface ProfileInfoProps {
    posts: Post[]
    isLoading: boolean
}

export function ProfileInfo({ posts, isLoading }: ProfileInfoProps) {
    const [selectedTab, setSelectedTab] = useState('post')

    const handleTabsChange = (value: string) => {
        setSelectedTab(value)
    }
    return (
        <div className="my-[20px]">
            <Tabs value={selectedTab} data={tabs} handleChange={handleTabsChange} />
            {selectedTab === 'post' ? <ProfilePost posts={posts} isLoading={isLoading} /> : <></>}
        </div>
    )
}

const tabs = [
    {
        label: '게시물',
        value: 'post'
    },
]
