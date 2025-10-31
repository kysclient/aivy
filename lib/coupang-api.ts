import { generateCoupangAuthHeader } from './coupang-auth';

const COUPANG_API_BASE_URL = 'https://api-gateway.coupang.com';

export interface CoupangProduct {
  productId: number;
  productName: string;
  productPrice: number;
  productImage: string;
  productUrl: string;
  categoryName?: string;
  isRocket?: boolean;
  isFreeShipping?: boolean;
  rank?: number;
}

export interface CoupangBestCategoryResponse {
  rCode: string;
  rMessage: string;
  data: Array<{
    productId: number;
    productName: string;
    productPrice: number;
    productImage: string;
    productUrl: string;
    categoryName?: string;
    isRocket?: boolean;
    isFreeShipping?: boolean;
    rank?: number;
  }>;
}

export class CoupangApiClient {
  private accessKey: string;
  private secretKey: string;

  constructor(accessKey: string, secretKey: string) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
  }

  /**
   * 베스트 카테고리 상품 조회
   * @param categoryId 카테고리 ID (예: 1024)
   * @param limit 조회할 상품 수 (기본값: 10)
   */
  async getBestCategoryProducts(
    categoryId: string | number,
    limit: number = 10
  ): Promise<CoupangProduct[]> {
    const endpoint = `/v2/providers/affiliate_open_api/apis/openapi/products/bestcategories/${categoryId}`;
    const queryParams = `limit=${limit}`;
    const url = `${COUPANG_API_BASE_URL}${endpoint}?${queryParams}`;

    try {
      const authHeader = generateCoupangAuthHeader(
        'GET',
        url,
        this.secretKey,
        this.accessKey
      );

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Coupang API error response:', errorText);
        throw new Error(
          `Coupang API request failed: ${response.status} ${response.statusText}`
        );
      }

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Failed to parse response JSON');
      }

      // rCode 체크 (있는 경우에만)
      if (data.rCode && data.rCode !== '0') {
        throw new Error(`Coupang API error: ${data.rMessage || 'Unknown error'}`);
      }

      // 데이터가 배열인지 확인
      if (Array.isArray(data)) {
        return data;
      }

      // data 프로퍼티가 있는 경우
      if (data.data) {
        return data.data;
      }

      return [];
    } catch (error) {
      throw error;
    }
  }

  /**
   * 상품 검색
   * @param keyword 검색 키워드
   * @param limit 조회할 상품 수
   */
  async searchProducts(keyword: string, limit: number = 10): Promise<CoupangProduct[]> {
    const endpoint = `/v2/providers/affiliate_open_api/apis/openapi/products/search`;
    const queryParams = `keyword=${encodeURIComponent(keyword)}&limit=${limit}&imageSize=200x200`;
    const url = `${COUPANG_API_BASE_URL}${endpoint}?${queryParams}`;

    try {
      const authHeader = generateCoupangAuthHeader(
        'GET',
        url,
        this.secretKey,
        this.accessKey
      );

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      });


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Coupang API request failed: ${response.status} ${response.statusText}`
        );
      }

      const responseText = await response.text();

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        throw new Error('Failed to parse response JSON');
      }


      // rCode 체크 (있는 경우에만)
      if (data.rCode && data.rCode !== '0') {
        throw new Error(`Coupang API error: ${data.rMessage || 'Unknown error'}`);
      }

      // 검색 API의 경우: data.productData 배열
      if (data.data && data.data.productData && Array.isArray(data.data.productData)) {
        return data.data.productData;
      }

      // 데이터가 배열인지 확인
      if (Array.isArray(data)) {
        return data;
      }

      // data 프로퍼티가 있는 경우
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }

      // 예상치 못한 구조
      return [];
    } catch (error) {
      throw error;
    }
  }

  /**
   * 딥링크 생성
   * @param coupangUrls 쿠팡 상품 URL 배열
   * @returns 파트너스 링크
   */
  async generateDeepLink(bodyData: any): Promise<string> {
    const endpoint = `/v2/providers/affiliate_open_api/apis/openapi/deeplink`;
    const url = `${COUPANG_API_BASE_URL}${endpoint}`;

    try {
      const authHeader = generateCoupangAuthHeader(
        'POST',
        url,
        this.secretKey,
        this.accessKey
      );

      const requestBody = bodyData;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          `Coupang API request failed: ${response.status} ${response.statusText}`
        );
      }

      const data: { rCode: string; rMessage: string; data: string } = JSON.parse(responseText);

      if (data.rCode !== '0') {
        throw new Error(`Coupang API error: ${data.rMessage}`);
      }

      return data.data;
    } catch (error) {
      throw error;
    }
  }
}

// 쿠팡 API 클라이언트 인스턴스 생성
export function createCoupangApiClient(): CoupangApiClient {
  const accessKey = process.env.NEXT_PUBLIC_COUPANG_PARTNERS_ACCESS_KEY;
  const secretKey = process.env.NEXT_PUBLIC_COUPANG_SECRET_KEY;

  if (!accessKey || !secretKey) {
    throw new Error('Coupang API keys are not configured');
  }

  return new CoupangApiClient(accessKey, secretKey);
}
