import { NextRequest, NextResponse } from 'next/server';
import { createCoupangApiClient } from '@/lib/coupang-api';

// 동적 라우트를 강제로 동적으로 렌더링
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    if (!categoryId) {
      return NextResponse.json(
        { error: 'categoryId parameter is required' },
        { status: 400 }
      );
    }

    // 쿠팡 API 클라이언트 생성
    const coupangClient = createCoupangApiClient();

    // 베스트 카테고리 상품 조회
    const products = await coupangClient.getBestCategoryProducts(categoryId, limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in Coupang API route:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: 'Failed to fetch products', message: errorMessage },
      { status: 500 }
    );
  }
}
