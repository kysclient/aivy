'use client'

import { DefaultHeader } from '@/layouts/default-header'
import AppearanceTheme from './appearance-theme'

export function Appearance() {
  return (
    <>
      <DefaultHeader title="테마" />
      <AppearanceTheme />
    </>
  )
}
