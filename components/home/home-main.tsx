'use client'
import { useRef, useState } from "react";
import { Tabs } from "../tabs";
import { HomeHeader } from "./home-header";
import { Posts } from "./posts";



export default function HomeMain() {
    const [selectedTab, setSelectedTab] = useState('tips')
    const lastElementRef = useRef(null);
    return (
        <>
            <HomeHeader>
                <Tabs className="sticky top-0" value={selectedTab} data={tabs} handleChange={setSelectedTab} />
            </HomeHeader>
            <Posts posts={posts} />
            <section ref={lastElementRef} className="h-10" />
        </>
    )
}
const tabs = [
    {
        label: '건강 Tips',
        value: 'tips'
    },
    {
        label: '커뮤니티',
        value: 'community'
    }
]


export const posts = [
    {
        id: "1",
        title: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
        content: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        is_drug: 0,
        membership: 1,
        point: 10,
        is_audlt: 0,
        created_at: "2025-09-01T08:30:00Z",
        likecnt: 23,
        comments: [
            {
                id: "1",
                title: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
                content: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                is_drug: 0,
                membership: 1,
                point: 10,
                is_audlt: 0,
                created_at: "2025-09-01T08:30:00Z",
                likecnt: 23,
                commentcnt: 5,
                comments: [],
                user: { id: "u1", name: "홍길동", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
            },
        ],
        commentcnt: 5,
        user: { id: "u1", name: "홍길동", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
    },
    {
        id: "1",
        title: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
        content: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        is_drug: 0,
        membership: 1,
        point: 10,
        is_audlt: 0,
        created_at: "2025-09-01T08:30:00Z",
        likecnt: 23,
        commentcnt: 5,
        comments: [],
        user: { id: "u1", name: "홍길동", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
    },
]

