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
                <Tabs value={selectedTab} data={tabs} handleChange={setSelectedTab} />
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
        feed_list_id: "feed_001",
        title: "아침 산책길에서 본 풍경",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        is_drug: 0,
        membership: 1,
        point: 10,
        is_audlt: 0,
        created_at: "2025-09-01T08:30:00Z",
        likecnt: 23,
        commentcnt: 5,
        user: { id: "u1", name: "홍길동", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
    },
    {
        id: "2",
        feed_list_id: "feed_002",
        title: "맛있는 저녁 한상",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
        is_drug: 0,
        membership: 0,
        point: 5,
        is_audlt: 0,
        created_at: "2025-09-02T19:10:00Z",
        likecnt: 41,
        commentcnt: 12,
        user: { id: "u2", name: "김철수", avatar: "https://randomuser.me/api/portraits/men/45.jpg" }
    },
    {
        id: "3",
        feed_list_id: "feed_003",
        title: "새로 입양한 강아지 🐶",
        image: [
            "https://images.unsplash.com/photo-1558788353-f76d92427f16",
            "https://images.unsplash.com/photo-1558788351-dc0f7c2f6e31"
        ],
        is_drug: 0,
        membership: 1,
        point: 20,
        is_audlt: 0,
        created_at: "2025-09-03T14:22:00Z",
        likecnt: 102,
        commentcnt: 34,
        user: { id: "u3", name: "이영희", avatar: "https://randomuser.me/api/portraits/women/21.jpg" }
    },
    {
        id: "4",
        feed_list_id: "feed_004",
        title: "밤하늘 은하수",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        is_drug: 0,
        membership: 0,
        point: 15,
        is_audlt: 0,
        created_at: "2025-09-03T23:45:00Z",
        likecnt: 76,
        commentcnt: 18,
        user: { id: "u4", name: "박민수", avatar: "https://randomuser.me/api/portraits/men/61.jpg" }
    },
    {
        id: "5",
        feed_list_id: "feed_005",
        title: "해변에서 즐기는 여유",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        is_drug: 0,
        membership: 1,
        point: 12,
        is_audlt: 0,
        created_at: "2025-09-04T16:05:00Z",
        likecnt: 54,
        commentcnt: 9,
        user: { id: "u5", name: "최지우", avatar: "https://randomuser.me/api/portraits/women/30.jpg" }
    },
    {
        id: "6",
        feed_list_id: "feed_006",
        title: "도시의 밤거리",
        image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade",
        is_drug: 0,
        membership: 0,
        point: 7,
        is_audlt: 0,
        created_at: "2025-09-05T21:50:00Z",
        likecnt: 88,
        commentcnt: 15,
        user: { id: "u6", name: "정우성", avatar: "https://randomuser.me/api/portraits/men/19.jpg" }
    },
    {
        id: "7",
        feed_list_id: "feed_007",
        title: "하이킹 중 정상에서",
        image: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6"
        ],
        is_drug: 0,
        membership: 1,
        point: 30,
        is_audlt: 0,
        created_at: "2025-09-06T09:00:00Z",
        likecnt: 134,
        commentcnt: 22,
        user: { id: "u7", name: "한예슬", avatar: "https://randomuser.me/api/portraits/women/50.jpg" }
    },
    {
        id: "8",
        feed_list_id: "feed_008",
        title: "새로 산 기타 🎸",
        image: "https://images.unsplash.com/photo-1511376777868-611b54f68947",
        is_drug: 0,
        membership: 0,
        point: 8,
        is_audlt: 0,
        created_at: "2025-09-06T15:35:00Z",
        likecnt: 29,
        commentcnt: 6,
        user: { id: "u8", name: "강호동", avatar: "https://randomuser.me/api/portraits/men/73.jpg" }
    },
    {
        id: "9",
        feed_list_id: "feed_009",
        title: "겨울 설경 ❄️",
        image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
        is_drug: 0,
        membership: 1,
        point: 18,
        is_audlt: 0,
        created_at: "2025-09-07T11:10:00Z",
        likecnt: 62,
        commentcnt: 13,
        user: { id: "u9", name: "서지수", avatar: "https://randomuser.me/api/portraits/women/60.jpg" }
    },
    {
        id: "10",
        feed_list_id: "feed_010",
        title: "커피 한 잔의 여유 ☕️",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
        is_drug: 0,
        membership: 0,
        point: 6,
        is_audlt: 0,
        created_at: "2025-09-08T08:15:00Z",
        likecnt: 47,
        commentcnt: 7,
        user: { id: "u10", name: "이수진", avatar: "https://randomuser.me/api/portraits/women/42.jpg" }
    }
]
