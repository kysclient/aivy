'use client';

import { useState, useEffect } from 'react';
import { CoupangProduct } from '@/lib/coupang-api';

interface UseCoupangProductsOptions {
  categoryId?: string | number;
  limit?: number;
  autoFetch?: boolean;
}

interface UseCoupangProductsReturn {
  products: CoupangProduct[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * 쿠팡 파트너스 API로부터 베스트 카테고리 상품을 가져오는 커스텀 훅
 */
export function useCoupangProducts({
  categoryId = '1024',
  limit = 10,
  autoFetch = true,
}: UseCoupangProductsOptions = {}): UseCoupangProductsReturn {
  const [products, setProducts] = useState<CoupangProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/coupang/best-categories/${categoryId}?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(errorMessage);
      console.error('Error fetching Coupang products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchProducts();
    }
  }, [categoryId, limit, autoFetch]);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
  };
}
