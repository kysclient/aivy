import { NextRequest, NextResponse } from 'next/server';
import { createCoupangApiClient } from '@/lib/coupang-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productUrl } = body;


    if (!productUrl) {
      return NextResponse.json(
        { error: 'productUrl is required' },
        { status: 400 }
      );
    }

    // productUrl이 이미 파트너스 링크인 경우 그대로 반환
    if (productUrl.includes('link.coupang.com')) {
      return NextResponse.json({ url: productUrl });
    }

    // 쿠팡 API 클라이언트 생성
    const coupangClient = createCoupangApiClient();

    // 딥링크 생성 (배열로 전달)
    const bodyData = {
      subId: 'AF6160505',
      coupangUrls: [productUrl]
    }
    const deeplinkUrl = await coupangClient.generateDeepLink(bodyData);

    return NextResponse.json({ url: deeplinkUrl });
  } catch (error) {
    console.error('Error in Coupang deeplink API route:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    return NextResponse.json(
      { error: 'Failed to generate deeplink', message: errorMessage },
      { status: 500 }
    );
  }
}
