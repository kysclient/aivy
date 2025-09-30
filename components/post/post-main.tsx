'use client';
import { useRef, useState } from 'react';
import { Tabs } from '../tabs';
import { HomeHeader } from '../home/home-header';
import { PostList } from './post-list';
import { PostType } from '@/repositoires/PostRepository';

const tabs = [
  {
    label: '건강 Tips',
    value: 'health_tip',
  },
  {
    label: '커뮤니티',
    value: 'general',
  },
];

export default function PostMain() {
  const [selectedTab, setSelectedTab] = useState<PostType>(PostType.HEALTH_TIP);
  const lastElementRef = useRef(null);

  const handleTabChange = (value: string) => {
    setSelectedTab(value as PostType);
  };

  return (
    <>
      <HomeHeader>
        <Tabs
          className="sticky top-0"
          value={selectedTab}
          data={tabs}
          handleChange={handleTabChange}
        />
      </HomeHeader>
      <PostList postType={selectedTab} />
      <section ref={lastElementRef} className="h-10" />
    </>
  );
}
