import { User } from './user';

export enum PostType {
  GENERAL = 'general',
  HEALTH_TIP = 'health_tip',
  NOTICE = 'notice',
  QNA = 'qna',
}

export type Post = {
  id: string;
  userId: string;
  parentId?: string;
  content: string;
  image?: any;
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
};
