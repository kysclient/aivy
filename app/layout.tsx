import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/theme-provider'
import { AivyStructuredData } from '@/components/seo/structured-data'
import { Toaster } from "@/components/ui/sonner"
import { AuthProvider } from '@/providers/auth-provider'
import { Analytics } from "@vercel/analytics/next"

// 모바일 및 앱 설정
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  // 기본 메타데이터
  metadataBase: new URL('https://aivy.co.kr'),
  title: {
    default: '아이비 - AI 맞춤 식단과 스마트 쇼핑의 완벽한 만남',
    template: '%s | 아이비 - AI 식단 쇼핑앱'
  },
  description: 'AI가 추천하는 개인 맞춤 식단으로 건강한 식생활을 시작하세요. 식단에 맞는 식재료와 상품을 한 번에 주문할 수 있는 스마트 쇼핑 서비스입니다.',

  // 검색엔진 최적화
  keywords: ['AI 식단', '맞춤 식단', '식단 추천', '건강 식단', '다이어트 식단', '식재료 쇼핑', '식품 주문', '건강식품', '온라인 장보기', '스마트 쇼핑', '영양 관리', '칼로리 계산', '식단 계획', '건강 관리', 'AI 영양사', '한국 식단', '건강한 생활', '식품 배송', '맞춤 쇼핑', '웰빙'],

  // 작성자 및 생성기
  authors: [{ name: 'Aivy Team' }],
  creator: '아이비',
  publisher: '아이비',
  generator: 'Kim Yu Shin',

  // 분류 및 카테고리
  category: 'Health & Wellness',
  classification: 'AI Food & Shopping Service',

  // Open Graph (소셜 미디어 공유)
  openGraph: {
    type: 'website',
    siteName: '아이비',
    title: '아이비 - AI 맞춤 식단과 스마트 쇼핑의 완벽한 만남',
    description: 'AI가 분석한 개인 맞춤 식단으로 건강한 식생활을 시작하고, 필요한 식재료를 바로 주문하세요. 건강 관리가 이렇게 쉬워도 되나요?',
    url: 'https://aivy.co.kr', // 실제 도메인으로 변경
    locale: 'ko_KR',
    images: [
      {
        url: '/og-image.png', // 실제 이미지 경로로 변경
        width: 1200,
        height: 630,
        alt: '아이비 - AI 맞춤 식단 및 스마트 쇼핑 서비스',
        type: 'image/png'
      }
    ]
  },

  // Twitter 카드
  twitter: {
    card: 'summary_large_image',
    site: '@aivy_official', // 실제 트위터 계정으로 변경
    creator: '@aivy_official',
    title: '아이비 - AI가 만드는 나만의 건강 식단',
    description: 'AI 맞춤 식단 + 스마트 쇼핑으로 건강한 식생활을 쉽고 편리하게!',
    images: ['/default-placeholder.png'] // 실제 이미지 경로로 변경
  },

  // 앱 관련 메타데이터
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '아이비 - AI 식단 쇼핑'
  },

  // 검색 로봇 설정
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // 언어 및 지역 설정
  alternates: {
    canonical: 'https://aivy.co.kr', // 실제 도메인으로 변경
    languages: {
      'ko-KR': 'https://aivy.co.kr'
    }
  },

  // 추가 메타 태그
  other: {
    // 네이버 검색 최적화
    'naver-site-verification': '', // 네이버 웹마스터 도구 인증 코드

    // Google 검색 최적화
    'google-site-verification': '', // Google Search Console 인증 코드

    // 모바일 최적화
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',

    // 브랜드 색상
    'theme-color': '#1eab53', 
    'msapplication-TileColor': '#1eab53',

    // 한국 서비스 특화
    'format-detection': 'telephone=no',
    'application-name': '아이비',
    'apple-mobile-web-app-title': '아이비'
  },

  // 구조화된 데이터 (JSON-LD)
  // 별도 컴포넌트에서 구현 권장
  verification: {
    google: '', // Google Search Console 인증 코드
    other: {
      'naver-site-verification': '' // 네이버 웹마스터 도구 인증 코드
    }
  }
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <AivyStructuredData />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider themes={['dark', 'light', 'deep-dark']} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster position='top-center' />
        <Analytics />
      </body>
    </html>
  )
}
