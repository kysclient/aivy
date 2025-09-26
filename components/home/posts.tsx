import { Post as PostType } from '@/repositoires/PostRepository'
import { memo } from 'react'
import { Loading } from '../loading'
import PostSkeleton from './post-skeleton'
import { NoPosts } from './no-posts'
import { Post } from './post'


interface PostsProps {
    posts: PostType[] | null | undefined
    isLoading?: boolean
}

function PurePosts({ isLoading, posts }: PostsProps) {
    return (
        <div className="flex flex-col">
            {posts ? (
                <>
                    {posts.map((post, idx) => (
                        <Post key={`${post.id}_${idx}`} post={post} />
                    ))}
                    {posts.length === 0 && <NoPosts />}
                </>
            ) : (
                <PostSkeleton count={5} />
            )}

            {isLoading && (
                <div className="py-4 flex justify-center items-center">
                    <Loading className="text-primary w-7 h-7" />
                </div>
            )}
        </div>
    )
}

export const Posts = memo(PurePosts, (prevProps, nextProps) => {
    return false
})
