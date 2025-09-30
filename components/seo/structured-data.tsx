import Script from 'next/script';

export const OrganizationSchema = () => {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '아이비',
    alternateName: ['아이비', 'AI 식단'],
    url: 'https://aivy.co.kr',
    logo: 'https://aivy.co.kr/logo.png',
    description: 'AI 기반 맞춤형 식단 추천 및 스마트 쇼핑 서비스',
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: '서울특별시',
      addressRegion: '서울특별시',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+82-2-1234-5678',
        contactType: 'customer service',
        availableLanguage: ['Korean', 'English'],
        areaServed: 'KR',
      },
    ],
    sameAs: [
      'https://www.instagram.com/aivy_official', // 실제 SNS 계정으로 변경
      'https://www.facebook.com/aivy.official',
      'https://blog.naver.com/aivy_official',
      'https://www.youtube.com/@aivy_official',
    ],
    brand: {
      '@type': 'Brand',
      name: '아이비',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
};

// 웹사이트 정보
export const WebSiteSchema = () => {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: '아이비 - AI 맞춤 식단과 스마트 쇼핑',
    url: 'https://aivy.co.kr',
    description: 'AI가 추천하는 개인 맞춤 식단과 스마트 쇼핑 서비스',
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://aivy.co.kr/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: '아이비',
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
};

// 모바일 앱 정보
export const MobileAppSchema = () => {
  const appData = {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: '아이비 - AI 식단 쇼핑',
    description: 'AI 맞춤 식단 추천과 스마트 쇼핑을 한 번에',
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'DietApplication',
    operatingSystem: ['iOS', 'Android', 'Web'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8', // 실제 평점으로 변경
      ratingCount: '1250', // 실제 리뷰 수로 변경
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: '아이비',
    },
    downloadUrl: [],
  };

  return (
    <Script
      id="mobile-app-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
    />
  );
};

// 서비스/제품 정보
export const ServiceSchema = () => {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI 맞춤 식단 추천 서비스',
    description: '개인의 건강 상태, 선호도, 목표에 맞는 AI 기반 식단 계획 및 식재료 쇼핑 서비스',
    provider: {
      '@type': 'Organization',
      name: 'Aivy',
    },
    serviceType: '건강 및 영양 관리',
    areaServed: {
      '@type': 'Country',
      name: '대한민국',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '아이비 서비스 카탈로그',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI 맞춤 식단 계획',
            description: '개인 맞춤형 식단 추천 및 영양 관리',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '스마트 식재료 쇼핑',
            description: '식단에 맞는 식재료 자동 추천 및 주문',
          },
        },
      ],
    },
    category: ['건강관리', '영양상담', '식단관리', '온라인쇼핑'],
    audience: {
      '@type': 'Audience',
      audienceType: '건강한 식생활을 원하는 모든 사람',
      geographicArea: {
        '@type': 'Country',
        name: '대한민국',
      },
    },
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
    />
  );
};

// FAQ 스키마 (자주 묻는 질문)
export const FAQSchema = () => {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '아이비는 어떤 서비스인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '아이비는 AI 기술을 활용하여 개인의 건강 상태, 선호도, 목표에 맞는 맞춤형 식단을 추천하고, 해당 식단에 필요한 식재료를 쉽게 주문할 수 있는 스마트 쇼핑 서비스입니다.',
        },
      },
      {
        '@type': 'Question',
        name: 'AI 식단 추천은 어떻게 작동하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '사용자의 신체 정보, 건강 상태, 식품 선호도, 알레르기 정보 등을 분석하여 개인에게 최적화된 식단을 AI가 자동으로 생성합니다. 영양 균형과 칼로리를 고려한 과학적인 식단을 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '식재료 배송은 어떻게 이루어지나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '추천된 식단에 필요한 신선한 식재료를 엄선하여 전국 배송해드립니다. 당일 주문 시 다음날 배송이 가능하며, 냉장/냉동 상품은 콜드체인 시스템으로 신선하게 배송됩니다.',
        },
      },
      {
        '@type': 'Question',
        name: '아이비 서비스 이용료는 얼마인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '기본 AI 식단 추천 서비스는 무료로 이용 가능하며, 프리미엄 기능과 식재료 주문 서비스는 별도 요금이 적용됩니다. 자세한 요금 정보는 앱에서 확인하실 수 있습니다.',
        },
      },
    ],
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
};

// 메인 페이지에서 사용할 통합 컴포넌트
export const AivyStructuredData = () => {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <ServiceSchema />
      <MobileAppSchema />
      <FAQSchema />
    </>
  );
};
