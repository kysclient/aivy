import { User } from "./user"

export type Post = {
    id: string
    title: string
    content: string
    image: string | string[]
    is_drug: number
    membership: number
    point: number
    is_audlt: number
    created_at: string
    likecnt: number
    commentcnt: number
    comments: Post[]
    user: User
}