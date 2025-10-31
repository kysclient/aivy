import { NextRequest, NextResponse } from 'next/server';
import { createCoupangApiClient } from '@/lib/coupang-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const keyword = searchParams.get('keyword');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    if (!keyword) {
      return NextResponse.json(
        { error: 'Keyword parameter is required' },
        { status: 400 }
      );
    }

    // 쿠팡 API 클라이언트 생성
    const coupangClient = createCoupangApiClient();

    // 상품 검색
    const products = await coupangClient.searchProducts(keyword, limit);

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error in Coupang search API route:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: 'Failed to search products', message: errorMessage },
      { status: 500 }
    );
  }
}
