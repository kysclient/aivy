'use client'
import { useEffect, useRef, useState } from 'react'
import { Tabs } from '../tabs'
import { HomeHeader } from './home-header'
import { PostList } from '../post/post-list'
import { PostType } from '@/repositoires/PostRepository'
import { useRouter, useSearchParams } from 'next/navigation'

export default function HomeMain() {
  const router = useRouter()
  const params = useSearchParams()
  const paramsTabs = params.get('tabs') as PostType | undefined

  const [selectedTab, setSelectedTab] = useState<PostType>(paramsTabs ? paramsTabs : PostType.HEALTH_TIP)
  const lastElementRef = useRef(null)

  const handleTabChange = (value: string) => {
    const postType = value as PostType
    setSelectedTab(postType)

    const newParams = new URLSearchParams(params.toString())
    newParams.set('tabs', postType)

    router.push(`?${newParams.toString()}`)
  }

  useEffect(() => {
    const currentTabs = params.get('tabs') as PostType | null
    if (currentTabs && currentTabs !== selectedTab) {
      setSelectedTab(currentTabs)
    }
  }, [params])

  return (
    <>
      <HomeHeader>
        <Tabs className="sticky top-0" value={selectedTab} data={tabs} handleChange={handleTabChange} />
      </HomeHeader>
      <PostList postType={selectedTab} />
      <section ref={lastElementRef} className="h-10" />
    </>
  )
}
const tabs = [
  {
    label: '건강 Tips',
    value: PostType.HEALTH_TIP
  },
  {
    label: '커뮤니티',
    value: PostType.GENERAL
  }
]
