import { CreatePostDto, Post, PostRepository, PostType, UpdatePostDto } from '@/repositoires/PostRepository';
import useSWR, { mutate } from 'swr';
import useSWRMutation from 'swr/mutation';

const postRepository = new PostRepository();

// SWR 키 생성 함수들
const POST_KEYS = {
    byId: (id: string) => ['post', id],
    all: (page?: number, limit?: number, postType?: PostType) =>
        ['posts', 'all', { page, limit, postType }],
    userPosts: (page?: number, limit?: number) =>
        ['posts', 'user', { page, limit }],
    replies: (postId: string, page?: number, limit?: number) =>
        ['posts', 'replies', postId, { page, limit }],
} as const;

// Fetcher 함수들
const fetchers = {
    getPostById: async ([, id]: [string, string]) => {
        return await postRepository.findById(id);
    },
    getAllPosts: async ([, , params]: [string, string, { page?: number; limit?: number; postType?: PostType }]) => {
        return await postRepository.findAll(params);
    },
    getUserPosts: async ([, , params]: [string, string, { page?: number; limit?: number }]) => {
        return await postRepository.findByUser(params.page, params.limit);
    },
    getReplies: async ([, , postId, params]: [string, string, string, { page?: number; limit?: number }]) => {
        return await postRepository.findReplies(postId, params.page, params.limit);
    },
};

const mutators = {
    createPost: async (url: string, { arg }: { arg: { data: CreatePostDto; images?: File[] } }) => {
        return await postRepository.create(arg.data, arg.images);
    },
    updatePost: async (url: string, { arg }: { arg: { id: string; data: UpdatePostDto } }) => {
        return await postRepository.update(arg.id, arg.data);
    },
    deletePost: async (url: string, { arg }: { arg: string }) => {
        return await postRepository.delete(arg);
    },
    toggleLike: async (url: string, { arg }: { arg: string }) => {
        return await postRepository.toggleLike(arg);
    },
};

// 개별 게시글 조회 훅
export function usePost(id: string | null) {
    const { data, error, isLoading, mutate } = useSWR(
        id ? POST_KEYS.byId(id) : null,
        fetchers.getPostById,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 30000,
        }
    );

    return {
        post: data,
        isLoading,
        error,
        refresh: mutate,
    };
}

// 게시글 목록 조회 훅
export function usePosts(page: number = 1, limit: number = 10, postType?: PostType) {
    const { data, error, isLoading, mutate } = useSWR(
        POST_KEYS.all(page, limit, postType),
        fetchers.getAllPosts,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 10000,
        }
    );

    return {
        posts: data?.data || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || page,
        totalPages: data?.pagination?.totalPages || 0,
        hasNext: data?.pagination?.hasNext || false,
        hasPrev: data?.pagination?.hasPrev || false,
        isLoading,
        error,
        refresh: mutate,
    };
}

// 건강 팁 게시글 조회 훅
export function useHealthTipPosts(page: number = 1, limit: number = 10) {
    return usePosts(page, limit, PostType.HEALTH_TIP);
}

// 일반 게시글 조회 훅 (커뮤니티)
export function useGeneralPosts(page: number = 1, limit: number = 10) {
    return usePosts(page, limit, PostType.GENERAL);
}

// 내 게시글 조회 훅
export function useMyPosts(page: number = 1, limit: number = 10) {
    const { data, error, isLoading, mutate } = useSWR(
        POST_KEYS.userPosts(page, limit),
        fetchers.getUserPosts,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 10000,
        }
    );

    return {
        posts: data?.data || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || page,
        totalPages: data?.pagination?.totalPages || 0,
        hasNext: data?.pagination?.hasNext || false,
        hasPrev: data?.pagination?.hasPrev || false,
        isLoading,
        error,
        refresh: mutate,
    };
}

// 댓글 조회 훅
export function useReplies(postId: string, page: number = 1, limit: number = 10) {
    const { data, error, isLoading, mutate } = useSWR(
        POST_KEYS.replies(postId, page, limit),
        fetchers.getReplies,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 10000,
        }
    );

    return {
        replies: data?.data || [],
        total: data?.pagination?.total || 0,
        page: data?.pagination?.page || page,
        totalPages: data?.pagination?.totalPages || 0,
        hasNext: data?.pagination?.hasNext || false,
        hasPrev: data?.pagination?.hasPrev || false,
        isLoading,
        error,
        refresh: mutate,
    };
}

// 모든 댓글을 트리 구조로 조회하는 훅
export function useAllReplies(postId: string) {
    const { data, error, isLoading, mutate } = useSWR(
        postId ? `all-replies-${postId}` : null,
        async () => await postRepository.findAllReplies(postId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 30000,
        }
    );

    return {
        allReplies: data || [],
        isLoading,
        error,
        refresh: mutate,
    };
}

// 게시글 생성 훅
export function useCreatePost() {
    const { trigger, isMutating } = useSWRMutation(
        'create-post',
        mutators.createPost
    );

    const createPost = async (data: CreatePostDto, images?: File[]) => {
        try {
            const newPost = await trigger({ data, images });

            // 관련 캐시 무효화
            await Promise.all([
                // 전체 게시글 캐시 무효화
                mutate(key => Array.isArray(key) && key[0] === 'posts' && key[1] === 'all'),
                // 해당 타입의 게시글 캐시 무효화
                mutate(key => Array.isArray(key) && key[0] === 'posts' && key[1] === 'all' && key[2]?.postType === data.postType),
                // 내 게시글 캐시 무효화 (내가 작성한 경우)
                mutate(key => Array.isArray(key) && key[0] === 'posts' && key[1] === 'user'),
                // 댓글인 경우 부모 댓글 캐시 무효화
                ...(data.parentId ? [
                    mutate(POST_KEYS.replies(data.parentId)),
                    mutate(POST_KEYS.byId(data.parentId)), // 댓글 수 업데이트를 위해
                    mutate(`all-replies-${data.parentId}`) // 트리 구조 댓글 캐시 무효화
                ] : [])
            ]);

            return newPost;
        } catch (error) {
            throw error;
        }
    };

    return {
        createPost,
        isCreating: isMutating,
    };
}

// 게시글 수정 훅
export function useUpdatePost() {
    const { trigger, isMutating } = useSWRMutation(
        'update-post',
        mutators.updatePost
    );

    const updatePost = async (id: string, data: UpdatePostDto) => {
        try {
            const updatedPost = await trigger({ id, data });

            // 관련 캐시 업데이트
            await Promise.all([
                // 개별 게시글 캐시 업데이트
                mutate(POST_KEYS.byId(id), updatedPost, { revalidate: false }),
                // 전체 게시글 목록 캐시 갱신
                mutate(key => Array.isArray(key) && key[0] === 'posts'),
            ]);

            return updatedPost;
        } catch (error) {
            throw error;
        }
    };

    return {
        updatePost,
        isUpdating: isMutating,
    };
}

// 게시글 삭제 훅
export function useDeletePost() {
    const { trigger, isMutating } = useSWRMutation(
        'delete-post',
        mutators.deletePost
    );

    const deletePost = async (id: string) => {
        try {
            await trigger(id);

            // 관련 캐시 무효화
            await Promise.all([
                // 개별 게시글 캐시 삭제
                mutate(POST_KEYS.byId(id), undefined, { revalidate: false }),
                // 전체 게시글 목록 캐시 갱신
                mutate(key => Array.isArray(key) && key[0] === 'posts'),
            ]);

            return true;
        } catch (error) {
            throw error;
        }
    };

    return {
        deletePost,
        isDeleting: isMutating,
    };
}

// 게시글 좋아요 토글 훅
export function useToggleLike() {
    const { trigger, isMutating } = useSWRMutation(
        'toggle-like',
        mutators.toggleLike
    );

    const toggleLike = async (id: string) => {
        try {
            const result = await trigger(id);

            // 개별 게시글 캐시 업데이트
            mutate(
                POST_KEYS.byId(id),
                (current: Post | undefined) =>
                    current ? {
                        ...current,
                        isLiked: result.isLiked,
                        likeCnt: result.likeCnt
                    } : current,
                { revalidate: false }
            );

            // 목록 캐시도 업데이트
            await mutate(key => {
                if (Array.isArray(key) && key[0] === 'posts') {
                    return true; // 재검증
                }
                return false;
            });

            return result;
        } catch (error) {
            throw error;
        }
    };

    return {
        toggleLike,
        isMutating,
    };
}

// 게시글 관리 통합 훅
export function usePostManager() {
    const { createPost, isCreating } = useCreatePost();
    const { updatePost, isUpdating } = useUpdatePost();
    const { deletePost, isDeleting } = useDeletePost();
    const { toggleLike, isMutating: isLikeMutating } = useToggleLike();

    // 전체 캐시 갱신
    const refreshAllCaches = async () => {
        await Promise.all([
            mutate(key => Array.isArray(key) && key[0] === 'posts'),
            mutate(key => Array.isArray(key) && key[0] === 'post'),
        ]);
    };

    return {
        createPost,
        updatePost,
        deletePost,
        toggleLike,
        refreshAllCaches,
        isCreating,
        isUpdating,
        isDeleting,
        isLikeMutating,
        isMutating: isCreating || isUpdating || isDeleting || isLikeMutating,
    };
}