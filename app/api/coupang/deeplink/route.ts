import { NextRequest, NextResponse } from 'next/server';
import { createCoupangApiClient } from '@/lib/coupang-api';

// 동적 라우트를 강제로 동적으로 렌더링
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productUrl } = body;

    if (!productUrl) {
      return NextResponse.json({ error: 'productUrl is required' }, { status: 400 });
    }

    // productUrl이 이미 파트너스 링크인 경우 그대로 반환
    if (productUrl.includes('link.coupang.com')) {
    }

    // 쿠팡 API 클라이언트 생성
    const coupangClient = createCoupangApiClient();

    // 딥링크 생성 (배열로 전달)
    const bodyData = {
      subId: 'AF6160505',
      coupangUrls: [productUrl],
    };
    const deeplinkUrl = await coupangClient.generateDeepLink(bodyData);

    return NextResponse.json({ url: deeplinkUrl });
  } catch (error) {
    const body = await request.json();
    const { productUrl } = body;
    return NextResponse.json({ url: productUrl });
  }
}
