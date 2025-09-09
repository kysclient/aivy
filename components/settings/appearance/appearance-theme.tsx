'use client'

import { cn } from '@/lib/utils'
import { Eye, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback, useMemo } from 'react'

type ThemeOption = 'system' | 'light' | 'dark' | 'deep-dark'

const THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: 'system', label: '시스템 테마' },
  { value: 'light', label: '밝은 테마' },
  { value: 'dark', label: '어두운 테마' }
]

const DARK_THEME_OPTIONS: { value: ThemeOption; label: string }[] = [
  { value: 'dark', label: '어둑함' },
  { value: 'deep-dark', label: '어두움' }
]

export function AppearanceTheme() {
  const { theme, setTheme, systemTheme } = useTheme()

  // 다크 모드 여부 판단
  const isDarkMode = useMemo(() => {
    if (theme === 'system') {
      return systemTheme === 'dark'
    }
    return theme === 'dark' || theme === 'deep-dark'
  }, [theme, systemTheme])

  // THEME_OPTIONS에서 활성화된 테마 판단
  const isActiveTheme = useCallback(
    (value: ThemeOption) => {
      if (value === 'system') {
        return theme === 'system' // 시스템 테마가 선택되면 무조건 활성화
      }
      if (value === 'dark') {
        return theme === 'dark' || theme === 'deep-dark' // 다크나 딥다크면 활성화
      }
      return theme === value // 라이트 등 나머지
    },
    [theme]
  )

  // DARK_THEME_OPTIONS에서 활성화된 테마 판단
  const isActiveDarkTheme = useCallback(
    (value: ThemeOption) => {
      if (theme === 'system' && systemTheme === 'dark') {
        return value === 'dark' // 시스템 다크면 'dark' 기본 활성화
      }
      return theme === value // 명시적 다크/딥다크
    },
    [theme, systemTheme]
  )

  const handleThemeChange = useCallback(
    (value: ThemeOption) => {
      setTheme(value) // 단순히 선택한 값으로 설정, 강제 dark 설정 제거
    },
    [setTheme]
  )

  const baseButtonClass = useMemo(() => 'cursor-pointer font-semibold flex-1 p-3 text-sm flex justify-center bg-background border-r border-border text-description last:border-r-0 transition-colors duration-200', [])

  return (
    <section className="p-3 flex-1">
      {/* 기본 테마 선택 */}
      <div className="flex items-center gap-3 w-full min-h-[42px] px-5 py-2">
        <Eye className="w-5 h-5 text-foreground" />
        <h2 className="font-medium text-[15px] text-foreground">색상 모드</h2>
      </div>
      <div className="rounded-lg overflow-hidden w-full flex border border-border">
        {THEME_OPTIONS.map((option) => (
          <button key={option.value} onClick={() => handleThemeChange(option.value)} className={cn(baseButtonClass, isActiveTheme(option.value) && 'bg-foreground text-background')} aria-label={`${option.label} 선택`} aria-pressed={isActiveTheme(option.value)}>
            {option.label}
          </button>
        ))}
      </div>

      {/* 다크 모드일 때 추가 옵션 */}
      {isDarkMode && (
        <>
          <div className="flex items-center gap-3 w-full min-h-[42px] px-5 py-2">
            <Moon className="w-5 h-5 text-foreground" />
            <h2 className="font-medium text-[15px] text-foreground">어두운 테마</h2>
          </div>
          <div className="rounded-lg overflow-hidden w-full flex border border-border">
            {DARK_THEME_OPTIONS.map((option) => (
              <button key={option.value} onClick={() => handleThemeChange(option.value)} className={cn(baseButtonClass, isActiveDarkTheme(option.value) && 'bg-foreground text-background')} aria-label={`${option.label} 선택`} aria-pressed={isActiveDarkTheme(option.value)}>
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default AppearanceTheme
