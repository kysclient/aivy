import { User } from "./user"

export type Post = {
    id: string
    feed_list_id: string
    title: string
    image: string | string[]
    is_drug: number
    membership: number
    point: number
    is_audlt: number
    created_at: string
    likecnt: number
    commentcnt: number
    user: User
}