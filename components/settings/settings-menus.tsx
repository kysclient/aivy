'use client'
import { BellIcon, NotificationIcon } from '@/components/icons'
import LinkButton from '@/components/link-button'
import { CircleHelp, HandCoins, History, Info, Palette, User as UserIcon } from 'lucide-react'
import Image from 'next/image'

export function SettingsMenus() {
  const menus = [
    {
      title: '테마',
      icon: (size: number) => <Palette size={size} />,
      href: '/settings/appearance'
    },
    {
      title: '도움말',
      icon: (size: number) => <CircleHelp size={size} />,
      href: '/404'
    },
    {
      title: '정보',
      icon: (size: number) => <Info size={size} />,
      href: '/settings/about'
    }
  ]

  const menus2 = [
    {
      title: '알림설정',
      icon: (size: number) => <BellIcon size={size} />,
      href: '/settings/about'
    }
  ]

  return (
    <>
      <div className="border-t w-full border-border pt-[8px]">
        {menus.map((menu, idx) => (
          <LinkButton key={menu.href} href={menu.href} icon={menu.icon} title={menu.title} />
        ))}
      </div>
      <div className="border-t w-full border-border pt-[8px]">
        {menus2.map((menu, idx) => (
          <LinkButton key={menu.href} href={menu.href} icon={menu.icon} title={menu.title} />
        ))}
      </div>
    </>
  )
}
