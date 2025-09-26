import { User } from '@/types/user';
import { BaseRepository } from './base/BaseRepository';
import { PaginatedResponse } from './base/IBaseRepository';
import { apiClient } from '@/api/api-client';

export enum PostType {
    GENERAL = 'general',
    HEALTH_TIP = 'health_tip',
    NOTICE = 'notice',
    QNA = 'qna',
}

export interface Post {
    id: string;
    userId: string;
    parentId?: string;
    content: string;
    image?: any;
    likes: string[];
    postType: PostType;
    membership: boolean;
    point: number;
    isAdult: boolean;
    likeCnt: number;
    commentCnt: number;
    isLiked?: boolean; // 현재 사용자가 좋아요했는지 여부
    user: User;
    parent?: Post;
    replies: Post[];
    createdAt: string;
    updatedAt: string;
}

export interface CreatePostDto {
    content: string;
    image?: any;
    postType: PostType;
    parentId?: string;
    membership?: boolean;
    point?: number;
    isAdult?: boolean;
}

export interface UpdatePostDto {
    content?: string;
    image?: any;
    postType?: PostType;
    membership?: boolean;
    point?: number;
    isAdult?: boolean;
}

export class PostRepository extends BaseRepository<Post> {
    protected endpoint = '/posts';

    async findAll(
        page: number = 1,
        limit: number = 10,
        postType?: PostType
    ): Promise<PaginatedResponse<Post>> {
        const params: any = { page, limit };
        if (postType) {
            params.postType = postType;
        }

        const response = await apiClient.get<any>(this.endpoint, params);

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch posts');
        }

        return response.data;
    }

    async findByUser(
        userId: string,
        page: number = 1,
        limit: number = 10
    ): Promise<PaginatedResponse<Post>> {
        const response = await apiClient.get<any>(`${this.endpoint}/my`, {
            page,
            limit
        });

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch user posts');
        }

        return response.data;
    }

    async findReplies(
        postId: string,
        page: number = 1,
        limit: number = 10
    ): Promise<PaginatedResponse<Post>> {
        const response = await apiClient.get<any>(`${this.endpoint}/${postId}/replies`, {
            page,
            limit
        });

        if (!response.success) {
            throw new Error(response.error || 'Failed to fetch replies');
        }

        return response.data;
    }

    async toggleLike(postId: string): Promise<{ isLiked: boolean; likeCnt: number }> {
        const response = await apiClient.post<any>(`${this.endpoint}/${postId}/like`);

        if (!response.success) {
            throw new Error(response.error || 'Failed to toggle like');
        }

        return response.data;
    }

    async create(data: CreatePostDto): Promise<Post> {
        return super.create(data);
    }

    async update(id: string, data: UpdatePostDto): Promise<Post> {
        return super.update(id, data);
    }
}