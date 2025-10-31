'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingCart, Search, Star, Loader2, AlertCircle, Medal, Trophy } from 'lucide-react';
import { useCoupangProducts } from '@/hooks/use-coupang-products';
import { CoupangProduct } from '@/lib/coupang-api';
import { SearchHeader } from '@/layouts/search-header';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  description: string;
  href?: string;
  isRocket?: boolean;
  isFreeShipping?: boolean;
  rank?: number;
}

const categories = ['전체', '육류', '수산물', '두부/콩', '곡물', '채소', '과일', '신선식품'];

// 쿠팡 상품을 Product 인터페이스로 변환하는 함수
function transformCoupangProduct(coupangProduct: CoupangProduct, index: number): Product {
 
  return {
    id: coupangProduct.productId.toString(),
    name: coupangProduct.productName,
    price: coupangProduct.productPrice,
    image: coupangProduct.productImage,
    rating: 4.5, // 쿠팡 API에서 평점을 제공하지 않으므로 기본값 설정
    category: coupangProduct.categoryName || '신선식품',
    description: '',
    href: coupangProduct.productUrl,
    isRocket: coupangProduct.isRocket,
    isFreeShipping: coupangProduct.isFreeShipping,
    rank: coupangProduct.rank
  };
}

export default function ProductsMain() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('rating');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<CoupangProduct[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [activeKeyword, setActiveKeyword] = useState('');

  // 쿠팡 API 연동 (카테고리 ID 1024 = 신선식품) - 기본 베스트 상품
  const { products: coupangProducts, loading, error, refetch } = useCoupangProducts({
    categoryId: '1024',
    limit: isSearchMode ? 10 : 100, // 쿠팡 API limit 제한으로 10개로 설정
    autoFetch: !isSearchMode, // 검색 모드가 아닐 때만 자동 로드
  });

  // URL에서 keyword 파라미터 읽어서 자동 검색
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      // 쉼표로 구분된 키워드들을 배열로 변환
      const keywordArray = keyword.split(',').map(k => k.trim()).filter(k => k);
      setKeywords(keywordArray);

      // 첫 번째 키워드로 검색
      if (keywordArray.length > 0) {
        handleSearch(keywordArray[0]);
        setActiveKeyword(keywordArray[0]);
      }
    }
  }, [searchParams]);

  // 검색 핸들러
  const handleSearch = async (keyword: string) => {
    setSearchKeyword(keyword);
    setActiveKeyword(keyword);
    setIsSearchMode(true);
    setSearchLoading(true);
    setSearchError(null);

    try {
      const response = await fetch(`/api/coupang/search?keyword=${encodeURIComponent(keyword)}&limit=10`);

      if (!response.ok) {
        throw new Error('검색에 실패했습니다');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      setSearchError(err instanceof Error ? err : new Error('검색 중 오류가 발생했습니다'));
    } finally {
      setSearchLoading(false);
    }
  };

  // 키워드 태그 클릭 핸들러
  const handleKeywordClick = (keyword: string) => {
    handleSearch(keyword);
  };

  // 검색 초기화 (베스트 상품으로 돌아가기)
  const resetSearch = () => {
    setIsSearchMode(false);
    setSearchKeyword('');
    setSearchResults([]);
    setSearchError(null);
    setKeywords([]);
    setActiveKeyword('');
  };

  // 쿠팡 상품을 Product 타입으로 변환
  const products = useMemo(
    () => {
      const productsToTransform = isSearchMode ? searchResults : coupangProducts;
      return productsToTransform.map((product, index) => transformCoupangProduct(product, index));
    },
    [coupangProducts, searchResults, isSearchMode]
  );

  // 현재 로딩 및 에러 상태
  const currentLoading = isSearchMode ? searchLoading : loading;
  const currentError = isSearchMode ? searchError : error;

  // 딥링크 생성 후 페이지 이동
  const handlePurchase = async (productUrl: string) => {
    try {
      const response = await fetch('/api/coupang/deeplink', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productUrl }),
      });

      if (!response.ok) {
        throw new Error('딥링크 생성에 실패했습니다');
      }

      const { url } = await response.json();

      // 새 탭에서 딥링크 열기
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating deeplink:', error);
      // 에러 발생 시 원본 URL로 이동
      window.open(productUrl, '_blank');
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '전체' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });


  return (
    <>
      <SearchHeader onSearch={handleSearch} />

      <div className="">
        <div className="space-y-4">
          {/* 검색 모드 표시 및 초기화 */}
          {isSearchMode && (
            <div className='p-4 space-y-3'>
              <div className="flex items-center justify-between px-4 py-2 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">"{activeKeyword}"</span> 검색 결과
                </p>
                <Button onClick={resetSearch} variant="ghost" size="sm" className='hover:text-primary font-bold'>
                  베스트 상품 보기
                </Button>
              </div>

              {/* 키워드 태그들 */}
              {keywords.length > 1 && (
                <div className="flex items-center gap-2 flex-wrap px-2">
                  <span className="text-xs text-muted-foreground font-medium">다른 식재료:</span>
                  {keywords.map((keyword, index) => (
                    <Badge
                      key={index}
                      variant={activeKeyword === keyword ? "default" : "outline"}
                      className={`cursor-pointer text-xs transition-colors ${
                        activeKeyword === keyword
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-primary/10 hover:border-primary'
                      }`}
                      onClick={() => handleKeywordClick(keyword)}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {currentLoading && (
            <div className="text-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">
                  {isSearchMode ? '검색 중...' : '상품을 불러오는 중...'}
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {currentError && !currentLoading && (
            <div className="text-center py-12 border-destructive/50 px-4">
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
                <div className="space-y-2">
                  <p className="text-destructive font-semibold">
                    {isSearchMode ? '검색에 실패했습니다' : '상품을 불러오는데 실패했습니다'}
                  </p>
                  <p className="text-sm text-muted-foreground">{currentError.message}</p>
                </div>
                <Button
                  onClick={isSearchMode ? () => handleSearch(searchKeyword) : refetch}
                  variant="outline"
                  size="sm"
                >
                  다시 시도
                </Button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!currentLoading && !currentError && (
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id + index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-background h-full rounded-none border-0 border-b border-border transition-shadow transition-colors hover:bg-muted  py-2">
                    <CardContent className="flex flex-row gap-4 itmes-center">
                      <div className="aspect-square bg-muted rounded-xl overflow-hidden w-[160px] h-[210px] flex-shrink-0">
                        <img
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="space-y-1 sm:space-y-3 flex flex-col justify-center flex-1">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold text-foreground">{product.name}</h3>
                        <p className="text-sm text-description line-clamp-2">{product.description}</p>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-bold text-foreground">{product.rank}</span>
                          <span className="text-xs text-muted-foreground">{product.isFreeShipping && '무료 배송'}</span>
                        </div>
                        <div className="flex sm:items-center justify-between sm:flex-row flex-col gap-2">
                          <span className="text-xl font-bold text-primary">
                            {product.price.toLocaleString()}원
                          </span>
                          <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => handlePurchase(product.href || '')}
                          >
                            <ShoppingCart className="w-4 h-4" />
                            구매하기
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!currentLoading && !currentError && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div>
                <p className="text-muted-foreground">검색 결과가 없습니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
