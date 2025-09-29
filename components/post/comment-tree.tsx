'use client'
import { useMemo } from 'react'
import { Post } from '@/repositoires/PostRepository'
import { PostItem } from './post-item'
import { buildCommentTree, flattenCommentTree, getConnectionLines, CommentTreeNode } from '@/lib/comment-tree'
import { cn } from '@/lib/utils'

interface CommentTreeProps {
    replies: Post[]
    rootPostId: string
    isLoading?: boolean
}

interface CommentNodeProps {
    node: CommentTreeNode
    index: number
    flatList: CommentTreeNode[]
}

function CommentNode({ node, index, flatList }: CommentNodeProps) {
    const { showBottomLine } = getConnectionLines(node, index, flatList)

    // 다음 댓글이 현재 댓글보다 깊은 depth를 가지면 isParent
    const nextComment = flatList[index + 1]
    const isParent = nextComment && nextComment.depth > node.depth

    return (
        <div className="relative">
            {/* 댓글 본문 */}
            <PostItem
                post={node}
                isOnPost={false}
                isChild={node.depth > 0}
                isParent={isParent}
            />
        </div>
    )
}

export function CommentTree({ replies, rootPostId, isLoading }: CommentTreeProps) {
    const commentTree = useMemo(() => {
        if (!replies.length) return []

        // 백엔드에서 이미 정렬된 평면적 배열을 받으므로 더 간단하게 처리
        return replies.map(post => ({
            ...post,
            children: [],
            depth: post.level ? post.level - 1 : 0, // level 1 = depth 0
            path: []
        }));
    }, [replies])

    if (isLoading) {
        return (
            <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse">
                        <div className="flex gap-3 p-4">
                            <div className="w-10 h-10 bg-muted rounded-full" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-24" />
                                <div className="h-4 bg-muted rounded w-full" />
                                <div className="h-4 bg-muted rounded w-3/4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (!commentTree.length) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                아직 댓글이 없습니다.
            </div>
        )
    }

    return (
        <div className="space-y-0">
            {commentTree.map((node, index) => (
                <CommentNode
                    key={node.id}
                    node={node}
                    index={index}
                    flatList={commentTree}
                />
            ))}
        </div>
    )
}