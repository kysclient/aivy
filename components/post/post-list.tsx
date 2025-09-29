'use client'
import { memo, useState, useEffect, useRef } from 'react';
import { PostType } from '@/repositoires/PostRepository';
import { usePosts } from '@/hooks/use-posts';
import { Loading } from '../loading';
import PostSkeleton from '../home/post-skeleton';
import { NoPosts } from '../home/no-posts';
import { PostItem } from './post-item';
import { Button } from '../ui/button';

interface PostListProps {
    postType: PostType;
}

function PurePostList({ postType }: PostListProps) {
    const [page, setPage] = useState(1);
    const [accumulatedPosts, setAccumulatedPosts] = useState<any[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const limit = 10;

    const {
        posts,
        hasNext,
        isLoading,
        error,
        refresh
    } = usePosts(page, limit, postType);

    // postType이 변경되면 페이지를 1로 리셋하고 누적된 게시글을 초기화
    useEffect(() => {
        setPage(1);
        setAccumulatedPosts([]);
        setIsLoadingMore(false);
    }, [postType]);

    // 새로운 게시글이 로드될 때마다 누적
    useEffect(() => {
        if (posts && posts.length > 0) {
            if (page === 1) {
                setAccumulatedPosts(posts);
            } else {
                setAccumulatedPosts(prev => [...prev, ...posts]);
            }
            setIsLoadingMore(false);
        }
    }, [posts, page]);


    // Intersection Observer를 사용한 무한 스크롤
    useEffect(() => {
        const currentElement = observerRef.current;

        if (!currentElement) {
            return;
        }

        if (!hasNext) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                  

                    if (entry.isIntersecting && hasNext && !isLoading && !isLoadingMore) {
                        setIsLoadingMore(true);
                        setPage(prev => {
                            return prev + 1;
                        });
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '100px 0px'
            }
        );

        observer.observe(currentElement);

        return () => {
            observer.unobserve(currentElement);
        };
    }, [hasNext, isLoading, isLoadingMore, accumulatedPosts.length]);


    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-8">
                <p className="text-red-500 mb-4">게시글을 불러오는데 실패했습니다.</p>
                <Button onClick={() => refresh()} variant="outline">
                    다시 시도
                </Button>
            </div>
        );
    }
    return (
        <div className="flex flex-col">
            {isLoading && page === 1 ? (
                <PostSkeleton count={5} />
            ) : (
                <>
                    {accumulatedPosts.length > 0 ? (
                        <>
                            {accumulatedPosts.map((post, idx) => (
                                <PostItem key={`${post.id}_${idx}`} post={post} postType={postType} />
                            ))}

                            {/* 무한 스크롤 트리거 요소 */}
                            <div
                                ref={observerRef}
                                className="py-4 flex justify-center items-center min-h-[40px]"
                                style={{ visibility: hasNext ? 'visible' : 'hidden' }}
                            >
                                {(isLoading || isLoadingMore) ? (
                                    <div className="flex items-center gap-2">
                                        <Loading className="text-primary w-5 h-5" />
                                    </div>
                                ) : hasNext ? (
                                    <div className="text-sm text-muted-foreground">
                                        <Loading className="text-primary w-5 h-5" />
                                    </div>
                                ) : (
                                    <div className="text-sm text-muted-foreground opacity-50">
                                        No more posts
                                    </div>
                                )}
                            </div>

                            {/* 마지막 게시물 메시지 */}
                            {!hasNext && accumulatedPosts.length > 0 && (
                                <div className="py-4 flex justify-center items-center">
                                    <div className="text-sm text-muted-foreground  pt-4">
                                        마지막 게시물입니다
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <NoPosts />
                    )}
                </>
            )}
        </div>
    );
}

export const PostList = memo(PurePostList, (prevProps, nextProps) => {
    return prevProps.postType === nextProps.postType;
});