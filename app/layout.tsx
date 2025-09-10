import type { Metadata } from 'next'
import '@/styles/globals.css'
import { ThemeProvider } from '@/providers/theme-provider'

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  title: 'Aivy - AI 자동식단생성',
  description: 'AI 기반 맞춤형 식단 계획 서비스',
  generator: 'aivy'
}
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`antialiased`}>
        <ThemeProvider themes={['dark', 'light', 'deep-dark']} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
