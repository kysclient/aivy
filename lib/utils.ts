import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function formatKoreanDate(dateInput: Date | string): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input')
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  let hours = date.getHours()
  const minutes = date.getMinutes()

  const period = hours < 12 ? '오전' : '오후'
  hours = hours % 12 || 12

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${year}년 ${month}월 ${day}일 ${period} ${hours}:${paddedMinutes}`
}

export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function formatTimeago(timestamp: string): string {
  const date = new Date(Number(timestamp) * 1000)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `방금 전`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}분 전`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}시간 전`
  return `${Math.floor(diffInSeconds / 86400)}일`
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout
  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
  debounced.cancel = () => clearTimeout(timeout)
  return debounced
}

export function buildQueryString(params: Record<string, string | number | boolean | Array<string | number> | undefined | null>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => {
      if (value == null || value === '') return false
      if (Array.isArray(value)) return value.length > 0
      return true
    })
    .flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        return value.map((v) => `${encodeURIComponent(key)}[]=${encodeURIComponent(String(v))}`)
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    })
    .join('&')

  return query ? `?${query}` : ''
}

export const openCallWindow = (channelName: string, errorCallback = (message: string) => console.log('window open err', message)) => {
  if (!channelName) {
    console.error('Channel name is missing')
    errorCallback('통화 채널 정보가 없습니다.')
    return
  }

  const isStandalone = 'standalone' in window.navigator && window.navigator.standalone

  if (isStandalone) {
    window.location.href = `/call/${channelName}`
  } else {
    const link = document.createElement('a')
    link.href = `/call/${channelName}`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      const newWindow = window.open(`/call/${channelName}`, '_blank')
      if (!newWindow) {
        toast.error('브라우저가 새 창을 차단했습니다.', {
          description: '아래 버튼을 클릭하여 통화를 시작하세요.',
          action: {
            label: '통화 시작',
            onClick: () => {
              const link = document.createElement('a')
              link.href = `/call/${channelName}`
              link.target = '_blank'
              link.rel = 'noopener noreferrer'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }
          },
          duration: 5000,
          position: 'top-center'
        })
      }
    }, 100)
  }
}


/**
 * 현재 날짜를 기준으로 startDate(오늘)와 endDate(한 달 뒤)를 반환하는 함수
 * @returns {{ startDate: string, endDate: string }} YYYY-MM-DD 형식의 날짜 객체
 */
export function getMealPlanDates() {
  const today = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(today.getMonth() + 1);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const startDate = formatDate(today);
  const endDate = formatDate(nextMonth);

  return {
    startDate,
    endDate,
  };
}