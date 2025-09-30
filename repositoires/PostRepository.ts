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
  level?: number; // 백엔드에서 제공하는 댓글 깊이 (1부터 시작)
  user: User;
  parent?: Post;
  replies: Post[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  content: string;
  postType: PostType;
  parentId?: string;
  membership?: boolean;
  point?: number;
  isAdult?: boolean;
}

export interface UpdatePostDto {
  content?: string;
  postType?: PostType;
  membership?: boolean;
  point?: number;
  isAdult?: boolean;
}

export class PostRepository extends BaseRepository<Post> {
  protected endpoint = '/posts';

  async findAll(options?: {
    page?: number;
    limit?: number;
    postType?: PostType;
  }): Promise<PaginatedResponse<Post>> {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const postType = options?.postType;

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

  async findByUser(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get<any>(`${this.endpoint}/my`, {
      page,
      limit,
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch user posts');
    }

    return response.data;
  }

  async findReplies(
    postId: string,
    page: number = 1,
    limit: number = 50
  ): Promise<PaginatedResponse<Post>> {
    const response = await apiClient.get<any>(`${this.endpoint}/${postId}/replies`, {
      page,
      limit,
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch replies');
    }

    return response.data;
  }

  async findAllReplies(postId: string): Promise<Post[]> {
    const response = await apiClient.get<any>(`${this.endpoint}/${postId}/all-replies`);

    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch all replies');
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

  async create(data: CreatePostDto, images?: File[]): Promise<Post> {
    const formData = new FormData();

    // 텍스트 데이터만 추가 (image 필드 제외)
    formData.append('content', data.content);
    if (data.postType) formData.append('postType', data.postType);
    if (data.parentId) formData.append('parentId', data.parentId);
    if (data.membership !== undefined) formData.append('membership', data.membership.toString());
    if (data.point !== undefined) formData.append('point', data.point.toString());
    if (data.isAdult !== undefined) formData.append('isAdult', data.isAdult.toString());

    // 이미지 파일들 추가
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append('images', file);
      });
    }

    // FormData 전송 시 Content-Type을 설정하지 않아 브라우저가 자동으로 boundary를 포함한 multipart/form-data로 설정하도록 함
    const response = await apiClient.post<any>(this.endpoint, formData, {
      headers: {
        'Content-Type': undefined, // axios가 자동으로 multipart/form-data와 boundary를 설정하도록
      },
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to create post');
    }

    return response.data;
  }

  async update(id: string, data: UpdatePostDto): Promise<Post> {
    return super.update(id, data);
  }
}
