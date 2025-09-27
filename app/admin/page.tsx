'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/providers/auth-provider'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Loader2, Play, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner' // 또는 사용하는 토스트 라이브러리
import { Loading } from '@/components/loading'

type CrawlStatus = 'idle' | 'loading' | 'success' | 'error'

export default function Page() {
  const { user } = useAuth()
  const [status, setStatus] = useState<CrawlStatus>('idle')
  const [message, setMessage] = useState('')

  if (!user) {
    return <Loading />
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL

  const startCrawler = async (test?: boolean) => {
    try {
      setStatus('loading')
      setMessage('크롤링을 시작하고 있습니다...')
      console.log(test)

      const crawlerUrl = test ? `${baseUrl}/api/v1/test-crawler/simple` : `${baseUrl}/api/v1/crawler/start`

      const response = await fetch(crawlerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // 인증이 필요한 경우
          // 'Authorization': `Bearer ${user.token}`,
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setStatus('success')
      setMessage('크롤링이 성공적으로 시작되었습니다!')
      toast.success('크롤링 시작됨', {
        description: '백그라운드에서 데이터를 수집하고 있습니다.'
      })

      console.log('크롤링 결과:', data)
    } catch (error) {
      console.error('크롤링 실행 중 오류:', error)
      setStatus('error')
      setMessage(error instanceof Error ? error.message : '크롤링 실행 중 오류가 발생했습니다.')
      toast.error('크롤링 실패', {
        description: '잠시 후 다시 시도해주세요.'
      })
    }
  }

  const getButtonProps = () => {
    switch (status) {
      case 'loading':
        return {
          disabled: true,
          variant: 'secondary' as const,
          children: (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              크롤링 진행중...
            </>
          )
        }
      case 'success':
        return {
          disabled: false,
          variant: 'default' as const,
          children: (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              크롤링 다시 시작
            </>
          )
        }
      case 'error':
        return {
          disabled: false,
          variant: 'destructive' as const,
          children: (
            <>
              <AlertCircle className="mr-2 h-4 w-4" />
              크롤링 재시도
            </>
          )
        }
      default:
        return {
          disabled: false,
          variant: 'default' as const,
          children: (
            <>
              <Play className="mr-2 h-4 w-4" />
              크롤링 시작
            </>
          )
        }
    }
  }

  const buttonProps = getButtonProps()

  return (
    <div className="flex flex-col items-center space-y-4 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">상품 크롤링 관리</h1>
        <p className="text-muted-foreground mb-6">쿠팡 상품 정보를 수집하고 데이터베이스에 저장합니다</p>
      </div>

      <Button
        onClick={() => {
          startCrawler(false)
        }}
        disabled={buttonProps.disabled}
        variant={buttonProps.variant}
        size="lg"
        className="min-w-[200px]"
      >
        {buttonProps.children}
      </Button>

      <Button
        onClick={() => {
          startCrawler(true)
        }}
        disabled={buttonProps.disabled}
        variant={buttonProps.variant}
        size="lg"
        className="min-w-[200px]"
      >
        테스트
      </Button>

      {message && (
        <div className={`mt-4 p-4 rounded-lg border ${status === 'success' ? 'bg-green-50 border-green-200 text-green-800' : status === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      <div className="mt-6 text-xs text-muted-foreground max-w-md text-center">
        <p>⚠️ 크롤링은 백그라운드에서 실행되며, 완료까지 시간이 걸릴 수 있습니다. 페이지를 새로고침하지 마세요.</p>
      </div>
    </div>
  )
}
