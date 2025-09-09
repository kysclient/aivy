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
        title: "아침에 일어나자마자 따뜻한 물 한 잔을 마시면 장운동을 도와주고, 하루를 활기차게 시작할 수 있는 좋은 습관이 됩니다.",
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
        title: "저녁은 과식을 피하고 가볍게 채소와 단백질 위주로 식사하면 숙면에도 도움이 되고 체중 관리에도 효과적입니다.",
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
        title: "단백질은 한 번에 많이 섭취하는 것보다 하루 세 끼에 나누어 섭취해야 근육 유지와 회복에 좋고, 포만감 유지에도 도움이 됩니다.",
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
        title: "숙면을 위해서는 잠들기 최소 2시간 전에는 음식을 피하고, 대신 따뜻한 차 한 잔이나 가벼운 스트레칭으로 몸을 편안하게 해보세요.",
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
        title: "매일 30분 정도의 가벼운 산책이나 조깅은 체중 관리뿐 아니라 스트레스 해소와 정신 건강에도 큰 도움이 됩니다.",
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
        title: "바쁜 도시 생활 중에도 틈틈이 자리에서 일어나 스트레칭을 하면 혈액순환을 촉진해 피로를 줄이고 집중력을 높일 수 있습니다.",
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
        title: "등산이나 하이킹은 심폐 지구력을 강화하고 근육 발달을 도와줄 뿐만 아니라, 맑은 공기와 자연 속에서 스트레스까지 해소할 수 있습니다.",
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
        title: "취미 활동을 꾸준히 이어가는 것은 정신 건강에 큰 도움이 됩니다. 특히 음악이나 악기 연주는 스트레스 해소와 뇌 자극에 효과적입니다.",
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
        title: "겨울철에는 햇빛이 부족해 비타민D 결핍이 생기기 쉽습니다. 균형 잡힌 식사와 함께 보충제를 섭취하면 면역력 유지에 도움이 됩니다.",
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
        title: "커피를 줄이고 대신 허브티나 보이차를 마시면 카페인 과다 섭취를 예방할 수 있고, 몸을 따뜻하게 해주어 컨디션 관리에 도움이 됩니다.",
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

