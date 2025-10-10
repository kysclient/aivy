
import { Posts } from '../home/posts'
import { Post } from '@/repositoires/PostRepository';

interface ProfilePostProps {
    posts: Post[]
    isLoading: boolean
}

export function ProfilePost({ posts, isLoading }: ProfilePostProps) {

    return <Posts posts={posts} isLoading={isLoading} />
}
