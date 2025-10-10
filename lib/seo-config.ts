import { Metadata } from 'next';

const baseUrl = 'https://aivy.co.kr';

// 페이지별 SEO 설정
export const pageMetadata = {
  mealPlan: {
    title: 'AI 식단 생성 - 나만의 맞춤 식단 만들기',
    description:
      'AI가 분석한 개인 맞춤형 식단을 30초 만에 생성하세요. 아이비의 AI 식단 생성으로 건강 목표를 달성하세요. 다이어트, 근육 증가, 건강 관리 모두 가능합니다.',
    keywords:
      '아이비 식단 생성, AI 식단, 맞춤 식단, 식단 만들기, 다이어트 식단, 헬스 식단, 건강 식단, 30일 식단',
    url: `${baseUrl}`,
  },
  posts: {
    title: '아이비(Aivy) - AI 맞춤 식단과 건강관리',
    description:
      'AI가 만드는 나만의 건강 식단! 아이비(Aivy)에서 맞춤 식단 생성부터 영양 분석까지 한 번에. 건강한 식생활을 시작하세요.',
    keywords:
      '아이비, aivy, Aivy, AI 식단, 맞춤 식단, 건강 관리, 식단 추천, 건강 앱',
    url: `${baseUrl}/posts`,
  },
  plans: {
    title: '나의 식단 관리 - 맞춤 식단 보기',
    description:
      '내가 생성한 맞춤 식단을 확인하고 관리하세요. 아이비에서 일일 식단, 영양소 분석, 칼로리 추적을 한눈에 확인할 수 있습니다.',
    keywords:
      '식단 관리, 나의 식단, 식단 보기, 영양소 분석, 칼로리 추적, 식단 기록, 건강 기록',
    url: `${baseUrl}/plans`,
  },
  products: {
    title: '건강 상품 추천 - AI 맞춤 상품',
    description:
      '나의 식단과 건강 목표에 맞는 상품을 AI가 추천해드립니다. 건강식품, 식재료, 운동용품까지 아이비에서 찾아보세요.',
    keywords:
      '건강 상품, 상품 추천, 식재료, 건강식품, 영양제, 운동용품, 쇼핑',
    url: `${baseUrl}/products`,
  },
  settings: {
    title: '설정 - 아이비',
    description: '아이비 앱 설정 및 개인정보 관리',
    keywords: '설정, 개인정보, 계정 관리',
    url: `${baseUrl}/settings`,
  },
};

// 페이지별 Open Graph 이미지 생성 함수
export const getOpenGraphImage = (page: keyof typeof pageMetadata) => {
  return {
    url: `${baseUrl}/og-${page}.png`,
    width: 1200,
    height: 630,
    alt: pageMetadata[page].title,
    type: 'image/png',
  };
};

// 메타데이터 생성 헬퍼 함수
export const generatePageMetadata = (
  page: keyof typeof pageMetadata
): Metadata => {
  const pageData = pageMetadata[page];

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: pageData.url,
      siteName: '아이비',
      locale: 'ko_KR',
      type: 'website',
      images: [getOpenGraphImage(page)],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [getOpenGraphImage(page).url],
    },
    alternates: {
      canonical: pageData.url,
    },
  };
};