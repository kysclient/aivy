import { Post } from '@/repositoires/PostRepository';

export interface CommentTreeNode extends Post {
  children: CommentTreeNode[];
  depth: number;
  path: string[];
}

/**
 * 백엔드에서 level 정보가 포함된 댓글 배열을 트리 구조로 변환
 * (백엔드에서 이미 재귀 쿼리로 정렬된 데이터를 받음)
 */
export function buildCommentTree(posts: Post[], rootId?: string): CommentTreeNode[] {
  const postMap = new Map<string, CommentTreeNode>();
  const roots: CommentTreeNode[] = [];

  // 모든 포스트를 맵에 저장하고 기본 구조 설정
  posts.forEach((post) => {
    const depth = post.level ? post.level - 1 : 0; // level 1 = depth 0으로 변환
    postMap.set(post.id, {
      ...post,
      children: [],
      depth,
      path: [],
    });
  });

  // 트리 구조 구축 (이미 정렬된 순서대로 처리)
  posts.forEach((post) => {
    const node = postMap.get(post.id)!;

    if (!post.parentId || post.parentId === rootId) {
      // 루트 댓글 (level 1)
      roots.push(node);
    } else {
      // 자식 댓글
      const parent = postMap.get(post.parentId);
      if (parent) {
        node.path = [...parent.path, parent.id];
        parent.children.push(node);
      } else {
        // 부모를 찾을 수 없는 경우 루트로 처리
        roots.push(node);
      }
    }
  });

  return roots; // 백엔드에서 이미 정렬되어 왔으므로 추가 정렬 불필요
}

/**
 * 트리 구조를 평면적인 배열로 변환 (렌더링용)
 */
export function flattenCommentTree(trees: CommentTreeNode[]): CommentTreeNode[] {
  const result: CommentTreeNode[] = [];

  const traverse = (nodes: CommentTreeNode[]) => {
    nodes.forEach((node) => {
      result.push(node);
      if (node.children.length > 0) {
        traverse(node.children);
      }
    });
  };

  traverse(trees);
  return result;
}

/**
 * Thread/Instagram 스타일 연결선 계산 (간단하게)
 */
export function getConnectionLines(
  node: CommentTreeNode,
  index: number,
  flatList: CommentTreeNode[]
): {
  showBottomLine: boolean;
} {
  // 다음 댓글이 현재 댓글의 자식인지 확인
  const nextComment = flatList[index + 1];
  const hasChildren = nextComment && nextComment.depth > node.depth;

  // 자식 댓글이 있으면 연결선 표시
  const showBottomLine = hasChildren;

  return {
    showBottomLine,
  };
}
